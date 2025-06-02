"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"

export type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

type ChatContextType = {
  messages: ChatMessage[]
  isLoading: boolean
  isOpen: boolean
  unreadCount: number
  sendMessage: (content: string) => Promise<void>
  toggleChat: () => void
  markAsRead: () => void
  clearMessages: () => void
  isTyping: boolean
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: "welcome-" + Date.now(),
      role: "assistant",
      content: "Hello! I'm Sarah from DCF Logistics. How can I help you with your shipping and logistics needs today?",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
    setUnreadCount(1)
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return

      const userMessage: ChatMessage = {
        id: "user-" + Date.now(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      }

      // Add user message immediately
      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)
      setIsTyping(true)

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to get response")
        }

        const data = await response.json()

        const assistantMessage: ChatMessage = {
          id: "assistant-" + Date.now(),
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])

        // Increment unread count if chat is closed
        if (!isOpen) {
          setUnreadCount((prev) => prev + 1)
        }
      } catch (error) {
        console.error("Error sending message:", error)

        const errorMessage: ChatMessage = {
          id: "error-" + Date.now(),
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again or contact our support team directly at +220 123 456 789.",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, errorMessage])

        if (!isOpen) {
          setUnreadCount((prev) => prev + 1)
        }
      } finally {
        setIsLoading(false)
        setIsTyping(false)
      }
    },
    [messages, isOpen],
  )

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      const newIsOpen = !prev
      if (newIsOpen) {
        setUnreadCount(0)
      }
      return newIsOpen
    })
  }, [])

  const markAsRead = useCallback(() => {
    setUnreadCount(0)
  }, [])

  const clearMessages = useCallback(() => {
    const welcomeMessage: ChatMessage = {
      id: "welcome-" + Date.now(),
      role: "assistant",
      content: "Hello! I'm Sarah from DCF Logistics. How can I help you with your shipping and logistics needs today?",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
    setUnreadCount(0)
  }, [])

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        isOpen,
        unreadCount,
        sendMessage,
        toggleChat,
        markAsRead,
        clearMessages,
        isTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
