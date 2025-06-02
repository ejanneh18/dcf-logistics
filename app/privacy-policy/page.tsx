import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | DCF Logistics",
  description: "DCF Logistics Privacy Policy - How we collect, use, and protect your personal information",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600 mb-4">
                  Digital Clearing and Forwarding Agency ("DCF Logistics", "we", "us", or "our") is committed to
                  protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
                  your information when you visit our website or use our logistics services.
                </p>
                <p className="text-gray-600">
                  By using our services, you consent to the data practices described in this policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                    <p className="text-gray-600">
                      We may collect personal information such as your name, email address, phone number, company name,
                      and shipping addresses when you use our services or contact us.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipment Information</h3>
                    <p className="text-gray-600">
                      We collect information about your shipments including cargo details, origin and destination,
                      tracking numbers, and delivery instructions.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Data</h3>
                    <p className="text-gray-600">
                      We automatically collect information about how you interact with our website, including IP
                      address, browser type, pages visited, and time spent on our site.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>To provide and maintain our logistics services</li>
                  <li>To process shipments and handle customs clearance</li>
                  <li>To communicate with you about your shipments and our services</li>
                  <li>To improve our website and services</li>
                  <li>To comply with legal obligations and regulatory requirements</li>
                  <li>To send you marketing communications (with your consent)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
                <p className="text-gray-600 mb-4">We may share your information with:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Shipping carriers and logistics partners necessary to complete your shipments</li>
                  <li>Customs authorities and government agencies as required by law</li>
                  <li>Service providers who assist us in operating our business</li>
                  <li>Legal authorities when required by law or to protect our rights</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  We do not sell, trade, or rent your personal information to third parties for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                <p className="text-gray-600">
                  We implement appropriate technical and organizational security measures to protect your personal
                  information against unauthorized access, alteration, disclosure, or destruction. However, no method of
                  transmission over the internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                <p className="text-gray-600 mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Access and review your personal information</li>
                  <li>Request corrections to inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request a copy of your data in a portable format</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our website. Cookies
                  help us:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Provide personalized content and advertisements</li>
                  <li>Improve our website functionality</li>
                </ul>
                <p className="text-gray-600 mt-4">You can control cookie settings through your browser preferences.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Transfers</h2>
                <p className="text-gray-600">
                  As a logistics company operating across West Africa, your information may be transferred to and
                  processed in countries other than The Gambia. We ensure appropriate safeguards are in place to protect
                  your information during such transfers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data Retention</h2>
                <p className="text-gray-600">
                  We retain your personal information for as long as necessary to provide our services and comply with
                  legal obligations. Shipment records are typically retained for 7 years in accordance with customs and
                  tax regulations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
                <p className="text-gray-600">
                  Our services are not intended for children under 18 years of age. We do not knowingly collect personal
                  information from children under 18.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
                <p className="text-gray-600">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">
                    <strong>Digital Clearing and Forwarding Agency</strong>
                    <br />
                    Banjul Port Area
                    <br />
                    Banjul, The Gambia
                    <br />
                    Email: privacy@dcflogistics.gm
                    <br />
                    Phone: +220 123 456 789
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
