import { generateText } from "ai"

export type ChatMessage = {
  role: "user" | "assistant"
  content: string
  id?: string
  timestamp?: Date
}

// Enhanced query analysis to determine user intent
function analyzeUserQuery(query: string): {
  intent: string
  service: string | null
  specificAspects: string[]
  keywords: string[]
} {
  const queryLower = query.toLowerCase()
  const words = queryLower.split(/\s+/)

  // Service detection with priority
  let service = null
  if (
    queryLower.includes("air freight") ||
    queryLower.includes("air cargo") ||
    queryLower.includes("flying") ||
    queryLower.includes("airport")
  ) {
    service = "air-freight"
  } else if (
    queryLower.includes("truck") ||
    queryLower.includes("ground") ||
    queryLower.includes("transport") ||
    queryLower.includes("delivery") ||
    queryLower.includes("haulage")
  ) {
    service = "ground-transportation"
  } else if (
    queryLower.includes("customs") ||
    queryLower.includes("clearance") ||
    queryLower.includes("broker") ||
    queryLower.includes("import") ||
    queryLower.includes("export")
  ) {
    service = "customs-clearance"
  } else if (
    queryLower.includes("warehouse") ||
    queryLower.includes("storage") ||
    queryLower.includes("distribution") ||
    queryLower.includes("fulfillment")
  ) {
    service = "warehousing"
  } else if (
    queryLower.includes("track") ||
    queryLower.includes("tracking") ||
    queryLower.includes("shipment") ||
    queryLower.includes("status")
  ) {
    service = "tracking"
  } else if (queryLower.includes("freight forward") || queryLower.includes("forwarding")) {
    service = "freight-forwarding"
  }

  // Intent detection
  let intent = "general"
  if (
    queryLower.includes("price") ||
    queryLower.includes("cost") ||
    queryLower.includes("quote") ||
    queryLower.includes("rate")
  ) {
    intent = "pricing"
  } else if (queryLower.includes("how") || queryLower.includes("process") || queryLower.includes("work")) {
    intent = "process"
  } else if (
    queryLower.includes("contact") ||
    queryLower.includes("support") ||
    queryLower.includes("help") ||
    queryLower.includes("phone")
  ) {
    intent = "contact"
  } else if (queryLower.includes("company") || queryLower.includes("about") || queryLower.includes("who")) {
    intent = "company"
  } else if (
    queryLower.includes("fast") ||
    queryLower.includes("time") ||
    queryLower.includes("speed") ||
    queryLower.includes("delivery")
  ) {
    intent = "speed"
  } else if (
    queryLower.includes("capacity") ||
    queryLower.includes("size") ||
    queryLower.includes("volume") ||
    queryLower.includes("weight")
  ) {
    intent = "capacity"
  }

  // Specific aspects
  const specificAspects = []
  if (queryLower.includes("fleet") || queryLower.includes("vehicles")) specificAspects.push("fleet")
  if (queryLower.includes("safety") || queryLower.includes("security")) specificAspects.push("safety")
  if (queryLower.includes("technology") || queryLower.includes("system")) specificAspects.push("technology")
  if (queryLower.includes("experience") || queryLower.includes("years")) specificAspects.push("experience")

  return {
    intent,
    service,
    specificAspects,
    keywords: words.filter((word) => word.length > 2),
  }
}

