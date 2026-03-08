import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | DCF Logistics",
  description: "DCF Logistics Terms of Service - Terms and conditions for using our logistics services",
}

export default function TermsOfServicePage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600">
                  By accessing and using the services provided by Digital Clearing and Forwarding Agency ("DCF
                  Logistics", "we", "us", or "our"), you accept and agree to be bound by the terms and provision of this
                  agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
                <p className="text-gray-600 mb-4">
                  DCF Logistics provides comprehensive logistics services including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Customs clearance and brokerage services</li>
                  <li>Freight forwarding (air, sea, and land)</li>
                  <li>Warehousing and distribution</li>
                  <li>Transportation and haulage services</li>
                  <li>Logistics consultancy</li>
                  <li>Cross-border logistics solutions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Client Responsibilities</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Accurate Information</h3>
                    <p className="text-gray-600">
                      Clients must provide accurate, complete, and truthful information regarding shipments, including
                      cargo descriptions, values, origins, and destinations.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
                    <p className="text-gray-600">
                      Clients are responsible for providing all necessary documentation required for customs clearance
                      and transportation, including but not limited to invoices, packing lists, and permits.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance</h3>
                    <p className="text-gray-600">
                      Clients must ensure their shipments comply with all applicable laws, regulations, and restrictions
                      of origin, transit, and destination countries.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Prohibited Items</h2>
                <p className="text-gray-600 mb-4">DCF Logistics will not handle the following items:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Illegal drugs and controlled substances</li>
                  <li>Weapons, ammunition, and explosives</li>
                  <li>Hazardous materials without proper documentation</li>
                  <li>Counterfeit goods and items violating intellectual property rights</li>
                  <li>Items prohibited by customs authorities</li>
                  <li>Perishable goods without proper arrangements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Pricing and Payment</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Quotes and Pricing</h3>
                    <p className="text-gray-600">
                      All quotes are valid for 30 days unless otherwise specified. Prices may be subject to change based
                      on fuel surcharges, currency fluctuations, and regulatory changes.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Terms</h3>
                    <p className="text-gray-600">
                      Payment is due within 30 days of invoice date unless otherwise agreed. Late payments may incur
                      interest charges and may result in suspension of services.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Liability and Insurance</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Limitation of Liability</h3>
                    <p className="text-gray-600">
                      DCF Logistics' liability is limited to the actual value of goods lost or damaged, not exceeding
                      the amount paid for our services. We are not liable for consequential, indirect, or special
                      damages.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Insurance</h3>
                    <p className="text-gray-600">
                      Clients are strongly advised to obtain appropriate cargo insurance. DCF Logistics can arrange
                      insurance coverage upon request at additional cost.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Force Majeure</h2>
                <p className="text-gray-600">
                  DCF Logistics shall not be liable for delays or failures in performance resulting from acts beyond our
                  reasonable control, including but not limited to natural disasters, war, terrorism, strikes,
                  government actions, or pandemic-related restrictions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Confidentiality</h2>
                <p className="text-gray-600">
                  We maintain strict confidentiality regarding client information and shipment details, except as
                  required by law or necessary for service provision.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Dispute Resolution</h2>
                <p className="text-gray-600">
                  Any disputes arising from these terms shall be resolved through arbitration in accordance with the
                  laws of The Gambia. The courts of Banjul, The Gambia shall have exclusive jurisdiction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
                <p className="text-gray-600">
                  Either party may terminate services with 30 days written notice. DCF Logistics reserves the right to
                  terminate services immediately for breach of these terms or non-payment.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications</h2>
                <p className="text-gray-600">
                  DCF Logistics reserves the right to modify these terms at any time. Clients will be notified of
                  significant changes, and continued use of services constitutes acceptance of modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
                <p className="text-gray-600 mb-4">For questions regarding these Terms of Service, please contact us:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">
                    <strong>Digital Clearing and Forwarding Agency</strong>
                    <br />
                    IC PLAZA Cooperative Junction Westfield Serekunda
                    <br />
                    Serekunda, The Gambia
                    <br />
                    Email: legal@dcflogistics.gm
                    <br />
                    Phone: +220 395 1020
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
