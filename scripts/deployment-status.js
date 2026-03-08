#!/usr/bin/env node

/**
 * DCF Logistics - Deployment Status Dashboard
 * 
 * This script provides a comprehensive overview of deployment status
 * across different platforms and environments.
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class DeploymentStatusDashboard {
  constructor() {
    this.projectRoot = process.cwd()
    this.deploymentTargets = {
      vercel: {
        name: 'Vercel (Primary)',
        type: 'full-featured',
        status: 'unknown',
        url: null,
        lastDeployed: null,
        features: ['Database', 'Authentication', 'API Routes', 'Admin Dashboard', 'Payments']
      },
      static: {
        name: 'Static Hosting (Backup)',
        type: 'static-only',
        status: 'unknown',
        url: null,
        lastBuilt: null,
        features: ['Public Pages', 'Contact Forms', 'Service Info', 'Demo Mode']
      }
    }
  }

  log(message, type = 'info') {
    const colors = {
      info: '\x1b[36m',    // Cyan
      success: '\x1b[32m', // Green
      warning: '\x1b[33m', // Yellow
      error: '\x1b[31m',   // Red
      reset: '\x1b[0m'     // Reset
    }
    
    console.log(`${colors[type]}${message}${colors.reset}`)
  }

  async checkVercelStatus() {
    try {
      // Check if Vercel CLI is available
      execSync('vercel --version', { stdio: 'pipe' })
      
      try {
        // Get project info
        const projectInfo = execSync('vercel inspect --json', { encoding: 'utf8', stdio: 'pipe' })
        const project = JSON.parse(projectInfo)
        
        this.deploymentTargets.vercel.status = 'deployed'
        this.deploymentTargets.vercel.url = project.url
        this.deploymentTargets.vercel.lastDeployed = new Date(project.createdAt).toLocaleString()
        
      } catch (error) {
        this.deploymentTargets.vercel.status = 'not-deployed'
      }
      
    } catch (error) {
      this.deploymentTargets.vercel.status = 'cli-not-available'
    }
  }

  async checkStaticBuildStatus() {
    const outDir = path.join(this.projectRoot, 'out')
    const packagePattern = path.join(this.projectRoot, 'dcf-logistics-static-*.zip')
    
    if (fs.existsSync(outDir)) {
      const stats = fs.statSync(outDir)
      this.deploymentTargets.static.status = 'built'
      this.deploymentTargets.static.lastBuilt = stats.mtime.toLocaleString()
      
      // Check for deployment packages
      try {
        const packages = execSync('ls dcf-logistics-static-*.zip 2>/dev/null || echo ""', { encoding: 'utf8' }).trim()
        if (packages) {
          this.deploymentTargets.static.status = 'packaged'
        }
      } catch (error) {
        // Ignore error, status remains 'built'
      }
    } else {
      this.deploymentTargets.static.status = 'not-built'
    }
  }

  async checkEnvironmentVariables() {
    const requiredEnvVars = {
      vercel: [
        'DATABASE_URL',
        'NEXTAUTH_SECRET',
        'NEXTAUTH_URL'
      ],
      static: [
        'NEXT_PUBLIC_SITE_URL',
        'NEXT_PUBLIC_CONTACT_EMAIL'
      ]
    }

    const envStatus = {}
    
    for (const [deployment, vars] of Object.entries(requiredEnvVars)) {
      envStatus[deployment] = {
        total: vars.length,
        configured: vars.filter(varName => process.env[varName]).length,
        missing: vars.filter(varName => !process.env[varName])
      }
    }
    
    return envStatus
  }

  async checkGitStatus() {
    try {
      const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim()
      const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim()
      const lastCommit = execSync('git log -1 --format="%h - %s (%cr)"', { encoding: 'utf8' }).trim()
      
      return {
        branch,
        hasChanges: status.length > 0,
        lastCommit,
        status: status.length > 0 ? 'uncommitted-changes' : 'clean'
      }
    } catch (error) {
      return {
        branch: 'unknown',
        hasChanges: false,
        lastCommit: 'unknown',
        status: 'error'
      }
    }
  }

  getStatusIcon(status) {
    const icons = {
      'deployed': '✅',
      'built': '📦',
      'packaged': '🎁',
      'not-deployed': '❌',
      'not-built': '⚠️',
      'cli-not-available': '🔧',
      'clean': '✅',
      'uncommitted-changes': '⚠️',
      'error': '❌',
      'unknown': '❓'
    }
    return icons[status] || '❓'
  }

  async displayDashboard() {
    this.log('', 'info')
    this.log('🚀 DCF LOGISTICS - DEPLOYMENT STATUS DASHBOARD', 'info')
    this.log('=' .repeat(60), 'info')
    this.log('', 'info')

    // Check all statuses
    await this.checkVercelStatus()
    await this.checkStaticBuildStatus()
    const envStatus = await this.checkEnvironmentVariables()
    const gitStatus = await this.checkGitStatus()

    // Display Git Status
    this.log('📋 GIT STATUS', 'info')
    this.log(`   Branch: ${gitStatus.branch}`, 'info')
    this.log(`   Status: ${this.getStatusIcon(gitStatus.status)} ${gitStatus.status}`, 'info')
    this.log(`   Last Commit: ${gitStatus.lastCommit}`, 'info')
    this.log('', 'info')

    // Display Deployment Targets
    this.log('🎯 DEPLOYMENT TARGETS', 'info')
    this.log('', 'info')

    for (const [key, target] of Object.entries(this.deploymentTargets)) {
      this.log(`${this.getStatusIcon(target.status)} ${target.name}`, target.status === 'deployed' || target.status === 'packaged' ? 'success' : 'warning')
      this.log(`   Type: ${target.type}`, 'info')
      this.log(`   Status: ${target.status}`, 'info')
      
      if (target.url) {
        this.log(`   URL: ${target.url}`, 'info')
      }
      
      if (target.lastDeployed) {
        this.log(`   Last Deployed: ${target.lastDeployed}`, 'info')
      }
      
      if (target.lastBuilt) {
        this.log(`   Last Built: ${target.lastBuilt}`, 'info')
      }
      
      this.log(`   Features: ${target.features.join(', ')}`, 'info')
      this.log('', 'info')
    }

    // Display Environment Status
    this.log('🔐 ENVIRONMENT VARIABLES', 'info')
    this.log('', 'info')

    for (const [deployment, env] of Object.entries(envStatus)) {
      const percentage = Math.round((env.configured / env.total) * 100)
      const status = percentage === 100 ? 'success' : 'warning'
      
      this.log(`${deployment.toUpperCase()}: ${env.configured}/${env.total} configured (${percentage}%)`, status)
      
      if (env.missing.length > 0) {
        this.log(`   Missing: ${env.missing.join(', ')}`, 'warning')
      }
      this.log('', 'info')
    }

    // Display Quick Actions
    this.log('⚡ QUICK ACTIONS', 'info')
    this.log('', 'info')
    this.log('Deploy to Vercel:', 'info')
    this.log('   npm run setup:vercel', 'info')
    this.log('   npm run deploy:vercel', 'info')
    this.log('', 'info')
    this.log('Create Static Package:', 'info')
    this.log('   npm run package:static', 'info')
    this.log('', 'info')
    this.log('Build Both Versions:', 'info')
    this.log('   npm run test:build-all', 'info')
    this.log('', 'info')

    // Display Recommendations
    this.displayRecommendations(gitStatus, envStatus)
  }

  displayRecommendations(gitStatus, envStatus) {
    this.log('💡 RECOMMENDATIONS', 'info')
    this.log('', 'info')

    const recommendations = []

    // Git recommendations
    if (gitStatus.hasChanges) {
      recommendations.push('Commit your changes before deploying')
    }

    // Vercel recommendations
    if (this.deploymentTargets.vercel.status === 'not-deployed') {
      recommendations.push('Set up Vercel deployment for full functionality')
    }

    if (this.deploymentTargets.vercel.status === 'cli-not-available') {
      recommendations.push('Install Vercel CLI: npm install -g vercel')
    }

    // Static recommendations
    if (this.deploymentTargets.static.status === 'not-built') {
      recommendations.push('Build static version as backup: npm run build:static')
    }

    // Environment recommendations
    if (envStatus.vercel.configured < envStatus.vercel.total) {
      recommendations.push('Configure missing Vercel environment variables')
    }

    if (envStatus.static.configured < envStatus.static.total) {
      recommendations.push('Set static deployment environment variables')
    }

    if (recommendations.length === 0) {
      this.log('✅ All systems ready for deployment!', 'success')
    } else {
      recommendations.forEach((rec, index) => {
        this.log(`${index + 1}. ${rec}`, 'warning')
      })
    }

    this.log('', 'info')
    this.log('=' .repeat(60), 'info')
  }

  async run() {
    await this.displayDashboard()
  }
}

// Run if called directly
if (require.main === module) {
  const dashboard = new DeploymentStatusDashboard()
  dashboard.run()
}

module.exports = DeploymentStatusDashboard
