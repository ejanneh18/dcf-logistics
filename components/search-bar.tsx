'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, X, Clock, TrendingUp } from 'lucide-react'
import { searchService, type SearchResult } from '@/lib/search/search-service'

interface SearchBarProps {
  variant?: 'header' | 'page' | 'mobile'
  placeholder?: string
  className?: string
  onClose?: () => void
}

export default function SearchBar({ 
  variant = 'header', 
  placeholder = 'Search services, pages, FAQs...',
  className = '',
  onClose 
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dcf-recent-searches')
      if (saved) {
        setRecentSearches(JSON.parse(saved))
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

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string = query) => {
    if (!searchQuery.trim()) return

    // Save to recent searches
    const updatedRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
    setRecentSearches(updatedRecent)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('dcf-recent-searches', JSON.stringify(updatedRecent))
    }

    // Navigate to search results page
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    setIsOpen(false)
    setQuery('')
    onClose?.()
  }

  const handleResultClick = (result: SearchResult) => {
    // Save to recent searches
    const updatedRecent = [result.title, ...recentSearches.filter(s => s !== result.title)].slice(0, 5)
    setRecentSearches(updatedRecent)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('dcf-recent-searches', JSON.stringify(updatedRecent))
    }

    router.push(result.url)
    setIsOpen(false)
    setQuery('')
    onClose?.()
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    handleSearch(suggestion)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dcf-recent-searches')
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'mobile':
        return 'w-full'
      case 'page':
        return 'w-full max-w-2xl mx-auto'
      default:
        return 'w-64 lg:w-80'
    }
  }

  return (
    <div ref={searchRef} className={`relative ${getVariantStyles()} ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            } else if (e.key === 'Escape') {
              setIsOpen(false)
              setQuery('')
            }
          }}
          placeholder={placeholder}
          className="pl-10 pr-10 h-10 bg-white border-gray-300 focus:border-primary focus:ring-primary"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuery('')}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Dropdown */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg border-gray-200">
          <CardContent className="p-0 max-h-96 overflow-y-auto">
            {/* Loading State */}
            {isLoading && (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-sm">Searching...</p>
              </div>
            )}

            {/* Search Results */}
            {!isLoading && results.length > 0 && (
              <div className="border-b border-gray-100">
                <div className="p-3 bg-gray-50 border-b">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Search Results
                  </h4>
                </div>
                {results.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-medium text-gray-900 truncate">
                          {result.title}
                        </h5>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {result.snippet}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {result.type}
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
                <div className="p-3 bg-gray-50 border-b">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Suggestions
                  </h4>
                </div>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
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
                <div className="p-3 bg-gray-50 border-b flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Recent Searches
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearRecentSearches}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </Button>
                </div>
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
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
                <div className="p-3 bg-gray-50 border-b">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Popular Searches
                  </h4>
                </div>
                {searchService.getPopularSearches().map((search, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
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
              <div className="p-6 text-center text-gray-500">
                <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No results found for "{query}"</p>
                <p className="text-xs mt-1">Try different keywords or check spelling</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
