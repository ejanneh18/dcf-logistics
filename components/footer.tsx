import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { FooterNewsletterSignup } from "@/components/newsletter-signup"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo_dcf.png"
                alt="DCF Logistics"
                width={150}
                height={50}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 mb-4">
              Your trusted Gambian partner for comprehensive logistics solutions. Serving businesses across West Africa
              and beyond with excellence and reliability since 2010.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/logistic-consultancy" className="text-gray-400 hover:text-primary">
                  Logistic Consultancy
                </Link>
              </li>
              <li>
                <Link href="/services/air-freight" className="text-gray-400 hover:text-primary">
                  Air Freight
                </Link>
              </li>
              <li>
                <Link href="/services/haulage-transportation" className="text-gray-400 hover:text-primary">
                  Haulage & Transportation
                </Link>
              </li>
              <li>
                <Link href="/services/regulatory-compliance" className="text-gray-400 hover:text-primary">
                  Regulatory Compliance
                </Link>
              </li>
              <li>
                <Link href="/services/cross-border-logistics" className="text-gray-400 hover:text-primary">
                  Cross Border Logistics
                </Link>
              </li>
              <li>
                <Link href="/services/customs-clearance" className="text-gray-400 hover:text-primary">
                  Customs Clearance
                </Link>
              </li>
              <li>
                <Link href="/services/freight-forwarding" className="text-gray-400 hover:text-primary">
                  Freight Forwarding
                </Link>
              </li>
              <li>
                <Link href="/services/warehousing" className="text-gray-400 hover:text-primary">
                  Warehousing
                </Link>
              </li>
              <li>
                <Link href="/services/customs-brokerage" className="text-gray-400 hover:text-primary">
                  Customs Brokerage
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tracking" className="text-gray-400 hover:text-primary">
                  Track Shipment
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-gray-400 hover:text-primary">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-gray-400 hover:text-primary">
                  Shipping Calculator
                </Link>
              </li>
              <li>
                <Link href="/services/compare" className="text-gray-400 hover:text-primary">
                  Compare Services
                </Link>
              </li>
              {/* <li>
                <Link href="/calculator" className="text-gray-400 hover:text-primary">
                  Calculator
                </Link>
              </li> */}
              {/* <li>
                <Link href="/account/register" className="text-gray-400 hover:text-primary">
                  Register
                </Link>
              </li> */}
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <FooterNewsletterSignup />
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-white">Contact</h4>
              <address className="text-gray-400 not-italic">
                IC PLAZA Cooperative Junction Westfield
                <br />
                Serekunda, The Gambia
                <br />
                <a href="tel:+2203951020" className="hover:text-primary">
                  +220 3951020
                </a>
                <br />
                <a href="mailto:info@dcfagency.com" className="hover:text-primary">
                  info@dcfagency.com
                </a>
              </address>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Digital Clearing and Forwarding Agency. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-primary text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-primary text-sm">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-primary text-sm">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
