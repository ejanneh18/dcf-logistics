"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  Search,
  Plus,
  Settings,
  User,
  LogOut,
  FileText,
  Package,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AdminHeader() {
  const [notifications] = useState([
    {
      id: 1,
      type: "urgent",
      title: "Overdue Invoice Alert",
      message: "INV-2025-003 is 5 days overdue ($3,120)",
      time: "2 min ago",
      icon: AlertCircle,
      color: "text-red-500",
    },
    {
      id: 2,
      type: "success",
      title: "Payment Received",
      message: "INV-2025-001 payment confirmed ($4,250)",
      time: "1 hour ago",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      id: 3,
      type: "info",
      title: "New Customer Registration",
      message: "TechCorp Industries has registered",
      time: "3 hours ago",
      icon: Users,
      color: "text-blue-500",
    },
    {
      id: 4,
      type: "warning",
      title: "Shipment Delayed",
      message: "SH-2025-0847 delayed due to weather",
      time: "5 hours ago",
      icon: Clock,
      color: "text-amber-500",
    },
  ])

  const unreadCount = notifications.length

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Section - Quick Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button size="sm" asChild>
              <Link href="/admin/invoicing/create">
                <Plus className="mr-2 h-4 w-4" />
                New Invoice
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href="/admin/operations/shipments/create">
                <Package className="mr-2 h-4 w-4" />
                New Shipment
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href="/admin/customers/add">
                <Users className="mr-2 h-4 w-4" />
                Add Customer
              </Link>
            </Button>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices, customers, shipments..."
              className="pl-8 bg-gray-50 border-0 focus:bg-white focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Right Section - Status & User */}
        <div className="flex items-center gap-4">
          {/* System Status Indicators */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">System Online</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-green-500" />
              <span className="text-xs font-medium">$284K</span>
            </div>
            <div className="flex items-center gap-1">
              <Package className="h-3 w-3 text-blue-500" />
              <span className="text-xs font-medium">1,247</span>
            </div>
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <Badge variant="secondary">{unreadCount} new</Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => {
                  const Icon = notification.icon
                  return (
                    <DropdownMenuItem key={notification.id} className="flex items-start gap-3 p-3">
                      <Icon className={`h-4 w-4 mt-0.5 ${notification.color}`} />
                      <div className="flex-1 space-y-1">
                        <div className="text-sm font-medium">{notification.title}</div>
                        <div className="text-xs text-muted-foreground">{notification.message}</div>
                        <div className="text-xs text-muted-foreground">{notification.time}</div>
                      </div>
                    </DropdownMenuItem>
                  )
                })}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/notifications" className="w-full text-center">
                  View All Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/settings">
              <Settings className="h-4 w-4" />
            </Link>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/admin.png" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">admin@dcflogistics.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/">
                  <FileText className="mr-2 h-4 w-4" />
                  View Website
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
