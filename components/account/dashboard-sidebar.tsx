"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, Clock, FileText, Warehouse, Settings, HelpCircle, LogOut } from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900",
            pathname === item.href ? "bg-gray-100 text-gray-900" : "text-gray-500",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

export default function DashboardSidebar() {
  const sidebarNavItems = [
    {
      title: "Dashboard",
      href: "/account/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Shipments",
      href: "/account/shipments",
      icon: <Package className="h-4 w-4" />,
    },
    {
      title: "Tracking",
      href: "/tracking",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      title: "Documents",
      href: "/account/documents",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Inventory",
      href: "/account/inventory",
      icon: <Warehouse className="h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/account/settings",
      icon: <Settings className="h-4 w-4" />,
    },
    {
      title: "Support",
      href: "/account/support",
      icon: <HelpCircle className="h-4 w-4" />,
    },
  ]

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-6">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-3 text-lg font-semibold">Client Portal</h2>
          <SidebarNav items={sidebarNavItems} />
        </div>
      </div>
      <div className="p-3">
        <Button variant="outline" className="w-full justify-start text-gray-500 hover:text-gray-900">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
