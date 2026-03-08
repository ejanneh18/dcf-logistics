import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Globe, FileText, Truck, Plane } from "lucide-react"
import type { Metadata } from "next"
import ServiceContactForm from "@/components/service-contact-form"
import ServiceFAQ from "@/components/service-faq"

export const metadata: Metadata = {
  title: "Cross Border Logistics | DCF Logistics",
  description: "Seamless management of cross-border logistics for international shipments",
}

const crossBorderFAQs = [
  {
    question: "What documentation is required for cross-border shipments?",
    answer:
      "Cross-border shipments typically require several key documents: Commercial Invoice, Packing List, Bill of Lading or Air Waybill, Certificate of Origin, and Customs Declaration forms. Depending on the goods and countries involved, you may also need product-specific certificates (e.g., phytosanitary certificates for agricultural products), import/export licenses, dangerous goods declarations, or inspection certificates. Our team handles all documentation requirements to ensure compliance with regulations in both origin and destination countries.",
  },
  {
    question: "How do you handle customs clearance for international shipments?",
    answer:
      "Our customs clearance process involves several steps to ensure smooth border crossings. We begin with pre-clearance preparation, including document verification and classification of goods. We then submit customs declarations electronically, calculate and arrange payment of duties and taxes, coordinate any required inspections, and maintain communication with customs authorities throughout the process. Our established relationships with customs officials and in-depth knowledge of procedures help minimize delays and ensure compliance.",
  },
  {
    question: "What are the typical transit times for cross-border shipments?",
    answer:
      "Transit times vary significantly based on the origin and destination countries, transportation mode, and specific routing. Air freight typically takes 1-7 days for international deliveries, while ocean freight can range from 7-45 days depending on the route. Land transportation between neighboring countries usually takes 1-5 days. Factors that can affect transit times include customs processing, inspections, documentation completeness, and local conditions. We provide estimated transit times during the quotation process and offer tracking capabilities to monitor your shipment's progress.",
  },
  {
    question: "How do you handle duties, taxes, and other import/export fees?",
    answer:
      "We provide comprehensive management of all financial aspects of cross-border shipping. This includes accurate calculation of duties based on harmonized tariff codes, handling of value-added tax (VAT) or goods and services tax (GST), payment of customs fees, and management of any additional charges such as inspection fees or special permits. We can operate under different incoterms depending on your preference, either advancing these charges on your behalf (to be invoiced later) or arranging for the consignee to pay them directly upon import.",
  },
  {
    question: "Can you ship to countries with complex import regulations?",
    answer:
      "Yes, we specialize in navigating complex regulatory environments. Our team has experience shipping to countries with strict import controls, extensive documentation requirements, and complex customs procedures. We maintain up-to-date knowledge of country-specific regulations and work with local partners in challenging markets to ensure compliance. For particularly complex destinations, we recommend advance planning and may conduct a pre-shipment compliance review to identify and address potential issues before your goods are in transit.",
  },
  {
    question: "How do you handle restricted or controlled goods in cross-border shipping?",
    answer:
      "For restricted or controlled goods, we implement specialized procedures to ensure compliance with all regulations. This includes identifying applicable restrictions in both origin and destination countries, obtaining necessary permits and licenses, ensuring proper classification and documentation, and coordinating with relevant authorities. We have experience with various controlled categories including dual-use goods, pharmaceuticals, chemicals, food products, and technology items. Our team stays current on changing regulations affecting controlled goods to provide accurate guidance.",
  },
  {
    question: "What tracking and visibility do you provide for cross-border shipments?",
    answer:
      "We offer comprehensive tracking and visibility for all cross-border shipments. Our tracking system provides real-time updates on your shipment's location and status, including key milestones such as departure, arrival at customs, clearance completion, and final delivery. For clients with regular shipments, we can provide customized reporting and dashboard access. Our customer service team is available to provide detailed status updates and address any concerns throughout the shipping process.",
  },
]

