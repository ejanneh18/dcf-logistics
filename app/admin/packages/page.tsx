"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Plus,
  Search,
  Filter,
  MapPin,
  Package,
  Truck,
  Plane,
  Eye,
  Edit,
  Clock,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import { trpc } from '@/lib/trpc/client'
import { ShipmentStatus } from '@prisma/client'
import { toast } from 'sonner'

export default function PackagesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<ShipmentStatus | 'ALL'>('ALL')
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch shipments (packages) with filters
  const { data: shipmentsData, isLoading, refetch } = trpc.shipments.getAll.useQuery({
    page: currentPage,
    limit: 10,
    search: searchTerm || undefined,
    status: statusFilter !== 'ALL' ? statusFilter : undefined,
  })

  // Fetch shipment statistics
  const { data: stats, isLoading: statsLoading } = trpc.shipments.getStats.useQuery()

  // Update shipment status mutation
  const updateShipmentMutation = trpc.shipments.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Package status updated successfully")
      refetch()
    },
    onError: (error) => {
      toast.error(`Failed to update package status: ${error.message}`)
    }
  })

  const handleStatusUpdate = async (id: string, status: ShipmentStatus) => {
    try {
      await updateShipmentMutation.mutateAsync({ id, status })
    } catch (error) {
      console.error('Failed to update shipment status:', error)
    }
  }

  const getStatusColor = (status: ShipmentStatus) => {
    switch (status) {
      case 'DELIVERED': return 'bg-green-100 text-green-800'
      case 'IN_TRANSIT': return 'bg-blue-100 text-blue-800'
      case 'OUT_FOR_DELIVERY': return 'bg-purple-100 text-purple-800'
      case 'PENDING': return 'bg-gray-100 text-gray-800'
      case 'CANCELLED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: ShipmentStatus) => {
    switch (status) {
      case 'DELIVERED': return <CheckCircle className="h-4 w-4" />
      case 'IN_TRANSIT': return <Truck className="h-4 w-4" />
      case 'OUT_FOR_DELIVERY': return <MapPin className="h-4 w-4" />
      case 'PENDING': return <Package className="h-4 w-4" />
      case 'CANCELLED': return <AlertTriangle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Package Tracking</h1>
          <p className="text-gray-600">Monitor and manage all package shipments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </Button>
          <Button asChild>
            <Link href="/admin/packages/register">
              <Plus className="h-4 w-4 mr-2" />
              Register Package
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <div className="text-2xl font-bold">{stats?.totalShipments || 0}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <div className="text-2xl font-bold text-gray-600">{stats?.pendingShipments || 0}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <div className="text-2xl font-bold text-blue-600">{stats?.inTransitShipments || 0}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <div className="text-2xl font-bold text-green-600">{stats?.deliveredShipments || 0}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <div className="text-2xl font-bold text-purple-600">{stats?.shipmentsThisMonth || 0}</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Package List */}
      <Card>
        <CardHeader>
          <CardTitle>All Packages</CardTitle>
          <CardDescription>Track and manage package shipments</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by tracking number, customer, or invoice..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ShipmentStatus | 'ALL')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Package Table */}
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading packages...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipmentsData?.shipments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No packages found
                    </TableCell>
                  </TableRow>
                ) : (
                  shipmentsData?.shipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell>
                        <div>
                          <div className="font-mono font-medium">{shipment.trackingNumber}</div>
                          {shipment.invoice && (
                            <div className="text-sm text-gray-500">Invoice: {shipment.invoice.invoiceNumber}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{shipment.customer.user.name || shipment.customer.user.email}</div>
                        {shipment.customer.companyName && (
                          <div className="text-sm text-gray-500">{shipment.customer.companyName}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {shipment.originAddress}
                          </div>
                          <div className="text-gray-500 mt-1">→ {shipment.destinationAddress}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`flex items-center gap-1 w-fit ${getStatusColor(shipment.status)}`}>
                          {getStatusIcon(shipment.status)}
                          {shipment.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {shipment.service.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatDate(shipment.createdAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/packages/${shipment.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          {shipment.status !== 'DELIVERED' && shipment.status !== 'CANCELLED' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const nextStatus = shipment.status === 'PENDING' ? 'IN_TRANSIT' :
                                                 shipment.status === 'IN_TRANSIT' ? 'OUT_FOR_DELIVERY' : 'DELIVERED'
                                handleStatusUpdate(shipment.id, nextStatus)
                              }}
                              disabled={updateShipmentMutation.isLoading}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}

          {shipmentsData?.shipments.length === 0 && !isLoading && (
            <div className="text-center py-8 text-gray-500">
              No packages found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
