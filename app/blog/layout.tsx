import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | DCF Logistics",
  description: "Latest insights and updates from the logistics industry",
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
