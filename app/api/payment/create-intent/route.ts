import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { StripeService } from '@/lib/payment/stripe'
import { db } from '@/lib/db'
import { z } from 'zod'

// Required for Next.js 15 App Router
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const createIntentSchema = z.object({
  invoiceId: z.string(),
  amount: z.number().positive(),
  currency: z.string().default('USD'),
})

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!StripeService.isConfigured()) {
      return NextResponse.json(
        { error: 'Payment processing not configured' },
        { status: 503 }
      )
    }

    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const { invoiceId, amount, currency } = createIntentSchema.parse(body)

    // Verify invoice exists and user has access
    const invoice = await db.invoice.findFirst({
      where: {
        id: invoiceId,
        ...(session.user.role === 'CUSTOMER' ? {
          customer: {
            userId: session.user.id
          }
        } : {})
      },
      include: {
        customer: {
          include: {
            user: true
          }
        }
      }
    })

    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      )
    }

    // Check if invoice is already paid
    if (invoice.status === 'PAID') {
      return NextResponse.json(
        { error: 'Invoice is already paid' },
        { status: 400 }
      )
    }

    // Get or create Stripe customer
    let stripeCustomerId = invoice.customer.stripeCustomerId

    if (!stripeCustomerId) {
      const stripeCustomer = await StripeService.createCustomer({
        email: invoice.customer.user.email,
        name: invoice.customer.user.name || undefined,
        phone: invoice.customer.user.phone || undefined,
        address: invoice.customer.address ? {
          line1: invoice.customer.address,
          city: invoice.customer.city || '',
          postal_code: invoice.customer.postalCode || '',
          country: invoice.customer.country || 'US',
        } : undefined,
      })

      stripeCustomerId = stripeCustomer.id

      // Update customer with Stripe ID
      await db.customer.update({
        where: { id: invoice.customerId },
        data: { stripeCustomerId }
      })
    }

    // Create payment intent
    const paymentIntent = await StripeService.createPaymentIntent({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      customerId: stripeCustomerId,
      invoiceId,
      description: `Payment for invoice ${invoice.invoiceNumber}`,
      metadata: {
        invoiceId,
        invoiceNumber: invoice.invoiceNumber,
        customerId: invoice.customerId,
      }
    })

    // Save payment intent to database
    await db.payment.create({
      data: {
        invoiceId,
        amount,
        currency,
        method: 'STRIPE',
        status: 'PENDING',
        stripePaymentIntentId: paymentIntent.id,
        metadata: {
          stripeCustomerId,
          paymentIntentId: paymentIntent.id,
        }
      }
    })

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error('Payment intent creation error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const paymentIntentId = searchParams.get('payment_intent_id')

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent ID required' },
        { status: 400 }
      )
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await StripeService.retrievePaymentIntent(paymentIntentId)

    // Get payment record from database
    const payment = await db.payment.findFirst({
      where: {
        stripePaymentIntentId: paymentIntentId,
        ...(session.user.role === 'CUSTOMER' ? {
          invoice: {
            customer: {
              userId: session.user.id
            }
          }
        } : {})
      },
      include: {
        invoice: {
          include: {
            customer: {
              include: {
                user: true
              }
            }
          }
        }
      }
    })

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        stripeStatus: paymentIntent.status,
        invoice: {
          id: payment.invoice.id,
          invoiceNumber: payment.invoice.invoiceNumber,
        }
      }
    })
  } catch (error) {
    console.error('Payment intent retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve payment intent' },
      { status: 500 }
    )
  }
}
