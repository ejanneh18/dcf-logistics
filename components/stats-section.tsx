import { Card, CardContent } from "@/components/ui/card"
import { Globe, Package, Truck, Users } from "lucide-react"

export function StatsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">25K+</div>
              <p className="text-sm text-gray-500">Shipments Delivered</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">500+</div>
              <p className="text-sm text-gray-500">Satisfied Clients</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">30+</div>
              <p className="text-sm text-gray-500">Countries Served</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">12</div>
              <p className="text-sm text-gray-500">Years of Excellence</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
