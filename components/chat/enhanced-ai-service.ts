import { generateText } from "ai"
import { findRelevantContent, type KnowledgeSection } from "@/lib/website-knowledge-base"

export type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

// Enhanced AI service with comprehensive website knowledge
export async function getEnhancedAIResponse(messages: ChatMessage[]): Promise<string> {
  try {
    // Get the latest user message
    const latestUserMessage = messages[messages.length - 1]?.content || ""

    // Find relevant content from our comprehensive knowledge base
    const relevantSections = findRelevantContent(latestUserMessage, 3)

    // If we have Gemini API key, use AI with enhanced context
    if (process.env.GEMINI_API_KEY) {
      try {
        const { google } = await import("@ai-sdk/google")
        const model = google("gemini-pro", {
          apiKey: process.env.GEMINI_API_KEY,
        })

        const enhancedPrompt = createEnhancedPrompt(messages, relevantSections)

        const { text } = await generateText({
          model,
          prompt: enhancedPrompt,
          temperature: 0.7,
          maxTokens: 600,
        })

        return text
      } catch (error) {
        console.warn("Gemini API error, using enhanced fallback:", error)
      }
    }

    // Enhanced fallback with comprehensive knowledge
    return getEnhancedFallbackResponse(latestUserMessage, relevantSections)
  } catch (error) {
    console.error("Enhanced AI service error:", error)
    return getBasicFallbackResponse(messages[messages.length - 1]?.content || "")
  }
}

function createEnhancedPrompt(messages: ChatMessage[], relevantSections: KnowledgeSection[]): string {
  const contextContent = relevantSections.map((section) => `${section.title}:\n${section.content}`).join("\n\n")

  const conversationHistory = messages
    .slice(-6)
    .map((msg) => `${msg.role === "user" ? "Customer" : "Sarah"}: ${msg.content}`)
    .join("\n")

  return `You are Sarah, a professional and knowledgeable customer service representative at DCF Logistics, a leading global logistics company. You have comprehensive knowledge of all our services and can provide detailed, accurate information.

COMPANY OVERVIEW:
DCF Logistics is a global logistics company providing comprehensive shipping and supply chain solutions including Air Freight, Ground Transportation, Customs Clearance, Cross-Border Logistics, Warehousing, and Freight Forwarding services.

YOUR ROLE:
- Provide accurate, detailed information about DCF Logistics services
- Use the comprehensive knowledge base below to answer questions
- Be helpful, professional, and solution-oriented
- Offer specific next steps and actionable advice
- Reference relevant services and features when appropriate

COMPREHENSIVE KNOWLEDGE BASE:
${contextContent}

GUIDELINES:
- Always maintain a professional, friendly tone
- Provide specific details when available
- Offer to connect customers with specialists for complex needs
- Reference contact information when appropriate (+220 123 456 789)
- Suggest relevant services based on customer needs
- Use the knowledge base to provide accurate, detailed responses

CONVERSATION HISTORY:
${conversationHistory}

Sarah:`
}

function getEnhancedFallbackResponse(userMessage: string, relevantSections: KnowledgeSection[]): string {
  const message = userMessage.toLowerCase()

  // If we have relevant sections, use them for a detailed response
  if (relevantSections.length > 0) {
    const primarySection = relevantSections[0]

    // Extract key information from the content
    const contentLines = primarySection.content.split("\n").filter((line) => line.trim())
    const keyPoints = contentLines.slice(0, 5).join(" ")

    return `Based on your inquiry about ${primarySection.title.toLowerCase()}, here's what I can help you with:

${keyPoints}

${getContextualClosing(message)}

Is there anything specific about ${primarySection.title.toLowerCase()} you'd like to know more about?`
  }

  // Fallback to contextual responses
  return getContextualResponse(message)
}

