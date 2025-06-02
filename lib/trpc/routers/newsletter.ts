import { z } from 'zod'
import { createTRPCRouter, publicProcedure, staffProcedure } from '../server'
import { TRPCError } from '@trpc/server'
import { EmailService } from '@/lib/email/service'

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
  source: z.string().optional(),
})

const unsubscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  token: z.string().optional(),
})

const sendCampaignSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  content: z.string().min(1, 'Content is required'),
  recipientFilter: z.object({
    status: z.enum(['all', 'active', 'inactive']).default('active'),
    source: z.string().optional(),
  }).optional(),
})

export const newsletterRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(subscribeSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, name, source } = input

      // Check if already subscribed
      const existingSubscriber = await ctx.db.newsletterSubscriber.findUnique({
        where: { email }
      })

      if (existingSubscriber) {
        if (existingSubscriber.isActive) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Email is already subscribed to newsletter'
          })
        } else {
          // Reactivate subscription
          const subscriber = await ctx.db.newsletterSubscriber.update({
            where: { email },
            data: {
              isActive: true,
              name,
              source,
              unsubscribedAt: null,
            }
          })

          // Send welcome back email
          try {
            await EmailService.sendNewsletterWelcomeEmail({
              name: subscriber.name || 'Subscriber',
              email: subscriber.email,
              unsubscribeUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/newsletter/unsubscribe?email=${encodeURIComponent(subscriber.email)}&token=${subscriber.unsubscribeToken}`,
            })
          } catch (error) {
            console.error('Failed to send welcome email:', error)
          }

          return subscriber
        }
      }

      // Create new subscription
      const unsubscribeToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

      const subscriber = await ctx.db.newsletterSubscriber.create({
        data: {
          email,
          name,
          source,
          unsubscribeToken,
          isActive: true,
        }
      })

      // Send welcome email
      try {
        await EmailService.sendNewsletterWelcomeEmail({
          name: subscriber.name || 'Subscriber',
          email: subscriber.email,
          unsubscribeUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/newsletter/unsubscribe?email=${encodeURIComponent(subscriber.email)}&token=${subscriber.unsubscribeToken}`,
        })
      } catch (error) {
        console.error('Failed to send welcome email:', error)
        // Don't fail the subscription if email fails
      }

      return subscriber
    }),

  unsubscribe: publicProcedure
    .input(unsubscribeSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, token } = input

      const subscriber = await ctx.db.newsletterSubscriber.findUnique({
        where: { email }
      })

      if (!subscriber) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Email not found in newsletter subscribers'
        })
      }

      if (!subscriber.isActive) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Email is already unsubscribed'
        })
      }

      // Verify token if provided
      if (token && subscriber.unsubscribeToken !== token) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid unsubscribe token'
        })
      }

      const updatedSubscriber = await ctx.db.newsletterSubscriber.update({
        where: { email },
        data: {
          isActive: false,
          unsubscribedAt: new Date(),
        }
      })

      return updatedSubscriber
    }),

  getAll: staffProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      search: z.string().optional(),
      status: z.enum(['all', 'active', 'inactive']).default('all'),
      source: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const { page, limit, search, status, source } = input
      const skip = (page - 1) * limit

      let where: any = {}

      // Add search filter
      if (search) {
        where.OR = [
          { email: { contains: search, mode: 'insensitive' } },
          { name: { contains: search, mode: 'insensitive' } },
        ]
      }

      // Add status filter
      if (status !== 'all') {
        where.isActive = status === 'active'
      }

      // Add source filter
      if (source && source !== 'all') {
        where.source = source
      }

      const [subscribers, total] = await Promise.all([
        ctx.db.newsletterSubscriber.findMany({
          where,
          skip,
          take: limit,
          orderBy: { subscribedAt: 'desc' }
        }),
        ctx.db.newsletterSubscriber.count({ where })
      ])

      return {
        subscribers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    }),

  getStats: staffProcedure
    .query(async ({ ctx }) => {
      const [
        totalSubscribers,
        activeSubscribers,
        inactiveSubscribers,
        subscribersThisMonth,
        topSources
      ] = await Promise.all([
        ctx.db.newsletterSubscriber.count(),
        ctx.db.newsletterSubscriber.count({ where: { isActive: true } }),
        ctx.db.newsletterSubscriber.count({ where: { isActive: false } }),
        ctx.db.newsletterSubscriber.count({
          where: {
            subscribedAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          }
        }),
        ctx.db.newsletterSubscriber.groupBy({
          by: ['source'],
          _count: {
            source: true
          },
          where: {
            source: {
              not: null
            }
          },
          orderBy: {
            _count: {
              source: 'desc'
            }
          },
          take: 5
        })
      ])

      return {
        totalSubscribers,
        activeSubscribers,
        inactiveSubscribers,
        subscribersThisMonth,
        topSources
      }
    }),

  sendCampaign: staffProcedure
    .input(sendCampaignSchema)
    .mutation(async ({ ctx, input }) => {
      const { subject, content, recipientFilter } = input

      // Build recipient filter
      let where: any = {}

      if (recipientFilter?.status !== 'all') {
        where.isActive = recipientFilter.status === 'active'
      }

      if (recipientFilter?.source) {
        where.source = recipientFilter.source
      }

      // Get recipients
      const recipients = await ctx.db.newsletterSubscriber.findMany({
        where,
        select: {
          email: true,
          name: true,
          unsubscribeToken: true,
        }
      })

      if (recipients.length === 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'No recipients found matching the criteria'
        })
      }

      // Send emails (in production, this should be queued)
      let successCount = 0
      let failureCount = 0

      for (const recipient of recipients) {
        try {
          await EmailService.sendNewsletterCampaign({
            recipientName: recipient.name || 'Subscriber',
            recipientEmail: recipient.email,
            subject,
            content,
            unsubscribeUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/newsletter/unsubscribe?email=${encodeURIComponent(recipient.email)}&token=${recipient.unsubscribeToken}`,
          })
          successCount++
        } catch (error) {
          console.error(`Failed to send email to ${recipient.email}:`, error)
          failureCount++
        }
      }

      return {
        totalRecipients: recipients.length,
        successCount,
        failureCount,
        subject,
      }
    }),

  delete: staffProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.newsletterSubscriber.delete({
        where: { id: input.id }
      })

      return { success: true }
    }),
})
