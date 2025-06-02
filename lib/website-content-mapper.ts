// Complete Website Content Mapping with Direct References
export interface ContentReference {
  id: string
  pageUrl: string
  sectionTitle: string
  content: string
  specificData: Record<string, any>
  relatedContent: string[]
  lastUpdated: string
}

export interface ServiceDetail {
  name: string
  description: string
  features: string[]
  benefits: string[]
  specifications: Record<string, string | number>
  processSteps: string[]
  pricing: Record<string, any>
  faqs: { question: string; answer: string }[]
  relatedServices: string[]
}

export const COMPLETE_WEBSITE_CONTENT: Record<string, ContentReference> = {
  "homepage-hero": {
    id: "homepage-hero",
    pageUrl: "/",
    sectionTitle: "DCF Logistics - Your Trusted Logistics Partner",
    content:
      "DCF Logistics is a leading logistics company providing comprehensive freight forwarding, customs clearance, and supply chain solutions across Africa and globally. With over 15 years of experience, we handle 50,000+ shipments annually with a 99.2% customer satisfaction rate.",
    specificData: {
      yearsOfExperience: 15,
      annualShipments: 50000,
      customerSatisfactionRate: 99.2,
      globalReach: "Africa and worldwide",
      foundedYear: 2008,
      headquarters: "Banjul, The Gambia",
    },
    relatedContent: ["services-overview", "company-about"],
    lastUpdated: "2024-01-15",
  },

  "air-freight-service": {
    id: "air-freight-service",
    pageUrl: "/services/air-freight",
    sectionTitle: "Air Freight Services - Fast Global Shipping",
    content:
      "Our air freight service offers expedited shipping solutions with partnerships across 150+ countries and 500+ airports worldwide. We handle everything from small packages to large cargo shipments with real-time tracking and temperature-controlled options.",
    specificData: {
      countriesCovered: 150,
      airportPartners: 500,
      transitTimeExpress: "1-3 days",
      transitTimeStandard: "3-7 days",
      onTimeDeliveryRate: 99.2,
      maxWeightRegular: "10 tons",
      maxWeightCharter: "150 tons",
      temperatureRange: "-25°C to +25°C",
      trackingUpdateFrequency: "Every 2 hours",
      insuranceCoverage: "$1 million per shipment",
      airlinePartners: ["Emirates SkyCargo", "Lufthansa Cargo", "Qatar Airways Cargo", "FedEx", "DHL", "UPS"],
      certifications: ["IATA CEIV Pharma", "TAPA FSR Level A"],
      dangerousGoodsClasses: "Classes 1-9 (except Class 7 radioactive)",
    },
    relatedContent: ["customs-clearance", "tracking-services", "freight-forwarding"],
    lastUpdated: "2024-01-15",
  },

  "ground-transportation": {
    id: "ground-transportation",
    pageUrl: "/services/haulage-transportation",
    sectionTitle: "Ground Transportation & Haulage Services",
    content:
      "Our ground transportation network operates 2,500+ vehicles across North America and Europe, providing reliable freight delivery with advanced tracking and professional handling. We offer FTL, LTL, and specialized transport solutions.",
    specificData: {
      fleetSize: 2500,
      dryVans: 800,
      refrigeratedTrucks: 400,
      flatbeds: 300,
      boxTrucks: 200,
      specializedVehicles: 150,
      coverageArea: "48 US states, 10 Canadian provinces, 25 European countries",
      safetyRating: 98.7,
      driverExperience: "95% have 5+ years experience",
      maxWeight: "80,000 lbs",
      trailerLength: "53 feet",
      temperatureRangeRefrigerated: "-20°F to +70°F",
      deliveryWindowResidential: "2 hours",
      deliveryWindowCommercial: "1 hour",
      sameDayCities: 50,
      postalCodeCoverage: "98%",
    },
    relatedContent: ["warehousing", "last-mile-delivery", "tracking-services"],
    lastUpdated: "2024-01-15",
  },

  "customs-clearance": {
    id: "customs-clearance",
    pageUrl: "/services/customs-clearance",
    sectionTitle: "Customs Clearance & Brokerage Services",
    content:
      "Our customs clearance service is managed by 45 licensed customs brokers with an average of 12 years experience. We process 15,000+ customs entries monthly with a 99.8% first-time clearance rate and average processing time of 4.2 hours.",
    specificData: {
      licensedBrokers: 45,
      averageExperience: 12,
      combinedExperience: 540,
      countriesServed: 12,
      monthlyEntries: 15000,
      firstTimeClearanceRate: 99.8,
      averageClearanceTime: 4.2,
      dutySavingsAverage: "15-25%",
      customsBondCapacity: "$50 million",
      certifications: ["AEO (Authorized Economic Operator)", "C-TPAT", "PIP"],
      freeTradeAgreements: ["USMCA", "CETA", "EU-UK TCA", "CPTPP"],
      dutyDrawbackProcessingTime: "18 months average",
      isfComplianceRate: "100%",
    },
    relatedContent: ["cross-border-logistics", "regulatory-compliance", "air-freight-service"],
    lastUpdated: "2024-01-15",
  },

  "warehousing-distribution": {
    id: "warehousing-distribution",
    pageUrl: "/services/warehousing",
    sectionTitle: "Warehousing & Distribution Services",
    content:
      "DCF Logistics operates 25 strategically located warehouses totaling 8.5 million square feet across North America and Europe. Our facilities feature state-of-the-art automation with 99.9% inventory accuracy and same-day fulfillment for 95% of orders.",
    specificData: {
      totalFacilities: 25,
      totalSquareFeet: 8500000,
      largestFacilitySize: "750,000 sq ft",
      largestFacilityLocation: "Memphis, TN",
      inventoryAccuracy: 99.9,
      sameDayFulfillmentRate: 95,
      orderCutoffTime: "2 PM",
      palletPositions: 2500000,
      binLocations: 500000,
      automatedPicking: "60%",
      roboticSorting: "40%",
      temperatureZones: ["Ambient (15-25°C)", "Refrigerated (2-8°C)", "Frozen (-18°C)"],
      securityFeatures: ["24/7 monitoring", "biometric access", "fire suppression"],
      wmsSystem: "Manhattan Associates",
      rfidAccuracy: "99.99%",
      conveyorMiles: 15,
      powerBackup: "72 hours",
      solarPower: "40%",
      energySavings: "60% with LED lighting",
    },
    relatedContent: ["ground-transportation", "order-fulfillment", "inventory-management"],
    lastUpdated: "2024-01-15",
  },

  "tracking-system": {
    id: "tracking-system",
    pageUrl: "/tracking",
    sectionTitle: "Real-Time Shipment Tracking",
    content:
      "Our advanced tracking system processes 2.5 million tracking events daily with 99.99% uptime. GPS accuracy within 10 meters with updates every 30 seconds during active transport, plus IoT sensors for temperature, humidity, and shock monitoring.",
    specificData: {
      dailyTrackingEvents: 2500000,
      systemUptime: 99.99,
      gpsAccuracy: "10 meters",
      updateFrequency: "30 seconds",
      apiCalls: 50000,
      mobileAppUsers: 150000,
      notificationSuccessRate: 99.7,
      notificationDeliveryTime: "2 minutes",
      dataRetention: "7 years",
      satelliteSupport: ["GPS", "GLONASS", "Galileo"],
      iotSensors: ["Temperature", "Humidity", "Shock", "Light exposure"],
      blockchainIntegration: "High-value shipments",
      predictiveAccuracy: "94%",
      apiRateLimit: "1,000 calls per minute",
      dataEncryption: "AES-256",
    },
    relatedContent: ["mobile-app", "api-integration", "iot-monitoring"],
    lastUpdated: "2024-01-15",
  },

  "pricing-structure": {
    id: "pricing-structure",
    pageUrl: "/quote",
    sectionTitle: "Transparent Pricing Structure",
    content:
      "Our pricing is based on a zone-based system with 500+ rate zones globally. Includes base rates, weekly fuel surcharges, and volume discounts starting at 100 shipments monthly. Payment terms include Net 30 for approved accounts with 2% early payment discount.",
    specificData: {
      rateZones: 500,
      fuelSurchargeUpdate: "Weekly",
      volumeDiscountStart: 100,
      volumeDiscountRange: "5-25%",
      paymentTerms: "Net 30",
      earlyPaymentDiscount: "2%",
      currenciesSupported: 25,
      insuranceRate: "0.5% of declared value",
      minimumDomestic: "$25",
      minimumInternational: "$50",
      dimensionalWeightThreshold: "10.4 lbs per cubic foot",
      contractPricingThreshold: "1,000+ shipments annually",
      accessorialCharges: 150,
      pricingApiAccuracy: "99.8%",
    },
    relatedContent: ["quote-calculator", "billing-services", "volume-discounts"],
    lastUpdated: "2024-01-15",
  },

  "customer-support": {
    id: "customer-support",
    pageUrl: "/support",
    sectionTitle: "24/7 Customer Support",
    content:
      "Our customer support operates 24/7/365 with 150+ multilingual agents across 12 time zones. We maintain a 98.5% customer satisfaction score with average response times of 15 seconds for calls and 2 minutes for live chat.",
    specificData: {
      supportAgents: 150,
      timeZonesCovered: 12,
      languagesSupported: 25,
      customerSatisfactionScore: 98.5,
      callAnswerTime: "15 seconds average",
      callAnswerRate: "95% within 30 seconds",
      liveChatResponse: "2 minutes average",
      liveChatRate: "90% within 5 minutes",
      emailResponse: "4 hours average",
      emailRate: "95% within 8 hours",
      escalationTier2: "30 minutes",
      escalationManagement: "2 hours",
      knowledgeBaseArticles: 2500,
      selfServiceResolution: "95%",
      languages: ["English", "Spanish", "French", "German", "Mandarin", "Arabic", "Portuguese"],
      crmPlatform: "Salesforce Service Cloud",
      callRecording: "100%",
      qualityMonitoring: "AI-powered sentiment analysis",
    },
    relatedContent: ["contact-information", "emergency-support", "knowledge-base"],
    lastUpdated: "2024-01-15",
  },

  "company-about": {
    id: "company-about",
    pageUrl: "/about",
    sectionTitle: "About DCF Logistics",
    content:
      "Founded in 2008 in Banjul, The Gambia, DCF Logistics has grown to become a leading logistics provider across Africa and globally. Our mission is to provide reliable, efficient, and cost-effective logistics solutions that enable businesses to thrive in the global marketplace.",
    specificData: {
      foundedYear: 2008,
      headquarters: "Banjul, The Gambia",
      employeeCount: 2500,
      officeLocations: 45,
      countriesOfOperation: 35,
      annualRevenue: "$500 million",
      certifications: ["ISO 9001:2015", "ISO 14001:2015", "OHSAS 18001"],
      awards: ["Best Logistics Provider Africa 2023", "Customer Service Excellence 2022"],
      sustainabilityGoals: "Carbon neutral by 2030",
      communityInvestment: "$2 million annually",
      trainingHours: "40 hours per employee annually",
      retentionRate: "92%",
      diversityRatio: "45% female leadership",
    },
    relatedContent: ["leadership-team", "company-values", "sustainability"],
    lastUpdated: "2024-01-15",
  },
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "air-freight": {
    name: "Air Freight Services",
    description:
      "Fast, reliable international air cargo solutions with real-time tracking and temperature-controlled options.",
    features: [
      "Partnership with 25+ major airlines",
      "Coverage to 500+ airports worldwide",
      "Real-time GPS tracking with 10-meter accuracy",
      "Temperature-controlled shipping (-25°C to +25°C)",
      "IATA CEIV Pharma certification",
      "Dangerous goods handling (Classes 1-9)",
      "Charter services for oversized cargo",
      "Electronic Air Waybill (eAWB) processing",
    ],
    benefits: [
      "99.2% on-time delivery rate",
      "1-3 day express delivery globally",
      "Up to $1 million insurance coverage included",
      "60% faster documentation with eAWB",
      "Real-time temperature monitoring",
      "24/7 tracking updates every 2 hours",
    ],
    specifications: {
      "Transit Time Express": "1-3 days",
      "Transit Time Standard": "3-7 days",
      "Maximum Weight Regular": "10 tons",
      "Maximum Weight Charter": "150 tons",
      "Temperature Range": "-25°C to +25°C",
      "GPS Accuracy": "10 meters",
      "Insurance Coverage": "$1 million per shipment",
      "Countries Covered": 150,
      "Airport Partners": 500,
    },
    processSteps: [
      "Quote request and booking confirmation",
      "Cargo pickup and security screening",
      "Documentation and customs preparation",
      "Flight booking and space allocation",
      "Real-time tracking during transit",
      "Customs clearance at destination",
      "Final delivery and proof of delivery",
    ],
    pricing: {
      "Express Service": "Premium rates for 1-3 day delivery",
      "Standard Service": "Competitive rates for 3-7 day delivery",
      "Charter Service": "Custom pricing for oversized cargo",
      "Volume Discounts": "5-25% savings for 100+ shipments monthly",
    },
    faqs: [
      {
        question: "What airlines do you partner with?",
        answer:
          "We work with 25+ major airlines including Emirates SkyCargo, Lufthansa Cargo, Qatar Airways Cargo, FedEx, DHL, and UPS, ensuring global coverage to 500+ airports.",
      },
      {
        question: "How fast is your air freight service?",
        answer:
          "Our express service delivers in 1-3 days globally, while standard air freight takes 3-7 days. We maintain a 99.2% on-time delivery rate.",
      },
      {
        question: "Can you handle temperature-sensitive cargo?",
        answer:
          "Yes, we offer temperature-controlled shipping from -25°C to +25°C with real-time IoT monitoring. We're IATA CEIV Pharma certified for pharmaceutical shipments.",
      },
    ],
    relatedServices: ["customs-clearance", "freight-forwarding", "tracking"],
  },

  "ground-transportation": {
    name: "Ground Transportation & Haulage",
    description:
      "Comprehensive ground transportation with a modern fleet of 2,500+ vehicles covering 98% of postal codes.",
    features: [
      "Fleet of 2,500+ vehicles across multiple vehicle types",
      "98% postal code coverage in North America and Europe",
      "Same-day delivery in 50+ major cities",
      "Real-time GPS tracking with 30-second updates",
      "Electronic Logging Devices (ELD) for compliance",
      "Automated route optimization",
      "Temperature-controlled transport (-20°F to +70°F)",
      "Specialized equipment for oversized cargo",
    ],
    benefits: [
      "98.7% DOT safety rating",
      "Zero major incidents in 24 months",
      "15% fuel savings through route optimization",
      "2-hour delivery windows for residential",
      "1-hour delivery windows for commercial",
      "95% of drivers have 5+ years experience",
    ],
    specifications: {
      "Fleet Size": "2,500+ vehicles",
      "Dry Vans": 800,
      "Refrigerated Trucks": 400,
      Flatbeds: 300,
      "Box Trucks": 200,
      "Maximum Weight": "80,000 lbs",
      "Trailer Length": "53 feet",
      "Temperature Range": "-20°F to +70°F",
      Coverage: "98% of postal codes",
      "Same-Day Cities": 50,
    },
    processSteps: [
      "Shipment booking and route planning",
      "Cargo pickup and loading verification",
      "Real-time tracking and monitoring",
      "Route optimization and traffic management",
      "Delivery confirmation and documentation",
      "Proof of delivery and customer notification",
    ],
    pricing: {
      "FTL (Full Truckload)": "Dedicated truck for large shipments",
      "LTL (Less Than Truckload)": "Shared space for smaller shipments",
      "Same-Day Delivery": "Premium pricing for urgent deliveries",
      "Volume Discounts": "Reduced rates for regular customers",
    },
    faqs: [
      {
        question: "How large is your truck fleet?",
        answer:
          "We operate 2,500+ vehicles including 800 dry vans, 400 refrigerated trucks, 300 flatbeds, and 200 box trucks, covering 98% of postal codes.",
      },
      {
        question: "What's your safety record?",
        answer:
          "We maintain a 98.7% DOT safety rating with zero major incidents in 24 months. 95% of our drivers have 5+ years of experience.",
      },
      {
        question: "Do you offer same-day delivery?",
        answer:
          "Yes, we provide same-day delivery in 50+ major cities with 2-hour windows for residential and 1-hour windows for commercial deliveries.",
      },
    ],
    relatedServices: ["warehousing", "last-mile-delivery", "tracking"],
  },
}

