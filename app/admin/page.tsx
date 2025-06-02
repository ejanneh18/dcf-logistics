'use client'

import { DashboardLayout } from '@/components/admin/dashboard-layout'
import { DashboardStats } from '@/components/admin/dashboard-stats'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { trpc } from '@/lib/trpc/client'
import { Package, Users, FileText, Plus } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

function RecentShipments() {
  const { data: shipmentStats, isLoading } = trpc.shipments.getStats.useQuery()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const recentShipments = shipmentStats?.recentShipments || []

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Shipments</CardTitle>
        <Button asChild size="sm">
          <Link href="/admin/shipments">
            <Plus className="mr-2 h-4 w-4" />
            View All
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentShipments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent shipments</p>
          ) : (
            recentShipments.map((shipment) => (
              <div key={shipment.id} className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    {shipment.trackingNumber}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {shipment.origin} → {shipment.destination}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(shipment.createdAt), { addSuffix: true })}
                  </p>
                </div>
                <Badge variant={
                  shipment.status === 'DELIVERED' ? 'default' :
                  shipment.status === 'IN_TRANSIT' ? 'secondary' :
                  shipment.status === 'PENDING' ? 'outline' : 'destructive'
                }>
                  {shipment.status.replace('_', ' ')}
                </Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function RecentInvoices() {
  const { data: invoiceStats, isLoading } = trpc.invoices.getStats.useQuery()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const recentInvoices = invoiceStats?.recentInvoices || []

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Invoices</CardTitle>
        <Button asChild size="sm">
          <Link href="/admin/invoices">
            <Plus className="mr-2 h-4 w-4" />
            View All
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentInvoices.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent invoices</p>
          ) : (
            recentInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    {invoice.invoiceNumber}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {invoice.customer.user.name || invoice.customer.user.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(invoice.createdAt), { addSuffix: true })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    ${invoice.totalAmount.toString()}
                  </p>
                  <Badge variant={
                    invoice.status === 'PAID' ? 'default' :
                    invoice.status === 'SENT' ? 'secondary' :
                    invoice.status === 'OVERDUE' ? 'destructive' : 'outline'
                  }>
                    {invoice.status}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button asChild className="h-20 flex-col">
            <Link href="/admin/shipments/new">
              <Package className="mb-2 h-6 w-6" />
              New Shipment
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-20 flex-col">
            <Link href="/admin/customers/new">
              <Users className="mb-2 h-6 w-6" />
              Add Customer
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-20 flex-col">
            <Link href="/admin/invoices/new">
              <FileText className="mb-2 h-6 w-6" />
              Create Invoice
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-20 flex-col">
            <Link href="/admin/services">
              <Plus className="mb-2 h-6 w-6" />
              Manage Services
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your logistics management dashboard
          </p>
        </div>

        <DashboardStats />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <RecentShipments />
            <RecentInvoices />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
