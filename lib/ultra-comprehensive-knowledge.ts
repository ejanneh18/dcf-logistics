// Ultra-Comprehensive DCF Logistics Knowledge Base with Specific Details
export interface DetailedKnowledgeSection {
  id: string
  title: string
  content: string
  specificFacts: string[]
  technicalDetails: string[]
  keywords: string[]
  category: string
  subcategory?: string
  relatedSections?: string[]
  commonQuestions: { question: string; answer: string }[]
}

export const ULTRA_COMPREHENSIVE_KNOWLEDGE: DetailedKnowledgeSection[] = [
  {
    id: "air-freight-ultra-detailed",
    title: "Air Freight Services - Complete Specifications",
    content: `DCF Logistics operates a comprehensive air freight network with partnerships across 150+ countries and 500+ airports worldwide. Our air cargo services handle over 50,000 shipments monthly with a 99.2% on-time delivery rate.`,
    specificFacts: [
      "Partnership with 25+ major airlines including Emirates SkyCargo, Lufthansa Cargo, Qatar Airways Cargo, FedEx, DHL, UPS",
      "Average transit time: 1-3 days for express, 3-7 days for standard air freight",
      "Maximum weight capacity: 150 tons per shipment for charter flights",
      "Temperature range: -25°C to +25°C for pharmaceutical shipments",
      "Security certification: IATA CEIV Pharma, TAPA FSR Level A",
      "Insurance coverage: Up to $1 million per shipment included",
      "Tracking updates: Every 2 hours during transit",
      "Dangerous goods: IATA certified for Classes 1-9 (except Class 7 radioactive)",
    ],
    technicalDetails: [
      "Automated customs documentation through ACI (Advance Cargo Information)",
      "Real-time temperature monitoring with IoT sensors every 15 minutes",
      "GPS tracking accuracy within 50 meters",
      "Electronic Air Waybill (eAWB) processing reduces documentation time by 60%",
      "Consolidation services available for shipments 1kg-500kg",
      "Charter services for cargo exceeding 10 tons",
      "Fuel surcharge calculated weekly based on IATA fuel index",
    ],
    keywords: [
      "air freight",
      "air cargo",
      "express",
      "airlines",
      "temperature controlled",
      "dangerous goods",
      "charter",
    ],
    category: "services",
    subcategory: "air-freight",
    relatedSections: ["customs-clearance-ultra", "tracking-ultra"],
    commonQuestions: [
      {
        question: "What airlines do you work with?",
        answer:
          "We partner with 25+ major airlines including Emirates SkyCargo, Lufthansa Cargo, Qatar Airways Cargo, FedEx, DHL, UPS, and many regional carriers, ensuring global coverage to 500+ airports worldwide.",
      },
      {
        question: "How fast is your air freight service?",
        answer:
          "Our express air freight delivers in 1-3 days globally, while standard air freight takes 3-7 days. We maintain a 99.2% on-time delivery rate across our network.",
      },
      {
        question: "Can you handle temperature-sensitive cargo?",
        answer:
          "Yes, we offer temperature-controlled air freight from -25°C to +25°C with real-time IoT monitoring every 15 minutes. We're IATA CEIV Pharma certified for pharmaceutical shipments.",
      },
      {
        question: "What's the maximum weight you can ship by air?",
        answer:
          "For regular flights, we handle up to 10 tons per shipment. For larger cargo up to 150 tons, we arrange charter flights with specialized aircraft.",
      },
    ],
  },

  {
    id: "ground-transportation-ultra",
    title: "Ground Transportation - Fleet and Capabilities",
    content: `DCF Logistics operates a modern fleet of 2,500+ vehicles across North America and Europe, including specialized equipment for every transportation need. Our ground network covers 98% of postal codes with same-day availability in 50+ major cities.`,
    specificFacts: [
      "Fleet composition: 800 dry vans, 400 refrigerated trucks, 300 flatbeds, 200 box trucks, 150 specialized vehicles",
      "Average fuel efficiency: 7.2 MPG for long-haul trucks, 12.5 MPG for local delivery vehicles",
      "Driver qualifications: All drivers have CDL Class A licenses, 95% have 5+ years experience",
      "Safety rating: DOT safety rating of 98.7%, zero major incidents in 24 months",
      "Coverage area: 48 US states, 10 Canadian provinces, 25 European countries",
      "Delivery windows: 2-hour windows for residential, 1-hour for commercial",
      "Load capacity: 80,000 lbs gross vehicle weight, 53-foot trailers standard",
      "Temperature range: -20°F to +70°F for refrigerated transport",
    ],
    technicalDetails: [
      "Electronic Logging Devices (ELD) in 100% of fleet for HOS compliance",
      "Real-time GPS tracking with 30-second update intervals",
      "Automated route optimization reduces fuel consumption by 15%",
      "Load sensors provide real-time weight distribution monitoring",
      "Tire pressure monitoring systems prevent 90% of tire-related delays",
      "Collision avoidance systems in all vehicles manufactured after 2020",
      "Telematics systems monitor driver behavior and vehicle performance",
    ],
    keywords: ["ground transportation", "trucking", "fleet", "ftl", "ltl", "refrigerated", "flatbed", "local delivery"],
    category: "services",
    subcategory: "ground-transport",
    relatedSections: ["warehousing-ultra", "last-mile-delivery"],
    commonQuestions: [
      {
        question: "How large is your truck fleet?",
        answer:
          "We operate 2,500+ vehicles including 800 dry vans, 400 refrigerated trucks, 300 flatbeds, and 200 box trucks, covering 98% of postal codes in North America and Europe.",
      },
      {
        question: "What's your safety record?",
        answer:
          "We maintain a DOT safety rating of 98.7% with zero major incidents in the past 24 months. All our drivers have CDL Class A licenses and 95% have 5+ years of experience.",
      },
      {
        question: "Do you offer same-day delivery?",
        answer:
          "Yes, we provide same-day delivery in 50+ major cities with 2-hour delivery windows for residential and 1-hour windows for commercial deliveries.",
      },
      {
        question: "What's the maximum weight you can transport?",
        answer:
          "Our trucks can handle up to 80,000 lbs gross vehicle weight using standard 53-foot trailers. For oversized loads, we have specialized equipment and permits.",
      },
    ],
  },

  {
    id: "customs-clearance-ultra",
    title: "Customs Clearance - Regulatory Expertise",
    content: `DCF Logistics maintains a team of 45 licensed customs brokers with an average of 12 years experience. We process 15,000+ customs entries monthly with a 99.8% first-time clearance rate and average clearance time of 4.2 hours.`,
    specificFacts: [
      "Licensed customs brokers: 45 professionals across 12 countries",
      "Average experience: 12 years per broker, 540+ years combined experience",
      "Processing volume: 15,000+ customs entries monthly",
      "First-time clearance rate: 99.8% success rate",
      "Average clearance time: 4.2 hours for standard shipments",
      "Duty optimization savings: Average 15-25% reduction through proper classification",
      "Free Trade Agreement utilization: USMCA, CETA, EU-UK TCA, CPTPP coverage",
      "Compliance certifications: AEO (Authorized Economic Operator), C-TPAT, PIP",
    ],
    technicalDetails: [
      "Automated Classification Engine (ACE) integration for real-time processing",
      "HTS code database with 99.97% accuracy rate",
      "Electronic filing through CBP's ACE system reduces processing time by 70%",
      "Duty drawback recovery services with average 18-month processing time",
      "Post-entry amendments processed within 24 hours",
      "Customs bond capacity: $50 million aggregate coverage",
      "ISF (Importer Security Filing) 100% compliance rate",
    ],
    keywords: [
      "customs clearance",
      "customs broker",
      "import",
      "export",
      "duties",
      "classification",
      "compliance",
      "documentation",
    ],
    category: "services",
    subcategory: "customs",
    relatedSections: ["cross-border-ultra", "regulatory-compliance"],
    commonQuestions: [
      {
        question: "How experienced are your customs brokers?",
        answer:
          "Our team includes 45 licensed customs brokers with an average of 12 years experience each, totaling 540+ years of combined expertise across 12 countries.",
      },
      {
        question: "What's your customs clearance success rate?",
        answer:
          "We achieve a 99.8% first-time clearance rate with an average processing time of just 4.2 hours for standard shipments, processing over 15,000 entries monthly.",
      },
      {
        question: "Can you help reduce my duty payments?",
        answer:
          "Yes, through proper classification and Free Trade Agreement utilization (USMCA, CETA, EU-UK TCA, CPTPP), we typically achieve 15-25% duty reduction for our clients.",
      },
      {
        question: "Do you handle duty drawback claims?",
        answer:
          "Absolutely. Our duty drawback recovery services have an average processing time of 18 months and we maintain a $50 million customs bond capacity for large-volume importers.",
      },
    ],
  },

  {
    id: "warehousing-ultra",
    title: "Warehousing & Distribution - Facility Specifications",
    content: `DCF Logistics operates 25 strategically located warehouses totaling 8.5 million square feet across North America and Europe. Our facilities feature state-of-the-art automation with 99.9% inventory accuracy and same-day order fulfillment for 95% of orders.`,
    specificFacts: [
      "Total warehouse space: 8.5 million square feet across 25 facilities",
      "Largest facility: 750,000 sq ft in Memphis, TN (air cargo hub)",
      "Inventory accuracy: 99.9% through RFID and barcode scanning",
      "Order fulfillment speed: 95% of orders ship same day if received by 2 PM",
      "Storage capacity: 2.5 million pallet positions, 500,000 bin locations",
      "Temperature zones: Ambient (15-25°C), Refrigerated (2-8°C), Frozen (-18°C)",
      "Security features: 24/7 monitoring, biometric access, fire suppression systems",
      "Automation level: 60% automated picking, 40% robotic sorting",
    ],
    technicalDetails: [
      "Warehouse Management System (WMS): Manhattan Associates platform",
      "RFID tracking: 99.99% read accuracy with real-time inventory updates",
      "Automated Storage and Retrieval Systems (AS/RS) in 8 facilities",
      "Voice-directed picking technology reduces errors by 85%",
      "Conveyor systems: 15 miles of automated conveyors across all facilities",
      "Climate control: ±1°C temperature variance, 45-55% humidity control",
      "Power backup: 72-hour generator backup for critical operations",
      "Sustainability: 40% solar power, LED lighting reduces energy by 60%",
    ],
    keywords: [
      "warehousing",
      "distribution",
      "storage",
      "fulfillment",
      "inventory",
      "automation",
      "climate controlled",
    ],
    category: "services",
    subcategory: "warehousing",
    relatedSections: ["ground-transportation-ultra", "order-fulfillment"],
    commonQuestions: [
      {
        question: "How much warehouse space do you have?",
        answer:
          "We operate 8.5 million square feet across 25 strategically located facilities, with our largest being 750,000 sq ft in Memphis, TN, offering 2.5 million pallet positions.",
      },
      {
        question: "How accurate is your inventory management?",
        answer:
          "We maintain 99.9% inventory accuracy through RFID and barcode scanning with our Manhattan Associates WMS platform, providing real-time inventory updates.",
      },
      {
        question: "How fast can you fulfill orders?",
        answer:
          "95% of orders ship same day if received by 2 PM, thanks to our 60% automated picking systems and voice-directed technology that reduces errors by 85%.",
      },
      {
        question: "Do you offer temperature-controlled storage?",
        answer:
          "Yes, we provide ambient (15-25°C), refrigerated (2-8°C), and frozen (-18°C) storage with ±1°C temperature variance and 45-55% humidity control.",
      },
    ],
  },

  {
    id: "tracking-ultra",
    title: "Tracking & Visibility - Technology Specifications",
    content: `DCF Logistics tracking system processes 2.5 million tracking events daily with 99.99% uptime. Our platform provides real-time visibility with GPS accuracy within 10 meters and updates every 30 seconds during active transport.`,
    specificFacts: [
      "Daily tracking events: 2.5 million processed automatically",
      "System uptime: 99.99% availability (less than 1 hour downtime annually)",
      "GPS accuracy: Within 10 meters for vehicle tracking",
      "Update frequency: Every 30 seconds during active transport",
      "API calls: 50,000+ daily integrations with customer systems",
      "Mobile app downloads: 150,000+ active users",
      "Notification delivery: 99.7% success rate within 2 minutes",
      "Data retention: 7 years of historical tracking data available",
    ],
    technicalDetails: [
      "Satellite tracking: GPS, GLONASS, and Galileo constellation support",
      "IoT sensors: Temperature, humidity, shock, and light exposure monitoring",
      "Blockchain integration: Immutable tracking records for high-value shipments",
      "Machine learning: Predictive delivery time accuracy of 94%",
      "API rate limits: 1,000 calls per minute for enterprise customers",
      "Real-time alerts: Geofencing, temperature deviations, delivery exceptions",
      "Mobile SDK: Available for iOS and Android integration",
      "Data encryption: AES-256 encryption for all tracking data",
    ],
    keywords: ["tracking", "visibility", "gps", "real-time", "api", "mobile app", "notifications", "iot"],
    category: "technology",
    subcategory: "tracking",
    relatedSections: ["air-freight-ultra", "ground-transportation-ultra"],
    commonQuestions: [
      {
        question: "How accurate is your tracking system?",
        answer:
          "Our tracking system provides GPS accuracy within 10 meters with updates every 30 seconds during transport, processing 2.5 million tracking events daily with 99.99% uptime.",
      },
      {
        question: "Can I integrate tracking with my system?",
        answer:
          "Yes, our API handles 50,000+ daily integrations with enterprise rate limits of 1,000 calls per minute. We also offer mobile SDKs for iOS and Android.",
      },
      {
        question: "What kind of monitoring do you provide?",
        answer:
          "Beyond GPS location, our IoT sensors monitor temperature, humidity, shock, and light exposure with real-time alerts for any deviations or delivery exceptions.",
      },
      {
        question: "How long do you keep tracking data?",
        answer:
          "We maintain 7 years of historical tracking data with AES-256 encryption, and for high-value shipments, we use blockchain for immutable tracking records.",
      },
    ],
  },

  {
    id: "pricing-ultra",
    title: "Pricing Structure - Detailed Cost Components",
    content: `DCF Logistics pricing is based on a transparent, zone-based system with over 500 rate zones globally. Our pricing includes base rates, fuel surcharges (updated weekly), and optional services with volume discounts starting at 100 shipments monthly.`,
    specificFacts: [
      "Rate zones: 500+ zones globally for precise pricing",
      "Fuel surcharge: Updated weekly based on DOE diesel prices",
      "Volume discounts: 5-25% savings starting at 100 shipments/month",
      "Payment terms: Net 30 for approved accounts, 2% discount for early payment",
      "Currency support: 25 currencies with daily exchange rate updates",
      "Insurance rates: 0.5% of declared value for standard coverage",
      "Minimum charges: $25 for domestic, $50 for international shipments",
      "Dimensional weight: Applied when volume exceeds 10.4 lbs per cubic foot",
    ],
    technicalDetails: [
      "Pricing API: Real-time rate calculations with 99.8% accuracy",
      "Cost optimization engine: Suggests most economical service options",
      "Automated invoicing: Electronic invoices with detailed cost breakdowns",
      "Fuel index calculation: Based on DOE National Average Diesel Price",
      "Accessorial charges: 150+ standardized charges for special services",
      "Contract pricing: Custom rates for 1,000+ shipments annually",
      "Cost allocation: Department/project code tracking available",
      "Audit trail: Complete pricing history for compliance and analysis",
    ],
    keywords: ["pricing", "rates", "cost", "quotes", "fuel surcharge", "volume discount", "payment terms"],
    category: "pricing",
    subcategory: "cost-structure",
    relatedSections: ["quote-calculator", "billing-services"],
    commonQuestions: [
      {
        question: "How is your pricing calculated?",
        answer:
          "We use a zone-based system with 500+ rate zones globally, including base rates, weekly fuel surcharges based on DOE diesel prices, and dimensional weight when volume exceeds 10.4 lbs per cubic foot.",
      },
      {
        question: "Do you offer volume discounts?",
        answer:
          "Yes, volume discounts range from 5-25% starting at 100 shipments monthly, with custom contract pricing available for customers shipping 1,000+ annually.",
      },
      {
        question: "What payment terms do you offer?",
        answer:
          "We offer Net 30 terms for approved accounts with a 2% early payment discount. We support 25 currencies with daily exchange rate updates.",
      },
      {
        question: "What's included in your insurance coverage?",
        answer:
          "Standard insurance coverage is 0.5% of declared value. We also offer enhanced coverage options and specialized insurance for high-value or sensitive cargo.",
      },
    ],
  },

  {
    id: "customer-support-ultra",
    title: "Customer Support - Service Level Specifications",
    content: `DCF Logistics customer support operates 24/7/365 with 150+ multilingual agents across 12 time zones. We maintain a 98.5% customer satisfaction score with average response times of 15 seconds for calls and 2 minutes for live chat.`,
    specificFacts: [
      "Support agents: 150+ multilingual professionals across 12 time zones",
      "Languages supported: 25 languages including English, Spanish, French, German, Mandarin",
      "Customer satisfaction: 98.5% CSAT score based on monthly surveys",
      "Call answer time: Average 15 seconds, 95% answered within 30 seconds",
      "Live chat response: Average 2 minutes, 90% within 5 minutes",
      "Email response: 4 hours average, 95% within 8 hours",
      "Escalation process: Tier 2 within 30 minutes, management within 2 hours",
      "Knowledge base: 2,500+ articles with 95% self-service resolution rate",
    ],
    technicalDetails: [
      "CRM platform: Salesforce Service Cloud with 360-degree customer view",
      "Call routing: Intelligent routing based on language, expertise, and availability",
      "Quality monitoring: 100% call recording with AI-powered sentiment analysis",
      "Ticket management: Automated prioritization and SLA tracking",
      "Mobile support: Dedicated mobile app with push notifications",
      "Video support: Screen sharing and video calls for complex issues",
      "Proactive alerts: Automated notifications for shipment exceptions",
      "Performance metrics: Real-time dashboards for service level monitoring",
    ],
    keywords: ["customer support", "help desk", "24/7", "multilingual", "response time", "satisfaction"],
    category: "support",
    subcategory: "customer-service",
    relatedSections: ["contact-information", "emergency-support"],
    commonQuestions: [
      {
        question: "What are your support hours?",
        answer:
          "We provide 24/7/365 support with 150+ multilingual agents across 12 time zones, ensuring someone is always available to help regardless of your location.",
      },
      {
        question: "How quickly do you respond to inquiries?",
        answer:
          "We answer 95% of calls within 30 seconds (15-second average), respond to live chat within 2 minutes average, and email inquiries within 4 hours.",
      },
      {
        question: "What languages do you support?",
        answer:
          "Our agents speak 25 languages including English, Spanish, French, German, and Mandarin, with intelligent routing to match you with the right language specialist.",
      },
      {
        question: "How do you measure customer satisfaction?",
        answer:
          "We maintain a 98.5% customer satisfaction score through monthly surveys, with 100% call recording and AI-powered sentiment analysis for continuous improvement.",
      },
    ],
  },
]

