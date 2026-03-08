import type { Metadata } from "next"
import EnhancedTracking from "@/components/enhanced-tracking"
import { Package, Search, Truck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Shipment Tracking | DCF Logistics",
  description: "Track your shipments in real-time with our easy-to-use tracking system",
}

export default function TrackingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Track Your Shipment</h1>
              <p className="text-xl text-gray-300 mb-8">
                Enter your tracking number to get real-time updates on your shipment's status and location.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8">
                <EnhancedTracking />
              </div>
            </div>
          </div>
        </section>

        {/* How Tracking Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">How Tracking Works</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our advanced tracking system provides you with real-time updates on your shipment's journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Enter Tracking Number</h3>
                <p className="text-gray-600">
                  Input your unique tracking number provided when your shipment was processed.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">View Status</h3>
                <p className="text-gray-600">
                  Get detailed information about your shipment's current status and location.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Track Journey</h3>
                <p className="text-gray-600">
                  Follow your shipment's complete journey with timestamps for each milestone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Tracking FAQs</h2>
                <p className="mt-4 text-lg text-gray-600">Common questions about our shipment tracking system</p>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Where can I find my tracking number?</h3>
                  <p className="text-gray-600">
                    Your tracking number is provided in the shipping confirmation email you received when your shipment
                    was processed. It can also be found on your shipping receipt or invoice.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">How often is tracking information updated?</h3>
                  <p className="text-gray-600">
                    Tracking information is updated in real-time as your shipment moves through our logistics network.
                    Updates typically occur when your shipment arrives at or departs from a facility, or when it's out
                    for delivery.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">What if my tracking information isn't updating?</h3>
                  <p className="text-gray-600">
                    If your tracking information hasn't updated in 24-48 hours, it may be due to processing delays or
                    transit between facilities. If you're concerned, please contact our customer service team for
                    assistance.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Can I track multiple shipments at once?</h3>
                  <p className="text-gray-600">
                    Currently, our tracking system allows you to track one shipment at a time. For businesses with
                    multiple shipments, we offer a comprehensive dashboard through our client portal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Need Additional Help?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our customer service team is ready to assist you with any questions about your shipment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/services">Explore Our Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
