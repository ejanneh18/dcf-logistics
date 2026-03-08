'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MessageCircle, X, Phone, Clock, Send, Minimize2, Maximize2 } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

interface WhatsAppButtonProps {
  className?: string
  phoneNumber?: string
  message?: string
  position?: 'bottom-left' | 'bottom-right' | 'stacked'
}

interface WhatsAppChatProps {
  phoneNumber: string
  onClose: () => void
  isMinimized: boolean
  onToggleMinimize: () => void
}

// WhatsApp Chat Component
function WhatsAppChat({ phoneNumber, onClose, isMinimized, onToggleMinimize }: WhatsAppChatProps) {
  const [message, setMessage] = useState('')
  const [isBusinessHours, setIsBusinessHours] = useState(true)

  // Check business hours
  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date()
      const day = now.getDay()
      const hour = now.getHours()
      const isWeekday = day >= 1 && day <= 5
      const isWorkingHour = hour >= 8 && hour < 18
      setIsBusinessHours(isWeekday && isWorkingHour)
    }

    checkBusinessHours()
    const interval = setInterval(checkBusinessHours, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    setMessage('')
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickMessages = [
    "I need a shipping quote",
    "Track my shipment",
    "Customs clearance help",
    "Air freight rates",
    "Sea freight options"
  ]

  return (
    <Card className={`w-80 sm:w-96 shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-auto max-h-96'}`}>
      <CardHeader className="p-4 bg-green-600 text-white rounded-t-lg flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <FaWhatsapp className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">DCF Logistics</CardTitle>
              <p className="text-xs text-white/80">
                {isBusinessHours ? 'Online • Ready to help' : 'We\'ll reply soon'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleMinimize}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col max-h-80 overflow-hidden">
          {/* Welcome Message */}
          <div className="p-4 bg-gray-50 border-b flex-shrink-0">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <FaWhatsapp className="h-3 w-3 text-white" />
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm flex-1">
                <p className="text-sm text-gray-800">
                  Hello! 👋 Welcome to DCF Logistics WhatsApp support.
                  Type your message below and click send to open WhatsApp.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Business Hours: Mon-Fri 8AM-6PM GMT
                </p>
              </div>
            </div>
          </div>

          {/* Quick Messages */}
          <div className="p-4 flex-1 overflow-y-auto">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Messages:</h4>
            <div className="space-y-2">
              {quickMessages.map((msg, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setMessage(msg)}
                  className="w-full justify-start text-left h-auto py-2 px-3 text-xs"
                >
                  {msg}
                </Button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t bg-gray-50 flex-shrink-0">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                size="sm"
                className="bg-green-600 hover:bg-green-700 px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Click send to open WhatsApp with your message
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default function WhatsAppButton({
  className = '',
  phoneNumber = '+2203951020', // DCF Logistics WhatsApp number
  message = "Hello! I'm interested in your logistics services. Can you help me?",
  position = 'bottom-left'
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [isBusinessHours, setIsBusinessHours] = useState(true)



  // Check business hours (8 AM - 6 PM GMT, Monday-Friday)
  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date()
      const day = now.getDay() // 0 = Sunday, 1 = Monday, etc.
      const hour = now.getHours()
      
      // Monday to Friday (1-5), 8 AM to 6 PM
      const isWeekday = day >= 1 && day <= 5
      const isWorkingHour = hour >= 8 && hour < 18
      
      setIsBusinessHours(isWeekday && isWorkingHour)
    }

    checkBusinessHours()
    const interval = setInterval(checkBusinessHours, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  // Show tooltip after 3 seconds on first visit
  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem('dcf-whatsapp-tooltip-seen')
    if (!hasSeenTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(true)
        localStorage.setItem('dcf-whatsapp-tooltip-seen', 'true')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(true)
    setShowTooltip(false)
  }

  const getPositionClasses = () => {
    // When used in stacked layout, don't apply fixed positioning
    if (position === 'stacked' || className?.includes('stacked-widget')) {
      return ''
    }

    switch (position) {
      case 'bottom-left':
        return 'fixed bottom-6 left-6 z-40'
      case 'bottom-right':
        return 'fixed bottom-6 right-6 z-40'
      default:
        return 'fixed bottom-6 left-6 z-40'
    }
  }

  if (isOpen) {
    return (
      <div className={`${getPositionClasses()} ${className}`} style={{ pointerEvents: 'auto' }}>
        <WhatsAppChat
          phoneNumber={phoneNumber}
          onClose={() => setIsOpen(false)}
          isMinimized={isMinimized}
          onToggleMinimize={() => setIsMinimized(!isMinimized)}
        />
      </div>
    )
  }

  return (
    <div className={`${getPositionClasses()} ${className}`} style={{ pointerEvents: 'auto' }}>
      {/* Tooltip */}
      {showTooltip && (
        <Card className="absolute bottom-16 left-0 w-64 shadow-lg animate-in slide-in-from-bottom-2 duration-300">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <FaWhatsapp className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">DCF Logistics</h4>
                    <p className="text-xs text-gray-500">
                      {isBusinessHours ? 'Online now' : 'We\'ll reply soon'}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Need help with logistics? Chat with us on WhatsApp for quick assistance!
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>Mon-Fri: 8AM-6PM GMT</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTooltip(false)}
                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* WhatsApp Button */}
      <div
        className="relative z-50 cursor-pointer"
        onClick={handleWhatsAppClick}
        style={{ pointerEvents: 'auto' }}
      >
        {/* Ripple effect - Behind button */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 pointer-events-none"></div>

        <Button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          size="lg"
          className="relative z-10 rounded-full h-14 w-14 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
          style={{ pointerEvents: 'auto', touchAction: 'manipulation' }}
        >
          <FaWhatsapp className="h-6 w-6 text-white" />
        </Button>

        {/* Online indicator */}
        <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white transition-colors duration-300 z-20 pointer-events-none ${
          isBusinessHours ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
        }`}></div>

        {/* Hover tooltip */}
        {isHovered && !showTooltip && !isOpen && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-2 px-3 rounded-lg whitespace-nowrap animate-in fade-in-0 duration-200 z-30 pointer-events-none">
            Chat on WhatsApp
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  )
}

// Quick contact component for emergency situations
export function WhatsAppQuickContact({ 
  className = '',
  variant = 'button' 
}: { 
  className?: string
  variant?: 'button' | 'link' | 'card'
}) {
  const phoneNumber = '+2203951020'
  const emergencyMessage = "🚨 URGENT: I need immediate assistance with my shipment. Please contact me as soon as possible."

  const handleEmergencyContact = () => {
    const encodedMessage = encodeURIComponent(emergencyMessage)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  if (variant === 'link') {
    return (
      <button
        onClick={handleEmergencyContact}
        className={`inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors ${className}`}
      >
        <FaWhatsapp className="h-4 w-4" />
        <span>WhatsApp Support</span>
      </button>
    )
  }

  if (variant === 'card') {
    return (
      <Card className={`hover:shadow-md transition-shadow cursor-pointer ${className}`} onClick={handleEmergencyContact}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <FaWhatsapp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">WhatsApp Support</h3>
              <p className="text-xs text-gray-600">Get instant help via WhatsApp</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Button
      onClick={handleEmergencyContact}
      variant="outline"
      className={`bg-green-50 border-green-200 text-green-700 hover:bg-green-100 ${className}`}
    >
      <FaWhatsapp className="h-4 w-4 mr-2" />
      WhatsApp Support
    </Button>
  )
}
