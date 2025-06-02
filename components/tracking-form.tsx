"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Search } from "lucide-react"

export default function TrackingForm() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!trackingNumber.trim()) {
      toast({
        title: "Tracking number required",
        description: "Please enter a valid tracking number",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real application, you would validate the tracking number format here
      // For demo purposes, we'll accept any non-empty string

      // Redirect to the tracking results page with the tracking number as a query parameter
      router.push(`/tracking/results?trackingNumber=${encodeURIComponent(trackingNumber)}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing your request. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Enter your tracking number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="bg-white text-gray-900 h-12 border-0"
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="h-12 px-6">
          {isLoading ? (
            "Tracking..."
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" /> Track Shipment
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
