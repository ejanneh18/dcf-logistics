"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Digital Clearing and <span className="text-primary">Forwarding Agency</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                The Gambia's premier logistics partner. Your trusted gateway for comprehensive supply chain management,
                customs clearance, and seamless cargo movement across West Africa and beyond.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/quote">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="/services">
                  <Play className="mr-2 h-5 w-5" />
                  Explore Services
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-gray-600">Shipments Handled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-gray-600">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Container port operations in Banjul"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 animate-pulse">
              <div className="text-sm font-medium text-gray-900">Real-time Tracking</div>
              <div className="text-xs text-gray-500">Live shipment updates</div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 animate-pulse">
              <div className="text-sm font-medium text-gray-900">Banjul Port Access</div>
              <div className="text-xs text-gray-500">Direct port connectivity</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
