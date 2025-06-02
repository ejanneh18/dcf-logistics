import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Compare Services | DCF Logistics",
  description: "Compare our logistics services to find the best solution for your needs",
}

export default function CompareLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
