import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | DCF Logistics",
  description: "Learn about our company, mission, and team",
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
