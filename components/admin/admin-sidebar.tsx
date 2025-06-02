"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  Truck,
  BarChart3,
  Settings,
  CreditCard,
  Globe,
  UserCheck,
  LogOut,
  ChevronDown,
  DollarSign,
  Mail,
  MessageSquare,
  FileText,
} from "lucide-react"
import { useState } from "react"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Invoicing",
    href: "/admin/invoicing",
    icon: CreditCard,
    badge: "23",
    children: [
      { name: "All Invoices", href: "/admin/invoicing" },
      { name: "Create Invoice", href: "/admin/invoicing/create" },
      { name: "Templates", href: "/admin/invoicing/templates" },
      { name: "Payment Processing", href: "/admin/invoicing/payments" },
      { name: "Reports", href: "/admin/invoicing/reports" },
    ],
  },
  {
    name: "Operations",
    href: "/admin/operations",
    icon: Truck,
    children: [
      { name: "Shipments", href: "/admin/operations/shipments" },
      { name: "Fleet Management", href: "/admin/operations/fleet" },
      { name: "Warehouse", href: "/admin/operations/warehouse" },
      { name: "Routes", href: "/admin/operations/routes" },
    ],
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: Users,
    children: [
      { name: "All Customers", href: "/admin/customers" },
      { name: "Add Customer", href: "/admin/customers/add" },
      { name: "Customer Groups", href: "/admin/customers/groups" },
      { name: "Customer Reports", href: "/admin/customers/reports" },
    ],
  },
  {
    name: "Email Management",
    href: "/admin/email",
    icon: Mail,
    children: [
      { name: "Newsletter", href: "/admin/newsletter" },
      { name: "Contact Inquiries", href: "/admin/inquiries" },
      { name: "Quote Requests", href: "/admin/quotes" },
      { name: "Email Queue", href: "/admin/email/queue" },
      { name: "Email Templates", href: "/admin/email/templates" },
    ],
  },
  {
    name: "Financial",
    href: "/admin/financial",
    icon: DollarSign,
    children: [
      { name: "Revenue Overview", href: "/admin/financial/revenue" },
      { name: "Profit & Loss", href: "/admin/financial/profit-loss" },
      { name: "Cash Flow", href: "/admin/financial/cash-flow" },
      { name: "Accounting", href: "/admin/financial/accounting" },
    ],
  },
  {
    name: "Reports & Analytics",
    href: "/admin/reports",
    icon: BarChart3,
    children: [
      { name: "Financial Reports", href: "/admin/reports/financial" },
      { name: "Operational Reports", href: "/admin/reports/operational" },
      { name: "Customer Analytics", href: "/admin/reports/customers" },
      { name: "Performance Metrics", href: "/admin/reports/performance" },
    ],
  },
  {
    name: "Staff Management",
    href: "/admin/staff",
    icon: UserCheck,
    children: [
      { name: "All Staff", href: "/admin/staff" },
      { name: "Add Staff", href: "/admin/staff/add" },
      { name: "Roles & Permissions", href: "/admin/staff/roles" },
      { name: "Staff Reports", href: "/admin/staff/reports" },
    ],
  },
  {
    name: "System Settings",
    href: "/admin/settings",
    icon: Settings,
    children: [
      { name: "General Settings", href: "/admin/settings/general" },
      { name: "Notifications", href: "/admin/settings/notifications" },
      { name: "Integrations", href: "/admin/settings/integrations" },
      { name: "Security", href: "/admin/settings/security" },
      { name: "Backup & Recovery", href: "/admin/settings/backup" },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r">
      {/* Header */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Truck className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">DCF Admin</span>
        </Link>
      </div>

      {/* User Info */}
      <div className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <UserCheck className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="font-medium text-sm">Admin User</div>
            <div className="text-xs text-muted-foreground">Administrator</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          const isExpanded = expandedItems.includes(item.name)
          const hasChildren = item.children && item.children.length > 0

          return (
            <div key={item.name}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start", isActive && "bg-primary/10 text-primary")}
                onClick={() => {
                  if (hasChildren) {
                    toggleExpanded(item.name)
                  }
                }}
                asChild={!hasChildren}
              >
                {hasChildren ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                      {item.badge && (
                        <Badge variant="destructive" className="ml-2 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "transform rotate-180")} />
                  </div>
                ) : (
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                    {item.badge && (
                      <Badge variant="destructive" className="ml-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )}
              </Button>

              {/* Submenu */}
              {hasChildren && isExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children?.map((child) => {
                    const isChildActive = pathname === child.href
                    return (
                      <Button
                        key={child.href}
                        variant={isChildActive ? "secondary" : "ghost"}
                        size="sm"
                        className={cn("w-full justify-start text-sm", isChildActive && "bg-primary/10 text-primary")}
                        asChild
                      >
                        <Link href={child.href}>{child.name}</Link>
                      </Button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4 space-y-2">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/">
            <Globe className="mr-2 h-4 w-4" />
            View Website
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/account/login">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )
}
