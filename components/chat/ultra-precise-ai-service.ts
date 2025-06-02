import { generateText } from "ai"
import {
  findUltraSpecificContent,
  getSpecificAnswer,
  getSpecificFacts,
  getTechnicalDetails,
  type DetailedKnowledgeSection,
} from "@/lib/ultra-comprehensive-knowledge"

export type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

export async function getUltraPreciseAIResponse(messages: ChatMessage[]): Promise<string> {
  try {
    const latestUserMessage = messages[messages.length - 1]?.content || ""

    // First, try to get a specific answer for common questions
    const specificAnswer = getSpecificAnswer(latestUserMessage)
    if (specificAnswer) {
      return enhanceWithAdditionalContext(specificAnswer, latestUserMessage)
    }

    // Get ultra-specific content
    const relevantSections = findUltraSpecificContent(latestUserMessage, 2)
    const specificFacts = getSpecificFacts(latestUserMessage)
    const technicalDetails = getTechnicalDetails(latestUserMessage)

    // Try Gemini API with ultra-comprehensive context
    if (process.env.GEMINI_API_KEY) {
      try {
        const { google } = await import("@ai-sdk/google")
        const model = google("gemini-pro", {
          apiKey: process.env.GEMINI_API_KEY,
        })

        const ultraPrecisePrompt = createUltraPrecisePrompt(messages, relevantSections, specificFacts, technicalDetails)

        const { text } = await generateText({
          model,
          prompt: ultraPrecisePrompt,
          temperature: 0.3, // Lower temperature for more precise responses
          maxTokens: 800,
        })

        return text
      } catch (error) {
        console.warn("Gemini API error, using ultra-precise fallback:", error)
      }
    }

    // Ultra-precise fallback response
    return generateUltraPreciseResponse(latestUserMessage, relevantSections, specificFacts, technicalDetails)
  } catch (error) {
    console.error("Ultra-precise AI service error:", error)
    return getEmergencyResponse(messages[messages.length - 1]?.content || "")
  }
}

function createUltraPrecisePrompt(
  messages: ChatMessage[],
  relevantSections: DetailedKnowledgeSection[],
  specificFacts: string[],
  technicalDetails: string[],
): string {
  const contextContent = relevantSections
    .map(
      (section) =>
        `${section.title}:\n${section.content}\n\nSpecific Facts:\n${section.specificFacts.join("\n")}\n\nTechnical Details:\n${section.technicalDetails.join("\n")}`,
    )
    .join("\n\n")

  const conversationHistory = messages
    .slice(-4)
    .map((msg) => `${msg.role === "user" ? "Customer" : "Sarah"}: ${msg.content}`)
    .join("\n")

  return `You are Sarah, a highly knowledgeable customer service representative at DCF Logistics with deep expertise in all our services. You must provide ULTRA-SPECIFIC, PRECISE responses using exact facts, figures, and technical details from our comprehensive knowledge base.

CRITICAL INSTRUCTIONS:
- Always use SPECIFIC NUMBERS, PERCENTAGES, and EXACT DETAILS from the knowledge base
- Reference EXACT CAPABILITIES, SPECIFICATIONS, and PERFORMANCE METRICS
- Provide PRECISE TECHNICAL INFORMATION when relevant
- Use SPECIFIC FACTS to support every claim
- Be COMPREHENSIVE but FOCUSED on the exact question asked
- Always include ACTIONABLE NEXT STEPS with specific contact information

ULTRA-COMPREHENSIVE KNOWLEDGE BASE:
${contextContent}

SPECIFIC FACTS FOR THIS QUERY:
${specificFacts.join("\n")}

TECHNICAL DETAILS FOR THIS QUERY:
${technicalDetails.join("\n")}

RESPONSE REQUIREMENTS:
1. Start with the most specific, relevant information
2. Include exact numbers, percentages, and specifications
3. Reference specific capabilities and technical details
4. Provide actionable next steps
5. Maintain professional DCF Logistics tone
6. End with specific contact information when appropriate

CONVERSATION HISTORY:
${conversationHistory}

Sarah:`
}

