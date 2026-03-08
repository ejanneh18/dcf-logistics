import { render } from '@react-email/components'
import { sendEmail, EmailOptions } from './config'
import WelcomeEmail from './templates/welcome'
import ShipmentUpdateEmail from './templates/shipment-update'
import InvoiceEmail from './templates/invoice'
import NewsletterWelcomeEmail from './templates/newsletter-welcome'
import ContactConfirmationEmail from './templates/contact-confirmation'
import ContactNotificationEmail from './templates/contact-notification'
import QuoteResponseEmail from './templates/quote-response'
import { ShipmentStatus } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export interface WelcomeEmailData {
  name: string
  email: string
  loginUrl?: string
}

export interface ShipmentUpdateEmailData {
  customerName: string
  customerEmail: string
  trackingNumber: string
  status: ShipmentStatus
  origin: string
  destination: string
  estimatedDelivery?: Date
  actualDelivery?: Date
  trackingUrl?: string
}

export interface InvoiceEmailData {
  customerName: string
  customerEmail: string
  invoiceNumber: string
  totalAmount: number
  currency: string
  dueDate: Date
  invoiceUrl?: string
  paymentUrl?: string
}

export class EmailService {
  static async sendWelcomeEmail(data: WelcomeEmailData): Promise<boolean> {
    try {
      const html = await render(WelcomeEmail({
        name: data.name,
        email: data.email,
        loginUrl: data.loginUrl,
      }))

      const emailOptions: EmailOptions = {
        to: data.email,
        subject: 'Welcome to DCF Logistics!',
        html,
        text: `Welcome to DCF Logistics, ${data.name}! Your account has been created successfully.`,
      }

      return await sendEmail(emailOptions)
    } catch (error) {
      console.error('Failed to send welcome email:', error)
      return false
    }
  }

  static async sendShipmentUpdateEmail(data: ShipmentUpdateEmailData): Promise<boolean> {
    try {
      const html = await render(ShipmentUpdateEmail({
        customerName: data.customerName,
        trackingNumber: data.trackingNumber,
        status: data.status,
        origin: data.origin,
        destination: data.destination,
        estimatedDelivery: data.estimatedDelivery,
        actualDelivery: data.actualDelivery,
        trackingUrl: data.trackingUrl,
      }))

      const statusText = data.status.replace('_', ' ')
      const emailOptions: EmailOptions = {
        to: data.customerEmail,
        subject: `Shipment Update: ${data.trackingNumber} - ${statusText}`,
        html,
        text: `Your shipment ${data.trackingNumber} status has been updated to: ${statusText}`,
      }

      return await sendEmail(emailOptions)
    } catch (error) {
      console.error('Failed to send shipment update email:', error)
      return false
    }
  }

  static async sendInvoiceEmail(data: InvoiceEmailData): Promise<boolean> {
    try {
      const html = await render(InvoiceEmail({
        customerName: data.customerName,
        invoiceNumber: data.invoiceNumber,
        totalAmount: data.totalAmount,
        currency: data.currency,
        dueDate: data.dueDate,
        invoiceUrl: data.invoiceUrl,
        paymentUrl: data.paymentUrl,
      }))

      const emailOptions: EmailOptions = {
        to: data.customerEmail,
        subject: `New Invoice ${data.invoiceNumber} - $${data.totalAmount.toFixed(2)} ${data.currency}`,
        html,
        text: `You have a new invoice ${data.invoiceNumber} for $${data.totalAmount.toFixed(2)} ${data.currency}. Due date: ${data.dueDate.toLocaleDateString()}`,
      }

      return await sendEmail(emailOptions)
    } catch (error) {
      console.error('Failed to send invoice email:', error)
      return false
    }
  }

