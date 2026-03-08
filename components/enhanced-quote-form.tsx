'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckCircle2, Loader2, Calculator, Truck, Plane, Ship, Package } from 'lucide-react'
import { toast } from 'sonner'

// Form validation schema
const quoteSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  company: z.string().optional(),
  serviceType: z.string().min(1, 'Please select a service type'),
  origin: z.string().min(2, 'Please enter origin location'),
  destination: z.string().min(2, 'Please enter destination location'),
  cargoType: z.string().min(1, 'Please select cargo type'),
  cargoDetails: z.string().min(5, 'Please provide cargo details'),
  weight: z.string().min(1, 'Please enter cargo weight'),
  dimensions: z.string().optional(),
  specialRequirements: z.string().optional(),
  estimatedValue: z.string().optional(),
})

type QuoteFormInputs = z.infer<typeof quoteSchema>

const serviceTypes = [
  { value: 'air-freight', label: 'Air Freight', icon: Plane },
  { value: 'sea-freight', label: 'Sea Freight', icon: Ship },
  { value: 'road-transport', label: 'Road Transport', icon: Truck },
  { value: 'customs-clearance', label: 'Customs Clearance', icon: Package },
  { value: 'warehousing', label: 'Warehousing', icon: Package },
  { value: 'full-logistics', label: 'Complete Logistics Solution', icon: Package },
]

const cargoTypes = [
  'General Cargo',
  'Perishable Goods',
  'Hazardous Materials',
  'Oversized/Heavy Cargo',
  'Electronics',
  'Textiles',
  'Machinery',
  'Food Products',
  'Medical Supplies',
  'Other'
]

const additionalServices = [
  'Insurance Coverage',
  'Packaging Services',
  'Door-to-Door Delivery',
  'Express Handling',
  'Temperature Control',
  'Real-time Tracking',
  'Documentation Services',
  'Quality Inspection'
]

export default function EnhancedQuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionId, setSubmissionId] = useState<string>('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<QuoteFormInputs>({
    resolver: zodResolver(quoteSchema)
  })

  const selectedServiceType = watch('serviceType')

  const onSubmit = async (data: QuoteFormInputs) => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          additionalServices: selectedServices,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        setSubmissionId(result.id || '')
        reset()
        setSelectedServices([])
        toast.success('Quote request submitted successfully!')
      } else {
        toast.error(result.message || 'Failed to submit quote. Please try again.')
      }
    } catch (error) {
      console.error('Quote form submission error:', error)
      toast.error('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    )
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-green-700 mb-2">Quote Request Submitted!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your quote request. Our logistics experts will analyze your requirements and provide a detailed quote within 2 business hours.
          </p>
          {submissionId && (
            <p className="text-sm text-gray-500 mb-6">
              Quote Reference: <span className="font-mono font-semibold">{submissionId}</span>
            </p>
          )}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">What happens next?</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Our team will review your requirements</li>
              <li>• We'll calculate the best rates and routes</li>
              <li>• You'll receive a detailed quote via email</li>
              <li>• Our experts will be available for any questions</li>
            </ul>
          </div>
          <Button 
            onClick={() => setIsSubmitted(false)} 
            variant="outline"
          >
            Request Another Quote
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <Calculator className="h-6 w-6" />
          Request a Quote
        </CardTitle>
        <CardDescription className="text-center text-lg">
          Get a customized quote for your logistics needs. Our experts will provide competitive rates within 2 business hours.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  {...register('fullName')}
                  placeholder="Enter your full name"
                  className={errors.fullName ? 'border-red-500' : ''}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="your.email@example.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  placeholder="+220 395 1020"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  {...register('company')}
                  placeholder="Your company name"
                />
              </div>
            </div>
          </div>

          {/* Service Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Service Requirements</h3>
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type *</Label>
              <Select onValueChange={(value) => setValue('serviceType', value)}>
                <SelectTrigger className={errors.serviceType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => {
                    const Icon = service.icon
                    return (
                      <SelectItem key={service.value} value={service.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {service.label}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              {errors.serviceType && (
                <p className="text-sm text-red-600">{errors.serviceType.message}</p>
              )}
            </div>

            {/* Origin and Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Origin *</Label>
                <Input
                  id="origin"
                  {...register('origin')}
                  placeholder="City, Country"
                  className={errors.origin ? 'border-red-500' : ''}
                />
                {errors.origin && (
                  <p className="text-sm text-red-600">{errors.origin.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination *</Label>
                <Input
                  id="destination"
                  {...register('destination')}
                  placeholder="City, Country"
                  className={errors.destination ? 'border-red-500' : ''}
                />
                {errors.destination && (
                  <p className="text-sm text-red-600">{errors.destination.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Cargo Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Cargo Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cargoType">Cargo Type *</Label>
                <Select onValueChange={(value) => setValue('cargoType', value)}>
                  <SelectTrigger className={errors.cargoType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select cargo type" />
                  </SelectTrigger>
                  <SelectContent>
                    {cargoTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.cargoType && (
                  <p className="text-sm text-red-600">{errors.cargoType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Total Weight *</Label>
                <Input
                  id="weight"
                  {...register('weight')}
                  placeholder="e.g., 500 kg"
                  className={errors.weight ? 'border-red-500' : ''}
                />
                {errors.weight && (
                  <p className="text-sm text-red-600">{errors.weight.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensions (L x W x H)</Label>
                <Input
                  id="dimensions"
                  {...register('dimensions')}
                  placeholder="e.g., 2m x 1m x 1.5m"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedValue">Estimated Value</Label>
                <Input
                  id="estimatedValue"
                  {...register('estimatedValue')}
                  placeholder="e.g., $10,000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargoDetails">Cargo Details *</Label>
              <Textarea
                id="cargoDetails"
                {...register('cargoDetails')}
                placeholder="Describe your cargo in detail..."
                rows={3}
                className={errors.cargoDetails ? 'border-red-500' : ''}
              />
              {errors.cargoDetails && (
                <p className="text-sm text-red-600">{errors.cargoDetails.message}</p>
              )}
            </div>
          </div>

          {/* Additional Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Additional Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {additionalServices.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={selectedServices.includes(service)}
                    onCheckedChange={() => handleServiceToggle(service)}
                  />
                  <Label htmlFor={service} className="text-sm font-normal">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Special Requirements */}
          <div className="space-y-2">
            <Label htmlFor="specialRequirements">Special Requirements</Label>
            <Textarea
              id="specialRequirements"
              {...register('specialRequirements')}
              placeholder="Any special handling requirements, delivery instructions, or other notes..."
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Quote Request...
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-4 w-4" />
                Get My Quote
              </>
            )}
          </Button>

          <p className="text-sm text-gray-600 text-center">
            By submitting this form, you agree to our terms of service and privacy policy. 
            We'll respond with a detailed quote within 2 business hours.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
