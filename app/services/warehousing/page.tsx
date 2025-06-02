import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Warehouse, Package, TrendingUp, BarChart, Clock, Shield } from "lucide-react"
import type { Metadata } from "next"
import ServiceContactForm from "@/components/service-contact-form"
import ServiceFAQ from "@/components/service-faq"

export const metadata: Metadata = {
  title: "Warehousing & Distribution | DCF Logistics",
  description: "Flexible warehousing and distribution solutions to optimize your supply chain",
}

const warehousingFAQs = [
  {
    question: "What warehousing services do you offer?",
    answer:
      "We offer a comprehensive range of warehousing services including short and long-term storage, inventory management, order fulfillment, cross-docking, distribution, pick and pack services, kitting and assembly, and reverse logistics. Our facilities are equipped to handle various types of goods including general merchandise, temperature-controlled products, oversized items, and specialized cargo. We tailor our warehousing solutions to meet your specific business requirements and can scale services as your needs change.",
  },
  {
    question: "Where are your warehouse facilities located?",
    answer:
      "Our strategic network of warehouse facilities spans key logistics hubs across West Africa, with our primary facilities located in Banjul (Gambia), Dakar (Senegal), Accra (Ghana), and Lagos (Nigeria). These locations are chosen for their proximity to major ports, airports, and transportation networks, allowing for efficient distribution throughout the region. For clients with specific geographic requirements, we can also arrange warehousing solutions through our partner network in additional locations.",
  },
  {
    question: "How do you manage inventory in your warehouses?",
    answer:
      "We utilize advanced Warehouse Management Systems (WMS) to maintain accurate, real-time inventory control. Our inventory management processes include barcode scanning, cycle counting, FIFO/FEFO protocols, lot tracking, and detailed reporting. You'll have access to our online portal where you can view current inventory levels, track movements, generate reports, and receive automated alerts for low stock or other predefined triggers. Our system integrates with most ERP and e-commerce platforms to ensure seamless data flow across your supply chain.",
  },
  {
    question: "What security measures are in place at your warehouses?",
    answer:
      "Security is paramount at our facilities. We implement comprehensive measures including 24/7 CCTV surveillance, controlled access systems, security personnel, perimeter fencing, alarm systems, and fire protection. Our facilities are regularly inspected and maintained to meet or exceed industry safety standards. Additionally, we conduct background checks on all warehouse staff and implement strict protocols for handling high-value items. We also maintain appropriate insurance coverage for all goods stored in our facilities.",
  },
  {
    question: "Can you handle special storage requirements?",
    answer:
      "Yes, we accommodate a wide range of special storage requirements. Our facilities include temperature-controlled areas for perishable goods, cold storage for pharmaceuticals and food products, humidity-controlled sections for sensitive items, secure areas for high-value merchandise, and specialized racking for oversized or unusually shaped items. We also have capabilities for hazardous materials storage in compliance with relevant regulations. Our team will work with you to understand your specific requirements and develop appropriate storage solutions.",
  },
  {
    question: "How does your order fulfillment process work?",
    answer:
      "Our order fulfillment process begins when we receive orders through our system, which can integrate with your e-commerce platform or ERP. Our team picks the items from inventory using optimized picking routes, carefully packs them according to your specifications, and prepares shipping documentation. We can include custom packaging, inserts, or promotional materials as needed. Orders are then dispatched via your preferred shipping method, and tracking information is updated in our system. You and your customers receive real-time updates throughout the process, and we provide detailed reporting on fulfillment performance.",
  },
  {
    question: "What are your pricing models for warehousing services?",
    answer:
      "We offer flexible pricing models to accommodate different business needs. Options include fixed monthly rates based on dedicated space allocation, variable rates based on actual storage volume (per pallet, per cubic meter, etc.), and activity-based pricing for handling, picking, packing, and other value-added services. For fulfillment services, we typically charge a combination of storage fees and per-order processing fees. We can also develop custom pricing structures for clients with unique requirements or seasonal fluctuations. We provide transparent billing with detailed breakdowns of all charges.",
  },
]

