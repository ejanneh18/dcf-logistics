"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Send, FileText, HelpCircle, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface ContactFormProps {
  type: 'general' | 'quote' | 'support'
}

export function ContactForm({ type }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    trackingNumber: '',
    issueType: '',
    service: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let endpoint = '/api/contact'
      let payload: any = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        subject: formData.subject,
        message: formData.message,
        type: type.toUpperCase(),
      }

      // Customize payload based on form type
      if (type === 'quote') {
        payload.subject = `Quote Request - ${formData.service}`
        payload.message = `Service: ${formData.service}\n\nDetails:\n${formData.message}`
        payload.type = 'QUOTE'
      } else if (type === 'support') {
        payload.subject = `Support Request - ${formData.issueType || 'General'}`
        payload.message = `Issue Type: ${formData.issueType}\n${formData.trackingNumber ? `Tracking Number: ${formData.trackingNumber}\n` : ''}\nDescription:\n${formData.message}`
        payload.type = 'SUPPORT'
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          trackingNumber: '',
          issueType: '',
          service: '',
        })
        toast.success(data.message || 'Message sent successfully!')
      } else {
        toast.error(data.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error('Failed to send message. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-600 mb-2">
            Message Sent Successfully!
          </h3>
          <p className="text-gray-600 mb-4">
            Thank you for contacting DCF Logistics. We've received your {type} inquiry 
            and will respond within 24 hours during business days.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-700">
              <strong>What's next?</strong> You'll receive a confirmation email shortly. 
              For urgent matters, please call us at +220 123 4567.
            </p>
          </div>
          <Button 
            onClick={() => setIsSubmitted(false)} 
            variant="outline" 
            className="mt-4"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Common fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your full name"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@company.com"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Type-specific fields */}
          {type === 'quote' && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Your company name"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Your phone number"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service Interested In *</Label>
                <Select 
                  value={formData.service} 
                  onValueChange={(value) => handleInputChange('service', value)}
                  required
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Air Freight">Air Freight</SelectItem>
                    <SelectItem value="Ground Transportation">Ground Transportation</SelectItem>
                    <SelectItem value="Customs Clearance">Customs Clearance</SelectItem>
                    <SelectItem value="Warehousing">Warehousing & Distribution</SelectItem>
                    <SelectItem value="Freight Forwarding">Freight Forwarding</SelectItem>
                    <SelectItem value="Customs Brokerage">Customs Brokerage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {type === 'support' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="trackingNumber">Tracking Number (if applicable)</Label>
                <Input
                  id="trackingNumber"
                  value={formData.trackingNumber}
                  onChange={(e) => handleInputChange('trackingNumber', e.target.value)}
                  placeholder="Your tracking number"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issueType">Issue Type</Label>
                <Select 
                  value={formData.issueType} 
                  onValueChange={(value) => handleInputChange('issueType', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tracking">Tracking Issue</SelectItem>
                    <SelectItem value="delivery">Delivery Problem</SelectItem>
                    <SelectItem value="damage">Damaged Shipment</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="documentation">Documentation Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {type === 'general' && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Your phone number"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Your company name"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Subject of your inquiry"
                  required
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          {/* Message field */}
          <div className="space-y-2">
            <Label htmlFor="message">
              {type === 'quote' ? 'Shipment Details *' : 
               type === 'support' ? 'Issue Description *' : 
               'Message *'}
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder={
                type === 'quote' 
                  ? 'Please provide details about your shipment (origin, destination, cargo type, weight, dimensions, etc.)'
                  : type === 'support'
                  ? 'Please describe your issue in detail'
                  : 'How can we help you?'
              }
              rows={5}
              required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                {type === 'quote' ? (
                  <FileText className="h-4 w-4 mr-2" />
                ) : type === 'support' ? (
                  <HelpCircle className="h-4 w-4 mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                {type === 'quote' ? 'Request Quote' : 
                 type === 'support' ? 'Submit Support Request' : 
                 'Send Message'}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ContactForm