// Generate contextually appropriate responses based on query analysis
function generateContextualResponse(query: string, conversationHistory: ChatMessage[]): string {
  const analysis = analyzeUserQuery(query)

  // Check if this is a follow-up question
  const isFollowUp = conversationHistory.length > 2

  console.log("Query analysis:", analysis)
  console.log("Is follow-up:", isFollowUp)

  // Handle follow-up questions
  if (isFollowUp) {
    const previousAssistantMessage =
      conversationHistory.filter((msg) => msg.role === "assistant").slice(-1)[0]?.content || ""

    const previousUserMessage = conversationHistory.filter((msg) => msg.role === "user").slice(-2, -1)[0]?.content || ""

    // Determine context from previous messages
    if (previousAssistantMessage.includes("air freight")) {
      analysis.service = "air-freight"
    } else if (previousAssistantMessage.includes("ground transportation")) {
      analysis.service = "ground-transportation"
    } else if (previousAssistantMessage.includes("customs clearance")) {
      analysis.service = "customs-clearance"
    } else if (previousAssistantMessage.includes("warehouse")) {
      analysis.service = "warehousing"
    } else if (previousAssistantMessage.includes("tracking")) {
      analysis.service = "tracking"
    }
  }

  // Handle specific service queries
  if (analysis.service === "air-freight") {
    return generateAirFreightResponse(query, analysis, isFollowUp)
  } else if (analysis.service === "ground-transportation") {
    return generateGroundTransportResponse(query, analysis, isFollowUp)
  } else if (analysis.service === "customs-clearance") {
    return generateCustomsResponse(query, analysis, isFollowUp)
  } else if (analysis.service === "warehousing") {
    return generateWarehousingResponse(query, analysis, isFollowUp)
  } else if (analysis.service === "tracking") {
    return generateTrackingResponse(query, analysis, isFollowUp)
  } else if (analysis.service === "freight-forwarding") {
    return generateFreightForwardingResponse(query, analysis, isFollowUp)
  }

  // Handle intent-based queries
  if (analysis.intent === "pricing") {
    return generatePricingResponse(query, analysis, isFollowUp)
  } else if (analysis.intent === "contact") {
    return generateContactResponse(query, analysis, isFollowUp)
  } else if (analysis.intent === "company") {
    return generateCompanyResponse(query, analysis, isFollowUp)
  }

  // Default comprehensive response
  return generateGeneralResponse(query, analysis, isFollowUp)
}

function generateAirFreightResponse(query: string, analysis: any, isFollowUp: boolean): string {
  const queryLower = query.toLowerCase()

  if (analysis.intent === "pricing" || queryLower.includes("cost") || queryLower.includes("rate")) {
    return `Our air freight pricing is based on zones with rates varying by service level. Express delivery (1-3 days) costs more than standard (3-7 days), and we offer volume discounts starting at 5% for 100+ shipments.

We cover 150+ countries through 500+ airports, with insurance up to $1 million included. For temperature-sensitive cargo, we maintain -25°C to +25°C controlled environments.

For an instant quote, visit our quote page or call us at +220 123 456 789.`
  }

  if (analysis.intent === "speed" || queryLower.includes("fast") || queryLower.includes("time")) {
    return `Our express air freight delivers globally in 1-3 days with a 99.2% on-time rate. Standard service takes 3-7 days.

We partner with major airlines like Emirates, Lufthansa, Qatar Airways, FedEx, DHL, and UPS to ensure reliable service. You'll get real-time tracking with updates every 2 hours.

For urgent shipments, call us at +220 123 456 789 and we can arrange immediate booking.`
  }

  return `We provide international air cargo solutions reaching 150+ countries through 500+ airports worldwide.

Our express service delivers in 1-3 days, while standard takes 3-7 days. We handle shipments up to 10 tons (regular) or 150 tons (charter), with temperature control from -25°C to +25°C.

We're IATA CEIV Pharma certified for pharmaceuticals and can handle dangerous goods. Our tracking system provides 10-meter GPS accuracy.

Need a quote or have specific requirements? Call us at +220 123 456 789.`
}

function generateGroundTransportResponse(query: string, analysis: any, isFollowUp: boolean): string {
  const queryLower = query.toLowerCase()

  if (queryLower.includes("fleet") || queryLower.includes("truck") || queryLower.includes("vehicle")) {
    return `We operate 2,500+ vehicles across North America and Europe, including 800 dry vans, 400 refrigerated trucks (-20°F to +70°F), 300 flatbeds, 200 box trucks, and 150 specialized vehicles.

Our fleet maintains a 98.7% DOT safety rating, with 95% of drivers having 5+ years experience. We can handle loads up to 80,000 lbs with 53-foot trailers.

We cover 48 US states, 10 Canadian provinces, and 25 European countries, with same-day delivery available in 50+ major cities.`
  }

  if (analysis.intent === "speed" || queryLower.includes("same day") || queryLower.includes("urgent")) {
    return `We offer same-day delivery in 50+ major cities with 2-hour residential and 1-hour commercial delivery windows. Our express service provides next-day delivery for less urgent shipments.

Our real-time GPS tracking updates every 30 seconds, and we use automated route optimization to save time. For temperature-sensitive goods, our refrigerated fleet maintains -20°F to +70°F.

Need an urgent delivery? Call us at +220 123 456 789 for immediate assistance.`
  }

  return `We provide comprehensive ground transportation with 2,500+ vehicles covering 98% of postal codes across North America and Europe.

Our services include FTL (dedicated trucks), LTL (shared space), same-day delivery in 50+ cities, and temperature-controlled transport (-20°F to +70°F).

Our fleet includes 800 dry vans, 400 refrigerated trucks, and 300 flatbeds, all equipped with real-time GPS tracking that updates every 30 seconds.

You can book online through our customer portal or call +220 123 456 789 for assistance.`
}

