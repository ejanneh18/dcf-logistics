"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

const routeLabels: Record<string, string> = {
  'admin': 'Dashboard',
  'dashboard': 'Dashboard',
  'newsletter': 'Newsletter Management',
  'inquiries': 'Contact Inquiries',
  'quotes': 'Quote Requests',
  'invoices': 'Invoices',
  'invoicing': 'Invoicing',
  'packages': 'Package Management',
  'tracking': 'Tracking',
  'customers': 'Customers',
  'users': 'User Management',
  'settings': 'Settings',
  'reports': 'Reports',
  'analytics': 'Analytics',
  'shipments': 'Shipments',
  'payments': 'Payments',
  'email': 'Email Management',
  'templates': 'Templates',
  'queue': 'Email Queue',
  'create': 'Create',
  'edit': 'Edit',
  'view': 'View',
  'new': 'New'
}

export default function AdminBreadcrumbs() {
  const pathname = usePathname()
  
  // Split the pathname and filter out empty segments
  const segments = pathname.split('/').filter(Boolean)
  
  // Remove 'admin' from the beginning if present
  if (segments[0] === 'admin') {
    segments.shift()
  }
  
  // If no segments after admin, we're on the dashboard
  if (segments.length === 0) {
    return (
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <Home className="h-4 w-4" />
        <span className="font-medium text-gray-900">Dashboard</span>
      </nav>
    )
  }
  
  // Build breadcrumb items
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/admin/dashboard' }
  ]
  
  let currentPath = '/admin'
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    
    // Don't make the last item a link
    const isLast = index === segments.length - 1
    
    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath
    })
  })
  
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      <Home className="h-4 w-4" />
      
      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
          
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-gray-900">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
