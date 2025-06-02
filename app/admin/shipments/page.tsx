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
import { Package, Plus, Search, Filter, Eye, Edit } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ShipmentStatus } from '@prisma/client'

export default function AdminShipmentsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ShipmentStatus | 'ALL'>('ALL')
  const [page, setPage] = useState(1)
  const limit = 10

  const { data, isLoading, refetch } = trpc.shipments.getAll.useQuery({
    page,
    limit,
    search: search || undefined,
    status: statusFilter !== 'ALL' ? statusFilter : undefined,
  })

  const updateShipmentMutation = trpc.shipments.update.useMutation({
    onSuccess: () => {
      refetch()
    }
  })

  const handleStatusUpdate = async (id: string, status: ShipmentStatus) => {
    try {
      await updateShipmentMutation.mutateAsync({ id, status })
    } catch (error) {
      console.error('Failed to update shipment status:', error)
    }
  }

  const getStatusBadgeVariant = (status: ShipmentStatus) => {
    switch (status) {
      case 'DELIVERED':
        return 'default'
      case 'IN_TRANSIT':
        return 'secondary'
      case 'PENDING':
        return 'outline'
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
            <h1 className="text-3xl font-bold">Shipments</h1>
            <p className="text-muted-foreground">
              Manage and track all shipments
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/shipments/new">
              <Plus className="mr-2 h-4 w-4" />
              New Shipment
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
                    placeholder="Search by tracking number, origin, or destination..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ShipmentStatus | 'ALL')}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                  <SelectItem value="CUSTOMS_CLEARANCE">Customs Clearance</SelectItem>
                  <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipments</CardTitle>
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
                      <TableHead>Tracking Number</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.shipments?.map((shipment) => (
                      <TableRow key={shipment.id}>
                        <TableCell className="font-medium">
                          {shipment.trackingNumber}
                        </TableCell>
                        <TableCell>
                          {shipment.customer.user.name || shipment.customer.user.email}
                        </TableCell>
                        <TableCell>
                          {shipment.origin} → {shipment.destination}
                        </TableCell>
                        <TableCell>
                          {shipment.service.name}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={shipment.status}
                            onValueChange={(value) => handleStatusUpdate(shipment.id, value as ShipmentStatus)}
                          >
                            <SelectTrigger className="w-40">
                              <Badge variant={getStatusBadgeVariant(shipment.status)}>
                                {shipment.status.replace('_', ' ')}
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PENDING">Pending</SelectItem>
                              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                              <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                              <SelectItem value="CUSTOMS_CLEARANCE">Customs Clearance</SelectItem>
                              <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
                              <SelectItem value="DELIVERED">Delivered</SelectItem>
                              <SelectItem value="CANCELLED">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          {formatDistanceToNow(new Date(shipment.createdAt), { addSuffix: true })}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/shipments/${shipment.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/shipments/${shipment.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
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
                      {data.pagination.total} shipments
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
