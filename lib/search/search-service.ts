/**
 * DCF Logistics - Global Search Service
 * 
 * Comprehensive search functionality across all pages and content
 * Works for both static and Vercel deployments
 */

export interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'page' | 'service' | 'faq' | 'content'
  category: string
  snippet: string
  relevanceScore: number
}

export interface SearchIndex {
  pages: SearchableContent[]
  services: SearchableContent[]
  faqs: SearchableContent[]
  content: SearchableContent[]
}

interface SearchableContent {
  id: string
  title: string
  content: string
  url: string
  type: string
  category: string
  keywords: string[]
  metadata?: Record<string, any>
}

class SearchService {
  private searchIndex: SearchIndex
  private initialized = false

  constructor() {
    this.searchIndex = {
      pages: [],
      services: [],
      faqs: [],
      content: []
    }
    this.initializeSearchIndex()
  }

  private initializeSearchIndex() {
    if (this.initialized) return

    // Pages Index
    this.searchIndex.pages = [
      {
        id: 'home',
        title: 'DCF Logistics - Home',
        content: 'DCF Logistics premier clearing forwarding services Gambia West Africa air freight sea freight customs clearance logistics solutions',
        url: '/',
        type: 'page',
        category: 'Main',
        keywords: ['home', 'logistics', 'clearing', 'forwarding', 'gambia', 'west africa']
      },
      {
        id: 'about',
        title: 'About DCF Logistics',
        content: 'About DCF Logistics company history mission vision values team experience 14 years logistics clearing forwarding West Africa',
        url: '/about',
        type: 'page',
        category: 'Company',
        keywords: ['about', 'company', 'history', 'mission', 'vision', 'team', 'experience']
      },
      {
        id: 'services',
        title: 'Our Services',
        content: 'Services air freight sea freight customs clearance warehousing logistics consultancy cross border transportation',
        url: '/services',
        type: 'page',
        category: 'Services',
        keywords: ['services', 'freight', 'customs', 'warehousing', 'transportation']
      },
      {
        id: 'contact',
        title: 'Contact Us',
        content: 'Contact DCF Logistics phone email address Banjul Gambia customer support inquiries',
        url: '/contact',
        type: 'page',
        category: 'Contact',
        keywords: ['contact', 'phone', 'email', 'address', 'support', 'inquiries']
      },
      {
        id: 'quote',
        title: 'Get a Quote',
        content: 'Request quote shipping rates air freight sea freight road transport customs clearance pricing',
        url: '/quote',
        type: 'page',
        category: 'Services',
        keywords: ['quote', 'pricing', 'rates', 'shipping', 'freight', 'transport']
      },
      {
        id: 'tracking',
        title: 'Track Shipment',
        content: 'Track shipment tracking number real time updates delivery status location',
        url: '/tracking',
        type: 'page',
        category: 'Services',
        keywords: ['tracking', 'shipment', 'delivery', 'status', 'location', 'updates']
      },
      {
        id: 'calculator',
        title: 'Shipping Calculator',
        content: 'Shipping calculator rates pricing air freight sea freight road transport weight dimensions',
        url: '/calculator',
        type: 'page',
        category: 'Tools',
        keywords: ['calculator', 'rates', 'pricing', 'shipping', 'weight', 'dimensions']
      }
    ]

    // Services Index
    this.searchIndex.services = [
      {
        id: 'air-freight',
        title: 'Air Freight Services',
        content: 'Air freight express standard delivery fast shipping international domestic cargo',
        url: '/services/air-freight',
        type: 'service',
        category: 'Freight',
        keywords: ['air', 'freight', 'express', 'fast', 'shipping', 'cargo', 'international']
      },
      {
        id: 'sea-freight',
        title: 'Sea Freight Services',
        content: 'Sea freight ocean shipping container cargo bulk shipments cost effective',
        url: '/services/sea-freight',
        type: 'service',
        category: 'Freight',
        keywords: ['sea', 'freight', 'ocean', 'container', 'bulk', 'cost', 'effective']
      },
      {
        id: 'customs-clearance',
        title: 'Customs Clearance',
        content: 'Customs clearance documentation import export duties taxes compliance',
        url: '/services/customs-clearance',
        type: 'service',
        category: 'Customs',
        keywords: ['customs', 'clearance', 'import', 'export', 'duties', 'taxes', 'compliance']
      },
      {
        id: 'warehousing',
        title: 'Warehousing Services',
        content: 'Warehousing storage distribution inventory management secure facilities',
        url: '/services/warehousing',
        type: 'service',
        category: 'Storage',
        keywords: ['warehousing', 'storage', 'distribution', 'inventory', 'secure', 'facilities']
      },
      {
        id: 'freight-forwarding',
        title: 'Freight Forwarding',
        content: 'Freight forwarding logistics coordination multimodal transport door to door',
        url: '/services/freight-forwarding',
        type: 'service',
        category: 'Logistics',
        keywords: ['freight', 'forwarding', 'logistics', 'multimodal', 'door', 'coordination']
      }
    ]

    // FAQ Index
    this.searchIndex.faqs = [
      {
        id: 'faq-1',
        title: 'How long does shipping take?',
        content: 'Shipping times vary air freight 1-3 days sea freight 15-30 days road transport 5-10 days',
        url: '/support#shipping-times',
        type: 'faq',
        category: 'Shipping',
        keywords: ['shipping', 'time', 'delivery', 'duration', 'air', 'sea', 'road']
      },
      {
        id: 'faq-2',
        title: 'What documents are required?',
        content: 'Required documents commercial invoice packing list bill of lading customs declaration',
        url: '/support#documents',
        type: 'faq',
        category: 'Documentation',
        keywords: ['documents', 'invoice', 'packing', 'bill', 'lading', 'customs', 'declaration']
      },
      {
        id: 'faq-3',
        title: 'How to track my shipment?',
        content: 'Track shipment using tracking number on tracking page real time updates status',
        url: '/support#tracking',
        type: 'faq',
        category: 'Tracking',
        keywords: ['track', 'tracking', 'number', 'status', 'updates', 'shipment']
      }
    ]

    this.initialized = true
  }

