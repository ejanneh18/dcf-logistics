import { z } from 'zod'
import { createTRPCRouter, staffProcedure } from '../server'
import { AnalyticsService } from '@/lib/analytics/service'

const dateRangeSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
})

const reportConfigSchema = z.object({
  type: z.enum(['revenue', 'shipments', 'customers', 'performance']),
  period: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  startDate: z.date(),
  endDate: z.date(),
  groupBy: z.array(z.string()).optional(),
  filters: z.record(z.any()).optional(),
})

export const analyticsRouter = createTRPCRouter({
  getComprehensiveAnalytics: staffProcedure
    .input(dateRangeSchema)
    .query(async ({ input }) => {
      return await AnalyticsService.getComprehensiveAnalytics(
        input.startDate,
        input.endDate
      )
    }),

  getRevenueAnalytics: staffProcedure
    .input(dateRangeSchema)
    .query(async ({ ctx, input }) => {
      const { startDate, endDate } = input
      const start = startDate || new Date(new Date().getFullYear(), 0, 1)
      const end = endDate || new Date()

      // Get revenue by month
      const revenueByMonth = await ctx.db.payment.groupBy({
        by: ['paidAt'],
        where: {
          status: 'COMPLETED',
          paidAt: { gte: start, lte: end }
        },
        _sum: { amount: true },
        orderBy: { paidAt: 'asc' }
      })

      // Get revenue by service
      const revenueByService = await ctx.db.payment.findMany({
        where: {
          status: 'COMPLETED',
          paidAt: { gte: start, lte: end }
        },
        include: {
          invoice: {
            include: {
              shipment: {
                include: {
                  service: true
                }
              }
            }
          }
        }
      })

      // Process revenue by service
      const serviceRevenue = revenueByService.reduce((acc, payment) => {
        const serviceName = payment.invoice.shipment?.service?.name || 'Unknown'
        if (!acc[serviceName]) {
          acc[serviceName] = 0
        }
        acc[serviceName] += payment.amount.toNumber()
        return acc
      }, {} as Record<string, number>)

      return {
        byMonth: revenueByMonth.map(item => ({
          month: item.paidAt?.toISOString().slice(0, 7) || '',
          amount: item._sum.amount?.toNumber() || 0
        })),
        byService: Object.entries(serviceRevenue).map(([service, amount]) => ({
          service,
          amount
        })),
        total: revenueByService.reduce((sum, payment) => 
          sum + payment.amount.toNumber(), 0
        )
      }
    }),

  getShipmentAnalytics: staffProcedure
    .input(dateRangeSchema)
    .query(async ({ ctx, input }) => {
      const { startDate, endDate } = input
      const start = startDate || new Date(new Date().getFullYear(), 0, 1)
      const end = endDate || new Date()

      // Get shipments by status
      const shipmentsByStatus = await ctx.db.shipment.groupBy({
        by: ['status'],
        where: { createdAt: { gte: start, lte: end } },
        _count: { id: true }
      })

      // Get shipments by service
      const shipmentsByService = await ctx.db.shipment.groupBy({
        by: ['serviceId'],
        where: { createdAt: { gte: start, lte: end } },
        _count: { id: true },
        _avg: { totalCost: true }
      })

      // Get service names
      const services = await ctx.db.service.findMany({
        where: {
          id: {
            in: shipmentsByService.map(s => s.serviceId).filter(Boolean) as string[]
          }
        }
      })

      const serviceMap = services.reduce((acc, service) => {
        acc[service.id] = service.name
        return acc
      }, {} as Record<string, string>)

      // Get shipments over time
      const shipmentsOverTime = await ctx.db.shipment.findMany({
        where: { createdAt: { gte: start, lte: end } },
        select: { createdAt: true },
        orderBy: { createdAt: 'asc' }
      })

      // Group by month
      const monthlyShipments = shipmentsOverTime.reduce((acc, shipment) => {
        const month = shipment.createdAt.toISOString().slice(0, 7)
        acc[month] = (acc[month] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      return {
        byStatus: shipmentsByStatus.map(item => ({
          status: item.status,
          count: item._count.id
        })),
        byService: shipmentsByService.map(item => ({
          service: serviceMap[item.serviceId || ''] || 'Unknown',
          count: item._count.id,
          averageCost: item._avg.totalCost?.toNumber() || 0
        })),
        overTime: Object.entries(monthlyShipments).map(([month, count]) => ({
          month,
          count
        }))
      }
    }),

  getCustomerAnalytics: staffProcedure
    .input(dateRangeSchema)
    .query(async ({ ctx, input }) => {
      const { startDate, endDate } = input
      const start = startDate || new Date(new Date().getFullYear(), 0, 1)
      const end = endDate || new Date()

      // Get customer acquisition over time
      const newCustomers = await ctx.db.customer.findMany({
        where: { createdAt: { gte: start, lte: end } },
        select: { createdAt: true },
        orderBy: { createdAt: 'asc' }
      })

      const monthlyNewCustomers = newCustomers.reduce((acc, customer) => {
        const month = customer.createdAt.toISOString().slice(0, 7)
        acc[month] = (acc[month] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      // Get top customers by revenue
      const topCustomers = await ctx.db.customer.findMany({
        include: {
          user: {
            select: { name: true, email: true }
          },
          shipments: {
            where: { createdAt: { gte: start, lte: end } },
            include: {
              invoices: {
                include: {
                  payments: {
                    where: { status: 'COMPLETED' }
                  }
                }
              }
            }
          }
        }
      })

      const customersWithRevenue = topCustomers.map(customer => {
        const totalRevenue = customer.shipments.reduce((sum, shipment) => {
          const shipmentRevenue = shipment.invoices.reduce((invoiceSum, invoice) => {
            const invoiceRevenue = invoice.payments.reduce((paymentSum, payment) => 
              paymentSum + payment.amount.toNumber(), 0
            )
            return invoiceSum + invoiceRevenue
          }, 0)
          return sum + shipmentRevenue
        }, 0)

        return {
          id: customer.id,
          name: customer.user.name || 'Unknown',
          email: customer.user.email,
          totalRevenue,
          shipmentsCount: customer.shipments.length
        }
      }).sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 10)

      return {
        newCustomersOverTime: Object.entries(monthlyNewCustomers).map(([month, count]) => ({
          month,
          count
        })),
        topCustomers: customersWithRevenue
      }
    }),

  getPerformanceMetrics: staffProcedure
    .input(dateRangeSchema)
    .query(async ({ ctx, input }) => {
      const { startDate, endDate } = input
      const start = startDate || new Date(new Date().getFullYear(), 0, 1)
      const end = endDate || new Date()

      // Get delivery performance
      const deliveredShipments = await ctx.db.shipment.findMany({
        where: {
          status: 'DELIVERED',
          deliveredAt: { gte: start, lte: end }
        },
        select: {
          createdAt: true,
          deliveredAt: true,
          estimatedDelivery: true
        }
      })

      const deliveryTimes = deliveredShipments.map(shipment => {
        const deliveryTime = shipment.deliveredAt!.getTime() - shipment.createdAt.getTime()
        const days = deliveryTime / (1000 * 60 * 60 * 24)
        return days
      })

      const averageDeliveryTime = deliveryTimes.length > 0 ?
        deliveryTimes.reduce((sum, time) => sum + time, 0) / deliveryTimes.length : 0

      // Calculate on-time delivery rate
      const onTimeDeliveries = deliveredShipments.filter(shipment => {
        if (!shipment.estimatedDelivery) return false
        return shipment.deliveredAt! <= shipment.estimatedDelivery
      }).length

      const onTimeDeliveryRate = deliveredShipments.length > 0 ?
        (onTimeDeliveries / deliveredShipments.length) * 100 : 0

      return {
        averageDeliveryTime,
        onTimeDeliveryRate,
        totalDeliveries: deliveredShipments.length,
        deliveryTimeDistribution: {
          '0-2 days': deliveryTimes.filter(t => t <= 2).length,
          '3-5 days': deliveryTimes.filter(t => t > 2 && t <= 5).length,
          '6-10 days': deliveryTimes.filter(t => t > 5 && t <= 10).length,
          '10+ days': deliveryTimes.filter(t => t > 10).length,
        }
      }
    }),

  generateCustomReport: staffProcedure
    .input(reportConfigSchema)
    .mutation(async ({ ctx, input }) => {
      // This would generate a custom report based on the configuration
      // For now, return a placeholder
      return {
        id: `report_${Date.now()}`,
        type: input.type,
        period: input.period,
        generatedAt: new Date(),
        data: {},
        downloadUrl: `/api/reports/download/${Date.now()}`
      }
    }),

  exportData: staffProcedure
    .input(z.object({
      type: z.enum(['csv', 'excel', 'pdf']),
      data: z.any(),
      filename: z.string()
    }))
    .mutation(async ({ input }) => {
      // This would export data in the specified format
      // For now, return a placeholder URL
      return {
        downloadUrl: `/api/exports/${input.filename}.${input.type}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
    }),
})
