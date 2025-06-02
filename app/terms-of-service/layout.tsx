import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | DCF Logistics",
  description: "Terms and conditions for using our logistics services",
}

export default function TermsOfServiceLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
