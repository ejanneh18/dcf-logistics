import type { ReactNode } from "react"
import DashboardSidebar from "@/components/account/dashboard-sidebar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 shrink-0">
        <DashboardSidebar />
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  )
}
