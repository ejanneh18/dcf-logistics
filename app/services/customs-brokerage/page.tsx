import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, FileText, Globe, Scale, ShieldCheck, Clock, AlertCircle } from "lucide-react"
import type { Metadata } from "next"
import ServiceContactForm from "@/components/service-contact-form"
import ServiceFAQ from "@/components/service-faq"

export const metadata: Metadata = {
  title: "Customs Brokerage | DCF Logistics",
  description: "Expert customs brokerage services for smooth international trade",
}

const customsBrokerageFAQs = [
  {
    question: "What is customs brokerage and why do I need it?",
    answer:
      "Customs brokerage is a professional service that helps importers and exporters navigate the complex process of clearing goods through customs. A customs broker acts as an intermediary between businesses and customs authorities, ensuring compliance with all import/export regulations and facilitating the smooth movement of goods across international borders. You need customs brokerage services to ensure your shipments comply with all relevant laws, avoid delays at customs, properly classify goods for accurate duty assessment, complete and file all required documentation correctly, and ultimately save time and resources while minimizing the risk of penalties or shipment seizures.",
  },
  {
    question: "What services do your customs brokers provide?",
    answer:
      "Our customs brokers provide a comprehensive range of services including: classification of goods according to Harmonized System (HS) codes, calculation and payment of duties, taxes, and fees, preparation and submission of all required customs documentation, coordination with government agencies for regulated goods, securing necessary permits and licenses, representation during customs inspections, advice on trade regulations and compliance, duty drawback claims, free trade agreement qualification, tariff engineering consultation, and post-entry services including audits and record-keeping. We tailor our services to meet your specific international trade requirements.",
  },
  {
    question: "How do you ensure compliance with customs regulations?",
    answer:
      "We ensure compliance through several key practices: maintaining a team of certified customs specialists who undergo continuous education on changing regulations, utilizing advanced compliance software that's regularly updated with the latest regulatory changes, conducting thorough pre-clearance reviews of all documentation, implementing rigorous internal audit procedures, maintaining detailed records of all transactions as required by law, developing customized compliance manuals for clients with specific needs, establishing strong relationships with customs authorities, and providing regular compliance training for both our staff and clients. Our proactive approach helps prevent issues before they occur.",
  },
  {
    question: "What information do I need to provide for customs clearance?",
    answer:
      "For customs clearance, you typically need to provide: detailed commercial invoice including seller and buyer information, precise description of goods, quantities, and values, country of origin for all products, Harmonized System (HS) classification codes, packing list with package count, dimensions, and weights, bill of lading or air waybill, certificates of origin if claiming preferential duty rates, any required permits, licenses, or certificates for regulated goods, information about any special customs programs you're participating in, and your customs bond information. Our team will guide you through exactly what's needed for your specific shipment and help you gather all necessary documentation.",
  },
  {
    question: "How long does the customs clearance process take?",
    answer:
      "The customs clearance timeline varies based on several factors: the type of goods being imported/exported, the countries involved, completeness and accuracy of documentation, whether physical inspection is required, the current workload at the specific port of entry, and any special permits or licenses needed. Typically, with all proper documentation in place, standard clearance can take anywhere from a few hours to 2-3 business days. Complex shipments or those requiring special handling may take longer. Our team works to expedite the process whenever possible and keeps you informed of progress and any potential delays throughout the clearance process.",
  },
  {
    question: "How do you handle customs for specialized or regulated goods?",
    answer:
      "For specialized or regulated goods, we implement a tailored approach: assigning brokers with specific expertise in the relevant product category, maintaining current knowledge of product-specific regulations across different jurisdictions, coordinating with specialized government agencies like FDA, USDA, or EPA as needed, securing all required permits, certificates, and licenses before shipment arrival, arranging for any required inspections or testing, advising on proper labeling and documentation requirements, and developing compliance strategies for ongoing shipments of regulated products. We have particular expertise in handling pharmaceuticals, food products, hazardous materials, electronics, textiles, and agricultural products.",
  },
  {
    question: "What are the benefits of using your customs brokerage services versus handling it ourselves?",
    answer:
      "Using our customs brokerage services offers several advantages: reduced risk of costly delays, penalties, or seizures due to our expertise in compliance; time and resource savings by outsourcing the complex paperwork and procedures; potential cost savings through accurate classification and identification of duty reduction opportunities; faster clearance times due to our established relationships with customs authorities and electronic filing capabilities; access to expert advice on international trade regulations; scalability to handle fluctuating import/export volumes without adding staff; and peace of mind knowing your customs matters are being handled by certified professionals. We become an extension of your team, allowing you to focus on your core business while we manage the complexities of international trade compliance.",
  },
]

