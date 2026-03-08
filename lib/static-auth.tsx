'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { isStaticDeployment, getDeploymentConfig } from './deployment-mode'

// Mock user type for static export
interface StaticUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'customer' | 'staff'
  image?: string
  companyName?: string
  phone?: string
}

interface StaticAuthContextType {
  user: StaticUser | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
  isAuthenticated: boolean
  isStaticMode: boolean
  deploymentConfig: ReturnType<typeof getDeploymentConfig>
}

const StaticAuthContext = createContext<StaticAuthContextType | undefined>(undefined)

// Demo users for static export
const demoUsers: StaticUser[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@dcflogistics.gm',
    role: 'admin',
    image: '/avatars/admin.png',
    companyName: 'DCF Logistics',
    phone: '+220-395-1020'
  },
  {
    id: '2',
    name: 'Demo Customer',
    email: 'customer@demo.com',
    role: 'customer',
    image: '/placeholder-user.jpg',
    companyName: 'Demo Company Ltd',
    phone: '+220-987-6543'
  },
  {
    id: '3',
    name: 'Staff Member',
    email: 'staff@dcflogistics.gm',
    role: 'staff',
    image: '/placeholder-user.jpg',
    companyName: 'DCF Logistics',
    phone: '+220-555-0123'
  }
]

export function StaticAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StaticUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const deploymentConfig = getDeploymentConfig()
  const staticMode = isStaticDeployment()

  useEffect(() => {
    // Only use localStorage in static mode or when server-side auth is not available
    if (staticMode && typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('static-auth-user')
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error('Error parsing stored user:', error)
          localStorage.removeItem('static-auth-user')
        }
      }
    }
    setIsLoading(false)
  }, [staticMode])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // In static mode, use demo authentication
    if (staticMode) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Find demo user
      const foundUser = demoUsers.find(u => u.email === email)

      if (foundUser && (password === 'demo123' || password === 'admin123')) {
        setUser(foundUser)
        if (typeof window !== 'undefined') {
          localStorage.setItem('static-auth-user', JSON.stringify(foundUser))
        }
        setIsLoading(false)
        return true
      }

      setIsLoading(false)
      return false
    }

    // In server mode, this should not be used - redirect to proper auth
    setIsLoading(false)
    return false
  }

  const signOut = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('static-auth-user')
    }
  }

  const value: StaticAuthContextType = {
    user,
    isLoading,
    signIn,
    signOut,
    isAuthenticated: !!user,
    isStaticMode: staticMode,
    deploymentConfig,
  }

  return (
    <StaticAuthContext.Provider value={value}>
      {children}
    </StaticAuthContext.Provider>
  )
}

export function useStaticAuth() {
  const context = useContext(StaticAuthContext)
  if (context === undefined) {
    throw new Error('useStaticAuth must be used within a StaticAuthProvider')
  }
  return context
}

// Mock session hook to replace useSession from next-auth
export function useSession() {
  const { user, isLoading } = useStaticAuth()
  
  return {
    data: user ? { user } : null,
    status: isLoading ? 'loading' : user ? 'authenticated' : 'unauthenticated',
  }
}

// Mock signIn function to replace next-auth signIn
export async function signIn(provider?: string, options?: any) {
  if (typeof window !== 'undefined') {
    // For static export, redirect to a demo login page or show alert
    alert('This is a demo version. Use email: admin@dcflogistics.gm, password: demo123')
    return { error: null, status: 200, ok: true, url: null }
  }
}

// Mock signOut function to replace next-auth signOut
export async function signOut(options?: any) {
  if (typeof window !== 'undefined') {
    const { signOut: staticSignOut } = useStaticAuth()
    staticSignOut()
    if (options?.callbackUrl) {
      window.location.href = options.callbackUrl
    }
  }
}

// Mock getServerSession for static export
export async function getServerSession() {
  return null // Always return null for static export
}
