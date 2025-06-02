'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { UserRole } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Menu,
  Home,
  Package,
  Users,
  FileText,
  CreditCard,
  Settings,
  BarChart3,
  Truck,
  Building2,
  Mail,
  MessageSquare,
  MapPin
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import AdminBreadcrumbs from './admin-breadcrumbs'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { name: 'Invoicing', href: '/admin/invoicing', icon: FileText },
  { name: 'Package Tracking', href: '/admin/packages', icon: MapPin },
  { name: 'Shipments', href: '/admin/shipments', icon: Package },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Email Management', href: '/admin/newsletter', icon: Mail },
  { name: 'Contact Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { name: 'Quote Requests', href: '/admin/quotes', icon: FileText },
  { name: 'Services', href: '/admin/services', icon: Truck },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

function Sidebar({ className }: { className?: string }) {
  const router = useRouter()

  return (
    <div className={cn('flex h-full w-64 flex-col bg-gray-900', className)}>
      <div className="flex h-16 items-center px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-white" />
          <span className="text-xl font-bold text-white">DCF Admin</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/account/login')
    return null
  }

  // Check if user has admin or staff role
  if (session?.user?.role !== UserRole.ADMIN && session?.user?.role !== UserRole.STAFF) {
    router.push('/')
    return null
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="border-b bg-white">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <MobileSidebar />
              <h1 className="text-xl font-semibold text-gray-900">
                DCF Logistics Admin
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {session?.user?.name || session?.user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/api/auth/signout')}
              >
                Sign Out
              </Button>
            </div>
          </div>

          {/* Breadcrumbs */}
          <div className="px-6 py-3 border-t bg-gray-50">
            <AdminBreadcrumbs />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
