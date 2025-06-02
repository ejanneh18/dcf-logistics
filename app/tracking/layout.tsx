import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipment Tracking | DCF Logistics",
  description: "Track your shipments in real-time with our easy-to-use tracking system",
}

export default function TrackingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