export default function CrossBorderLogisticsPage() {
  return (
    <>
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1600&h=800&fit=crop&q=80')",
            backgroundBlendMode: "overlay",
          }}
        ></div>

        <div className="container relative z-20 px-4 py-24 md:py-32 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Cross Border Logistics</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Seamless management of cross-border logistics, facilitating smooth transitions and minimizing complexities
              for international shipments.
            </p>
            <Button size="lg" asChild>
              <Link href="#contact-form">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                Simplifying International Logistics
              </h2>
              <p className="text-gray-600 mb-6">
                Our cross-border logistics services provide comprehensive solutions for businesses looking to expand
                their reach internationally. We handle the complexities of moving goods across borders, ensuring smooth
                transitions and compliance with international regulations.
              </p>
              <p className="text-gray-600 mb-6">
                With our extensive network and expertise in international shipping, we help you navigate customs
                procedures, documentation requirements, and regulatory compliance, allowing you to focus on growing your
                business globally.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">International Shipping</h3>
                    <p className="text-gray-600">Reliable transportation of goods across international borders</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Customs Documentation</h3>
                    <p className="text-gray-600">Expert preparation and management of all required customs paperwork</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Regulatory Compliance</h3>
                    <p className="text-gray-600">Ensuring adherence to international trade regulations and standards</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop&q=80" alt="Cross border logistics" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Our Cross-Border Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for all your international logistics needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <Globe className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">International Transportation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Reliable and efficient transportation of goods across international borders through various modes
                  including air, sea, and land.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Multi-modal international shipping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Door-to-door delivery services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Consolidated shipping options</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <FileText className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Documentation & Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Expert handling of all documentation and compliance requirements for smooth cross-border movement of
                  goods.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Customs documentation preparation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Import/export license assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Regulatory compliance management</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <Truck className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Customs Brokerage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Professional customs brokerage services to facilitate the clearance of goods through customs
                  efficiently.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Customs clearance processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Duty and tax calculation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Customs audit support</span>
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
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Why Choose Our Cross-Border Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The advantages of partnering with DCF Logistics for your international shipping needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Global Network</h3>
              <p className="text-gray-600 mb-4">
                Benefit from our extensive international network of partners and agents, providing seamless logistics
                solutions worldwide.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Partnerships in key global markets</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Local expertise in international regions</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Coordinated global logistics operations</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Regulatory Expertise</h3>
              <p className="text-gray-600 mb-4">
                Navigate complex international regulations with confidence, backed by our team's in-depth knowledge of
                global trade requirements.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Up-to-date knowledge of trade regulations</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Compliance with international standards</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Risk mitigation strategies</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Streamlined Process</h3>
              <p className="text-gray-600 mb-4">
                Experience a simplified cross-border shipping process with our efficient systems and dedicated support
                team.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Single point of contact for all services</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Transparent communication and updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Efficient documentation processing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <ServiceFAQ
            title="Cross-Border Logistics FAQs"
            description="Answers to common questions about international shipping and logistics"
            faqs={crossBorderFAQs}
          />
        </div>
      </section>

      {/* <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <ServiceFAQ
            title="Frequently Asked Questions About Cross-Border Logistics"
            description="Find answers to common questions about our cross-border logistics services"
            faqs={[
              {
                question: "What are the main challenges in cross-border logistics?",
                answer:
                  "The main challenges include customs clearance complexities, varying regulatory requirements between countries, documentation accuracy, potential delays at border crossings, language barriers, different transportation standards, and managing multiple carriers across countries. Our expertise helps navigate these challenges efficiently.",
              },
              {
                question: "How do you handle customs clearance for international shipments?",
                answer:
                  "We manage the entire customs clearance process, including preparation and submission of all required documentation, classification of goods, calculation and payment of duties and taxes, communication with customs authorities, and resolution of any issues that arise. Our customs expertise ensures smooth and compliant border crossings.",
              },
              {
                question: "What documentation is required for cross-border shipments?",
                answer:
                  "Typical documentation includes commercial invoices, packing lists, bills of lading or air waybills, certificates of origin, customs declarations, and import/export licenses. Depending on the goods and countries involved, additional documents may be required such as inspection certificates, permits for regulated goods, or phytosanitary certificates.",
              },
              {
                question: "How do you manage shipments across different countries and carriers?",
                answer:
                  "We utilize advanced logistics management systems that provide end-to-end visibility across multiple carriers and countries. Our global network of partners follows standardized processes, and our centralized coordination team ensures seamless handoffs between different transportation legs and service providers.",
              },
              {
                question: "Can you help with trade compliance and tariff classification?",
                answer:
                  "Yes, our trade compliance specialists assist with proper tariff classification, determination of applicable duties and taxes, identification of potential trade agreements or preferential programs, compliance with import/export regulations, and strategies to optimize duty payments while maintaining full compliance.",
              },
              {
                question: "How do you handle delays or issues at border crossings?",
                answer:
                  "We proactively monitor shipments and maintain close communication with carriers and customs brokers to identify potential issues early. When delays occur, our team quickly investigates the cause, communicates with all relevant parties, and implements solutions to resolve the issue as quickly as possible while keeping you informed throughout the process.",
              },
            ]}
          />
        </div>
      </section> */}

      <section className="py-16 bg-white" id="contact-form">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Ready to Go Global?</h2>
              <p className="text-gray-600 mb-6">
                Contact our cross-border logistics team today to discuss your international shipping needs and discover
                how we can help expand your business globally.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Customized Solutions</h3>
                    <p className="text-gray-600">Tailored cross-border logistics strategies for your specific needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Competitive Rates</h3>
                    <p className="text-gray-600">Cost-effective international shipping options</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Dedicated Support</h3>
                    <p className="text-gray-600">Expert guidance throughout the entire cross-border process</p>
                  </div>
                </div>
              </div>
            </div>

            <ServiceContactForm service="Cross Border Logistics" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Related Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our other logistics solutions that complement our cross-border services
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
                  <Plane className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Air Freight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Swift and secure air cargo solutions, offering expedited delivery options for time-sensitive shipments
                  with global reach.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/services/air-freight">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-2">
                  <Truck className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Customs Clearance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Expert assistance in navigating customs processes for local and imported products, ensuring compliance
                  with governmental regulations and standards.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/services/customs-clearance">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
