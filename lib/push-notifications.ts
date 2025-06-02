"use client"

// Push notification utility functions
export class PushNotificationService {
  private static instance: PushNotificationService
  private registration: ServiceWorkerRegistration | null = null

  private constructor() {}

  static getInstance(): PushNotificationService {
    if (!PushNotificationService.instance) {
      PushNotificationService.instance = new PushNotificationService()
    }
    return PushNotificationService.instance
  }

  async initialize(): Promise<boolean> {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.log("Push messaging is not supported")
      return false
    }

    try {
      this.registration = await navigator.serviceWorker.register("/sw.js")
      console.log("Service Worker registered successfully")
      return true
    } catch (error) {
      console.error("Service Worker registration failed:", error)
      return false
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications")
      return "denied"
    }

    if (Notification.permission === "granted") {
      return "granted"
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission()
      return permission
    }

    return Notification.permission
  }

  async subscribe(): Promise<PushSubscription | null> {
    if (!this.registration) {
      await this.initialize()
    }

    if (!this.registration) {
      return null
    }

    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ""),
      })

      // Send subscription to server
      await this.sendSubscriptionToServer(subscription)
      return subscription
    } catch (error) {
      console.error("Failed to subscribe to push notifications:", error)
      return null
    }
  }

  async unsubscribe(): Promise<boolean> {
    if (!this.registration) {
      return false
    }

    try {
      const subscription = await this.registration.pushManager.getSubscription()
      if (subscription) {
        await subscription.unsubscribe()
        await this.removeSubscriptionFromServer(subscription)
        return true
      }
      return false
    } catch (error) {
      console.error("Failed to unsubscribe from push notifications:", error)
      return false
    }
  }

  async getSubscription(): Promise<PushSubscription | null> {
    if (!this.registration) {
      await this.initialize()
    }

    if (!this.registration) {
      return null
    }

    return await this.registration.pushManager.getSubscription()
  }

  private async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    try {
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      })
    } catch (error) {
      console.error("Failed to send subscription to server:", error)
    }
  }

  private async removeSubscriptionFromServer(subscription: PushSubscription): Promise<void> {
    try {
      await fetch("/api/push/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      })
    } catch (error) {
      console.error("Failed to remove subscription from server:", error)
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  // Predefined notification templates
  static templates = {
    shipmentUpdate: (trackingNumber: string, status: string) => ({
      title: "Shipment Update",
      body: `Your shipment ${trackingNumber} is now ${status}`,
      icon: "/icons/icon-192x192.png",
      badge: "/icons/badge-72x72.png",
      tag: `shipment-${trackingNumber}`,
      data: { trackingNumber, type: "shipment_update" },
    }),

    quoteReady: (quoteId: string) => ({
      title: "Quote Ready",
      body: `Your shipping quote #${quoteId} is ready for review`,
      icon: "/icons/icon-192x192.png",
      badge: "/icons/badge-72x72.png",
      tag: `quote-${quoteId}`,
      data: { quoteId, type: "quote_ready" },
    }),

    generalUpdate: (message: string) => ({
      title: "DCF Logistics",
      body: message,
      icon: "/icons/icon-192x192.png",
      badge: "/icons/badge-72x72.png",
      tag: "general",
      data: { type: "general" },
    }),
  }
}

// Export singleton instance
export const pushNotificationService = PushNotificationService.getInstance()
