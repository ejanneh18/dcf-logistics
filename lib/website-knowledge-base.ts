// Comprehensive DCF Logistics Website Knowledge Base
export interface KnowledgeSection {
  id: string
  title: string
  content: string
  keywords: string[]
  category: string
  relatedSections?: string[]
}

export const WEBSITE_KNOWLEDGE: KnowledgeSection[] = [
  // Company Information
  {
    id: "company-overview",
    title: "DCF Logistics Company Overview",
    content: `DCF Logistics is a leading global logistics company providing comprehensive shipping and supply chain solutions. We specialize in connecting businesses worldwide through reliable, efficient, and cost-effective logistics services. Our mission is to simplify global trade and logistics for businesses of all sizes, from small enterprises to large corporations.

Founded with the vision of making international logistics accessible and reliable, DCF Logistics has grown to become a trusted partner for thousands of businesses worldwide. We combine cutting-edge technology with industry expertise to deliver exceptional logistics solutions.

Our core values include reliability, transparency, innovation, and customer satisfaction. We are committed to providing 24/7 support and maintaining the highest standards of service quality.`,
    keywords: ["company", "about", "overview", "mission", "vision", "values", "dcf logistics", "who are you"],
    category: "company",
  },

  // Air Freight Services
  {
    id: "air-freight-detailed",
    title: "Air Freight Services",
    content: `DCF Logistics offers comprehensive air freight services for fast, reliable international shipping. Our air cargo solutions include:

EXPRESS AIR FREIGHT:
- Same-day and next-day delivery options
- Priority handling for urgent shipments
- Direct flights to major destinations
- Real-time tracking and updates

STANDARD AIR FREIGHT:
- Cost-effective air cargo solutions
- Consolidated shipments for better rates
- Regular scheduled flights
- Flexible pickup and delivery options

SPECIALIZED AIR FREIGHT:
- Temperature-controlled cargo (pharmaceuticals, food)
- Dangerous goods handling (certified)
- Oversized and heavy cargo
- Live animal transportation
- High-value goods with enhanced security

FEATURES:
- Door-to-door service available
- Customs clearance assistance
- Insurance coverage options
- Real-time GPS tracking
- 24/7 customer support
- Competitive rates with volume discounts

We work with major airlines including Emirates, Lufthansa, FedEx, DHL, and UPS to ensure global coverage and reliable service.`,
    keywords: [
      "air freight",
      "air cargo",
      "express",
      "fast shipping",
      "international",
      "airlines",
      "urgent",
      "same day",
    ],
    category: "services",
    relatedSections: ["customs-clearance", "tracking-services"],
  },

  // Ground Transportation
  {
    id: "ground-transportation-detailed",
    title: "Haulage & Transportation Services",
    content: `Our ground transportation services provide reliable domestic and regional shipping solutions with a modern fleet and experienced drivers:

FULL TRUCKLOAD (FTL):
- Dedicated trucks for large shipments
- Direct delivery without stops
- Faster transit times
- Enhanced security for valuable cargo

LESS THAN TRUCKLOAD (LTL):
- Cost-effective for smaller shipments
- Consolidated loads for efficiency
- Regular scheduled routes
- Flexible pickup and delivery windows

SPECIALIZED TRANSPORTATION:
- Temperature-controlled vehicles (refrigerated/heated)
- Flatbed trucks for oversized cargo
- Hazardous materials transportation (certified drivers)
- White glove delivery service
- Expedited and rush delivery options

LAST-MILE DELIVERY:
- Final delivery to end customers
- Residential and commercial delivery
- Appointment scheduling
- Proof of delivery with signatures
- Same-day and next-day options

ADDITIONAL SERVICES:
- Cross-docking facilities
- Warehousing integration
- Real-time GPS tracking
- Load planning and optimization
- 24/7 dispatch and support`,
    keywords: ["ground transportation", "trucking", "haulage", "ftl", "ltl", "last mile", "delivery", "domestic"],
    category: "services",
    relatedSections: ["warehousing", "tracking-services"],
  },

  // Customs Clearance
  {
    id: "customs-clearance-detailed",
    title: "Customs Clearance & Brokerage",
    content: `Expert customs clearance services ensuring smooth international trade with full compliance and documentation support:

IMPORT SERVICES:
- Import documentation preparation
- Duty and tax calculations
- Classification and valuation
- Import permits and licenses
- FDA, USDA, and other agency clearances

EXPORT SERVICES:
- Export documentation (commercial invoices, packing lists)
- Export licenses and permits
- Certificate of origin preparation
- AES filing and compliance
- Free trade agreement utilization

CUSTOMS BROKERAGE:
- Licensed customs brokers
- Automated customs processing
- Customs bond services
- Entry preparation and filing
- Post-entry amendments and corrections

COMPLIANCE SERVICES:
- Trade compliance consulting
- Regulatory updates and guidance
- Audit support and representation
- Risk assessment and mitigation
- Training and education programs

SPECIALIZED CLEARANCE:
- Pharmaceutical and medical devices
- Food and agricultural products
- Textiles and apparel
- Electronics and technology
- Automotive parts and vehicles

Our experienced team ensures compliance with all international trade regulations while minimizing delays and costs.`,
    keywords: [
      "customs",
      "clearance",
      "brokerage",
      "import",
      "export",
      "documentation",
      "compliance",
      "duties",
      "taxes",
    ],
    category: "services",
    relatedSections: ["cross-border-logistics", "regulatory-compliance"],
  },

  // Cross-Border Logistics
  {
    id: "cross-border-detailed",
    title: "Cross-Border Logistics Solutions",
    content: `Seamless international shipping and trade facilitation services for global business expansion:

INTERNATIONAL SHIPPING:
- Multi-modal transportation (air, sea, ground)
- Door-to-door international delivery
- Consolidated shipping for cost savings
- Express international services

E-COMMERCE SOLUTIONS:
- Cross-border e-commerce fulfillment
- International returns management
- Duty and tax calculation tools
- Marketplace integration support

TRADE FACILITATION:
- Free trade agreement utilization
- Preferential duty programs
- Trade lane optimization
- Supply chain consulting

DOCUMENTATION SERVICES:
- International shipping documents
- Commercial invoices and packing lists
- Certificates of origin
- Insurance certificates
- Banking and payment documentation

COMPLIANCE MANAGEMENT:
- International trade regulations
- Country-specific requirements
- Restricted and prohibited goods guidance
- Sanctions and embargo compliance

TECHNOLOGY SOLUTIONS:
- Online shipping platforms
- Track and trace capabilities
- Automated documentation
- Real-time visibility and reporting`,
    keywords: ["cross border", "international", "global", "trade", "e-commerce", "multi-modal", "worldwide"],
    category: "services",
    relatedSections: ["customs-clearance", "freight-forwarding"],
  },

  // Warehousing Services
  {
    id: "warehousing-detailed",
    title: "Warehousing & Distribution Services",
    content: `State-of-the-art warehousing and distribution services with advanced technology and security:

STORAGE SOLUTIONS:
- Climate-controlled environments
- Ambient temperature storage
- Refrigerated and frozen storage
- Hazardous materials storage (certified)
- High-security storage for valuable goods

INVENTORY MANAGEMENT:
- Real-time inventory tracking
- Automated inventory systems
- Cycle counting and auditing
- FIFO/LIFO inventory rotation
- Lot tracking and traceability

ORDER FULFILLMENT:
- Pick and pack services
- Kitting and assembly
- Custom packaging solutions
- Quality control and inspection
- Returns processing

DISTRIBUTION SERVICES:
- Cross-docking operations
- Consolidation and deconsolidation
- Load planning and optimization
- Multi-channel distribution
- Same-day and next-day delivery

VALUE-ADDED SERVICES:
- Product labeling and marking
- Repackaging and customization
- Light manufacturing and assembly
- Quality inspection and testing
- Reverse logistics and returns

TECHNOLOGY FEATURES:
- Warehouse Management System (WMS)
- Real-time inventory visibility
- Automated reporting and analytics
- Integration with e-commerce platforms
- Mobile scanning and tracking

Our strategically located warehouses provide optimal coverage for efficient distribution across regions.`,
    keywords: [
      "warehousing",
      "storage",
      "distribution",
      "inventory",
      "fulfillment",
      "cross docking",
      "climate controlled",
    ],
    category: "services",
    relatedSections: ["ground-transportation", "order-fulfillment"],
  },

  // Freight Forwarding
  {
    id: "freight-forwarding-detailed",
    title: "Freight Forwarding Services",
    content: `Comprehensive freight forwarding services coordinating global shipments from origin to destination:

OCEAN FREIGHT:
- Full Container Load (FCL) services
- Less than Container Load (LCL) services
- Break bulk and project cargo
- Roll-on/Roll-off (RoRo) services
- Refrigerated container shipping

AIR FREIGHT FORWARDING:
- Express air freight services
- Consolidated air freight
- Charter flight arrangements
- Dangerous goods handling
- Temperature-sensitive cargo

MULTIMODAL TRANSPORTATION:
- Sea-air combinations
- Rail-truck combinations
- Intermodal container services
- Door-to-door delivery
- Optimal route planning

DOCUMENTATION SERVICES:
- Bill of lading preparation
- Commercial documentation
- Insurance arrangements
- Letter of credit handling
- Certificate management

PROJECT CARGO:
- Heavy lift and oversized cargo
- Project planning and coordination
- Specialized equipment and handling
- Site surveys and route planning
- Installation and commissioning support

SUPPLY CHAIN MANAGEMENT:
- End-to-end supply chain visibility
- Vendor management and coordination
- Inventory optimization
- Risk management and contingency planning
- Performance monitoring and reporting`,
    keywords: ["freight forwarding", "ocean freight", "fcl", "lcl", "multimodal", "project cargo", "supply chain"],
    category: "services",
    relatedSections: ["air-freight-detailed", "customs-clearance-detailed"],
  },

  // Tracking Services
  {
    id: "tracking-services",
    title: "Shipment Tracking & Visibility",
    content: `Advanced tracking and visibility solutions providing real-time shipment information:

REAL-TIME TRACKING:
- GPS location tracking
- Milestone updates and notifications
- Estimated delivery times
- Exception alerts and notifications
- Proof of delivery with signatures

TRACKING METHODS:
- Online tracking portal
- Mobile app tracking
- SMS and email notifications
- API integration for businesses
- EDI tracking updates

VISIBILITY FEATURES:
- Interactive tracking maps
- Shipment history and timeline
- Document access and downloads
- Photo proof of delivery
- Temperature and condition monitoring

NOTIFICATION SERVICES:
- Pickup confirmations
- In-transit updates
- Delivery notifications
- Exception alerts
- Custom notification preferences

REPORTING AND ANALYTICS:
- Shipment performance reports
- Transit time analysis
- Cost analysis and optimization
- Service level reporting
- Custom dashboard creation

To track your shipment, simply enter your tracking number on our tracking page or use our mobile app for instant updates.`,
    keywords: [
      "tracking",
      "trace",
      "shipment status",
      "delivery",
      "gps",
      "notifications",
      "visibility",
      "where is my package",
    ],
    category: "tracking",
    relatedSections: ["customer-support"],
  },

  // Pricing and Quotes
  {
    id: "pricing-quotes",
    title: "Pricing & Quote Services",
    content: `Competitive pricing and transparent quote services for all logistics needs:

QUOTE PROCESS:
- Free instant online quotes
- Detailed pricing breakdowns
- Multiple service options
- Competitive rate comparisons
- Custom solutions for unique needs

PRICING FACTORS:
- Origin and destination locations
- Package dimensions and weight
- Service speed requirements
- Special handling needs
- Volume and frequency discounts

COST COMPONENTS:
- Transportation costs
- Fuel surcharges
- Customs and duties (international)
- Insurance coverage
- Additional services and handling

PAYMENT OPTIONS:
- Credit account terms
- Online payment processing
- Multiple currency support
- Volume discount programs
- Flexible payment schedules

COST OPTIMIZATION:
- Consolidation opportunities
- Route optimization
- Service level adjustments
- Packaging optimization
- Scheduling flexibility

QUOTE CALCULATOR:
Use our online shipping calculator for instant estimates by entering your shipment details including origin, destination, dimensions, weight, and service requirements.

For detailed quotes, complete our quote request form and our team will respond within 24 hours with comprehensive pricing and service options.`,
    keywords: [
      "pricing",
      "quotes",
      "cost",
      "rates",
      "calculator",
      "estimate",
      "how much",
      "price",
      "cheap",
      "affordable",
    ],
    category: "pricing",
    relatedSections: ["quote-request-form"],
  },

  // Customer Support
  {
    id: "customer-support",
    title: "Customer Support & Contact Information",
    content: `24/7 customer support and multiple contact options for all your logistics needs:

CONTACT METHODS:
- Phone: +220 395 1020 (24/7 hotline)
- Email: info@dcfagency.com
- Support Email: info@dcfagency.com
- Emergency Line: +220 395 1020
- Live Chat: Available on website
- WhatsApp: +220 395 1020

BUSINESS HOURS:
- Monday-Friday: 8:00 AM - 6:00 PM EST
- Saturday: 9:00 AM - 2:00 PM EST
- Sunday: Emergency support only
- 24/7 Emergency Support Available

SUPPORT SERVICES:
- Shipment tracking assistance
- Quote requests and pricing
- Service information and guidance
- Problem resolution and claims
- Technical support and training

OFFICE LOCATIONS:
- Headquarters: Banjul, The Gambia
- Regional offices in major cities worldwide
- Local agents and partners globally
- Warehouse and distribution centers

RESPONSE TIMES:
- Live chat: Immediate response
- Phone calls: Answered within 3 rings
- Email inquiries: Response within 4 hours
- Quote requests: Response within 24 hours
- Emergency issues: Immediate response

SPECIALIZED SUPPORT:
- Dedicated account managers for large accounts
- Technical integration support
- Training and onboarding assistance
- Compliance and regulatory guidance
- Claims processing and resolution`,
    keywords: ["contact", "support", "help", "phone", "email", "customer service", "assistance", "hours", "emergency"],
    category: "contact",
  },

  // Technology and Innovation
  {
    id: "technology-innovation",
    title: "Technology & Innovation",
    content: `Advanced technology solutions and innovative logistics platforms:

DIGITAL PLATFORMS:
- Online shipping portal
- Mobile applications (iOS/Android)
- API integration capabilities
- EDI connectivity
- E-commerce platform integration

TRACKING TECHNOLOGY:
- Real-time GPS tracking
- IoT sensors for condition monitoring
- Blockchain for supply chain transparency
- AI-powered route optimization
- Predictive analytics for delivery times

AUTOMATION FEATURES:
- Automated documentation generation
- Smart routing and scheduling
- Inventory management automation
- Customs clearance automation
- Billing and invoicing automation

INTEGRATION CAPABILITIES:
- ERP system integration
- Marketplace platform connectivity
- Accounting software integration
- CRM system connectivity
- Custom API development

INNOVATION INITIATIVES:
- Sustainable logistics solutions
- Carbon footprint tracking
- Green transportation options
- Packaging optimization
- Renewable energy initiatives

SECURITY FEATURES:
- Secure data transmission
- Multi-factor authentication
- Role-based access controls
- Audit trails and logging
- Compliance monitoring`,
    keywords: ["technology", "innovation", "digital", "api", "integration", "automation", "mobile app", "platform"],
    category: "technology",
  },
]

