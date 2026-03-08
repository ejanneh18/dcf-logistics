/**
 * Deployment Mode Detection Utility
 * 
 * This utility detects the current deployment mode and provides
 * appropriate configurations for different hosting environments.
 */

export enum DeploymentMode {
  VERCEL = 'vercel',
  STATIC = 'static',
  DEVELOPMENT = 'development'
}

/**
 * Detect the current deployment mode based on environment variables
 */
export function getDeploymentMode(): DeploymentMode {
  // Check explicit deployment type environment variable
  if (process.env.DEPLOYMENT_TYPE === 'vercel' || process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE === 'vercel') {
    return DeploymentMode.VERCEL
  }
  
  if (process.env.DEPLOYMENT_TYPE === 'static' || 
      process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE === 'static' ||
      process.env.STATIC_EXPORT === 'true') {
    return DeploymentMode.STATIC
  }

  // Check if running on Vercel
  if (process.env.VERCEL || process.env.VERCEL_URL) {
    return DeploymentMode.VERCEL
  }

  // Check if in development mode
  if (process.env.NODE_ENV === 'development') {
    return DeploymentMode.DEVELOPMENT
  }

  // Default to static for production builds without specific configuration
  return DeploymentMode.STATIC
}

/**
 * Check if the current deployment is static-only
 */
export function isStaticDeployment(): boolean {
  return getDeploymentMode() === DeploymentMode.STATIC
}

/**
 * Check if the current deployment supports server-side features
 */
export function hasServerSideSupport(): boolean {
  const mode = getDeploymentMode()
  return mode === DeploymentMode.VERCEL || mode === DeploymentMode.DEVELOPMENT
}

/**
 * Get the appropriate API base URL for the current deployment
 */
export function getApiBaseUrl(): string {
  const mode = getDeploymentMode()
  
  switch (mode) {
    case DeploymentMode.VERCEL:
      return process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : process.env.NEXT_PUBLIC_SITE_URL || ''
    
    case DeploymentMode.DEVELOPMENT:
      return 'http://localhost:3000'
    
    case DeploymentMode.STATIC:
    default:
      return process.env.NEXT_PUBLIC_SITE_URL || ''
  }
}

/**
 * Get deployment-specific configuration
 */
export function getDeploymentConfig() {
  const mode = getDeploymentMode()
  
  return {
    mode,
    isStatic: isStaticDeployment(),
    hasServerSupport: hasServerSideSupport(),
    apiBaseUrl: getApiBaseUrl(),
    features: {
      authentication: hasServerSideSupport(),
      database: hasServerSideSupport(),
      apiRoutes: hasServerSideSupport(),
      payments: hasServerSideSupport(),
      fileUploads: hasServerSideSupport(),
      realTimeUpdates: hasServerSideSupport(),
      emailService: hasServerSideSupport(),
      adminDashboard: hasServerSideSupport(),
    },
    fallbacks: {
      authentication: 'static-demo',
      database: 'local-storage',
      payments: 'external-redirect',
      fileUploads: 'disabled',
      emailService: 'mailto-links',
      adminDashboard: 'demo-mode',
    }
  }
}

/**
 * Log deployment mode information (development only)
 */
export function logDeploymentInfo() {
  if (process.env.NODE_ENV === 'development') {
    const config = getDeploymentConfig()
    console.log('🚀 DCF Logistics Deployment Info:', {
      mode: config.mode,
      isStatic: config.isStatic,
      hasServerSupport: config.hasServerSupport,
      apiBaseUrl: config.apiBaseUrl,
      features: config.features
    })
  }
}