function getContextualResponse(message: string): string {
  if (message.includes("track") || message.includes("tracking") || message.includes("where is")) {
    return `I'd be happy to help you track your shipment! Here's how our tracking system works:

• Real-time GPS location tracking
• Milestone updates and notifications  
• Estimated delivery times
• Exception alerts and notifications
• Proof of delivery with signatures

To track your shipment, simply enter your tracking number on our tracking page or contact us at +220 123 456 789. You can also use our mobile app for instant updates.

Do you have a tracking number you'd like me to help you with?`
  }

  if (
    message.includes("quote") ||
    message.includes("price") ||
    message.includes("cost") ||
    message.includes("how much")
  ) {
    return `I can help you get a competitive quote for your shipping needs! Our pricing process includes:

• Free instant online quotes
• Detailed pricing breakdowns
• Multiple service options
• Volume discount programs
• Transparent cost components

Pricing factors include origin/destination, dimensions, weight, service speed, and any special requirements.

You can use our online shipping calculator for instant estimates or complete our quote request form for detailed pricing. Our team responds within 24 hours.

What type of shipment are you looking to quote?`
  }

  if (message.includes("air freight") || message.includes("air cargo") || message.includes("express")) {
    return `Our Air Freight services offer fast, reliable international shipping with several options:

EXPRESS AIR FREIGHT:
• Same-day and next-day delivery
• Priority handling for urgent shipments
• Direct flights to major destinations

STANDARD AIR FREIGHT:
• Cost-effective air cargo solutions
• Consolidated shipments for better rates
• Regular scheduled flights

SPECIALIZED SERVICES:
• Temperature-controlled cargo
• Dangerous goods handling
• Oversized and heavy cargo
• High-value goods with enhanced security

We work with major airlines including Emirates, Lufthansa, FedEx, DHL, and UPS for global coverage.

What type of air freight service are you interested in?`
  }

  if (
    message.includes("customs") ||
    message.includes("clearance") ||
    message.includes("import") ||
    message.includes("export")
  ) {
    return `Our Customs Clearance services ensure smooth international trade with full compliance:

IMPORT SERVICES:
• Import documentation preparation
• Duty and tax calculations
• Classification and valuation
• Import permits and licenses

EXPORT SERVICES:
• Export documentation
• Export licenses and permits
• Certificate of origin preparation
• Free trade agreement utilization

COMPLIANCE SERVICES:
• Trade compliance consulting
• Regulatory updates and guidance
• Audit support and representation

Our licensed customs brokers handle all documentation and ensure compliance with international trade regulations.

Are you looking for import or export assistance?`
  }

  if (message.includes("warehouse") || message.includes("storage") || message.includes("distribution")) {
    return `Our Warehousing & Distribution services provide comprehensive storage solutions:

STORAGE SOLUTIONS:
• Climate-controlled environments
• Refrigerated and frozen storage
• High-security storage for valuable goods
• Hazardous materials storage (certified)

SERVICES:
• Real-time inventory tracking
• Pick and pack services
• Order fulfillment
• Cross-docking operations
• Value-added services (labeling, kitting)

TECHNOLOGY:
• Warehouse Management System (WMS)
• Real-time inventory visibility
• Integration with e-commerce platforms

Our strategically located warehouses provide optimal coverage for efficient distribution.

What type of warehousing solution are you looking for?`
  }

  if (
    message.includes("ground") ||
    message.includes("truck") ||
    message.includes("transport") ||
    message.includes("delivery")
  ) {
    return `Our Haulage & Transportation services provide reliable domestic and regional shipping:

FULL TRUCKLOAD (FTL):
• Dedicated trucks for large shipments
• Direct delivery without stops
• Enhanced security for valuable cargo

LESS THAN TRUCKLOAD (LTL):
• Cost-effective for smaller shipments
• Consolidated loads for efficiency
• Flexible pickup and delivery windows

SPECIALIZED TRANSPORTATION:
• Temperature-controlled vehicles
• Flatbed trucks for oversized cargo
• Hazardous materials transportation
• Last-mile delivery services

All vehicles include real-time GPS tracking and 24/7 dispatch support.

What type of ground transportation do you need?`
  }

  if (
    message.includes("contact") ||
    message.includes("support") ||
    message.includes("help") ||
    message.includes("phone")
  ) {
    return `I'm here to help! Here are all the ways you can reach DCF Logistics:

CONTACT INFORMATION:
• Phone: +220 123 456 789 (24/7 hotline)
• Email: info@dcflogistics.com
• Support: support@dcflogistics.com
• Emergency: +220 123 456 HELP
• WhatsApp: +220 123 456 789

BUSINESS HOURS:
• Monday-Friday: 8:00 AM - 6:00 PM EST
• Saturday: 9:00 AM - 2:00 PM EST
• 24/7 Emergency Support Available

RESPONSE TIMES:
• Live chat: Immediate response
• Phone calls: Answered within 3 rings
• Email inquiries: Response within 4 hours

How can I assist you today?`
  }

  return `Thank you for contacting DCF Logistics! I'm Sarah, your customer service representative. 

We offer comprehensive logistics solutions including:
• Air Freight for fast international shipping
• Ground Transportation for domestic delivery  
• Customs Clearance for international trade
• Cross-Border Logistics for global expansion
• Warehousing & Distribution services
• Freight Forwarding coordination

I'm here to help with any questions about our services, shipment tracking, quotes, or general inquiries.

What can I help you with today?`
}

function getContextualClosing(message: string): string {
  if (message.includes("track")) {
    return "You can track your shipment anytime on our tracking page or by calling +220 123 456 789."
  }
  if (message.includes("quote") || message.includes("price")) {
    return "For detailed quotes, you can use our online calculator or contact us at +220 123 456 789."
  }
  if (message.includes("contact") || message.includes("support")) {
    return "Our support team is available 24/7 at +220 123 456 789 for any assistance you need."
  }
  return "Feel free to contact us at +220 123 456 789 if you need any additional assistance."
}

function getBasicFallbackResponse(userMessage: string): string {
  return `Thank you for contacting DCF Logistics! I'm here to help with any questions about our logistics services.

We offer comprehensive solutions including Air Freight, Ground Transportation, Customs Clearance, Cross-Border Logistics, Warehousing, and Freight Forwarding.

For immediate assistance, please call us at +220 123 456 789 or email support@dcflogistics.com.

How can I help you today?`
}
