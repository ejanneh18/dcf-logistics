import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { StaticAuthProvider } from "@/lib/static-auth"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingWidgets from "@/components/floating-widgets"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "DCF Logistics - Digital Clearing & Forwarding | The Gambia",
    template: "%s | DCF Logistics",
  },
  description: "DCF Logistics offers professional clearing, forwarding, air & sea freight, customs brokerage, and warehousing services across West Africa. Based in Serekunda, The Gambia.",
  keywords: ["logistics", "shipping", "freight", "customs clearance", "clearing and forwarding", "air freight", "sea freight", "warehousing", "The Gambia", "West Africa", "DCF Logistics", "customs brokerage", "haulage"],
  authors: [{ name: "DCF Logistics" }],
  creator: "DCF Logistics",
  publisher: "DCF Logistics",
  metadataBase: new URL("https://dcflogistics.gm"),
  alternates: {
    canonical: "/",
  },
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
    title: "DCF Logistics - Digital Clearing & Forwarding | The Gambia",
    description: "Professional logistics, clearing, forwarding, and freight services across West Africa. Air freight, sea freight, customs brokerage & warehousing.",
    locale: "en_US",
    url: "https://dcflogistics.gm",
  },
  twitter: {
    card: "summary_large_image",
    title: "DCF Logistics - Digital Clearing & Forwarding",
    description: "Professional logistics, clearing, forwarding, and freight services across West Africa.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DCF Logistics" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0070c7" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DCF Logistics",
              url: "https://dcflogistics.gm",
              logo: "https://dcflogistics.gm/icons/apple-touch-icon.png",
              description: "Professional clearing, forwarding, and freight logistics services across West Africa.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "IC PLAZA Cooperative Junction Westfield",
                addressLocality: "Serekunda",
                addressCountry: "GM",
              },
              telephone: "+220 395 1020",
              email: "info@dcfagency.com",
              sameAs: [],
              areaServed: {
                "@type": "GeoCircle",
                geoMidpoint: { "@type": "GeoCoordinates", latitude: 13.4549, longitude: -16.579 },
                geoRadius: "2000 km",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <StaticAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <FloatingWidgets />
            <Toaster />
            <SonnerToaster />
          </ThemeProvider>
        </StaticAuthProvider>

      </body>
    </html>
  )
}
