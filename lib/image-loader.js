/**
 * Custom Image Loader for Portable Deployment
 * Handles image optimization for static exports and portable deployments
 */

export default function imageLoader({ src, width, quality }) {
  // For portable deployments, return the original image path
  if (process.env.PORTABLE_DEPLOYMENT === 'true') {
    return src
  }
  
  // For static exports, return the original image path
  if (process.env.NODE_ENV === 'production') {
    return src
  }
  
  // For development, use Next.js default behavior
  const params = new URLSearchParams()
  params.set('url', src)
  params.set('w', width.toString())
  params.set('q', (quality || 75).toString())
  
  return `/_next/image?${params.toString()}`
}
