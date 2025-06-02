import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, staffProcedure } from '../server'
import { TRPCError } from '@trpc/server'
import { UserRole } from '@prisma/client'

const createCustomerSchema = z.object({
  userId: z.string(),
  companyName: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  taxId: z.string().optional(),
})

const updateCustomerSchema = z.object({
  id: z.string(),
  companyName: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  taxId: z.string().optional(),
})

export const customersRouter = createTRPCRouter({
  create: staffProcedure
    .input(createCustomerSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if user exists
      const user = await ctx.db.user.findUnique({
        where: { id: input.userId }
      })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found'
        })
      }

      // Check if customer already exists
      const existingCustomer = await ctx.db.customer.findUnique({
        where: { userId: input.userId }
      })

      if (existingCustomer) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Customer profile already exists for this user'
        })
      }

      const customer = await ctx.db.customer.create({
        data: input,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            }
          }
        }
      })

      return customer
    }),

  getAll: staffProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      search: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const { page, limit, search } = input
      const skip = (page - 1) * limit

      let where: any = {}

      // Add search filter
      if (search) {
        where.OR = [
          { companyName: { contains: search, mode: 'insensitive' } },
          { user: { name: { contains: search, mode: 'insensitive' } } },
          { user: { email: { contains: search, mode: 'insensitive' } } },
        ]
      }

      const [customers, total] = await Promise.all([
        ctx.db.customer.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              }
            },
            _count: {
              select: {
                shipments: true,
                invoices: true,
              }
            }
          }
        }),
        ctx.db.customer.count({ where })
      ])

      return {
        customers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    }),

  getById: staffProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const customer = await ctx.db.customer.findUnique({
        where: { id: input.id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            }
          },
          shipments: {
            orderBy: { createdAt: 'desc' },
            take: 10,
            include: {
              service: true,
            }
          },
          invoices: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          }
        }
      })

      if (!customer) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Customer not found'
        })
      }

      return customer
    }),

  update: staffProcedure
    .input(updateCustomerSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input

      const customer = await ctx.db.customer.update({
        where: { id },
        data: updateData,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            }
          }
        }
      })

      return customer
    }),

  delete: staffProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Check if customer has any shipments or invoices
      const customer = await ctx.db.customer.findUnique({
        where: { id: input.id },
        include: {
          _count: {
            select: {
              shipments: true,
              invoices: true,
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

      if (customer._count.shipments > 0 || customer._count.invoices > 0) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Cannot delete customer with existing shipments or invoices'
        })
      }

      await ctx.db.customer.delete({
        where: { id: input.id }
      })

      return { success: true }
    }),

  getStats: staffProcedure
    .query(async ({ ctx }) => {
      const [
        totalCustomers,
        activeCustomers,
        newCustomersThisMonth,
        topCustomers
      ] = await Promise.all([
        ctx.db.customer.count(),
        ctx.db.customer.count({
          where: {
            OR: [
              { shipments: { some: {} } },
              { invoices: { some: {} } }
            ]
          }
        }),
        ctx.db.customer.count({
          where: {
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          }
        }),
        ctx.db.customer.findMany({
          take: 5,
          include: {
            user: {
              select: {
                name: true,
                email: true,
              }
            },
            _count: {
              select: {
                shipments: true,
                invoices: true,
              }
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
        totalCustomers,
        activeCustomers,
        newCustomersThisMonth,
        topCustomers
      }
    }),

  // Get current user's customer profile
  getProfile: protectedProcedure
    .query(async ({ ctx }) => {
      if (ctx.session.user.role !== UserRole.CUSTOMER) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only customers can access this endpoint'
        })
      }

      const customer = await ctx.db.customer.findUnique({
        where: { userId: ctx.session.user.id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            }
          }
        }
      })

      if (!customer) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Customer profile not found'
        })
      }

      return customer
    }),

  // Update current user's customer profile
  updateProfile: protectedProcedure
    .input(z.object({
      companyName: z.string().optional(),
      address: z.string().optional(),
      phone: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== UserRole.CUSTOMER) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only customers can access this endpoint'
        })
      }

      const customer = await ctx.db.customer.findUnique({
        where: { userId: ctx.session.user.id }
      })

      if (!customer) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Customer profile not found'
        })
      }

      const updatedCustomer = await ctx.db.customer.update({
        where: { id: customer.id },
        data: input,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            }
          }
        }
      })

      return updatedCustomer
    }),
})
