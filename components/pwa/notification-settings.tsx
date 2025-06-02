"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Bell, BellOff, Settings } from "lucide-react"
import { pushNotificationService } from "@/lib/push-notifications"

export function NotificationSettings() {
  const [permission, setPermission] = useState<NotificationPermission>("default")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [preferences, setPreferences] = useState({
    shipmentUpdates: true,
    quoteNotifications: true,
    generalUpdates: false,
    marketingEmails: false,
  })

  useEffect(() => {
    checkNotificationStatus()
  }, [])

  const checkNotificationStatus = async () => {
    if ("Notification" in window) {
      setPermission(Notification.permission)

      const subscription = await pushNotificationService.getSubscription()
      setIsSubscribed(!!subscription)
    }
  }

  const handleEnableNotifications = async () => {
    setLoading(true)

    try {
      const permission = await pushNotificationService.requestPermission()
      setPermission(permission)

      if (permission === "granted") {
        const subscription = await pushNotificationService.subscribe()
        setIsSubscribed(!!subscription)
      }
    } catch (error) {
      console.error("Failed to enable notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDisableNotifications = async () => {
    setLoading(true)

    try {
      const success = await pushNotificationService.unsubscribe()
      if (success) {
        setIsSubscribed(false)
      }
    } catch (error) {
      console.error("Failed to disable notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))

    // Save preferences to localStorage or send to server
    const newPreferences = { ...preferences, [key]: !preferences[key] }
    localStorage.setItem("notificationPreferences", JSON.stringify(newPreferences))
  }

  const getPermissionBadge = () => {
    switch (permission) {
      case "granted":
        return <Badge className="bg-green-100 text-green-800">Enabled</Badge>
      case "denied":
        return <Badge variant="destructive">Blocked</Badge>
      default:
        return <Badge variant="secondary">Not Set</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Notification Settings
        </CardTitle>
        <CardDescription>
          Manage your push notification preferences for shipment updates and important information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Permission Status */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium">Push Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive real-time updates about your shipments</p>
          </div>
          <div className="flex items-center gap-2">
            {getPermissionBadge()}
            {permission === "granted" && isSubscribed ? (
              <Button variant="outline" size="sm" onClick={handleDisableNotifications} disabled={loading}>
                <BellOff className="h-4 w-4 mr-2" />
                Disable
              </Button>
            ) : (
              <Button onClick={handleEnableNotifications} disabled={loading || permission === "denied"} size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Enable
              </Button>
            )}
          </div>
        </div>

        {/* Notification Preferences */}
        {permission === "granted" && isSubscribed && (
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-medium">Notification Types</h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="shipment-updates">Shipment Updates</Label>
                  <p className="text-sm text-muted-foreground">Get notified when your shipment status changes</p>
                </div>
                <Switch
                  id="shipment-updates"
                  checked={preferences.shipmentUpdates}
                  onCheckedChange={() => handlePreferenceChange("shipmentUpdates")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="quote-notifications">Quote Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts when quotes are ready</p>
                </div>
                <Switch
                  id="quote-notifications"
                  checked={preferences.quoteNotifications}
                  onCheckedChange={() => handlePreferenceChange("quoteNotifications")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="general-updates">General Updates</Label>
                  <p className="text-sm text-muted-foreground">Service announcements and important news</p>
                </div>
                <Switch
                  id="general-updates"
                  checked={preferences.generalUpdates}
                  onCheckedChange={() => handlePreferenceChange("generalUpdates")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing-emails">Marketing Communications</Label>
                  <p className="text-sm text-muted-foreground">Promotional offers and newsletters</p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={preferences.marketingEmails}
                  onCheckedChange={() => handlePreferenceChange("marketingEmails")}
                />
              </div>
            </div>
          </div>
        )}

        {/* Help Text */}
        {permission === "denied" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              Notifications are blocked. To enable them, click the lock icon in your browser's address bar and allow
              notifications for this site.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
