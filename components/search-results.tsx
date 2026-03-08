'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, ExternalLink, Clock, TrendingUp } from 'lucide-react'
import { searchService, type SearchResult } from '@/lib/search/search-service'
import SearchBar from '@/components/search-bar'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState<SearchResult[]>([])
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Get search query from URL params
  useEffect(() => {
    const q = searchParams.get('q') || ''
    setQuery(q)
    
    if (q) {
      setIsLoading(true)
      const searchResults = searchService.search(q, { limit: 50 })
      setResults(searchResults)
      setFilteredResults(searchResults)
      setIsLoading(false)
    } else {
      setResults([])
      setFilteredResults([])
      setIsLoading(false)
    }
  }, [searchParams])

  // Filter results based on type and category
  useEffect(() => {
    let filtered = results

    if (selectedType !== 'all') {
      filtered = filtered.filter(result => result.type === selectedType)
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(result => result.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    setFilteredResults(filtered)
  }, [results, selectedType, selectedCategory])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page':
        return '📄'
      case 'service':
        return '🚚'
      case 'faq':
        return '❓'
      case 'content':
        return '📝'
      default:
        return '📄'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'page':
        return 'bg-blue-100 text-blue-800'
      case 'service':
        return 'bg-green-100 text-green-800'
      case 'faq':
        return 'bg-yellow-100 text-yellow-800'
      case 'content':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const uniqueTypes = Array.from(new Set(results.map(r => r.type)))
  const uniqueCategories = Array.from(new Set(results.map(r => r.category)))

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="bg-gray-200 h-12 rounded-lg w-full"></div>
          <div className="flex gap-4">
            <div className="bg-gray-200 h-10 rounded-lg w-32"></div>
            <div className="bg-gray-200 h-10 rounded-lg w-32"></div>
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar variant="page" />
      </div>

      {/* Search Info */}
      {query && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Search results for "{query}"
          </h2>
          <p className="text-gray-600">
            Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
            {selectedType !== 'all' || selectedCategory !== 'all' ? ' (filtered)' : ''}
          </p>
        </div>
      )}

      {/* Filters */}
      {results.length > 0 && (
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
          </div>
          
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {uniqueTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {getTypeIcon(type)} {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {uniqueCategories.map(category => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(selectedType !== 'all' || selectedCategory !== 'all') && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedType('all')
                setSelectedCategory('all')
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}

      {/* Results */}
      {filteredResults.length > 0 ? (
        <div className="space-y-4">
          {filteredResults.map((result) => (
            <Card key={result.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <Link 
                        href={result.url}
                        className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        {result.title}
                      </Link>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {result.snippet}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <Badge className={`text-xs ${getTypeColor(result.type)}`}>
                        {getTypeIcon(result.type)} {result.type}
                      </Badge>
                      <span className="text-sm text-gray-500">{result.category}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-500">
                        Relevance: {Math.round(result.relevanceScore)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : query ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find anything matching "{query}". Try different keywords or check your spelling.
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center justify-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Popular Searches
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {searchService.getPopularSearches().map((search, index) => (
                    <Link
                      key={index}
                      href={`/search?q=${encodeURIComponent(search)}`}
                      className="text-sm text-primary hover:text-primary/80 underline"
                    >
                      {search}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="text-sm font-semibold mb-2">Browse by Category</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Services', 'Freight', 'Customs', 'Contact'].map((category) => (
                    <Link
                      key={category}
                      href={`/search?q=${encodeURIComponent(category.toLowerCase())}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold mb-2">Start your search</h3>
            <p className="text-gray-600 mb-6">
              Enter keywords to search across our services, pages, and FAQs.
            </p>
            
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center justify-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Popular Searches
              </h4>
              <div className="flex flex-wrap justify-center gap-2">
                {searchService.getPopularSearches().map((search, index) => (
                  <Link
                    key={index}
                    href={`/search?q=${encodeURIComponent(search)}`}
                    className="text-sm text-primary hover:text-primary/80 underline"
                  >
                    {search}
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
