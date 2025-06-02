"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  Package,
  Users,
  FileText,
  BarChart3,
  Settings,
  Truck,
  UserCheck,
  CreditCard,
  TrendingUp,
  Activity,
  Mail,
  MessageSquare,
  MapPin,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { trpc } from '@/lib/trpc/client'

export default function AdminDashboardPage() {
  // Fetch dashboard statistics
  const { data: invoiceStats, isLoading: invoiceStatsLoading } = trpc.invoices.getStats.useQuery()
  const { data: shipmentStats, isLoading: shipmentStatsLoading } = trpc.shipments.getStats.useQuery()
  const { data: customerStats, isLoading: customerStatsLoading } = trpc.customers.getStats.useQuery()
  const { data: newsletterStats, isLoading: newsletterStatsLoading } = trpc.newsletter.getStats.useQuery()
  const { data: inquiryStats, isLoading: inquiryStatsLoading } = trpc.inquiries.getStats.useQuery()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Control Center</h1>
          <p className="text-muted-foreground">Complete management system for DCF Logistics operations</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/invoicing">
              <CreditCard className="mr-2 h-4 w-4" />
              Invoicing System
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {invoiceStatsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{formatCurrency(invoiceStats?.totalRevenue || 0)}</div>
                <p className="text-xs text-muted-foreground">Total revenue from invoices</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {shipmentStatsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{shipmentStats?.inTransitShipments || 0}</div>
                <p className="text-xs text-muted-foreground">Currently in transit</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {customerStatsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{customerStats?.totalCustomers || 0}</div>
                <p className="text-xs text-muted-foreground">+{customerStats?.newCustomersThisMonth || 0} this month</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {invoiceStatsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{invoiceStats?.pendingPayments || 0}</div>
                <p className="text-xs text-muted-foreground text-red-600">
                  {(invoiceStats?.pendingPayments || 0) > 0 ? 'Requires attention' : 'All up to date'}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Invoicing & Billing
                </CardTitle>
                <CardDescription>Complete invoice management system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {invoiceStatsLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Invoices</span>
                      <Badge variant="default">{invoiceStats?.totalInvoices || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Paid Invoices</span>
                      <Badge variant="default">{invoiceStats?.paidInvoices || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Overdue Invoices</span>
                      <Badge variant="destructive">{invoiceStats?.overdueInvoices || 0}</Badge>
                    </div>
                  </>
                )}
                <Button className="w-full" asChild>
                  <Link href="/admin/invoicing">Access Invoicing</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Operations Control
                </CardTitle>
                <CardDescription>Manage shipments and logistics operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {shipmentStatsLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Shipments</span>
                      <Badge variant="default">{shipmentStats?.totalShipments || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">In Transit</span>
                      <Badge variant="default">{shipmentStats?.inTransitShipments || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Delivered</span>
                      <Badge variant="default">{shipmentStats?.deliveredShipments || 0}</Badge>
                    </div>
                  </>
                )}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admin/packages">Manage Packages</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Customer Management
                </CardTitle>
                <CardDescription>Customer accounts and relationship management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {customerStatsLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Customers</span>
                      <Badge variant="default">{customerStats?.totalCustomers || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Customers</span>
                      <Badge variant="default">{customerStats?.activeCustomers || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">New This Month</span>
                      <Badge variant="default">{customerStats?.newCustomersThisMonth || 0}</Badge>
                    </div>
                  </>
                )}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admin/customers">Manage Customers</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Management
                </CardTitle>
                <CardDescription>Newsletter and communication system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {newsletterStatsLoading || inquiryStatsLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Newsletter Subscribers</span>
                      <Badge variant="default">{newsletterStats?.activeSubscribers || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pending Inquiries</span>
                      <Badge variant="destructive">{inquiryStats?.pendingInquiries || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Resolved Inquiries</span>
                      <Badge variant="default">{inquiryStats?.resolvedInquiries || 0}</Badge>
                    </div>
                  </>
                )}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admin/newsletter">Manage Email</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Button className="h-20 flex flex-col gap-2" asChild>
              <Link href="/admin/invoicing/create">
                <FileText className="h-6 w-6" />
                Create Invoice
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2" asChild>
              <Link href="/admin/packages/register">
                <MapPin className="h-6 w-6" />
                Register Package
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2" asChild>
              <Link href="/admin/packages">
                <Package className="h-6 w-6" />
                View Packages
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2" asChild>
              <Link href="/admin/customers/create">
                <UserCheck className="h-6 w-6" />
                Add Customer
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2" asChild>
              <Link href="/admin/inquiries">
                <MessageSquare className="h-6 w-6" />
                View Inquiries
              </Link>
            </Button>
          </div>
        </TabsContent>

        {/* Operations Tab */}
        <TabsContent value="operations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Management</CardTitle>
                <CardDescription>Monitor and manage vehicle fleet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Vehicles</span>
                    <span className="text-sm font-bold">127</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Active Routes</span>
                    <span className="text-sm font-bold text-green-600">47</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Maintenance Due</span>
                    <span className="text-sm font-bold text-amber-600">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Fuel Efficiency</span>
                    <span className="text-sm font-bold text-green-600">12.5 MPG</span>
                  </div>
                </div>
                <Button className="w-full mt-4" asChild>
                  <Link href="/admin/fleet">Manage Fleet</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Warehouse Operations</CardTitle>
                <CardDescription>Inventory and warehouse management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Storage Capacity</span>
                    <span className="text-sm font-bold">78% Used</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Pending Pickups</span>
                    <span className="text-sm font-bold text-amber-600">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Items Processed Today</span>
                    <span className="text-sm font-bold text-green-600">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Accuracy Rate</span>
                    <span className="text-sm font-bold text-green-600">99.8%</span>
                  </div>
                </div>
                <Button className="w-full mt-4" asChild>
                  <Link href="/admin/warehouse">Manage Warehouse</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Revenue Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">This Month</span>
                    <span className="font-bold">$284,739</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Last Month</span>
                    <span className="font-bold">$253,421</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Growth</span>
                    <span className="font-bold text-green-600">+12.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Invoice Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Paid</span>
                    <Badge variant="default">156</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pending</span>
                    <Badge variant="outline">23</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Overdue</span>
                    <Badge variant="destructive">7</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Profit Margins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Air Freight</span>
                    <span className="font-bold text-green-600">18.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Ground Transport</span>
                    <span className="font-bold text-green-600">22.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Customs</span>
                    <span className="font-bold text-green-600">35.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Controls</CardTitle>
              <CardDescription>Access financial management tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-4">
                <Button asChild>
                  <Link href="/admin/invoicing">Invoice Management</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin/payments">Payment Processing</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin/accounting">Accounting</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin/financial-reports">Financial Reports</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Analytics</CardTitle>
                <CardDescription>Customer base insights and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Active Customers</span>
                    <span className="text-sm font-bold">8,942</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">New This Month</span>
                    <span className="text-sm font-bold text-green-600">247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Customer Retention</span>
                    <span className="text-sm font-bold text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Order Value</span>
                    <span className="text-sm font-bold">$2,847</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Management Tools</CardTitle>
                <CardDescription>Manage customer accounts and relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <Button asChild>
                    <Link href="/admin/customers">View All Customers</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/admin/customers/add">Add New Customer</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/admin/customers/import">Import Customers</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/admin/customers/reports">Customer Reports</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription>Revenue, profit, and financial analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/reports/revenue">Revenue Report</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/reports/profit-loss">P&L Statement</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/reports/cash-flow">Cash Flow</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operational Reports</CardTitle>
                <CardDescription>Shipments, performance, and operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/reports/shipments">Shipment Analytics</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/reports/performance">Performance Metrics</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/reports/fleet">Fleet Utilization</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Reports</CardTitle>
                <CardDescription>Customer analytics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/reports/customer-analytics">Customer Analytics</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/reports/satisfaction">Satisfaction Survey</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/reports/retention">Retention Analysis</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Configuration
                </CardTitle>
                <CardDescription>Configure system settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/settings/general">General Settings</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/settings/notifications">Notifications</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/settings/integrations">Integrations</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/admin/settings/security">Security Settings</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  System Status
                </CardTitle>
                <CardDescription>Monitor system health and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">System Uptime</span>
                    <Badge variant="default">99.99%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Database Status</span>
                    <Badge variant="default">Healthy</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">API Response Time</span>
                    <Badge variant="default">45ms</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Storage Usage</span>
                    <Badge variant="outline">67%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
