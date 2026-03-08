// Website content knowledge base for DCF Logistics
const WEBSITE_CONTENT = {
  services: {
    "air-freight": {
      title: "Air Freight Services",
      content: `DCF Logistics offers comprehensive air freight services for fast, reliable international shipping. Our air cargo solutions include:
      - Express air freight for urgent shipments
      - Standard air freight for cost-effective shipping
      - Consolidated air freight for smaller shipments
      - Temperature-controlled air freight for sensitive goods
      - Door-to-door air freight services
      - Real-time tracking and monitoring
      - Customs clearance assistance
      - Insurance coverage options
      We work with major airlines worldwide to ensure your cargo reaches its destination safely and on time.`,
      tags: ["air", "freight", "shipping", "international", "fast", "express", "cargo", "airlines"],
    },
    "haulage-transportation": {
      title: "Haulage & Transportation",
      content: `Our ground transportation services provide reliable domestic and regional shipping solutions:
      - Full truckload (FTL) services
      - Less than truckload (LTL) services
      - Last-mile delivery solutions
      - Cross-docking services
      - Specialized vehicle transportation
      - Temperature-controlled transportation
      - Hazardous materials transportation
      - Real-time GPS tracking
      - Flexible scheduling options
      Our fleet of modern vehicles and experienced drivers ensure safe, timely delivery of your goods.`,
      tags: ["ground", "transportation", "trucking", "delivery", "domestic", "FTL", "LTL", "last-mile"],
    },
    "customs-clearance": {
      title: "Customs Clearance",
      content: `Expert customs brokerage services to ensure smooth international trade:
      - Import and export documentation
      - Duty and tax calculation
      - Customs compliance consulting
      - Trade agreement utilization
      - Automated customs processing
      - Customs bond services
      - Classification and valuation
      - Audit support and representation
      Our licensed customs brokers handle all aspects of customs clearance to minimize delays and ensure compliance.`,
      tags: ["customs", "clearance", "brokerage", "import", "export", "documentation", "compliance", "duties"],
    },
    "cross-border-logistics": {
      title: "Cross-Border Logistics",
      content: `Seamless international shipping and trade facilitation services:
      - Multi-modal transportation solutions
      - International trade consulting
      - Supply chain optimization
      - Cross-border e-commerce solutions
      - Trade compliance management
      - International documentation
      - Currency and payment solutions
      - Risk management and insurance
      We simplify complex international logistics to help your business expand globally.`,
      tags: ["international", "cross-border", "global", "trade", "multi-modal", "e-commerce", "expansion"],
    },
    warehousing: {
      title: "Warehousing & Distribution",
      content: `State-of-the-art warehousing and distribution services:
      - Climate-controlled storage facilities
      - Inventory management systems
      - Order fulfillment services
      - Pick and pack operations
      - Cross-docking services
      - Value-added services
      - Real-time inventory tracking
      - Distribution center management
      - Kitting and assembly services
      Our strategically located warehouses provide efficient storage and distribution solutions.`,
      tags: ["warehouse", "storage", "distribution", "inventory", "fulfillment", "cross-docking", "climate-controlled"],
    },
    "freight-forwarding": {
      title: "Freight Forwarding",
      content: `Comprehensive freight forwarding services for global shipping:
      - Ocean freight forwarding
      - Air freight forwarding
      - Multimodal transportation
      - Cargo consolidation
      - Documentation services
      - Insurance arrangements
      - Tracking and monitoring
      - Customs coordination
      - Supply chain visibility
      We coordinate all aspects of your international shipments from origin to destination.`,
      tags: ["freight", "forwarding", "ocean", "multimodal", "consolidation", "coordination", "global"],
    },
  },
  tracking: {
    title: "Shipment Tracking",
    content: `Track your shipments in real-time with our advanced tracking system:
    - Real-time location updates
    - Delivery status notifications
    - Estimated delivery times
    - Proof of delivery
    - Exception alerts
    - Mobile tracking app
    - Email and SMS notifications
    - Historical tracking data
    Enter your tracking number on our tracking page to get instant updates on your shipment status.`,
    tags: ["tracking", "shipment", "status", "delivery", "notifications", "real-time", "updates"],
  },
  contact: {
    title: "Contact Information",
    content: `Contact DCF Logistics for all your shipping needs:
    - Phone: +220 395 1020
    - Email: info@dcfagency.com
    - Support Email: info@dcfagency.com
    - Emergency Line: +220 395 1020
    - Business Hours: Monday-Friday 8AM-6PM EST
    - Weekend Support: Saturday 9AM-2PM EST
    - 24/7 Emergency Support Available
    - Live Chat Support
    - Multiple office locations worldwide
    Our customer service team is ready to assist you with any questions or concerns.`,
    tags: ["contact", "phone", "email", "support", "hours", "emergency", "customer service"],
  },
  pricing: {
    title: "Pricing and Quotes",
    content: `Get competitive pricing for your shipping needs:
    - Free instant quotes online
    - Volume discounts available
    - Flexible payment terms
    - Transparent pricing structure
    - No hidden fees
    - Custom pricing for large accounts
    - Multiple currency support
    - Online quote calculator
    - Dedicated account managers
    Use our quote request form or shipping calculator to get accurate pricing for your shipments.`,
    tags: ["pricing", "quotes", "calculator", "discounts", "payment", "fees", "cost", "rates"],
  },
}

export function getRelevantContent(query: string): string {
  const lowercaseQuery = query.toLowerCase()
  const relevantSections: string[] = []
  let maxScore = 0

  // Search through all content sections
  Object.entries(WEBSITE_CONTENT).forEach(([sectionKey, section]) => {
    if (typeof section === "object" && "content" in section) {
      const content = section as { title: string; content: string; tags: string[] }
      let score = 0

      // Check title match
      if (content.title.toLowerCase().includes(lowercaseQuery)) {
        score += 10
      }

      // Check tag matches
      content.tags.forEach((tag) => {
        if (lowercaseQuery.includes(tag)) {
          score += 5
        }
      })

      // Check content matches
      const words = lowercaseQuery.split(" ")
      words.forEach((word) => {
        if (word.length > 2 && content.content.toLowerCase().includes(word)) {
          score += 2
        }
      })

      if (score > 0) {
        relevantSections.push(`${content.title}:\n${content.content}`)
        maxScore = Math.max(maxScore, score)
      }
    } else if (typeof section === "object" && "title" in section) {
      // Handle sections like tracking, contact, pricing
      const content = section as { title: string; content: string; tags: string[] }
      let score = 0

      content.tags.forEach((tag) => {
        if (lowercaseQuery.includes(tag)) {
          score += 5
        }
      })

      if (score > 0) {
        relevantSections.push(`${content.title}:\n${content.content}`)
      }
    }
  })

  // If no specific matches, return general service overview
  if (relevantSections.length === 0) {
    return `DCF Logistics Services Overview:
    We offer comprehensive logistics solutions including Air Freight, Ground Transportation, Customs Clearance, Cross-Border Logistics, Warehousing, and Freight Forwarding. Our services are designed to meet all your shipping and logistics needs with professional, reliable service.`
  }

  return relevantSections.slice(0, 3).join("\n\n")
}
