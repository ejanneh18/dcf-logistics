import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, MapPin } from "lucide-react"

interface TrackingData {
  trackingNumber: string
  status: string
  estimatedDelivery: string
  origin: string
  destination: string
  service: string
  weight: string
  pieces: string
  reference: string
  currentLocation: string
  lastUpdated: string
  events: any[]
  nextSteps: any[]
}

interface TrackingDetailsProps {
  trackingData: TrackingData
}

export default function TrackingDetails({ trackingData }: TrackingDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="mr-2 h-5 w-5 text-primary" />
          Shipment Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">Service Type</div>
            <div className="font-medium">{trackingData.service}</div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-start">
              <MapPin className="h-4 w-4 text-primary mt-1 mr-2" />
              <div>
                <div className="text-sm text-gray-500">From</div>
                <div className="font-medium">{trackingData.origin}</div>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-4 w-4 text-primary mt-1 mr-2" />
              <div>
                <div className="text-sm text-gray-500">To</div>
                <div className="font-medium">{trackingData.destination}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Weight</div>
              <div className="font-medium">{trackingData.weight}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Pieces</div>
              <div className="font-medium">{trackingData.pieces}</div>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-1">Reference Number</div>
            <div className="font-medium">{trackingData.reference}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
