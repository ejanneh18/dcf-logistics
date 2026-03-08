import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Plane, Clock, Globe, Shield, FileText, Truck } from "lucide-react"
import type { Metadata } from "next"
import ServiceContactForm from "@/components/service-contact-form"
import ServiceFAQ from "@/components/service-faq"

export const metadata: Metadata = {
  title: "Air Freight | DCF Logistics",
  description: "Swift and secure air cargo solutions for time-sensitive shipments",
}

const airFreightFAQs = [
  {
    question: "What types of goods can be shipped via air freight?",
    answer:
      "Air freight is suitable for a wide range of goods, particularly items that are time-sensitive, high-value, or perishable. This includes electronics, pharmaceuticals, fashion items, perishable foods, medical supplies, documents, samples, and emergency shipments. There are restrictions on dangerous goods, though many can be transported with proper documentation and packaging. Our team can advise on specific requirements for your cargo.",
  },
  {
    question: "How much does air freight cost compared to other shipping methods?",
    answer:
      "Air freight typically costs more than sea or land transportation due to its speed and reliability. Pricing is based on either volumetric weight or actual weight (whichever is greater), along with factors like distance, destination, service type (express vs. standard), fuel surcharges, and any special handling requirements. While more expensive per unit, air freight can be cost-effective when considering the total supply chain cost, especially for high-value or time-sensitive goods.",
  },
  {
    question: "What is the typical transit time for air freight shipments?",
    answer:
      "Transit times vary depending on the origin, destination, and service level chosen. Express air freight can deliver in as little as 1-3 days for international shipments, while standard air freight typically takes 3-8 days. These timeframes include handling at origin and destination airports, customs clearance, and final delivery. We offer various service levels to match your time and budget requirements.",
  },
  {
    question: "How do you ensure the safety and security of air freight shipments?",
    answer:
      "We implement multiple security measures throughout the air freight process. This includes secure packaging, tamper-evident seals, careful handling procedures, and continuous tracking. All shipments comply with international air cargo security regulations, including screening and inspection protocols. Additionally, we work with reputable airlines and handling agents who maintain strict security standards throughout the transportation chain.",
  },
  {
    question: "What documentation is required for international air freight shipments?",
    answer:
      "Required documentation typically includes: Air Waybill (AWB), Commercial Invoice, Packing List, Certificate of Origin (when required), and customs declaration forms. Depending on the goods and destination, additional documents may be needed such as dangerous goods declarations, health certificates, or import permits. Our team handles all documentation requirements to ensure compliance and smooth customs clearance.",
  },
  {
    question: "Can you handle specialized cargo like temperature-sensitive items or dangerous goods?",
    answer:
      "Yes, we have expertise in handling specialized cargo. For temperature-sensitive items, we offer temperature-controlled solutions throughout the supply chain. For dangerous goods, we ensure proper classification, documentation, packaging, and handling in accordance with IATA Dangerous Goods Regulations. We also handle oversized cargo, valuable items, and other special shipments with appropriate care and compliance measures.",
  },
  {
    question: "How can I track my air freight shipment?",
    answer:
      "We provide comprehensive tracking capabilities for all air freight shipments. You'll receive a unique tracking number that allows you to monitor your shipment's progress through our online portal. For key shipments, we also offer proactive status updates via email or SMS. Our customer service team is available to provide detailed information about your shipment's status at any point in the journey.",
  },
]

