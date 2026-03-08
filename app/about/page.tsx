import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Globe,
  Users,
  Award,
  Clock,
  TrendingUp,
  CheckCircle2,
  MapPin,
  Ship,
  Truck,
  Plane,
  Target,
  Eye,
  Heart,
  Star,
  Shield,
  Phone,
  Mail,
  Linkedin
} from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | DCF Logistics",
  description: "Learn about DCF Logistics, The Gambia's premier digital clearing and forwarding agency transforming logistics across West Africa since 2010.",
}

const stats = [
  { label: "Years of Experience", value: "14+", icon: Clock },
  { label: "Successful Shipments", value: "50K+", icon: Ship },
  { label: "Happy Clients", value: "2,500+", icon: Users },
  { label: "Countries Served", value: "25+", icon: Globe },
]

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in every shipment, ensuring your cargo reaches its destination safely and on time."
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "Our proven track record and robust systems ensure consistent, dependable logistics solutions."
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description: "Your success is our priority. We build lasting relationships through exceptional service."
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description: "We embrace technology and innovation to provide cutting-edge logistics solutions."
  }
]

const milestones = [
  { year: "2010", title: "Company Founded", description: "DCF Logistics established in Banjul, The Gambia" },
  { year: "2013", title: "Regional Expansion", description: "Extended services across West Africa" },
  { year: "2016", title: "Digital Transformation", description: "Launched online tracking and digital documentation" },
  { year: "2019", title: "ISO Certification", description: "Achieved ISO 9001:2015 quality management certification" },
  { year: "2022", title: "Technology Leadership", description: "Implemented AI-powered logistics optimization" },
  { year: "2024", title: "Sustainable Future", description: "Launched green logistics and carbon-neutral shipping options" }
]

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Image
                src="/images/logo_dcf.png"
                alt="DCF Logistics"
                width={250}
                height={100}
                className="mx-auto brightness-0 invert"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              About DCF Logistics
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto leading-relaxed">
              The Gambia's pioneering digital clearing and forwarding agency, transforming logistics across West Africa since 2010.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-primary">
                Our Services
              </Button>
              <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Gambian Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Born from the vision of transforming The Gambia's logistics landscape, DCF Logistics emerged in 2010
                  as a response to the growing need for efficient, reliable, and technologically advanced clearing and
                  forwarding services in West Africa.
                </p>
                <p>
                  Founded by a team of Gambian logistics professionals who understood the unique challenges of operating
                  in our region, we set out to bridge the gap between traditional cargo handling and modern digital
                  logistics solutions. Our deep understanding of local customs procedures, regional trade dynamics, and
                  the specific needs of businesses operating in The Gambia gives us a distinct advantage.
                </p>
                <p>
                  Today, we stand as The Gambia's most trusted logistics partner, facilitating seamless trade
                  connections between local businesses and global markets. Our commitment to excellence has made us the
                  preferred choice for companies seeking reliable logistics solutions in West Africa.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <img
                src="/images/container_img.png"
                alt="Banjul Port - Gateway to West Africa"
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900">Banjul Port - Our Home Base</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <img
                src="/images/vis_mis.png"
                alt="Modern container operations"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                    <p className="text-gray-600">
                      To empower Gambian businesses and international partners with world-class logistics solutions,
                      leveraging our local expertise and digital innovation to facilitate seamless trade across borders.
                      We are committed to being the bridge that connects The Gambia to global markets.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                    <p className="text-gray-600">
                      To be West Africa's leading digital logistics hub, recognized for our innovation, reliability, and
                      contribution to regional economic growth. We envision a future where The Gambia serves as a
                      strategic logistics gateway, connecting Africa to the world through our advanced clearing and
                      forwarding services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose DCF */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose DCF Logistics?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our unique position as a Gambian-owned company gives us unparalleled advantages in serving your logistics
              needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full inline-block">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
              <p className="text-gray-600">
                Deep understanding of Gambian customs procedures, local regulations, and regional trade dynamics that
                only comes from being truly local.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full inline-block">
                <Ship className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Port Connectivity</h3>
              <p className="text-gray-600">
                Strategic location at Banjul Port provides direct access to shipping lines and enables faster cargo
                processing and clearance.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full inline-block">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Regional Network</h3>
              <p className="text-gray-600">
                Extensive partnerships across ECOWAS countries, facilitating seamless cross-border logistics throughout
                West Africa.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Journey</Badge>
            <h2 className="text-4xl font-bold mb-6">Key Milestones</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to regional leadership, discover the key moments that shaped DCF Logistics.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20"></div>

              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start mb-12 last:mb-0">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                    {milestone.year}
                  </div>
                  <div className="ml-8 flex-1">
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* CEO */}
            <Card className="overflow-hidden">
              <div className="relative h-64">
                <img
                  src="/images/Musa.jpg"
                  alt="CEO"
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">Musa Camara</h3>
                <p className="text-primary font-medium mb-4">Chief Executive Officer & Founder</p>
                <p className="text-gray-600 mb-4">
                  A visionary leader with over 15 years in West African logistics. Musa founded DCF with the mission
                  to transform The Gambia's logistics landscape through technology and innovation.
                </p>
                <div className="flex space-x-3">
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <Users className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>
            

            {/* COO */}
            <Card className="overflow-hidden">
              <div className="relative h-64">
                <img
                  src="/images/MariamJawara.jpeg"
                  alt="Mariama Jawara - Chief Operating Officer"
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">Mariama Jawara</h3>
                <p className="text-primary font-medium mb-4">Chief Operations Officer</p>
                <p className="text-gray-600 mb-4">
                  Mariama Jawara brings extensive experience in port operations and customs procedures. Her deep knowledge of
                  Gambian trade regulations ensures smooth operations for all our clients.
                </p>
                <div className="flex space-x-3">
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <Users className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* CTO */}
            {/* <Card className="overflow-hidden">
              <div className="relative h-64">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400&q=80"
                  alt="Ousman Jatta - Chief Technology Officer"
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">Ousman Darboe</h3>
                <p className="text-primary font-medium mb-4">Chief Technology Officer</p>
                <p className="text-gray-600 mb-4">
                  Ousman leads our digital transformation initiatives, developing cutting-edge logistics technology
                  solutions that keep DCF at the forefront of innovation in West Africa.
                </p>
                <div className="flex space-x-3">
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <Users className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full inline-block">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every shipment, every clearance, and every customer interaction, setting the
                highest standards in Gambian logistics.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full inline-block">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Integrity</h3>
              <p className="text-gray-600">
                Built on trust and transparency, we conduct business with the highest ethical standards, earning the
                confidence of our clients and partners.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full inline-block">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-600">
                Continuously pioneering new technologies and processes to enhance logistics efficiency and customer
                experience in West Africa.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full inline-block">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Reliability</h3>
              <p className="text-gray-600">
                Dependable service delivery that businesses can count on, ensuring your cargo reaches its destination
                safely and on time, every time.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Gambian Excellence?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust DCF Logistics for their West African logistics needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
              <Link href="/quote">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
