import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FeatureHighlightProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  buttonText?: string
}

export default function FeatureHighlight({
  title,
  description,
  icon,
  href,
  buttonText = "Learn More",
}: FeatureHighlightProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-center mb-4 text-primary">{icon}</div>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-end justify-center pt-4">
        <Button asChild>
          <Link href={href}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
