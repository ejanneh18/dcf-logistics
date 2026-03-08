import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimonials</div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Clients Say</h2>
          <p className="max-w-[700px] text-gray-500 md:text-lg">
            Hear from businesses that have transformed their logistics operations with our services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <Quote className="h-8 w-8 text-primary/20" />
              </div>
              <blockquote className="text-gray-700 mb-4">
                "DCF Logistics has transformed our supply chain operations. Their customs clearance expertise and
                efficient freight forwarding have reduced our shipping times by 40% and saved us thousands in logistics
                costs."
              </blockquote>
              <div className="flex items-center gap-4 mt-6">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="Client portrait"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">Comium GM</p>
                  {/* <p className="text-sm text-gray-500">Operations Director, TechGlobal Inc.</p> */}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial 2 */}
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <Quote className="h-8 w-8 text-primary/20" />
              </div>
              <blockquote className="text-gray-700 mb-4">
                "The regulatory compliance team at DCF Logistics helped us navigate complex import regulations for our
                medical supplies. Their expertise was invaluable in ensuring our products reached markets without
                delays."
              </blockquote>
              <div className="flex items-center gap-4 mt-6">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="Client portrait"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">Customer 2</p>
                  <p className="text-sm text-gray-500">CEO, MediSupply International</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial 3 */}
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < 4 ? "fill-primary text-primary" : "text-gray-300"}`} />
                    ))}
                  </div>
                </div>
                <Quote className="h-8 w-8 text-primary/20" />
              </div>
              <blockquote className="text-gray-700 mb-4">
                "As a small e-commerce business, we needed affordable and reliable shipping solutions. DCF Logistics
                provided personalized service that helped us scale our operations across West Africa without breaking
                the bank."
              </blockquote>
              <div className="flex items-center gap-4 mt-6">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="Client portrait"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">Aminata Diallo</p>
                  <p className="text-sm text-gray-500">Founder, AfriStyle Boutique</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
