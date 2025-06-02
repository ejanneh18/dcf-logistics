'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProgressContext } from '@/components/providers/progress-provider'
import { cn } from '@/lib/utils'

interface GlobalProgressBarProps {
  className?: string
  height?: number
  color?: string
  showMessage?: boolean
  position?: 'top' | 'bottom'
}

export function GlobalProgressBar({
  className,
  height = 3,
  color = '#007cba',
  showMessage = false,
  position = 'top'
}: GlobalProgressBarProps) {
  const router = useRouter()
  const { isLoading, progress, message, start, finish } = useProgressContext()
  const [routeLoading, setRouteLoading] = useState(false)

  // Handle Next.js router events
  useEffect(() => {
    const handleStart = (url: string) => {
      setRouteLoading(true)
      start('Loading page...')
    }

    const handleComplete = () => {
      setRouteLoading(false)
      finish()
    }

    const handleError = () => {
      setRouteLoading(false)
      finish()
    }

    // For Next.js 13+ App Router, we need to handle navigation differently
    if (typeof window !== 'undefined') {
      // Listen for navigation start
      const originalPushState = window.history.pushState
      const originalReplaceState = window.history.replaceState

      window.history.pushState = function(...args) {
        handleStart(args[2] as string)
        return originalPushState.apply(this, args)
      }

      window.history.replaceState = function(...args) {
        handleStart(args[2] as string)
        return originalReplaceState.apply(this, args)
      }

      // Listen for navigation end
      const handlePopState = () => {
        setTimeout(handleComplete, 100)
      }

      window.addEventListener('popstate', handlePopState)

      return () => {
        window.history.pushState = originalPushState
        window.history.replaceState = originalReplaceState
        window.removeEventListener('popstate', handlePopState)
      }
    }
  }, [start, finish])

  // Auto-complete navigation after a delay
  useEffect(() => {
    if (routeLoading) {
      const timer = setTimeout(() => {
        setRouteLoading(false)
        finish()
      }, 2000) // Auto-complete after 2 seconds

      return () => clearTimeout(timer)
    }
  }, [routeLoading, finish])

  if (!isLoading && !routeLoading) return null

  const positionClasses = position === 'top' 
    ? 'top-0' 
    : 'bottom-0'

  return (
    <>
      {/* Progress Bar */}
      <div
        className={cn(
          'fixed left-0 right-0 z-50 pointer-events-none',
          positionClasses,
          className
        )}
        style={{ height: `${height}px` }}
        role="progressbar"
        aria-label="Loading progress"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Main progress bar */}
        <div
          className="h-full transition-all duration-300 ease-out relative overflow-hidden"
          style={{
            backgroundColor: color,
            width: `${progress * 100}%`,
            boxShadow: `0 0 10px ${color}40, 0 0 5px ${color}20`
          }}
        >
          {/* Animated shimmer effect */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`,
              animation: 'shimmer 1.5s infinite'
            }}
          />
        </div>

        {/* Glow effect at the end */}
        {progress > 0 && progress < 1 && (
          <div
            className="absolute h-full w-20 opacity-60"
            style={{
              right: 0,
              top: 0,
              background: `linear-gradient(to right, transparent, ${color}60, ${color})`,
              filter: 'blur(2px)'
            }}
          />
        )}
      </div>

      {/* Loading Message */}
      {showMessage && message && (isLoading || routeLoading) && (
        <div
          className={cn(
            'fixed left-1/2 transform -translate-x-1/2 z-50 pointer-events-none',
            position === 'top' ? 'top-8' : 'bottom-8'
          )}
        >
          <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 border-2 border-t-transparent rounded-full animate-spin"
                style={{ borderColor: `${color} transparent transparent transparent` }}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {message}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  )
}

export default GlobalProgressBar
