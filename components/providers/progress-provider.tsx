'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface ProgressContextType {
  isLoading: boolean
  progress: number
  message?: string
  start: (message?: string) => void
  increment: (amount?: number) => void
  setProgress: (value: number, message?: string) => void
  finish: () => void
  reset: () => void
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

interface ProgressProviderProps {
  children: ReactNode
}

export function ProgressProvider({ children }: ProgressProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgressValue] = useState(0)
  const [message, setMessage] = useState<string | undefined>()

  const start = useCallback((msg?: string) => {
    setIsLoading(true)
    setProgressValue(0.1)
    setMessage(msg)
  }, [])

  const increment = useCallback((amount = 0.1) => {
    setProgressValue(prev => {
      const newValue = Math.min(prev + amount, 0.95)
      return newValue
    })
  }, [])

  const setProgress = useCallback((value: number, msg?: string) => {
    setProgressValue(Math.max(0, Math.min(value, 1)))
    if (msg !== undefined) {
      setMessage(msg)
    }
  }, [])

  const finish = useCallback(() => {
    setProgressValue(1)
    setTimeout(() => {
      setIsLoading(false)
      setProgressValue(0)
      setMessage(undefined)
    }, 300)
  }, [])

  const reset = useCallback(() => {
    setIsLoading(false)
    setProgressValue(0)
    setMessage(undefined)
  }, [])

  const value: ProgressContextType = {
    isLoading,
    progress,
    message,
    start,
    increment,
    setProgress,
    finish,
    reset
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgressContext() {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgressContext must be used within a ProgressProvider')
  }
  return context
}

export default ProgressProvider