// Advanced content search with direct website references
export function findExactWebsiteContent(query: string): {
  directMatches: ContentReference[]
  serviceMatches: ServiceDetail[]
  specificData: Record<string, any>
  pageReferences: string[]
} {
  const queryLower = query.toLowerCase()
  const queryWords = queryLower.split(/\s+/).filter((word) => word.length > 2)

  const directMatches: ContentReference[] = []
  const serviceMatches: ServiceDetail[] = []
  const specificData: Record<string, any> = {}
  const pageReferences: string[] = []

  // Search through complete website content
  Object.values(COMPLETE_WEBSITE_CONTENT).forEach((content) => {
    let relevanceScore = 0

    // Check for exact phrase matches
    if (content.content.toLowerCase().includes(queryLower)) {
      relevanceScore += 50
    }

    // Check for keyword matches
    queryWords.forEach((word) => {
      if (content.content.toLowerCase().includes(word) || content.sectionTitle.toLowerCase().includes(word)) {
        relevanceScore += 10
      }
    })

    // Check specific data matches
    Object.entries(content.specificData).forEach(([key, value]) => {
      if (key.toLowerCase().includes(queryLower) || String(value).toLowerCase().includes(queryLower)) {
        relevanceScore += 25
        specificData[key] = value
      }
    })

    if (relevanceScore > 0) {
      directMatches.push(content)
      pageReferences.push(content.pageUrl)
    }
  })

  // Search through service details
  Object.values(SERVICE_DETAILS).forEach((service) => {
    let relevanceScore = 0

    // Check service name and description
    if (service.name.toLowerCase().includes(queryLower) || service.description.toLowerCase().includes(queryLower)) {
      relevanceScore += 30
    }
    // Check features and benefits
    ;[...service.features, ...service.benefits].forEach((item) => {
      if (item.toLowerCase().includes(queryLower)) {
        relevanceScore += 20
      }
    })

    // Check specifications
    Object.entries(service.specifications).forEach(([key, value]) => {
      if (key.toLowerCase().includes(queryLower) || String(value).toLowerCase().includes(queryLower)) {
        relevanceScore += 15
        specificData[key] = value
      }
    })

    if (relevanceScore > 0) {
      serviceMatches.push(service)
    }
  })

  return {
    directMatches: directMatches.sort((a, b) =>
      b.specificData
        ? Object.keys(b.specificData).length
        : 0 - (a.specificData ? Object.keys(a.specificData).length : 0),
    ),
    serviceMatches,
    specificData,
    pageReferences: [...new Set(pageReferences)],
  }
}

// Get exact specifications for specific queries
export function getExactSpecifications(query: string): Record<string, any> {
  const specifications: Record<string, any> = {}
  const queryLower = query.toLowerCase()

  Object.values(COMPLETE_WEBSITE_CONTENT).forEach((content) => {
    Object.entries(content.specificData).forEach(([key, value]) => {
      if (queryLower.includes(key.toLowerCase()) || key.toLowerCase().includes(queryLower.split(" ")[0])) {
        specifications[key] = value
      }
    })
  })

  Object.values(SERVICE_DETAILS).forEach((service) => {
    Object.entries(service.specifications).forEach(([key, value]) => {
      if (queryLower.includes(key.toLowerCase()) || key.toLowerCase().includes(queryLower.split(" ")[0])) {
        specifications[key] = value
      }
    })
  })

  return specifications
}
