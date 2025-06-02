import { ChatTest } from "@/components/chat/chat-test"

export default function ChatTestPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Chat Functionality Test</h1>
      <p className="text-center mb-8">
        This page allows you to test the AI-powered chat functionality using the configured API keys.
      </p>
      <ChatTest />
    </div>
  )
}
