import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, staffProcedure } from '../server'
import { TRPCError } from '@trpc/server'
import { InvoiceStatus, PaymentStatus, PaymentMethod, UserRole } from '@prisma/client'
import { EmailService } from '@/lib/email/service'
import { PrismaClient } from '@prisma/client'

// Helper function to generate invoice number
async function generateInvoiceNumber(db: PrismaClient): Promise<string> {
  const currentYear = new Date().getFullYear()
  const prefix = `INV-${currentYear}-`

  // Get the latest invoice number for this year
  const latestInvoice = await db.invoice.findFirst({
    where: {
      invoiceNumber: {
        startsWith: prefix
      }
    },
    orderBy: {
      invoiceNumber: 'desc'
    }
  })

  let nextNumber = 1
  if (latestInvoice) {
    const currentNumber = parseInt(latestInvoice.invoiceNumber.replace(prefix, ''))
    nextNumber = currentNumber + 1
  }

  return `${prefix}${nextNumber.toString().padStart(3, '0')}`
}

const createInvoiceSchema = z.object({
  customerId: z.string(),
  issueDate: z.date(),
  dueDate: z.date(),
  currency: z.string().default('USD'),
  notes: z.string().optional(),
  terms: z.string().optional(),
  status: z.nativeEnum(InvoiceStatus).default(InvoiceStatus.DRAFT),
  items: z.array(z.object({
    serviceId: z.string().optional(),
    description: z.string(),
    quantity: z.number().positive(),
    rate: z.number().positive(),
    amount: z.number().positive(),
  })),
  subtotalAmount: z.number(),
  taxRate: z.number().default(0),
  taxAmount: z.number().default(0),
  totalAmount: z.number(),
})

const updateInvoiceSchema = z.object({
  id: z.string(),
  status: z.nativeEnum(InvoiceStatus).optional(),
  dueDate: z.date().optional(),
  paidDate: z.date().optional(),
  notes: z.string().optional(),
})

const createPaymentSchema = z.object({
  invoiceId: z.string(),
  amount: z.number().positive(),
  method: z.nativeEnum(PaymentMethod),
  transactionId: z.string().optional(),
  currency: z.string().default('USD'),
})

