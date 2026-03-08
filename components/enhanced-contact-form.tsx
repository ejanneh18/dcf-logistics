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
import { CheckCircle2, Loader2, Send, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { formService, type ContactFormData } from '@/lib/forms/form-service'

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  type: z.enum(['GENERAL', 'QUOTE', 'SUPPORT', 'PARTNERSHIP']).default('GENERAL'),
})

type ContactFormInputs = z.infer<typeof contactSchema>

interface EnhancedContactFormProps {
  defaultType?: 'GENERAL' | 'QUOTE' | 'SUPPORT' | 'PARTNERSHIP'
  title?: string
  description?: string
  className?: string
}

export default function EnhancedContactForm({ 
  defaultType = 'GENERAL',
  title = 'Get in Touch',
  description = 'Send us a message and we\'ll respond within 24/48 hours.',
  className = ''
}: EnhancedContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionId, setSubmissionId] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      type: defaultType
    }
  })

  const selectedType = watch('type')

  const onSubmit = async (data: ContactFormInputs) => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const result = await formService.submitContactForm(data as ContactFormData)
      
      if (result.success) {
        setIsSubmitted(true)
        setSubmissionId(result.id || '')
        reset()
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className={`w-full max-w-2xl mx-auto ${className}`}>
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-green-700 mb-2">Message Sent Successfully!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for contacting DCF Logistics. We have received your message and will respond within 24 hours.
          </p>
          {submissionId && (
            <p className="text-sm text-gray-500 mb-6">
              Reference ID: <span className="font-mono font-semibold">{submissionId}</span>
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Phone className="h-4 w-4" />
              <span>+220 395 1020</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Mail className="h-4 w-4" />
              <span>info@dcfagency.com</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span>24hr Response</span>
            </div>
          </div>
          <Button 
            onClick={() => setIsSubmitted(false)} 
            variant="outline" 
            className="mt-6"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
        <CardDescription className="text-center text-lg">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Inquiry Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Inquiry Type *</Label>
            <Select 
              value={selectedType} 
              onValueChange={(value) => setValue('type', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GENERAL">General Inquiry</SelectItem>
                <SelectItem value="QUOTE">Request Quote</SelectItem>
                <SelectItem value="SUPPORT">Customer Support</SelectItem>
                <SelectItem value="PARTNERSHIP">Partnership Opportunity</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter your full name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
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
          </div>

          {/* Phone and Company Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder="+220 395 1020"
              />
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

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              {...register('subject')}
              placeholder="Brief description of your inquiry"
              className={errors.subject ? 'border-red-500' : ''}
            />
            {errors.subject && (
              <p className="text-sm text-red-600">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Please provide details about your inquiry..."
              rows={6}
              className={errors.message ? 'border-red-500' : ''}
            />
            {errors.message && (
              <p className="text-sm text-red-600">{errors.message.message}</p>
            )}
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
                Sending Message...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>

          {/* Contact Information */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-semibold mb-4 text-center">Other Ways to Reach Us</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p>+220 395 1020</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p>info@dcfagency.com</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Office</p>
                  <p>IC PLAZA, Westfield Serekunda</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
