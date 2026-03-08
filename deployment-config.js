#!/usr/bin/env node

/**
 * DCF Logistics - Deployment Configuration Manager
 * 
 * This script manages different deployment configurations for:
 * - Vercel (full-featured with server-side functionality)
 * - Static hosting (GoDaddy, cPanel, Netlify static)
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const DEPLOYMENT_TYPES = {
  VERCEL: 'vercel',
  STATIC: 'static',
  DEVELOPMENT: 'development'
}

const CONFIG_FILES = {
  [DEPLOYMENT_TYPES.VERCEL]: 'next.config.vercel.mjs',
  [DEPLOYMENT_TYPES.STATIC]: 'next.config.static.mjs',
  [DEPLOYMENT_TYPES.DEVELOPMENT]: 'next.config.mjs'
}

class DeploymentConfigManager {
  constructor() {
    this.projectRoot = process.cwd()
    this.currentConfigPath = path.join(this.projectRoot, 'next.config.mjs')
    this.backupConfigPath = path.join(this.projectRoot, 'next.config.backup.mjs')
  }

  log(message, type = 'info') {
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

  backupCurrentConfig() {
    if (fs.existsSync(this.currentConfigPath)) {
      fs.copyFileSync(this.currentConfigPath, this.backupConfigPath)
      this.log('Current configuration backed up', 'info')
    }
  }

  restoreBackupConfig() {
    if (fs.existsSync(this.backupConfigPath)) {
      fs.copyFileSync(this.backupConfigPath, this.currentConfigPath)
      fs.unlinkSync(this.backupConfigPath)
      this.log('Configuration restored from backup', 'info')
    }
  }

  switchConfig(deploymentType) {
    if (!Object.values(DEPLOYMENT_TYPES).includes(deploymentType)) {
      throw new Error(`Invalid deployment type: ${deploymentType}`)
    }

    const configFile = CONFIG_FILES[deploymentType]
    const configPath = path.join(this.projectRoot, configFile)

    if (!fs.existsSync(configPath)) {
      throw new Error(`Configuration file not found: ${configFile}`)
    }

    // Backup current config
    this.backupCurrentConfig()

    // Copy new config
    fs.copyFileSync(configPath, this.currentConfigPath)
    this.log(`Switched to ${deploymentType} configuration`, 'success')
  }

  buildForDeployment(deploymentType) {
    try {
      this.log(`Starting build for ${deploymentType} deployment...`, 'info')

      // Switch to appropriate config
      this.switchConfig(deploymentType)

      // Set environment variable
      process.env.DEPLOYMENT_TYPE = deploymentType

      // Run Next.js build directly to avoid recursion
      this.log(`Running: next build`, 'info')
      execSync('next build', { stdio: 'inherit' })

      this.log(`Build completed successfully for ${deploymentType}`, 'success')

    } catch (error) {
      this.log(`Build failed: ${error.message}`, 'error')
      throw error
    } finally {
      // Restore original config
      this.restoreBackupConfig()
    }
  }

  validateEnvironment(deploymentType) {
    const requiredVars = {
      [DEPLOYMENT_TYPES.VERCEL]: [
        'DATABASE_URL',
        'NEXTAUTH_SECRET',
        'NEXTAUTH_URL'
      ],
      [DEPLOYMENT_TYPES.STATIC]: [
        'NEXT_PUBLIC_SITE_URL',
        'NEXT_PUBLIC_CONTACT_EMAIL'
      ]
    }

    const required = requiredVars[deploymentType] || []
    const missing = required.filter(varName => !process.env[varName])

    if (missing.length > 0) {
      this.log(`Missing required environment variables for ${deploymentType}:`, 'warning')
      missing.forEach(varName => this.log(`  - ${varName}`, 'warning'))
      return false
    }

    this.log(`Environment validation passed for ${deploymentType}`, 'success')
    return true
  }

  showHelp() {
    console.log(`
DCF Logistics - Deployment Configuration Manager

Usage:
  node deployment-config.js <command> [options]

Commands:
  switch <type>    Switch to deployment configuration
  build <type>     Build for specific deployment type
  validate <type>  Validate environment for deployment type
  help            Show this help message

Deployment Types:
  vercel          Full-featured deployment with server-side functionality
  static          Static-only deployment for shared hosting
  development     Development configuration

Examples:
  node deployment-config.js switch vercel
  node deployment-config.js build static
  node deployment-config.js validate vercel
    `)
  }

  run() {
    const args = process.argv.slice(2)
    const command = args[0]
    const deploymentType = args[1]

    try {
      switch (command) {
        case 'switch':
          if (!deploymentType) {
            throw new Error('Deployment type is required')
          }
          this.switchConfig(deploymentType)
          break

        case 'build':
          if (!deploymentType) {
            throw new Error('Deployment type is required')
          }
          this.buildForDeployment(deploymentType)
          break

        case 'validate':
          if (!deploymentType) {
            throw new Error('Deployment type is required')
          }
          this.validateEnvironment(deploymentType)
          break

        case 'help':
        default:
          this.showHelp()
          break
      }
    } catch (error) {
      this.log(`Error: ${error.message}`, 'error')
      process.exit(1)
    }
  }
}

// Run if called directly
if (require.main === module) {
  const manager = new DeploymentConfigManager()
  manager.run()
}

module.exports = DeploymentConfigManager
