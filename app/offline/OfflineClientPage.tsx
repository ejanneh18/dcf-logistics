"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi, WifiOff, RefreshCw, Home, Truck, Calculator, Phone } from "lucide-react"

export default function OfflineClientPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <WifiOff className="h-24 w-24 text-gray-400" />
              <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-2">
                <WifiOff className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900">You're Offline</h1>
          <p className="text-xl text-gray-600">
            No internet connection detected. Don't worry, some features are still available!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Cached Tracking
              </CardTitle>
              <CardDescription>View recently accessed tracking information</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/tracking">View Tracking</Link>
              </Button>
            </CardContent>
          </Card>



          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Cached Pages
              </CardTitle>
              <CardDescription>Browse previously visited pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/services">Services</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/about">About Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Info
              </CardTitle>
              <CardDescription>Get in touch when you're back online</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>📞 +220 395 1020</p>
                <p>✉️ info@dcfagency.com</p>
                <p>📍 IC PLAZA Cooperative Junction Westfield Serekunda</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Button onClick={() => window.location.reload()} className="flex items-center gap-2" size="lg">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Wifi className="h-4 w-4" />
            <span>Connection will be restored automatically when available</span>
          </div>
        </div>
      </div>
    </div>
  )
}
