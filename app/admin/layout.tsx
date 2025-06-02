import type { ReactNode } from "react"
import type { Metadata } from "next"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"
import AdminFooter from "@/components/admin/admin-footer"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Admin Dashboard | DCF Logistics",
  description: "Administrative dashboard for DCF Logistics management",
}

// Check authentication and admin role
async function checkAdminAccess() {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated
  if (!session?.user) {
    return false
  }

  // Check if user has admin/staff role
  const allowedRoles = ['ADMIN', 'MANAGER', 'STAFF']
  if (!allowedRoles.includes(session.user.role)) {
    return false
  }

  return true
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const hasAccess = await checkAdminAccess()

  if (!hasAccess) {
    redirect("/account/login")
  }

  return (
    <div className="flex h-screen bg-gray-50/50 overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
        <AdminFooter />
      </div>
    </div>
  )
}
