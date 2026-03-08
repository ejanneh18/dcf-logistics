'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Search, 
  Package, 
  Truck, 
  Plane, 
  Ship, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  User,
  Phone,
  Mail
} from 'lucide-react'

interface TrackingEvent {
  id: string
  timestamp: string
  location: string
  status: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

interface ShipmentDetails {
  trackingNumber: string
  status: 'in-transit' | 'delivered' | 'pending' | 'delayed'
  service: string
  origin: string
  destination: string
  estimatedDelivery: string
  actualDelivery?: string
  progress: number
  events: TrackingEvent[]
  shipmentInfo: {
    weight: string
    dimensions: string
    value: string
    recipient: string
    phone: string
    email: string
  }
}

export default function EnhancedTracking() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [shipmentData, setShipmentData] = useState<ShipmentDetails | null>(null)
  const [error, setError] = useState('')

  const handleTrackingSearch = async () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number')
      return
    }

    setIsSearching(true)
    setError('')

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock tracking data
    const mockData: ShipmentDetails = {
      trackingNumber: trackingNumber.toUpperCase(),
      status: 'in-transit',
      service: 'Air Express',
      origin: 'Banjul, Gambia',
      destination: 'Lagos, Nigeria',
      estimatedDelivery: '2024-01-15 14:00',
      progress: 75,
      events: [
        {
          id: '1',
          timestamp: '2024-01-12 09:00',
          location: 'Banjul Port, Gambia',
          status: 'Picked Up',
          description: 'Package picked up from sender',
          icon: Package
        },
        {
          id: '2',
          timestamp: '2024-01-12 14:30',
          location: 'Banjul Airport, Gambia',
          status: 'In Transit',
          description: 'Departed from origin facility',
          icon: Plane
        },
        {
          id: '3',
          timestamp: '2024-01-13 08:15',
          location: 'Lagos Airport, Nigeria',
          status: 'Arrived',
          description: 'Arrived at destination country',
          icon: MapPin
        },
        {
          id: '4',
          timestamp: '2024-01-13 16:45',
          location: 'Lagos Customs, Nigeria',
          status: 'Customs Clearance',
          description: 'Undergoing customs inspection',
          icon: AlertCircle
        },
        {
          id: '5',
          timestamp: '2024-01-14 10:20',
          location: 'Lagos Distribution Center',
          status: 'Out for Delivery',
          description: 'Package is out for delivery',
          icon: Truck
        }
      ],
      shipmentInfo: {
        weight: '5.2 kg',
        dimensions: '40 x 30 x 20 cm',
        value: '$250.00',
        recipient: 'John Doe',
        phone: '+234 123 456 789',
        email: 'john.doe@example.com'
      }
    }

    setShipmentData(mockData)
    setIsSearching(false)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-500'
      case 'in-transit':
      case 'out for delivery':
        return 'bg-blue-500'
      case 'delayed':
        return 'bg-red-500'
      case 'pending':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'default' as const
      case 'in-transit':
      case 'out for delivery':
        return 'secondary' as const
      case 'delayed':
        return 'destructive' as const
      default:
        return 'outline' as const
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Search className="h-6 w-6" />
            Track Your Shipment
          </CardTitle>
          <CardDescription className="text-center text-lg">
            Enter your tracking number to get real-time updates on your shipment status.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="tracking" className="sr-only">Tracking Number</Label>
              <Input
                id="tracking"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number (e.g., DCF123456789)"
                className="text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleTrackingSearch()}
              />
            </div>
            <Button 
              onClick={handleTrackingSearch}
              disabled={isSearching}
              size="lg"
            >
              {isSearching ? (
                <>
                  <Search className="mr-2 h-4 w-4 animate-pulse" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Track
                </>
              )}
            </Button>
          </div>
          {error && (
            <p className="text-red-600 text-sm mt-2">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {shipmentData && (
        <>
          {/* Status Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  Tracking: {shipmentData.trackingNumber}
                </CardTitle>
                <Badge variant={getStatusBadgeVariant(shipmentData.status)}>
                  {shipmentData.status.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">Origin</p>
                  <p className="text-gray-600">{shipmentData.origin}</p>
                </div>
                <div className="text-center">
                  <Truck className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">Service</p>
                  <p className="text-gray-600">{shipmentData.service}</p>
                </div>
                <div className="text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">Destination</p>
                  <p className="text-gray-600">{shipmentData.destination}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Delivery Progress</span>
                  <span className="text-sm text-gray-600">{shipmentData.progress}%</span>
                </div>
                <Progress value={shipmentData.progress} className="h-3" />
              </div>

              {/* Estimated Delivery */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Estimated Delivery</span>
                </div>
                <p className="text-blue-700">
                  {new Date(shipmentData.estimatedDelivery).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Tracking History</CardTitle>
              <CardDescription>
                Detailed timeline of your shipment's journey
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {shipmentData.events.map((event, index) => {
                  const Icon = event.icon
                  const isLatest = index === shipmentData.events.length - 1
                  
                  return (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isLatest ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        {index < shipmentData.events.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-300 mt-2" />
                        )}
                      </div>
                      
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{event.status}</h4>
                          {isLatest && (
                            <Badge variant="secondary" className="text-xs">Latest</Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-1">{event.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Shipment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Shipment Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Package Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span>{shipmentData.shipmentInfo.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimensions:</span>
                      <span>{shipmentData.shipmentInfo.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Declared Value:</span>
                      <span>{shipmentData.shipmentInfo.value}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Recipient Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{shipmentData.shipmentInfo.recipient}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{shipmentData.shipmentInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{shipmentData.shipmentInfo.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline">
                  Download Receipt
                </Button>
                <Button variant="outline">
                  Contact Support
                </Button>
                <Button>
                  Track Another Package
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
