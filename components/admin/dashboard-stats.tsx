'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Users, FileText, DollarSign, TrendingUp, Clock } from 'lucide-react'
import { trpc } from '@/lib/trpc/client'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  trend?: {
    value: number
    isPositive: boolean
  }
}

function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={`text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="mr-1 h-3 w-3 inline" />
            {trend.isPositive ? '+' : ''}{trend.value}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  const { data: shipmentStats, isLoading: shipmentStatsLoading } = trpc.shipments.getStats.useQuery()
  const { data: serviceStats, isLoading: serviceStatsLoading } = trpc.services.getStats.useQuery()
  const { data: invoiceStats, isLoading: invoiceStatsLoading } = trpc.invoices.getStats.useQuery()

  if (shipmentStatsLoading || serviceStatsLoading || invoiceStatsLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="space-y-0 pb-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const stats = [
    {
      title: 'Total Shipments',
      value: shipmentStats?.totalShipments || 0,
      icon: Package,
    },
    {
      title: 'Pending Shipments',
      value: shipmentStats?.pendingShipments || 0,
      icon: Clock,
    },
    {
      title: 'Active Services',
      value: serviceStats?.activeServices || 0,
      icon: Users,
    },
    {
      title: 'Total Invoices',
      value: invoiceStats?.totalInvoices || 0,
      icon: FileText,
    },
    {
      title: 'Total Revenue',
      value: `$${(invoiceStats?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
    },
    {
      title: 'Pending Payments',
      value: `$${(invoiceStats?.pendingPayments || 0).toLocaleString()}`,
      icon: TrendingUp,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  )
}
