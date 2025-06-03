import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { EmailService } from '@/lib/email/service'
import { rateLimit } from '@/lib/rate-limit'

// Required for Next.js 15 App Router
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Validation schema
const quoteRequestSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  company: z.string().optional(),
  serviceType: z.string().min(1, 'Service type is required'),
  origin: z.string().min(2, 'Origin is required'),
  destination: z.string().min(2, 'Destination is required'),
  shipmentDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
  cargoType: z.string().min(1, 'Cargo type is required'),
  cargoDetails: z.string().min(10, 'Cargo details must be at least 10 characters'),
  dimensions: z.string().optional(),
  weight: z.string().optional(),
  specialRequirements: z.string().optional(),
  additionalServices: z.array(z.string()).optional().default([]),
  estimatedValue: z.number().positive().optional(),
  currency: z.string().default('USD'),
})

// Rate limiting: 2 requests per 10 minutes per IP
const limiter = rateLimit({
  interval: 10 * 60 * 1000, // 10 minutes
  uniqueTokenPerInterval: 500,
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip ?? 'anonymous'
    const { success } = await limiter.check(2, ip)

    if (!success) {
      return NextResponse.json(
        { error: 'Too many quote requests. Please wait before submitting another request.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = quoteRequestSchema.parse(body)

    // Calculate estimated quote (simplified logic)
    const baseRates = {
      'Air Freight': 5.50,
      'Sea Freight': 1.20,
      'Ground Transportation': 2.80,
      'Express Delivery': 8.90,
    }

    let estimatedQuote: number | undefined
    const baseRate = baseRates[validatedData.serviceType as keyof typeof baseRates]

    if (baseRate && validatedData.weight) {
      const weightNum = parseFloat(validatedData.weight.replace(/[^\d.]/g, ''))
      if (!isNaN(weightNum)) {
        estimatedQuote = baseRate * weightNum

        // Add surcharges for additional services
        if (validatedData.additionalServices.includes('Insurance')) {
          estimatedQuote *= 1.05
        }
        if (validatedData.additionalServices.includes('Express Handling')) {
          estimatedQuote *= 1.15
        }
        if (validatedData.additionalServices.includes('Temperature Controlled')) {
          estimatedQuote *= 1.25
        }
      }
    }

    // Set quote validity (30 days from now)
    const validUntil = new Date()
    validUntil.setDate(validUntil.getDate() + 30)

    // Create quote request record
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        serviceType: validatedData.serviceType,
        origin: validatedData.origin,
        destination: validatedData.destination,
        shipmentDate: validatedData.shipmentDate,
        cargoType: validatedData.cargoType,
        cargoDetails: validatedData.cargoDetails,
        dimensions: validatedData.dimensions,
        weight: validatedData.weight,
        specialRequirements: validatedData.specialRequirements,
        additionalServices: validatedData.additionalServices,
        estimatedValue: validatedData.estimatedValue,
        currency: validatedData.currency,
        quotedAmount: estimatedQuote,
        validUntil,
        status: 'PENDING',
      },
    })

    // Determine estimated transit time
    let estimatedTransitTime = 'To be determined'
    if (validatedData.serviceType === 'Air Freight') {
      estimatedTransitTime = '1-3 business days'
    } else if (validatedData.serviceType === 'Express Delivery') {
      estimatedTransitTime = '24-48 hours'
    } else if (validatedData.serviceType === 'Ground Transportation') {
      estimatedTransitTime = '2-7 business days'
    } else if (validatedData.serviceType === 'Sea Freight') {
      estimatedTransitTime = '15-45 business days'
    }

    // Send quote response email to customer
    const quoteSent = await EmailService.sendQuoteResponseEmail({
      customerName: validatedData.fullName,
      email: validatedData.email,
      quoteId: quoteRequest.id,
      serviceType: validatedData.serviceType,
      origin: validatedData.origin,
      destination: validatedData.destination,
      quotedAmount: estimatedQuote,
      currency: validatedData.currency,
      validUntil,
      estimatedTransitTime,
      additionalServices: validatedData.additionalServices,
      notes: validatedData.specialRequirements ? `Special Requirements: ${validatedData.specialRequirements}` : undefined,
    })

    // Send notification to sales team
    const salesNotificationSent = await EmailService.sendContactNotificationEmail({
      name: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      subject: `Quote Request - ${validatedData.serviceType} from ${validatedData.origin} to ${validatedData.destination}`,
      message: `New quote request details:\n\nService: ${validatedData.serviceType}\nRoute: ${validatedData.origin} → ${validatedData.destination}\nCargo: ${validatedData.cargoType}\nDetails: ${validatedData.cargoDetails}\n${validatedData.weight ? `Weight: ${validatedData.weight}\n` : ''}${validatedData.dimensions ? `Dimensions: ${validatedData.dimensions}\n` : ''}${validatedData.specialRequirements ? `Special Requirements: ${validatedData.specialRequirements}\n` : ''}${validatedData.additionalServices.length > 0 ? `Additional Services: ${validatedData.additionalServices.join(', ')}\n` : ''}${estimatedQuote ? `Estimated Quote: ${validatedData.currency} ${estimatedQuote.toFixed(2)}` : ''}`,
      type: 'quote',
      inquiryId: quoteRequest.id,
      priority: 'high',
    })

    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully! You will receive a detailed quote via email shortly.',
      quoteId: quoteRequest.id,
      estimatedQuote: estimatedQuote ? {
        amount: estimatedQuote,
        currency: validatedData.currency,
        validUntil,
      } : undefined,
      quoteEmailSent: quoteSent,
    })

  } catch (error) {
    console.error('Quote request submission error:', error)

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
      { error: 'Failed to submit quote request. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}

// Get quote requests (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const serviceType = searchParams.get('serviceType')

    const skip = (page - 1) * limit

    const where: any = {}
    if (status) where.status = status
    if (serviceType) where.serviceType = serviceType

    const [quotes, total] = await Promise.all([
      prisma.quoteRequest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.quoteRequest.count({ where }),
    ])

    return NextResponse.json({
      quotes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })

  } catch (error) {
    console.error('Failed to fetch quote requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quote requests' },
      { status: 500 }
    )
  }
}