  /**
   * Perform search across all indexed content
   */
  search(query: string, options: { limit?: number; type?: string } = {}): SearchResult[] {
    if (!query.trim()) return []

    const { limit = 10, type } = options
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1)
    const results: SearchResult[] = []

    // Search across all content types
    const allContent = [
      ...this.searchIndex.pages,
      ...this.searchIndex.services,
      ...this.searchIndex.faqs,
      ...this.searchIndex.content
    ]

    for (const item of allContent) {
      if (type && item.type !== type) continue

      const relevanceScore = this.calculateRelevance(item, searchTerms, query)
      
      if (relevanceScore > 0) {
        const snippet = this.generateSnippet(item.content, searchTerms)
        
        results.push({
          id: item.id,
          title: item.title,
          description: item.content.substring(0, 150) + '...',
          url: item.url,
          type: item.type as any,
          category: item.category,
          snippet,
          relevanceScore
        })
      }
    }

    // Sort by relevance score and limit results
    return results
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit)
  }

  /**
   * Get search suggestions based on partial query
   */
  getSuggestions(query: string, limit = 5): string[] {
    if (!query.trim()) return []

    const suggestions = new Set<string>()
    const queryLower = query.toLowerCase()

    // Get suggestions from titles and keywords
    const allContent = [
      ...this.searchIndex.pages,
      ...this.searchIndex.services,
      ...this.searchIndex.faqs
    ]

    for (const item of allContent) {
      // Check title
      if (item.title.toLowerCase().includes(queryLower)) {
        suggestions.add(item.title)
      }

      // Check keywords
      for (const keyword of item.keywords) {
        if (keyword.includes(queryLower)) {
          suggestions.add(keyword)
        }
      }
    }

    return Array.from(suggestions).slice(0, limit)
  }

  /**
   * Calculate relevance score for search item
   */
  private calculateRelevance(item: SearchableContent, searchTerms: string[], originalQuery: string): number {
    let score = 0
    const titleLower = item.title.toLowerCase()
    const contentLower = item.content.toLowerCase()
    const keywordsLower = item.keywords.map(k => k.toLowerCase())
    const queryLower = originalQuery.toLowerCase()

    // Exact phrase match in title (highest score)
    if (titleLower.includes(queryLower)) {
      score += 100
    }

    // Exact phrase match in content
    if (contentLower.includes(queryLower)) {
      score += 50
    }

    // Individual term matches
    for (const term of searchTerms) {
      // Title matches
      if (titleLower.includes(term)) {
        score += 20
      }

      // Keyword matches
      if (keywordsLower.some(keyword => keyword.includes(term))) {
        score += 15
      }

      // Content matches
      const contentMatches = (contentLower.match(new RegExp(term, 'g')) || []).length
      score += contentMatches * 5
    }

    // Boost score for service pages
    if (item.type === 'service') {
      score *= 1.2
    }

    // Boost score for main pages
    if (item.category === 'Main') {
      score *= 1.1
    }

    return Math.round(score)
  }

  /**
   * Generate snippet with highlighted search terms
   */
  private generateSnippet(content: string, searchTerms: string[]): string {
    const maxLength = 200
    let snippet = content

    // Find the best position to start the snippet
    let bestPosition = 0
    let maxMatches = 0

    for (let i = 0; i < content.length - maxLength; i += 50) {
      const section = content.substring(i, i + maxLength).toLowerCase()
      const matches = searchTerms.reduce((count, term) => {
        return count + (section.match(new RegExp(term, 'g')) || []).length
      }, 0)

      if (matches > maxMatches) {
        maxMatches = matches
        bestPosition = i
      }
    }

    snippet = content.substring(bestPosition, bestPosition + maxLength)
    
    // Ensure we don't cut words
    const lastSpace = snippet.lastIndexOf(' ')
    if (lastSpace > maxLength * 0.8) {
      snippet = snippet.substring(0, lastSpace)
    }

    return snippet + (bestPosition + snippet.length < content.length ? '...' : '')
  }

  /**
   * Get popular search terms
   */
  getPopularSearches(): string[] {
    return [
      'air freight',
      'sea freight',
      'customs clearance',
      'shipping rates',
      'track shipment',
      'warehousing',
      'quote request',
      'contact information'
    ]
  }

  /**
   * Get search results by category
   */
  searchByCategory(category: string): SearchResult[] {
    const allContent = [
      ...this.searchIndex.pages,
      ...this.searchIndex.services,
      ...this.searchIndex.faqs
    ]

    return allContent
      .filter(item => item.category.toLowerCase() === category.toLowerCase())
      .map(item => ({
        id: item.id,
        title: item.title,
        description: item.content.substring(0, 150) + '...',
        url: item.url,
        type: item.type as any,
        category: item.category,
        snippet: item.content.substring(0, 200) + '...',
        relevanceScore: 100
      }))
  }
}

// Export singleton instance
export const searchService = new SearchService()
export default searchService
