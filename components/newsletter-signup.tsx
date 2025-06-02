"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'inline'
  className?: string
  source?: string
}

export function NewsletterSignup({ 
  variant = 'default', 
  className = '',
  source = 'website'
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name || undefined,
          source,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubscribed(true)
        setEmail('')
        setName('')
        toast.success(data.message || 'Successfully subscribed to newsletter!')
      } else {
        toast.error(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      toast.error('Failed to subscribe. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === 'inline') {
    return (
      <div className={`flex flex-col sm:flex-row gap-2 ${className}`}>
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading || isSubscribed}
            className="w-full"
          />
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={isLoading || isSubscribed || !email}
          className="whitespace-nowrap"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : isSubscribed ? (
            <CheckCircle className="h-4 w-4 mr-2" />
          ) : (
            <Mail className="h-4 w-4 mr-2" />
          )}
          {isSubscribed ? 'Subscribed!' : 'Subscribe'}
        </Button>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <Card className={`w-full max-w-md ${className}`}>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Newsletter
          </CardTitle>
          <CardDescription>
            Get logistics insights and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubscribed ? (
            <div className="text-center py-4">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <p className="text-green-600 font-medium">Successfully subscribed!</p>
              <p className="text-sm text-gray-600 mt-1">
                Check your email for confirmation
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    )
  }

  // Default variant
  return (
    <Card className={`w-full max-w-lg ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Mail className="h-6 w-6 text-primary" />
          Stay Updated with DCF Logistics
        </CardTitle>
        <CardDescription>
          Subscribe to our newsletter for the latest logistics insights, industry trends, 
          and updates on our services. Join thousands of logistics professionals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSubscribed ? (
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Welcome to our newsletter!
            </h3>
            <p className="text-gray-600 mb-4">
              Thank you for subscribing. You'll receive a welcome email shortly with 
              information about what to expect.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-700">
                <strong>What's next?</strong> Check your email for a confirmation message 
                and add us to your contacts to ensure you receive our updates.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="newsletter-name">Name (Optional)</Label>
              <Input
                id="newsletter-name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="newsletter-email">Email Address *</Label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="font-medium text-blue-900 mb-2">You'll receive:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Weekly logistics industry insights</li>
                <li>• Shipping tips and best practices</li>
                <li>• Service updates and new features</li>
                <li>• Exclusive offers and promotions</li>
              </ul>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !email}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Subscribe to Newsletter
                </>
              )}
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              By subscribing, you agree to receive marketing emails from DCF Logistics. 
              You can unsubscribe at any time. View our{' '}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

export default NewsletterSignup
