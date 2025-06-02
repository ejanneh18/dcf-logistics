import type { ChatMessage } from "./chat-provider"

// Get page-specific questions based on the current URL path
export function getPageContextQuestions(pathname: string, messages: ChatMessage[]): string[] {
  // Default questions for any page
  const defaultQuestions = [
    "What services do you offer?",
    "How can I track my shipment?",
    "Get a shipping quote",
    "Contact customer service",
  ]

  // If we have conversation history, provide contextual follow-ups
  if (messages.length > 1) {
    const lastMessage = messages[messages.length - 1]
    const lastUserMessage = messages.filter((msg) => msg.role === "user").slice(-1)[0]?.content || ""
    const lastAssistantMessage = messages.filter((msg) => msg.role === "assistant").slice(-1)[0]?.content || ""

    // Air freight context
    if (
      lastAssistantMessage.toLowerCase().includes("air freight") ||
      lastUserMessage.toLowerCase().includes("air freight") ||
      lastUserMessage.toLowerCase().includes("air cargo")
    ) {
      return [
        "How fast is air freight?",
        "What's the cost?",
        "Can you ship temperature-sensitive items?",
        "What's the weight limit?",
      ]
    }

    // Ground transportation context
    if (
      lastAssistantMessage.toLowerCase().includes("ground transportation") ||
      lastAssistantMessage.toLowerCase().includes("truck") ||
      lastUserMessage.toLowerCase().includes("truck") ||
      lastUserMessage.toLowerCase().includes("ground")
    ) {
      return ["Do you offer same-day delivery?", "How big is your fleet?", "What areas do you cover?", "Safety record?"]
    }

    // Customs context
    if (
      lastAssistantMessage.toLowerCase().includes("customs") ||
      lastUserMessage.toLowerCase().includes("customs") ||
      lastUserMessage.toLowerCase().includes("import") ||
      lastUserMessage.toLowerCase().includes("export")
    ) {
      return [
        "How long does clearance take?",
        "Do you handle documentation?",
        "What countries do you cover?",
        "Duty savings?",
      ]
    }

    // Warehousing context
    if (
      lastAssistantMessage.toLowerCase().includes("warehouse") ||
      lastUserMessage.toLowerCase().includes("warehouse") ||
      lastUserMessage.toLowerCase().includes("storage")
    ) {
      return [
        "Where are your warehouses?",
        "Do you have temperature control?",
        "What's your inventory accuracy?",
        "Fulfillment speed?",
      ]
    }

    // Tracking context
    if (
      lastAssistantMessage.toLowerCase().includes("tracking") ||
      lastUserMessage.toLowerCase().includes("track") ||
      lastUserMessage.toLowerCase().includes("shipment status")
    ) {
      return [
        "How do I track my shipment?",
        "How accurate is tracking?",
        "Can I get notifications?",
        "Lost my tracking number",
      ]
    }

    // Pricing context
    if (
      lastAssistantMessage.toLowerCase().includes("pricing") ||
      lastAssistantMessage.toLowerCase().includes("cost") ||
      lastUserMessage.toLowerCase().includes("price") ||
      lastUserMessage.toLowerCase().includes("quote")
    ) {
      return ["Volume discounts?", "Get a custom quote", "Payment terms?", "Insurance costs?"]
    }

    // Contact context
    if (
      lastAssistantMessage.toLowerCase().includes("contact") ||
      lastAssistantMessage.toLowerCase().includes("support") ||
      lastUserMessage.toLowerCase().includes("contact") ||
      lastUserMessage.toLowerCase().includes("phone")
    ) {
      return ["Emergency contact?", "Email support?", "Office locations?", "Support hours?"]
    }

    // General follow-ups
    return ["Tell me more", "How does that work?", "What's the cost?", "How can I get started?"]
  }

  // Page-specific questions
  if (pathname.includes("/services/air-freight")) {
    return ["How fast is air freight?", "What's the cost?", "Weight limits?", "Do you handle dangerous goods?"]
  }

  if (pathname.includes("/services/haulage-transportation")) {
    return ["Fleet size?", "Same-day delivery?", "Coverage area?", "Temperature-controlled options?"]
  }

  if (pathname.includes("/services/customs-clearance")) {
    return ["Processing time?", "Success rate?", "Countries covered?", "Required documentation?"]
  }

  if (pathname.includes("/services/warehousing")) {
    return ["Warehouse locations?", "Storage capacity?", "Temperature control?", "Fulfillment speed?"]
  }

  if (pathname.includes("/tracking")) {
    return ["Track my shipment", "Lost tracking number", "Delivery notifications", "Shipment delay"]
  }

  if (pathname.includes("/quote")) {
    return ["Air freight quote", "Ground shipping quote", "Volume discounts", "Insurance options"]
  }

  if (pathname.includes("/about")) {
    return ["Company history", "Where do you operate?", "Leadership team", "Company values"]
  }

  if (pathname.includes("/contact")) {
    return ["Phone number", "Email address", "Office locations", "Support hours"]
  }

  return defaultQuestions
}