function generateUltraPreciseResponse(
  userMessage: string,
  relevantSections: DetailedKnowledgeSection[],
  specificFacts: string[],
  technicalDetails: string[],
): string {
  const message = userMessage.toLowerCase()

  if (relevantSections.length > 0) {
    const primarySection = relevantSections[0]

    // Check for specific question matches first
    for (const qa of primarySection.commonQuestions) {
      if (
        message.includes(qa.question.toLowerCase()) ||
        qa.question.toLowerCase().includes(message.split(" ").slice(0, 3).join(" "))
      ) {
        return enhanceWithAdditionalContext(qa.answer, userMessage)
      }
    }

    // Generate response based on section content with specific facts
    return generateSectionBasedResponse(primarySection, specificFacts, technicalDetails, message)
  }

  // Fallback to ultra-specific contextual responses
  return getUltraSpecificContextualResponse(message)
}

function generateSectionBasedResponse(
  section: DetailedKnowledgeSection,
  specificFacts: string[],
  technicalDetails: string[],
  userMessage: string,
): string {
  let response = `Based on your inquiry about ${section.title.toLowerCase()}, here are the specific details:\n\n`

  // Add most relevant specific facts
  if (specificFacts.length > 0) {
    response += "KEY SPECIFICATIONS:\n"
    specificFacts.slice(0, 3).forEach((fact) => {
      response += `• ${fact}\n`
    })
    response += "\n"
  }

  // Add relevant technical details
  if (technicalDetails.length > 0) {
    response += "TECHNICAL CAPABILITIES:\n"
    technicalDetails.slice(0, 2).forEach((detail) => {
      response += `• ${detail}\n`
    })
    response += "\n"
  }

  // Add specific next steps based on the section
  response += getSpecificNextSteps(section.subcategory || section.category, userMessage)

  return response
}

function getSpecificNextSteps(category: string, userMessage: string): string {
  const message = userMessage.toLowerCase()

  switch (category) {
    case "air-freight":
      if (message.includes("quote") || message.includes("price")) {
        return "NEXT STEPS:\n• Use our online calculator for instant estimates\n• For detailed quotes, our team responds within 24 hours\n• Call +220 123 456 789 for immediate pricing assistance\n\nWould you like me to connect you with our air freight specialists for a detailed quote?"
      }
      return "NEXT STEPS:\n• Contact our air freight team at +220 123 456 789\n• Visit our air freight service page for detailed information\n• Request a quote through our online portal\n\nWhat specific air freight requirements do you have?"

    case "ground-transport":
      return "NEXT STEPS:\n• Schedule pickup through our online portal\n• Call +220 123 456 789 for same-day service availability\n• Use our route optimizer for multi-stop deliveries\n\nWhat are your specific transportation requirements?"

    case "customs":
      return "NEXT STEPS:\n• Consult with our licensed customs brokers at +220 123 456 789\n• Submit your documentation for pre-clearance review\n• Schedule a compliance consultation for complex shipments\n\nWhat type of goods are you importing or exporting?"

    case "warehousing":
      return "NEXT STEPS:\n• Schedule a facility tour at your nearest location\n• Discuss your specific storage requirements with our team\n• Request a customized warehousing proposal\n• Call +220 123 456 789 to speak with our warehousing specialists\n\nWhat type of storage solution are you looking for?"

    case "tracking":
      return "NEXT STEPS:\n• Enter your tracking number on our tracking page\n• Download our mobile app for real-time updates\n• Set up automated notifications for delivery status\n• Call +220 123 456 789 if you need tracking assistance\n\nDo you have a tracking number you'd like me to help you with?"

    default:
      return "NEXT STEPS:\n• Contact our customer service team at +220 123 456 789\n• Visit our website for detailed service information\n• Request a consultation with our logistics experts\n\nHow can I further assist you with your logistics needs?"
  }
}

