import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, Mail, Phone } from "lucide-react"
import QuoteRequestForm from "@/components/quote-request-form"

export const metadata: Metadata = {
  title: "Request a Quote | DCF Logistics",
  description: "Request a customized quote for our logistics services",
}

export default function QuotePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Request a Quote</h1>
              <p className="text-xl text-gray-300 mb-8">
                Get a customized quote for your logistics needs. Fill out the form below and our team will provide you
                with competitive pricing tailored to your requirements.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <QuoteRequestForm />
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Why Choose Us</CardTitle>
                    <CardDescription>Benefits of our logistics services</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Competitive Pricing</h3>
                        <p className="text-sm text-gray-600">
                          We offer cost-effective solutions without compromising on quality
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Global Network</h3>
                        <p className="text-sm text-gray-600">
                          Extensive network of partners for seamless logistics worldwide
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Customized Solutions</h3>
                        <p className="text-sm text-gray-600">
                          Tailored logistics services to meet your specific requirements
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Dedicated Support</h3>
                        <p className="text-sm text-gray-600">
                          Personalized customer service throughout your shipment journey
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Reach out to us directly</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <span className="text-gray-600">+220 123 456 789</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="text-gray-600">quotes@dcflogistics.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div className="text-gray-600">
                        <div>Monday - Friday: 8:00 AM - 6:00 PM</div>
                        <div>Saturday: 9:00 AM - 2:00 PM</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-gray-600">For urgent quotes, please call our dedicated quote hotline</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Our Quote Process</h2>
              <p className="text-lg text-gray-600 mb-12">
                We strive to provide accurate and competitive quotes as quickly as possible
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Submit Request</h3>
                  <p className="text-gray-600">
                    Fill out our quote request form with details about your shipment requirements
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Receive Quote</h3>
                  <p className="text-gray-600">
                    Our team will analyze your requirements and provide a detailed quote within 24 hours
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Confirm & Book</h3>
                  <p className="text-gray-600">
                    Review your quote, confirm the details, and book your logistics services with us
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
