"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Send,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  Filter,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { trpc } from "@/lib/trpc/client"
import { InvoiceStatus } from "@prisma/client"
import { toast } from "sonner"

export default function InvoicingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | "ALL">("ALL")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all")

  // Fetch invoice statistics
  const { data: stats, isLoading: statsLoading } = trpc.invoices.getStats.useQuery()

  // Fetch invoices with filters
  const { data: invoicesData, isLoading: invoicesLoading, refetch } = trpc.invoices.getAll.useQuery({
    page: currentPage,
    limit: 10,
    search: searchTerm || undefined,
    status: statusFilter !== "ALL" ? statusFilter : undefined,
  })

  // Update invoice status mutation
  const updateInvoiceMutation = trpc.invoices.update.useMutation({
    onSuccess: () => {
      toast.success("Invoice updated successfully")
      refetch()
    },
    onError: (error) => {
      toast.error(`Failed to update invoice: ${error.message}`)
    }
  })

  const handleStatusUpdate = async (id: string, status: InvoiceStatus) => {
    try {
      await updateInvoiceMutation.mutateAsync({ id, status })
    } catch (error) {
      console.error('Failed to update invoice status:', error)
    }
  }

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case 'PAID':
        return <Badge variant="default" className="bg-green-100 text-green-800">Paid</Badge>
      case 'SENT':
        return <Badge variant="outline">Pending</Badge>
      case 'OVERDUE':
        return <Badge variant="destructive">Overdue</Badge>
      case 'DRAFT':
        return <Badge variant="secondary">Draft</Badge>
      case 'CANCELLED':
        return <Badge variant="secondary">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date))
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoicing System</h1>
          <p className="text-muted-foreground">Complete invoice management and billing control</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/invoicing/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/invoicing/templates">
              <FileText className="mr-2 h-4 w-4" />
              Templates
            </Link>
          </Button>
        </div>
      </div>

      {/* Invoice Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats?.totalInvoices || 0}</div>
                <p className="text-xs text-muted-foreground">Total invoices created</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{formatCurrency(stats?.pendingPayments || 0)}</div>
                <p className="text-xs text-muted-foreground">Pending payments</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Invoices</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold text-red-600">{stats?.overdueInvoices || 0}</div>
                <p className="text-xs text-muted-foreground">Require attention</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(stats?.totalRevenue || 0)}</div>
                <p className="text-xs text-muted-foreground">{stats?.paidInvoices || 0} paid invoices</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Invoice Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setStatusFilter("ALL")}>All Invoices</TabsTrigger>
            <TabsTrigger value="pending" onClick={() => setStatusFilter("SENT")}>Pending</TabsTrigger>
            <TabsTrigger value="overdue" onClick={() => setStatusFilter("OVERDUE")}>Overdue</TabsTrigger>
            <TabsTrigger value="paid" onClick={() => setStatusFilter("PAID")}>Paid</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
                className="pl-8 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as InvoiceStatus | "ALL")}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="SENT">Sent</SelectItem>
                <SelectItem value="PAID">Paid</SelectItem>
                <SelectItem value="OVERDUE">Overdue</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* All Invoices Tab */}
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Invoices</CardTitle>
              <CardDescription>Complete list of all invoices in the system</CardDescription>
            </CardHeader>
            <CardContent>
              {invoicesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="ml-2">Loading invoices...</span>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoicesData?.invoices.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No invoices found
                        </TableCell>
                      </TableRow>
                    ) : (
                      invoicesData?.invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                          <TableCell>{invoice.customer.user.name || invoice.customer.user.email}</TableCell>
                          <TableCell>{formatCurrency(invoice.totalAmount.toNumber(), invoice.currency)}</TableCell>
                          <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                          <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                          <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/admin/invoicing/${invoice.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              {invoice.status !== 'PAID' && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleStatusUpdate(invoice.id, 'SENT')}
                                  disabled={updateInvoiceMutation.isLoading}
                                >
                                  <Send className="h-4 w-4" />
                                </Button>
                              )}
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs will show the same data but filtered by status */}
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Invoices</CardTitle>
              <CardDescription>Invoices awaiting payment</CardDescription>
            </CardHeader>
            <CardContent>
              {invoicesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="ml-2">Loading invoices...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {invoicesData?.invoices.filter(invoice => invoice.status === 'SENT').length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No pending invoices found
                    </div>
                  ) : (
                    invoicesData?.invoices
                      .filter(invoice => invoice.status === 'SENT')
                      .map((invoice) => (
                        <div key={invoice.id} className="flex justify-between items-center p-4 border rounded-lg">
                          <div>
                            <div className="font-medium">{invoice.invoiceNumber} - {invoice.customer.user.name}</div>
                            <div className="text-sm text-muted-foreground">Due: {formatDate(invoice.dueDate)}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{formatCurrency(invoice.totalAmount.toNumber(), invoice.currency)}</div>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" variant="outline">
                                <Send className="mr-1 h-3 w-3" />
                                Send Reminder
                              </Button>
                              <Button size="sm" asChild>
                                <Link href={`/admin/invoicing/${invoice.id}`}>
                                  <Eye className="mr-1 h-3 w-3" />
                                  View
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Overdue Invoices</CardTitle>
              <CardDescription>Invoices that require immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              {invoicesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="ml-2">Loading invoices...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {invoicesData?.invoices.filter(invoice => invoice.status === 'OVERDUE').length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No overdue invoices found
                    </div>
                  ) : (
                    invoicesData?.invoices
                      .filter(invoice => invoice.status === 'OVERDUE')
                      .map((invoice) => (
                        <div key={invoice.id} className="flex justify-between items-center p-4 border border-red-200 rounded-lg bg-red-50">
                          <div>
                            <div className="font-medium">{invoice.invoiceNumber} - {invoice.customer.user.name}</div>
                            <div className="text-sm text-red-600 font-medium">
                              Overdue since {formatDate(invoice.dueDate)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-red-600">{formatCurrency(invoice.totalAmount.toNumber(), invoice.currency)}</div>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" variant="destructive">
                                <Send className="mr-1 h-3 w-3" />
                                Final Notice
                              </Button>
                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/admin/invoicing/${invoice.id}`}>
                                  <Eye className="mr-1 h-3 w-3" />
                                  View
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paid">
          <Card>
            <CardHeader>
              <CardTitle>Paid Invoices</CardTitle>
              <CardDescription>Successfully completed transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {invoicesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="ml-2">Loading invoices...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {invoicesData?.invoices.filter(invoice => invoice.status === 'PAID').length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No paid invoices found
                    </div>
                  ) : (
                    invoicesData?.invoices
                      .filter(invoice => invoice.status === 'PAID')
                      .map((invoice) => (
                        <div key={invoice.id} className="flex justify-between items-center p-4 border border-green-200 rounded-lg bg-green-50">
                          <div>
                            <div className="font-medium">{invoice.invoiceNumber} - {invoice.customer.user.name}</div>
                            <div className="text-sm text-green-600 font-medium">
                              Paid on {invoice.paidDate ? formatDate(invoice.paidDate) : 'Unknown'}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">{formatCurrency(invoice.totalAmount.toNumber(), invoice.currency)}</div>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" variant="outline">
                                <Download className="mr-1 h-3 w-3" />
                                Receipt
                              </Button>
                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/admin/invoicing/${invoice.id}`}>
                                  <Eye className="mr-1 h-3 w-3" />
                                  View
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-md">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-medium">Create New Invoice</div>
                <div className="text-sm text-muted-foreground">Generate a new invoice</div>
              </div>
            </div>
            <Button className="w-full mt-4" asChild>
              <Link href="/admin/invoicing/create">Create Invoice</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-md">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="font-medium">Invoice Templates</div>
                <div className="text-sm text-muted-foreground">Manage templates</div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/admin/invoicing/templates">Manage Templates</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-md">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="font-medium">Export Reports</div>
                <div className="text-sm text-muted-foreground">Download invoice reports</div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/admin/invoicing/reports">Export Reports</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-amber-100 rounded-md">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <div className="font-medium">Payment Reminders</div>
                <div className="text-sm text-muted-foreground">Automated reminders</div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/admin/invoicing/reminders">Setup Reminders</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
