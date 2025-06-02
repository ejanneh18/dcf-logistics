import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | DCF Logistics",
  description: "Get in touch with our logistics experts",
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