function enhanceWithAdditionalContext(answer: string, userMessage: string): string {
  const message = userMessage.toLowerCase()
  let enhancedAnswer = answer

  // Add specific contact information based on query type
  if (message.includes("contact") || message.includes("call") || message.includes("speak")) {
    enhancedAnswer +=
      "\n\nDIRECT CONTACT OPTIONS:\n• Phone: +220 123 456 789 (24/7 support)\n• Email: support@dcflogistics.com\n• Live Chat: Available on our website\n• Emergency Line: +220 123 456 HELP"
  }

  // Add pricing information if relevant
  if (message.includes("cost") || message.includes("price") || message.includes("rate")) {
    enhancedAnswer +=
      "\n\nFor detailed pricing information, use our online calculator or contact our team at +220 123 456 789 for a customized quote within 24 hours."
  }

  // Add tracking information if relevant
  if (message.includes("track") || message.includes("status") || message.includes("where")) {
    enhancedAnswer +=
      "\n\nFor shipment tracking, visit our tracking page or call +220 123 456 789 with your tracking number for immediate assistance."
  }

  return enhancedAnswer
}

function getUltraSpecificContextualResponse(message: string): string {
  // Ultra-specific responses with exact details
  if (message.includes("how many") || message.includes("how much") || message.includes("what is")) {
    if (message.includes("truck") || message.includes("vehicle") || message.includes("fleet")) {
      return "DCF Logistics operates a fleet of 2,500+ vehicles including:\n• 800 dry vans (53-foot trailers, 80,000 lbs capacity)\n• 400 refrigerated trucks (-20°F to +70°F range)\n• 300 flatbeds for oversized cargo\n• 200 box trucks for local delivery\n• 150 specialized vehicles\n\nOur fleet maintains a 98.7% DOT safety rating with zero major incidents in 24 months. All drivers have CDL Class A licenses with 95% having 5+ years experience.\n\nCall +220 123 456 789 to discuss your specific transportation needs."
    }

    if (message.includes("warehouse") || message.includes("storage") || message.includes("space")) {
      return "DCF Logistics operates 8.5 million square feet of warehouse space across 25 strategically located facilities:\n• Largest facility: 750,000 sq ft in Memphis, TN\n• Storage capacity: 2.5 million pallet positions\n• Inventory accuracy: 99.9% through RFID tracking\n• Order fulfillment: 95% ship same day if received by 2 PM\n• Automation: 60% automated picking, 40% robotic sorting\n\nTemperature-controlled options include ambient (15-25°C), refrigerated (2-8°C), and frozen (-18°C) storage.\n\nContact +220 123 456 789 to discuss your warehousing requirements."
    }
  }

  return "Thank you for contacting DCF Logistics! I'm Sarah, and I have access to comprehensive information about all our services. To provide you with the most specific and helpful information, could you please tell me more about your particular logistics needs?\n\nOur main services include:\n• Air Freight (99.2% on-time delivery, 500+ airports)\n• Ground Transportation (2,500+ vehicle fleet, 98% coverage)\n• Customs Clearance (99.8% first-time clearance rate)\n• Warehousing (8.5M sq ft, 99.9% inventory accuracy)\n• Tracking (99.99% uptime, real-time GPS)\n\nCall +220 123 456 789 for immediate assistance or let me know what specific information you need!"
}

function getEmergencyResponse(userMessage: string): string {
  return "I apologize for any technical difficulties. For immediate assistance with your logistics needs, please contact our 24/7 support team:\n\n• Phone: +220 123 456 789\n• Emergency Line: +220 123 456 HELP\n• Email: support@dcflogistics.com\n\nOur customer service representatives are standing by to help with any questions about our air freight, ground transportation, customs clearance, warehousing, or tracking services."
}
