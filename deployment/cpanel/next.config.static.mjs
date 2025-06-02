/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for shared hosting
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',

  // Disable server-side features for static hosting
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './lib/image-loader.js'
  },

  // Build optimizations
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Asset optimization
  compress: true,
  poweredByHeader: false,

  // Environment variables for static export
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    APP_URL: process.env.APP_URL,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    SALES_EMAIL: process.env.SALES_EMAIL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    STATIC_EXPORT: 'true',
  },

  // Redirects for better SEO
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: '/admin/dashboard',
        permanent: true,
      },
    ]
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
        ],
      },
    ]
  },

  // Webpack configuration for static export
  webpack: (config, { isServer, dev }) => {
    // Handle Node.js modules for client-side
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
      }
    }

    // Optimize bundle size for production
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      }
    }

    // Handle static assets for static export
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/images/[name].[hash][ext]',
      },
    })

    return config
  },

  // Experimental features for better static export
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
}

export default nextConfig
