import type { Metadata } from "next"
import { Search, Calculator, FileText, BarChart3, Truck } from "lucide-react"
import FeatureHighlight from "@/components/feature-highlight"

export const metadata: Metadata = {
  title: "Features | DCF Logistics",
  description: "Explore the comprehensive features of our logistics platform",
}

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1">
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Platform Features</h1>
              <p className="text-xl text-gray-300">
                Discover the comprehensive tools and features designed to streamline your logistics operations
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Core Features</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform offers a range of powerful tools to manage your logistics needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureHighlight
                icon={<Search className="h-12 w-12" />}
                title="Shipment Tracking"
                description="Real-time tracking of your shipments with detailed status updates and location information"
                href="/tracking"
                buttonText="Track Shipment"
              />

              <FeatureHighlight
                icon={<Calculator className="h-12 w-12" />}
                title="Quote Calculator"
                description="Get instant cost estimates for your shipments based on weight, dimensions, and destination"
                href="/quote"
                buttonText="Get a Quote"
              />

              <FeatureHighlight
                icon={<FileText className="h-12 w-12" />}
                title="Service Comparison"
                description="Compare our different logistics services to find the best solution for your specific needs"
                href="/services/compare"
                buttonText="Compare Services"
              />

              <FeatureHighlight
                icon={<BarChart3 className="h-12 w-12" />}
                title="Dashboard Analytics"
                description="Access detailed analytics and reports on your shipments and logistics operations"
                href="/account/dashboard"
                buttonText="View Dashboard"
              />

              <FeatureHighlight
                icon={<Truck className="h-12 w-12" />}
                title="Comprehensive Services"
                description="Explore our full range of logistics services from freight forwarding to customs clearance"
                href="/services"
                buttonText="View Services"
              />

              <FeatureHighlight
                icon={<FileText className="h-12 w-12" />}
                title="Custom Quote Requests"
                description="Submit detailed quote requests for complex logistics needs and receive personalized pricing"
                href="/quote"
                buttonText="Request Quote"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
