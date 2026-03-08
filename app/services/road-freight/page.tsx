import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Truck, Clock, MapPin, Shield, Route, Package, CheckCircle, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Road Freight Services | DCF Logistics",
  description: "Flexible and reliable ground transportation for domestic and regional shipments across West Africa. Door-to-door delivery solutions.",
  keywords: ["road freight", "ground transportation", "trucking", "domestic shipping", "regional transport", "door-to-door", "The Gambia"],
}

export default function RoadFreightPage() {
  const features = [
    {
      icon: Truck,
      title: "Door-to-Door Service",
      description: "Complete pickup and delivery service directly to your specified locations"
    },
    {
      icon: Route,
      title: "Flexible Routing",
      description: "Customized routes and scheduling to meet your specific delivery requirements"
    },
    {
      icon: MapPin,
      title: "Regional Coverage",
      description: "Extensive network covering The Gambia and neighboring West African countries"
    },
    {
      icon: Shield,
      title: "Secure Transport",
      description: "GPS tracking and secure handling of your valuable cargo throughout transit"
    },
    {
      icon: Clock,
      title: "Reliable Scheduling",
      description: "Consistent pickup and delivery times with real-time tracking updates"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Personal account management and 24/7 customer support"
    }
  ]

  const vehicleTypes = [
    { type: "Light Trucks", description: "Up to 3.5 tons for small deliveries", capacity: "1-15 CBM" },
    { type: "Medium Trucks", description: "5-10 tons for standard freight", capacity: "15-40 CBM" },
    { type: "Heavy Trucks", description: "15-25 tons for large shipments", capacity: "40-80 CBM" },
    { type: "Articulated Trucks", description: "25+ tons for maximum capacity", capacity: "80+ CBM" },
    { type: "Refrigerated Trucks", description: "Temperature-controlled transport", capacity: "Various" },
    { type: "Flatbed Trucks", description: "For oversized and heavy machinery", capacity: "Various" }
  ]

  const routes = [
    { destination: "Senegal", duration: "1-2 days", description: "Dakar and major cities" },
    { destination: "Guinea-Bissau", duration: "1-2 days", description: "Bissau and regional centers" },
    { destination: "Guinea", duration: "2-3 days", description: "Conakry and inland destinations" },
    { destination: "Mali", duration: "3-5 days", description: "Bamako and northern regions" },
    { destination: "Domestic", duration: "Same day - 1 day", description: "Within The Gambia" }
  ]

  const benefits = [
    "Most flexible delivery options",
    "Cost-effective for regional shipments",
    "Real-time GPS tracking",
    "Door-to-door convenience",
    "Suitable for urgent deliveries",
    "Handles various cargo types"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
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
            <div className="p-3 bg-green-100 rounded-lg">
              <Truck className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Road Freight Services</h1>
              <p className="text-xl text-gray-600 mt-2">Flexible and reliable ground transportation for domestic and regional shipments</p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Road Freight Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2">
                      <Icon className="h-10 w-10 text-green-600" />
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

        {/* Vehicle Fleet */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Vehicle Fleet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicleTypes.map((vehicle, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{vehicle.type}</CardTitle>
                  <Badge variant="outline">{vehicle.capacity}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{vehicle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Routes & Transit Times */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Routes & Transit Times</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    {route.destination}
                  </CardTitle>
                  <Badge variant="secondary">{route.duration}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{route.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Road Freight Benefits</h2>
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

        {/* Service Information */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-green-600" />
                  Cargo Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• General merchandise</li>
                  <li>• Perishable goods</li>
                  <li>• Construction materials</li>
                  <li>• Agricultural products</li>
                  <li>• Industrial equipment</li>
                  <li>• Consumer goods</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Safety & Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• GPS tracking on all vehicles</li>
                  <li>• Experienced professional drivers</li>
                  <li>• Comprehensive cargo insurance</li>
                  <li>• Regular vehicle maintenance</li>
                  <li>• 24/7 monitoring and support</li>
                  <li>• Secure loading procedures</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready for Road Transport?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Get reliable door-to-door delivery for your regional shipments. Our road freight services offer the flexibility and convenience you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/quote">Get Road Freight Quote</Link>
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
