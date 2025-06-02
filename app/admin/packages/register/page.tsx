"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Package,
  MapPin,
  User,
  FileText,
  Calendar,
  Weight,
  DollarSign,
  Save,
  Send,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { trpc } from '@/lib/trpc/client'
import { ShipmentStatus } from '@prisma/client'

interface PackageFormData {
  invoiceId?: string
  customerId: string
  serviceId: string
  originAddress: string
  destinationAddress: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  declaredValue?: number
  currency: string
  description: string
  specialInstructions?: string
  estimatedDeliveryDate?: string
}

export default function RegisterPackagePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState('')

  const [formData, setFormData] = useState<PackageFormData>({
    customerId: '',
    serviceId: '',
    originAddress: 'Banjul, Gambia',
    destinationAddress: '',
    currency: 'USD',
    description: '',
  })

  // Fetch customers for selection
  const { data: customers, isLoading: customersLoading } = trpc.customers.getAll.useQuery()

  // Fetch services for selection
  const { data: services, isLoading: servicesLoading } = trpc.services.getAll.useQuery()

  // Fetch invoices without shipments for linking
  const { data: availableInvoices, isLoading: invoicesLoading } = trpc.invoices.getAll.useQuery({
    page: 1,
    limit: 50,
    status: 'SENT' // Only sent invoices can have packages
  })

  // Generate tracking number
  const { data: nextTrackingNumber } = trpc.shipments.getNextTrackingNumber.useQuery()

  // Create shipment mutation
  const createShipmentMutation = trpc.shipments.create.useMutation({
    onSuccess: (data) => {
      toast.success(`Package ${data.trackingNumber} registered successfully`)
      router.push(`/admin/packages/${data.id}`)
    },
    onError: (error) => {
      toast.error(`Failed to register package: ${error.message}`)
    }
  })

  useEffect(() => {
    if (nextTrackingNumber) {
      setTrackingNumber(nextTrackingNumber)
    }
  }, [nextTrackingNumber])

  const handleInvoiceSelect = (invoiceId: string) => {
    const invoice = availableInvoices?.invoices.find(inv => inv.id === invoiceId)
    if (invoice) {
      setFormData(prev => ({
        ...prev,
        invoiceId,
        customerId: invoice.customerId,
      }))
    }
  }

  const handleCustomerSelect = (customerId: string) => {
    setFormData(prev => ({
      ...prev,
      customerId,
      invoiceId: undefined // Clear invoice selection when customer changes
    }))
  }

  const handleSubmit = async (action: 'register' | 'register_and_start') => {
    try {
      setLoading(true)

      // Validate required fields
      if (!formData.customerId || !formData.serviceId || !formData.destinationAddress || !formData.description) {
        toast.error('Please fill in all required fields')
        return
      }

      // Prepare shipment data
      const shipmentData = {
        customerId: formData.customerId,
        serviceId: formData.serviceId,
        invoiceId: formData.invoiceId,
        originAddress: formData.originAddress,
        destinationAddress: formData.destinationAddress,
        description: formData.description,
        specialInstructions: formData.specialInstructions,
        weight: formData.weight,
        dimensions: formData.dimensions ? {
          length: formData.dimensions.length,
          width: formData.dimensions.width,
          height: formData.dimensions.height,
        } : undefined,
        declaredValue: formData.declaredValue,
        currency: formData.currency,
        estimatedDeliveryDate: formData.estimatedDeliveryDate ? new Date(formData.estimatedDeliveryDate) : undefined,
        status: action === 'register_and_start' ? ShipmentStatus.IN_TRANSIT : ShipmentStatus.PENDING,
      }

      await createShipmentMutation.mutateAsync(shipmentData)
    } catch (error) {
      console.error('Failed to register package:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/packages">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Packages
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Register New Package</h1>
            <p className="text-gray-600">Create a new package for tracking</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleSubmit('register')}
            disabled={loading || createShipmentMutation.isLoading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Register Only
          </Button>
          <Button
            onClick={() => handleSubmit('register_and_start')}
            disabled={loading || createShipmentMutation.isLoading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            Register & Start Shipment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Package Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tracking Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Tracking Information
              </CardTitle>
              <CardDescription>Package identification and tracking details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="trackingNumber">Tracking Number</Label>
                  <Input
                    id="trackingNumber"
                    value={trackingNumber}
                    readOnly
                    className="font-mono bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber">Link to Invoice (Optional)</Label>
                  {invoicesLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Loading invoices...</span>
                    </div>
                  ) : (
                    <Select
                      value={formData.invoiceId || ""}
                      onValueChange={handleInvoiceSelect}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select invoice to link" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableInvoices?.invoices
                          .filter(invoice => !invoice.shipment) // Only show invoices without shipments
                          .map((invoice) => (
                            <SelectItem key={invoice.id} value={invoice.id}>
                              {invoice.invoiceNumber} - {invoice.customer.user.name || invoice.customer.user.email}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
              <CardDescription>Customer details for the package</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerId">Customer *</Label>
                  {customersLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Loading customers...</span>
                    </div>
                  ) : (
                    <Select
                      value={formData.customerId}
                      onValueChange={handleCustomerSelect}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers?.customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.user.name || customer.user.email}
                            {customer.companyName && ` (${customer.companyName})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceId">Service Type *</Label>
                  {servicesLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Loading services...</span>
                    </div>
                  ) : (
                    <Select
                      value={formData.serviceId}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, serviceId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {services?.services
                          .filter(service => service.isActive)
                          .map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name} - {service.basePrice} {service.currency}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              {/* Display selected customer info */}
              {formData.customerId && customers && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Selected Customer:</h4>
                  {(() => {
                    const customer = customers.customers.find(c => c.id === formData.customerId)
                    return customer ? (
                      <div className="text-sm space-y-1">
                        <p><strong>Name:</strong> {customer.user.name || customer.user.email}</p>
                        <p><strong>Email:</strong> {customer.user.email}</p>
                        {customer.companyName && <p><strong>Company:</strong> {customer.companyName}</p>}
                        {customer.phone && <p><strong>Phone:</strong> {customer.phone}</p>}
                      </div>
                    ) : null
                  })()}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Shipment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipment Details
              </CardTitle>
              <CardDescription>Origin, destination, and package specifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="originAddress">Origin</Label>
                  <Input
                    id="originAddress"
                    value={formData.originAddress}
                    onChange={(e) => setFormData(prev => ({ ...prev, originAddress: e.target.value }))}
                    placeholder="Origin location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destinationAddress">Destination *</Label>
                  <Input
                    id="destinationAddress"
                    value={formData.destinationAddress}
                    onChange={(e) => setFormData(prev => ({ ...prev, destinationAddress: e.target.value }))}
                    placeholder="Destination location"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.weight || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: parseFloat(e.target.value) || undefined }))}
                    placeholder="0.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedDeliveryDate">Estimated Delivery</Label>
                  <Input
                    id="estimatedDeliveryDate"
                    type="date"
                    value={formData.estimatedDeliveryDate || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedDeliveryDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Dimensions (cm)</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    type="number"
                    placeholder="Length"
                    value={formData.dimensions?.length || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      dimensions: {
                        ...prev.dimensions,
                        length: parseFloat(e.target.value) || 0,
                        width: prev.dimensions?.width || 0,
                        height: prev.dimensions?.height || 0
                      }
                    }))}
                  />
                  <Input
                    type="number"
                    placeholder="Width"
                    value={formData.dimensions?.width || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      dimensions: {
                        ...prev.dimensions,
                        length: prev.dimensions?.length || 0,
                        width: parseFloat(e.target.value) || 0,
                        height: prev.dimensions?.height || 0
                      }
                    }))}
                  />
                  <Input
                    type="number"
                    placeholder="Height"
                    value={formData.dimensions?.height || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      dimensions: {
                        ...prev.dimensions,
                        length: prev.dimensions?.length || 0,
                        width: prev.dimensions?.width || 0,
                        height: parseFloat(e.target.value) || 0
                      }
                    }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="declaredValue">Declared Value</Label>
                  <Input
                    id="declaredValue"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.declaredValue || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, declaredValue: parseFloat(e.target.value) || undefined }))}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="GMD">GMD (D)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Package Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the package contents..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialInstructions">Special Instructions</Label>
                <Textarea
                  id="specialInstructions"
                  value={formData.specialInstructions || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                  placeholder="Any special handling instructions..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Package Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Package Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Tracking Number</p>
                  <p className="font-mono text-sm bg-gray-50 p-2 rounded">{trackingNumber}</p>
                </div>

                <div>
                  <p className="text-sm font-medium">Customer</p>
                  <p className="text-sm">
                    {formData.customerId && customers ?
                      (() => {
                        const customer = customers.customers.find(c => c.id === formData.customerId)
                        return customer ? (customer.user.name || customer.user.email) : 'Not specified'
                      })() : 'Not specified'
                    }
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium">Service</p>
                  <p className="text-sm">
                    {formData.serviceId && services ?
                      (() => {
                        const service = services.services.find(s => s.id === formData.serviceId)
                        return service ? service.name : 'Not specified'
                      })() : 'Not specified'
                    }
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium">Route</p>
                  <p className="text-sm">{formData.originAddress} → {formData.destinationAddress || 'Not specified'}</p>
                </div>

                {formData.weight && (
                  <div>
                    <p className="text-sm font-medium">Weight</p>
                    <p className="text-sm">{formData.weight} kg</p>
                  </div>
                )}

                {formData.declaredValue && (
                  <div>
                    <p className="text-sm font-medium">Declared Value</p>
                    <p className="text-sm">{formData.declaredValue} {formData.currency}</p>
                  </div>
                )}

                {formData.estimatedDeliveryDate && (
                  <div>
                    <p className="text-sm font-medium">Estimated Delivery</p>
                    <p className="text-sm">{new Date(formData.estimatedDeliveryDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registration Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline">Register Only</Badge>
                <span>Create package record for future shipment</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="default">Register & Start</Badge>
                <span>Create package and mark as in transit</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
