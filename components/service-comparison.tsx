"use client"

import { useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

// Service comparison data
const serviceFeatures = {
  "freight-forwarding": {
    name: "Freight Forwarding",
    description: "End-to-end logistics coordination and management of your cargo shipments.",
    features: [
      { name: "Carrier Selection", included: true },
      { name: "Route Optimization", included: true },
      { name: "Documentation Handling", included: true },
      { name: "Customs Clearance", included: true },
      { name: "Cargo Insurance", included: true },
      { name: "Warehousing", included: false },
      { name: "Last Mile Delivery", included: false },
      { name: "Real-time Tracking", included: true },
      { name: "Specialized Cargo Handling", included: true },
      { name: "Consolidation Services", included: true },
    ],
    bestFor: ["International shipments", "Complex logistics chains", "Multiple transport modes"],
    startingPrice: "Contact for Quote",
  },
  "customs-brokerage": {
    name: "Customs Brokerage",
    description: "Expert handling of customs documentation and regulatory compliance for your imports and exports.",
    features: [
      { name: "Carrier Selection", included: false },
      { name: "Route Optimization", included: false },
      { name: "Documentation Handling", included: true },
      { name: "Customs Clearance", included: true },
      { name: "Cargo Insurance", included: false },
      { name: "Warehousing", included: false },
      { name: "Last Mile Delivery", included: false },
      { name: "Real-time Tracking", included: false },
      { name: "Specialized Cargo Handling", included: false },
      { name: "Consolidation Services", included: false },
    ],
    bestFor: ["Import/export businesses", "Regulatory compliance", "Duty optimization"],
    startingPrice: "Contact for Quote",
  },
  warehousing: {
    name: "Warehousing",
    description: "Secure storage and inventory management solutions for your goods.",
    features: [
      { name: "Carrier Selection", included: false },
      { name: "Route Optimization", included: false },
      { name: "Documentation Handling", included: false },
      { name: "Customs Clearance", included: false },
      { name: "Cargo Insurance", included: true },
      { name: "Warehousing", included: true },
      { name: "Last Mile Delivery", included: true },
      { name: "Real-time Tracking", included: true },
      { name: "Specialized Cargo Handling", included: true },
      { name: "Consolidation Services", included: true },
    ],
    bestFor: ["Inventory management", "Distribution centers", "Order fulfillment"],
    startingPrice: "Contact for Quote",
  },
  "air-freight": {
    name: "Air Freight",
    description: "Fast and reliable air transportation for time-sensitive shipments.",
    features: [
      { name: "Carrier Selection", included: true },
      { name: "Route Optimization", included: true },
      { name: "Documentation Handling", included: true },
      { name: "Customs Clearance", included: false },
      { name: "Cargo Insurance", included: true },
      { name: "Warehousing", included: false },
      { name: "Last Mile Delivery", included: false },
      { name: "Real-time Tracking", included: true },
      { name: "Specialized Cargo Handling", included: true },
      { name: "Consolidation Services", included: true },
    ],
    bestFor: ["Urgent shipments", "High-value goods", "Perishable items"],
    startingPrice: "Contact for Quote",
  },
  "sea-freight": {
    name: "Sea Freight",
    description: "Cost-effective ocean transportation for large volume shipments.",
    features: [
      { name: "Carrier Selection", included: true },
      { name: "Route Optimization", included: true },
      { name: "Documentation Handling", included: true },
      { name: "Customs Clearance", included: false },
      { name: "Cargo Insurance", included: true },
      { name: "Warehousing", included: false },
      { name: "Last Mile Delivery", included: false },
      { name: "Real-time Tracking", included: true },
      { name: "Specialized Cargo Handling", included: true },
      { name: "Consolidation Services", included: true },
    ],
    bestFor: ["Large shipments", "Cost-sensitive cargo", "Non-urgent deliveries"],
    startingPrice: "Contact for Quote",
  },
  "road-freight": {
    name: "Road Freight",
    description: "Flexible and reliable ground transportation for domestic and regional shipments.",
    features: [
      { name: "Carrier Selection", included: true },
      { name: "Route Optimization", included: true },
      { name: "Documentation Handling", included: true },
      { name: "Customs Clearance", included: false },
      { name: "Cargo Insurance", included: true },
      { name: "Warehousing", included: false },
      { name: "Last Mile Delivery", included: true },
      { name: "Real-time Tracking", included: true },
      { name: "Specialized Cargo Handling", included: true },
      { name: "Consolidation Services", included: true },
    ],
    bestFor: ["Domestic shipments", "Door-to-door delivery", "Flexible scheduling"],
    startingPrice: "Contact for Quote",
  },
}

export default function ServiceComparison() {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "freight-forwarding",
    "customs-brokerage",
    "warehousing",
  ])
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((id) => id !== serviceId))
      }
    } else {
      setSelectedServices([...selectedServices, serviceId])
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Service Comparison</h2>
          <p className="text-muted-foreground">
            Compare our logistics services to find the right solution for your needs
          </p>
        </div>

        <div className="flex space-x-2">
          <Button variant={viewMode === "table" ? "default" : "outline"} size="sm" onClick={() => setViewMode("table")}>
            Table View
          </Button>
          <Button variant={viewMode === "cards" ? "default" : "outline"} size="sm" onClick={() => setViewMode("cards")}>
            Card View
          </Button>
        </div>
      </div>

      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-medium mb-2">Select Services to Compare:</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(serviceFeatures).map(([id, service]) => (
            <div key={id} className="flex items-center space-x-2">
              <Checkbox
                id={`service-${id}`}
                checked={selectedServices.includes(id)}
                onCheckedChange={() => toggleService(id)}
              />
              <label
                htmlFor={`service-${id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {service.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {viewMode === "table" ? (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableCaption>Comparison of our logistics services</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Feature</TableHead>
                {selectedServices.map((serviceId) => (
                  <TableHead key={serviceId} className="text-center">
                    {serviceFeatures[serviceId as keyof typeof serviceFeatures].name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Description</TableCell>
                {selectedServices.map((serviceId) => (
                  <TableCell key={serviceId}>
                    {serviceFeatures[serviceId as keyof typeof serviceFeatures].description}
                  </TableCell>
                ))}
              </TableRow>

              {serviceFeatures["freight-forwarding"].features.map((feature, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{feature.name}</TableCell>
                  {selectedServices.map((serviceId) => {
                    const serviceFeature = serviceFeatures[serviceId as keyof typeof serviceFeatures].features[index]
                    return (
                      <TableCell key={serviceId} className="text-center">
                        {serviceFeature.included ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </span>
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}

              <TableRow>
                <TableCell className="font-medium">Best For</TableCell>
                {selectedServices.map((serviceId) => (
                  <TableCell key={serviceId}>
                    <div className="flex flex-wrap gap-1">
                      {serviceFeatures[serviceId as keyof typeof serviceFeatures].bestFor.map((item, i) => (
                        <Badge key={i} variant="outline">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Starting Price</TableCell>
                {selectedServices.map((serviceId) => (
                  <TableCell key={serviceId} className="font-bold">
                    {serviceFeatures[serviceId as keyof typeof serviceFeatures].startingPrice}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Action</TableCell>
                {selectedServices.map((serviceId) => (
                  <TableCell key={serviceId}>
                    <Button asChild size="sm">
                      <Link href={`/services/${serviceId}`}>Learn More</Link>
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedServices.map((serviceId) => {
            const service = serviceFeatures[serviceId as keyof typeof serviceFeatures]
            return (
              <Card key={serviceId} className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features
                      .filter((f) => f.included)
                      .slice(0, 5)
                      .map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4 text-primary mt-1"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>{feature.name}</span>
                        </li>
                      ))}
                  </ul>

                  <h4 className="font-semibold mt-4 mb-2">Best For:</h4>
                  <div className="flex flex-wrap gap-1">
                    {service.bestFor.map((item, i) => (
                      <Badge key={i} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4">
                    <span className="text-sm text-muted-foreground">Starting from</span>
                    <div className="text-2xl font-bold">{service.startingPrice}</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/services/${serviceId}`}>Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
