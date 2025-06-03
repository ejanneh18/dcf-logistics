import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { EmailService } from '@/lib/email/service'

// Required for Next.js 15 App Router
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Admin authentication check
async function checkAdminAuth(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check if user has admin role
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: { role: true }
  })

  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return null
}

// Get contact inquiries
export async function GET(request: NextRequest) {
  const authError = await checkAdminAuth(request)
  if (authError) return authError

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const priority = searchParams.get('priority')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (status) where.status = status
    if (type) where.type = type
    if (priority) where.priority = priority
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [inquiries, total] = await Promise.all([
      prisma.contactInquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          company: true,
          subject: true,
          message: true,
          type: true,
          status: true,
          priority: true,
          createdAt: true,
          respondedAt: true,
          response: true
        }
      }),
      prisma.contactInquiry.count({ where })
    ])

    // Get statistics
    const stats = await prisma.contactInquiry.groupBy({
      by: ['status'],
      _count: { status: true }
    })

    const statsObj = {
      total,
      pending: stats.find(s => s.status === 'PENDING')?._count.status || 0,
      inProgress: stats.find(s => s.status === 'IN_PROGRESS')?._count.status || 0,
      resolved: stats.find(s => s.status === 'RESOLVED')?._count.status || 0
    }

    return NextResponse.json({
      inquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: statsObj
    })

  } catch (error) {
    console.error('Failed to fetch inquiries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}

// Update inquiry status or respond to inquiry
export async function PATCH(request: NextRequest) {
  const authError = await checkAdminAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { inquiryId, status, response } = body

    if (!inquiryId) {
      return NextResponse.json(
        { error: 'Inquiry ID is required' },
        { status: 400 }
      )
    }

    // Get the inquiry
    const inquiry = await prisma.contactInquiry.findUnique({
      where: { id: inquiryId }
    })

    if (!inquiry) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: any = {}
    if (status) updateData.status = status
    if (response) {
      updateData.response = response
      updateData.respondedAt = new Date()
      updateData.status = 'RESOLVED'
    }

    // Update the inquiry
    const updatedInquiry = await prisma.contactInquiry.update({
      where: { id: inquiryId },
      data: updateData
    })

    // Send response email if response was provided
    if (response) {
      try {
        await EmailService.sendEmail({
          to: inquiry.email,
          subject: `Re: ${inquiry.subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1f2937;">Response to Your Inquiry</h2>

              <p>Dear ${inquiry.name},</p>

              <p>Thank you for contacting DCF Logistics. We have reviewed your inquiry and here is our response:</p>

              <div style="background-color: #f9fafb; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: #1f2937;">Your Original Message:</h3>
                <p style="margin: 0; color: #6b7280;">${inquiry.message}</p>
              </div>

              <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 16px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: #1f2937;">Our Response:</h3>
                <p style="margin: 0; color: #374151; white-space: pre-wrap;">${response}</p>
              </div>

              <p>If you have any additional questions, please don't hesitate to contact us.</p>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">
                  Best regards,<br>
                  DCF Logistics Team<br>
                  Email: info@dcflogistics.com<br>
                  Phone: +220 123 4567
                </p>
              </div>
            </div>
          `
        })
      } catch (emailError) {
        console.error('Failed to send response email:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      inquiry: updatedInquiry
    })

  } catch (error) {
    console.error('Failed to update inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to update inquiry' },
      { status: 500 }
    )
  }
}

// Get inquiry details
export async function POST(request: NextRequest) {
  const authError = await checkAdminAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { inquiryId } = body

    if (!inquiryId) {
      return NextResponse.json(
        { error: 'Inquiry ID is required' },
        { status: 400 }
      )
    }

    const inquiry = await prisma.contactInquiry.findUnique({
      where: { id: inquiryId }
    })

    if (!inquiry) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ inquiry })

  } catch (error) {
    console.error('Failed to fetch inquiry details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inquiry details' },
      { status: 500 }
    )
  }
}
