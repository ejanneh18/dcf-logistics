import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Truck, Ship, FileText, Globe } from "lucide-react"
import type { Metadata } from "next"
import ServiceContactForm from "@/components/service-contact-form"
import ServiceFAQ from "@/components/service-faq"

export const metadata: Metadata = {
  title: "Haulage and Inland Water Transportation | DCF Logistics",
  description: "Comprehensive transportation services for road haulage and inland waterways",
}

const haulageTransportationFAQs = [
  {
    question: "What types of vehicles and vessels do you use for transportation?",
    answer:
      "Our fleet includes a diverse range of vehicles and vessels to accommodate various cargo types and volumes. For road haulage, we operate trucks ranging from light commercial vehicles to heavy-duty trucks and specialized trailers for oversized or temperature-controlled cargo. Our inland water transportation fleet includes barges and vessels of different capacities suitable for bulk cargo, containers, and project cargo. All our transportation assets are regularly maintained and comply with safety and environmental regulations.",
  },
  {
    question: "What is the maximum weight and size you can transport?",
    answer:
      "For road haulage, we can transport standard loads up to 44 tons, with specialized equipment available for heavier loads as oversized cargo. Our inland water vessels can handle significantly larger volumes, with some barges capable of carrying several thousand tons of cargo. For oversized or project cargo with exceptional dimensions, we conduct detailed route surveys and obtain necessary permits to ensure safe and compliant transportation. Please contact us with your specific requirements for a customized solution.",
  },
  {
    question: "How do you ensure the safety and security of goods during transportation?",
    answer:
      "We implement comprehensive safety and security measures throughout the transportation process. This includes careful cargo securing and lashing, GPS tracking of vehicles and vessels, regular driver training, and strict adherence to safety protocols. For high-value shipments, we offer additional security options such as sealed containers, escort services, and enhanced monitoring. All our operations comply with industry safety standards and regulations to ensure your cargo arrives safely at its destination.",
  },
  {
    question: "What is the typical transit time for road and inland water transportation?",
    answer:
      "Transit times vary based on distance, route conditions, and cargo type. For road haulage within the country, deliveries typically take 1-3 days depending on distance. Regional deliveries may be completed within 24 hours. Inland water transportation generally takes longer than road transport but offers cost advantages for bulk cargo. We provide estimated transit times during the quotation process and offer tracking capabilities so you can monitor your shipment's progress.",
  },
  {
    question: "Do you offer intermodal transportation solutions?",
    answer:
      "Yes, we specialize in intermodal transportation solutions that combine road haulage and inland water transportation for optimal efficiency. This approach leverages the cost-effectiveness of water transport for long distances and the flexibility of road transport for first and last-mile delivery. Our integrated logistics planning ensures seamless transitions between transportation modes, with coordinated scheduling and documentation. This intermodal approach often results in cost savings and reduced environmental impact compared to single-mode transportation.",
  },
  {
    question: "How do you handle transportation of dangerous or hazardous goods?",
    answer:
      "We have specialized protocols and equipment for transporting dangerous and hazardous goods. Our drivers and vessel operators are trained and certified in handling hazardous materials, and we use appropriate vehicles and containers that comply with ADR (road) and ADN (inland waterway) regulations. We ensure proper documentation, labeling, and segregation of dangerous goods. Before transportation, we conduct thorough risk assessments and develop specific safety plans for each hazardous shipment to ensure compliance with all relevant regulations.",
  },
  {
    question: "What happens in case of delays or unforeseen circumstances during transportation?",
    answer:
      "We have contingency plans in place to address delays or unforeseen circumstances such as weather conditions, traffic disruptions, or mechanical issues. Our operations team monitors all shipments and can quickly implement alternative routing or transportation methods when necessary. In case of significant delays, we proactively communicate with clients and provide updated delivery estimates. For time-critical shipments, we can offer expedited services or alternative transportation modes to minimize disruption to your supply chain.",
  },
]

