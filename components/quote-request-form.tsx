"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { CalendarIcon, Loader2, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function QuoteRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [quoteId, setQuoteId] = useState<string>("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    origin: "",
    destination: "",
    shipmentDate: undefined as Date | undefined,
    cargoType: "",
    cargoDetails: "",
    dimensions: "",
    weight: "",
    specialRequirements: "",
    additionalServices: [] as string[],
    estimatedValue: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return { ...prev, additionalServices: [...prev.additionalServices, value] }
      } else {
        return {
          ...prev,
          additionalServices: prev.additionalServices.filter((service) => service !== value),
        }
      }
    })
  }

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, shipmentDate: date }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // For static export, use mailto functionality
      const subject = `Quote Request - ${formData.serviceType}`
      const body = `Quote Request Details:

Contact Information:
- Name: ${formData.fullName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Company: ${formData.company || 'Not provided'}

Service Details:
- Service Type: ${formData.serviceType}
- Origin: ${formData.origin}
- Destination: ${formData.destination}
- Shipment Date: ${formData.shipmentDate ? format(formData.shipmentDate, "PPP") : 'Not specified'}

Cargo Information:
- Cargo Type: ${formData.cargoType}
- Description: ${formData.cargoDetails}
- Dimensions: ${formData.dimensions || 'Not specified'}
- Weight: ${formData.weight || 'Not specified'}
- Estimated Value: ${formData.estimatedValue ? `$${formData.estimatedValue} USD` : 'Not specified'}

Additional Services:
${formData.additionalServices.length > 0 ? formData.additionalServices.map(service => `- ${service}`).join('\n') : '- None selected'}

Special Requirements:
${formData.specialRequirements || 'None'}

Please provide a detailed quote for the above requirements.`

      // Create mailto link
      const mailtoLink = `mailto:info@dcfagency.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

      // Open email client
      window.open(mailtoLink, '_blank')

      // Generate a mock quote ID
      const mockQuoteId = `DCF-${Date.now().toString().slice(-6)}`

      // Simulate success after a short delay
      setTimeout(() => {
        setIsSubmitted(true)
        setQuoteId(mockQuoteId)
        toast.success("Email client opened! Please send the email to receive your quote.")

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          serviceType: "",
          origin: "",
          destination: "",
          shipmentDate: undefined,
          cargoType: "",
          cargoDetails: "",
          dimensions: "",
          weight: "",
          specialRequirements: "",
          additionalServices: [],
          estimatedValue: "",
        })
        setIsSubmitting(false)
      }, 1000)

    } catch (error) {
      console.error('Quote request error:', error)
      toast.error("Failed to open email client. Please try again or contact us directly.")
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">Quote Request Submitted!</CardTitle>
          <CardDescription className="text-center">
            Your quote request has been successfully submitted.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-green-600">
              Thank you for your quote request!
            </h3>
            <p className="text-gray-600">
              Quote Reference: <span className="font-mono font-bold">{quoteId}</span>
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">What happens next?</h4>
            <ul className="text-sm text-green-700 space-y-1 text-left">
              <li>• You'll receive a detailed quote via email within 2-4 hours</li>
              <li>• Our sales team will review your requirements</li>
              <li>• We'll contact you if we need any additional information</li>
              <li>• The quote will be valid for 30 days</li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              For urgent requests, please call us at{' '}
              <a href="tel:+2203951020" className="text-primary font-semibold hover:underline">
                +220 395 1020
              </a>
            </p>

            <Button
              onClick={() => {
                setIsSubmitted(false)
                setQuoteId("")
              }}
              variant="outline"
            >
              Submit Another Quote Request
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Request a Quote</CardTitle>
        <CardDescription>
          Fill out the form below with your shipping details to receive a customized quote.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" name="company" value={formData.company} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Service Details</h3>
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type *</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) => handleSelectChange("serviceType", value)}
                required
              >
                <SelectTrigger id="serviceType">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freight-forwarding">Freight Forwarding</SelectItem>
                  <SelectItem value="customs-brokerage">Customs Brokerage</SelectItem>
                  <SelectItem value="warehousing">Warehousing & Distribution</SelectItem>
                  <SelectItem value="air-freight">Air Freight</SelectItem>
                  <SelectItem value="ocean-freight">Ocean Freight</SelectItem>
                  <SelectItem value="road-transport">Road Transportation</SelectItem>
                  <SelectItem value="cross-border">Cross Border Logistics</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Origin Location *</Label>
                <Input
                  id="origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination Location *</Label>
                <Input
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shipmentDate">Estimated Shipment Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.shipmentDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.shipmentDate ? format(formData.shipmentDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={formData.shipmentDate} onSelect={handleDateChange} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Cargo Information</h3>
            <div className="space-y-2">
              <Label>Cargo Type *</Label>
              <RadioGroup
                value={formData.cargoType}
                onValueChange={(value) => handleSelectChange("cargoType", value)}
                required
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general">General Cargo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hazardous" id="hazardous" />
                    <Label htmlFor="hazardous">Hazardous Materials</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="perishable" id="perishable" />
                    <Label htmlFor="perishable">Perishable Goods</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oversized" id="oversized" />
                    <Label htmlFor="oversized">Oversized Cargo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="valuable" id="valuable" />
                    <Label htmlFor="valuable">High-Value Items</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other-cargo" />
                    <Label htmlFor="other-cargo">Other</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargoDetails">Cargo Description *</Label>
              <Textarea
                id="cargoDetails"
                name="cargoDetails"
                value={formData.cargoDetails}
                onChange={handleInputChange}
                placeholder="Please describe your cargo in detail"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensions</Label>
                <Input
                  id="dimensions"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                  placeholder="Length x Width x Height (cm)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Total weight (kg)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedValue">Estimated Value (USD)</Label>
                <Input
                  id="estimatedValue"
                  name="estimatedValue"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.estimatedValue}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Additional Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="insurance"
                  checked={formData.additionalServices.includes("insurance")}
                  onCheckedChange={(checked) => handleCheckboxChange("insurance", checked as boolean)}
                />
                <Label htmlFor="insurance">Cargo Insurance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="customs"
                  checked={formData.additionalServices.includes("customs")}
                  onCheckedChange={(checked) => handleCheckboxChange("customs", checked as boolean)}
                />
                <Label htmlFor="customs">Customs Clearance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="packaging"
                  checked={formData.additionalServices.includes("packaging")}
                  onCheckedChange={(checked) => handleCheckboxChange("packaging", checked as boolean)}
                />
                <Label htmlFor="packaging">Packaging Services</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="warehousing"
                  checked={formData.additionalServices.includes("warehousing")}
                  onCheckedChange={(checked) => handleCheckboxChange("warehousing", checked as boolean)}
                />
                <Label htmlFor="warehousing">Warehousing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="door-to-door"
                  checked={formData.additionalServices.includes("door-to-door")}
                  onCheckedChange={(checked) => handleCheckboxChange("door-to-door", checked as boolean)}
                />
                <Label htmlFor="door-to-door">Door-to-Door Delivery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="tracking"
                  checked={formData.additionalServices.includes("tracking")}
                  onCheckedChange={(checked) => handleCheckboxChange("tracking", checked as boolean)}
                />
                <Label htmlFor="tracking">Advanced Tracking</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequirements">Special Requirements or Instructions</Label>
            <Textarea
              id="specialRequirements"
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleInputChange}
              placeholder="Any special handling instructions or requirements"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              "Submit Quote Request"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
