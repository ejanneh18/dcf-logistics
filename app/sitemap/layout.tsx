import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sitemap | DCF Logistics",
  description: "Complete sitemap of our logistics platform",
}

export default function SitemapLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
