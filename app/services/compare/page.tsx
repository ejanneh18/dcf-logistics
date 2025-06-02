import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ServiceComparison from "@/components/service-comparison"
import { ArrowRight, HelpCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Service Comparison | DCF Logistics",
  description: "Compare our logistics services to find the right solution for your business",
}

export default function CompareServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Compare Our Services</h1>
              <p className="text-xl text-gray-300 mb-8">
                Find the right logistics solution for your business needs with our comprehensive service comparison.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-5xl mx-auto">
              <div className="mb-10 text-center">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">Service Features Comparison</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Compare the features and capabilities of our different logistics services to determine which best
                  meets your requirements.
                </p>
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-200 mb-8">
                <ServiceComparison />
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-10">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Need Help Choosing?</h3>
                    <p className="text-gray-600 mb-4">
                      Our logistics experts can help you determine the best service or combination of services for your
                      specific shipping needs. Contact us for a personalized consultation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild>
                        <Link href="/quote">
                          Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/#contact">Contact Our Team</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Freight Forwarding</h3>
                  <p className="text-gray-600 mb-4">
                    Ideal for businesses that need comprehensive international shipping solutions with end-to-end
                    management of the logistics process.
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/services/freight-forwarding">Learn More</Link>
                  </Button>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Customs Brokerage</h3>
                  <p className="text-gray-600 mb-4">
                    Perfect for importers and exporters who need expert assistance with customs documentation,
                    compliance, and duty optimization.
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/services/customs-brokerage">Learn More</Link>
                  </Button>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Warehousing</h3>
                  <p className="text-gray-600 mb-4">
                    Best for businesses that need flexible storage solutions, inventory management, and efficient
                    distribution services.
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/services/warehousing">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Customized Logistics Solutions</h2>
              <p className="text-gray-600 mb-8">
                Many of our clients benefit from combining multiple services for a comprehensive logistics solution. Our
                team can help you design a custom package that addresses all your shipping and supply chain needs.
              </p>
              <Button size="lg" asChild>
                <Link href="/quote">Get a Customized Solution</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
