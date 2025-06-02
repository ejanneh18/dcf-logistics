"use client"

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle, AlertCircle, Loader2, Mail } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

function UnsubscribeForm() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isUnsubscribed, setIsUnsubscribed] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }
  }, [searchParams])

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError('Please enter your email address')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/newsletter/subscribe?email=${encodeURIComponent(email)}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (response.ok) {
        setIsUnsubscribed(true)
        toast.success(data.message || 'Successfully unsubscribed from newsletter')
      } else {
        setError(data.error || 'Failed to unsubscribe. Please try again.')
        toast.error(data.error || 'Failed to unsubscribe')
      }
    } catch (error) {
      console.error('Unsubscribe error:', error)
      setError('Failed to unsubscribe. Please check your connection and try again.')
      toast.error('Failed to unsubscribe. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isUnsubscribed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card>
            <CardHeader className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl text-green-600">
                Successfully Unsubscribed
              </CardTitle>
              <CardDescription>
                You have been removed from our newsletter list
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  We're sorry to see you go! You have been successfully unsubscribed from
                  the DCF Logistics newsletter.
                </p>
                <p className="text-sm text-gray-500">
                  Email: <span className="font-medium">{email}</span>
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">We'd love your feedback</h4>
                <p className="text-sm text-blue-800 mb-3">
                  Help us improve by letting us know why you unsubscribed.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/contact?subject=Newsletter Feedback">
                    Share Feedback
                  </Link>
                </Button>
              </div>

              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600">
                  You can still:
                </p>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/services">
                      Explore Our Services
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/tracking">
                      Track Your Shipments
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/">
                      Return to Homepage
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl">
              Unsubscribe from Newsletter
            </CardTitle>
            <CardDescription>
              We're sorry to see you go. Enter your email address to unsubscribe from our newsletter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUnsubscribe} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@company.com"
                  required
                  disabled={isLoading}
                />
                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-2">Before you go...</h4>
                <p className="text-sm text-yellow-800 mb-3">
                  Our newsletter provides valuable logistics insights, industry trends,
                  and exclusive updates. Are you sure you want to unsubscribe?
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/">
                      Keep Subscription
                    </Link>
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !email}
                variant="destructive"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Unsubscribing...
                  </>
                ) : (
                  'Unsubscribe from Newsletter'
                )}
              </Button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  You can resubscribe at any time by visiting our{' '}
                  <Link href="/" className="text-primary hover:underline">
                    homepage
                  </Link>{' '}
                  or{' '}
                  <Link href="/contact" className="text-primary hover:underline">
                    contacting us
                  </Link>.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card>
            <CardContent className="p-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Loading...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    }>
      <UnsubscribeForm />
    </Suspense>
  )
}
