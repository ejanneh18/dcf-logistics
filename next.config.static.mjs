/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export configuration for shared hosting (GoDaddy, cPanel, etc.)
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',

  // Disable server-side features for static export
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './lib/image-loader.js'
  },

  // Build optimizations for static hosting
  eslint: {
    ignoreDuringBuilds: true, // Ignore linting errors for static build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors for static build
  },

  // Asset optimization
  compress: true,
  poweredByHeader: false,

  // Environment variables for static export
  env: {
    DEPLOYMENT_TYPE: 'static',
    STATIC_EXPORT: 'true',
    NEXT_PUBLIC_DEPLOYMENT_TYPE: 'static',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://dcflogistics.com',
    NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@dcflogistics.com',
    NEXT_PUBLIC_PHONE: process.env.NEXT_PUBLIC_PHONE || '+220-395-1020',
    NEXT_PUBLIC_COMPANY_NAME: 'DCF Logistics',
    NEXT_PUBLIC_COMPANY_ADDRESS: 'Banjul, The Gambia',
  },

  // Webpack configuration for static export
  webpack: (config, { isServer }) => {
    // Disable server-side modules for client bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
        querystring: false,
        util: false,
        buffer: false,
        events: false,
        // Disable database and server-side dependencies
        '@prisma/client': false,
        'next-auth': false,
        'next-auth/next': false,
        'next-auth/providers/credentials': false,
        '@trpc/server': false,
        '@trpc/client': false,
        'bcryptjs': false,
        'nodemailer': false,
        'stripe': false,
        'socket.io': false,
        'socket.io-client': false,
      }
    }

    // Optimize bundle size for static hosting
    config.optimization = {
      ...config.optimization,
      splitChunks: {
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
      },
    }

    // Exclude server-side only modules
    config.externals = config.externals || []
    if (Array.isArray(config.externals)) {
      config.externals.push({
        '@prisma/client': 'commonjs @prisma/client',
        'next-auth': 'commonjs next-auth',
        'bcryptjs': 'commonjs bcryptjs',
        'nodemailer': 'commonjs nodemailer',
        'stripe': 'commonjs stripe',
      })
    }

    return config
  },

  // React strict mode
  reactStrictMode: true,
}

export default nextConfig
