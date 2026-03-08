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

const teamMembers = [
  {
    name: "Amadou Jallow",
    position: "Chief Executive Officer",
    image: "/images/team/ceo.jpg",
    bio: "15+ years in logistics and supply chain management"
  },
  {
    name: "Fatou Ceesay",
    position: "Operations Director",
    image: "/images/team/operations.jpg",
    bio: "Expert in customs clearance and freight forwarding"
  },
  {
    name: "Omar Touray",
    position: "Technology Director",
    image: "/images/team/tech.jpg",
    bio: "Leading digital transformation in logistics"
  }
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
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4">Our Story</Badge>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Transforming West African Logistics</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Born from the vision of transforming The Gambia's logistics landscape, DCF Logistics emerged in 2010 
                  as a response to the growing need for efficient, reliable, and technologically advanced clearing and 
                  forwarding services in West Africa.
                </p>
                <p>
                  What started as a small clearing agency in Banjul has grown into the region's most trusted logistics 
                  partner, serving over 2,500 clients across 25 countries with cutting-edge technology and unmatched expertise.
                </p>
                <p>
                  Today, we continue to lead the digital transformation of logistics in West Africa, combining traditional 
                  expertise with innovative solutions to deliver exceptional results for our clients.
                </p>
              </div>
              <div className="mt-8">
                <Button size="lg" className="mr-4">Learn More</Button>
                <Button size="lg" variant="outline">Our Services</Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col justify-center items-center">
                    <Ship className="h-12 w-12 text-primary mb-4" />
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div className="text-sm text-gray-600 text-center">Shipments</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col justify-center items-center">
                    <Globe className="h-12 w-12 text-primary mb-4" />
                    <div className="text-2xl font-bold text-primary">25+</div>
                    <div className="text-sm text-gray-600 text-center">Countries</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col justify-center items-center">
                    <Users className="h-12 w-12 text-primary mb-4" />
                    <div className="text-2xl font-bold text-primary">2.5K+</div>
                    <div className="text-sm text-gray-600 text-center">Clients</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col justify-center items-center">
                    <Award className="h-12 w-12 text-primary mb-4" />
                    <div className="text-2xl font-bold text-primary">14+</div>
                    <div className="text-sm text-gray-600 text-center">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Foundation</Badge>
            <h2 className="text-4xl font-bold mb-6">Mission, Vision & Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core principles guide everything we do, from the smallest shipment to the largest logistics operation.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  To provide exceptional logistics solutions that connect West Africa to the world, 
                  enabling businesses to thrive through reliable, efficient, and innovative services.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  To be West Africa's leading digital logistics platform, setting the standard for 
                  excellence, innovation, and sustainable growth in the industry.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Excellence, reliability, customer focus, and innovation drive our commitment to 
                  delivering outstanding results for every client, every time.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <Icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              )
            })}
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

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Logistics?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-100">
            Join thousands of satisfied clients who trust DCF Logistics for their shipping and logistics needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-primary">
              Get Started Today
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