export default function CustomsBrokeragePage() {
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Customs Brokerage</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Expert customs clearance services to navigate complex regulations and ensure smooth international trade
              for your business.
            </p>
            <Button size="lg" asChild>
              <Link href="#contact-form">Get Customs Support</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                Expert Customs Brokerage Services
              </h2>
              <p className="text-gray-600 mb-6">
                Our customs brokerage services help businesses navigate the complex world of international trade
                regulations, documentation requirements, and duty calculations. We ensure your shipments clear customs
                efficiently and in full compliance with all applicable laws.
              </p>
              <p className="text-gray-600 mb-6">
                With our team of licensed customs brokers and deep understanding of international trade regulations, we
                help you avoid delays, minimize costs, and maintain smooth cross-border operations.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Regulatory Expertise</h3>
                    <p className="text-gray-600">In-depth knowledge of customs regulations and procedures</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Efficient Clearance</h3>
                    <p className="text-gray-600">Streamlined processes to minimize delays at customs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Cost Optimization</h3>
                    <p className="text-gray-600">Strategic approaches to reduce duties and taxes where possible</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Customs brokerage services"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Our Customs Brokerage Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for all your customs clearance needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <FileText className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Documentation Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Expert preparation and submission of all required customs documentation to ensure compliance and
                  prevent delays.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Import/export declarations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Certificates of origin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Commercial invoices and packing lists</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <Globe className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Customs Clearance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Efficient handling of the customs clearance process to ensure your goods move smoothly across borders.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Electronic customs filing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Customs examination coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Release facilitation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <Scale className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Tariff Classification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Accurate classification of goods according to the Harmonized System (HS) to ensure proper duty
                  assessment.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">HS code determination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Binding ruling requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Classification reviews</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <ShieldCheck className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Compliance Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Ensuring your import/export activities comply with all relevant regulations and trade agreements.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Regulatory compliance reviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Trade agreement qualification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Audit support and representation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <Clock className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Duty & Tax Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Strategic management of duties and taxes to optimize costs while maintaining full compliance.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Duty calculation and payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Duty drawback claims</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Tariff engineering consultation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <AlertCircle className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Special Permits & Licenses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Assistance with obtaining necessary permits and licenses for regulated or restricted goods.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Import/export license applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Coordination with government agencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Specialized product clearance</span>
                  </li>
                </ul>
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
              How we navigate the customs clearance process for your shipments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center relative">
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                1
              </div>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pre-Clearance Preparation</h3>
              <p className="text-gray-600">
                We collect and review all necessary documentation to ensure accuracy and completeness.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center relative">
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                2
              </div>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customs Filing</h3>
              <p className="text-gray-600">
                We submit declarations electronically and coordinate with customs authorities.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center relative">
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                3
              </div>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Scale className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Duty & Tax Payment</h3>
              <p className="text-gray-600">
                We calculate and arrange payment of all applicable duties, taxes, and fees.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center relative">
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                4
              </div>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Release & Delivery</h3>
              <p className="text-gray-600">
                We secure release of your goods from customs and coordinate onward transportation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <ServiceFAQ
            title="Customs Brokerage FAQs"
            description="Common questions about our customs brokerage services"
            faqs={customsBrokerageFAQs}
          />
        </div>
      </section>

      <section className="py-16 bg-white" id="contact-form">
        <div className="container px-2 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                Need Help with Customs Clearance?
              </h2>
              <p className="text-gray-600 mb-6">
                Contact our customs brokerage team today to discuss your international trade requirements and discover
                how we can streamline your customs clearance process.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Expert Guidance</h3>
                    <p className="text-gray-600">
                      Professional advice on customs regulations and compliance requirements
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Efficient Processing</h3>
                    <p className="text-gray-600">Streamlined customs clearance to minimize delays and disruptions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Cost Optimization</h3>
                    <p className="text-gray-600">
                      Strategic approaches to minimize duties and taxes while maintaining compliance
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <ServiceContactForm service="Customs Brokerage" />
          </div>
        </div>
      </section>
    </>
  )
}
