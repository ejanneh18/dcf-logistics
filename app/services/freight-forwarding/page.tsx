import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Ship, Plane, Truck, Globe, FileText } from "lucide-react"
import type { Metadata } from "next"
import ServiceContactForm from "@/components/service-contact-form"
import ServiceFAQ from "@/components/service-faq"

export const metadata: Metadata = {
  title: "Freight Forwarding | DCF Logistics",
  description: "Comprehensive freight forwarding solutions for global shipping needs",
}

const freightForwardingFAQs = [
  {
    question: "What is freight forwarding and how does it work?",
    answer:
      "Freight forwarding is the coordination and shipment of goods from one destination to another using single or multiple carriers across different transportation modes. A freight forwarder acts as an intermediary between the shipper and transportation services, handling the logistics of moving products from origin to destination. This includes documentation, transportation booking, cargo tracking, and ensuring compliance with shipping regulations. We manage the entire process, allowing you to focus on your core business while we handle the complexities of international shipping.",
  },
  {
    question: "What types of freight forwarding services do you offer?",
    answer:
      "We offer a comprehensive range of freight forwarding services including air freight, ocean freight (both FCL and LCL), road transportation, rail freight, and multimodal solutions that combine different transportation methods. Our services cover import and export shipments, project cargo, dangerous goods handling, temperature-controlled transportation, and specialized shipping for various industries. We tailor our services to meet your specific requirements, whether you're shipping standard commercial goods or oversized, high-value, or sensitive cargo.",
  },
  {
    question: "How do you determine the best shipping method for my cargo?",
    answer:
      "We determine the optimal shipping method by analyzing several factors: urgency of delivery, budget constraints, cargo dimensions and weight, nature of goods (perishable, hazardous, high-value), origin and destination accessibility, and seasonal considerations. Our logistics experts conduct a thorough assessment of your specific requirements and provide recommendations based on the best balance of cost, speed, reliability, and sustainability. We present you with options and help you make an informed decision that aligns with your business objectives.",
  },
  {
    question: "What documentation is required for international freight forwarding?",
    answer:
      "International shipments typically require several key documents: Commercial Invoice, Packing List, Bill of Lading (for ocean freight) or Air Waybill (for air freight), Certificate of Origin, and Customs Declaration forms. Depending on the goods and countries involved, additional documents may be needed such as import/export licenses, inspection certificates, dangerous goods declarations, or phytosanitary certificates. Our team handles all documentation requirements, ensuring accuracy and compliance with regulations in both origin and destination countries to prevent delays and customs issues.",
  },
  {
    question: "How do you handle customs clearance for international shipments?",
    answer:
      "Our customs clearance process involves several steps to ensure smooth border crossings. We begin with pre-clearance preparation, including document verification and classification of goods according to Harmonized System (HS) codes. We then submit customs declarations electronically, calculate and arrange payment of duties and taxes, coordinate any required inspections, and maintain communication with customs authorities throughout the process. Our established relationships with customs officials and in-depth knowledge of procedures help minimize delays and ensure compliance with all regulations.",
  },
  {
    question: "Can you handle specialized or unusual cargo?",
    answer:
      "Yes, we specialize in handling specialized and unusual cargo that requires extra attention and expertise. This includes oversized and heavy lift cargo, dangerous goods (hazardous materials), temperature-sensitive items, high-value merchandise, and project cargo for industrial installations. Our team has extensive experience in planning and executing complex shipments, including obtaining special permits, arranging for specialized equipment, and coordinating with carriers who have the capability to transport non-standard items safely and efficiently.",
  },
  {
    question: "What tracking and visibility do you provide for shipments?",
    answer:
      "We offer comprehensive tracking and visibility for all shipments through our digital platform. You can monitor your cargo's journey in real-time, including current location, estimated arrival times, and status updates at key milestones. For clients with regular shipments, we provide customized reporting and dashboard access with detailed analytics. Our proactive notification system alerts you to any potential delays or issues, and our customer service team is available to provide detailed status updates and address any concerns throughout the shipping process.",
  },
]

