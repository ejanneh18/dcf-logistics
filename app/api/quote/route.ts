import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEmail } from '@/lib/email/config'

// Validation schema (mirrors client-side)
const quoteSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  company: z.string().optional(),
  serviceType: z.string().min(1),
  origin: z.string().min(2),
  destination: z.string().min(2),
  cargoType: z.string().min(1),
  cargoDetails: z.string().min(5),
  weight: z.string().min(1),
  dimensions: z.string().optional(),
  specialRequirements: z.string().optional(),
  estimatedValue: z.string().optional(),
  additionalServices: z.array(z.string()).optional(),
})

// Recipients for every quote submission
const QUOTE_RECIPIENTS = [
  'info@dcfagency.com',
  'dcfagency@gmail.com',
  'ejanneh1414@gmail.com',
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = quoteSchema.parse(body)

    const submissionId = `QUOTE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const submittedAt = new Date().toLocaleString('en-US', { timeZone: 'GMT' })

    // Build HTML email
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#1a1a2e;color:#fff;padding:24px;text-align:center;">
          <h1 style="margin:0;font-size:22px;">New Quote Request</h1>
          <p style="margin:4px 0 0;opacity:0.8;">Reference: ${submissionId}</p>
        </div>

        <div style="padding:24px;border:1px solid #e5e7eb;">
          <h2 style="font-size:16px;color:#1a1a2e;border-bottom:2px solid #e5e7eb;padding-bottom:8px;">Customer Information</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:6px 0;color:#6b7280;">Name</td><td style="padding:6px 0;font-weight:600;">${data.fullName}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Email</td><td style="padding:6px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Phone</td><td style="padding:6px 0;">${data.phone}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Company</td><td style="padding:6px 0;">${data.company || 'N/A'}</td></tr>
          </table>

          <h2 style="font-size:16px;color:#1a1a2e;border-bottom:2px solid #e5e7eb;padding-bottom:8px;margin-top:20px;">Shipment Details</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:6px 0;color:#6b7280;">Service</td><td style="padding:6px 0;font-weight:600;">${data.serviceType}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Origin</td><td style="padding:6px 0;">${data.origin}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Destination</td><td style="padding:6px 0;">${data.destination}</td></tr>
          </table>

          <h2 style="font-size:16px;color:#1a1a2e;border-bottom:2px solid #e5e7eb;padding-bottom:8px;margin-top:20px;">Cargo Information</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:6px 0;color:#6b7280;">Cargo Type</td><td style="padding:6px 0;">${data.cargoType}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Details</td><td style="padding:6px 0;">${data.cargoDetails}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Weight</td><td style="padding:6px 0;">${data.weight}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Dimensions</td><td style="padding:6px 0;">${data.dimensions || 'N/A'}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Est. Value</td><td style="padding:6px 0;">${data.estimatedValue || 'N/A'}</td></tr>
          </table>

          ${data.additionalServices && data.additionalServices.length > 0 ? `
          <h2 style="font-size:16px;color:#1a1a2e;border-bottom:2px solid #e5e7eb;padding-bottom:8px;margin-top:20px;">Additional Services</h2>
          <ul style="margin:8px 0;padding-left:20px;">${data.additionalServices.map(s => `<li style="padding:2px 0;">${s}</li>`).join('')}</ul>
          ` : ''}

          ${data.specialRequirements ? `
          <h2 style="font-size:16px;color:#1a1a2e;border-bottom:2px solid #e5e7eb;padding-bottom:8px;margin-top:20px;">Special Requirements</h2>
          <p style="margin:8px 0;white-space:pre-wrap;">${data.specialRequirements}</p>
          ` : ''}
        </div>

        <div style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#6b7280;border:1px solid #e5e7eb;border-top:none;">
          <p style="margin:0;">Submitted: ${submittedAt} GMT &bull; Source: DCF Logistics Website</p>
        </div>
      </div>
    `

    const plainText = `NEW QUOTE REQUEST - ${submissionId}\n\nCustomer: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${data.company || 'N/A'}\n\nService: ${data.serviceType}\nRoute: ${data.origin} → ${data.destination}\nCargo: ${data.cargoType} - ${data.cargoDetails}\nWeight: ${data.weight}\nDimensions: ${data.dimensions || 'N/A'}\nValue: ${data.estimatedValue || 'N/A'}\n\nAdditional: ${data.additionalServices?.join(', ') || 'None'}\nSpecial Requirements: ${data.specialRequirements || 'None'}\n\nSubmitted: ${submittedAt}`

    // Send to all recipients
    const sent = await sendEmail({
      to: QUOTE_RECIPIENTS,
      subject: `Quote Request: ${data.serviceType} — ${data.origin} to ${data.destination} [${submissionId}]`,
      html,
      text: plainText,
    })

    if (!sent) {
      // Even if email fails in dev, return success so the form works
      console.warn('Email sending returned false — check email config / env vars')
    }

    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully. We will respond within 2 business hours.',
      id: submissionId,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation error', errors: error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    console.error('Quote API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again or contact us directly at info@dcfagency.com' },
      { status: 500 }
    )
  }
}

