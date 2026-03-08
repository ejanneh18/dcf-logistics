/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel deployment configuration - Full Next.js features
  
  // Enable all server-side features
  serverExternalPackages: ['@prisma/client'],

  // Image optimization for Vercel
  images: {
    domains: [
      'localhost',
      'res.cloudinary.com',
      'images.unsplash.com',
      'via.placeholder.com',
      'unsplash.com'
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Build optimizations
  eslint: {
    ignoreDuringBuilds: true, // Disable linting for Vercel builds
  },
  typescript: {
    ignoreBuildErrors: true, // Disable type checking for Vercel builds
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ]
  },

  // Redirects for better SEO
  async redirects() {
    return []
  },

  // Environment variables for Vercel
  env: {
    DEPLOYMENT_TYPE: 'vercel',
    NEXT_PUBLIC_DEPLOYMENT_TYPE: 'vercel',
    NEXT_PUBLIC_SITE_URL: process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },

  // Webpack configuration for Vercel
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      }
    }

    // Handle Prisma client
    if (isServer) {
      config.externals.push('@prisma/client')
    }

    // Suppress warning for optional @sendgrid/mail (loaded via dynamic require)
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /lib[\\/]email[\\/]config\.ts/, message: /@sendgrid\/mail/ },
    ]

    return config
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Enable React strict mode
  reactStrictMode: true,
}

export default nextConfig
