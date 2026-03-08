'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calculator, Plane, Ship, Truck, Clock, Package, MapPin } from 'lucide-react'

// Form validation schema
const calculatorSchema = z.object({
  origin: z.string().min(2, 'Please enter origin location'),
  destination: z.string().min(2, 'Please enter destination location'),
  weight: z.string().min(1, 'Please enter weight'),
  length: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  serviceType: z.string().min(1, 'Please select service type'),
  cargoType: z.string().min(1, 'Please select cargo type'),
})

type CalculatorInputs = z.infer<typeof calculatorSchema>

interface ShippingRate {
  service: string
  icon: React.ComponentType<{ className?: string }>
  priceRange: string
  transitTime: string
  description: string
  features: string[]
}

const serviceTypes = [
  { value: 'air-express', label: 'Air Express', icon: Plane },
  { value: 'air-standard', label: 'Air Standard', icon: Plane },
  { value: 'sea-freight', label: 'Sea Freight', icon: Ship },
  { value: 'road-transport', label: 'Road Transport', icon: Truck },
]

const cargoTypes = [
  'General Cargo',
  'Documents',
  'Electronics',
  'Textiles',
  'Food Products',
  'Machinery',
  'Perishable Goods',
  'Other'
]

export default function ShippingCalculator() {
  const [isCalculating, setIsCalculating] = useState(false)
  const [rates, setRates] = useState<ShippingRate[]>([])
  const [showResults, setShowResults] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<CalculatorInputs>({
    resolver: zodResolver(calculatorSchema)
  })

  const watchedValues = watch()

  const calculateRates = async (data: CalculatorInputs) => {
    setIsCalculating(true)
    setShowResults(false)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate rate estimates based on input data
    const mockRates: ShippingRate[] = [
      {
        service: 'Air Express',
        icon: Plane,
        priceRange: 'Contact for Quote',
        transitTime: '1-2 days',
        description: 'Fastest delivery with priority handling',
        features: ['Door-to-door', 'Real-time tracking', 'Insurance included', 'Express customs clearance']
      },
      {
        service: 'Air Standard',
        icon: Plane,
        priceRange: 'Contact for Quote',
        transitTime: '3-5 days',
        description: 'Reliable air freight service',
        features: ['Airport-to-airport', 'Standard tracking', 'Basic insurance', 'Regular customs clearance']
      },
      {
        service: 'Sea Freight',
        icon: Ship,
        priceRange: 'Most Economical',
        transitTime: '15-25 days',
        description: 'Cost-effective ocean shipping',
        features: ['Port-to-port', 'Container shipping', 'Bulk discounts', 'Eco-friendly option']
      },
      {
        service: 'Road Transport',
        icon: Truck,
        priceRange: 'Competitive Rates',
        transitTime: '5-10 days',
        description: 'Overland transportation',
        features: ['Door-to-door', 'Flexible scheduling', 'Regional coverage', 'Cost-effective']
      }
    ]

    setRates(mockRates)
    setShowResults(true)
    setIsCalculating(false)
  }

  const calculateBaseRate = (data: CalculatorInputs): number => {
    const weight = parseFloat(data.weight) || 1
    const length = parseFloat(data.length || '0')
    const width = parseFloat(data.width || '0')
    const height = parseFloat(data.height || '0')
    
    // Calculate volumetric weight
    const volumetricWeight = (length * width * height) / 5000
    const chargeableWeight = Math.max(weight, volumetricWeight)
    
    // Base rate calculation (simplified)
    let baseRate = chargeableWeight * 5 // $5 per kg base rate
    
    // Adjust for cargo type
    const cargoMultipliers: Record<string, number> = {
      'Documents': 0.8,
      'General Cargo': 1.0,
      'Electronics': 1.3,
      'Perishable Goods': 1.5,
      'Machinery': 1.2,
      'Other': 1.1
    }
    
    baseRate *= cargoMultipliers[data.cargoType] || 1.0
    
    // Add distance factor (simplified)
    baseRate += Math.random() * 50 + 25 // Random distance factor
    
    return Math.round(baseRate)
  }

  const onSubmit = (data: CalculatorInputs) => {
    calculateRates(data)
  }

  const resetCalculator = () => {
    reset()
    setRates([])
    setShowResults(false)
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Calculator Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Calculator className="h-6 w-6" />
            Shipping Rate Calculator
          </CardTitle>
          <CardDescription className="text-center text-lg">
            Get instant shipping quotes for your cargo. Compare rates across different services.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Origin and Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Origin *
                </Label>
                <Input
                  id="origin"
                  {...register('origin')}
                  placeholder="e.g., Banjul, Gambia"
                  className={errors.origin ? 'border-red-500' : ''}
                />
                {errors.origin && (
                  <p className="text-sm text-red-600">{errors.origin.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Destination *
                </Label>
                <Input
                  id="destination"
                  {...register('destination')}
                  placeholder="e.g., Lagos, Nigeria"
                  className={errors.destination ? 'border-red-500' : ''}
                />
                {errors.destination && (
                  <p className="text-sm text-red-600">{errors.destination.message}</p>
                )}
              </div>
            </div>

            {/* Weight and Dimensions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Weight (kg) *
                </Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  {...register('weight')}
                  placeholder="10.5"
                  className={errors.weight ? 'border-red-500' : ''}
                />
                {errors.weight && (
                  <p className="text-sm text-red-600">{errors.weight.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="length">Length (cm)</Label>
                <Input
                  id="length"
                  type="number"
                  {...register('length')}
                  placeholder="50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="width">Width (cm)</Label>
                <Input
                  id="width"
                  type="number"
                  {...register('width')}
                  placeholder="40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  {...register('height')}
                  placeholder="30"
                />
              </div>
            </div>

            {/* Service and Cargo Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceType">Preferred Service *</Label>
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
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="flex-1"
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <Calculator className="mr-2 h-4 w-4 animate-pulse" />
                    Calculating Rates...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Rates
                  </>
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="outline"
                onClick={resetCalculator}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {showResults && rates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Shipping Rate Comparison</CardTitle>
            <CardDescription>
              Rates from {watchedValues.origin} to {watchedValues.destination} for {watchedValues.weight}kg
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {rates.map((rate, index) => {
                const Icon = rate.icon
                return (
                  <Card key={index} className="relative hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">{rate.service}</h3>
                      </div>
                      
                      <div className="text-center mb-4">
                        <div className="text-lg font-bold text-primary">
                          {rate.priceRange}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                          <Clock className="h-4 w-4" />
                          {rate.transitTime}
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{rate.description}</p>

                      <div className="space-y-1">
                        {rate.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs mr-1 mb-1">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <Button className="w-full mt-4" size="sm">
                        Select This Service
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> These are estimated rates based on the information provided. 
                Final rates may vary based on actual cargo inspection, route availability, and current market conditions. 
                Contact us for a detailed quote.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
