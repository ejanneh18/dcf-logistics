import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CaseStudiesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Success Stories</div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Case Studies</h2>
          <p className="max-w-[700px] text-gray-500 md:text-lg">
            Real-world examples of how our logistics solutions have transformed businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Case Study 1 */}
          <Card>
            <div className="aspect-video relative overflow-hidden">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Technology company logistics case study"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <span className="text-white font-medium">Technology</span>
              </div>
            </div>
            <CardHeader>
              <CardTitle>Streamlining Global Supply Chain for Tech Giant</CardTitle>
              <CardDescription>How we reduced shipping times by 35% and cut logistics costs by 28%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Shipping Time</span>
                  <span className="text-green-600">-35%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Logistics Costs</span>
                  <span className="text-green-600">-28%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Customer Satisfaction</span>
                  <span className="text-green-600">+42%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/case-studies/tech-giant">
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Case Study 2 */}
          <Card>
            <div className="aspect-video relative overflow-hidden">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Healthcare logistics case study"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <span className="text-white font-medium">Healthcare</span>
              </div>
            </div>
            <CardHeader>
              <CardTitle>Ensuring Timely Delivery of Critical Medical Supplies</CardTitle>
              <CardDescription>
                How we helped a healthcare provider maintain 99.8% on-time delivery during a crisis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">On-Time Delivery</span>
                  <span className="text-green-600">99.8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Inventory Accuracy</span>
                  <span className="text-green-600">+18%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Regulatory Compliance</span>
                  <span className="text-green-600">100%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/case-studies/healthcare-provider">
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Case Study 3 */}
          <Card>
            <div className="aspect-video relative overflow-hidden">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="E-commerce logistics case study"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <span className="text-white font-medium">E-commerce</span>
              </div>
            </div>
            <CardHeader>
              <CardTitle>Scaling Logistics for Fast-Growing Online Retailer</CardTitle>
              <CardDescription>
                How we helped an e-commerce business expand to 12 new markets while reducing delivery times
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Market Expansion</span>
                  <span className="text-green-600">+12 countries</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Delivery Time</span>
                  <span className="text-green-600">-45%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Return Rate</span>
                  <span className="text-green-600">-22%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/case-studies/ecommerce-retailer">
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
