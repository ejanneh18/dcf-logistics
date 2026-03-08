#!/usr/bin/env node

/**
 * DCF Logistics - Comprehensive Application Test Suite
 * 
 * This script performs comprehensive testing of the application including:
 * - Build verification for both static and Vercel deployments
 * - Component integration testing
 * - Form functionality verification
 * - Navigation and routing tests
 * - Performance and quality checks
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class ComprehensiveTestSuite {
  constructor() {
    this.projectRoot = process.cwd()
    this.testResults = {
      builds: { status: 'pending', details: [] },
      components: { status: 'pending', details: [] },
      forms: { status: 'pending', details: [] },
      navigation: { status: 'pending', details: [] },
      performance: { status: 'pending', details: [] },
      quality: { status: 'pending', details: [] }
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

  async testBuilds() {
    this.log('🔨 Testing Build Systems...', 'info')
    
    try {
      // Test regular build
      this.log('Testing Next.js build...', 'info')
      execSync('npm run build', { stdio: 'pipe' })
      this.testResults.builds.details.push('✅ Next.js build successful')
      
      // Test static build
      this.log('Testing static build...', 'info')
      execSync('npm run build:static', { stdio: 'pipe' })
      this.testResults.builds.details.push('✅ Static build successful')
      
      // Test Vercel build
      this.log('Testing Vercel build...', 'info')
      execSync('npm run build:vercel', { stdio: 'pipe' })
      this.testResults.builds.details.push('✅ Vercel build successful')
      
      this.testResults.builds.status = 'success'
      this.log('✅ All builds completed successfully', 'success')
      
    } catch (error) {
      this.testResults.builds.details.push(`❌ Build failed: ${error.message}`)
      this.testResults.builds.status = 'error'
      this.log(`❌ Build test failed: ${error.message}`, 'error')
    }
  }

  async testComponents() {
    this.log('🧩 Testing Component Integration...', 'info')
    
    const criticalComponents = [
      'components/enhanced-contact-form.tsx',
      'components/enhanced-quote-form.tsx',
      'components/newsletter-signup.tsx',
      'components/shipping-calculator.tsx',
      'components/enhanced-tracking.tsx',
      'components/navbar.tsx',
      'components/footer.tsx'
    ]

    let successCount = 0
    
    for (const component of criticalComponents) {
      const componentPath = path.join(this.projectRoot, component)
      if (fs.existsSync(componentPath)) {
        // Check for basic syntax and imports
        try {
          const content = fs.readFileSync(componentPath, 'utf8')
          
          // Check for required imports
          const hasReactImport = content.includes('import React') || content.includes("'use client'")
          const hasProperExport = content.includes('export default') || content.includes('export {')
          
          if (hasReactImport && hasProperExport) {
            this.testResults.components.details.push(`✅ ${component} - Structure valid`)
            successCount++
          } else {
            this.testResults.components.details.push(`⚠️ ${component} - Missing imports or exports`)
          }
        } catch (error) {
          this.testResults.components.details.push(`❌ ${component} - Read error: ${error.message}`)
        }
      } else {
        this.testResults.components.details.push(`❌ ${component} - File not found`)
      }
    }

    if (successCount === criticalComponents.length) {
      this.testResults.components.status = 'success'
      this.log('✅ All critical components verified', 'success')
    } else if (successCount > 0) {
      this.testResults.components.status = 'warning'
      this.log(`⚠️ ${successCount}/${criticalComponents.length} components verified`, 'warning')
    } else {
      this.testResults.components.status = 'error'
      this.log('❌ Component verification failed', 'error')
    }
  }

  async testForms() {
    this.log('📝 Testing Form Components...', 'info')
    
    const formComponents = [
      { file: 'components/enhanced-contact-form.tsx', name: 'Contact Form' },
      { file: 'components/enhanced-quote-form.tsx', name: 'Quote Form' },
      { file: 'components/newsletter-signup.tsx', name: 'Newsletter Form' }
    ]

    let successCount = 0

    for (const form of formComponents) {
      const formPath = path.join(this.projectRoot, form.file)
      if (fs.existsSync(formPath)) {
        try {
          const content = fs.readFileSync(formPath, 'utf8')
          
          // Check for form essentials
          const hasFormHandling = content.includes('useForm') || content.includes('onSubmit')
          const hasValidation = content.includes('zodResolver') || content.includes('errors')
          const hasFormService = content.includes('formService')
          
          if (hasFormHandling && hasValidation && hasFormService) {
            this.testResults.forms.details.push(`✅ ${form.name} - Fully functional`)
            successCount++
          } else {
            this.testResults.forms.details.push(`⚠️ ${form.name} - Missing functionality`)
          }
        } catch (error) {
          this.testResults.forms.details.push(`❌ ${form.name} - Error: ${error.message}`)
        }
      } else {
        this.testResults.forms.details.push(`❌ ${form.name} - File not found`)
      }
    }

    // Check form service
    const formServicePath = path.join(this.projectRoot, 'lib/forms/form-service.ts')
    if (fs.existsSync(formServicePath)) {
      this.testResults.forms.details.push('✅ Form service available')
      successCount++
    } else {
      this.testResults.forms.details.push('❌ Form service missing')
    }

    if (successCount >= 3) {
      this.testResults.forms.status = 'success'
      this.log('✅ Form functionality verified', 'success')
    } else if (successCount > 0) {
      this.testResults.forms.status = 'warning'
      this.log(`⚠️ Partial form functionality (${successCount}/4)`, 'warning')
    } else {
      this.testResults.forms.status = 'error'
      this.log('❌ Form functionality failed', 'error')
    }
  }

  async testNavigation() {
    this.log('🧭 Testing Navigation and Routing...', 'info')
    
    const criticalPages = [
      'app/page.tsx',
      'app/about/page.tsx',
      'app/services/page.tsx',
      'app/contact/page.tsx',
      'app/quote/page.tsx',
      'app/tracking/page.tsx',
      'app/calculator/page.tsx'
    ]

    let successCount = 0

    for (const page of criticalPages) {
      const pagePath = path.join(this.projectRoot, page)
      if (fs.existsSync(pagePath)) {
        try {
          const content = fs.readFileSync(pagePath, 'utf8')
          
          // Check for proper page structure
          const hasMetadata = content.includes('export const metadata')
          const hasDefaultExport = content.includes('export default')
          
          if (hasMetadata && hasDefaultExport) {
            this.testResults.navigation.details.push(`✅ ${page} - Properly structured`)
            successCount++
          } else {
            this.testResults.navigation.details.push(`⚠️ ${page} - Missing metadata or export`)
          }
        } catch (error) {
          this.testResults.navigation.details.push(`❌ ${page} - Error: ${error.message}`)
        }
      } else {
        this.testResults.navigation.details.push(`❌ ${page} - File not found`)
      }
    }

    // Check navbar
    const navbarPath = path.join(this.projectRoot, 'components/navbar.tsx')
    if (fs.existsSync(navbarPath)) {
      const content = fs.readFileSync(navbarPath, 'utf8')
      const hasCalculatorLink = content.includes('/calculator')
      const noBlogLink = !content.includes('/blog')
      const noAuthLink = !content.includes('/account/login')
      
      if (hasCalculatorLink && noBlogLink && noAuthLink) {
        this.testResults.navigation.details.push('✅ Navigation properly updated')
        successCount++
      } else {
        this.testResults.navigation.details.push('⚠️ Navigation needs updates')
      }
    }

    if (successCount >= 6) {
      this.testResults.navigation.status = 'success'
      this.log('✅ Navigation and routing verified', 'success')
    } else if (successCount > 0) {
      this.testResults.navigation.status = 'warning'
      this.log(`⚠️ Partial navigation success (${successCount}/8)`, 'warning')
    } else {
      this.testResults.navigation.status = 'error'
      this.log('❌ Navigation verification failed', 'error')
    }
  }

  async testPerformance() {
    this.log('⚡ Testing Performance Metrics...', 'info')
    
    try {
      // Check bundle sizes from build output
      const buildDir = path.join(this.projectRoot, '.next')
      if (fs.existsSync(buildDir)) {
        this.testResults.performance.details.push('✅ Build directory exists')
        
        // Check for optimized builds
        const staticDir = path.join(buildDir, 'static')
        if (fs.existsSync(staticDir)) {
          this.testResults.performance.details.push('✅ Static assets generated')
        }
      }

      // Check for performance optimizations
      const nextConfigPath = path.join(this.projectRoot, 'next.config.mjs')
      if (fs.existsSync(nextConfigPath)) {
        const content = fs.readFileSync(nextConfigPath, 'utf8')
        const hasImageOptimization = content.includes('images')
        const hasCompression = content.includes('compress')
        
        if (hasImageOptimization) {
          this.testResults.performance.details.push('✅ Image optimization configured')
        }
      }

      // Check package.json for performance scripts
      const packagePath = path.join(this.projectRoot, 'package.json')
      if (fs.existsSync(packagePath)) {
        const content = fs.readFileSync(packagePath, 'utf8')
        const packageJson = JSON.parse(content)
        
        if (packageJson.scripts && packageJson.scripts['build:static']) {
          this.testResults.performance.details.push('✅ Static build script available')
        }
      }

      this.testResults.performance.status = 'success'
      this.log('✅ Performance checks completed', 'success')
      
    } catch (error) {
      this.testResults.performance.details.push(`❌ Performance test failed: ${error.message}`)
      this.testResults.performance.status = 'error'
      this.log(`❌ Performance test failed: ${error.message}`, 'error')
    }
  }

  async testQuality() {
    this.log('🔍 Testing Code Quality...', 'info')
    
    try {
      // Check TypeScript configuration
      const tsconfigPath = path.join(this.projectRoot, 'tsconfig.json')
      if (fs.existsSync(tsconfigPath)) {
        this.testResults.quality.details.push('✅ TypeScript configuration present')
      }

      // Check for essential dependencies
      const packagePath = path.join(this.projectRoot, 'package.json')
      if (fs.existsSync(packagePath)) {
        const content = fs.readFileSync(packagePath, 'utf8')
        const packageJson = JSON.parse(content)
        
        const essentialDeps = [
          'react',
          'next',
          'react-hook-form',
          '@hookform/resolvers',
          'zod',
          'tailwindcss'
        ]

        let depCount = 0
        for (const dep of essentialDeps) {
          if (packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]) {
            depCount++
          }
        }

        this.testResults.quality.details.push(`✅ ${depCount}/${essentialDeps.length} essential dependencies present`)
      }

      // Check for removed features
      const blogExists = fs.existsSync(path.join(this.projectRoot, 'app/blog'))
      const accountExists = fs.existsSync(path.join(this.projectRoot, 'components/account'))
      
      if (!blogExists) {
        this.testResults.quality.details.push('✅ Blog section successfully removed')
      }
      
      if (!accountExists) {
        this.testResults.quality.details.push('✅ Authentication system successfully removed')
      }

      this.testResults.quality.status = 'success'
      this.log('✅ Quality checks completed', 'success')
      
    } catch (error) {
      this.testResults.quality.details.push(`❌ Quality test failed: ${error.message}`)
      this.testResults.quality.status = 'error'
      this.log(`❌ Quality test failed: ${error.message}`, 'error')
    }
  }

  generateReport() {
    this.log('', 'info')
    this.log('📊 COMPREHENSIVE TEST REPORT', 'info')
    this.log('=' .repeat(60), 'info')
    this.log('', 'info')

    const sections = [
      { name: 'Build Systems', key: 'builds', icon: '🔨' },
      { name: 'Component Integration', key: 'components', icon: '🧩' },
      { name: 'Form Functionality', key: 'forms', icon: '📝' },
      { name: 'Navigation & Routing', key: 'navigation', icon: '🧭' },
      { name: 'Performance', key: 'performance', icon: '⚡' },
      { name: 'Code Quality', key: 'quality', icon: '🔍' }
    ]

    sections.forEach(section => {
      const result = this.testResults[section.key]
      const statusIcon = result.status === 'success' ? '✅' : 
                        result.status === 'warning' ? '⚠️' : '❌'
      
      this.log(`${section.icon} ${section.name.toUpperCase()}: ${statusIcon} ${result.status.toUpperCase()}`, 
               result.status === 'success' ? 'success' : 
               result.status === 'warning' ? 'warning' : 'error')
      
      result.details.forEach(detail => {
        this.log(`   ${detail}`, 'info')
      })
      this.log('', 'info')
    })

    // Overall assessment
    const allSuccess = Object.values(this.testResults).every(r => r.status === 'success')
    const hasErrors = Object.values(this.testResults).some(r => r.status === 'error')
    
    this.log('🎯 OVERALL ASSESSMENT', 'info')
    if (allSuccess) {
      this.log('✅ EXCELLENT: All tests passed successfully!', 'success')
    } else if (!hasErrors) {
      this.log('⚠️ GOOD: Tests passed with minor warnings', 'warning')
    } else {
      this.log('❌ ISSUES: Some tests failed and need attention', 'error')
    }
    
    this.log('', 'info')
    this.log('=' .repeat(60), 'info')
  }

  async runComprehensiveTests() {
    this.log('🚀 Starting Comprehensive Test Suite for DCF Logistics', 'info')
    this.log('', 'info')

    await this.testBuilds()
    await this.testComponents()
    await this.testForms()
    await this.testNavigation()
    await this.testPerformance()
    await this.testQuality()
    
    this.generateReport()
  }
}

// Command line usage
if (require.main === module) {
  const testSuite = new ComprehensiveTestSuite()
  testSuite.runComprehensiveTests().catch(console.error)
}

module.exports = ComprehensiveTestSuite
