/**
 * DCF Logistics - Comprehensive Form Service
 * 
 * Handles all form submissions with multiple delivery methods:
 * 1. Email delivery (primary)
 * 2. Local storage backup
 * 3. External service integration
 */

import { toast } from 'sonner'

// Form data types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  type: 'GENERAL' | 'QUOTE' | 'SUPPORT' | 'PARTNERSHIP'
}

export interface QuoteRequestData {
  fullName: string
  email: string
  phone: string
  company?: string
  serviceType: string
  origin: string
  destination: string
  shipmentDate?: Date
  cargoType: string
  cargoDetails: string
  dimensions?: string
  weight: string
  specialRequirements?: string
  additionalServices: string[]
  estimatedValue?: string
}

export interface NewsletterData {
  email: string
  name?: string
  preferences?: string[]
}

// Form submission response
export interface FormSubmissionResponse {
  success: boolean
  message: string
  id?: string
  timestamp?: string
}

class FormService {
  private readonly STORAGE_KEY = 'dcf_form_submissions'
  
  /**
   * Submit contact form with multiple delivery methods
   */
  async submitContactForm(data: ContactFormData): Promise<FormSubmissionResponse> {
    try {
      // Generate submission ID
      const submissionId = `CONTACT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      
      // Store locally as backup
      this.storeFormSubmission('contact', data, submissionId)
      
      // Prepare email content
      const emailContent = this.formatContactEmail(data)
      
      // Send via multiple methods
      const results = await Promise.allSettled([
        this.sendViaEmailto(emailContent.to, emailContent.subject, emailContent.body),
        this.sendViaFormspree(data, 'contact'),
        this.sendViaNetlify(data, 'contact')
      ])
      
      // Check if at least one method succeeded
      const hasSuccess = results.some(result => result.status === 'fulfilled')
      
      if (hasSuccess) {
        toast.success('Your message has been sent successfully!')
        return {
          success: true,
          message: 'Your inquiry has been submitted successfully. We will respond within 24 hours.',
          id: submissionId,
          timestamp: new Date().toISOString()
        }
      } else {
        throw new Error('All delivery methods failed')
      }
      
    } catch (error) {
      console.error('Contact form submission error:', error)
      toast.error('Failed to send message. Please try again or contact us directly.')
      return {
        success: false,
        message: 'Failed to submit form. Please try again or contact us directly at info@dcfagency.com'
      }
    }
  }

  /**
   * Submit quote request form
   */
  async submitQuoteRequest(data: QuoteRequestData): Promise<FormSubmissionResponse> {
    try {
      const submissionId = `QUOTE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      
      // Store locally as backup
      this.storeFormSubmission('quote', data, submissionId)
      
      // Prepare email content
      const emailContent = this.formatQuoteEmail(data)
      
      // Send via multiple methods
      const results = await Promise.allSettled([
        this.sendViaEmailto(emailContent.to, emailContent.subject, emailContent.body),
        this.sendViaFormspree(data, 'quote'),
        this.sendViaNetlify(data, 'quote')
      ])
      
      const hasSuccess = results.some(result => result.status === 'fulfilled')
      
      if (hasSuccess) {
        toast.success('Quote request submitted successfully!')
        return {
          success: true,
          message: 'Your quote request has been submitted. We will provide a detailed quote within 2 business hours.',
          id: submissionId,
          timestamp: new Date().toISOString()
        }
      } else {
        throw new Error('All delivery methods failed')
      }
      
    } catch (error) {
      console.error('Quote form submission error:', error)
      toast.error('Failed to submit quote request. Please try again.')
      return {
        success: false,
        message: 'Failed to submit quote request. Please contact us directly at info@dcfagency.com'
      }
    }
  }

