import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, User, Tag, ArrowRight, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog | DCF Logistics",
  description: "Latest news, insights, and updates from DCF Logistics",
}

const blogPosts = [
  {
    id: 1,
    title: "The Future of Logistics in Africa: Trends and Opportunities",
    excerpt:
      "Explore the emerging trends and opportunities in the African logistics sector and how businesses can leverage them for growth.",
    date: "May 15, 2023",
    author: "John Doe",
    category: "Industry Insights",
    image: "/placeholder.svg?height=400&width=600",
    slug: "future-of-logistics-africa",
  },
  {
    id: 2,
    title: "Navigating Cross-Border Logistics: Challenges and Solutions",
    excerpt:
      "Understand the common challenges in cross-border logistics and discover effective solutions to streamline your operations.",
    date: "April 28, 2023",
    author: "Jane Smith",
    category: "Cross-Border Logistics",
    image: "/placeholder.svg?height=400&width=600",
    slug: "navigating-cross-border-logistics",
  },
  {
    id: 3,
    title: "Sustainable Logistics: Reducing Your Carbon Footprint",
    excerpt:
      "Learn how logistics companies are implementing sustainable practices to reduce environmental impact while maintaining efficiency.",
    date: "April 10, 2023",
    author: "Michael Johnson",
    category: "Sustainability",
    image: "/placeholder.svg?height=400&width=600",
    slug: "sustainable-logistics-carbon-footprint",
  },
  {
    id: 4,
    title: "Digital Transformation in Logistics: Embracing Technology",
    excerpt:
      "Discover how digital technologies are revolutionizing the logistics industry and how businesses can adapt to stay competitive.",
    date: "March 22, 2023",
    author: "Sarah Williams",
    category: "Technology",
    image: "/placeholder.svg?height=400&width=600",
    slug: "digital-transformation-logistics",
  },
  {
    id: 5,
    title: "Customs Compliance: Navigating Regulatory Changes",
    excerpt:
      "Stay informed about the latest regulatory changes affecting customs compliance and strategies to ensure smooth clearance.",
    date: "March 5, 2023",
    author: "Robert Chen",
    category: "Regulatory Compliance",
    image: "/placeholder.svg?height=400&width=600",
    slug: "customs-compliance-regulatory-changes",
  },
  {
    id: 6,
    title: "Optimizing Warehouse Management for Efficiency",
    excerpt:
      "Explore best practices in warehouse management to improve efficiency, reduce costs, and enhance customer satisfaction.",
    date: "February 18, 2023",
    author: "Emily Davis",
    category: "Warehousing",
    image: "/placeholder.svg?height=400&width=600",
    slug: "optimizing-warehouse-management",
  },
]

const categories = [
  "Industry Insights",
  "Cross-Border Logistics",
  "Sustainability",
  "Technology",
  "Regulatory Compliance",
  "Warehousing",
  "Air Freight",
  "Customs Clearance",
  "Supply Chain",
]

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/90 to-primary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">DCF Logistics Blog</h1>
            <p className="text-xl mb-8">
              Insights, news, and expert perspectives on logistics and supply chain management.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="group">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-1 text-primary" />
                        <span className="text-sm text-gray-500">{post.category}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button variant="link" className="p-0 h-auto" asChild>
                        <Link href={`/blog/${post.slug}`} className="flex items-center text-primary">
                          Read More <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Search */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Search</h3>
                  <div className="flex gap-2">
                    <Input placeholder="Search articles..." />
                    <Button size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category}>
                        <Link
                          href={`/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-gray-600 hover:text-primary flex items-center"
                        >
                          <ArrowRight className="h-4 w-4 mr-2" />
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((post) => (
                      <div key={post.id} className="flex gap-3">
                        <div className="relative h-16 w-16 shrink-0">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <Link href={`/blog/${post.slug}`} className="font-medium hover:text-primary line-clamp-2">
                            {post.title}
                          </Link>
                          <p className="text-sm text-gray-500">{post.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Subscribe to Our Newsletter</h3>
                  <p className="text-gray-600 mb-4">
                    Stay updated with the latest insights and news in logistics and supply chain management.
                  </p>
                  <form className="space-y-4">
                    <Input placeholder="Your email address" type="email" required />
                    <Button className="w-full">Subscribe</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
