#!/usr/bin/env node

/**
 * DCF Logistics - Comprehensive Deployment Script
 * 
 * This script handles deployment to multiple platforms:
 * - Vercel (primary, full-featured)
 * - Static hosting (GoDaddy, cPanel, Netlify)
 * - Development and testing environments
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const DeploymentConfigManager = require('../deployment-config')

class DeploymentManager extends DeploymentConfigManager {
  constructor() {
    super()
    this.deploymentTargets = {
      vercel: {
        name: 'Vercel',
        description: 'Full-featured deployment with server-side functionality',
        buildCommand: 'build:vercel',
        deployCommand: 'vercel --prod',
        requiresEnv: ['DATABASE_URL', 'NEXTAUTH_SECRET', 'NEXTAUTH_URL']
      },
      'vercel-preview': {
        name: 'Vercel Preview',
        description: 'Preview deployment for testing',
        buildCommand: 'build:vercel',
        deployCommand: 'vercel',
        requiresEnv: ['DATABASE_URL', 'NEXTAUTH_SECRET', 'NEXTAUTH_URL']
      },
      static: {
        name: 'Static Hosting',
        description: 'Static-only deployment for shared hosting',
        buildCommand: 'build:static',
        deployCommand: null,
        requiresEnv: ['NEXT_PUBLIC_SITE_URL', 'NEXT_PUBLIC_CONTACT_EMAIL']
      },
      netlify: {
        name: 'Netlify',
        description: 'Static deployment to Netlify',
        buildCommand: 'build:static',
        deployCommand: 'netlify deploy --prod --dir=out',
        requiresEnv: ['NEXT_PUBLIC_SITE_URL', 'NEXT_PUBLIC_CONTACT_EMAIL']
      }
    }
  }

  async deployToTarget(target) {
    const config = this.deploymentTargets[target]
    if (!config) {
      throw new Error(`Unknown deployment target: ${target}`)
    }

    this.log(`🚀 Starting deployment to ${config.name}...`, 'info')
    this.log(`📝 ${config.description}`, 'info')

    try {
      // Validate environment
      await this.validateEnvironmentForTarget(target)

      // Build application
      this.log(`🔨 Building application...`, 'info')
      await this.buildForTarget(target)

      // Deploy if deployment command exists
      if (config.deployCommand) {
        this.log(`📤 Deploying to ${config.name}...`, 'info')
        execSync(config.deployCommand, { stdio: 'inherit' })
      } else {
        this.log(`📦 Build completed. Manual deployment required.`, 'warning')
        this.showManualDeploymentInstructions(target)
      }

      this.log(`✅ Deployment to ${config.name} completed successfully!`, 'success')

    } catch (error) {
      this.log(`❌ Deployment to ${config.name} failed: ${error.message}`, 'error')
      throw error
    }
  }

  async validateEnvironmentForTarget(target) {
    const config = this.deploymentTargets[target]
    const missing = config.requiresEnv.filter(varName => !process.env[varName])

    if (missing.length > 0) {
      this.log(`Missing required environment variables for ${target}:`, 'error')
      missing.forEach(varName => this.log(`  - ${varName}`, 'error'))
      throw new Error(`Missing environment variables: ${missing.join(', ')}`)
    }

    this.log(`✅ Environment validation passed for ${target}`, 'success')
  }

  async buildForTarget(target) {
    const config = this.deploymentTargets[target]
    
    try {
      // Set deployment type
      const deploymentType = target.includes('vercel') ? 'vercel' : 'static'
      process.env.DEPLOYMENT_TYPE = deploymentType
      process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE = deploymentType

      // Run build command
      execSync(`npm run ${config.buildCommand}`, { stdio: 'inherit' })
      
      this.log(`✅ Build completed for ${target}`, 'success')
    } catch (error) {
      this.log(`❌ Build failed for ${target}: ${error.message}`, 'error')
      throw error
    }
  }

  showManualDeploymentInstructions(target) {
    const instructions = {
      static: `
📋 Manual Deployment Instructions for Static Hosting:

1. 📁 Upload files from 'out' directory to your hosting provider:
   - GoDaddy: Upload to public_html folder via cPanel File Manager or FTP
   - cPanel: Upload to public_html or subdomain folder
   - Other: Upload to web root directory

2. 🔧 Configure web server:
   - Ensure .htaccess file is uploaded (for Apache servers)
   - Set file permissions: 644 for files, 755 for directories
   - Enable HTTPS and configure SSL certificate

3. 🌐 Test deployment:
   - Visit your domain to verify the site loads correctly
   - Test all pages and functionality
   - Check browser console for any errors

4. 📊 Optional: Set up analytics and monitoring
      `,
      netlify: `
📋 Manual Deployment Instructions for Netlify:

1. 🌐 Login to Netlify Dashboard
2. 📁 Drag and drop the 'out' folder to create new site
3. 🔧 Configure custom domain if needed
4. 🔒 Enable HTTPS (automatic)
5. 📊 Set up analytics and forms if needed
      `
    }

    if (instructions[target]) {
      this.log(instructions[target], 'info')
    }
  }

  async createDeploymentPackage(target) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
    const packageName = `dcf-logistics-${target}-${timestamp}.zip`
    const packagePath = path.join(this.projectRoot, packageName)

    try {
      this.log(`📦 Creating deployment package: ${packageName}`, 'info')

      // Create zip package
      const sourceDir = target === 'static' ? 'out' : '.next'
      execSync(`cd ${sourceDir} && zip -r ../${packageName} .`, { stdio: 'inherit' })

      this.log(`✅ Deployment package created: ${packagePath}`, 'success')
      return packagePath
    } catch (error) {
      this.log(`❌ Failed to create deployment package: ${error.message}`, 'error')
      throw error
    }
  }

  showAvailableTargets() {
    this.log('📋 Available deployment targets:', 'info')
    Object.entries(this.deploymentTargets).forEach(([key, config]) => {
      this.log(`  ${key.padEnd(15)} - ${config.description}`, 'info')
    })
  }

  showHelp() {
    console.log(`
DCF Logistics - Deployment Manager

Usage:
  node scripts/deploy.js <command> [target]

Commands:
  deploy <target>     Deploy to specified target
  build <target>      Build for specified target
  package <target>    Create deployment package
  validate <target>   Validate environment for target
  targets            Show available deployment targets
  help               Show this help message

Deployment Targets:
  vercel             Full-featured Vercel deployment
  vercel-preview     Vercel preview deployment
  static             Static hosting (GoDaddy, cPanel)
  netlify            Netlify static deployment

Examples:
  node scripts/deploy.js deploy vercel
  node scripts/deploy.js build static
  node scripts/deploy.js package static
  node scripts/deploy.js validate vercel
    `)
  }

  async run() {
    const args = process.argv.slice(2)
    const command = args[0]
    const target = args[1]

    try {
      switch (command) {
        case 'deploy':
          if (!target) throw new Error('Deployment target is required')
          await this.deployToTarget(target)
          break

        case 'build':
          if (!target) throw new Error('Build target is required')
          await this.buildForTarget(target)
          break

        case 'package':
          if (!target) throw new Error('Package target is required')
          await this.buildForTarget(target)
          await this.createDeploymentPackage(target)
          break

        case 'validate':
          if (!target) throw new Error('Validation target is required')
          await this.validateEnvironmentForTarget(target)
          break

        case 'targets':
          this.showAvailableTargets()
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
  const manager = new DeploymentManager()
  manager.run()
}

module.exports = DeploymentManager
