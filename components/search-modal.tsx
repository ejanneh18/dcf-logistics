'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, X, Clock, TrendingUp, ExternalLink } from 'lucide-react'
import { searchService, type SearchResult } from '@/lib/search/search-service'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('dcf-recent-searches')
        if (saved) {
          setRecentSearches(JSON.parse(saved))
        }
      } catch (error) {
        console.warn('Failed to load recent searches:', error)
      }
    }
  }, [])

  // Handle search input changes
  useEffect(() => {
    if (query.trim().length > 1) {
      setIsLoading(true)
      
      // Debounce search
      const timer = setTimeout(() => {
        const searchResults = searchService.search(query, { limit: 8 })
        const searchSuggestions = searchService.getSuggestions(query, 5)
        
        setResults(searchResults)
        setSuggestions(searchSuggestions)
        setIsLoading(false)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setResults([])
      setSuggestions([])
      setIsLoading(false)
    }
  }, [query])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      // Reset state when opening
      setQuery('')
      setResults([])
      setSuggestions([])
    }
  }, [isOpen])

  const handleSearch = (searchQuery: string = query) => {
    if (!searchQuery.trim()) return

    // Save to recent searches
    const updatedRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
    setRecentSearches(updatedRecent)
    
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('dcf-recent-searches', JSON.stringify(updatedRecent))
      } catch (error) {
        console.warn('Failed to save recent searches:', error)
      }
    }

    // Navigate to search results page
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    onClose()
  }

  const handleResultClick = (result: SearchResult) => {
    // Save to recent searches
    const updatedRecent = [result.title, ...recentSearches.filter(s => s !== result.title)].slice(0, 5)
    setRecentSearches(updatedRecent)
    
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('dcf-recent-searches', JSON.stringify(updatedRecent))
      } catch (error) {
        console.warn('Failed to save recent searches:', error)
      }
    }

    router.push(result.url)
    onClose()
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    handleSearch(suggestion)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('dcf-recent-searches')
      } catch (error) {
        console.warn('Failed to clear recent searches:', error)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSearch()
    }
  }

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Search className="h-5 w-5 text-primary" />
            Search DCF Logistics
          </DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search services, pages, FAQs..."
              className="pl-10 pr-10 h-12 text-base"
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Search Content */}
        <div className="flex-1 overflow-y-auto max-h-96 border-t">
          {/* Loading State */}
          {isLoading && (
            <div className="p-6 text-center text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
              <p className="text-sm">Searching...</p>
            </div>
          )}

          {/* Search Results */}
          {!isLoading && results.length > 0 && (
            <div className="border-b border-gray-100">
              <div className="p-4 bg-gray-50 border-b">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search Results
                </h4>
              </div>
              {results.map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="text-sm font-medium text-gray-900 truncate">
                          {result.title}
                        </h5>
                        <ExternalLink className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      </div>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {result.snippet}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getTypeColor(result.type)}`}>
                          {getTypeIcon(result.type)} {result.type}
                        </Badge>
                        <span className="text-xs text-gray-500">{result.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {!isLoading && query.length > 1 && suggestions.length > 0 && (
            <div className="border-b border-gray-100">
              <div className="p-4 bg-gray-50 border-b">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Suggestions
                </h4>
              </div>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <Search className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{suggestion}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {!isLoading && query.length === 0 && recentSearches.length > 0 && (
            <div className="border-b border-gray-100">
              <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recent Searches
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-500 hover:text-gray-700 h-6 px-2"
                >
                  Clear
                </Button>
              </div>
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{search}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          {!isLoading && query.length === 0 && recentSearches.length === 0 && (
            <div>
              <div className="p-4 bg-gray-50 border-b">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Popular Searches
                </h4>
              </div>
              {searchService.getPopularSearches().map((search, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{search}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && query.length > 1 && results.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm font-medium mb-1">No results found for "{query}"</p>
              <p className="text-xs">Try different keywords or check spelling</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Press Enter to search • ESC to close</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSearch()}
              disabled={!query.trim()}
              className="h-7 px-3 text-xs"
            >
              View All Results
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
