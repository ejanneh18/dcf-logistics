import { type NextRequest, NextResponse } from "next/server"
import { getContextualAIResponse, type ChatMessage } from "@/components/chat/contextual-ai-service"

// Required for Next.js 15 App Router
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Store conversation history in memory (in production, use a database)
const conversationHistory: Record<string, ChatMessage[]> = {}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, sessionId = "default" }: { messages: ChatMessage[]; sessionId?: string } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    // Get the latest user message
    const latestMessage = messages[messages.length - 1]
    if (!latestMessage || latestMessage.role !== "user") {
      return NextResponse.json({ error: "No user message found" }, { status: 400 })
    }

    console.log(`Processing request for session ${sessionId}, message: ${latestMessage.content.substring(0, 50)}...`)

    // Store or update conversation history
    conversationHistory[sessionId] = messages

    // Use the contextual AI service with comprehensive website grounding
    const response = await getContextualAIResponse(messages)

    console.log(`Generated response for session ${sessionId}: ${response.substring(0, 50)}...`)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Chat API error:", error)

    // Even error responses reference website content
    return NextResponse.json(
      {
        response: `I apologize for the technical difficulty. For immediate assistance, please contact our 24/7 support team at +220 123 456 789 or email support@dcflogistics.com.

Our customer service team can provide detailed information about all DCF Logistics services including air freight, ground transportation, customs clearance, warehousing, and tracking.

You can also visit these pages for immediate information:
• /services - Complete service overview
• /tracking - Shipment tracking
• /quote - Request pricing
• /contact - Contact information`,
      },
      { status: 500 },
    )
  }
}
