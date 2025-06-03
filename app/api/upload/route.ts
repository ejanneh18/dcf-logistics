import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { FileUploadService } from '@/lib/upload/config'
import { db } from '@/lib/db'

// Required for Next.js 15 App Router
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const documentType = formData.get('documentType') as string
    const shipmentId = formData.get('shipmentId') as string
    const description = formData.get('description') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Upload file
    const uploadResult = await FileUploadService.uploadFile(
      buffer,
      file.name,
      file.type,
      'documents'
    )

    // Save document record to database
    const document = await db.document.create({
      data: {
        filename: uploadResult.originalName,
        url: uploadResult.url,
        size: uploadResult.size,
        mimeType: uploadResult.mimeType,
        type: documentType || 'OTHER',
        description,
        shipmentId: shipmentId || undefined,
        uploadedById: session.user.id,
      },
    })

    return NextResponse.json({
      success: true,
      document: {
        id: document.id,
        filename: document.filename,
        url: document.url,
        size: document.size,
        type: document.type,
        description: document.description,
        createdAt: document.createdAt,
      },
    })
  } catch (error) {
    console.error('Upload error:', error)

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const documentId = searchParams.get('id')

    if (!documentId) {
      return NextResponse.json(
        { error: 'Document ID required' },
        { status: 400 }
      )
    }

    // Get document
    const document = await db.document.findUnique({
      where: { id: documentId },
    })

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    // Check permissions (only uploader or admin/staff can delete)
    if (
      document.uploadedById !== session.user.id &&
      !['ADMIN', 'STAFF'].includes(session.user.role)
    ) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    // Extract public ID from URL for deletion
    let publicId = ''
    if (document.url.includes('cloudinary.com')) {
      // Cloudinary URL - extract public ID
      const urlParts = document.url.split('/')
      const filename = urlParts[urlParts.length - 1]
      publicId = filename.split('.')[0]
    } else {
      // Local file - extract filename
      publicId = document.url.split('/').pop() || ''
    }

    // Delete file from storage
    await FileUploadService.deleteFile(publicId)

    // Delete document record
    await db.document.delete({
      where: { id: documentId },
    })

    return NextResponse.json({
      success: true,
      message: 'Document deleted successfully',
    })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Delete failed' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const shipmentId = searchParams.get('shipmentId')
    const type = searchParams.get('type')

    let where: any = {}

    // Filter by shipment if provided
    if (shipmentId) {
      where.shipmentId = shipmentId
    }

    // Filter by type if provided
    if (type) {
      where.type = type
    }

    // Filter by user if customer
    if (session.user.role === 'CUSTOMER') {
      // Only show documents uploaded by the user or related to their shipments
      where.OR = [
        { uploadedById: session.user.id },
        {
          shipment: {
            customer: {
              userId: session.user.id
            }
          }
        }
      ]
    }

    const documents = await db.document.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        uploadedBy: {
          select: {
            name: true,
            email: true,
          }
        },
        shipment: {
          select: {
            trackingNumber: true,
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      documents,
    })
  } catch (error) {
    console.error('Get documents error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}
