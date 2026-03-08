'use client'

import React from 'react'
import AIChatbot from '@/components/ai-chatbot'
import WhatsAppButton from '@/components/whatsapp-button'

interface FloatingWidgetsProps {
  showChatbot?: boolean
  showWhatsApp?: boolean
  whatsAppPosition?: 'bottom-left' | 'bottom-right'
  className?: string
}

export default function FloatingWidgets({
  showChatbot = true,
  showWhatsApp = true,
  whatsAppPosition = 'bottom-right',
  className = ''
}: FloatingWidgetsProps) {
  return (
    <div className={className}>
      {/* Stacked Floating Widgets - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {/* WhatsApp Button - Top */}
        {showWhatsApp && (
          <div className="relative z-50">
            <WhatsAppButton
              position="stacked"
              phoneNumber="+2203951020"
              message="Hello! I'm interested in DCF Logistics services. Can you help me with information about shipping rates and services?"
              className="stacked-widget"
            />
          </div>
        )}

        {/* AI Chatbot - Bottom */}
        {showChatbot && (
          <div className="relative z-40">
            <AIChatbot className="stacked-widget" />
          </div>
        )}
      </div>
    </div>
  )
}
