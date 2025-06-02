import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Package, Truck, Clock, MapPin, AlertCircle } from "lucide-react"
import TrackingTimeline from "@/components/tracking-timeline"
import TrackingDetails from "@/components/tracking-details"
import TrackingForm from "@/components/tracking-form"

export const metadata: Metadata = {
  title: "Tracking Results | DCF Logistics",
  description: "View detailed tracking information for your shipment",
}

export default async function TrackingResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ trackingNumber?: string }>
}) {
  const params = await searchParams
  const trackingNumber = params.trackingNumber || ""

  // In a real application, you would fetch the tracking data from your API
  // For this demo, we'll use mock data
  const mockTrackingData = {
    trackingNumber,
    status: "In Transit",
    estimatedDelivery: "May 25, 2025",
    origin: "Banjul, Gambia",
    destination: "Accra, Ghana",
    service: "Standard Air Freight",
    weight: "245 kg",
    pieces: "3",
    reference: "ORD-78945",
    currentLocation: "Lagos, Nigeria",
    lastUpdated: "May 20, 2025, 10:23 AM",
    events: [
      {
        date: "May 20, 2025",
        time: "10:23 AM",
        location: "Lagos, Nigeria",
        activity: "Departed facility",
        status: "completed",
      },
      {
        date: "May 19, 2025",
        time: "8:45 PM",
        location: "Lagos, Nigeria",
        activity: "Arrived at transit facility",
        status: "completed",
      },
      {
        date: "May 18, 2025",
        time: "2:30 PM",
        location: "Banjul, Gambia",
        activity: "Departed origin facility",
        status: "completed",
      },
      {
        date: "May 17, 2025",
        time: "11:15 AM",
        location: "Banjul, Gambia",
        activity: "Processed at origin facility",
        status: "completed",
      },
      {
        date: "May 16, 2025",
        time: "4:30 PM",
        location: "Banjul, Gambia",
        activity: "Shipment picked up",
        status: "completed",
      },
      {
        date: "May 15, 2025",
        time: "2:00 PM",
        location: "Banjul, Gambia",
        activity: "Shipment information received",
        status: "completed",
      },
    ],
    nextSteps: [
      {
        date: "Estimated May 22, 2025",
        location: "Tema, Ghana",
        activity: "Arrival at destination facility",
        status: "upcoming",
      },
      {
        date: "Estimated May 23, 2025",
        location: "Accra, Ghana",
        activity: "Out for delivery",
        status: "upcoming",
      },
      {
        date: "Estimated May 25, 2025",
        location: "Accra, Ghana",
        activity: "Delivered",
        status: "upcoming",
      },
    ],
  }

  // Combine past events and future steps for the timeline
  const timelineEvents = [...mockTrackingData.events, ...mockTrackingData.nextSteps].sort((a, b) => {
    // Sort by date (most recent first)
    const dateA = new Date(a.date.replace("Estimated ", ""))
    const dateB = new Date(b.date.replace("Estimated ", ""))
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Button variant="outline" size="sm" asChild className="text-white border-white/20 hover:bg-white/10">
                  <Link href="/tracking">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tracking
                  </Link>
                </Button>
              </div>
              <h1 className="text-3xl font-bold mb-4">Tracking Results</h1>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-sm text-gray-300">Tracking Number:</span>
                  <span className="ml-2 font-semibold">{trackingNumber}</span>
                </div>
                <div className="bg-primary/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
                  <span className="text-sm font-medium">Status:</span>
                  <span className="ml-2 font-semibold">{mockTrackingData.status}</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <p className="text-lg mb-4">Track another shipment:</p>
                <TrackingForm />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Truck className="mr-2 h-5 w-5 text-primary" />
                        Shipment Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-500">Current Location:</span>
                            <span className="ml-2 font-medium">{mockTrackingData.currentLocation}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-500">Last Updated:</span>
                            <span className="ml-2 font-medium">{mockTrackingData.lastUpdated}</span>
                          </div>
                        </div>
                        <div className="flex items-center mb-2">
                          <Package className="h-5 w-5 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-500">Estimated Delivery:</span>
                          <span className="ml-2 font-medium">{mockTrackingData.estimatedDelivery}</span>
                        </div>
                      </div>

                      <TrackingTimeline events={timelineEvents} />
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <TrackingDetails trackingData={mockTrackingData} />

                  <div className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <AlertCircle className="mr-2 h-5 w-5 text-primary" />
                          Need Help?
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                          If you have questions about your shipment, our customer service team is here to help.
                        </p>
                        <Button asChild className="w-full">
                          <Link href="/contact">Contact Support</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
