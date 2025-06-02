import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, FileText, BarChart, TrendingUp, Users, Plane, Globe, Truck } from "lucide-react"
import type { Metadata } from "next"
import ServiceContactForm from "@/components/service-contact-form"
import ServiceFAQ from "@/components/service-faq"

export const metadata: Metadata = {
  title: "Logistic Consultancy | DCF Logistics",
  description: "Professional guidance and strategic insights to optimize logistics operations",
}

const logisticConsultancyFAQs = [
  {
    question: "What is logistics consultancy and how can it benefit my business?",
    answer:
      "Logistics consultancy involves expert analysis and optimization of your supply chain operations. Our consultants identify inefficiencies, develop strategic improvements, and help implement solutions that reduce costs, improve delivery times, and enhance overall operational efficiency. This leads to competitive advantages, better customer satisfaction, and improved profitability.",
  },
  {
    question: "How do you approach a logistics consultancy project?",
    answer:
      "Our approach follows a structured methodology: First, we conduct a comprehensive assessment of your current logistics operations. Next, we analyze the data to identify bottlenecks and opportunities. Then, we develop a tailored strategy with actionable recommendations. Finally, we provide implementation support to ensure successful execution and monitor results to make adjustments as needed.",
  },
  {
    question: "What types of logistics issues can your consultancy services address?",
    answer:
      "Our consultancy services can address a wide range of logistics challenges including transportation optimization, warehouse layout and operations improvement, inventory management, distribution network design, supplier relationship management, technology integration, cross-border logistics, and regulatory compliance. We tailor our solutions to your specific business needs.",
  },
  {
    question: "How long does a typical logistics consultancy project take?",
    answer:
      "The duration varies depending on the scope and complexity of your logistics operations. A focused assessment might take 2-4 weeks, while a comprehensive supply chain transformation could span several months. During our initial consultation, we'll provide a more accurate timeline based on your specific requirements and objectives.",
  },
  {
    question: "Will I need to disrupt my current operations during the consultancy process?",
    answer:
      "We design our consultancy process to minimize disruption to your ongoing operations. Most of our assessment and analysis work happens in parallel with your normal business activities. When implementation begins, we typically recommend a phased approach to changes, allowing your team to adapt gradually while maintaining business continuity.",
  },
  {
    question: "How do you measure the success of your logistics consultancy services?",
    answer:
      "We establish clear, measurable KPIs at the beginning of each project, aligned with your business objectives. These might include cost reduction percentages, delivery time improvements, inventory turnover rates, order accuracy, or other relevant metrics. We track these indicators before, during, and after implementation to quantify the impact of our recommendations.",
  },
  {
    question: "Do you offer ongoing support after the initial consultancy project?",
    answer:
      "Yes, we offer various levels of ongoing support based on your needs. This can range from periodic reviews and adjustments to your logistics strategy, to continuous improvement initiatives, to training programs for your team. Many clients choose to maintain a relationship with us to ensure their logistics operations continue to evolve with changing business conditions.",
  },
]

export default function LogisticConsultancyPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Logistic Consultancy</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Professional guidance and strategic insights to optimize logistics operations, enhancing efficiency and
              minimizing costs.
            </p>
            <Button size="lg" asChild>
              <Link href="#contact-form">Request Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Optimize Your Supply Chain</h2>
              <p className="text-gray-600 mb-6">
                Our logistics consultancy services provide expert guidance to help businesses streamline their supply
                chain operations, reduce costs, and improve overall efficiency. With years of industry experience, our
                consultants analyze your current logistics processes and develop tailored strategies to address your
                specific challenges.
              </p>
              <p className="text-gray-600 mb-6">
                Whether you're looking to optimize transportation routes, improve warehouse management, or enhance your
                distribution network, our team provides data-driven insights and practical solutions to help you achieve
                your goals.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Comprehensive Analysis</h3>
                    <p className="text-gray-600">In-depth evaluation of your current logistics operations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Strategic Planning</h3>
                    <p className="text-gray-600">
                      Development of tailored logistics strategies aligned with your business goals
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Implementation Support</h3>
                    <p className="text-gray-600">Guidance and assistance throughout the implementation process</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Logistics consultancy session"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Our Consultancy Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We follow a structured approach to deliver effective logistics solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>1. Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Comprehensive evaluation of your current logistics operations, identifying strengths, weaknesses, and
                  opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <BarChart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>2. Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Data-driven analysis of your supply chain, costs, and performance metrics to identify optimization
                  opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>3. Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Development of tailored logistics strategies and actionable recommendations to achieve your business
                  objectives.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>4. Implementation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Hands-on support during implementation, with ongoing monitoring and adjustments to ensure optimal
                  results.
                </p>
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
              How our logistics consultancy services can transform your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Cost Reduction</h3>
              <p className="text-gray-600 mb-4">
                Identify inefficiencies and implement cost-saving measures across your supply chain, from transportation
                to warehousing.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Optimize transportation routes and modes</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Reduce warehousing and inventory costs</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Minimize customs and compliance expenses</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Improved Efficiency</h3>
              <p className="text-gray-600 mb-4">
                Streamline operations and processes to enhance productivity and reduce lead times throughout your supply
                chain.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Streamline order processing and fulfillment</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Optimize warehouse layout and operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Implement effective inventory management</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Strategic Advantage</h3>
              <p className="text-gray-600 mb-4">
                Gain a competitive edge through optimized logistics operations that enhance customer satisfaction and
                business growth.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Improve delivery times and reliability</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Enhance customer satisfaction and retention</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Scale operations efficiently to support growth</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <ServiceFAQ
            title="Frequently Asked Questions About Logistics Consultancy"
            description="Get answers to common questions about our logistics consultancy services"
            faqs={logisticConsultancyFAQs}
          />
        </div>
      </section>

      <section className="py-16 bg-white" id="contact-form">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                Ready to Optimize Your Logistics?
              </h2>
              <p className="text-gray-600 mb-6">
                Contact our consultancy team today to discuss how we can help improve your logistics operations and
                drive business growth.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Free Initial Consultation</h3>
                    <p className="text-gray-600">Schedule a no-obligation discussion with our logistics experts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Tailored Solutions</h3>
                    <p className="text-gray-600">Customized strategies designed for your specific business needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Ongoing Support</h3>
                    <p className="text-gray-600">Continuous guidance and assistance throughout implementation</p>
                  </div>
                </div>
              </div>
            </div>

            <ServiceContactForm service="Logistic Consultancy" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Related Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our other logistics solutions that complement our consultancy services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
