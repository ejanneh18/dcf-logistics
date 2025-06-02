'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useFormProgress } from '@/hooks/use-loading-progress'
import { toast } from 'sonner'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
  type: z.enum(['GENERAL', 'QUOTE', 'SUPPORT', 'PARTNERSHIP']).default('GENERAL'),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormWithProgressProps {
  onSubmit?: (data: ContactFormData) => Promise<void>
  className?: string
}

export function ContactFormWithProgress({ 
  onSubmit, 
  className 
}: ContactFormWithProgressProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { startSubmission, updateProgress, completeSubmission, failSubmission } = useFormProgress()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      type: 'GENERAL'
    }
  })

  const handleFormSubmit = async (data: ContactFormData) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    startSubmission('Submitting your inquiry...')

    try {
      // Simulate form submission steps with progress updates
      updateProgress(1, 4, 'Validating form data...')
      await new Promise(resolve => setTimeout(resolve, 500))

      updateProgress(2, 4, 'Sending email notifications...')
      await new Promise(resolve => setTimeout(resolve, 800))

      updateProgress(3, 4, 'Saving to database...')
      
      // Call the actual submit function if provided
      if (onSubmit) {
        await onSubmit(data)
      } else {
        // Default submission logic
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      updateProgress(4, 4, 'Complete!')
      completeSubmission()

      toast.success('Your inquiry has been submitted successfully!')
      reset()

    } catch (error) {
      failSubmission()
      toast.error('Failed to submit inquiry. Please try again.')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form 
      onSubmit={handleSubmit(handleFormSubmit)} 
      className={`space-y-6 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Your full name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="+1 (555) 123-4567"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            {...register('company')}
            placeholder="Your company name"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="type">Inquiry Type</Label>
        <select
          id="type"
          {...register('type')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          <option value="GENERAL">General Inquiry</option>
          <option value="QUOTE">Request Quote</option>
          <option value="SUPPORT">Support</option>
          <option value="PARTNERSHIP">Partnership</option>
        </select>
      </div>

      <div>
        <Label htmlFor="subject">Subject *</Label>
        <Input
          id="subject"
          {...register('subject')}
          placeholder="Brief description of your inquiry"
          disabled={isSubmitting}
        />
        {errors.subject && (
          <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Please provide details about your inquiry..."
          rows={5}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
      </Button>
    </form>
  )
}

export default ContactFormWithProgress
