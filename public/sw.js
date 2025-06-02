const CACHE_NAME = "dcf-logistics-v1"
const OFFLINE_URL = "/offline"

// Files to cache for offline functionality
const STATIC_CACHE_URLS = [
  "/",
  "/offline",
  "/tracking",
  "/quote",
  "/calculator",
  "/services",
  "/about",
  "/contact",
  "/manifest.json",
]

// Dynamic cache patterns
const CACHE_PATTERNS = [
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/,
  /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
  /\.(?:js|css)$/,
]

// Install event - cache static resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Caching static resources")
        return cache.addAll(STATIC_CACHE_URLS)
      })
      .then(() => {
        return self.skipWaiting()
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Deleting old cache:", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        return self.clients.claim()
      }),
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return
  }

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith("http")) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(event.request)
        .then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Check if we should cache this request
          const shouldCache = CACHE_PATTERNS.some((pattern) => pattern.test(event.request.url))

          if (shouldCache) {
            const responseToCache = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache)
            })
          }

          return response
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_URL)
          }

          // Return a generic offline response for other requests
          return new Response("Offline", {
            status: 503,
            statusText: "Service Unavailable",
          })
        })
    }),
  )
})

// Background sync for form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync())
  }
})

// Push notification handling
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New notification from DCF Logistics",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
    },
    actions: [
      {
        action: "explore",
        title: "View Details",
        icon: "/icons/checkmark.png",
      },
      {
        action: "close",
        title: "Close",
        icon: "/icons/xmark.png",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("DCF Logistics", options))
})

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/tracking"))
  } else if (event.action === "close") {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(clients.openWindow("/"))
  }
})

// Background sync function
async function doBackgroundSync() {
  try {
    // Handle any pending form submissions
    const pendingRequests = await getStoredRequests()

    for (const request of pendingRequests) {
      try {
        await fetch(request.url, request.options)
        await removeStoredRequest(request.id)
      } catch (error) {
        console.log("Background sync failed for request:", request.id)
      }
    }
  } catch (error) {
    console.log("Background sync error:", error)
  }
}

// Helper functions for background sync
async function getStoredRequests() {
  // Implementation would depend on your storage strategy
  return []
}

async function removeStoredRequest(id) {
  // Implementation would depend on your storage strategy
}
