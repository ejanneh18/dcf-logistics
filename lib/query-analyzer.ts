// Utility for analyzing user queries to improve response relevance

type QueryIntent = {
  type: "tracking" | "quote" | "service_info" | "contact" | "complaint" | "general"
  confidence: number
  entities?: Record<string, string>
}

export function analyzeQuery(query: string): QueryIntent {
  const lowercaseQuery = query.toLowerCase()

  // Check for tracking intent
  if (
    lowercaseQuery.includes("track") ||
    lowercaseQuery.includes("where is") ||
    lowercaseQuery.includes("shipment status") ||
    lowercaseQuery.includes("package location")
  ) {
    const trackingNumber = extractTrackingNumber(lowercaseQuery)
    return {
      type: "tracking",
      confidence: 0.9,
      entities: trackingNumber ? { trackingNumber } : undefined,
    }
  }

  // Check for quote intent
  if (
    lowercaseQuery.includes("quote") ||
    lowercaseQuery.includes("price") ||
    lowercaseQuery.includes("cost") ||
    lowercaseQuery.includes("how much") ||
    lowercaseQuery.includes("estimate")
  ) {
    return {
      type: "quote",
      confidence: 0.85,
    }
  }

  // Check for service information intent
  if (
    lowercaseQuery.includes("service") ||
    lowercaseQuery.includes("offer") ||
    lowercaseQuery.includes("provide") ||
    lowercaseQuery.includes("what do you do")
  ) {
    return {
      type: "service_info",
      confidence: 0.8,
    }
  }

  // Check for contact intent
  if (
    lowercaseQuery.includes("contact") ||
    lowercaseQuery.includes("speak") ||
    lowercaseQuery.includes("call") ||
    lowercaseQuery.includes("email") ||
    lowercaseQuery.includes("phone")
  ) {
    return {
      type: "contact",
      confidence: 0.85,
    }
  }

  // Check for complaint intent
  if (
    lowercaseQuery.includes("complaint") ||
    lowercaseQuery.includes("issue") ||
    lowercaseQuery.includes("problem") ||
    lowercaseQuery.includes("not satisfied") ||
    lowercaseQuery.includes("wrong") ||
    lowercaseQuery.includes("damaged")
  ) {
    return {
      type: "complaint",
      confidence: 0.75,
    }
  }

  // Default to general intent
  return {
    type: "general",
    confidence: 0.5,
  }
}

// Helper function to extract tracking numbers from text
function extractTrackingNumber(text: string): string | undefined {
  // Common tracking number patterns
  const patterns = [
    /\b[A-Z]{2}\d{9}[A-Z]{2}\b/, // Example: AB123456789CD
    /\b\d{12}\b/, // Example: 123456789012
    /\b[A-Z]{4}\d{10}\b/, // Example: ABCD1234567890
    /\b\d{4}-\d{4}-\d{4}\b/, // Example: 1234-5678-9012
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      return match[0]
    }
  }

  return undefined
}

// Get suggested actions based on query intent
export function getSuggestedActions(intent: QueryIntent): string[] {
  switch (intent.type) {
    case "tracking":
      return ["Go to tracking page", "Enter tracking number", "Contact support for assistance"]
    case "quote":
      return ["Use our shipping calculator", "Request a detailed quote", "View our service pricing"]
    case "service_info":
      return ["Explore our services", "Download service brochure", "Schedule a consultation"]
    case "contact":
      return ["Call our support team", "Send us an email", "Visit our office"]
    case "complaint":
      return ["Submit a formal complaint", "Speak to a manager", "Request compensation"]
    default:
      return ["Explore our services", "Track your shipment", "Request a quote"]
  }
}
