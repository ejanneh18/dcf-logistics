#!/usr/bin/env node

/**
 * DCF Logistics - Vercel Build Script
 * 
 * This script prepares the application for Vercel deployment
 * by switching to the correct configuration and building.
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',    // Cyan
    success: '\x1b[32m', // Green
    warning: '\x1b[33m', // Yellow
    error: '\x1b[31m',   // Red
    reset: '\x1b[0m'     // Reset
  }
  
  const timestamp = new Date().toLocaleTimeString()
  console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`)
}

function switchToVercelConfig() {
  const projectRoot = process.cwd()
  const vercelConfigPath = path.join(projectRoot, 'next.config.vercel.mjs')
  const currentConfigPath = path.join(projectRoot, 'next.config.mjs')
  
  if (fs.existsSync(vercelConfigPath)) {
    // Backup current config if it exists
    if (fs.existsSync(currentConfigPath)) {
      fs.copyFileSync(currentConfigPath, path.join(projectRoot, 'next.config.backup.mjs'))
    }
    
    // Copy Vercel config
    fs.copyFileSync(vercelConfigPath, currentConfigPath)
    log('Switched to Vercel configuration', 'success')
  } else {
    log('Vercel configuration not found, using default', 'warning')
  }
}

function buildForVercel() {
  try {
    log('🚀 Starting Vercel build process...', 'info')
    
    // Set environment variables
    process.env.DEPLOYMENT_TYPE = 'vercel'
    process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE = 'vercel'
    
    // Switch to Vercel configuration
    switchToVercelConfig()
    
    // Run Next.js build
    log('Building Next.js application...', 'info')
    execSync('next build', { stdio: 'inherit' })
    
    log('✅ Vercel build completed successfully!', 'success')
    
  } catch (error) {
    log(`❌ Build failed: ${error.message}`, 'error')
    process.exit(1)
  }
}

// Run the build
buildForVercel()
