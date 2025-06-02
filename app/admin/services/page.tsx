'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/admin/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { trpc } from '@/lib/trpc/client'
import { Truck, Plus, Search, Eye, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { ServiceCategory } from '@prisma/client'

export default function AdminServicesPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<ServiceCategory | 'ALL'>('ALL')

  const { data: services, isLoading, refetch } = trpc.services.getAll.useQuery({
    category: categoryFilter !== 'ALL' ? categoryFilter : undefined,
    activeOnly: false,
  })

  const updateServiceMutation = trpc.services.update.useMutation({
    onSuccess: () => {
      refetch()
    }
  })

  const deleteServiceMutation = trpc.services.delete.useMutation({
    onSuccess: () => {
      refetch()
    }
  })

  const handleActiveToggle = async (id: string, isActive: boolean) => {
    try {
      await updateServiceMutation.mutateAsync({ id, isActive })
    } catch (error) {
      console.error('Failed to update service:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteServiceMutation.mutateAsync({ id })
      } catch (error) {
        console.error('Failed to delete service:', error)
      }
    }
  }

  const filteredServices = services?.filter(service => 
    search === '' || 
    service.name.toLowerCase().includes(search.toLowerCase()) ||
    service.description?.toLowerCase().includes(search.toLowerCase())
  ) || []

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Services</h1>
            <p className="text-muted-foreground">
              Manage logistics services and pricing
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/services/new">
              <Plus className="mr-2 h-4 w-4" />
              New Service
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
                    placeholder="Search services..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as ServiceCategory | 'ALL')}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Categories</SelectItem>
                  <SelectItem value="AIR_FREIGHT">Air Freight</SelectItem>
                  <SelectItem value="SEA_FREIGHT">Sea Freight</SelectItem>
                  <SelectItem value="ROAD_TRANSPORT">Road Transport</SelectItem>
                  <SelectItem value="CUSTOMS_CLEARANCE">Customs Clearance</SelectItem>
                  <SelectItem value="WAREHOUSING">Warehousing</SelectItem>
                  <SelectItem value="CONSULTANCY">Consultancy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
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
                      <TableHead>Service Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Base Price</TableHead>
                      <TableHead>Regions</TableHead>
                      <TableHead>Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{service.name}</div>
                            {service.description && (
                              <div className="text-sm text-muted-foreground">
                                {service.description.substring(0, 100)}
                                {service.description.length > 100 && '...'}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {service.category.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          ${service.basePrice.toString()} {service.currency}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {service.regions.slice(0, 3).map((region) => (
                              <Badge key={region} variant="secondary" className="text-xs">
                                {region}
                              </Badge>
                            ))}
                            {service.regions.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{service.regions.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={service.isActive}
                            onCheckedChange={(checked) => handleActiveToggle(service.id, checked)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/services/${service.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/services/${service.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDelete(service.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredServices.length === 0 && (
                  <div className="text-center py-8">
                    <Truck className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No services found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {search ? 'Try adjusting your search criteria.' : 'Get started by creating a new service.'}
                    </p>
                    {!search && (
                      <div className="mt-6">
                        <Button asChild>
                          <Link href="/admin/services/new">
                            <Plus className="mr-2 h-4 w-4" />
                            New Service
                          </Link>
                        </Button>
                      </div>
                    )}
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
