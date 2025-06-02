import { z } from 'zod'
import { createTRPCRouter, staffProcedure } from '../server'
import { TRPCError } from '@trpc/server'
import { QuoteRequestStatus } from '@prisma/client'
import { EmailService } from '@/lib/email/service'

const updateQuoteSchema = z.object({
  id: z.string(),
  quotedAmount: z.number().positive().optional(),
  status: z.nativeEnum(QuoteRequestStatus).optional(),
  notes: z.string().optional(),
  validUntil: z.date().optional(),
})

const respondToQuoteSchema = z.object({
  id: z.string(),
  quotedAmount: z.number().positive(),
  notes: z.string().optional(),
  validDays: z.number().min(1).max(90).default(30),
})

const getQuotesSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.nativeEnum(QuoteRequestStatus).optional(),
  serviceType: z.string().optional(),
})

export const quotesRouter = createTRPCRouter({
  getAll: staffProcedure
    .input(getQuotesSchema)
    .query(async ({ ctx, input }) => {
      const { page, limit, search, status, serviceType } = input
      const skip = (page - 1) * limit

      let where: any = {}

      // Add search filter
      if (search) {
        where.OR = [
          { fullName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { company: { contains: search, mode: 'insensitive' } },
          { id: { contains: search, mode: 'insensitive' } },
        ]
      }

      // Add status filter
      if (status) {
        where.status = status
      }

      // Add service type filter
      if (serviceType) {
        where.serviceType = serviceType
      }

      const [quotes, total] = await Promise.all([
        ctx.db.quoteRequest.findMany({
          where,
          skip,
          take: limit,
          orderBy: [
            { status: 'asc' }, // Pending first
            { createdAt: 'desc' }
          ],
        }),
        ctx.db.quoteRequest.count({ where })
      ])

      return {
        quotes,
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
      }
    }),

  getById: staffProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const quote = await ctx.db.quoteRequest.findUnique({
        where: { id: input.id },
      })

      if (!quote) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Quote request not found'
        })
      }

      return quote
    }),

  getStats: staffProcedure
    .query(async ({ ctx }) => {
      const [
        totalQuotes,
        pendingQuotes,
        quotedQuotes,
        acceptedQuotes,
        rejectedQuotes,
        expiredQuotes,
        totalValue,
        recentQuotes
      ] = await Promise.all([
        ctx.db.quoteRequest.count(),
        ctx.db.quoteRequest.count({ where: { status: 'PENDING' } }),
        ctx.db.quoteRequest.count({ where: { status: 'QUOTED' } }),
        ctx.db.quoteRequest.count({ where: { status: 'ACCEPTED' } }),
        ctx.db.quoteRequest.count({ where: { status: 'REJECTED' } }),
        ctx.db.quoteRequest.count({ where: { status: 'EXPIRED' } }),
        ctx.db.quoteRequest.aggregate({
          _sum: { quotedAmount: true },
          where: { quotedAmount: { not: null } }
        }),
        ctx.db.quoteRequest.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            fullName: true,
            email: true,
            serviceType: true,
            status: true,
            quotedAmount: true,
            createdAt: true,
          }
        })
      ])

      return {
        totalQuotes,
        pendingQuotes,
        quotedQuotes,
        acceptedQuotes,
        rejectedQuotes,
        expiredQuotes,
        totalValue: totalValue._sum.quotedAmount || 0,
        recentQuotes,
      }
    }),

  update: staffProcedure
    .input(updateQuoteSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input

      const quote = await ctx.db.quoteRequest.findUnique({
        where: { id }
      })

      if (!quote) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Quote request not found'
        })
      }

      const updatedQuote = await ctx.db.quoteRequest.update({
        where: { id },
        data: {
          ...updateData,
          respondedAt: new Date(),
        }
      })

      return updatedQuote
    }),

  respondToQuote: staffProcedure
    .input(respondToQuoteSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, quotedAmount, notes, validDays } = input

      const quote = await ctx.db.quoteRequest.findUnique({
        where: { id }
      })

      if (!quote) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Quote request not found'
        })
      }

      if (quote.status !== 'PENDING') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Quote has already been responded to'
        })
      }

      // Calculate validity date
      const validUntil = new Date()
      validUntil.setDate(validUntil.getDate() + validDays)

      const updatedQuote = await ctx.db.quoteRequest.update({
        where: { id },
        data: {
          quotedAmount,
          notes,
          validUntil,
          status: 'QUOTED',
          respondedAt: new Date(),
        }
      })

      // Send quote response email
      try {
        await EmailService.sendQuoteResponseEmail({
          customerName: quote.fullName,
          email: quote.email,
          quoteId: quote.id,
          serviceType: quote.serviceType,
          origin: quote.origin,
          destination: quote.destination,
          quotedAmount,
          currency: quote.currency,
          validUntil,
          notes,
        })
      } catch (error) {
        console.error('Failed to send quote response email:', error)
        // Don't fail the quote update if email fails
      }

      return updatedQuote
    }),

  delete: staffProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const quote = await ctx.db.quoteRequest.findUnique({
        where: { id: input.id }
      })

      if (!quote) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Quote request not found'
        })
      }

      await ctx.db.quoteRequest.delete({
        where: { id: input.id }
      })

      return { success: true }
    }),
})
