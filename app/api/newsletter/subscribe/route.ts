import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { EmailService } from '@/lib/email/service'
import { rateLimit } from '@/lib/rate-limit'

// Validation schema
const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
  source: z.string().optional(),
})

// Rate limiting: 5 requests per minute per IP
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 unique IPs per minute
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip ?? 'anonymous'
    const { success } = await limiter.check(5, ip)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = subscribeSchema.parse(body)

    // Check if email already exists
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: validatedData.email },
    })

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return NextResponse.json(
          { error: 'Email is already subscribed to our newsletter.' },
          { status: 400 }
        )
      } else {
        // Reactivate subscription
        await prisma.newsletterSubscriber.update({
          where: { email: validatedData.email },
          data: {
            isActive: true,
            name: validatedData.name || existingSubscriber.name,
            source: validatedData.source || existingSubscriber.source,
            subscribedAt: new Date(),
            unsubscribedAt: null,
          },
        })

        // Send welcome email
        await EmailService.sendNewsletterWelcomeEmail({
          name: validatedData.name,
          email: validatedData.email,
          unsubscribeUrl: `${process.env.NEXTAUTH_URL}/newsletter/unsubscribe?email=${encodeURIComponent(validatedData.email)}`,
        })

        return NextResponse.json({
          success: true,
          message: 'Successfully resubscribed to newsletter!',
        })
      }
    }

    // Create new subscription
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        source: validatedData.source || 'website',
        isActive: true,
      },
    })

    // Send welcome email
    await EmailService.sendNewsletterWelcomeEmail({
      name: validatedData.name,
      email: validatedData.email,
      unsubscribeUrl: `${process.env.NEXTAUTH_URL}/newsletter/unsubscribe?email=${encodeURIComponent(validatedData.email)}`,
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      subscriberId: subscriber.id,
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter. Please try again.' },
      { status: 500 }
    )
  }
}

// Unsubscribe endpoint
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailSchema = z.string().email()
    const validatedEmail = emailSchema.parse(email)

    // Update subscription status
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: validatedEmail },
    })

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Email not found in our newsletter list' },
        { status: 404 }
      )
    }

    await prisma.newsletterSubscriber.update({
      where: { email: validatedEmail },
      data: {
        isActive: false,
        unsubscribedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter',
    })

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to unsubscribe. Please try again.' },
      { status: 500 }
    )
  }
}
