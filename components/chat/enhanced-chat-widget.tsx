"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User, Loader2, Phone, Mail } from "lucide-react"
import { getContextualAIResponse, type ChatMessage } from "./contextual-ai-service"

const suggestedQuestions = [
  "What air freight services do you offer?",
  "How can I track my shipment?",
  "What are your shipping rates?",
  "Do you provide customs clearance?",
  "What warehousing services are available?",
]

export default function EnhancedChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! I'm Sarah from DCF Logistics. How can I help with your shipping or logistics needs today?",
      id: "welcome",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = async (message?: string) => {
    const messageToSend = message || input.trim()
    if (!messageToSend || isLoading) return

    const userMessage: ChatMessage = {
      role: "user",
      content: messageToSend,
      id: Date.now().toString(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setShowSuggestions(false)

    try {
      const response = await getContextualAIResponse([...messages, userMessage])

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response,
        id: (Date.now() + 1).toString(),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: ChatMessage = {
        role: "assistant",
        content:
          "I apologize, but I'm having trouble responding right now. Please call our 24/7 support at +220 123 456 789 for immediate assistance.",
        id: (Date.now() + 1).toString(),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 bg-primary hover:bg-primary/90"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-2xl z-40 flex flex-col bg-white border-0">
          <CardHeader className="bg-primary text-white rounded-t-lg py-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5" />
              DCF Logistics Support
              <div className="ml-auto flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={() => window.open("tel:+2201234567890")}
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={() => window.open("mailto:support@dcflogistics.com")}
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.role === "assistant" && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      {message.role === "user" && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      <div className="flex-1">
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
                        {message.timestamp && (
                          <div
                            className={`text-xs mt-1 ${message.role === "user" ? "text-white/70" : "text-gray-500"}`}
                          >
                            {formatTime(message.timestamp)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-gray-600">Sarah is typing...</span>
                  </div>
                </div>
              )}

              {/* Suggested Questions */}
              {showSuggestions && messages.length === 1 && (
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 font-medium">Suggested questions:</div>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto py-1 px-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                        onClick={() => handleSuggestionClick(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">24/7 Support: +220 123 456 789</div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