export default function AirFreightPage() {
  return (
    <>
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1600&h=800&fit=crop&q=80')",
            backgroundBlendMode: "overlay",
          }}
        ></div>

        <div className="container relative z-20 px-4 py-24 md:py-32 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Air Freight Services</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Swift and secure air cargo solutions, offering expedited delivery options for time-sensitive shipments
              with global reach.
            </p>
            <Button size="lg" asChild>
              <Link href="#contact-form">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Global Air Freight Solutions</h2>
              <p className="text-gray-600 mb-6">
                Our air freight services provide fast, reliable transportation for your time-sensitive cargo to
                destinations worldwide. With strategic partnerships with major airlines and cargo carriers, we ensure
                your shipments reach their destination safely and on schedule.
              </p>
              <p className="text-gray-600 mb-6">
                Whether you need to ship documents, perishable goods, high-value items, or oversized cargo, our team has
                the expertise to handle your specific requirements with precision and care.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Express Air Freight</h3>
                    <p className="text-gray-600">
                      Priority shipping for urgent deliveries with guaranteed transit times
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Standard Air Freight</h3>
                    <p className="text-gray-600">Cost-effective solutions for less time-sensitive shipments</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Specialized Cargo Handling</h3>
                    <p className="text-gray-600">
                      Expert handling of perishables, dangerous goods, and high-value items
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1559297434-fae8a1916a79?w=800&h=600&fit=crop&q=80"
                alt="Air freight cargo loading"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Why Choose Our Air Freight Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Delivering excellence in every shipment</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Speed & Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Fast transit times and reliable schedules to meet your time-sensitive delivery requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Global Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Extensive network of airline partners providing access to destinations worldwide.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Cargo Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advanced tracking and security measures to ensure your shipments arrive safely.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Plane className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Flexible Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Customized air freight options to match your specific cargo requirements and budget.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Our Air Freight Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for all your air cargo needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Express Air Freight</h3>
              <p className="text-gray-600 mb-4">
                Our premium service for urgent shipments that require the fastest possible delivery times. Ideal for
                time-critical documents, samples, and high-priority cargo.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Next-day and same-day delivery options</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Priority handling and loading</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Real-time tracking and notifications</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Standard Air Freight</h3>
              <p className="text-gray-600 mb-4">
                Balanced service offering reliable delivery schedules at competitive rates. Perfect for regular
                shipments that require faster transit than ocean freight.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Scheduled departures to major destinations</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Cost-effective for medium-priority cargo</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Consolidated shipping options available</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Specialized Air Cargo</h3>
              <p className="text-gray-600 mb-4">
                Expert handling of special cargo types that require specific temperature, security, or handling
                conditions during transport.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Temperature-controlled shipments</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Dangerous goods and hazardous materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">High-value and oversized cargo</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <ServiceFAQ
            title="Air Freight FAQs"
            description="Common questions about our air freight services"
            faqs={airFreightFAQs}
          />
        </div>
      </section>

      {/* <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <ServiceFAQ
            title="Frequently Asked Questions About Air Freight"
            description="Find answers to common questions about our air freight services"
            faqs={[
              {
                question: "What is the difference between express and standard air freight?",
                answer:
                  "Express air freight prioritizes speed with guaranteed delivery times, often within 1-3 days depending on the destination. It includes priority handling, direct flights, and real-time tracking. Standard air freight offers more economical rates with slightly longer transit times (typically 3-7 days) and is ideal for less time-sensitive shipments.",
              },
              {
                question: "What types of goods can be shipped via air freight?",
                answer:
                  "Most goods can be shipped via air freight, including general cargo, perishables, pharmaceuticals, high-value items, electronics, fashion merchandise, and documents. However, there are restrictions on dangerous goods, which require special handling and documentation. Some items may be prohibited entirely.",
              },
              {
                question: "How are air freight costs calculated?",
                answer:
                  "Air freight costs are typically calculated based on either the actual weight or the volumetric weight (dimensional weight) of the shipment, whichever is greater. Additional factors include distance, destination, service level (express vs. standard), fuel surcharges, security fees, and any special handling requirements.",
              },
              {
                question: "What documentation is required for international air freight shipments?",
                answer:
                  "Required documentation typically includes a commercial invoice, packing list, air waybill (AWB), certificate of origin, and customs declaration forms. Depending on the destination and type of goods, additional documents may be required such as permits, licenses, or certificates for regulated products.",
              },
              {
                question: "How can I track my air freight shipment?",
                answer:
                  "We provide real-time tracking capabilities through our online portal, where you can monitor your shipment's progress using the air waybill number. For express shipments, we also offer proactive status updates via email or SMS at key milestones.",
              },
              {
                question: "Can you handle temperature-sensitive or specialized cargo?",
                answer:
                  "Yes, we offer specialized air freight solutions for temperature-controlled shipments, dangerous goods, oversized cargo, and high-value items. These services include appropriate packaging, monitoring, specialized handling, and compliance with all relevant regulations.",
              },
            ]}
          />
        </div>
      </section> */}

      <section className="py-16 bg-white" id="contact-form">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Request an Air Freight Quote</h2>
              <p className="text-gray-600 mb-6">
                Contact our air freight specialists today to discuss your shipping requirements and receive a
                competitive quote.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Fast Quote Response</h3>
                    <p className="text-gray-600">Receive a detailed quote within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Competitive Rates</h3>
                    <p className="text-gray-600">Benefit from our airline partnerships and volume discounts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Personalized Service</h3>
                    <p className="text-gray-600">Dedicated account manager for your air freight needs</p>
                  </div>
                </div>
              </div>
            </div>

            <ServiceContactForm service="Air Freight" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Related Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our other logistics solutions that complement our air freight services
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
