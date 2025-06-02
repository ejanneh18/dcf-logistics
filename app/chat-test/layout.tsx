import type { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chat Test | DCF Logistics",
  description: "Test the chat functionality",
}

export default function ChatTestLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
