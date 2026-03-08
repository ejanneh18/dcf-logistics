'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2
} from 'lucide-react'

interface ChatMessage {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface ChatbotProps {
  className?: string
}

export default function AIChatbot({ className = '' }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        type: 'bot',
        content: "Hello! I'm DCF Assistant, your logistics support bot. I can help you with information about our services, pricing, tracking, and more. How can I assist you today?",
        timestamp: new Date(),
        suggestions: [
          "What services do you offer?",
          "How can I get a quote?",
          "Track my shipment",
          "Contact information"
        ]
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, isMinimized])

  const generateBotResponse = (userMessage: string): ChatMessage => {
    const message = userMessage.toLowerCase()
    let response = ""
    let suggestions: string[] = []
    // Enhanced response tracking for better fallback logic

    // Enhanced keyword matching with better context understanding
    const keywords = {
      services: ['service', 'what do you do', 'what do you offer', 'services offered', 'logistics services'],
      pricing: ['price', 'cost', 'rate', 'quote', 'pricing', 'how much', 'charges', 'fees', 'tariff'],
      tracking: ['track', 'tracking', 'shipment', 'delivery', 'status', 'where is my', 'location'],
      contact: ['contact', 'phone', 'email', 'address', 'reach you', 'call you', 'office'],
      timing: ['time', 'how long', 'duration', 'delivery time', 'shipping time', 'when will'],
      documentation: ['document', 'paperwork', 'papers', 'requirements', 'customs', 'clearance'],
      airfreight: ['air freight', 'air cargo', 'flight', 'airplane', 'aviation', 'express'],
      seafreight: ['sea freight', 'ocean', 'ship', 'vessel', 'container', 'bulk'],
      customs: ['customs', 'import', 'export', 'duties', 'taxes', 'clearance', 'border'],
      warehousing: ['warehouse', 'storage', 'store', 'inventory', 'distribution']
    }

    // Check for keyword matches with better context understanding
    const matchKeywords = (text: string, keywordList: string[]) => {
      return keywordList.some(keyword => text.includes(keyword))
    }

    // Service-related queries
    if (matchKeywords(message, keywords.services)) {
      response = "DCF Logistics is The Gambia's premier clearing and forwarding agency, offering comprehensive logistics services:\n\n🚛 **Our Services:**\n• Air Freight (Express & Standard)\n• Sea Freight (Container & Bulk)\n• Customs Clearance & Documentation\n• Warehousing & Storage\n• Cross-border Transportation\n• Freight Forwarding\n\n📍 **Coverage:** The Gambia and West Africa\n⏰ **Experience:** 14+ years in logistics\n\nWould you like details about any specific service?"
      suggestions = ["Air freight rates", "Sea freight options", "Customs clearance", "Get a quote", "Our locations"]
    }
    // Pricing and quotes
    else if (matchKeywords(message, keywords.pricing)) {
      response = "💰 **Pricing & Quotes:**\n\nI'd be happy to help you with pricing information! Our rates are competitive and depend on several factors:\n\n📊 **Pricing Factors:**\n• Weight and dimensions\n• Origin and destination\n• Service type (air/sea)\n• Urgency level\n• Special handling requirements\n\n🔧 **Get Your Quote:**\n• Use our Shipping Calculator for instant estimates\n• Fill out our detailed Quote Request form\n• Contact our team for personalized pricing\n\n💡 **Tip:** Sea freight is more economical for large shipments, while air freight is faster for urgent deliveries."
      suggestions = ["Calculate shipping cost", "Request detailed quote", "Air freight rates", "Sea freight rates", "Contact sales team"]
    }
    // Tracking queries
    else if (matchKeywords(message, keywords.tracking)) {
      response = "📦 **Shipment Tracking:**\n\nTrack your shipment easily with DCF Logistics!\n\n🔍 **How to Track:**\n1. Visit our Tracking page\n2. Enter your DCF tracking number (format: DCF123456789)\n3. Get real-time updates on location and status\n\n📱 **Track Anywhere:**\n• Online tracking portal\n• Mobile-friendly interface\n• Real-time status updates\n• Delivery notifications\n\n❓ **Need Help?**\nIf you don't have your tracking number or need assistance, our customer service team is ready to help!"
      suggestions = ["Go to tracking page", "Contact customer service", "Delivery timeframes", "Lost tracking number"]
    }
    // Contact information
    else if (matchKeywords(message, keywords.contact)) {
      response = "📞 **Contact DCF Logistics:**\n\nWe're here to help! Reach us through multiple channels:\n\n🏢 **Main Office:**\n📍 IC PLAZA Cooperative Junction Westfield Serekunda, The Gambia\n📞 Phone: +220 395 1020\n📧 Email: info@dcfagency.com\n\n🕒 **Business Hours:**\n• Monday - Friday: 8:00 AM - 6:00 PM GMT\n• Saturday: 9:00 AM - 2:00 PM GMT\n• Sunday: Closed\n\n💬 **Quick Contact:**\n• WhatsApp: +220 395 1020\n• Emergency support available\n\n🌍 **We serve:** The Gambia and West Africa"
      suggestions = ["Call now", "WhatsApp chat", "Send email", "Get directions", "Emergency contact"]
    }
    // Shipping times
    else if (message.includes('time') || message.includes('how long') || message.includes('duration')) {
      response = "Typical shipping timeframes:\n\n✈️ Air Express: 1-2 days\n✈️ Air Standard: 3-5 days\n🚢 Sea Freight: 15-25 days\n🚛 Road Transport: 5-10 days\n\nActual times may vary based on destination, customs clearance, and other factors."
      suggestions = ["Calculate shipping time", "Express options", "Customs delays", "Track shipment"]
    }
    // Documentation
    else if (message.includes('document') || message.includes('paperwork') || message.includes('customs')) {
      response = "Required shipping documents typically include:\n\n• Commercial Invoice\n• Packing List\n• Bill of Lading/Airway Bill\n• Customs Declaration\n• Certificate of Origin (if required)\n• Insurance Certificate (if applicable)\n\nOur team can help you prepare all necessary documentation."
      suggestions = ["Document checklist", "Customs requirements", "Help with paperwork", "Contact documentation team"]
    }
    // Air freight specific
    else if (matchKeywords(message, keywords.airfreight)) {
      response = "✈️ **Air Freight Services:**\n\nFast and reliable air cargo solutions:\n\n🚀 **Express Air Freight:**\n• 1-2 days delivery\n• Priority handling\n• Ideal for urgent shipments\n\n📦 **Standard Air Freight:**\n• 3-5 days delivery\n• Cost-effective option\n• Regular scheduled flights\n\n🌍 **Coverage:** Worldwide destinations\n📋 **We Handle:** Documents, parcels, commercial cargo\n🔒 **Security:** Full cargo insurance available"
      suggestions = ["Air freight rates", "Express vs standard", "Get air freight quote", "Track air shipment"]
    }
    // Sea freight specific
    else if (matchKeywords(message, keywords.seafreight)) {
      response = "🚢 **Sea Freight Services:**\n\nEconomical ocean shipping solutions:\n\n📦 **Container Shipping:**\n• Full Container Load (FCL)\n• Less than Container Load (LCL)\n• 20ft and 40ft containers\n\n🚛 **Bulk Cargo:**\n• Large volume shipments\n• Specialized handling\n• Cost-effective for heavy goods\n\n⏱️ **Transit Time:** 15-25 days (varies by destination)\n💰 **Best For:** Large, non-urgent shipments"
      suggestions = ["Sea freight rates", "Container options", "Get sea freight quote", "Transit times"]
    }
    // Customs and documentation
    else if (matchKeywords(message, keywords.customs) || matchKeywords(message, keywords.documentation)) {
      response = "📋 **Customs & Documentation:**\n\nWe handle all your customs clearance needs:\n\n📄 **Required Documents:**\n• Commercial Invoice\n• Packing List\n• Bill of Lading/Airway Bill\n• Customs Declaration\n• Certificate of Origin (if required)\n\n🛃 **Our Services:**\n• Complete customs clearance\n• Duty and tax payments\n• Import/export procedures\n• Compliance assistance\n\n✅ **We Ensure:** Fast clearance, compliance with all regulations"
      suggestions = ["Document checklist", "Customs procedures", "Duty calculations", "Import requirements"]
    }
    // Shipping times
    else if (matchKeywords(message, keywords.timing)) {
      response = "⏰ **Shipping Timeframes:**\n\nTypical delivery times for our services:\n\n✈️ **Air Freight:**\n• Express: 1-2 days\n• Standard: 3-5 days\n\n🚢 **Sea Freight:**\n• Container: 15-25 days\n• Bulk cargo: 20-30 days\n\n🚛 **Road Transport:**\n• Regional: 5-10 days\n• Local: 1-3 days\n\n⚠️ **Note:** Times may vary based on destination, customs clearance, and other factors."
      suggestions = ["Calculate delivery time", "Express options", "Track shipment", "Customs delays"]
    }
    // Greetings
    else if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon')) {
      response = "Hello! 👋 Welcome to DCF Logistics!\n\nI'm your AI assistant, ready to help you with all your logistics needs across The Gambia and West Africa.\n\n🚛 **I can help you with:**\n• Service information\n• Pricing and quotes\n• Shipment tracking\n• Contact details\n• Shipping procedures\n\nWhat can I assist you with today?"
      suggestions = ["Our services", "Get a quote", "Track shipment", "Contact information", "Shipping rates"]
    }
    // Fallback response with professional acknowledgment
    else {
      response = "🤔 **I'd love to help, but I need more information!**\n\nI'm specialized in DCF Logistics services, but I might not have the specific information you're looking for.\n\n💡 **For questions outside my knowledge scope, please:**\n\n📞 **Contact our expert team:**\n• Phone: +220 395 1020\n• Email: info@dcfagency.com\n• WhatsApp: +220 395 1020\n\n🕒 **Business Hours:** Mon-Fri 8AM-6PM GMT\n\n🚛 **I can definitely help with:**\n• Logistics services\n• Shipping rates and quotes\n• Tracking shipments\n• Documentation requirements"
      suggestions = ["Our services", "Contact support team", "Get a quote", "Track shipment", "WhatsApp support"]
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      suggestions
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue)
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    setTimeout(() => handleSendMessage(), 100)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getPositionClasses = () => {
    // When used in stacked layout, don't apply fixed positioning
    if (className?.includes('stacked-widget')) {
      return ''
    }
    return 'fixed bottom-6 right-6 z-50'
  }

  if (!isOpen) {
    return (
      <div className={`${getPositionClasses()} ${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className={`${getPositionClasses()} ${className}`} style={{ pointerEvents: 'auto' }}>
      <Card className={`w-80 sm:w-96 shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-96'}`}>
        <CardHeader className="p-4 bg-primary text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">DCF Assistant</CardTitle>
                <p className="text-xs text-white/80">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {message.type === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.type === 'user' 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs h-6 px-2 rounded-full"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-3 w-3" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                  className="px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
