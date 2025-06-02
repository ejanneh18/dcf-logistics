import type { Metadata } from "next"
import { ServiceCard } from "@/components/services/service-card"
import { ServiceActions } from "@/components/services/service-actions"

export const metadata: Metadata = {
  title: "Our Services | DCF Logistics",
  description:
    "Comprehensive logistics services including air freight, ground transportation, customs clearance, and warehousing solutions.",
}

const services = [
  {
    name: "Air Freight",
    description:
      "Fast, reliable international air cargo solutions with 1-3 day express delivery to 500+ airports worldwide.",
    href: "/services/air-freight",
    icon: "plane",
    features: ["Express 1-3 days", "Standard 3-7 days", "Temperature controlled", "150+ countries"],
  },
  {
    name: "Ground Transportation",
    description:
      "Comprehensive ground transportation with 2,500+ vehicles covering 98% of postal codes across North America and Europe.",
    href: "/services/haulage-transportation",
    icon: "truck",
    features: ["Same-day delivery", "2,500+ vehicles", "98% coverage", "Real-time tracking"],
  },
  {
    name: "Customs Clearance",
    description: "Expert customs clearance with 45 licensed brokers achieving 99.8% first-time clearance rate.",
    href: "/services/customs-clearance",
    icon: "fileCheck",
    features: ["99.8% clearance rate", "45 licensed brokers", "4.2 hour processing", "12 major markets"],
  },
  {
    name: "Warehousing & Distribution",
    description:
      "Strategic warehousing solutions with 8.5 million sq ft across 25 facilities maintaining 99.9% inventory accuracy.",
    href: "/services/warehousing",
    icon: "warehouse",
    features: ["8.5M sq ft", "99.9% accuracy", "Same-day fulfillment", "Climate controlled"],
  },
  {
    name: "Freight Forwarding",
    description: "End-to-end freight management across air, sea, and ground transportation in 150+ countries.",
    href: "/services/freight-forwarding",
    icon: "ship",
    features: ["Multi-modal transport", "150+ countries", "Documentation", "Real-time visibility"],
  },
  {
    name: "Customs Brokerage",
    description: "Professional customs brokerage services with expertise in trade compliance and duty optimization.",
    href: "/services/customs-brokerage",
    icon: "scale",
    features: ["Trade compliance", "Duty optimization", "Expert brokers", "Regulatory guidance"],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Logistics Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive logistics solutions designed to meet your shipping and supply chain needs with reliability,
            efficiency, and global reach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.name}
              name={service.name}
              description={service.description}
              href={service.href}
              icon={service.icon}
              features={service.features}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our logistics experts can design a tailored solution for your specific requirements. Get in touch to
              discuss your unique shipping and supply chain needs.
            </p>
            <ServiceActions />
          </div>
        </div>
      </div>
    </div>
  )
}