function generateCustomsResponse(query: string, analysis: any, isFollowUp: boolean): string {
  return `Our customs clearance team includes 45 licensed brokers with an average of 12 years experience. We process 15,000+ customs entries monthly with a 99.8% first-time clearance rate and average processing time of just 4.2 hours.

We serve 12 major markets and typically save clients 15-25% on duties. We're certified with AEO, C-TPAT, and PIP, and have expertise in major trade agreements including USMCA, CETA, EU-UK TCA, and CPTPP.

Our specialists can help with duty drawback processing, complex classification, and regulatory compliance. Call +220 123 456 789 to speak with a broker.`
}

function generateWarehousingResponse(query: string, analysis: any, isFollowUp: boolean): string {
  const queryLower = query.toLowerCase()

  if (queryLower.includes("size") || queryLower.includes("capacity") || queryLower.includes("space")) {
    return `We operate 25 warehouses totaling 8.5 million square feet, with our largest facility in Memphis at 750,000 sq ft. Our total capacity includes 2.5 million pallet positions and 500,000 bin locations.

Our facilities maintain 99.9% inventory accuracy and fulfill 95% of orders same-day when received before our 2 PM cutoff. We use Manhattan Associates WMS with 60% automated picking and 40% robotic sorting.

We offer ambient (15-25°C), refrigerated (2-8°C), and frozen (-18°C) storage zones, with 15 miles of conveyor systems and 72-hour backup power.`
  }

  return `We operate 25 strategically located warehouses totaling 8.5 million square feet across North America and Europe.

Our facilities maintain 99.9% inventory accuracy and fulfill 95% of orders same-day when received before our 2 PM cutoff. We use Manhattan Associates WMS with RFID tracking (99.99% accuracy).

We offer ambient (15-25°C), refrigerated (2-8°C), and frozen (-18°C) storage with 24/7 security and biometric access. Our facilities use 40% solar power and achieve 60% energy savings with LED lighting.

Interested in a tour or proposal? Call us at +220 123 456 789.`
}

function generateTrackingResponse(query: string, analysis: any, isFollowUp: boolean): string {
  return `Our tracking system processes 2.5 million events daily with 99.99% uptime. It provides GPS accuracy within 10 meters and updates every 30 seconds during transport.

We use multiple satellite systems (GPS, GLONASS, Galileo) and IoT sensors that monitor temperature, humidity, shock, and light exposure. Our predictive delivery accuracy is 94%, and notifications arrive within 2 minutes.

You can access tracking through our website, mobile app, API integration, or SMS/email alerts. For tracking assistance, call +220 123 456 789.`
}

function generateFreightForwardingResponse(query: string, analysis: any, isFollowUp: boolean): string {
  return `We provide end-to-end freight management across air, sea, and ground transportation in 150+ countries with 500+ airport partnerships.

Our services include documentation management, customs clearance coordination, multi-modal planning, real-time visibility, and insurance. We specialize in project cargo, dangerous goods, temperature-controlled logistics, and oversized shipments.

Our process covers pickup coordination, documentation preparation, customs management, transportation optimization, and delivery confirmation.

For a freight forwarding quote, visit our quote page or call +220 123 456 789.`
}

function generatePricingResponse(query: string, analysis: any, isFollowUp: boolean): string {
  return `Our pricing is based on 500+ rate zones globally with base rates by service and zone, weekly fuel surcharge adjustments, and volume discounts starting at 100 shipments monthly.

We offer volume discounts of 5-25% for regular customers, 2% early payment discounts, and contract pricing for 1,000+ annual shipments. Our standard terms are Net 30 for approved accounts, and we support 25 major currencies.

Dimensional weight is calculated at 10.4 lbs per cubic foot, and we have 150+ accessorial charge options for special services.

For an instant quote, visit our quote page or call +220 123 456 789.`
}

