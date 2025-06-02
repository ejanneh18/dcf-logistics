import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { getRelevantContent } from "@/lib/content-indexer"

export type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

// Prioritize Gemini 2.0 Flash model
async function getAIModel() {
  // First priority: Gemini 2.0 Flash
  if (process.env.GEMINI_API_KEY) {
    try {
      // Try to use Google AI SDK for Gemini
      const { google } = await import("@ai-sdk/google")
      console.log("Using Gemini 2.0 Flash model")
      return google("gemini-2.0-flash-exp", {
        apiKey: process.env.GEMINI_API_KEY,
      })
    } catch (error) {
      console.warn("Gemini 2.0 Flash not available, trying standard Gemini:", error)
      try {
        const { google } = await import("@ai-sdk/google")
        console.log("Using Gemini Pro model")
        return google("gemini-pro", {
          apiKey: process.env.GEMINI_API_KEY,
        })
      } catch (fallbackError) {
        console.warn("Gemini models not available, falling back to OpenAI:", fallbackError)
      }
    }
  }

  // Fallback to OpenAI if Gemini is not available
  if (process.env.OPENAI_API_KEY) {
    console.log("Using OpenAI GPT-3.5-turbo model")
    return openai("gpt-3.5-turbo", {
      apiKey: process.env.OPENAI_API_KEY,
    })
  }

  // If no API keys are available, throw an error
  throw new Error("No AI provider API keys available")
}

export async function getAIResponse(messages: ChatMessage[]) {
  try {
    console.log("Processing AI request with", messages.length, "messages")

    // Get the latest user message
    const latestUserMessage = [...messages].reverse().find((msg) => msg.role === "user")?.content || ""
    console.log("Latest user message:", latestUserMessage)

    // Retrieve relevant content from the website based on the user's query
    const relevantContent = getRelevantContent(latestUserMessage)
    console.log("Retrieved relevant content length:", relevantContent.length)

    // Get the appropriate AI model
    const model = await getAIModel()

    const { text } = await generateText({
      model,
      prompt: createPrompt(messages, relevantContent),
      temperature: 0.7,
      maxTokens: 500,
    })

    console.log("AI response generated successfully")
    return text
  } catch (error) {
    console.error("Error getting AI response:", error)

    // Return a contextual fallback response based on the user's query
    return getFallbackResponse(messages[messages.length - 1]?.content || "")
  }
}

function createPrompt(messages: ChatMessage[], relevantContent: string): string {
  const systemContext = `
You are Sarah, a professional customer service representative at DCF Logistics, a leading global logistics company. You are knowledgeable, helpful, and always maintain a professional yet friendly tone.

DCF LOGISTICS SERVICES:
- Air Freight: Fast, reliable international air cargo services with real-time tracking
- Haulage & Transportation: Comprehensive ground transportation and last-mile delivery
- Customs Clearance: Expert customs brokerage with full documentation support
- Cross-Border Logistics: Seamless international shipping and trade facilitation
- Regulatory Compliance: Ensuring full adherence to international trade regulations
- Logistics Consultancy: Strategic logistics planning and supply chain optimization
- Freight Forwarding: End-to-end freight management and coordination
- Warehousing: Secure storage facilities with advanced inventory management
- Customs Brokerage: Professional customs clearance and trade compliance

YOUR ROLE:
- Provide accurate, helpful information about DCF Logistics services
- Use the website content below to give specific, detailed answers
- For tracking inquiries, explain the process and direct to tracking tools
- For pricing questions, guide users to quote request forms or calculators
- For complex issues, offer to connect with specialists
- Always maintain DCF Logistics' professional standards

WEBSITE CONTENT FOR REFERENCE:
${relevantContent}

IMPORTANT: Base your responses on the provided website content when possible. If the content doesn't fully address a question, acknowledge this and offer to connect the customer with a specialist.
`

  const conversationHistory = messages
    .slice(-6) // Keep last 6 messages for context
    .map((msg) => `${msg.role === "user" ? "Customer" : "Sarah"}: ${msg.content}`)
    .join("\n")

  return `${systemContext}\n\nConversation History:\n${conversationHistory}\n\nSarah:`
}

function getFallbackResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()

  if (message.includes("track") || message.includes("tracking") || message.includes("shipment")) {
    return "I'd be happy to help you track your shipment! To provide accurate tracking information, I'll need your tracking number. You can also visit our tracking page where you can enter your tracking number to get real-time updates on your shipment's location and delivery status."
  }

  if (message.includes("quote") || message.includes("price") || message.includes("cost") || message.includes("rate")) {
    return "I can help you get a competitive quote for your shipping needs! Please visit our quote request page where you can provide details about your shipment including origin, destination, dimensions, and weight. Our team will provide you with a detailed quote within 24 hours. You can also use our shipping calculator for instant estimates."
  }

  if (
    message.includes("service") ||
    message.includes("freight") ||
    message.includes("shipping") ||
    message.includes("logistics")
  ) {
    return "DCF Logistics offers comprehensive logistics solutions including Air Freight for fast international shipping, Ground Transportation for domestic delivery, Customs Clearance for international trade, Cross-Border Logistics, Warehousing services, and expert Logistics Consultancy. Which service would you like to know more about?"
  }

  if (
    message.includes("contact") ||
    message.includes("support") ||
    message.includes("help") ||
    message.includes("phone")
  ) {
    return "I'm here to help! You can reach our support team 24/7 through this chat, visit our contact page for multiple contact options, or call our customer service line. For specialized logistics inquiries, I can connect you with one of our logistics experts who can provide detailed assistance tailored to your needs."
  }

  if (message.includes("warehouse") || message.includes("storage") || message.includes("distribution")) {
    return "Our warehousing services include secure storage facilities, inventory management, order fulfillment, and distribution services. We offer both short-term and long-term storage solutions with advanced security systems and climate-controlled environments. Would you like more details about our warehouse locations or services?"
  }

  return "Thank you for contacting DCF Logistics! I'm Sarah, and I'm here to assist you with any questions about our logistics services, shipment tracking, quotes, or general inquiries. How can I help you today?"
}
