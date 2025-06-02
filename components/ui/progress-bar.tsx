'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  className?: string
  height?: number
  color?: string
  speed?: number
  showOnShallow?: boolean
  options?: {
    showSpinner?: boolean
    easing?: string
    speed?: number
    trickle?: boolean
    trickleSpeed?: number
    minimum?: number
  }
}

interface ProgressState {
  isLoading: boolean
  progress: number
}

export function ProgressBar({
  className,
  height = 3,
  color = '#007cba',
  speed = 200,
  showOnShallow = true,
  options = {}
}: ProgressBarProps) {
  const router = useRouter()
  const [state, setState] = useState<ProgressState>({
    isLoading: false,
    progress: 0
  })

  const {
    showSpinner = false,
    easing = 'ease',
    trickle = true,
    trickleSpeed = 200,
    minimum = 0.08
  } = options

  // Progress animation functions
  const inc = (amount?: number) => {
    let n = state.progress
    if (!n) {
      return start()
    } else if (n > 1) {
      return
    } else {
      if (typeof amount !== 'number') {
        if (n >= 0 && n < 0.2) amount = 0.1
        else if (n >= 0.2 && n < 0.5) amount = 0.04
        else if (n >= 0.5 && n < 0.8) amount = 0.02
        else if (n >= 0.8 && n < 0.99) amount = 0.005
        else amount = 0
      }

      n = clamp(n + amount, 0, 0.994)
      setState(prev => ({ ...prev, progress: n }))
      return n
    }
  }

  const clamp = (n: number, min: number, max: number) => {
    if (n < min) return min
    if (n > max) return max
    return n
  }

  const start = () => {
    setState(prev => ({ ...prev, isLoading: true, progress: minimum }))
  }

  const done = (force?: boolean) => {
    if (!force && !state.isLoading) return
    setState(prev => ({ ...prev, progress: 1 }))
    setTimeout(() => {
      setState({ isLoading: false, progress: 0 })
    }, speed)
  }

  const trickleProgress = () => {
    if (state.isLoading && state.progress < 1) {
      inc()
    }
  }

  // Router event handlers
  useEffect(() => {
    let trickleTimer: NodeJS.Timeout

    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        start()
        if (trickle) {
          trickleTimer = setInterval(trickleProgress, trickleSpeed)
        }
      }
    }

    const handleComplete = () => {
      clearInterval(trickleTimer)
      done()
    }

    const handleError = () => {
      clearInterval(trickleTimer)
      done()
    }

    // Listen to router events
    router.events?.on('routeChangeStart', handleStart)
    router.events?.on('routeChangeComplete', handleComplete)
    router.events?.on('routeChangeError', handleError)

    return () => {
      clearInterval(trickleTimer)
      router.events?.off('routeChangeStart', handleStart)
      router.events?.off('routeChangeComplete', handleComplete)
      router.events?.off('routeChangeError', handleError)
    }
  }, [router, state.isLoading, state.progress, trickle, trickleSpeed])

  // Auto-trickle effect
  useEffect(() => {
    let trickleTimer: NodeJS.Timeout
    if (trickle && state.isLoading) {
      trickleTimer = setInterval(trickleProgress, trickleSpeed)
    }
    return () => clearInterval(trickleTimer)
  }, [state.isLoading, trickle, trickleSpeed])

  if (!state.isLoading) return null

  return (
    <>
      <div
        className={cn(
          'fixed top-0 left-0 right-0 z-50 pointer-events-none',
          className
        )}
        style={{ height: `${height}px` }}
        role="progressbar"
        aria-label="Page loading progress"
        aria-valuenow={Math.round(state.progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full transition-all duration-200 ease-out"
          style={{
            backgroundColor: color,
            width: `${state.progress * 100}%`,
            transition: `width ${speed}ms ${easing}`,
            boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`
          }}
        />
        
        {/* Glow effect */}
        <div
          className="absolute top-0 right-0 h-full w-24 opacity-100"
          style={{
            background: `linear-gradient(to right, transparent, ${color}40, ${color})`,
            transform: `translateX(${state.progress < 0.99 ? 0 : 100}%)`,
            transition: `transform ${speed}ms ${easing}`
          }}
        />
      </div>

      {/* Optional spinner */}
      {showSpinner && (
        <div
          className="fixed top-4 right-4 z-50 pointer-events-none"
          role="status"
          aria-label="Loading"
        >
          <div
            className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: `${color} transparent transparent transparent` }}
          />
        </div>
      )}
    </>
  )
}

// Hook for manual progress control
export function useProgress() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const start = () => {
    setIsLoading(true)
    setProgress(0.08)
  }

  const inc = (amount = 0.1) => {
    setProgress(prev => Math.min(prev + amount, 0.994))
  }

  const done = () => {
    setProgress(1)
    setTimeout(() => {
      setIsLoading(false)
      setProgress(0)
    }, 200)
  }

  const set = (value: number) => {
    setProgress(Math.max(0, Math.min(value, 1)))
  }

  return {
    progress,
    isLoading,
    start,
    inc,
    done,
    set
  }
}

export default ProgressBar