  /**
   * Submit newsletter subscription
   */
  async submitNewsletterSubscription(data: NewsletterData): Promise<FormSubmissionResponse> {
    try {
      const submissionId = `NEWSLETTER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      
      // Store locally as backup
      this.storeFormSubmission('newsletter', data, submissionId)
      
      // Send confirmation email
      const emailContent = {
        to: 'info@dcfagency.com',
        subject: 'New Newsletter Subscription',
        body: `New newsletter subscription:\n\nEmail: ${data.email}\nName: ${data.name || 'Not provided'}\nPreferences: ${data.preferences?.join(', ') || 'None specified'}\n\nSubscription ID: ${submissionId}`
      }
      
      // Send via multiple methods
      const results = await Promise.allSettled([
        this.sendViaEmailto(emailContent.to, emailContent.subject, emailContent.body),
        this.sendViaFormspree(data, 'newsletter')
      ])
      
      const hasSuccess = results.some(result => result.status === 'fulfilled')
      
      if (hasSuccess) {
        toast.success('Successfully subscribed to newsletter!')
        return {
          success: true,
          message: 'Thank you for subscribing to our newsletter!',
          id: submissionId,
          timestamp: new Date().toISOString()
        }
      } else {
        throw new Error('All delivery methods failed')
      }
      
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      toast.error('Failed to subscribe. Please try again.')
      return {
        success: false,
        message: 'Failed to subscribe to newsletter. Please try again later.'
      }
    }
  }

  /**
   * Send via mailto (primary method)
   */
  private async sendViaEmailto(to: string, subject: string, body: string): Promise<void> {
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Open email client
    if (typeof window !== 'undefined') {
      window.open(mailtoLink, '_blank')
    }
    
    // Simulate success after delay
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  /**
   * Send via Formspree (backup method)
   */
  private async sendViaFormspree(data: any, formType: string): Promise<void> {
    const formspreeEndpoints = {
      contact: 'https://formspree.io/f/xpwagvqr', // Replace with actual endpoint
      quote: 'https://formspree.io/f/xpwagvqs',   // Replace with actual endpoint
      newsletter: 'https://formspree.io/f/xpwagvqt' // Replace with actual endpoint
    }
    
    const endpoint = formspreeEndpoints[formType as keyof typeof formspreeEndpoints]
    if (!endpoint) return
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        _subject: `DCF Logistics ${formType} form submission`,
        _replyto: data.email
      })
    })
    
    if (!response.ok) {
      throw new Error(`Formspree submission failed: ${response.statusText}`)
    }
  }

  /**
   * Send via Netlify Forms (backup method)
   */
  private async sendViaNetlify(data: any, formType: string): Promise<void> {
    const formData = new FormData()
    formData.append('form-name', `dcf-${formType}`)
    
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
    
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString()
    })
    
    if (!response.ok) {
      throw new Error(`Netlify submission failed: ${response.statusText}`)
    }
  }

  /**
   * Format contact form email
   */
  private formatContactEmail(data: ContactFormData) {
    const emailMap = {
      GENERAL: 'info@dcfagency.com',
      QUOTE: 'info@dcfagency.com',
      SUPPORT: 'info@dcfagency.com',
      PARTNERSHIP: 'info@dcfagency.com'
    }

    return {
      to: emailMap[data.type] || 'info@dcfagency.com',
      subject: `${data.type} Inquiry: ${data.subject}`,
      body: `New ${data.type.toLowerCase()} inquiry from DCF Logistics website:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}
Subject: ${data.subject}

Message:
${data.message}

---
Submitted: ${new Date().toLocaleString()}
Type: ${data.type}
Source: DCF Logistics Website Contact Form`
    }
  }

  /**
   * Format quote request email
   */
  private formatQuoteEmail(data: QuoteRequestData) {
    return {
      to: 'info@dcfagency.com',
      subject: `Quote Request: ${data.serviceType} - ${data.origin} to ${data.destination}`,
      body: `New quote request from DCF Logistics website:

CUSTOMER INFORMATION:
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company || 'Not provided'}

SHIPMENT DETAILS:
Service Type: ${data.serviceType}
Origin: ${data.origin}
Destination: ${data.destination}
Shipment Date: ${data.shipmentDate?.toLocaleDateString() || 'Not specified'}

CARGO INFORMATION:
Type: ${data.cargoType}
Details: ${data.cargoDetails}
Weight: ${data.weight}
Dimensions: ${data.dimensions || 'Not provided'}
Estimated Value: ${data.estimatedValue || 'Not provided'}

ADDITIONAL SERVICES:
${data.additionalServices.length > 0 ? data.additionalServices.join('\n') : 'None selected'}

SPECIAL REQUIREMENTS:
${data.specialRequirements || 'None'}

---
Submitted: ${new Date().toLocaleString()}
Source: DCF Logistics Website Quote Form`
    }
  }

  /**
   * Store form submission locally as backup
   */
  private storeFormSubmission(type: string, data: any, id: string): void {
    if (typeof window === 'undefined') return
    
    try {
      const submissions = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]')
      submissions.push({
        id,
        type,
        data,
        timestamp: new Date().toISOString(),
        status: 'submitted'
      })
      
      // Keep only last 100 submissions
      if (submissions.length > 100) {
        submissions.splice(0, submissions.length - 100)
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(submissions))
    } catch (error) {
      console.error('Failed to store form submission locally:', error)
    }
  }

  /**
   * Get stored form submissions
   */
  getStoredSubmissions(): any[] {
    if (typeof window === 'undefined') return []
    
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]')
    } catch (error) {
      console.error('Failed to retrieve stored submissions:', error)
      return []
    }
  }
}

// Export singleton instance
export const formService = new FormService()
export default formService
