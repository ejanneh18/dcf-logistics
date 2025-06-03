import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

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
  // In production, implement proper role-based access control
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: { role: true }
  })

  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return null
}

// Get newsletter subscribers
export async function GET(request: NextRequest) {
  const authError = await checkAdminAuth(request)
  if (authError) return authError

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const source = searchParams.get('source')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (status === 'active') where.isActive = true
    if (status === 'inactive') where.isActive = false
    if (source) where.source = source
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [subscribers, total] = await Promise.all([
      prisma.newsletterSubscriber.findMany({
        where,
        orderBy: { subscribedAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          isActive: true,
          source: true,
          subscribedAt: true,
          unsubscribedAt: true
        }
      }),
      prisma.newsletterSubscriber.count({ where })
    ])

    // Get statistics
    const stats = await prisma.newsletterSubscriber.groupBy({
      by: ['isActive'],
      _count: { isActive: true }
    })

    const statsObj = {
      total,
      active: stats.find(s => s.isActive)?._count.isActive || 0,
      inactive: stats.find(s => !s.isActive)?._count.isActive || 0
    }

    return NextResponse.json({
      subscribers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: statsObj
    })

  } catch (error) {
    console.error('Failed to fetch newsletter subscribers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}

// Update subscriber status
export async function PATCH(request: NextRequest) {
  const authError = await checkAdminAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { subscriberId, isActive } = body

    if (!subscriberId || typeof isActive !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }

    const updateData: any = { isActive }
    if (!isActive) {
      updateData.unsubscribedAt = new Date()
    } else {
      updateData.unsubscribedAt = null
    }

    const subscriber = await prisma.newsletterSubscriber.update({
      where: { id: subscriberId },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      subscriber
    })

  } catch (error) {
    console.error('Failed to update subscriber:', error)
    return NextResponse.json(
      { error: 'Failed to update subscriber' },
      { status: 500 }
    )
  }
}

// Export subscribers
export async function POST(request: NextRequest) {
  const authError = await checkAdminAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { format = 'csv', filters = {} } = body

    // Build where clause from filters
    const where: any = {}
    if (filters.status === 'active') where.isActive = true
    if (filters.status === 'inactive') where.isActive = false
    if (filters.source) where.source = filters.source

    const subscribers = await prisma.newsletterSubscriber.findMany({
      where,
      orderBy: { subscribedAt: 'desc' },
      select: {
        email: true,
        name: true,
        isActive: true,
        source: true,
        subscribedAt: true,
        unsubscribedAt: true
      }
    })

    if (format === 'csv') {
      const csvHeaders = ['Email', 'Name', 'Status', 'Source', 'Subscribed Date', 'Unsubscribed Date']
      const csvRows = subscribers.map(sub => [
        sub.email,
        sub.name || '',
        sub.isActive ? 'Active' : 'Inactive',
        sub.source || '',
        sub.subscribedAt.toISOString().split('T')[0],
        sub.unsubscribedAt ? sub.unsubscribedAt.toISOString().split('T')[0] : ''
      ])

      const csvContent = [csvHeaders, ...csvRows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n')

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    return NextResponse.json({ subscribers })

  } catch (error) {
    console.error('Failed to export subscribers:', error)
    return NextResponse.json(
      { error: 'Failed to export subscribers' },
      { status: 500 }
    )
  }
}
