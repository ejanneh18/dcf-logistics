import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ChatProvider } from "@/components/chat/chat-provider"
import { ChatWidget } from "@/components/chat/chat-widget"
import { InstallPrompt } from "@/components/pwa/install-prompt"
import { PWAStatus } from "@/components/pwa/pwa-status"
import { SessionProvider } from "@/components/providers/session-provider"
import { TRPCProvider } from "@/components/providers/trpc-provider"
import { ProgressProvider } from "@/components/providers/progress-provider"
import { GlobalProgressBar } from "@/components/ui/global-progress-bar"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DCF Logistics - Digital Clearing and Forwarding Logistics",
  description: "Professional logistics, clearing, and forwarding services for businesses of all sizes.",
  keywords: ["logistics", "shipping", "freight", "customs", "clearing", "forwarding"],
  authors: [{ name: "DCF Logistics" }],
  creator: "DCF Logistics",
  publisher: "DCF Logistics",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DCF Logistics",
  },
  openGraph: {
    type: "website",
    siteName: "DCF Logistics",
    title: "DCF Logistics - Digital Clearing and Forwarding",
    description: "Professional logistics, clearing, and forwarding services for businesses of all sizes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DCF Logistics - Digital Clearing and Forwarding",
    description: "Professional logistics, clearing, and forwarding services for businesses of all sizes.",
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DCF Logistics" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0070c7" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <TRPCProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <ProgressProvider>
                <GlobalProgressBar
                  height={3}
                  color="#007cba"
                  showMessage={true}
                  position="top"
                />
                <ChatProvider>
                  <div className="flex min-h-screen flex-col">
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                  </div>
                  <ChatWidget />
                  <InstallPrompt />
                  <PWAStatus />
                  <Toaster />
                  <SonnerToaster />
                </ChatProvider>
              </ProgressProvider>
            </ThemeProvider>
          </TRPCProvider>
        </SessionProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