// Enhanced search function with better relevance scoring
export function findRelevantContent(query: string, maxResults = 3): KnowledgeSection[] {
  const queryLower = query.toLowerCase()
  const queryWords = queryLower.split(/\s+/).filter((word) => word.length > 2)

  const scoredSections = WEBSITE_KNOWLEDGE.map((section) => {
    let score = 0

    // Exact title match (highest priority)
    if (section.title.toLowerCase().includes(queryLower)) {
      score += 20
    }

    // Keyword matches (high priority)
    section.keywords.forEach((keyword) => {
      if (queryLower.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(queryLower)) {
        score += 15
      }
    })

    // Individual word matches in keywords
    queryWords.forEach((word) => {
      section.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(word)) {
          score += 10
        }
      })
    })

    // Content matches (medium priority)
    queryWords.forEach((word) => {
      const contentLower = section.content.toLowerCase()
      const wordCount = (contentLower.match(new RegExp(word, "g")) || []).length
      score += wordCount * 2
    })

    // Category relevance
    if (queryLower.includes(section.category)) {
      score += 5
    }

    return { ...section, score }
  })

  return scoredSections
    .filter((section) => section.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
}

// Get content by category
export function getContentByCategory(category: string): KnowledgeSection[] {
  return WEBSITE_KNOWLEDGE.filter((section) => section.category === category)
}

// Get all available categories
export function getAvailableCategories(): string[] {
  return [...new Set(WEBSITE_KNOWLEDGE.map((section) => section.category))]
}

// Get related content
export function getRelatedContent(sectionId: string): KnowledgeSection[] {
  const section = WEBSITE_KNOWLEDGE.find((s) => s.id === sectionId)
  if (!section || !section.relatedSections) return []

  return WEBSITE_KNOWLEDGE.filter((s) => section.relatedSections?.includes(s.id))
}
