"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, Save, Send, Eye, Loader2, ArrowLeft } from "lucide-react"
import { trpc } from "@/lib/trpc/client"
import { toast } from "sonner"
import Link from "next/link"
import { InvoiceStatus } from "@prisma/client"

interface InvoiceItem {
  id: string
  serviceId?: string
  description: string
  quantity: number
  rate: number
  amount: number
}

interface InvoiceFormData {
  customerId: string
  issueDate: string
  dueDate: string
  currency: string
  notes: string
  terms: string
  items: InvoiceItem[]
  subtotal: number
  taxRate: number
  taxAmount: number
  totalAmount: number
}

export default function CreateInvoicePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [invoiceNumber, setInvoiceNumber] = useState("")

  const [formData, setFormData] = useState<InvoiceFormData>({
    customerId: "",
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: "",
    currency: "USD",
    notes: "",
    terms: "Payment is due within 30 days of invoice date. Late payments may incur additional charges.",
    items: [
      {
        id: "1",
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0
      }
    ],
    subtotal: 0,
    taxRate: 10,
    taxAmount: 0,
    totalAmount: 0
  })

  // Fetch customers for selection
  const { data: customers, isLoading: customersLoading } = trpc.customers.getAll.useQuery()

  // Fetch services for selection
  const { data: services, isLoading: servicesLoading } = trpc.services.getAll.useQuery()

  // Generate invoice number
  const { data: nextInvoiceNumber } = trpc.invoices.getNextInvoiceNumber.useQuery()

  // Create invoice mutation
  const createInvoiceMutation = trpc.invoices.create.useMutation({
    onSuccess: (data) => {
      toast.success(`Invoice ${data.invoiceNumber} created successfully`)
      router.push(`/admin/invoicing/${data.id}`)
    },
    onError: (error) => {
      toast.error(`Failed to create invoice: ${error.message}`)
    }
  })

  useEffect(() => {
    if (nextInvoiceNumber) {
      setInvoiceNumber(nextInvoiceNumber)
    }
  }, [nextInvoiceNumber])

  // Calculate totals when items change
  useEffect(() => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.amount, 0)
    const taxAmount = (subtotal * formData.taxRate) / 100
    const totalAmount = subtotal + taxAmount

    setFormData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      totalAmount
    }))
  }, [formData.items, formData.taxRate])

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0
    }
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
  }

  const removeItem = (id: string) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id)
      }))
    }
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate
          }
          return updatedItem
        }
        return item
      })
    }))
  }

  const handleSubmit = async (status: InvoiceStatus) => {
    try {
      setLoading(true)

      // Validate required fields
      if (!formData.customerId || !formData.dueDate) {
        toast.error('Please fill in all required fields')
        return
      }

      if (formData.items.some(item => !item.description || item.rate <= 0)) {
        toast.error('Please complete all invoice items')
        return
      }

      // Prepare invoice data
      const invoiceData = {
        customerId: formData.customerId,
        issueDate: new Date(formData.issueDate),
        dueDate: new Date(formData.dueDate),
        currency: formData.currency,
        notes: formData.notes,
        terms: formData.terms,
        status,
        items: formData.items.map(item => ({
          serviceId: item.serviceId,
          description: item.description,
          quantity: item.quantity,
          rate: item.rate,
          amount: item.amount
        })),
        subtotalAmount: formData.subtotal,
        taxRate: formData.taxRate,
        taxAmount: formData.taxAmount,
        totalAmount: formData.totalAmount
      }

      await createInvoiceMutation.mutateAsync(invoiceData)
    } catch (error) {
      console.error('Failed to create invoice:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: formData.currency,
    }).format(amount)
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/invoicing">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Invoices
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create New Invoice</h1>
            <p className="text-muted-foreground">Generate a new invoice for logistics services</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleSubmit('DRAFT')}
            disabled={loading || createInvoiceMutation.isLoading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Draft
          </Button>
          <Button
            onClick={() => handleSubmit('SENT')}
            disabled={loading || createInvoiceMutation.isLoading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Send Invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Invoice Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>Select customer for this invoice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Customer *</Label>
                {customersLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading customers...</span>
                  </div>
                ) : (
                  <Select
                    value={formData.customerId}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, customerId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers?.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.user.name || customer.user.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {formData.customerId && customers && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  {(() => {
                    const selectedCustomer = customers.find(c => c.id === formData.customerId)
                    return selectedCustomer ? (
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Name:</span> {selectedCustomer.user.name || 'N/A'}
                        </div>
                        <div>
                          <span className="font-medium">Email:</span> {selectedCustomer.user.email}
                        </div>
                        {selectedCustomer.companyName && (
                          <div>
                            <span className="font-medium">Company:</span> {selectedCustomer.companyName}
                          </div>
                        )}
                        {selectedCustomer.address && (
                          <div>
                            <span className="font-medium">Address:</span> {selectedCustomer.address}
                          </div>
                        )}
                      </div>
                    ) : null
                  })()}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Invoice Details */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
              <CardDescription>Invoice information and dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="invoice-number">Invoice Number</Label>
                  <Input
                    id="invoice-number"
                    value={invoiceNumber || "Generating..."}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoice-date">Issue Date</Label>
                  <Input
                    id="invoice-date"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date *</Label>
                  <Input
                    id="due-date"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
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
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                  <Input
                    id="tax-rate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.taxRate}
                    onChange={(e) => setFormData(prev => ({ ...prev, taxRate: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Items */}
          <Card>
            <CardHeader>
              <CardTitle>Service Items</CardTitle>
              <CardDescription>Add services and charges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.items.map((item, index) => (
                <div key={item.id}>
                  <div className="grid gap-4 md:grid-cols-12 items-end">
                    <div className="md:col-span-4 space-y-2">
                      <Label>Service</Label>
                      {servicesLoading ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Loading...</span>
                        </div>
                      ) : (
                        <Select
                          value={item.serviceId || ""}
                          onValueChange={(value) => {
                            updateItem(item.id, 'serviceId', value)
                            const service = services?.find(s => s.id === value)
                            if (service) {
                              updateItem(item.id, 'description', service.name)
                              updateItem(item.id, 'rate', parseFloat(service.basePrice.toString()) || 0)
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services?.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                    <div className="md:col-span-3 space-y-2">
                      <Label>Description</Label>
                      <Input
                        placeholder="Service description"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label>Rate ({formData.currency})</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="md:col-span-1 flex items-center justify-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        disabled={formData.items.length === 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right mt-2">
                    <span className="text-sm text-muted-foreground">
                      Amount: {formatCurrency(item.amount)}
                    </span>
                  </div>
                  {index < formData.items.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}

              {/* Add Item Button */}
              <Button variant="outline" className="w-full" onClick={addItem}>
                <Plus className="mr-2 h-4 w-4" />
                Add Service Item
              </Button>

              {/* Totals */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(formData.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({formData.taxRate}%):</span>
                  <span>{formatCurrency(formData.taxAmount)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>{formatCurrency(formData.totalAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Notes and terms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes or comments"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="terms">Terms & Conditions</Label>
                <Textarea
                  id="terms"
                  placeholder="Payment terms and conditions"
                  rows={3}
                  value={formData.terms}
                  onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoice Preview */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Invoice Preview</CardTitle>
              <CardDescription>Live preview of your invoice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg">DCF Logistics</h3>
                  <p className="text-sm text-muted-foreground">Professional Logistics Services</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium">Invoice #: {invoiceNumber || "Generating..."}</div>
                    <div className="text-muted-foreground">
                      Date: {new Date(formData.issueDate).toLocaleDateString()}
                    </div>
                    {formData.dueDate && (
                      <div className="text-muted-foreground">
                        Due: {new Date(formData.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <div className="font-medium">Bill To:</div>
                    {formData.customerId && customers ? (
                      <div className="text-muted-foreground">
                        {(() => {
                          const customer = customers.find(c => c.id === formData.customerId)
                          return customer ? (
                            <div>
                              <div>{customer.user.name || customer.user.email}</div>
                              {customer.companyName && <div>{customer.companyName}</div>}
                            </div>
                          ) : null
                        })()}
                      </div>
                    ) : (
                      <div className="text-muted-foreground">Select customer...</div>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <div className="font-medium">Services:</div>
                    {formData.items.filter(item => item.description).length > 0 ? (
                      <div className="space-y-1">
                        {formData.items
                          .filter(item => item.description)
                          .map((item) => (
                            <div key={item.id} className="text-muted-foreground text-xs">
                              {item.description} x{item.quantity} = {formatCurrency(item.amount)}
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-muted-foreground">No items added</div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(formData.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax ({formData.taxRate}%):</span>
                      <span>{formatCurrency(formData.taxAmount)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>{formatCurrency(formData.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full"
                  onClick={() => handleSubmit('SENT')}
                  disabled={loading || createInvoiceMutation.isLoading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Send Invoice
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSubmit('DRAFT')}
                  disabled={loading || createInvoiceMutation.isLoading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
