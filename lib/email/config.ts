import sgMail from '@sendgrid/mail'
import nodemailer from 'nodemailer'

// SendGrid configuration
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

// Nodemailer configuration (fallback)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
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
  const fromEmail = options.from || process.env.FROM_EMAIL || 'noreply@dcflogistics.com'

  try {
    // Try SendGrid first if API key is available
    if (process.env.SENDGRID_API_KEY) {
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

    // Fallback to Nodemailer
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

    // Development mode - just log the email
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Email would be sent in production:')
      console.log('To:', options.to)
      console.log('Subject:', options.subject)
      console.log('HTML:', options.html.substring(0, 200) + '...')
      return true
    }

    throw new Error('No email service configured')
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

export { sgMail, transporter }
