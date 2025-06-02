import { z } from 'zod'
import { createTRPCRouter, publicProcedure, staffProcedure } from '../server'
import { TRPCError } from '@trpc/server'
import { EmailService } from '@/lib/email/service'

const createInquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
  type: z.enum(['GENERAL', 'QUOTE', 'SUPPORT', 'PARTNERSHIP']).default('GENERAL'),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).default('NORMAL'),
})

const updateInquirySchema = z.object({
  id: z.string(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']).optional(),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).optional(),
  assignedTo: z.string().optional(),
  response: z.string().optional(),
})

export const inquiriesRouter = createTRPCRouter({
  create: publicProcedure
    .input(createInquirySchema)
    .mutation(async ({ ctx, input }) => {
      const inquiry = await ctx.db.contactInquiry.create({
        data: {
          ...input,
          status: 'PENDING',
        }
      })

      // Send notification email to admin
      try {
        await EmailService.sendInquiryNotificationEmail({
          inquiryId: inquiry.id,
          customerName: inquiry.name,
          customerEmail: inquiry.email,
          subject: inquiry.subject,
          message: inquiry.message,
          type: inquiry.type,
          priority: inquiry.priority,
        })
      } catch (error) {
        console.error('Failed to send inquiry notification email:', error)
        // Don't fail the inquiry creation if email fails
      }

      // Send confirmation email to customer
      try {
        await EmailService.sendInquiryConfirmationEmail({
          customerName: inquiry.name,
          customerEmail: inquiry.email,
          inquiryId: inquiry.id,
          subject: inquiry.subject,
        })
      } catch (error) {
        console.error('Failed to send inquiry confirmation email:', error)
      }

      return inquiry
    }),

  getAll: staffProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      search: z.string().optional(),
      status: z.enum(['all', 'PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']).default('all'),
      type: z.enum(['all', 'GENERAL', 'QUOTE', 'SUPPORT', 'PARTNERSHIP']).default('all'),
      priority: z.enum(['all', 'LOW', 'NORMAL', 'HIGH', 'URGENT']).default('all'),
    }))
    .query(async ({ ctx, input }) => {
      const { page, limit, search, status, type, priority } = input
      const skip = (page - 1) * limit

      let where: any = {}

      // Add search filter
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { subject: { contains: search, mode: 'insensitive' } },
          { company: { contains: search, mode: 'insensitive' } },
        ]
      }

      // Add status filter
      if (status !== 'all') {
        where.status = status
      }

      // Add type filter
      if (type !== 'all') {
        where.type = type
      }

      // Add priority filter
      if (priority !== 'all') {
        where.priority = priority
      }

      const [inquiries, total] = await Promise.all([
        ctx.db.contactInquiry.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            assignedToUser: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            }
          }
        }),
        ctx.db.contactInquiry.count({ where })
      ])

      return {
        inquiries,
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
      const inquiry = await ctx.db.contactInquiry.findUnique({
        where: { id: input.id },
        include: {
          assignedToUser: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        }
      })

      if (!inquiry) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Inquiry not found'
        })
      }

      return inquiry
    }),

  update: staffProcedure
    .input(updateInquirySchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input

      const inquiry = await ctx.db.contactInquiry.update({
        where: { id },
        data: {
          ...updateData,
          respondedAt: updateData.response ? new Date() : undefined,
        },
        include: {
          assignedToUser: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        }
      })

      // Send response email to customer if response is provided
      if (updateData.response) {
        try {
          await EmailService.sendInquiryResponseEmail({
            customerName: inquiry.name,
            customerEmail: inquiry.email,
            inquiryId: inquiry.id,
            subject: inquiry.subject,
            response: updateData.response,
          })
        } catch (error) {
          console.error('Failed to send inquiry response email:', error)
          // Don't fail the update if email fails
        }
      }

      return inquiry
    }),

  delete: staffProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.contactInquiry.delete({
        where: { id: input.id }
      })

      return { success: true }
    }),

  getStats: staffProcedure
    .query(async ({ ctx }) => {
      const [
        totalInquiries,
        pendingInquiries,
        inProgressInquiries,
        resolvedInquiries,
        inquiriesThisMonth,
        inquiriesByType,
        inquiriesByPriority
      ] = await Promise.all([
        ctx.db.contactInquiry.count(),
        ctx.db.contactInquiry.count({ where: { status: 'PENDING' } }),
        ctx.db.contactInquiry.count({ where: { status: 'IN_PROGRESS' } }),
        ctx.db.contactInquiry.count({ where: { status: 'RESOLVED' } }),
        ctx.db.contactInquiry.count({
          where: {
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          }
        }),
        ctx.db.contactInquiry.groupBy({
          by: ['type'],
          _count: {
            type: true
          },
          orderBy: {
            _count: {
              type: 'desc'
            }
          }
        }),
        ctx.db.contactInquiry.groupBy({
          by: ['priority'],
          _count: {
            priority: true
          },
          orderBy: {
            _count: {
              priority: 'desc'
            }
          }
        })
      ])

      return {
        totalInquiries,
        pendingInquiries,
        inProgressInquiries,
        resolvedInquiries,
        inquiriesThisMonth,
        inquiriesByType,
        inquiriesByPriority
      }
    }),

  assign: staffProcedure
    .input(z.object({
      inquiryId: z.string(),
      userId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const inquiry = await ctx.db.contactInquiry.update({
        where: { id: input.inquiryId },
        data: {
          assignedTo: input.userId,
          status: 'IN_PROGRESS',
        },
        include: {
          assignedToUser: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        }
      })

      return inquiry
    }),

  bulkUpdate: staffProcedure
    .input(z.object({
      inquiryIds: z.array(z.string()),
      status: z.enum(['PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']).optional(),
      priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).optional(),
      assignedTo: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { inquiryIds, ...updateData } = input

      const updatedInquiries = await ctx.db.contactInquiry.updateMany({
        where: {
          id: {
            in: inquiryIds
          }
        },
        data: updateData
      })

      return {
        count: updatedInquiries.count,
        success: true
      }
    }),
})
