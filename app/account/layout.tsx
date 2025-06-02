import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Account | DCF Logistics",
  description: "Manage your DCF Logistics account",
}

export default function AccountLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen">{children}</div>
}
