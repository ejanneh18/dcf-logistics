import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Eye, Edit, Copy, FileText, Download, Upload, Star, Clock } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Invoice Templates | DCF Logistics Admin",
  description: "Manage invoice templates for different services and customers",
}

const templates = [
  {
    id: 1,
    name: "Air Freight Standard",
    description: "Standard template for air freight services",
    category: "Air Freight",
    lastUsed: "2 days ago",
    timesUsed: 47,
    isDefault: true,
    services: ["Air Freight", "Customs Clearance", "Documentation"],
  },
  {
    id: 2,
    name: "Ground Transportation",
    description: "Template for ground transportation services",
    category: "Ground Transport",
    lastUsed: "1 day ago",
    timesUsed: 23,
    isDefault: false,
    services: ["Ground Transport", "Loading/Unloading", "Insurance"],
  },
  {
    id: 3,
    name: "Ocean Freight Premium",
    description: "Premium template for ocean freight with additional services",
    category: "Ocean Freight",
    lastUsed: "5 days ago",
    timesUsed: 15,
    isDefault: false,
    services: ["Ocean Freight", "Port Handling", "Customs", "Warehousing"],
  },
  {
    id: 4,
    name: "Customs & Compliance",
    description: "Specialized template for customs and regulatory services",
    category: "Customs",
    lastUsed: "3 days ago",
    timesUsed: 31,
    isDefault: false,
    services: ["Customs Clearance", "Documentation", "Compliance Check"],
  },
  {
    id: 5,
    name: "Warehousing Services",
    description: "Template for warehousing and storage services",
    category: "Warehousing",
    lastUsed: "1 week ago",
    timesUsed: 12,
    isDefault: false,
    services: ["Storage", "Handling", "Inventory Management"],
  },
]

export default function InvoiceTemplatesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoice Templates</h1>
          <p className="text-muted-foreground">Create and manage reusable invoice templates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Template
          </Button>
          <Button asChild>
            <Link href="/admin/invoicing/templates/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Link>
          </Button>
        </div>
      </div>

      {/* Template Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Used</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Air Freight</div>
            <p className="text-xs text-muted-foreground">47 times used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recently Used</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Ground Transport</div>
            <p className="text-xs text-muted-foreground">1 day ago</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Default Templates</CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Air Freight Standard</p>
          </CardContent>
        </Card>
      </div>

      {/* Template Management */}
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="air-freight">Air Freight</TabsTrigger>
            <TabsTrigger value="ground">Ground Transport</TabsTrigger>
            <TabsTrigger value="ocean">Ocean Freight</TabsTrigger>
            <TabsTrigger value="customs">Customs</TabsTrigger>
            <TabsTrigger value="warehousing">Warehousing</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search templates..." className="pl-8 w-64" />
            </div>
          </div>
        </div>

        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.id} className="relative">
                {template.isDefault && (
                  <Badge className="absolute top-2 right-2 bg-primary">
                    <Star className="mr-1 h-3 w-3" />
                    Default
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {template.name}
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Category:</span>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Times Used:</span>
                    <span className="font-medium">{template.timesUsed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Used:</span>
                    <span className="font-medium">{template.lastUsed}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Included Services:</div>
                    <div className="flex flex-wrap gap-1">
                      {template.services.map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/admin/invoicing/create?template=${template.id}`}>Use Template</Link>
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Category-specific tabs would filter the templates */}
        <TabsContent value="air-freight">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates
              .filter((t) => t.category === "Air Freight")
              .map((template) => (
                <Card key={template.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {template.name}
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" asChild>
                      <Link href={`/admin/invoicing/create?template=${template.id}`}>Use Template</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-md">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-medium">Create New Template</div>
                <div className="text-sm text-muted-foreground">Build a custom template</div>
              </div>
            </div>
            <Button className="w-full mt-4" asChild>
              <Link href="/admin/invoicing/templates/create">Create Template</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-md">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="font-medium">Import Template</div>
                <div className="text-sm text-muted-foreground">Upload existing template</div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Import Template
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-md">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="font-medium">Export Templates</div>
                <div className="text-sm text-muted-foreground">Download all templates</div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Export All
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-amber-100 rounded-md">
                <Star className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <div className="font-medium">Template Analytics</div>
                <div className="text-sm text-muted-foreground">Usage statistics</div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/admin/invoicing/templates/analytics">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
