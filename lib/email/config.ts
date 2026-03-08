import nodemailer from 'nodemailer'

// Optional: SendGrid (only loaded if installed + API key present)
let sgMail: any = null
if (process.env.SENDGRID_API_KEY) {
  try {
    // Dynamic import so the build doesn't fail when @sendgrid/mail isn't installed
    sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  } catch {
    console.warn('SendGrid not installed — falling back to SMTP')
  }
}

// Nodemailer SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
  }>
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const fromEmail = options.from || process.env.FROM_EMAIL || 'noreply@dcfagency.com'

  try {
    // Try SendGrid first if available
    if (sgMail) {
      const msg = {
        to: Array.isArray(options.to) ? options.to : [options.to],
        from: fromEmail,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments?.map(att => ({
          filename: att.filename,
          content: att.content,
          type: att.contentType,
        })),
      }

      await sgMail.send(msg)
      console.log('Email sent successfully via SendGrid')
      return true
    }

    // Fallback to Nodemailer SMTP
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const mailOptions = {
        from: fromEmail,
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments,
      }

      await transporter.sendMail(mailOptions)
      console.log('Email sent successfully via SMTP')
      return true
    }

    // Development / no-config mode — log only
    console.log('📧 Email would be sent in production:')
    console.log('To:', options.to)
    console.log('Subject:', options.subject)
    console.log('HTML:', options.html.substring(0, 200) + '...')
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

export { transporter }