export default function HaulageTransportationPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Haulage and Inland Water Transportation
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Comprehensive transportation services encompassing road haulage and inland waterways, providing versatile
              options for cargo movement.
            </p>
            <Button size="lg" asChild>
              <Link href="#contact-form">Request Transportation</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                Versatile Transportation Solutions
              </h2>
              <p className="text-gray-600 mb-6">
                Our haulage and inland water transportation services provide flexible, cost-effective solutions for
                moving your cargo across various distances and terrains. With a modern fleet of vehicles and vessels, we
                ensure your goods are transported safely and efficiently.
              </p>
              <p className="text-gray-600 mb-6">
                Whether you need to transport containers, bulk cargo, or oversized equipment, our experienced team can
                handle shipments of all sizes and types, providing end-to-end logistics support.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Road Haulage</h3>
                    <p className="text-gray-600">
                      Reliable transportation via trucks and trailers for various cargo types
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Inland Waterway Transport</h3>
                    <p className="text-gray-600">Efficient cargo movement via rivers and canals for bulk shipments</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Intermodal Solutions</h3>
                    <p className="text-gray-600">
                      Seamless integration of road and water transportation for optimal efficiency
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Haulage and inland water transportation"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Our Transportation Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for all your cargo movement needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <Truck className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Road Haulage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Our road haulage services utilize a modern fleet of vehicles to transport your cargo safely and
                  efficiently across various distances. We offer flexible solutions tailored to your specific
                  requirements.
                </p>

                <h3 className="font-semibold text-lg">Services Include:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Full Truckload (FTL) transportation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Less Than Truckload (LTL) shipping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Container transportation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Oversized and heavy cargo transport</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Temperature-controlled transportation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Last-mile delivery services</span>
                  </li>
                </ul>

                <div className="pt-4">
                  <Button variant="outline" asChild>
                    <Link href="#contact-form">Request Road Haulage</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="mb-4">
                  <Ship className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Inland Water Transportation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Our inland water transportation services provide an eco-friendly and cost-effective alternative for
                  moving large volumes of cargo. We utilize rivers and canals to transport your goods efficiently.
                </p>

                <h3 className="font-semibold text-lg">Services Include:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Bulk cargo transportation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Container barge services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Project cargo and heavy lift transport</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Liquid cargo transportation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Port-to-port and door-to-door services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Intermodal connections with road and rail</span>
                  </li>
                </ul>

                <div className="pt-4">
                  <Button variant="outline" asChild>
                    <Link href="#contact-form">Request Water Transport</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Key Benefits</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Why choose our haulage and inland water transportation services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Cost Efficiency</h3>
              <p className="text-gray-600 mb-4">
                Optimize your transportation costs with our flexible solutions that match your cargo volume and delivery
                requirements.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Competitive pricing structures</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Volume-based discounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Fuel-efficient transportation options</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Reliability & Safety</h3>
              <p className="text-gray-600 mb-4">
                Count on our experienced team and well-maintained fleet to deliver your cargo safely and on schedule.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Modern, regularly serviced vehicles</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Trained and certified drivers</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Cargo tracking and monitoring</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Flexibility & Scalability</h3>
              <p className="text-gray-600 mb-4">
                Adapt to changing business needs with our versatile transportation options that scale with your
                requirements.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Customized transportation plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Intermodal transportation options</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Seasonal capacity adjustments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <ServiceFAQ
            title="Haulage and Transportation FAQs"
            description="Answers to common questions about our transportation services"
            faqs={haulageTransportationFAQs}
          />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <ServiceFAQ
            title="Frequently Asked Questions About Haulage and Transportation"
            description="Find answers to common questions about our haulage and inland water transportation services"
            faqs={[
              {
                question: "What is the difference between FTL and LTL shipping?",
                answer:
                  "Full Truckload (FTL) means your goods occupy an entire truck, providing dedicated transport, faster delivery, and reduced handling. Less Than Truckload (LTL) involves sharing truck space with other shipments, which is more cost-effective for smaller cargo but may have longer transit times due to multiple stops.",
              },
              {
                question: "What are the advantages of inland water transportation over road haulage?",
                answer:
                  "Inland water transportation offers several advantages for bulk cargo: it's more environmentally friendly with lower carbon emissions, more cost-effective for large volumes, can accommodate oversized cargo that would be difficult to transport by road, and often faces fewer congestion issues compared to highways.",
              },
              {
                question: "How do you ensure the safety of goods during transportation?",
                answer:
                  "We ensure cargo safety through proper loading techniques, secure strapping and bracing, regular vehicle maintenance, trained and experienced drivers, GPS tracking systems, and appropriate packaging recommendations. For sensitive or high-value items, we offer additional security measures and specialized handling.",
              },
              {
                question: "Can you transport hazardous materials or dangerous goods?",
                answer:
                  "Yes, we are certified to transport various classes of hazardous materials and dangerous goods. Our drivers have specialized training and certifications, our vehicles meet all safety requirements, and we strictly adhere to all regulations regarding documentation, labeling, packaging, and routing for dangerous cargo.",
              },
              {
                question: "What tracking capabilities do you offer for road and water transportation?",
                answer:
                  "We provide real-time GPS tracking for our road fleet, allowing you to monitor your shipment's location and estimated arrival time. For inland water transportation, we offer regular status updates at key checkpoints and terminals. All tracking information is accessible through our online customer portal.",
              },
              {
                question: "How do you handle intermodal transportation needs?",
                answer:
                  "Our intermodal solutions seamlessly integrate road, rail, and water transportation to optimize efficiency and cost. We coordinate all aspects including container transfers, documentation, scheduling, and tracking across different transportation modes, providing you with a single point of contact throughout the entire process.",
              },
            ]}
          />
        </div>
      </section>

      <section className="py-16 bg-white" id="contact-form">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Request Transportation Services</h2>
              <p className="text-gray-600 mb-6">
                Contact our transportation team today to discuss your cargo movement needs and receive a competitive
                quote.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Customized Solutions</h3>
                    <p className="text-gray-600">Tailored transportation plans based on your specific requirements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Transparent Pricing</h3>
                    <p className="text-gray-600">Clear, detailed quotes with no hidden costs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Dedicated Support</h3>
                    <p className="text-gray-600">Assigned transportation coordinator for your shipments</p>
                  </div>
                </div>
              </div>
            </div>

            <ServiceContactForm service="Haulage and Transportation" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Related Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our other logistics solutions that complement our transportation services
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
