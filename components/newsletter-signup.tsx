'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Loader2, Mail, Bell, TrendingUp, Globe } from 'lucide-react'
import { formService, type NewsletterData } from '@/lib/forms/form-service'

// Form validation schema
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().optional(),
})

type NewsletterFormInputs = z.infer<typeof newsletterSchema>

const newsletterPreferences = [
  { id: 'industry-insights', label: 'Industry Insights & Trends', icon: TrendingUp },
  { id: 'shipping-tips', label: 'Shipping Tips & Best Practices', icon: Mail },
  { id: 'service-updates', label: 'Service Updates & New Features', icon: Bell },
  { id: 'market-analysis', label: 'Market Analysis & Trade Updates', icon: Globe },
]

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'footer'
  title?: string
  description?: string
  className?: string
}

export default function NewsletterSignup({ 
  variant = 'default',
  title = 'Stay Updated with DCF Logistics',
  description = 'Get the latest logistics insights, shipping tips, and industry updates delivered to your inbox.',
  className = ''
}: NewsletterSignupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<NewsletterFormInputs>({
    resolver: zodResolver(newsletterSchema)
  })

  const onSubmit = async (data: NewsletterFormInputs) => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const newsletterData: NewsletterData = {
        ...data,
        preferences: selectedPreferences
      }

      const result = await formService.submitNewsletterSubscription(newsletterData)
      
      if (result.success) {
        setIsSubscribed(true)
        reset()
        setSelectedPreferences([])
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePreferenceToggle = (preferenceId: string) => {
    setSelectedPreferences(prev => 
      prev.includes(preferenceId) 
        ? prev.filter(p => p !== preferenceId)
        : [...prev, preferenceId]
    )
  }

  // Compact variant for footer
  if (variant === 'compact' || variant === 'footer') {
    if (isSubscribed) {
      return (
        <div className={`text-center ${className}`}>
          <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Successfully subscribed!</span>
          </div>
          <p className="text-sm text-gray-600">
            Thank you for subscribing to our newsletter.
          </p>
        </div>
      )
    }

    return (
      <div className={className}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-2">
            <Input
              type="email"
              {...register('email')}
              placeholder="Enter your email address"
              className={`${errors.email ? 'border-red-500' : ''} ${
                variant === 'footer' ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </>
            )}
          </Button>
        </form>
      </div>
    )
  }

  // Success state for default variant
  if (isSubscribed) {
    return (
      <Card className={`w-full max-w-md mx-auto ${className}`}>
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-green-700 mb-2">Welcome to Our Newsletter!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for subscribing. You'll receive our latest updates and insights directly in your inbox.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-blue-800 mb-2">What to expect:</h4>
            <ul className="text-sm text-blue-700 space-y-1 text-left">
              <li>• Weekly industry insights and trends</li>
              <li>• Practical shipping tips and guides</li>
              <li>• Updates on our services and capabilities</li>
              <li>• Exclusive offers and promotions</li>
            </ul>
          </div>
          <Button 
            onClick={() => setIsSubscribed(false)} 
            variant="outline"
            size="sm"
          >
            Subscribe Another Email
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Default variant
  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center flex items-center justify-center gap-2">
          <Mail className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription className="text-center">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
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

          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name">Name (Optional)</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Your name"
            />
          </div>

          {/* Newsletter Preferences */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">What interests you? (Optional)</Label>
            <div className="space-y-2">
              {newsletterPreferences.map((preference) => {
                const Icon = preference.icon
                return (
                  <div key={preference.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={preference.id}
                      checked={selectedPreferences.includes(preference.id)}
                      onCheckedChange={() => handlePreferenceToggle(preference.id)}
                    />
                    <Label 
                      htmlFor={preference.id} 
                      className="text-sm font-normal flex items-center gap-2 cursor-pointer"
                    >
                      <Icon className="h-4 w-4 text-gray-500" />
                      {preference.label}
                    </Label>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Subscribe to Newsletter
              </>
            )}
          </Button>

          {/* Privacy Notice */}
          <p className="text-xs text-gray-600 text-center">
            We respect your privacy. Unsubscribe at any time. 
            Read our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

// Export variants for easy use
export function CompactNewsletterSignup(props: Omit<NewsletterSignupProps, 'variant'>) {
  return <NewsletterSignup {...props} variant="compact" />
}

export function FooterNewsletterSignup(props: Omit<NewsletterSignupProps, 'variant'>) {
  return <NewsletterSignup {...props} variant="footer" />
}
