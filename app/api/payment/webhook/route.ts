import { NextRequest, NextResponse } from 'next/server'
import { StripeService } from '@/lib/payment/stripe'
import { db } from '@/lib/db'
import { PaymentStatus, InvoiceStatus } from '@prisma/client'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe signature' },
        { status: 400 }
      )
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('Stripe webhook secret not configured')
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      )
    }

    // Verify webhook signature
    const event = await StripeService.constructWebhookEvent(
      body,
      signature,
      webhookSecret
    )

    console.log('Received Stripe webhook:', event.type)

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent)
        break

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent)
        break

      case 'payment_intent.canceled':
        await handlePaymentIntentCanceled(event.data.object as Stripe.PaymentIntent)
        break

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break

      case 'customer.created':
        await handleCustomerCreated(event.data.object as Stripe.Customer)
        break

      case 'customer.updated':
        await handleCustomerUpdated(event.data.object as Stripe.Customer)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    const payment = await db.payment.findFirst({
      where: { stripePaymentIntentId: paymentIntent.id },
      include: { invoice: true }
    })

    if (!payment) {
      console.error('Payment not found for payment intent:', paymentIntent.id)
      return
    }

    // Update payment status
    await db.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.COMPLETED,
        paidAt: new Date(),
        metadata: {
          ...payment.metadata,
          stripeChargeId: paymentIntent.latest_charge,
        }
      }
    })

    // Check if invoice is fully paid
    const totalPaid = await db.payment.aggregate({
      where: {
        invoiceId: payment.invoiceId,
        status: PaymentStatus.COMPLETED
      },
      _sum: { amount: true }
    })

    const totalPaidAmount = totalPaid._sum.amount?.toNumber() || 0
    const invoiceTotal = payment.invoice.totalAmount.toNumber()

    if (totalPaidAmount >= invoiceTotal) {
      // Mark invoice as paid
      await db.invoice.update({
        where: { id: payment.invoiceId },
        data: {
          status: InvoiceStatus.PAID,
          paidDate: new Date()
        }
      })

      console.log(`Invoice ${payment.invoice.invoiceNumber} marked as paid`)
    }

    console.log(`Payment ${payment.id} marked as completed`)
  } catch (error) {
    console.error('Error handling payment intent succeeded:', error)
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    const payment = await db.payment.findFirst({
      where: { stripePaymentIntentId: paymentIntent.id }
    })

    if (!payment) {
      console.error('Payment not found for payment intent:', paymentIntent.id)
      return
    }

    await db.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.FAILED,
        metadata: {
          ...payment.metadata,
          failureReason: paymentIntent.last_payment_error?.message,
        }
      }
    })

    console.log(`Payment ${payment.id} marked as failed`)
  } catch (error) {
    console.error('Error handling payment intent failed:', error)
  }
}

async function handlePaymentIntentCanceled(paymentIntent: Stripe.PaymentIntent) {
  try {
    const payment = await db.payment.findFirst({
      where: { stripePaymentIntentId: paymentIntent.id }
    })

    if (!payment) {
      console.error('Payment not found for payment intent:', paymentIntent.id)
      return
    }

    await db.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.CANCELLED,
      }
    })

    console.log(`Payment ${payment.id} marked as cancelled`)
  } catch (error) {
    console.error('Error handling payment intent canceled:', error)
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    // Handle Stripe-generated invoices if needed
    console.log(`Stripe invoice payment succeeded: ${invoice.id}`)
  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error)
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  try {
    // Handle Stripe-generated invoice payment failures if needed
    console.log(`Stripe invoice payment failed: ${invoice.id}`)
  } catch (error) {
    console.error('Error handling invoice payment failed:', error)
  }
}

async function handleCustomerCreated(customer: Stripe.Customer) {
  try {
    // Update customer record with Stripe ID if needed
    if (customer.email) {
      await db.customer.updateMany({
        where: {
          user: { email: customer.email },
          stripeCustomerId: null
        },
        data: {
          stripeCustomerId: customer.id
        }
      })
    }

    console.log(`Stripe customer created: ${customer.id}`)
  } catch (error) {
    console.error('Error handling customer created:', error)
  }
}

async function handleCustomerUpdated(customer: Stripe.Customer) {
  try {
    // Sync customer data if needed
    console.log(`Stripe customer updated: ${customer.id}`)
  } catch (error) {
    console.error('Error handling customer updated:', error)
  }
}
