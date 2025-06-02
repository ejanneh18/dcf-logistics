'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useWebSocket } from '@/lib/hooks/use-websocket'
import { TrackingUpdate } from '@/lib/websocket/server'
import { 
  MapPin, 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Wifi,
  WifiOff,
  RefreshCw
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface RealTimeTrackerProps {
  shipmentId: string
  trackingNumber: string
  initialStatus?: string
  initialLocation?: string
}

export function RealTimeTracker({
  shipmentId,
  trackingNumber,
  initialStatus = 'PENDING',
  initialLocation = 'Unknown'
}: RealTimeTrackerProps) {
  const [currentStatus, setCurrentStatus] = useState(initialStatus)
  const [currentLocation, setCurrentLocation] = useState(initialLocation)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [trackingHistory, setTrackingHistory] = useState<TrackingUpdate[]>([])
  const [isSubscribed, setIsSubscribed] = useState(false)

  const {
    isConnected,
    connectionError,
    connect,
    subscribeToTracking,
    unsubscribeFromTracking,
  } = useWebSocket({
    onTrackingUpdate: (update: TrackingUpdate) => {
      if (update.shipmentId === shipmentId) {
        setCurrentStatus(update.status)
        if (update.location) {
          setCurrentLocation(update.location.address)
        }
        setLastUpdate(new Date(update.timestamp))
        
        // Add to history
        setTrackingHistory(prev => [update, ...prev.slice(0, 9)]) // Keep last 10 updates
      }
    },
    onStatusUpdate: (update: any) => {
      if (update.shipmentId === shipmentId) {
        setCurrentStatus(update.status)
        setLastUpdate(new Date(update.timestamp))
      }
    },
    onConnect: () => {
      // Auto-subscribe when connected
      if (!isSubscribed) {
        subscribeToTracking(shipmentId)
        setIsSubscribed(true)
      }
    },
    onDisconnect: () => {
      setIsSubscribed(false)
    }
  })

  const handleSubscribe = () => {
    if (isConnected) {
      subscribeToTracking(shipmentId)
      setIsSubscribed(true)
    }
  }

  const handleUnsubscribe = () => {
    unsubscribeFromTracking(shipmentId)
    setIsSubscribed(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-500'
      case 'IN_TRANSIT':
        return 'bg-blue-500'
      case 'PENDING':
        return 'bg-yellow-500'
      case 'CANCELLED':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return <CheckCircle className="h-4 w-4" />
      case 'IN_TRANSIT':
        return <Truck className="h-4 w-4" />
      case 'PENDING':
        return <Clock className="h-4 w-4" />
      case 'CANCELLED':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Real-time Tracking</CardTitle>
            <div className="flex items-center gap-2">
              {isConnected ? (
                <div className="flex items-center gap-1 text-green-600">
                  <Wifi className="h-4 w-4" />
                  <span className="text-sm">Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <WifiOff className="h-4 w-4" />
                  <span className="text-sm">Disconnected</span>
                </div>
              )}
              
              {!isSubscribed && isConnected && (
                <Button size="sm" variant="outline" onClick={handleSubscribe}>
                  Subscribe
                </Button>
              )}
              
              {isSubscribed && (
                <Button size="sm" variant="outline" onClick={handleUnsubscribe}>
                  Unsubscribe
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {connectionError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{connectionError}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${getStatusColor(currentStatus)}`}>
                {getStatusIcon(currentStatus)}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">{currentStatus.replace('_', ' ')}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <MapPin className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Location</p>
                <p className="font-medium">{currentLocation}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gray-100">
                <Clock className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Update</p>
                <p className="font-medium">
                  {formatDistanceToNow(lastUpdate, { addSuffix: true })}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tracking History */}
      {trackingHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trackingHistory.map((update, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className={`p-1 rounded-full ${getStatusColor(update.status)}`}>
                    {getStatusIcon(update.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{update.status.replace('_', ' ')}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(update.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                    {update.message && (
                      <p className="text-sm mt-1">{update.message}</p>
                    )}
                    {update.location && (
                      <p className="text-xs text-muted-foreground mt-1">
                        📍 {update.location.address}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tracking Number */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Tracking Number</p>
            <p className="text-lg font-mono font-bold">{trackingNumber}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {isSubscribed ? 'Receiving live updates' : 'Subscribe for live updates'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RealTimeTracker
