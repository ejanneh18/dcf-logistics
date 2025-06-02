import { prisma as db } from '@/lib/prisma'
import { startOfDay, endOfDay, subDays, subMonths, format } from 'date-fns'

export interface AnalyticsData {
  revenue: {
    total: number
    thisMonth: number
    lastMonth: number
    growth: number
    daily: Array<{ date: string; amount: number }>
    monthly: Array<{ month: string; amount: number }>
  }
  shipments: {
    total: number
    thisMonth: number
    lastMonth: number
    growth: number
    byStatus: Array<{ status: string; count: number; percentage: number }>
    daily: Array<{ date: string; count: number }>
    byService: Array<{ service: string; count: number; revenue: number }>
  }
  customers: {
    total: number
    active: number
    new: number
    retention: number
    topCustomers: Array<{
      id: string
      name: string
      email: string
      totalSpent: number
      shipmentsCount: number
    }>
  }
  performance: {
    averageDeliveryTime: number
    onTimeDeliveryRate: number
    customerSatisfaction: number
    operationalEfficiency: number
  }
  predictions: {
    nextMonthRevenue: number
    nextMonthShipments: number
    seasonalTrends: Array<{ month: string; predicted: number; confidence: number }>
  }
}

export class AnalyticsService {
  static async getComprehensiveAnalytics(
    startDate?: Date,
    endDate?: Date
  ): Promise<AnalyticsData> {
    const start = startDate || subMonths(new Date(), 12)
    const end = endDate || new Date()

    const [
      revenueData,
      shipmentData,
      customerData,
      performanceData
    ] = await Promise.all([
      this.getRevenueAnalytics(start, end),
      this.getShipmentAnalytics(start, end),
      this.getCustomerAnalytics(start, end),
      this.getPerformanceAnalytics(start, end)
    ])

    const predictions = await this.generatePredictions()

    return {
      revenue: revenueData,
      shipments: shipmentData,
      customers: customerData,
      performance: performanceData,
      predictions
    }
  }

  private static async getRevenueAnalytics(start: Date, end: Date) {
    // Get total revenue
    const totalRevenue = await db.payment.aggregate({
      where: {
        status: 'COMPLETED',
        paidAt: { gte: start, lte: end }
      },
      _sum: { amount: true }
    })

    // Get this month's revenue
    const thisMonthStart = startOfDay(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
    const thisMonthRevenue = await db.payment.aggregate({
      where: {
        status: 'COMPLETED',
        paidAt: { gte: thisMonthStart, lte: end }
      },
      _sum: { amount: true }
    })

    // Get last month's revenue
    const lastMonthStart = startOfDay(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1))
    const lastMonthEnd = endOfDay(new Date(new Date().getFullYear(), new Date().getMonth(), 0))
    const lastMonthRevenue = await db.payment.aggregate({
      where: {
        status: 'COMPLETED',
        paidAt: { gte: lastMonthStart, lte: lastMonthEnd }
      },
      _sum: { amount: true }
    })

    // Calculate growth
    const thisMonth = thisMonthRevenue._sum.amount?.toNumber() || 0
    const lastMonth = lastMonthRevenue._sum.amount?.toNumber() || 0
    const growth = lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth) * 100 : 0

    // Get daily revenue for the last 30 days
    const dailyRevenue = await this.getDailyRevenue(subDays(end, 30), end)

    // Get monthly revenue for the last 12 months
    const monthlyRevenue = await this.getMonthlyRevenue(subMonths(end, 12), end)

