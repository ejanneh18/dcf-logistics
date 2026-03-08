import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Phone, Mail, Globe, FileText, Users, Zap, ExternalLink } from "lucide-react"
import { WhatsAppQuickContact } from "@/components/whatsapp-button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Customer Support | DCF Logistics",
  description: "Get help with your logistics needs. 24/7 customer support for DCF Logistics services in The Gambia and West Africa.",
}

export default function SupportPage() {
  const supportChannels = [
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      description: "Get instant help via WhatsApp messaging",
      availability: "Mon-Fri 8AM-6PM GMT",
      responseTime: "< 5 minutes",
      action: "Chat on WhatsApp",
      contact: "+220 395 1020",
      primary: true,
      href: "https://wa.me/2203951020?text=Hello! I need help with DCF Logistics services. Can you assist me?",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our logistics experts",
      availability: "Mon-Fri 8AM-6PM GMT",
      responseTime: "Immediate",
      action: "Call Now",
      contact: "+220 395 1020",
      href: "tel:+2203951020",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions or requests",
      availability: "24/7",
      responseTime: "< 4 hours",
      action: "Send Email",
      contact: "info@dcfagency.com",
      href: "mailto:info@dcfagency.com?subject=Support Request - DCF Logistics",
    },
  ]

  const supportTeams = [
    {
      name: "Customer Service",
      description: "General inquiries and shipping support",
      specialties: ["General Questions", "Service Information", "Quote Requests"],
    },
    {
      name: "Customs & Clearance",
      description: "Expert assistance with customs procedures",
      specialties: ["Customs Clearance", "Documentation", "Import/Export Procedures"],
    },
    {
      name: "Freight Specialists",
      description: "Expert advice on air and sea freight",
      specialties: ["Air Freight", "Sea Freight", "Route Planning"],
    },
    {
      name: "Tracking Support",
      description: "Shipment tracking and delivery updates",
      specialties: ["Shipment Tracking", "Delivery Status", "Location Updates"],
    },
  ]

  const faqs = [
    {
      question: "How can I track my shipment?",
      answer:
        "Visit our tracking page and enter your DCF tracking number (format: DCF123456789) to get real-time updates on your shipment status and location.",
    },
    {
      question: "What are your operating hours?",
      answer:
        "Our customer support is available Monday-Friday 8AM-6PM GMT. Our logistics operations run continuously to ensure your shipments are always moving.",
    },
    {
      question: "How do I get a shipping quote?",
      answer:
        "Use our shipping calculator for instant estimates or fill out our detailed quote request form. You can also contact us directly via WhatsApp or phone.",
    },
    {
      question: "What shipping options do you offer?",
      answer:
        "We offer air freight (express & standard), sea freight (container & bulk), customs clearance, warehousing, and cross-border transportation across West Africa.",
    },
    {
      question: "What documents do I need for shipping?",
      answer:
        "Typically you'll need a commercial invoice, packing list, bill of lading/airway bill, and customs declaration. Our team can help you prepare all necessary documentation.",
    },
    {
      question: "Do you handle customs clearance?",
      answer:
        "Yes, we provide complete customs clearance services including documentation, duty payments, and compliance with all import/export regulations in The Gambia and West Africa.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Support</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help you with all your logistics needs across The Gambia and West Africa. Get expert support through multiple channels.
          </p>
        </div>

        {/* Support Info */}
        <div className="mb-12">
          <Card className="bg-primary text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Need Immediate Help?</h3>
              <p className="mb-4">Our support team is available Monday-Friday 8AM-6PM GMT to assist you with any logistics needs.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  asChild
                >
                  <a href="https://wa.me/2203951020?text=Hello! I need immediate help with DCF Logistics services." target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp Support
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <a href="tel:+2203951020">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Channels */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Methods</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {supportChannels.map((channel, index) => (
              <Card key={index} className={channel.primary ? "border-primary shadow-lg" : ""}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${channel.primary ? "bg-primary text-white" : "bg-gray-100"}`}>
                      <channel.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{channel.title}</CardTitle>
                      {channel.primary && <Badge className="mt-1">Recommended</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{channel.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Availability:</span>
                      <span className="font-medium">{channel.availability}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Response Time:</span>
                      <span className="font-medium">{channel.responseTime}</span>
                    </div>
                    {channel.contact && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Contact:</span>
                        <span className="font-medium">{channel.contact}</span>
                      </div>
                    )}
                  </div>
                  <Button
                    className={`w-full ${channel.primary ? "bg-primary hover:bg-primary/90" : ""}`}
                    variant={channel.primary ? "default" : "outline"}
                    asChild
                  >
                    <a
                      href={channel.href}
                      target={channel.href?.startsWith('http') ? "_blank" : undefined}
                      rel={channel.href?.startsWith('http') ? "noopener noreferrer" : undefined}
                    >
                      <channel.icon className="h-4 w-4 mr-2" />
                      {channel.action}
                      {channel.href?.startsWith('http') && <ExternalLink className="h-3 w-3 ml-2" />}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Support Teams */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Support Teams</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {supportTeams.map((team, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{team.description}</p>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {team.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Additional Resources */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Shipping Guide</h3>
                <p className="text-gray-600 mb-4">Learn about our services and shipping procedures</p>
                <Button variant="outline" asChild>
                  <Link href="/services">
                    View Services
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Track Shipment</h3>
                <p className="text-gray-600 mb-4">Check real-time status of your shipments</p>
                <Button variant="outline" asChild>
                  <Link href="/tracking">
                    Track Now
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Get Quote</h3>
                <p className="text-gray-600 mb-4">Request a personalized shipping quote</p>
                <Button variant="outline" asChild>
                  <Link href="/quote">
                    Request Quote
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 text-center">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Emergency Support</h3>
              <p className="text-red-700 mb-4">
                For urgent shipment issues or emergencies outside business hours
              </p>
              <WhatsAppQuickContact className="mx-auto" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
