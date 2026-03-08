import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Sitemap | DCF Logistics",
  description: "DCF Logistics website sitemap - Find all pages and sections of our website",
}

export default function SitemapPage() {
  const siteStructure = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" },

        { name: "Features", href: "/features" },
        { name: "Support", href: "/support" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "All Services", href: "/services" },
        { name: "Compare Services", href: "/services/compare" },
        { name: "Logistic Consultancy", href: "/services/logistic-consultancy" },
        { name: "Air Freight", href: "/services/air-freight" },
        { name: "Haulage & Transportation", href: "/services/haulage-transportation" },
        { name: "Regulatory Compliance", href: "/services/regulatory-compliance" },
        { name: "Cross Border Logistics", href: "/services/cross-border-logistics" },
        { name: "Customs Clearance", href: "/services/customs-clearance" },
        { name: "Freight Forwarding", href: "/services/freight-forwarding" },
        { name: "Warehousing", href: "/services/warehousing" },
        { name: "Customs Brokerage", href: "/services/customs-brokerage" },
      ],
    },
    {
      title: "Tools & Tracking",
      links: [
        { name: "Track Shipment", href: "/tracking" },
        { name: "Shipping Calculator", href: "/calculator" },
        { name: "Request Quote", href: "/quote" },
        { name: "Tracking Results", href: "/tracking/results" },
      ],
    },

    {
      title: "Legal & Policies",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms-of-service" },
        { name: "Sitemap", href: "/sitemap" },
      ],
    },
    {
      title: "PWA & Mobile",
      links: [
        { name: "Offline Page", href: "/offline" },
        { name: "Chat Test", href: "/chat-test" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Website Sitemap</h1>
            <p className="text-lg text-gray-600">
              Navigate through all sections and pages of the DCF Logistics website
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteStructure.map((section, index) => (
              <Card key={index} className="h-fit">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="flex items-center text-gray-600 hover:text-primary transition-colors group"
                        >
                          <span className="flex-1">{link.name}</span>
                          <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Website Structure</h3>
                  <p className="text-gray-600">
                    Our website is organized into logical sections to help you find information quickly. Use the
                    navigation menu at the top of any page to access main sections, or use this sitemap to find specific
                    pages.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Mobile App</h3>
                  <p className="text-gray-600">
                    DCF Logistics is also available as a Progressive Web App (PWA) that can be installed on your mobile
                    device for quick access to tracking and services.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                  <p className="text-gray-600">
                    If you can't find what you're looking for, please visit our{" "}
                    <Link href="/support" className="text-primary hover:underline">
                      Support page
                    </Link>{" "}
                    or{" "}
                    <Link href="/contact" className="text-primary hover:underline">
                      contact us
                    </Link>{" "}
                    directly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
