import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Truck, FileText, Globe, Clock, Building } from "lucide-react"
import type { Metadata } from "next"
import ServiceContactForm from "@/components/service-contact-form"
import ServiceFAQ from "@/components/service-faq"

export const metadata: Metadata = {
  title: "Customs Clearance | DCF Logistics",
  description: "Expert assistance in navigating customs processes for local and imported products",
}

export default function CustomsClearancePage() {
  return (
    <>
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1600')",
            backgroundBlendMode: "overlay",
          }}
        ></div>

        <div className="container relative z-20 px-4 py-24 md:py-32 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Customs Clearance</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Expert assistance in navigating customs processes for local and imported products, ensuring compliance
              with governmental regulations and standards.
            </p>
            <Button size="lg" asChild>
              <Link href="#contact-form">Get Clearance Support</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                Streamlined Customs Clearance Solutions
              </h2>
              <p className="text-gray-600 mb-6">
                Our customs clearance services provide expert assistance in navigating the complex procedures involved
                in clearing goods through customs. We ensure your shipments comply with all regulatory requirements and
                move through customs efficiently.
              </p>
              <p className="text-gray-600 mb-6">
                With our in-depth knowledge of customs regulations and procedures, we help minimize delays, avoid
                penalties, and ensure your goods are released promptly, saving you time and money.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Import Clearance</h3>
                    <p className="text-gray-600">Efficient processing of imported goods through customs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Export Documentation</h3>
                    <p className="text-gray-600">Preparation of all necessary documents for exporting goods</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Duty & Tax Management</h3>
                    <p className="text-gray-600">Expert handling of customs duties, taxes, and other charges</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Customs clearance services"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Our Customs Clearance Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for all your customs needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Import Clearance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Complete handling of the import clearance process, ensuring your goods are released from customs
                  promptly and in compliance with all regulations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Preparation and management of all required customs documentation, ensuring accuracy and compliance
                  with regulatory requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Expert guidance on customs regulations and compliance requirements, helping you avoid penalties and
                  delays.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Expedited Clearance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Fast-track customs clearance services for time-sensitive shipments, minimizing delays and ensuring
                  prompt delivery.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">The Customs Clearance Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              How we streamline your customs clearance experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Pre-Clearance Preparation</h3>
              <p className="text-gray-600 mb-4">
                We begin by gathering all necessary information and documents to prepare for the customs clearance
                process.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Document collection and verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Classification of goods for customs purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Duty and tax calculation</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Customs Processing</h3>
              <p className="text-gray-600 mb-4">
                Our team handles the submission of documents and communication with customs authorities to process your
                clearance.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Customs declaration submission</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Liaison with customs officials</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Payment of duties and taxes</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Post-Clearance</h3>
              <p className="text-gray-600 mb-4">
                After clearance, we ensure your goods are released promptly and provide all necessary documentation for
                your records.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Release of goods from customs</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Delivery coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Documentation for record-keeping</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <ServiceFAQ
            title="Frequently Asked Questions About Customs Clearance"
            description="Find answers to common questions about our customs clearance services"
            faqs={[
              {
                question: "How long does the customs clearance process typically take?",
                answer:
                  "The timeline varies depending on factors such as the country, type of goods, completeness of documentation, and customs workload. Standard clearance typically takes 1-3 business days, while expedited services can often clear customs within 24 hours. Certain goods requiring special permits or inspections may take longer.",
              },
              {
                question: "What information do you need from me to handle customs clearance?",
                answer:
                  "We typically need details about the goods (description, value, quantity, HS codes), shipping information (origin, destination, carrier details), commercial documents (invoice, packing list), and any specific import/export licenses or permits required for your particular goods. Our team will provide a comprehensive checklist based on your specific shipment.",
              },
              {
                question: "How are customs duties and taxes calculated?",
                answer:
                  "Customs duties are typically calculated as a percentage of the declared value of the goods, based on their tariff classification (HS code). Additional taxes such as VAT or GST may also apply. The rates vary by country and product type. We provide duty and tax estimates before shipping so you can budget accordingly.",
              },
              {
                question: "Can you help with customs issues or seized shipments?",
                answer:
                  "Yes, we have extensive experience resolving customs issues including detained or seized shipments, documentation discrepancies, valuation disputes, and classification challenges. Our team works directly with customs authorities to address concerns, provide additional information, and facilitate the release of your goods.",
              },
              {
                question: "Do you handle special customs procedures like temporary imports or bonded warehousing?",
                answer:
                  "Yes, we manage specialized customs procedures including temporary imports, bonded warehousing, inward processing relief, returned goods relief, and other special customs regimes. These procedures can offer significant duty savings or cash flow advantages for certain business operations.",
              },
              {
                question: "How do you ensure compliance with customs regulations?",
                answer:
                  "We maintain up-to-date knowledge of customs regulations across multiple jurisdictions, employ certified customs specialists, use advanced compliance software, conduct regular internal audits, and follow strict documentation protocols. Our systematic approach minimizes the risk of compliance issues and potential penalties.",
              },
            ]}
          />
        </div>
      </section>

      <section className="py-16 bg-gray-50" id="contact-form">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                Need Customs Clearance Assistance?
              </h2>
              <p className="text-gray-600 mb-6">
                Contact our customs clearance team today to discuss your needs and discover how we can help streamline
                your import and export processes.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Expert Guidance</h3>
                    <p className="text-gray-600">Benefit from our in-depth knowledge of customs procedures</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Efficient Processing</h3>
                    <p className="text-gray-600">Minimize delays and ensure prompt clearance of your goods</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Compliance Assurance</h3>
                    <p className="text-gray-600">Ensure adherence to all customs regulations and requirements</p>
                  </div>
                </div>
              </div>
            </div>

            <ServiceContactForm service="Customs Clearance" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Related Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our other logistics solutions that complement our customs clearance services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-2">
                  <FileText className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Logistic Consultancy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Professional guidance and strategic insights to optimize logistics operations, enhancing efficiency
                  and minimizing costs.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/services/logistic-consultancy">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-2">
                  <Globe className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Cross Border Logistics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Seamless management of cross-border logistics, facilitating smooth transitions and minimizing
                  complexities for international shipments.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/services/cross-border-logistics">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-2">
                  <Building className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Expert assistance in navigating the registration process for local and imported products, ensuring
                  compliance with governmental regulations and standards.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/services/regulatory-compliance">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
