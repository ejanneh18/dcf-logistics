"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft, 
  User, 
  Building, 
  Mail,
  Phone,
  MapPin,
  Save,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { trpc } from '@/lib/trpc/client'

interface CustomerFormData {
  name: string
  email: string
  password: string
  companyName?: string
  phone?: string
  address?: string
  taxId?: string
}

export default function CreateCustomerPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState<CustomerFormData>({
    name: '',
    email: '',
    password: '',
    companyName: '',
    phone: '',
    address: '',
    taxId: '',
  })

  // Create user mutation (we'll need to create this)
  const createUserMutation = trpc.auth.createUser.useMutation({
    onSuccess: async (user) => {
      // After user is created, create customer profile
      try {
        await createCustomerMutation.mutateAsync({
          userId: user.id,
          companyName: formData.companyName,
          phone: formData.phone,
          address: formData.address,
          taxId: formData.taxId,
        })
      } catch (error) {
        console.error('Failed to create customer profile:', error)
      }
    },
    onError: (error) => {
      toast.error(`Failed to create user: ${error.message}`)
      setLoading(false)
    }
  })

  // Create customer mutation
  const createCustomerMutation = trpc.customers.create.useMutation({
    onSuccess: (customer) => {
      toast.success("Customer created successfully")
      router.push(`/admin/customers/${customer.id}`)
    },
    onError: (error) => {
      toast.error(`Failed to create customer: ${error.message}`)
      setLoading(false)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)

      // Validate required fields
      if (!formData.name || !formData.email || !formData.password) {
        toast.error('Please fill in all required fields')
        return
      }

      // Create user first, then customer profile will be created in the success callback
      await createUserMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'CUSTOMER'
      })
    } catch (error) {
      console.error('Failed to create customer:', error)
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
            <Link href="/admin/customers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Customers
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Create New Customer</h1>
            <p className="text-gray-600">Add a new customer to the system</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  User Account Information
                </CardTitle>
                <CardDescription>Basic account details for login</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="customer@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter password"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Company Information
                </CardTitle>
                <CardDescription>Optional company details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="Company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID</Label>
                    <Input
                      id="taxId"
                      value={formData.taxId}
                      onChange={(e) => setFormData(prev => ({ ...prev, taxId: e.target.value }))}
                      placeholder="Tax identification number"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
                <CardDescription>Contact details and address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+220 123 4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Full address"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button 
                type="submit"
                disabled={loading || createUserMutation.isLoading || createCustomerMutation.isLoading}
                className="w-full sm:w-auto"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Create Customer
              </Button>
            </div>
          </form>
        </div>

        {/* Customer Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm">{formData.name || 'Not specified'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm">{formData.email || 'Not specified'}</p>
                </div>
                
                {formData.companyName && (
                  <div>
                    <p className="text-sm font-medium">Company</p>
                    <p className="text-sm">{formData.companyName}</p>
                  </div>
                )}
                
                {formData.phone && (
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm">{formData.phone}</p>
                  </div>
                )}
                
                {formData.address && (
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm">{formData.address}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