export const invoicesRouter = createTRPCRouter({
  create: staffProcedure
    .input(createInvoiceSchema)
    .mutation(async ({ ctx, input }) => {
      const { items, ...invoiceData } = input

      // Verify customer exists
      const customer = await ctx.db.customer.findUnique({
        where: { id: input.customerId }
      })

      if (!customer) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Customer not found'
        })
      }

      // Generate invoice number
      const invoiceNumber = await generateInvoiceNumber(ctx.db)

      const invoice = await ctx.db.invoice.create({
        data: {
          invoiceNumber,
          customerId: input.customerId,
          issueDate: input.issueDate,
          dueDate: input.dueDate,
          currency: input.currency,
          notes: input.notes,
          terms: input.terms,
          status: input.status,
          subtotalAmount: input.subtotalAmount,
          taxRate: input.taxRate,
          taxAmount: input.taxAmount,
          totalAmount: input.totalAmount,
          items: {
            create: items.map(item => ({
              serviceId: item.serviceId,
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.rate,
              totalPrice: item.amount
            }))
          }
        },
        include: {
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
          items: true,
          payments: true,
        }
      })

      // Send invoice email notification if status is SENT
      if (input.status === InvoiceStatus.SENT) {
        try {
          await EmailService.sendInvoiceEmail({
            customerName: invoice.customer.user.name || 'Customer',
            customerEmail: invoice.customer.user.email,
            invoiceNumber: invoice.invoiceNumber,
            totalAmount: invoice.totalAmount.toNumber(),
            currency: invoice.currency,
            dueDate: invoice.dueDate,
          })
        } catch (error) {
          console.error('Failed to send invoice email:', error)
          // Don't fail the mutation if email fails
        }
      }

      return invoice
    }),

  getAll: protectedProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      status: z.nativeEnum(InvoiceStatus).optional(),
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
          { invoiceNumber: { contains: search, mode: 'insensitive' } },
          { customer: { user: { name: { contains: search, mode: 'insensitive' } } } },
          { customer: { user: { email: { contains: search, mode: 'insensitive' } } } },
        ]
      }

      const [invoices, total] = await Promise.all([
        ctx.db.invoice.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
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
            items: true,
            payments: true,
          }
        }),
        ctx.db.invoice.count({ where })
      ])

      return {
        invoices,
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

      const invoice = await ctx.db.invoice.findFirst({
        where,
        include: {
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
          items: true,
          quote: true,
          shipment: true,
          payments: true,
        }
      })

      if (!invoice) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Invoice not found'
        })
      }

      return invoice
    }),

  update: staffProcedure
    .input(updateInvoiceSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input

      const invoice = await ctx.db.invoice.update({
        where: { id },
        data: updateData,
        include: {
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
          items: true,
          payments: true,
        }
      })

      return invoice
    }),

  delete: staffProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Check if invoice has payments
      const paymentsCount = await ctx.db.payment.count({
        where: { invoiceId: input.id }
      })

      if (paymentsCount > 0) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Cannot delete invoice with payments'
        })
      }

      await ctx.db.invoice.delete({
        where: { id: input.id }
      })

      return { success: true }
    }),

  // Payment management
  createPayment: staffProcedure
    .input(createPaymentSchema)
    .mutation(async ({ ctx, input }) => {
      // Verify invoice exists
      const invoice = await ctx.db.invoice.findUnique({
        where: { id: input.invoiceId },
        include: { payments: true }
      })

      if (!invoice) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Invoice not found'
        })
      }

      // Check if payment amount doesn't exceed remaining balance
      const totalPaid = invoice.payments
        .filter(p => p.status === PaymentStatus.COMPLETED)
        .reduce((sum, p) => sum + p.amount.toNumber(), 0)

      const remainingBalance = invoice.totalAmount.toNumber() - totalPaid

      if (input.amount > remainingBalance) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Payment amount exceeds remaining balance'
        })
      }

      const payment = await ctx.db.payment.create({
        data: {
          ...input,
          status: PaymentStatus.COMPLETED,
          paidAt: new Date(),
        },
        include: {
          invoice: true
        }
      })

      // Update invoice status if fully paid
      const newTotalPaid = totalPaid + input.amount
      if (newTotalPaid >= invoice.totalAmount.toNumber()) {
        await ctx.db.invoice.update({
          where: { id: input.invoiceId },
          data: {
            status: InvoiceStatus.PAID,
            paidDate: new Date(),
          }
        })
      }

      return payment
    }),

  getPayments: protectedProcedure
    .input(z.object({
      invoiceId: z.string().optional(),
      page: z.number().default(1),
      limit: z.number().default(10),
    }))
    .query(async ({ ctx, input }) => {
      const { invoiceId, page, limit } = input
      const skip = (page - 1) * limit

      let where: any = {}

      if (invoiceId) {
        where.invoiceId = invoiceId
      }

      // Filter by customer if user is a customer
      if (ctx.session.user.role === UserRole.CUSTOMER) {
        const customer = await ctx.db.customer.findUnique({
          where: { userId: ctx.session.user.id }
        })
        if (customer) {
          where.invoice = { customerId: customer.id }
        }
      }

      const [payments, total] = await Promise.all([
        ctx.db.payment.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            invoice: {
              include: {
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
            }
          }
        }),
        ctx.db.payment.count({ where })
      ])

      return {
        payments,
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
        totalInvoices,
        paidInvoices,
        overdueInvoices,
        totalRevenue,
        pendingPayments,
        recentInvoices
      ] = await Promise.all([
        ctx.db.invoice.count(),
        ctx.db.invoice.count({ where: { status: InvoiceStatus.PAID } }),
        ctx.db.invoice.count({
          where: {
            status: { in: [InvoiceStatus.SENT, InvoiceStatus.OVERDUE] },
            dueDate: { lt: new Date() }
          }
        }),
        ctx.db.payment.aggregate({
          where: { status: PaymentStatus.COMPLETED },
          _sum: { amount: true }
        }),
        ctx.db.invoice.aggregate({
          where: { status: { in: [InvoiceStatus.SENT, InvoiceStatus.OVERDUE] } },
          _sum: { totalAmount: true }
        }),
        ctx.db.invoice.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
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
        totalInvoices,
        paidInvoices,
        overdueInvoices,
        totalRevenue: totalRevenue._sum.amount ? Number(totalRevenue._sum.amount) : 0,
        pendingPayments: pendingPayments._sum.totalAmount ? Number(pendingPayments._sum.totalAmount) : 0,
        recentInvoices
      }
    }),

  getNextInvoiceNumber: staffProcedure
    .query(async ({ ctx }) => {
      return await generateInvoiceNumber(ctx.db)
    }),
})
