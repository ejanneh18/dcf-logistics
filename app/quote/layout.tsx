import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Request a Quote | DCF Logistics",
  description: "Request a customized quote for our logistics services",
}

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
