"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Truck, FileCheck, Warehouse, Ship, Scale } from "lucide-react"

interface ServiceCardProps {
  name: string
  description: string
  href: string
  icon: string
  features: string[]
}

const iconMap = {
  plane: Plane,
  truck: Truck,
  fileCheck: FileCheck,
  warehouse: Warehouse,
  ship: Ship,
  scale: Scale,
}

export function ServiceCard({ name, description, href, icon, features }: ServiceCardProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Plane
  return (
    <Link href={href} className="block group">
      <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {name}
            </CardTitle>
          </div>
          <CardDescription className="text-gray-600 leading-relaxed">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-gray-700 mb-2">Key Features:</h4>
            <div className="grid grid-cols-2 gap-1">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 text-primary font-medium text-sm group-hover:text-primary/80 transition-colors">
            Learn more →
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