  static async sendPasswordResetEmail(email: string, name: string, resetUrl: string): Promise<boolean> {
    try {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Password Reset - DCF Logistics</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://dcflogistics.gm/logo.png" alt="DCF Logistics" style="height: 40px;">
            </div>

            <h1 style="color: #007cba; text-align: center;">Password Reset Request</h1>

            <p>Hello ${name},</p>

            <p>We received a request to reset your password for your DCF Logistics account.</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #007cba; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
            </div>

            <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>

            <p>This link will expire in 1 hour for security reasons.</p>

            <p>Best regards,<br>The DCF Logistics Team</p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 12px; color: #666; text-align: center;">
              DCF Logistics | Serekunda, The Gambia | +220 395 1020
            </p>
          </div>
        </body>
        </html>
      `

      const emailOptions: EmailOptions = {
        to: email,
        subject: 'Password Reset - DCF Logistics',
        html,
        text: `Hello ${name}, we received a request to reset your password. Click this link to reset: ${resetUrl}`,
      }

      return await sendEmail(emailOptions)
    } catch (error) {
      console.error('Failed to send password reset email:', error)
      return false
    }
  }

  // Newsletter subscription email
  static async sendNewsletterWelcomeEmail(data: {
    name?: string
    email: string
    unsubscribeUrl?: string
  }): Promise<boolean> {
    try {
      const html = await render(NewsletterWelcomeEmail({
        name: data.name,
        email: data.email,
        unsubscribeUrl: data.unsubscribeUrl,
      }))

      const emailOptions: EmailOptions = {
        to: data.email,
        subject: 'Welcome to DCF Logistics Newsletter!',
        html,
        text: `Welcome to DCF Logistics Newsletter! Thank you for subscribing with ${data.email}.`,
      }

      return await this.queueEmail(emailOptions, 'newsletter-welcome', data)
    } catch (error) {
      console.error('Failed to send newsletter welcome email:', error)
      return false
    }
  }

  // Contact form confirmation email
  static async sendContactConfirmationEmail(data: {
    name: string
    email: string
    subject: string
    message: string
    inquiryId: string
    type?: string
  }): Promise<boolean> {
    try {
      const html = await render(ContactConfirmationEmail({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        inquiryId: data.inquiryId,
        type: data.type,
      }))

      const emailOptions: EmailOptions = {
        to: data.email,
        subject: `Thank you for contacting DCF Logistics - Ref: ${data.inquiryId}`,
        html,
        text: `Thank you for contacting DCF Logistics, ${data.name}. We've received your inquiry and will respond within 24 hours.`,
      }

      return await this.queueEmail(emailOptions, 'contact-confirmation', data)
    } catch (error) {
      console.error('Failed to send contact confirmation email:', error)
      return false
    }
  }

  // Contact form notification email (to admin)
  static async sendContactNotificationEmail(data: {
    name: string
    email: string
    phone?: string
    company?: string
    subject: string
    message: string
    type: string
    inquiryId: string
    priority?: string
  }): Promise<boolean> {
    try {
      const html = await render(ContactNotificationEmail(data))

      const emailOptions: EmailOptions = {
        to: process.env.CONTACT_EMAIL || 'info@dcfagency.com',
        subject: `New ${data.type} inquiry from ${data.name} - ${data.subject}`,
        html,
        text: `New ${data.type} inquiry from ${data.name} (${data.email}): ${data.message}`,
      }

      return await this.queueEmail(emailOptions, 'contact-notification', data)
    } catch (error) {
      console.error('Failed to send contact notification email:', error)
      return false
    }
  }

  // Quote response email
  static async sendQuoteResponseEmail(data: {
    customerName: string
    email: string
    quoteId: string
    serviceType: string
    origin: string
    destination: string
    quotedAmount?: number
    currency?: string
    validUntil?: Date
    estimatedTransitTime?: string
    additionalServices?: string[]
    notes?: string
  }): Promise<boolean> {
    try {
      const html = await render(QuoteResponseEmail(data))

      const emailOptions: EmailOptions = {
        to: data.email,
        subject: `Your logistics quote from DCF Logistics - Quote #${data.quoteId}`,
        html,
        text: `Your logistics quote from DCF Logistics is ready. Quote #${data.quoteId} for ${data.serviceType} service from ${data.origin} to ${data.destination}.`,
      }

      return await this.queueEmail(emailOptions, 'quote-response', data)
    } catch (error) {
      console.error('Failed to send quote response email:', error)
      return false
    }
  }

  // Newsletter campaign email
  static async sendNewsletterCampaign(data: {
    recipientName: string
    recipientEmail: string
    subject: string
    content: string
    unsubscribeUrl: string
  }): Promise<boolean> {
    try {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${data.subject} - DCF Logistics</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://dcflogistics.gm/logo.png" alt="DCF Logistics" style="height: 40px;">
          </div>

          <h1 style="color: #007cba; text-align: center;">${data.subject}</h1>

          <p>Hello ${data.recipientName},</p>

          <div style="margin: 30px 0;">
            ${data.content}
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

          <p style="font-size: 12px; color: #666; text-align: center;">
            You're receiving this email because you subscribed to DCF Logistics newsletter.<br>
            <a href="${data.unsubscribeUrl}" style="color: #007cba;">Unsubscribe</a> |
            DCF Logistics | Serekunda, The Gambia | +220 395 1020
          </p>
        </body>
        </html>
      `

      const emailOptions: EmailOptions = {
        to: data.recipientEmail,
        subject: data.subject,
        html,
        text: `${data.subject}\n\nHello ${data.recipientName},\n\n${data.content.replace(/<[^>]*>/g, '')}\n\nUnsubscribe: ${data.unsubscribeUrl}`,
      }

      return await this.queueEmail(emailOptions, 'newsletter-campaign', data)
    } catch (error) {
      console.error('Failed to send newsletter campaign email:', error)
      return false
    }
  }

  // Email queue system for reliable delivery
  static async queueEmail(
    emailOptions: EmailOptions,
    templateName: string,
    templateData: any
  ): Promise<boolean> {
    try {
      // Try to send immediately first
      const sent = await sendEmail(emailOptions)

      if (sent) {
        // Log successful send
        await prisma.emailQueue.create({
          data: {
            to: Array.isArray(emailOptions.to) ? emailOptions.to.join(',') : emailOptions.to,
            subject: emailOptions.subject,
            htmlContent: emailOptions.html,
            textContent: emailOptions.text || '',
            templateName,
            templateData,
            status: 'SENT',
            sentAt: new Date(),
          },
        })
        return true
      } else {
        // Queue for retry
        await prisma.emailQueue.create({
          data: {
            to: Array.isArray(emailOptions.to) ? emailOptions.to.join(',') : emailOptions.to,
            subject: emailOptions.subject,
            htmlContent: emailOptions.html,
            textContent: emailOptions.text || '',
            templateName,
            templateData,
            status: 'PENDING',
          },
        })
        return false
      }
    } catch (error) {
      console.error('Failed to queue email:', error)

      // Still try to queue it for later retry
      try {
        await prisma.emailQueue.create({
          data: {
            to: Array.isArray(emailOptions.to) ? emailOptions.to.join(',') : emailOptions.to,
            subject: emailOptions.subject,
            htmlContent: emailOptions.html,
            textContent: emailOptions.text || '',
            templateName,
            templateData,
            status: 'PENDING',
            lastError: error instanceof Error ? error.message : 'Unknown error',
          },
        })
      } catch (queueError) {
        console.error('Failed to queue email for retry:', queueError)
      }

      return false
    }
  }

  // Process email queue (for background job)
  static async processEmailQueue(): Promise<void> {
    try {
      const pendingEmails = await prisma.emailQueue.findMany({
        where: {
          status: 'PENDING',
          attempts: { lt: 3 },
        },
        orderBy: { createdAt: 'asc' },
        take: 10, // Process 10 at a time
      })

      for (const email of pendingEmails) {
        try {
          const emailOptions: EmailOptions = {
            to: email.to,
            subject: email.subject,
            html: email.htmlContent,
            text: email.textContent || undefined,
          }

          const sent = await sendEmail(emailOptions)

          if (sent) {
            await prisma.emailQueue.update({
              where: { id: email.id },
              data: {
                status: 'SENT',
                sentAt: new Date(),
                attempts: email.attempts + 1,
              },
            })
          } else {
            await prisma.emailQueue.update({
              where: { id: email.id },
              data: {
                attempts: email.attempts + 1,
                lastError: 'Failed to send email',
                status: email.attempts + 1 >= 3 ? 'FAILED' : 'PENDING',
              },
            })
          }
        } catch (error) {
          await prisma.emailQueue.update({
            where: { id: email.id },
            data: {
              attempts: email.attempts + 1,
              lastError: error instanceof Error ? error.message : 'Unknown error',
              status: email.attempts + 1 >= 3 ? 'FAILED' : 'PENDING',
            },
          })
        }
      }
    } catch (error) {
      console.error('Failed to process email queue:', error)
    }
  }
}

export default EmailService