export default function FreightForwardingPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Freight Forwarding</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Comprehensive freight forwarding solutions to streamline your global shipping needs with expertise and
              efficiency.
            </p>
            <Button size="lg" asChild>
              <Link href="#contact-form">Request a Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                Global Freight Forwarding Solutions
              </h2>
              <p className="text-gray-600 mb-6">
                Our freight forwarding services provide end-to-end logistics solutions for businesses of all sizes. We
                handle the complex process of moving your goods across international borders, ensuring timely delivery
                and compliance with all regulations.
              </p>
              <p className="text-gray-600 mb-6">
                With our extensive network of global partners and deep industry expertise, we optimize your supply chain
                and provide cost-effective shipping solutions tailored to your specific needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">International Expertise</h3>
                    <p className="text-gray-600">Specialized knowledge of global shipping routes and regulations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Multimodal Solutions</h3>
                    <p className="text-gray-600">Seamless integration of air, sea, and land transportation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">End-to-End Management</h3>
                    <p className="text-gray-600">Complete oversight from pickup to final delivery</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Freight forwarding operations"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Our Freight Forwarding Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for all your shipping needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <Ship className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Ocean Freight</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Reliable and cost-effective ocean freight solutions for both Full Container Load (FCL) and Less than
                  Container Load (LCL) shipments worldwide.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">FCL and LCL shipping options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Competitive rates with major carriers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Special equipment for oversized cargo</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <Plane className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Air Freight</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Fast and reliable air freight services for time-sensitive shipments, with options for express and
                  standard delivery.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Express and consolidated services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Door-to-door delivery options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Handling of dangerous and valuable goods</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <Truck className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Road & Rail Freight</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Efficient ground transportation solutions for domestic and cross-border shipments, with options for
                  full truckload and partial loads.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">FTL and LTL shipping options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Intermodal and rail solutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Temperature-controlled transportation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <Globe className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Multimodal Solutions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Integrated transportation solutions combining different modes of transport for optimal efficiency and
                  cost-effectiveness.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Seamless integration of transport modes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Optimized routing and scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Single point of contact for entire journey</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <FileText className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Customs Brokerage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Expert customs clearance services to navigate complex regulations and ensure smooth border crossings
                  for your shipments.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Documentation preparation and filing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Duty and tax calculation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Compliance with trade regulations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Specialized Cargo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Tailored solutions for special cargo types including oversized, hazardous, perishable, and high-value
                  goods.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Project cargo and heavy lift</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Dangerous goods handling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Temperature-controlled shipping</span>
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
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">The Freight Forwarding Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              How we manage your shipments from origin to destination
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
              <h3 className="text-xl font-semibold mb-3">Consultation & Planning</h3>
              <p className="text-gray-600">
                We assess your shipping needs, discuss requirements, and develop a tailored logistics plan.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center relative">
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                2
              </div>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Documentation & Booking</h3>
              <p className="text-gray-600">
                We prepare all necessary shipping documents and secure space with appropriate carriers.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center relative">
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                3
              </div>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Transportation & Tracking</h3>
              <p className="text-gray-600">
                Your cargo is transported via the selected mode(s) with real-time tracking throughout the journey.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center relative">
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                4
              </div>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customs & Delivery</h3>
              <p className="text-gray-600">
                We handle customs clearance and coordinate final delivery to the destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <ServiceFAQ
            title="Freight Forwarding FAQs"
            description="Common questions about our freight forwarding services"
            faqs={freightForwardingFAQs}
          />
        </div>
      </section>

      <section className="py-16 bg-white" id="contact-form">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Ready to Ship?</h2>
              <p className="text-gray-600 mb-6">
                Contact our freight forwarding team today to discuss your shipping requirements and receive a
                competitive quote.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Personalized Solutions</h3>
                    <p className="text-gray-600">Tailored freight forwarding strategies for your specific needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Competitive Rates</h3>
                    <p className="text-gray-600">
                      Cost-effective shipping options leveraging our carrier relationships
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Dedicated Support</h3>
                    <p className="text-gray-600">Expert guidance throughout the entire shipping process</p>
                  </div>
                </div>
              </div>
            </div>

            <ServiceContactForm service="Freight Forwarding" />
          </div>
        </div>
      </section>
    </>
  )
}