    return {
      total: totalRevenue._sum.amount?.toNumber() || 0,
      thisMonth,
      lastMonth,
      growth,
      daily: dailyRevenue,
      monthly: monthlyRevenue
    }
  }

  private static async getShipmentAnalytics(start: Date, end: Date) {
    // Get total shipments
    const totalShipments = await db.shipment.count({
      where: { createdAt: { gte: start, lte: end } }
    })

    // Get this month's shipments
    const thisMonthStart = startOfDay(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
    const thisMonthShipments = await db.shipment.count({
      where: { createdAt: { gte: thisMonthStart, lte: end } }
    })

    // Get last month's shipments
    const lastMonthStart = startOfDay(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1))
    const lastMonthEnd = endOfDay(new Date(new Date().getFullYear(), new Date().getMonth(), 0))
    const lastMonthShipments = await db.shipment.count({
      where: { createdAt: { gte: lastMonthStart, lte: lastMonthEnd } }
    })

    // Calculate growth
    const growth = lastMonthShipments > 0 ?
      ((thisMonthShipments - lastMonthShipments) / lastMonthShipments) * 100 : 0

    // Get shipments by status
    const shipmentsByStatus = await db.shipment.groupBy({
      by: ['status'],
      where: { createdAt: { gte: start, lte: end } },
      _count: { id: true }
    })

    const byStatus = shipmentsByStatus.map(item => ({
      status: item.status,
      count: item._count.id,
      percentage: (item._count.id / totalShipments) * 100
    }))

    // Get daily shipments
    const dailyShipments = await this.getDailyShipments(subDays(end, 30), end)

    // Get shipments by service
    const shipmentsByService = await this.getShipmentsByService(start, end)

    return {
      total: totalShipments,
      thisMonth: thisMonthShipments,
      lastMonth: lastMonthShipments,
      growth,
      byStatus,
      daily: dailyShipments,
      byService: shipmentsByService
    }
  }

  private static async getCustomerAnalytics(start: Date, end: Date) {
    // Get total customers
    const totalCustomers = await db.customer.count()

    // Get active customers (with shipments in the period)
    const activeCustomers = await db.customer.count({
      where: {
        shipments: {
          some: {
            createdAt: { gte: start, lte: end }
          }
        }
      }
    })

    // Get new customers
    const newCustomers = await db.customer.count({
      where: { createdAt: { gte: start, lte: end } }
    })

    // Calculate retention rate (simplified)
    const retention = totalCustomers > 0 ? (activeCustomers / totalCustomers) * 100 : 0

    // Get top customers
    const topCustomers = await this.getTopCustomers(start, end)

    return {
      total: totalCustomers,
      active: activeCustomers,
      new: newCustomers,
      retention,
      topCustomers
    }
  }

  private static async getPerformanceAnalytics(start: Date, end: Date) {
    // Calculate average delivery time
    const deliveredShipments = await db.shipment.findMany({
      where: {
        status: 'DELIVERED',
        deliveredAt: { gte: start, lte: end }
      },
      select: {
        createdAt: true,
        deliveredAt: true
      }
    })

    const averageDeliveryTime = deliveredShipments.length > 0 ?
      deliveredShipments.reduce((sum, shipment) => {
        const deliveryTime = shipment.deliveredAt!.getTime() - shipment.createdAt.getTime()
        return sum + (deliveryTime / (1000 * 60 * 60 * 24)) // Convert to days
      }, 0) / deliveredShipments.length : 0

    // Calculate on-time delivery rate (assuming 7 days is on-time)
    const onTimeDeliveries = deliveredShipments.filter(shipment => {
      const deliveryTime = shipment.deliveredAt!.getTime() - shipment.createdAt.getTime()
      const days = deliveryTime / (1000 * 60 * 60 * 24)
      return days <= 7
    }).length

    const onTimeDeliveryRate = deliveredShipments.length > 0 ?
      (onTimeDeliveries / deliveredShipments.length) * 100 : 0

    return {
      averageDeliveryTime,
      onTimeDeliveryRate,
      customerSatisfaction: 85, // Placeholder - would come from surveys
      operationalEfficiency: 78 // Placeholder - would be calculated from various metrics
    }
  }

  private static async generatePredictions() {
    // Simple prediction based on historical data
    // In a real application, this would use machine learning models

    const lastMonthRevenue = await db.payment.aggregate({
      where: {
        status: 'COMPLETED',
        paidAt: {
          gte: subMonths(new Date(), 1),
          lte: new Date()
        }
      },
      _sum: { amount: true }
    })

    const lastMonthShipments = await db.shipment.count({
      where: {
        createdAt: {
          gte: subMonths(new Date(), 1),
          lte: new Date()
        }
      }
    })

    // Simple growth prediction (10% growth)
    const nextMonthRevenue = (lastMonthRevenue._sum.amount?.toNumber() || 0) * 1.1
    const nextMonthShipments = Math.round(lastMonthShipments * 1.1)

    return {
      nextMonthRevenue,
      nextMonthShipments,
      seasonalTrends: [] // Placeholder for seasonal analysis
    }
  }

  private static async getDailyRevenue(start: Date, end: Date) {
    // Implementation would group payments by day
    return [] // Placeholder
  }

  private static async getMonthlyRevenue(start: Date, end: Date) {
    // Implementation would group payments by month
    return [] // Placeholder
  }

  private static async getDailyShipments(start: Date, end: Date) {
    // Implementation would group shipments by day
    return [] // Placeholder
  }

  private static async getShipmentsByService(start: Date, end: Date) {
    // Implementation would group shipments by service type
    return [] // Placeholder
  }

  private static async getTopCustomers(start: Date, end: Date) {
    // Implementation would get customers with highest spending
    return [] // Placeholder
  }
}

export default AnalyticsService
