"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, RefreshCw, Download } from "lucide-react"

export function PWAStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)

  useEffect(() => {
    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    setIsOnline(navigator.onLine)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Register service worker and check for updates
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          setRegistration(reg)

          // Check for updates
          reg.addEventListener("updatefound", () => {
            const newWorker = reg.installing
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  setUpdateAvailable(true)
                }
              })
            }
          })
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error)
        })
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleUpdate = () => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" })
      window.location.reload()
    }
  }

  return (
    <div className="fixed top-20 right-4 z-40 space-y-2">
      {/* Online/Offline Status */}
      <Badge variant={isOnline ? "default" : "destructive"} className="flex items-center gap-1">
        {isOnline ? (
          <>
            <Wifi className="h-3 w-3" />
            Online
          </>
        ) : (
          <>
            <WifiOff className="h-3 w-3" />
            Offline
          </>
        )}
      </Badge>

      {/* Update Available */}
      {updateAvailable && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Update Available</span>
            </div>
            <Button size="sm" onClick={handleUpdate}>
              <RefreshCw className="h-3 w-3 mr-1" />
              Update
            </Button>
          </div>
          <p className="text-xs text-blue-700 mt-1">A new version of the app is ready to install.</p>
        </div>
      )}
    </div>
  )
}
