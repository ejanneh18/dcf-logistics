import { z } from 'zod'
import { createTRPCRouter, publicProcedure, staffProcedure, adminProcedure } from '../server'
import { TRPCError } from '@trpc/server'
import { ServiceCategory } from '@prisma/client'

const createServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required'),
  description: z.string().optional(),
  category: z.nativeEnum(ServiceCategory),
  basePrice: z.number().positive('Base price must be positive'),
  currency: z.string().default('USD'),
  features: z.array(z.string()).optional(),
  regions: z.array(z.string()).optional(),
})

const updateServiceSchema = z.object({
  id: z.string(),
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  category: z.nativeEnum(ServiceCategory).optional(),
  basePrice: z.number().positive().optional(),
  currency: z.string().optional(),
  features: z.array(z.string()).optional(),
  regions: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
})

const pricingRuleSchema = z.object({
  serviceId: z.string(),
  name: z.string().min(1, 'Rule name is required'),
  conditions: z.record(z.any()), // JSON object for conditions
  multiplier: z.number().positive('Multiplier must be positive'),
})

export const servicesRouter = createTRPCRouter({
  // Public endpoints
  getAll: publicProcedure
    .input(z.object({
      category: z.nativeEnum(ServiceCategory).optional(),
      region: z.string().optional(),
      activeOnly: z.boolean().default(true),
    }))
    .query(async ({ ctx, input }) => {
      const { category, region, activeOnly } = input

      let where: any = {}

      if (activeOnly) {
        where.isActive = true
      }

      if (category) {
        where.category = category
      }

      if (region) {
        where.regions = {
          has: region
        }
      }

      const services = await ctx.db.service.findMany({
        where,
        orderBy: { name: 'asc' },
        include: {
          pricingRules: {
            where: { isActive: true }
          }
        }
      })

      return services
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const service = await ctx.db.service.findUnique({
        where: { id: input.id },
        include: {
          pricingRules: {
            where: { isActive: true }
          }
        }
      })

      if (!service) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Service not found'
        })
      }

      return service
    }),

  getCategories: publicProcedure
    .query(async ({ ctx }) => {
      const categories = await ctx.db.service.groupBy({
        by: ['category'],
        where: { isActive: true },
        _count: {
          category: true
        }
      })

      return categories.map(cat => ({
        category: cat.category,
        count: cat._count.category
      }))
    }),

  // Staff/Admin endpoints
  create: staffProcedure
    .input(createServiceSchema)
    .mutation(async ({ ctx, input }) => {
      const service = await ctx.db.service.create({
        data: {
          ...input,
          features: input.features || [],
          regions: input.regions || [],
        },
        include: {
          pricingRules: true
        }
      })

      return service
    }),

  update: staffProcedure
    .input(updateServiceSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input

      const service = await ctx.db.service.update({
        where: { id },
        data: updateData,
        include: {
          pricingRules: true
        }
      })

      return service
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Check if service is being used in shipments
      const shipmentsCount = await ctx.db.shipment.count({
        where: { serviceId: input.id }
      })

      if (shipmentsCount > 0) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Cannot delete service that is being used in shipments'
        })
      }

      await ctx.db.service.delete({
        where: { id: input.id }
      })

      return { success: true }
    }),

  // Pricing Rules
  createPricingRule: staffProcedure
    .input(pricingRuleSchema)
    .mutation(async ({ ctx, input }) => {
      // Verify service exists
      const service = await ctx.db.service.findUnique({
        where: { id: input.serviceId }
      })

      if (!service) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Service not found'
        })
      }

      const pricingRule = await ctx.db.pricingRule.create({
        data: input,
        include: {
          service: true
        }
      })

      return pricingRule
    }),

  updatePricingRule: staffProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().optional(),
      conditions: z.record(z.any()).optional(),
      multiplier: z.number().positive().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input

      const pricingRule = await ctx.db.pricingRule.update({
        where: { id },
        data: updateData,
        include: {
          service: true
        }
      })

      return pricingRule
    }),

  deletePricingRule: staffProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.pricingRule.delete({
        where: { id: input.id }
      })

      return { success: true }
    }),

  getPricingRules: staffProcedure
    .input(z.object({
      serviceId: z.string().optional(),
      activeOnly: z.boolean().default(true),
    }))
    .query(async ({ ctx, input }) => {
      const { serviceId, activeOnly } = input

      let where: any = {}

      if (serviceId) {
        where.serviceId = serviceId
      }

      if (activeOnly) {
        where.isActive = true
      }

      const pricingRules = await ctx.db.pricingRule.findMany({
        where,
        include: {
          service: true
        },
        orderBy: { createdAt: 'desc' }
      })

      return pricingRules
    }),

  // Calculate price for a service
  calculatePrice: publicProcedure
    .input(z.object({
      serviceId: z.string(),
      weight: z.number().positive().optional(),
      distance: z.number().positive().optional(),
      value: z.number().positive().optional(),
      urgent: z.boolean().default(false),
      additionalServices: z.array(z.string()).default([]),
    }))
    .query(async ({ ctx, input }) => {
      const service = await ctx.db.service.findUnique({
        where: { id: input.serviceId },
        include: {
          pricingRules: {
            where: { isActive: true }
          }
        }
      })

      if (!service || !service.isActive) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Service not found or inactive'
        })
      }

      let totalPrice = service.basePrice.toNumber()

      // Apply pricing rules
      for (const rule of service.pricingRules) {
        const conditions = rule.conditions as any
        let shouldApply = true

        // Check weight condition
        if (conditions.minWeight && input.weight && input.weight < conditions.minWeight) {
          shouldApply = false
        }
        if (conditions.maxWeight && input.weight && input.weight > conditions.maxWeight) {
          shouldApply = false
        }

        // Check distance condition
        if (conditions.minDistance && input.distance && input.distance < conditions.minDistance) {
          shouldApply = false
        }
        if (conditions.maxDistance && input.distance && input.distance > conditions.maxDistance) {
          shouldApply = false
        }

        // Check value condition
        if (conditions.minValue && input.value && input.value < conditions.minValue) {
          shouldApply = false
        }

        // Check urgent condition
        if (conditions.urgent !== undefined && conditions.urgent !== input.urgent) {
          shouldApply = false
        }

        if (shouldApply) {
          totalPrice *= rule.multiplier.toNumber()
        }
      }

      // Add additional service fees (simplified)
      const additionalServiceFees = {
        insurance: 25,
        packaging: 15,
        tracking: 10,
        express: 50,
      }

      for (const additionalService of input.additionalServices) {
        if (additionalServiceFees[additionalService as keyof typeof additionalServiceFees]) {
          totalPrice += additionalServiceFees[additionalService as keyof typeof additionalServiceFees]
        }
      }

      return {
        serviceId: service.id,
        serviceName: service.name,
        basePrice: service.basePrice.toNumber(),
        totalPrice: Math.round(totalPrice * 100) / 100, // Round to 2 decimal places
        currency: service.currency,
        breakdown: {
          basePrice: service.basePrice.toNumber(),
          rulesApplied: service.pricingRules.length,
          additionalServices: input.additionalServices,
        }
      }
    }),

  getStats: staffProcedure
    .query(async ({ ctx }) => {
      const [
        totalServices,
        activeServices,
        servicesByCategory,
        popularServices
      ] = await Promise.all([
        ctx.db.service.count(),
        ctx.db.service.count({ where: { isActive: true } }),
        ctx.db.service.groupBy({
          by: ['category'],
          _count: { category: true }
        }),
        ctx.db.service.findMany({
          take: 5,
          include: {
            _count: {
              select: { shipments: true }
            }
          },
          orderBy: {
            shipments: {
              _count: 'desc'
            }
          }
        })
      ])

      return {
        totalServices,
        activeServices,
        servicesByCategory: servicesByCategory.map(cat => ({
          category: cat.category,
          count: cat._count.category
        })),
        popularServices
      }
    }),
})
