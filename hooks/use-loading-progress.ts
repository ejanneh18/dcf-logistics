'use client'

import { useEffect, useRef } from 'react'
import { useProgressContext } from '@/components/providers/progress-provider'

interface UseLoadingProgressOptions {
  message?: string
  autoIncrement?: boolean
  incrementInterval?: number
  incrementAmount?: number
}

export function useLoadingProgress(
  isLoading: boolean,
  options: UseLoadingProgressOptions = {}
) {
  const {
    message = 'Loading...',
    autoIncrement = true,
    incrementInterval = 500,
    incrementAmount = 0.1
  } = options

  const { start, increment, finish, setProgress } = useProgressContext()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (isLoading) {
      startTimeRef.current = Date.now()
      start(message)

      if (autoIncrement) {
        intervalRef.current = setInterval(() => {
          increment(incrementAmount)
        }, incrementInterval)
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      
      // Add a small delay to show completion
      const elapsedTime = startTimeRef.current ? Date.now() - startTimeRef.current : 0
      const minDisplayTime = 300 // Minimum time to show progress
      
      if (elapsedTime < minDisplayTime) {
        setTimeout(finish, minDisplayTime - elapsedTime)
      } else {
        finish()
      }
      
      startTimeRef.current = null
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isLoading, message, autoIncrement, incrementInterval, incrementAmount, start, increment, finish])

  return {
    setProgress,
    increment,
    finish
  }
}

// Hook for form submission progress
export function useFormProgress() {
  const { start, setProgress, finish } = useProgressContext()

  const startSubmission = (message = 'Submitting form...') => {
    start(message)
  }

  const updateProgress = (step: number, totalSteps: number, message?: string) => {
    const progress = Math.min(step / totalSteps, 0.95)
    setProgress(progress, message)
  }

  const completeSubmission = () => {
    setProgress(1, 'Complete!')
    setTimeout(finish, 500)
  }

  const failSubmission = () => {
    finish()
  }

  return {
    startSubmission,
    updateProgress,
    completeSubmission,
    failSubmission
  }
}

// Hook for API request progress
export function useApiProgress() {
  const { start, setProgress, finish } = useProgressContext()

  const startRequest = (message = 'Processing request...') => {
    start(message)
  }

  const updateRequest = (progress: number, message?: string) => {
    setProgress(Math.min(progress, 0.95), message)
  }

  const completeRequest = (message = 'Request completed') => {
    setProgress(1, message)
    setTimeout(finish, 300)
  }

  const failRequest = () => {
    finish()
  }

  return {
    startRequest,
    updateRequest,
    completeRequest,
    failRequest
  }
}

// Hook for file upload progress
export function useUploadProgress() {
  const { start, setProgress, finish } = useProgressContext()

  const startUpload = (fileName?: string) => {
    const message = fileName ? `Uploading ${fileName}...` : 'Uploading file...'
    start(message)
  }

  const updateUpload = (loaded: number, total: number, fileName?: string) => {
    const progress = Math.min(loaded / total, 0.95)
    const message = fileName 
      ? `Uploading ${fileName}... ${Math.round(progress * 100)}%`
      : `Uploading... ${Math.round(progress * 100)}%`
    setProgress(progress, message)
  }

  const completeUpload = (fileName?: string) => {
    const message = fileName ? `${fileName} uploaded successfully` : 'Upload completed'
    setProgress(1, message)
    setTimeout(finish, 1000)
  }

  const failUpload = () => {
    finish()
  }

  return {
    startUpload,
    updateUpload,
    completeUpload,
    failUpload
  }
}

export default useLoadingProgress
