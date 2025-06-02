"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Share2, MapPin, Clock, Package } from "lucide-react"

interface TrackingResult {
  trackingNumber: string
  status: string
  location: string
  lastUpdate: string
  estimatedDelivery: string
}

export function MobileTracking() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [result, setResult] = useState<TrackingResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = async () => {
    if (!trackingNumber.trim()) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setResult({
        trackingNumber: trackingNumber,
        status: "In Transit",
        location: "Banjul Port, Gambia",
        lastUpdate: "2 hours ago",
        estimatedDelivery: "Tomorrow, 2:00 PM",
      })
      setLoading(false)
    }, 1000)
  }

  const handleShare = async () => {
    if (!result) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: "DCF Logistics Tracking",
          text: `Tracking ${result.trackingNumber}: ${result.status}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`Tracking ${result.trackingNumber}: ${result.status} - ${window.location.href}`)
    }
  }

  return (
    <div className="space-y-4">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Track Your Shipment</CardTitle>
          <CardDescription>Enter your tracking number to get real-time updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTrack} disabled={loading}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">#{result.trackingNumber}</CardTitle>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <Badge className="bg-blue-100 text-blue-800">{result.status}</Badge>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{result.location}</span>
            </div>

            {/* Last Update */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Last updated {result.lastUpdate}</span>
            </div>

            {/* Estimated Delivery */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm font-medium text-green-800">Estimated Delivery: {result.estimatedDelivery}</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