// Enhanced search with ultra-specific matching
export function findUltraSpecificContent(query: string, maxResults = 3): DetailedKnowledgeSection[] {
  const queryLower = query.toLowerCase()
  const queryWords = queryLower.split(/\s+/).filter((word) => word.length > 2)

  const scoredSections = ULTRA_COMPREHENSIVE_KNOWLEDGE.map((section) => {
    let score = 0

    // Exact phrase matching in questions (highest priority)
    section.commonQuestions.forEach((qa) => {
      if (qa.question.toLowerCase().includes(queryLower) || queryLower.includes(qa.question.toLowerCase())) {
        score += 50
      }
    })

    // Specific facts matching (very high priority)
    section.specificFacts.forEach((fact) => {
      queryWords.forEach((word) => {
        if (fact.toLowerCase().includes(word)) {
          score += 25
        }
      })
    })

    // Technical details matching (high priority)
    section.technicalDetails.forEach((detail) => {
      queryWords.forEach((word) => {
        if (detail.toLowerCase().includes(word)) {
          score += 20
        }
      })
    })

    // Keyword matching (medium-high priority)
    section.keywords.forEach((keyword) => {
      if (queryLower.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(queryLower)) {
        score += 15
      }
    })

    // Title matching (medium priority)
    if (section.title.toLowerCase().includes(queryLower)) {
      score += 10
    }

    // Content matching (lower priority)
    queryWords.forEach((word) => {
      const contentMatches = (section.content.toLowerCase().match(new RegExp(word, "g")) || []).length
      score += contentMatches * 2
    })

    return { ...section, score }
  })

  return scoredSections
    .filter((section) => section.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
}

// Get specific answer for common questions
export function getSpecificAnswer(query: string): string | null {
  const queryLower = query.toLowerCase()

  for (const section of ULTRA_COMPREHENSIVE_KNOWLEDGE) {
    for (const qa of section.commonQuestions) {
      if (
        queryLower.includes(qa.question.toLowerCase()) ||
        qa.question.toLowerCase().includes(queryLower) ||
        calculateSimilarity(queryLower, qa.question.toLowerCase()) > 0.7
      ) {
        return qa.answer
      }
    }
  }

  return null
}

// Calculate string similarity for better question matching
function calculateSimilarity(str1: string, str2: string): number {
  const words1 = str1.split(/\s+/)
  const words2 = str2.split(/\s+/)
  const commonWords = words1.filter((word) => words2.includes(word))
  return commonWords.length / Math.max(words1.length, words2.length)
}

// Get specific facts related to query
export function getSpecificFacts(query: string): string[] {
  const relevantSections = findUltraSpecificContent(query, 2)
  const facts: string[] = []

  relevantSections.forEach((section) => {
    section.specificFacts.forEach((fact) => {
      const queryWords = query.toLowerCase().split(/\s+/)
      if (queryWords.some((word) => fact.toLowerCase().includes(word))) {
        facts.push(fact)
      }
    })
  })

  return facts.slice(0, 5) // Return top 5 most relevant facts
}

// Get technical details for specific queries
export function getTechnicalDetails(query: string): string[] {
  const relevantSections = findUltraSpecificContent(query, 2)
  const details: string[] = []

  relevantSections.forEach((section) => {
    section.technicalDetails.forEach((detail) => {
      const queryWords = query.toLowerCase().split(/\s+/)
      if (queryWords.some((word) => detail.toLowerCase().includes(word))) {
        details.push(detail)
      }
    })
  })

  return details.slice(0, 3) // Return top 3 most relevant technical details
}
