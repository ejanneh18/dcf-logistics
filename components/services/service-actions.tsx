"use client"

import Link from "next/link"

export function ServiceActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        href="/quote"
        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
      >
        Get a Quote
      </Link>
      <Link
        href="/contact"
        className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/5 transition-colors font-medium"
      >
        Contact Us
      </Link>
    </div>
  )
}
