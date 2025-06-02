import { Server as SocketIOServer } from 'socket.io'
import { Server as HTTPServer } from 'http'
import { NextApiRequest } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export interface TrackingUpdate {
  shipmentId: string
  trackingNumber: string
  status: string
  location?: {
    latitude: number
    longitude: number
    address: string
  }
  timestamp: Date
  message?: string
}

export interface NotificationData {
  type: 'shipment_update' | 'invoice_update' | 'payment_update' | 'system_alert'
  title: string
  message: string
  data?: any
  userId?: string
  shipmentId?: string
  invoiceId?: string
}

class WebSocketManager {
  private io: SocketIOServer | null = null
  private connectedUsers = new Map<string, Set<string>>() // userId -> Set of socketIds

  initialize(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.NEXTAUTH_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
      },
      path: '/api/socket',
    })

    this.io.on('connection', async (socket) => {
      console.log('Client connected:', socket.id)

      // Authenticate user
      const session = await this.authenticateSocket(socket)
      if (!session?.user) {
        socket.emit('error', { message: 'Authentication required' })
        socket.disconnect()
        return
      }

      const userId = session.user.id
      
      // Track connected user
      if (!this.connectedUsers.has(userId)) {
        this.connectedUsers.set(userId, new Set())
      }
      this.connectedUsers.get(userId)!.add(socket.id)

      // Join user-specific room
      socket.join(`user:${userId}`)

      // Join role-specific rooms
      if (session.user.role === 'ADMIN' || session.user.role === 'STAFF') {
        socket.join('staff')
      }

      // Handle shipment tracking subscription
      socket.on('subscribe_tracking', async (data: { shipmentId: string }) => {
        try {
          const shipment = await this.validateShipmentAccess(data.shipmentId, userId, session.user.role)
          if (shipment) {
            socket.join(`shipment:${data.shipmentId}`)
            socket.emit('tracking_subscribed', { shipmentId: data.shipmentId })
          } else {
            socket.emit('error', { message: 'Access denied to shipment' })
          }
        } catch (error) {
          socket.emit('error', { message: 'Failed to subscribe to tracking' })
        }
      })

      // Handle unsubscribe from tracking
      socket.on('unsubscribe_tracking', (data: { shipmentId: string }) => {
        socket.leave(`shipment:${data.shipmentId}`)
        socket.emit('tracking_unsubscribed', { shipmentId: data.shipmentId })
      })

      // Handle location updates (for staff/drivers)
      socket.on('location_update', async (data: {
        shipmentId: string
        latitude: number
        longitude: number
        address?: string
      }) => {
        if (session.user.role === 'ADMIN' || session.user.role === 'STAFF') {
          await this.handleLocationUpdate(data.shipmentId, {
            latitude: data.latitude,
            longitude: data.longitude,
            address: data.address || 'Unknown location',
          })
        }
      })

      // Handle disconnect
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
        
        // Remove from connected users
        const userSockets = this.connectedUsers.get(userId)
        if (userSockets) {
          userSockets.delete(socket.id)
          if (userSockets.size === 0) {
            this.connectedUsers.delete(userId)
          }
        }
      })
    })

    return this.io
  }

  private async authenticateSocket(socket: any) {
    try {
      // Get session from socket handshake
      const req = socket.request as NextApiRequest
      return await getServerSession(req, socket.request.res, authOptions)
    } catch (error) {
      console.error('Socket authentication error:', error)
      return null
    }
  }

  private async validateShipmentAccess(shipmentId: string, userId: string, userRole: string) {
    try {
      const where: any = { id: shipmentId }

      // If customer, only allow access to their own shipments
      if (userRole === 'CUSTOMER') {
        const customer = await db.customer.findUnique({
          where: { userId }
        })
        if (customer) {
          where.customerId = customer.id
        } else {
          return null
        }
      }

      return await db.shipment.findFirst({ where })
    } catch (error) {
      console.error('Shipment access validation error:', error)
      return null
    }
  }

  private async handleLocationUpdate(shipmentId: string, location: {
    latitude: number
    longitude: number
    address: string
  }) {
    try {
      // Update shipment location in database
      await db.shipment.update({
        where: { id: shipmentId },
        data: {
          currentLocation: location.address,
          // Store coordinates in metadata if needed
          metadata: {
            lastKnownLocation: {
              ...location,
              timestamp: new Date().toISOString(),
            }
          }
        }
      })

      // Broadcast location update to subscribers
      const trackingUpdate: TrackingUpdate = {
        shipmentId,
        trackingNumber: '', // Will be filled by the shipment data
        status: 'IN_TRANSIT',
        location,
        timestamp: new Date(),
        message: `Location updated: ${location.address}`,
      }

      this.broadcastTrackingUpdate(trackingUpdate)
    } catch (error) {
      console.error('Location update error:', error)
    }
  }

  // Public methods for broadcasting updates
  broadcastTrackingUpdate(update: TrackingUpdate) {
    if (!this.io) return

    // Broadcast to shipment subscribers
    this.io.to(`shipment:${update.shipmentId}`).emit('tracking_update', update)
    
    // Broadcast to staff
    this.io.to('staff').emit('tracking_update', update)
  }

  broadcastNotification(notification: NotificationData) {
    if (!this.io) return

    if (notification.userId) {
      // Send to specific user
      this.io.to(`user:${notification.userId}`).emit('notification', notification)
    } else {
      // Broadcast to all staff
      this.io.to('staff').emit('notification', notification)
    }
  }

  broadcastShipmentStatusUpdate(shipmentId: string, status: string, message?: string) {
    if (!this.io) return

    const update = {
      shipmentId,
      status,
      timestamp: new Date(),
      message,
    }

    this.io.to(`shipment:${shipmentId}`).emit('status_update', update)
    this.io.to('staff').emit('status_update', update)
  }

  getConnectedUsersCount(): number {
    return this.connectedUsers.size
  }

  getConnectedSocketsCount(): number {
    let total = 0
    this.connectedUsers.forEach(sockets => {
      total += sockets.size
    })
    return total
  }

  isUserConnected(userId: string): boolean {
    return this.connectedUsers.has(userId)
  }

  disconnectUser(userId: string) {
    if (!this.io) return

    const userSockets = this.connectedUsers.get(userId)
    if (userSockets) {
      userSockets.forEach(socketId => {
        const socket = this.io!.sockets.sockets.get(socketId)
        if (socket) {
          socket.disconnect()
        }
      })
      this.connectedUsers.delete(userId)
    }
  }
}

// Singleton instance
export const wsManager = new WebSocketManager()

export default wsManager
