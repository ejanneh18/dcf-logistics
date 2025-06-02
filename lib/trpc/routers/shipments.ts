import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, staffProcedure } from '../server'
import { TRPCError } from '@trpc/server'
import { ShipmentStatus, UserRole } from '@prisma/client'
import { EmailService } from '@/lib/email/service'

const createShipmentSchema = z.object({
  customerId: z.string(),
  serviceId: z.string(),
  invoiceId: z.string().optional(),
  originAddress: z.string().min(1, 'Origin is required'),
  destinationAddress: z.string().min(1, 'Destination is required'),
  description: z.string().min(1, 'Description is required'),
  specialInstructions: z.string().optional(),
  weight: z.number().positive().optional(),
  dimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
  }).optional(),
  declaredValue: z.number().positive().optional(),
  currency: z.string().default('USD'),
  estimatedDeliveryDate: z.date().optional(),
  status: z.nativeEnum(ShipmentStatus).default(ShipmentStatus.PENDING),
})

const updateShipmentSchema = z.object({
  id: z.string(),
  status: z.nativeEnum(ShipmentStatus).optional(),
  estimatedDelivery: z.date().optional(),
  actualDelivery: z.date().optional(),
  notes: z.string().optional(),
})

const trackingSchema = z.object({
  trackingNumber: z.string(),
})

