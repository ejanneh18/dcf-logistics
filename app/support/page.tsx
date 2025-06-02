import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SupportBanner } from "@/components/chat/support-banner"
import { MessageCircle, Phone, Mail, Globe, FileText, Users, Zap } from "lucide-react"

export default function SupportPage() {
  const supportChannels = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      responseTime: "< 2 minutes",
      action: "Start Chat",
      primary: true,
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our logistics experts",
      availability: "24/7",
      responseTime: "Immediate",
      action: "Call Now",
      contact: "+1 (555) 123-4567",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions or requests",
      availability: "24/7",
      responseTime: "< 4 hours",
      action: "Send Email",
      contact: "support@globallogistics.com",
    },
  ]

  const supportTeams = [
    {
      name: "Customer Service",
      description: "General inquiries and account support",
      specialties: ["Account Management", "General Questions", "Service Information"],
    },
    {
      name: "Technical Support",
      description: "Platform and tracking system assistance",
      specialties: ["Tracking Issues", "Platform Navigation", "Technical Problems"],
    },
    {
      name: "Logistics Specialists",
      description: "Expert advice on shipping and logistics",
      specialties: ["Route Optimization", "Customs Clearance", "Freight Solutions"],
    },
    {
      name: "Emergency Response",
      description: "Urgent shipment and crisis management",
      specialties: ["Emergency Shipments", "Crisis Management", "Priority Support"],
    },
  ]

  const faqs = [
    {
      question: "How can I track my shipment?",
      answer:
        "Use our tracking system with your tracking number, or log into your account dashboard for real-time updates.",
    },
    {
      question: "What are your operating hours?",
      answer:
        "Our support team is available 24/7. Our logistics operations run continuously to ensure your shipments are always moving.",
    },
    {
      question: "How do I get a shipping quote?",
      answer:
        "Use our online quote calculator or request a custom quote through our quote request form for personalized pricing.",
    },
    {
      question: "What shipping options do you offer?",
      answer:
        "We offer air freight, sea freight, road transport, express delivery, and specialized logistics solutions.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Support</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help you with all your logistics needs. Get instant support through multiple channels.
          </p>
        </div>

        {/* Support Banner */}
        <div className="mb-12">
          <SupportBanner />
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
                  >
                    {channel.action}
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
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
                <p className="text-gray-600 mb-4">Access our comprehensive guides and documentation</p>
                <Button variant="outline">View Docs</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Service Status</h3>
                <p className="text-gray-600 mb-4">Check real-time status of our services</p>
                <Button variant="outline">Check Status</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Feature Requests</h3>
                <p className="text-gray-600 mb-4">Suggest new features or improvements</p>
                <Button variant="outline">Submit Request</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
