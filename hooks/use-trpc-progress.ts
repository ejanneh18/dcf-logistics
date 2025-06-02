'use client'

import { useEffect } from 'react'
import { useLoadingProgress } from './use-loading-progress'

// Hook to integrate tRPC queries with progress bar
export function useTRPCProgress<T>(
  query: {
    isLoading: boolean
    isFetching: boolean
    data?: T
    error?: any
  },
  message?: string
) {
  const isLoading = query.isLoading || query.isFetching
  
  useLoadingProgress(isLoading, {
    message: message || 'Loading data...',
    autoIncrement: true,
    incrementInterval: 300,
    incrementAmount: 0.05
  })

  return query
}

// Hook for tRPC mutations with progress
export function useTRPCMutationProgress<T>(
  mutation: {
    isLoading: boolean
    data?: T
    error?: any
    mutate: (...args: any[]) => void
    mutateAsync: (...args: any[]) => Promise<T>
  },
  options?: {
    startMessage?: string
    successMessage?: string
    errorMessage?: string
  }
) {
  const {
    startMessage = 'Processing...',
    successMessage = 'Success!',
    errorMessage = 'Error occurred'
  } = options || {}

  useLoadingProgress(mutation.isLoading, {
    message: startMessage,
    autoIncrement: true,
    incrementInterval: 200,
    incrementAmount: 0.08
  })

  const mutateWithProgress = async (...args: any[]) => {
    try {
      const result = await mutation.mutateAsync(...args)
      return result
    } catch (error) {
      throw error
    }
  }

  return {
    ...mutation,
    mutateWithProgress
  }
}

// Hook for multiple tRPC queries
export function useMultipleTRPCProgress(
  queries: Array<{
    isLoading: boolean
    isFetching: boolean
    data?: any
    error?: any
  }>,
  message?: string
) {
  const isAnyLoading = queries.some(q => q.isLoading || q.isFetching)
  const loadingCount = queries.filter(q => q.isLoading || q.isFetching).length
  
  useLoadingProgress(isAnyLoading, {
    message: message || `Loading ${loadingCount} items...`,
    autoIncrement: true,
    incrementInterval: 400,
    incrementAmount: 0.03
  })

  return {
    isAnyLoading,
    loadingCount,
    allLoaded: queries.every(q => !q.isLoading && !q.isFetching),
    hasErrors: queries.some(q => q.error),
    allData: queries.map(q => q.data)
  }
}

export default useTRPCProgress
