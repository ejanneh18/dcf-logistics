import type { Metadata } from "next"
import { Suspense } from "react"
import SearchResults from "@/components/search-results"

export const metadata: Metadata = {
  title: "Search Results | DCF Logistics",
  description: "Search results for DCF Logistics services, pages, and information.",
}

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Search Results</h1>
            <p className="text-lg text-gray-600">
              Find information about our services, pages, and frequently asked questions.
            </p>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          <Suspense fallback={
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
                ))}
              </div>
            </div>
          }>
            <SearchResults />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
