import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { EmailService } from '@/lib/email/service'
import { rateLimit } from '@/lib/rate-limit'

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200, 'Subject too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message too long'),
  type: z.enum(['GENERAL', 'QUOTE', 'SUPPORT', 'COMPLAINT', 'PARTNERSHIP']).default('GENERAL'),
})

// Rate limiting: 3 requests per 5 minutes per IP
const limiter = rateLimit({
  interval: 5 * 60 * 1000, // 5 minutes
  uniqueTokenPerInterval: 500,
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip ?? 'anonymous'
    const { success } = await limiter.check(3, ip)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many contact requests. Please wait before submitting again.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Determine priority based on type and keywords
    let priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT' = 'NORMAL'
    const urgentKeywords = ['urgent', 'emergency', 'asap', 'immediate']
    const highKeywords = ['complaint', 'problem', 'issue', 'delay']
    
    const messageText = `${validatedData.subject} ${validatedData.message}`.toLowerCase()
    
    if (urgentKeywords.some(keyword => messageText.includes(keyword))) {
      priority = 'URGENT'
    } else if (validatedData.type === 'COMPLAINT' || highKeywords.some(keyword => messageText.includes(keyword))) {
      priority = 'HIGH'
    } else if (validatedData.type === 'QUOTE' || validatedData.type === 'PARTNERSHIP') {
      priority = 'HIGH'
    }

    // Create contact inquiry record
    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        subject: validatedData.subject,
        message: validatedData.message,
        type: validatedData.type,
        priority,
        status: 'PENDING',
      },
    })

    // Send confirmation email to customer
    const confirmationSent = await EmailService.sendContactConfirmationEmail({
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message,
      inquiryId: inquiry.id,
      type: validatedData.type.toLowerCase(),
    })

    // Send notification email to admin/support team
    const notificationSent = await EmailService.sendContactNotificationEmail({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      subject: validatedData.subject,
      message: validatedData.message,
      type: validatedData.type.toLowerCase(),
      inquiryId: inquiry.id,
      priority: priority.toLowerCase(),
    })

    // Log email sending status
    if (!confirmationSent) {
      console.warn(`Failed to send confirmation email for inquiry ${inquiry.id}`)
    }
    if (!notificationSent) {
      console.warn(`Failed to send notification email for inquiry ${inquiry.id}`)
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. We will respond within 24 hours.',
      inquiryId: inquiry.id,
      confirmationEmailSent: confirmationSent,
    })

  } catch (error) {
    console.error('Contact form submission error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid input data', 
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          }))
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}

// Get contact inquiries (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const priority = searchParams.get('priority')

    const skip = (page - 1) * limit

    const where: any = {}
    if (status) where.status = status
    if (type) where.type = type
    if (priority) where.priority = priority

    const [inquiries, total] = await Promise.all([
      prisma.contactInquiry.findMany({
        where,
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
      }),
      prisma.contactInquiry.count({ where }),
    ])

    return NextResponse.json({
      inquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })

  } catch (error) {
    console.error('Failed to fetch contact inquiries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}
