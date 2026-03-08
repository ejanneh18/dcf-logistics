/** @type {import('next').NextConfig} */
const nextConfig = {
  // Portable deployment configuration
  output: 'standalone',
  
  // Optimize for self-contained deployment
  images: {
    unoptimized: true,
    domains: ['localhost'],
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
  
  // Experimental features for better portability
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
  
  // Asset optimization
  compress: true,
  poweredByHeader: false,
  
  // Environment variables for portable deployment
  env: {
    PORTABLE_DEPLOYMENT: 'true',
    INSTALLATION_MODE: process.env.INSTALLATION_MODE || 'false',
  },
  
  // Redirects for installation wizard
  async redirects() {
    if (process.env.INSTALLATION_MODE === 'true') {
      return [
        {
          source: '/',
          destination: '/installer',
          permanent: false,
        },
      ]
    }
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
    ]
  },
  
  // Headers for security and installation
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
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
            key: 'X-Portable-Deployment',
            value: 'true',
          },
        ],
      },
    ]
  },
  
  // Webpack configuration for portable deployment
  webpack: (config, { isServer, dev }) => {
    // Optimize for production builds
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
      }
    }
    
    // Add custom loader for portable assets
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/images/',
          outputPath: 'static/images/',
          name: '[name].[hash].[ext]',
        },
      },
    })
    
    return config
  },
  
  // Custom server configuration
  serverRuntimeConfig: {
    // Server-only configuration
    installationMode: process.env.INSTALLATION_MODE === 'true',
    databasePath: process.env.DATABASE_PATH || './database.sqlite',
  },
  
  // Public runtime configuration
  publicRuntimeConfig: {
    // Client and server configuration
    portableDeployment: true,
    version: process.env.npm_package_version || '1.0.0',
    buildTime: new Date().toISOString(),
  },
}

export default nextConfig