export default function WarehousingPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Warehousing & Distribution</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Flexible warehousing solutions and efficient distribution services to optimize your supply chain and
              enhance your business operations.
            </p>
            <Button size="lg" asChild>
              <Link href="#contact-form">Get Storage Solutions</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                Strategic Warehousing & Distribution
              </h2>
              <p className="text-gray-600 mb-6">
                Our warehousing and distribution services provide businesses with flexible storage solutions and
                efficient order fulfillment capabilities. We help you optimize inventory management, reduce operational
                costs, and improve delivery times to enhance customer satisfaction.
              </p>
              <p className="text-gray-600 mb-6">
                With strategically located facilities and advanced technology systems, we offer scalable solutions that
                grow with your business and adapt to changing market demands.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Strategic Locations</h3>
                    <p className="text-gray-600">
                      Warehouses positioned in key logistics hubs for optimal distribution
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Advanced Inventory Management</h3>
                    <p className="text-gray-600">Real-time tracking and efficient stock control systems</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Flexible Solutions</h3>
                    <p className="text-gray-600">Customizable services to meet your specific business requirements</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Modern warehouse facility"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Our Warehousing Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for all your storage and distribution needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <Warehouse className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Storage Solutions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Flexible storage options for short-term and long-term needs, with facilities designed to accommodate
                  various types of goods.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Short and long-term storage options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Temperature-controlled environments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Secure facilities with 24/7 monitoring</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <Package className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Order Fulfillment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Efficient order processing and fulfillment services to ensure timely delivery to your customers.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Pick and pack services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Kitting and assembly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Custom packaging and labeling</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <TrendingUp className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Inventory Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Advanced inventory control systems to optimize stock levels and improve supply chain efficiency.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Real-time inventory tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Cycle counting and reconciliation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Detailed reporting and analytics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <BarChart className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Distribution Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Efficient distribution solutions to ensure your products reach their destinations on time and in
                  perfect condition.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Regional and national distribution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Cross-docking capabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Last-mile delivery coordination</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <Clock className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Value-Added Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Additional services to enhance your supply chain operations and improve customer satisfaction.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Product inspection and quality control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Reverse logistics and returns processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Product reworking and repackaging</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Specialized Storage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Specialized storage solutions for goods requiring specific handling or environmental conditions.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Climate-controlled storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Hazardous materials handling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">High-value item security</span>
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
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Our Warehouse Facilities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Strategic locations designed for efficient storage and distribution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Banjul warehouse facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Banjul, Gambia</h3>
                <p className="text-gray-600 mb-4">
                  Our flagship facility offering 15,000 square meters of storage space with state-of-the-art security
                  and inventory management systems.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Temperature-controlled sections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Cross-docking capabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Proximity to major port</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Accra warehouse facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Accra, Ghana</h3>
                <p className="text-gray-600 mb-4">
                  Strategic distribution center with 10,000 square meters of versatile storage space and excellent
                  transportation connections.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">High-bay racking systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Advanced security systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Regional distribution hub</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <ServiceFAQ
            title="Warehousing & Distribution FAQs"
            description="Common questions about our warehousing and distribution services"
            faqs={warehousingFAQs}
          />
        </div>
      </section>

      <section className="py-16 bg-white" id="contact-form">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                Ready for Efficient Warehousing Solutions?
              </h2>
              <p className="text-gray-600 mb-6">
                Contact our warehousing team today to discuss your storage and distribution needs and discover how we
                can optimize your supply chain.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Customized Solutions</h3>
                    <p className="text-gray-600">Tailored warehousing strategies for your specific business needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Flexible Terms</h3>
                    <p className="text-gray-600">Adaptable storage options with no long-term commitments required</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Scalable Capacity</h3>
                    <p className="text-gray-600">Ability to scale storage space up or down as your needs change</p>
                  </div>
                </div>
              </div>
            </div>

            <ServiceContactForm service="Warehousing & Distribution" />
          </div>
        </div>
      </section>
    </>
  )
}
