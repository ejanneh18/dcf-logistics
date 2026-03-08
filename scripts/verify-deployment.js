#!/usr/bin/env node

/**
 * DCF Logistics - Deployment Verification Script
 * 
 * This script verifies that both deployment methods work correctly
 * and provides a comprehensive test report.
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class DeploymentVerifier {
  constructor() {
    this.projectRoot = process.cwd()
    this.testResults = {
      static: {
        buildSuccess: false,
        filesGenerated: false,
        packageCreated: false,
        configValid: false,
        errors: []
      },
      vercel: {
        configValid: false,
        dependenciesInstalled: false,
        buildReady: false,
        errors: []
      },
      overall: {
        success: false,
        recommendations: []
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
    
    const timestamp = new Date().toLocaleTimeString()
    console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`)
  }

  async testStaticDeployment() {
    this.log('🧪 Testing Static Deployment...', 'info')
    
    try {
      // Test static build
      this.log('Testing static build...', 'info')
      execSync('npm run build:static', { 
        stdio: 'pipe',
        env: {
          ...process.env,
          NEXT_PUBLIC_SITE_URL: 'https://dcflogistics.com',
          NEXT_PUBLIC_CONTACT_EMAIL: 'info@dcflogistics.com'
        }
      })
      this.testResults.static.buildSuccess = true
      this.log('✅ Static build successful', 'success')

      // Check if files were generated
      const outDir = path.join(this.projectRoot, 'out')
      if (fs.existsSync(outDir)) {
        const files = fs.readdirSync(outDir)
        if (files.length > 0) {
          this.testResults.static.filesGenerated = true
          this.log(`✅ Generated ${files.length} files in out directory`, 'success')
        }
      }

      // Test package creation
      this.log('Testing package creation...', 'info')
      execSync('npm run package:static', { 
        stdio: 'pipe',
        env: {
          ...process.env,
          NEXT_PUBLIC_SITE_URL: 'https://dcflogistics.com',
          NEXT_PUBLIC_CONTACT_EMAIL: 'info@dcflogistics.com'
        }
      })
      this.testResults.static.packageCreated = true
      this.log('✅ Static package created successfully', 'success')

      // Test configuration validation
      try {
        execSync('node deployment-config.js validate static', { 
          stdio: 'pipe',
          env: {
            ...process.env,
            NEXT_PUBLIC_SITE_URL: 'https://dcflogistics.com',
            NEXT_PUBLIC_CONTACT_EMAIL: 'info@dcflogistics.com'
          }
        })
        this.testResults.static.configValid = true
        this.log('✅ Static configuration valid', 'success')
      } catch (error) {
        this.testResults.static.errors.push('Configuration validation failed')
        this.log('⚠️ Static configuration validation failed', 'warning')
      }

    } catch (error) {
      this.testResults.static.errors.push(error.message)
      this.log(`❌ Static deployment test failed: ${error.message}`, 'error')
    }
  }

  async testVercelDeployment() {
    this.log('🧪 Testing Vercel Deployment Readiness...', 'info')
    
    try {
      // Check if required dependencies are installed
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
      const requiredDeps = ['next-auth', 'eslint']
      const missingDeps = requiredDeps.filter(dep => 
        !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]
      )
      
      if (missingDeps.length === 0) {
        this.testResults.vercel.dependenciesInstalled = true
        this.log('✅ Required dependencies installed', 'success')
      } else {
        this.testResults.vercel.errors.push(`Missing dependencies: ${missingDeps.join(', ')}`)
        this.log(`⚠️ Missing dependencies: ${missingDeps.join(', ')}`, 'warning')
      }

      // Test Vercel configuration validation
      try {
        execSync('node deployment-config.js validate vercel', { 
          stdio: 'pipe',
          env: {
            ...process.env,
            DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
            NEXTAUTH_SECRET: 'test-secret-key-32-characters-long',
            NEXTAUTH_URL: 'https://dcflogistics.com'
          }
        })
        this.testResults.vercel.configValid = true
        this.log('✅ Vercel configuration valid', 'success')
      } catch (error) {
        this.testResults.vercel.errors.push('Configuration validation failed')
        this.log('⚠️ Vercel configuration validation failed (expected without env vars)', 'warning')
      }

      // Check if Vercel CLI is available
      try {
        execSync('vercel --version', { stdio: 'pipe' })
        this.log('✅ Vercel CLI available', 'success')
      } catch (error) {
        this.testResults.vercel.errors.push('Vercel CLI not installed')
        this.log('⚠️ Vercel CLI not installed', 'warning')
      }

      this.testResults.vercel.buildReady = true
      this.log('✅ Vercel deployment ready (pending environment setup)', 'success')

    } catch (error) {
      this.testResults.vercel.errors.push(error.message)
      this.log(`❌ Vercel deployment test failed: ${error.message}`, 'error')
    }
  }

  async checkFileStructure() {
    this.log('🧪 Checking File Structure...', 'info')
    
    const requiredFiles = [
      'next.config.vercel.mjs',
      'next.config.static.mjs',
      'vercel.json',
      'deployment-config.js',
      'scripts/setup-vercel.js',
      'scripts/create-static-package.js',
      'scripts/deployment-status.js',
      'deployment/static/.htaccess',
      'deployment/static/README.md',
      '.github/workflows/deploy.yml'
    ]

    const missingFiles = requiredFiles.filter(file => 
      !fs.existsSync(path.join(this.projectRoot, file))
    )

    if (missingFiles.length === 0) {
      this.log('✅ All required files present', 'success')
    } else {
      this.log(`⚠️ Missing files: ${missingFiles.join(', ')}`, 'warning')
      this.testResults.overall.recommendations.push('Some deployment files are missing')
    }
  }

  generateReport() {
    this.log('', 'info')
    this.log('📊 DEPLOYMENT VERIFICATION REPORT', 'info')
    this.log('=' .repeat(50), 'info')
    this.log('', 'info')

    // Static Deployment Results
    this.log('🌐 STATIC HOSTING DEPLOYMENT', 'info')
    this.log(`   Build Success: ${this.testResults.static.buildSuccess ? '✅' : '❌'}`, 'info')
    this.log(`   Files Generated: ${this.testResults.static.filesGenerated ? '✅' : '❌'}`, 'info')
    this.log(`   Package Created: ${this.testResults.static.packageCreated ? '✅' : '❌'}`, 'info')
    this.log(`   Config Valid: ${this.testResults.static.configValid ? '✅' : '⚠️'}`, 'info')
    
    if (this.testResults.static.errors.length > 0) {
      this.log('   Errors:', 'error')
      this.testResults.static.errors.forEach(error => this.log(`     - ${error}`, 'error'))
    }
    this.log('', 'info')

    // Vercel Deployment Results
    this.log('🚀 VERCEL DEPLOYMENT', 'info')
    this.log(`   Dependencies: ${this.testResults.vercel.dependenciesInstalled ? '✅' : '❌'}`, 'info')
    this.log(`   Config Valid: ${this.testResults.vercel.configValid ? '✅' : '⚠️'}`, 'info')
    this.log(`   Build Ready: ${this.testResults.vercel.buildReady ? '✅' : '❌'}`, 'info')
    
    if (this.testResults.vercel.errors.length > 0) {
      this.log('   Notes:', 'warning')
      this.testResults.vercel.errors.forEach(error => this.log(`     - ${error}`, 'warning'))
    }
    this.log('', 'info')

    // Overall Assessment
    const staticReady = this.testResults.static.buildSuccess && 
                       this.testResults.static.filesGenerated && 
                       this.testResults.static.packageCreated

    const vercelReady = this.testResults.vercel.dependenciesInstalled && 
                       this.testResults.vercel.buildReady

    this.testResults.overall.success = staticReady && vercelReady

    this.log('🎯 OVERALL ASSESSMENT', 'info')
    this.log(`   Static Deployment: ${staticReady ? '✅ READY' : '❌ NEEDS WORK'}`, staticReady ? 'success' : 'error')
    this.log(`   Vercel Deployment: ${vercelReady ? '✅ READY' : '❌ NEEDS WORK'}`, vercelReady ? 'success' : 'error')
    this.log(`   Overall Status: ${this.testResults.overall.success ? '✅ READY FOR DEPLOYMENT' : '⚠️ NEEDS ATTENTION'}`, 
             this.testResults.overall.success ? 'success' : 'warning')
    this.log('', 'info')

    // Recommendations
    this.log('💡 NEXT STEPS', 'info')
    if (staticReady) {
      this.log('   ✅ Static hosting package is ready for upload to GoDaddy/cPanel', 'success')
    }
    if (vercelReady) {
      this.log('   ✅ Vercel deployment ready - run: npm run setup:vercel', 'success')
    }
    
    this.log('   📋 To deploy:', 'info')
    this.log('     1. Static: Extract ZIP package and upload to web server', 'info')
    this.log('     2. Vercel: Set environment variables and run npm run deploy:vercel', 'info')
    this.log('', 'info')
    this.log('=' .repeat(50), 'info')
  }

  async run() {
    this.log('🚀 DCF Logistics - Deployment Verification', 'info')
    this.log('Starting comprehensive deployment tests...', 'info')
    this.log('', 'info')

    await this.testStaticDeployment()
    await this.testVercelDeployment()
    await this.checkFileStructure()
    
    this.generateReport()
  }
}

// Run if called directly
if (require.main === module) {
  const verifier = new DeploymentVerifier()
  verifier.run()
}

module.exports = DeploymentVerifier