export const shipmentsRouter = createTRPCRouter({
  create: staffProcedure
    .input(createShipmentSchema)
    .mutation(async ({ ctx, input }) => {
      // Verify customer exists
      const customer = await ctx.db.customer.findUnique({
        where: { id: input.customerId },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            }
          }
        }
      })

      if (!customer) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Customer not found'
        })
      }

      // Verify service exists
      const service = await ctx.db.service.findUnique({
        where: { id: input.serviceId }
      })

      if (!service || !service.isActive) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Service not found or inactive'
        })
      }

      // Generate tracking number using the helper function
      const currentYear = new Date().getFullYear()
      const prefix = `DCF${currentYear}`

      const latestShipment = await ctx.db.shipment.findFirst({
        where: {
          trackingNumber: {
            startsWith: prefix
          }
        },
        orderBy: {
          trackingNumber: 'desc'
        }
      })

      let nextNumber = 1
      if (latestShipment) {
        const currentNumber = parseInt(latestShipment.trackingNumber.replace(prefix, ''))
        nextNumber = currentNumber + 1
      }

      const trackingNumber = `${prefix}${nextNumber.toString().padStart(6, '0')}`

      const shipment = await ctx.db.shipment.create({
        data: {
          trackingNumber,
          customerId: input.customerId,
          serviceId: input.serviceId,
          invoiceId: input.invoiceId,
          originAddress: input.originAddress,
          destinationAddress: input.destinationAddress,
          description: input.description,
          specialInstructions: input.specialInstructions,
          weight: input.weight,
          dimensions: input.dimensions,
          declaredValue: input.declaredValue,
          currency: input.currency,
          estimatedDeliveryDate: input.estimatedDeliveryDate,
          status: input.status,
        },
        include: {
          service: true,
          customer: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                }
              }
            }
          },
          invoice: true,
        }
      })

      // Send shipment creation email notification
      try {
        await EmailService.sendShipmentUpdateEmail({
          customerName: shipment.customer.user.name || 'Customer',
          customerEmail: shipment.customer.user.email,
          trackingNumber: shipment.trackingNumber,
          status: shipment.status,
          origin: shipment.originAddress,
          destination: shipment.destinationAddress,
          estimatedDelivery: shipment.estimatedDeliveryDate || undefined,
        })
      } catch (error) {
        console.error('Failed to send shipment creation email:', error)
        // Don't fail the mutation if email fails
      }

      return shipment
    }),

  getAll: protectedProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      status: z.nativeEnum(ShipmentStatus).optional(),
      search: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const { page, limit, status, search } = input
      const skip = (page - 1) * limit

      let where: any = {}

      // Filter by customer if user is a customer
      if (ctx.session.user.role === UserRole.CUSTOMER) {
        const customer = await ctx.db.customer.findUnique({
          where: { userId: ctx.session.user.id }
        })
        if (customer) {
          where.customerId = customer.id
        }
      }

      // Add status filter
      if (status) {
        where.status = status
      }

      // Add search filter
      if (search) {
        where.OR = [
          { trackingNumber: { contains: search, mode: 'insensitive' } },
          { origin: { contains: search, mode: 'insensitive' } },
          { destination: { contains: search, mode: 'insensitive' } },
        ]
      }

      const [shipments, total] = await Promise.all([
        ctx.db.shipment.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            service: true,
            customer: {
              include: {
                user: {
                  select: {
                    name: true,
                    email: true,
                  }
                }
              }
            }
          }
        }),
        ctx.db.shipment.count({ where })
      ])

      return {
        shipments,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      let where: any = { id: input.id }

      // Filter by customer if user is a customer
      if (ctx.session.user.role === UserRole.CUSTOMER) {
        const customer = await ctx.db.customer.findUnique({
          where: { userId: ctx.session.user.id }
        })
        if (customer) {
          where.customerId = customer.id
        }
      }

      const shipment = await ctx.db.shipment.findFirst({
        where,
        include: {
          service: true,
          customer: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                }
              }
            }
          },
          documents: true,
          invoice: true,
        }
      })

      if (!shipment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Shipment not found'
        })
      }

      return shipment
    }),

  track: protectedProcedure
    .input(trackingSchema)
    .query(async ({ ctx, input }) => {
      const shipment = await ctx.db.shipment.findUnique({
        where: { trackingNumber: input.trackingNumber },
        include: {
          service: true,
          customer: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                }
              }
            }
          }
        }
      })

      if (!shipment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Shipment not found'
        })
      }

      // Check if user has access to this shipment
      if (ctx.session.user.role === UserRole.CUSTOMER) {
        const customer = await ctx.db.customer.findUnique({
          where: { userId: ctx.session.user.id }
        })
        if (!customer || shipment.customerId !== customer.id) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Access denied'
          })
        }
      }

      return shipment
    }),

  update: staffProcedure
    .input(updateShipmentSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input

      // Get the current shipment to check if status changed
      const currentShipment = await ctx.db.shipment.findUnique({
        where: { id },
        select: { status: true }
      })

      const shipment = await ctx.db.shipment.update({
        where: { id },
        data: updateData,
        include: {
          service: true,
          customer: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                }
              }
            }
          }
        }
      })

      // Send email notification if status changed
      if (updateData.status && currentShipment && updateData.status !== currentShipment.status) {
        try {
          await EmailService.sendShipmentUpdateEmail({
            customerName: shipment.customer.user.name || 'Customer',
            customerEmail: shipment.customer.user.email,
            trackingNumber: shipment.trackingNumber,
            status: shipment.status,
            origin: shipment.origin,
            destination: shipment.destination,
            estimatedDelivery: shipment.estimatedDelivery || undefined,
            actualDelivery: shipment.actualDelivery || undefined,
          })
        } catch (error) {
          console.error('Failed to send shipment update email:', error)
          // Don't fail the mutation if email fails
        }
      }

      return shipment
    }),

  delete: staffProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.shipment.delete({
        where: { id: input.id }
      })

      return { success: true }
    }),

  getStats: staffProcedure
    .query(async ({ ctx }) => {
      const [
        totalShipments,
        pendingShipments,
        inTransitShipments,
        deliveredShipments,
        recentShipments
      ] = await Promise.all([
        ctx.db.shipment.count(),
        ctx.db.shipment.count({ where: { status: ShipmentStatus.PENDING } }),
        ctx.db.shipment.count({ where: { status: ShipmentStatus.IN_TRANSIT } }),
        ctx.db.shipment.count({ where: { status: ShipmentStatus.DELIVERED } }),
        ctx.db.shipment.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            service: true,
            customer: {
              include: {
                user: {
                  select: {
                    name: true,
                    email: true,
                  }
                }
              }
            }
          }
        })
      ])

      return {
        totalShipments,
        pendingShipments,
        inTransitShipments,
        deliveredShipments,
        recentShipments
      }
    }),

  getNextTrackingNumber: staffProcedure
    .query(async ({ ctx }) => {
      const currentYear = new Date().getFullYear()
      const prefix = `DCF${currentYear}`

      // Get the latest tracking number for this year
      const latestShipment = await ctx.db.shipment.findFirst({
        where: {
          trackingNumber: {
            startsWith: prefix
          }
        },
        orderBy: {
          trackingNumber: 'desc'
        }
      })

      let nextNumber = 1
      if (latestShipment) {
        const currentNumber = parseInt(latestShipment.trackingNumber.replace(prefix, ''))
        nextNumber = currentNumber + 1
      }

      return `${prefix}${nextNumber.toString().padStart(6, '0')}`
    }),

  updateStatus: staffProcedure
    .input(z.object({
      id: z.string(),
      status: z.nativeEnum(ShipmentStatus),
    }))
    .mutation(async ({ ctx, input }) => {
      const shipment = await ctx.db.shipment.update({
        where: { id: input.id },
        data: { status: input.status },
        include: {
          service: true,
          customer: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                }
              }
            }
          }
        }
      })

      // Send email notification for status change
      try {
        await EmailService.sendShipmentUpdateEmail({
          customerName: shipment.customer.user.name || 'Customer',
          customerEmail: shipment.customer.user.email,
          trackingNumber: shipment.trackingNumber,
          status: shipment.status,
          origin: shipment.originAddress,
          destination: shipment.destinationAddress,
          estimatedDelivery: shipment.estimatedDeliveryDate || undefined,
          actualDelivery: shipment.actualDeliveryDate || undefined,
        })
      } catch (error) {
        console.error('Failed to send shipment update email:', error)
        // Don't fail the mutation if email fails
      }

      return shipment
    }),
})
