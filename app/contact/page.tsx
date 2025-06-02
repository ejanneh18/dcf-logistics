import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContactForm } from "@/components/contact-form"
import { MapPin, Phone, Mail, Clock, Truck, MessageSquare, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | DCF Logistics",
  description: "Get in touch with DCF Logistics for all your logistics needs",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/90 to-primary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl mb-8">
              We're here to help with all your logistics needs. Reach out to our team for assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full inline-block">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Location</h3>
              <p className="text-gray-600 mb-4">
                123 Logistics Avenue
                <br />
                Banjul, Gambia
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                  View on Map
                </a>
              </Button>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full inline-block">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Phone</h3>
              <p className="text-gray-600 mb-4">
                Customer Service:
                <br />
                <a href="tel:+2201234567" className="text-primary hover:underline">
                  +220 123 456 789
                </a>
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="tel:+2201234567">Call Now</a>
              </Button>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full inline-block">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Email</h3>
              <p className="text-gray-600 mb-4">
                General Inquiries:
                <br />
                <a href="mailto:info@dcflogistics.com" className="text-primary hover:underline">
                  info@dcflogistics.com
                </a>
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="mailto:info@dcflogistics.com">Email Us</a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Get in Touch</h2>

            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="general">General Inquiry</TabsTrigger>
                <TabsTrigger value="quote">Quote Request</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <ContactForm type="general" />
              </TabsContent>

              <TabsContent value="quote">
                <ContactForm type="quote" />
              </TabsContent>

              <TabsContent value="support">
                <ContactForm type="support" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Offices</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Banjul Headquarters</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-gray-600">
                      123 Logistics Avenue
                      <br />
                      Banjul, Gambia
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-gray-600">+220 123 456 789</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-gray-600">banjul@dcflogistics.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Dakar Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-gray-600">
                      456 Senegal Street
                      <br />
                      Dakar, Senegal
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-gray-600">+221 987 654 321</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-gray-600">dakar@dcflogistics.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Freetown Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-gray-600">
                      789 Leone Road
                      <br />
                      Freetown, Sierra Leone
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-gray-600">+232 345 678 901</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-gray-600">freetown@dcflogistics.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Business Hours</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-medium">Monday - Friday</span>
                    </div>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-medium">Saturday</span>
                    </div>
                    <span>9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-medium">Sunday</span>
                    </div>
                    <span>Closed</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="text-center text-gray-700">
                    <span className="font-medium">Note:</span> Our customer support team is available 24/7 for urgent
                    inquiries.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                    How can I track my shipment?
                  </h3>
                  <p className="text-gray-600">
                    You can track your shipment by entering your tracking number on our tracking page. Alternatively,
                    you can contact our customer service team with your tracking number for assistance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                    How do I request a quote for logistics services?
                  </h3>
                  <p className="text-gray-600">
                    You can request a quote by filling out our quote request form on the website, or by contacting our
                    sales team directly via phone or email. Please provide as much detail as possible about your
                    shipment for an accurate quote.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                    What documents do I need for customs clearance?
                  </h3>
                  <p className="text-gray-600">
                    Required documents typically include a commercial invoice, packing list, bill of lading or airway
                    bill, certificate of origin, and any specific permits or certificates required for your type of
                    goods. Our customs clearance team can provide guidance based on your specific shipment.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                    How long will my shipment take to arrive?
                  </h3>
                  <p className="text-gray-600">
                    Delivery times vary based on the service selected, origin, destination, and customs clearance
                    processes. Air freight typically takes 3-7 days, while sea freight can take 20-45 days depending on
                    the route. For a more accurate estimate, please contact our customer service team.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 text-center">
              <Link href="/support" className="text-primary hover:underline font-medium inline-flex items-center">
                View all FAQs
                <CheckCircle className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Ship with DCF Logistics?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience seamless logistics solutions tailored to your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/quote">
                <Truck className="h-5 w-5 mr-2" />
                Get a Quote
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
              <Link href="/tracking">Track Shipment</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
