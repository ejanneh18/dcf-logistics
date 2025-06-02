"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Headset, MessageSquare, Phone } from "lucide-react"
import Link from "next/link"

export function SupportBanner() {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Headset className="h-6 w-6 text-primary" />
          <span>Need Assistance?</span>
        </CardTitle>
        <CardDescription>Our logistics experts are ready to help you with any questions or concerns.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-4 text-center">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h3 className="text-lg font-semibold">Live Chat Support</h3>
            <p className="text-sm text-muted-foreground">
              Chat with our customer service team in real-time for immediate assistance.
            </p>
            <Button
              className="mt-2"
              variant="outline"
              onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
            >
              Start Chat
            </Button>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-4 text-center">
            <Phone className="h-8 w-8 text-primary" />
            <h3 className="text-lg font-semibold">Call Our Support Team</h3>
            <p className="text-sm text-muted-foreground">
              Speak directly with our logistics specialists for personalized assistance.
            </p>
            <Button className="mt-2" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Available 24/7 for urgent inquiries</p>
        <Button variant="link" asChild>
          <Link href="/contact">View All Support Options</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
