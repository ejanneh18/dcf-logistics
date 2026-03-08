import type { Metadata } from "next"
import ShippingCalculator from "@/components/shipping-calculator"
import { Card, CardContent } from "@/components/ui/card"
import { Calculator, TrendingUp, Clock, Shield, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Shipping Calculator | DCF Logistics",
  description: "Calculate shipping rates instantly. Compare air freight, sea freight, and road transport options for your cargo.",
}

export default function CalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/90 to-primary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3">
              <Calculator className="h-12 w-12" />
              Shipping Calculator
            </h1>
            <p className="text-xl mb-8">
              Get instant shipping quotes and compare rates across different services. 
              Calculate costs for air freight, sea freight, and road transport.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center">
                <TrendingUp className="h-8 w-8 mb-2" />
                <span className="text-sm">Competitive Rates</span>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-8 w-8 mb-2" />
                <span className="text-sm">Instant Quotes</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="h-8 w-8 mb-2" />
                <span className="text-sm">Secure & Reliable</span>
              </div>
              <div className="flex flex-col items-center">
                <Globe className="h-8 w-8 mb-2" />
                <span className="text-sm">Global Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ShippingCalculator />
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How Our Calculator Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Enter Details</h3>
                  <p className="text-gray-600">
                    Provide your shipment details including origin, destination, weight, and cargo type.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Compare Options</h3>
                  <p className="text-gray-600">
                    View rates for different shipping methods including air, sea, and road transport.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Book Service</h3>
                  <p className="text-gray-600">
                    Select your preferred option and contact us to book your shipment.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-center">Why Use Our Calculator?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">✅ Accurate Estimates</h4>
                  <p className="text-gray-600 mb-4">
                    Our calculator uses real-time data and industry-standard formulas to provide accurate shipping estimates.
                  </p>
                  
                  <h4 className="font-semibold mb-2">✅ Multiple Options</h4>
                  <p className="text-gray-600">
                    Compare air freight, sea freight, and road transport options to find the best solution for your needs.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">✅ Transparent Pricing</h4>
                  <p className="text-gray-600 mb-4">
                    No hidden fees or surprises. See exactly what you'll pay for each service option.
                  </p>
                  
                  <h4 className="font-semibold mb-2">✅ Expert Support</h4>
                  <p className="text-gray-600">
                    Our logistics experts are available to help you choose the best shipping solution.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Need a Custom Quote?</h3>
              <p className="text-gray-600 mb-6">
                For complex shipments, special requirements, or bulk orders, our experts can provide customized quotes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/quote" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Request Custom Quote
                </a>
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  Contact Our Experts
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
