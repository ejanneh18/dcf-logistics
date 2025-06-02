"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, RotateCcw } from "lucide-react"
import { useChat } from "./chat-provider"
import { format } from "date-fns"
import { usePathname } from "next/navigation"
import { getPageContextQuestions } from "./suggested-questions"

export function ChatWidget() {
  const { messages, isLoading, isOpen, unreadCount, sendMessage, toggleChat, clearMessages, isTyping } = useChat()
  const pathname = usePathname()

  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [showSuggestions, setShowSuggestions] = useState(true)

  // Get suggested questions based on current page and conversation context
  const suggestedQuestions = getPageContextQuestions(pathname, messages)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      const messageToSend = input.trim()
      setInput("")
      setShowSuggestions(false)
      await sendMessage(messageToSend)
    }
  }

  const handleSuggestedQuestion = async (question: string) => {
    if (!isLoading) {
      setInput("")
      setShowSuggestions(false)
      await sendMessage(question)
    }
  }

  const handleToggleChat = () => {
    toggleChat()
    if (!isOpen) {
      // Show suggestions when opening
      setShowSuggestions(true)
      // Focus input when opening
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping, showSuggestions])

  // Reset suggestions when chat is closed
  useEffect(() => {
    if (!isOpen) {
      setShowSuggestions(true)
    }
  }, [isOpen])

  // Chat toggle button
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={handleToggleChat}
          className="h-14 w-14 rounded-full shadow-lg relative bg-primary hover:bg-primary/90 transition-all duration-200"
          size="icon"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-2 -right-2 px-2 py-1 text-xs min-w-[20px] h-5 flex items-center justify-center"
              variant="destructive"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    )
  }

  // Chat window
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 md:w-96 h-[500px] shadow-xl border-gray-200 flex flex-col">
        {/* Chat header */}
        <CardHeader className="bg-primary text-primary-foreground p-3 flex flex-row justify-between items-center rounded-t-lg">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary-foreground text-primary text-sm">SA</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">DCF Logistics Support</h3>
              <p className="text-xs opacity-90">Sarah • Online</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={clearMessages}
              aria-label="Clear chat"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={handleToggleChat}
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Chat messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {/* Welcome message when no messages */}
          {messages.length === 0 && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg p-3 bg-white text-gray-800 border border-gray-200 shadow-sm">
                <p className="text-sm leading-relaxed">
                  Hi there! I'm Sarah from DCF Logistics. How can I help you today?
                </p>
                <p className="text-xs opacity-70 mt-1 text-right">{format(new Date(), "h:mm a")}</p>
              </div>
            </div>
          )}

          {/* Regular messages */}
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                <p className="text-xs opacity-70 mt-1 text-right">{format(message.timestamp, "h:mm a")}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg p-3 bg-white border border-gray-200 shadow-sm">
                <div className="flex space-x-1 items-center">
                  <span className="text-sm text-gray-600 mr-2">Sarah is typing</span>
                  <div
                    className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Suggested questions chips */}
        {suggestedQuestions.length > 0 && (
          <div className="px-3 py-2 border-t border-gray-200 bg-white overflow-x-auto">
            <div className="flex gap-2 flex-nowrap pb-1">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap text-xs py-1 px-3 h-auto rounded-full bg-gray-50 hover:bg-gray-100 border-gray-200"
                  onClick={() => handleSuggestedQuestion(question)}
                  disabled={isLoading}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Chat input */}
        <CardFooter className="p-3 border-t bg-white rounded-b-lg">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
              ref={inputRef}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
              disabled={isLoading}
              maxLength={500}
            />
            <Button
              type="submit"
              size="icon"
              className="shrink-0"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
