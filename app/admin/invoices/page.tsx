'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/admin/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { trpc } from '@/lib/trpc/client'
import { FileText, Plus, Search, Eye, Edit, Download } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { InvoiceStatus } from '@prisma/client'

export default function AdminInvoicesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'ALL'>('ALL')
  const [page, setPage] = useState(1)
  const limit = 10

  const { data, isLoading, refetch } = trpc.invoices.getAll.useQuery({
    page,
    limit,
    search: search || undefined,
    status: statusFilter !== 'ALL' ? statusFilter : undefined,
  })

  const updateInvoiceMutation = trpc.invoices.update.useMutation({
    onSuccess: () => {
      refetch()
    }
  })

  const handleStatusUpdate = async (id: string, status: InvoiceStatus) => {
    try {
      await updateInvoiceMutation.mutateAsync({ id, status })
    } catch (error) {
      console.error('Failed to update invoice status:', error)
    }
  }

  const getStatusBadgeVariant = (status: InvoiceStatus) => {
    switch (status) {
      case 'PAID':
        return 'default'
      case 'SENT':
        return 'secondary'
      case 'DRAFT':
        return 'outline'
      case 'OVERDUE':
        return 'destructive'
      case 'CANCELLED':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Invoices</h1>
            <p className="text-muted-foreground">
              Manage customer invoices and payments
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/invoices/new">
              <Plus className="mr-2 h-4 w-4" />
              New Invoice
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by invoice number or customer..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as InvoiceStatus | 'ALL')}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Statuses</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="SENT">Sent</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="OVERDUE">Overdue</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice Number</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.invoices?.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">
                          {invoice.invoiceNumber}
                        </TableCell>
                        <TableCell>
                          {invoice.customer.user.name || invoice.customer.user.email}
                        </TableCell>
                        <TableCell>
                          ${invoice.totalAmount.toString()} {invoice.currency}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={invoice.status}
                            onValueChange={(value) => handleStatusUpdate(invoice.id, value as InvoiceStatus)}
                          >
                            <SelectTrigger className="w-32">
                              <Badge variant={getStatusBadgeVariant(invoice.status)}>
                                {invoice.status}
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="DRAFT">Draft</SelectItem>
                              <SelectItem value="SENT">Sent</SelectItem>
                              <SelectItem value="PAID">Paid</SelectItem>
                              <SelectItem value="OVERDUE">Overdue</SelectItem>
                              <SelectItem value="CANCELLED">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          {new Date(invoice.issueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/invoices/${invoice.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/invoices/${invoice.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {data?.pagination && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Showing {((data.pagination.page - 1) * data.pagination.limit) + 1} to{' '}
                      {Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)} of{' '}
                      {data.pagination.total} invoices
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(page - 1)}
                        disabled={page <= 1}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(page + 1)}
                        disabled={page >= data.pagination.pages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
