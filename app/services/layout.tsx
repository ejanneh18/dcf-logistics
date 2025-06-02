import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | DCF Logistics",
  description: "Explore our comprehensive logistics and forwarding services",
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