function generateContactResponse(query: string, analysis: any, isFollowUp: boolean): string {
  return `You can reach our 24/7 customer support at +220 123 456 789 or email support@dcflogistics.com. For emergencies, call +220 123 456 HELP.

Our 150+ multilingual agents typically answer calls within 15 seconds, respond to live chat within 2 minutes, and reply to emails within 4 hours. We support 25 languages including English, Spanish, French, German, Mandarin, and Arabic.

Our headquarters is in Banjul, The Gambia, with 45 office locations globally. Our team maintains a 98.5% customer satisfaction score.`
}

function generateCompanyResponse(query: string, analysis: any, isFollowUp: boolean): string {
  return `DCF Logistics was founded in 2008 in Banjul, The Gambia. We've grown to 2,500+ employees across 45 office locations in 35 countries, with annual revenue of $500 million.

We have 15+ years of experience handling 50,000+ shipments annually with a 99.2% customer satisfaction rate. Our team has a 92% retention rate with 45% female leadership.

We hold ISO 9001:2015, ISO 14001:2015, and OHSAS 18001 certifications, and have won awards including Best Logistics Provider Africa 2023. Our mission is to provide reliable, efficient, cost-effective logistics solutions, with a goal to be carbon neutral by 2030.`
}

function generateGeneralResponse(query: string, analysis: any, isFollowUp: boolean): string {
  return `We're a leading logistics provider founded in 2008, handling 50,000+ shipments annually with 99.2% customer satisfaction.

Our services include:
• Air Freight: 1-3 day express delivery to 500+ airports
• Ground Transportation: 2,500+ vehicles with 98% coverage
• Customs Clearance: 99.8% first-time clearance rate
• Warehousing: 8.5 million sq ft across 25 facilities
• Tracking: Real-time visibility with 10-meter accuracy

Our 24/7 support team is available at +220 123 456 789. How can I help with your specific logistics needs?`
}

export async function getContextualAIResponse(messages: ChatMessage[]): Promise<string> {
  try {
    const latestUserMessage = messages[messages.length - 1]?.content || ""

    // Check if this is a greeting or very short message
    if (
      latestUserMessage.length < 10 &&
      (latestUserMessage.toLowerCase().includes("hi") ||
        latestUserMessage.toLowerCase().includes("hello") ||
        latestUserMessage.toLowerCase().includes("hey"))
    ) {
      return `Hi there! I'm Sarah from DCF Logistics. How can I help with your shipping or logistics needs today?`
    }

    console.log("Processing query:", latestUserMessage)
    console.log("Message history length:", messages.length)

    // Try Gemini API first
    if (process.env.GEMINI_API_KEY) {
      try {
        const { google } = await import("@ai-sdk/google")
        const model = google("gemini-2.0-flash-exp", {
          apiKey: process.env.GEMINI_API_KEY,
        })

        // Format conversation history for the AI
        const conversationForAI = messages
          .map((msg) => ({
            role: msg.role === "user" ? "user" : "assistant",
            content: msg.content,
          }))
          .slice(-5) // Last 5 messages for context

        const contextualPrompt = `You are Sarah, a friendly customer service representative at DCF Logistics. Analyze the conversation and provide a natural, conversational response.

Conversation History:
${conversationForAI.map((msg) => `${msg.role === "user" ? "Customer" : "Sarah"}: ${msg.content}`).join("\n")}

Guidelines for your response:
1. Be conversational and natural - write like a helpful human, not a formal document
2. Be concise and direct - get to the point quickly
3. Include specific facts and numbers when relevant
4. Avoid unnecessary formatting like bold text or bullet points
5. Sound friendly and helpful
6. Keep responses under 150 words when possible
7. Don't include "suggested questions" in your response

Sarah:`

        const { text } = await generateText({
          model,
          prompt: contextualPrompt,
          temperature: 0.7, // Higher for more natural language
          maxTokens: 500,
        })

        return text
      } catch (error) {
        console.warn("Gemini API error, using contextual fallback:", error)
      }
    }

    // Use contextual fallback with conversation history
    return generateContextualResponse(latestUserMessage, messages)
  } catch (error) {
    console.error("Contextual AI service error:", error)
    return `Sorry about that technical hiccup! You can reach our support team at +220 123 456 789 for immediate assistance. They're available 24/7 and can help with any logistics questions you have.`
  }
}
