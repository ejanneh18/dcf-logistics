import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tracking Results | DCF Logistics",
  description: "View detailed tracking information for your shipment",
}

export default function TrackingResultsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
