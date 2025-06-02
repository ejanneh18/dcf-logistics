"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href?: string
}

export default function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CardDescription className="text-gray-600 mb-6">{description}</CardDescription>
        {href && (
          <Button variant="outline" className="group-hover:bg-primary group-hover:text-white transition-colors" asChild>
            <Link href={href}>
              Learn More
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
