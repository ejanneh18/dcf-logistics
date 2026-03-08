import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import ServiceCard from "@/components/service-card"
import { TestimonialsSection } from "@/components/testimonials-section"
import { StatsSection } from "@/components/stats-section"
import { Plane, Truck, FileCheck, Warehouse, Ship, Scale, Users, Globe } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "DCF Logistics | Premier Clearing & Forwarding Services in The Gambia",
  description: "DCF Logistics offers comprehensive clearing and forwarding services across West Africa. Air freight, sea freight, customs clearance, and logistics solutions.",
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1">
        <HeroSection />

        {/* Services Section */}
        <section className="py-6 md:py-10 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Services</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Comprehensive Logistics Solutions</h2>
              <p className="max-w-[700px] text-gray-500 md:text-lg">
                From customs clearance to freight forwarding, we provide end-to-end logistics services across West
                Africa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                icon={<Plane className="h-12 w-12 text-primary" />}
                title="Air Freight"
                description="Fast and reliable air cargo services connecting The Gambia to global markets with express and standard delivery options."
                href="/services/air-freight"
              />
              <ServiceCard
                icon={<Ship className="h-12 w-12 text-primary" />}
                title="Sea Freight"
                description="Cost-effective ocean freight solutions for bulk cargo with full container load (FCL) and less container load (LCL) options."
                href="/services/freight-forwarding"
              />
              <ServiceCard
                icon={<FileCheck className="h-12 w-12 text-primary" />}
                title="Customs Clearance"
                description="Expert customs clearance services with deep knowledge of Gambian and ECOWAS trade regulations and procedures."
                href="/services/customs-clearance"
              />
              <ServiceCard
                icon={<Truck className="h-12 w-12 text-primary" />}
                title="Ground Transportation"
                description="Comprehensive road transport solutions across West Africa with real-time tracking and secure cargo handling."
                href="/services/haulage-transportation"
              />
              <ServiceCard
                icon={<Warehouse className="h-12 w-12 text-primary" />}
                title="Warehousing"
                description="Strategic warehousing and distribution services at Banjul Port with climate-controlled storage options."
                href="/services/warehousing"
              />
              <ServiceCard
                icon={<Scale className="h-12 w-12 text-primary" />}
                title="Customs Brokerage"
                description="Professional customs brokerage services ensuring compliance with all regulatory requirements and duty optimization."
                href="/services/customs-brokerage"
              />
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>

        <StatsSection />
        <TestimonialsSection />

        {/* Contact CTA Section */}
        <section className="py-6 md:py-10 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-gray-500 md:text-lg max-w-2xl mx-auto mb-8">
                Contact us today for a personalized quote or to learn more about our comprehensive logistics services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/quote">Get a Quote</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose DCF Section */}
        <section className="py-6 md:py-10 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Why Choose DCF</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Your Trusted Gambian Partner</h2>
              <p className="max-w-[700px] text-gray-500 md:text-lg">
                As a proudly Gambian company, we understand the unique logistics challenges and opportunities in West
                Africa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full inline-block">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
                <p className="text-gray-600">
                  Deep understanding of Gambian customs procedures and regional trade dynamics that only comes from
                  being truly local.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full inline-block">
                  <Ship className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Port Access</h3>
                <p className="text-gray-600">
                  Strategic location at Banjul Port provides direct access to shipping lines and faster cargo
                  processing.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full inline-block">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Personal Service</h3>
                <p className="text-gray-600">
                  Dedicated account management and personalized service that builds lasting partnerships with our
                  clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Ship with The Gambia's Best?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Experience the difference of working with a truly local logistics partner who understands your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-black" asChild>
                <Link href="/quote">Get a Quote</Link>
              </Button>
              <Button size="lg" variant="secondary" className="text-black" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
