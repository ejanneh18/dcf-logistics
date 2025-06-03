import { NextRequest, NextResponse } from 'next/server'
import { wsManager } from '@/lib/websocket/server'

// Required for Next.js 15 App Router
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// This endpoint provides WebSocket connection info
export async function GET(request: NextRequest) {
  try {
    const stats = {
      connected: wsManager.getConnectedUsersCount(),
      sockets: wsManager.getConnectedSocketsCount(),
      status: 'active',
    }

    return NextResponse.json({
      success: true,
      websocket: {
        endpoint: '/api/socket',
        stats,
      }
    })
  } catch (error) {
    console.error('WebSocket info error:', error)
    return NextResponse.json(
      { error: 'Failed to get WebSocket info' },
      { status: 500 }
    )
  }
}

// Handle WebSocket connection requests
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'broadcast_notification':
        wsManager.broadcastNotification(data)
        break

      case 'broadcast_tracking_update':
        wsManager.broadcastTrackingUpdate(data)
        break

      case 'broadcast_status_update':
        wsManager.broadcastShipmentStatusUpdate(
          data.shipmentId,
          data.status,
          data.message
        )
        break

      case 'disconnect_user':
        wsManager.disconnectUser(data.userId)
        break

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('WebSocket action error:', error)
    return NextResponse.json(
      { error: 'Failed to execute WebSocket action' },
      { status: 500 }
    )
  }
}
