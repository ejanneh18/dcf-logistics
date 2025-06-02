"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function ChatTest() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hello! How can I help you with your logistics needs today?" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response")
      }

      // Add assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (err) {
      console.error("Error sending message:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Chat Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4 h-[300px] overflow-y-auto p-4 border rounded-md">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.role === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"
              } max-w-[80%] ${message.role === "user" ? "ml-auto" : "mr-auto"}`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="p-3 rounded-lg bg-gray-100 max-w-[80%] mr-auto">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </CardContent>
      <CardFooter className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isLoading) {
              sendMessage()
            }
          }}
          disabled={isLoading}
        />
        <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
          Send
        </Button>
      </CardFooter>
    </Card>
  )
}
