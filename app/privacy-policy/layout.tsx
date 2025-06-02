import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | DCF Logistics",
  description: "Our privacy policy and data protection practices",
}

export default function PrivacyPolicyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
