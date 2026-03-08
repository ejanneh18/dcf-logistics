import Stripe from 'stripe'

// Initialize Stripe conditionally
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-05-28.basil',
    })
  : null

export interface CreatePaymentIntentData {
  amount: number // in cents
  currency: string
  customerId?: string
  invoiceId?: string
  description?: string
  metadata?: Record<string, string>
}

export interface CreateCustomerData {
  email: string
  name?: string
  phone?: string
  address?: {
    line1: string
    line2?: string
    city: string
    state?: string
    postal_code: string
    country: string
  }
}

export class StripeService {
  static async createPaymentIntent(data: CreatePaymentIntentData): Promise<Stripe.PaymentIntent> {
    this.ensureConfigured()

    if (!stripe) {
      console.error('Stripe not configured. Please set STRIPE_SECRET_KEY environment variable.')
      throw new Error('Stripe not configured')
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(data.amount), // Ensure it's an integer
        currency: data.currency.toLowerCase(),
        customer: data.customerId,
        description: data.description,
        metadata: {
          invoiceId: data.invoiceId || '',
          ...data.metadata,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      })

      return paymentIntent
    } catch (error) {
      console.error('Stripe payment intent creation error:', error)
      throw new Error('Failed to create payment intent')
    }
  }

  static async createCustomer(data: CreateCustomerData): Promise<Stripe.Customer> {
    this.ensureConfigured()

    if (!stripe) {
      console.error('Stripe not configured. Please set STRIPE_SECRET_KEY environment variable.')
      throw new Error('Stripe not configured')
    }

    try {
      const customer = await stripe.customers.create({
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address,
      })

      return customer
    } catch (error) {
      console.error('Stripe customer creation error:', error)
      throw new Error('Failed to create customer')
    }
  }

  static async updateCustomer(customerId: string, data: Partial<CreateCustomerData>): Promise<Stripe.Customer> {
    this.ensureConfigured()

    if (!stripe) {
      console.error('Stripe not configured. Please set STRIPE_SECRET_KEY environment variable.')
      throw new Error('Stripe not configured')
    }

    try {
      const customer = await stripe.customers.update(customerId, {
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address,
      })

      return customer
    } catch (error) {
      console.error('Stripe customer update error:', error)
      throw new Error('Failed to update customer')
    }
  }

  static async retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    this.ensureConfigured()

    if (!stripe) {
      console.error('Stripe not configured. Please set STRIPE_SECRET_KEY environment variable.')
      throw new Error('Stripe not configured')
    }

    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
      return paymentIntent
    } catch (error) {
      console.error('Stripe payment intent retrieval error:', error)
      throw new Error('Failed to retrieve payment intent')
    }
  }

  static async confirmPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    if (!stripe) {
      console.error('Stripe not configured. Please set STRIPE_SECRET_KEY environment variable.')
      throw new Error('Stripe not configured')
    }

    try {
      const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId)
      return paymentIntent
    } catch (error) {
      console.error('Stripe payment intent confirmation error:', error)
      throw new Error('Failed to confirm payment intent')
    }
  }

  static async cancelPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    if (!stripe) {
      console.error('Stripe not configured. Please set STRIPE_SECRET_KEY environment variable.')
      throw new Error('Stripe not configured')
    }

    try {
      const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId)
      return paymentIntent
    } catch (error) {
      console.error('Stripe payment intent cancellation error:', error)
      throw new Error('Failed to cancel payment intent')
    }
  }

  static async createRefund(paymentIntentId: string, amount?: number): Promise<Stripe.Refund> {
    if (!stripe) {
      console.error('Stripe not configured. Please set STRIPE_SECRET_KEY environment variable.')
      throw new Error('Stripe not configured')
    }

    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount ? Math.round(amount) : undefined,
      })

      return refund
    } catch (error) {
      console.error('Stripe refund creation error:', error)
      throw new Error('Failed to create refund')
    }
  }

  static async listPaymentMethods(customerId: string): Promise<Stripe.PaymentMethod[]> {
    if (!stripe) {
      console.error('Stripe not configured. Please set STRIPE_SECRET_KEY environment variable.')
      throw new Error('Stripe not configured')
    }

    try {
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
      })

      return paymentMethods.data
    } catch (error) {
      console.error('Stripe payment methods list error:', error)
      throw new Error('Failed to list payment methods')
    }
  }

  static async createSetupIntent(customerId: string): Promise<Stripe.SetupIntent> {
    if (!stripe) {
      console.error('Stripe not configured. Please set STRIPE_SECRET_KEY environment variable.')
      throw new Error('Stripe not configured')
    }

    try {
      const setupIntent = await stripe.setupIntents.create({
        customer: customerId,
        payment_method_types: ['card'],
      })

      return setupIntent
    } catch (error) {
      console.error('Stripe setup intent creation error:', error)
      throw new Error('Failed to create setup intent')
    }
  }

  static async constructWebhookEvent(
    payload: string | Buffer,
    signature: string,
    secret: string
  ): Promise<Stripe.Event> {
    this.ensureConfigured()

    if (!stripe) {
      console.error('Stripe not configured. Please set STRIPE_SECRET_KEY environment variable.')
      throw new Error('Stripe not configured')
    }

    try {
      const event = stripe.webhooks.constructEvent(payload, signature, secret)
      return event
    } catch (error) {
      console.error('Stripe webhook verification error:', error)
      throw new Error('Failed to verify webhook signature')
    }
  }

  static async getInvoice(invoiceId: string): Promise<Stripe.Invoice> {
    if (!stripe) {
      console.error('Stripe not configured. Please set STRIPE_SECRET_KEY environment variable.')
      throw new Error('Stripe not configured')
    }

    try {
      const invoice = await stripe.invoices.retrieve(invoiceId)
      return invoice
    } catch (error) {
      console.error('Stripe invoice retrieval error:', error)
      throw new Error('Failed to retrieve invoice')
    }
  }

  static async createInvoice(data: {
    customer: string
    description?: string
    metadata?: Record<string, string>
  }): Promise<Stripe.Invoice> {
    if (!stripe) {
      console.error('Stripe not configured. Please set STRIPE_SECRET_KEY environment variable.')
      throw new Error('Stripe not configured')
    }

    try {
      const invoice = await stripe.invoices.create({
        customer: data.customer,
        description: data.description,
        metadata: data.metadata,
        auto_advance: true,
      })

      return invoice
    } catch (error) {
      console.error('Stripe invoice creation error:', error)
      throw new Error('Failed to create invoice')
    }
  }

  static async addInvoiceItem(data: {
    customer: string
    amount: number
    currency: string
    description?: string
    invoice?: string
  }): Promise<Stripe.InvoiceItem> {
    if (!stripe) {
      console.error('Stripe not configured. Please set STRIPE_SECRET_KEY environment variable.')
      throw new Error('Stripe not configured')
    }

    try {
      const invoiceItem = await stripe.invoiceItems.create({
        customer: data.customer,
        amount: Math.round(data.amount),
        currency: data.currency.toLowerCase(),
        description: data.description,
        invoice: data.invoice,
      })

      return invoiceItem
    } catch (error) {
      console.error('Stripe invoice item creation error:', error)
      throw new Error('Failed to create invoice item')
    }
  }

  static async finalizeInvoice(invoiceId: string): Promise<Stripe.Invoice> {
    if (!stripe) {
      console.error('Stripe not configured. Please set STRIPE_SECRET_KEY environment variable.')
      throw new Error('Stripe not configured')
    }

    try {
      const invoice = await stripe.invoices.finalizeInvoice(invoiceId)
      return invoice
    } catch (error) {
      console.error('Stripe invoice finalization error:', error)
      throw new Error('Failed to finalize invoice')
    }
  }

  static async sendInvoice(invoiceId: string): Promise<Stripe.Invoice> {
    if (!stripe) {
      console.error('Stripe not configured. Please set STRIPE_SECRET_KEY environment variable.')
      throw new Error('Stripe not configured')
    }

    try {
      const invoice = await stripe.invoices.sendInvoice(invoiceId)
      return invoice
    } catch (error) {
      console.error('Stripe invoice sending error:', error)
      throw new Error('Failed to send invoice')
    }
  }

  static formatAmount(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  }

  static isConfigured(): boolean {
    return !!stripe && !!process.env.STRIPE_SECRET_KEY
  }

  private static ensureConfigured(): void {
    if (!stripe) {
      throw new Error('Stripe not configured. Please set STRIPE_SECRET_KEY environment variable.')
    }
  }
}

export { stripe }
export default StripeService
