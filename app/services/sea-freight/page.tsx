import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Ship, Clock, DollarSign, Shield, Globe, Package, Truck, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Sea Freight Services | DCF Logistics",
  description: "Cost-effective ocean transportation for large volume shipments. Reliable sea freight services across West Africa and international destinations.",
  keywords: ["sea freight", "ocean shipping", "container shipping", "bulk cargo", "FCL", "LCL", "maritime transport", "The Gambia"],
}

export default function SeaFreightPage() {
  const features = [
    {
      icon: Ship,
      title: "Container Shipping",
      description: "Full Container Load (FCL) and Less than Container Load (LCL) options for all cargo sizes"
    },
    {
      icon: DollarSign,
      title: "Cost-Effective",
      description: "Most economical option for large volume shipments and non-urgent deliveries"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Extensive network of shipping lines and port connections worldwide"
    },
    {
      icon: Shield,
      title: "Cargo Insurance",
      description: "Comprehensive insurance coverage for your valuable shipments"
    },
    {
      icon: Package,
      title: "Bulk Cargo",
      description: "Specialized handling for bulk commodities and oversized cargo"
    },
    {
      icon: CheckCircle,
      title: "Reliable Service",
      description: "Consistent transit times and reliable delivery schedules"
    }
  ]

  const containerTypes = [
    { type: "20ft Standard", description: "Standard dry container for general cargo", capacity: "28 CBM" },
    { type: "40ft Standard", description: "High capacity dry container", capacity: "58 CBM" },
    { type: "40ft High Cube", description: "Extra height for voluminous cargo", capacity: "68 CBM" },
    { type: "Refrigerated", description: "Temperature-controlled containers", capacity: "Various" },
    { type: "Open Top", description: "For oversized or top-loading cargo", capacity: "Various" },
    { type: "Flat Rack", description: "For heavy machinery and equipment", capacity: "Various" }
  ]

  const benefits = [
    "Most cost-effective for large shipments",
    "Environmentally friendly transport option",
    "Suitable for non-urgent deliveries",
    "Handles oversized and heavy cargo",
    "Global port-to-port connectivity",
    "Consolidated shipping options available"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
          </Button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Ship className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Sea Freight Services</h1>
              <p className="text-xl text-gray-600 mt-2">Cost-effective ocean transportation for large volume shipments</p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Sea Freight Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2">
                      <Icon className="h-10 w-10 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Container Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Container Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {containerTypes.map((container, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{container.type}</CardTitle>
                  <Badge variant="outline">{container.capacity}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{container.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sea Freight Benefits</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transit Information */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Transit Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Transit Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">West Africa:</span>
                    <span className="font-semibold">7-14 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Europe:</span>
                    <span className="font-semibold">15-25 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Asia:</span>
                    <span className="font-semibold">25-35 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Americas:</span>
                    <span className="font-semibold">20-30 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  Best For
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Large volume shipments</li>
                  <li>• Cost-sensitive cargo</li>
                  <li>• Non-urgent deliveries</li>
                  <li>• Heavy machinery</li>
                  <li>• Bulk commodities</li>
                  <li>• Oversized equipment</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Ship by Sea?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Get competitive rates for your sea freight shipments. Our experts will help you choose the right container type and shipping schedule for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/quote">Get Sea Freight Quote</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Contact Our Team</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
