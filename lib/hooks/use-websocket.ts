'use client'

import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { io, Socket } from 'socket.io-client'
import { TrackingUpdate, NotificationData } from '@/lib/websocket/server'

interface UseWebSocketOptions {
  autoConnect?: boolean
  onTrackingUpdate?: (update: TrackingUpdate) => void
  onNotification?: (notification: NotificationData) => void
  onStatusUpdate?: (update: any) => void
  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (error: any) => void
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const { data: session } = useSession()
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const socketRef = useRef<Socket | null>(null)

  const {
    autoConnect = true,
    onTrackingUpdate,
    onNotification,
    onStatusUpdate,
    onConnect,
    onDisconnect,
    onError,
  } = options

  const connect = () => {
    if (!session?.user || socketRef.current?.connected) {
      return
    }

    try {
      const socket = io(process.env.NEXT_PUBLIC_WS_URL || window.location.origin, {
        path: '/api/socket',
        transports: ['websocket', 'polling'],
        auth: {
          userId: session.user.id,
        },
      })

      socket.on('connect', () => {
        console.log('WebSocket connected')
        setIsConnected(true)
        setConnectionError(null)
        onConnect?.()
      })

      socket.on('disconnect', (reason) => {
        console.log('WebSocket disconnected:', reason)
        setIsConnected(false)
        onDisconnect?.()
      })

      socket.on('error', (error) => {
        console.error('WebSocket error:', error)
        setConnectionError(error.message || 'Connection error')
        onError?.(error)
      })

      socket.on('tracking_update', (update: TrackingUpdate) => {
        onTrackingUpdate?.(update)
      })

      socket.on('notification', (notification: NotificationData) => {
        onNotification?.(notification)
      })

      socket.on('status_update', (update: any) => {
        onStatusUpdate?.(update)
      })

      socket.on('tracking_subscribed', (data) => {
        console.log('Subscribed to tracking:', data.shipmentId)
      })

      socket.on('tracking_unsubscribed', (data) => {
        console.log('Unsubscribed from tracking:', data.shipmentId)
      })

      socketRef.current = socket
    } catch (error) {
      console.error('Failed to connect WebSocket:', error)
      setConnectionError('Failed to connect')
      onError?.(error)
    }
  }

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
      setIsConnected(false)
    }
  }

  const subscribeToTracking = (shipmentId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('subscribe_tracking', { shipmentId })
    }
  }

  const unsubscribeFromTracking = (shipmentId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('unsubscribe_tracking', { shipmentId })
    }
  }

  const updateLocation = (data: {
    shipmentId: string
    latitude: number
    longitude: number
    address?: string
  }) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('location_update', data)
    }
  }

  const sendMessage = (event: string, data: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data)
    }
  }

  // Auto-connect when session is available
  useEffect(() => {
    if (autoConnect && session?.user && !socketRef.current) {
      connect()
    }

    return () => {
      disconnect()
    }
  }, [session?.user, autoConnect])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [])

  return {
    isConnected,
    connectionError,
    connect,
    disconnect,
    subscribeToTracking,
    unsubscribeFromTracking,
    updateLocation,
    sendMessage,
    socket: socketRef.current,
  }
}

export default useWebSocket
