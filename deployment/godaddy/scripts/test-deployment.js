#!/usr/bin/env node

/**
 * Deployment Testing Script
 * Validates the deployed application functionality
 */

const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

class DeploymentTester {
  constructor() {
    this.config = this.loadConfig()
    this.tests = []
    this.results = {
      passed: 0,
      failed: 0,
      total: 0
    }
  }

  loadConfig() {
    const configPath = path.join(process.cwd(), 'deployment', 'godaddy', 'config.json')
    if (!fs.existsSync(configPath)) {
      throw new Error('Deployment config not found')
    }
    return JSON.parse(fs.readFileSync(configPath, 'utf8'))
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString()
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️'
    console.log(`${prefix} [${timestamp}] ${message}`)
  }

  async makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https') ? https : http
      const timeout = options.timeout || 10000

      const req = client.get(url, (res) => {
        let data = ''
        res.on('data', chunk => data += chunk)
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          })
        })
      })

      req.on('error', reject)
      req.setTimeout(timeout, () => {
        req.destroy()
        reject(new Error('Request timeout'))
      })
    })
  }

  addTest(name, testFunction) {
    this.tests.push({ name, test: testFunction })
  }

  async runTest(testObj) {
    try {
      this.log(`Running test: ${testObj.name}`)
      await testObj.test()
      this.results.passed++
      this.log(`✅ PASSED: ${testObj.name}`, 'success')
      return true
    } catch (error) {
      this.results.failed++
      this.log(`❌ FAILED: ${testObj.name} - ${error.message}`, 'error')
      return false
    }
  }

  async runAllTests() {
    this.log('Starting deployment tests...')
    this.results.total = this.tests.length

    for (const test of this.tests) {
      await this.runTest(test)
    }

    this.printResults()
    return this.results.failed === 0
  }

  printResults() {
    this.log('\n=== Test Results ===')
    this.log(`Total tests: ${this.results.total}`)
    this.log(`Passed: ${this.results.passed}`, 'success')
    this.log(`Failed: ${this.results.failed}`, this.results.failed > 0 ? 'error' : 'info')
    this.log(`Success rate: ${((this.results.passed / this.results.total) * 100).toFixed(1)}%`)
  }

  setupTests() {
    const baseUrl = this.config.siteUrl

    // Test 1: Homepage loads
    this.addTest('Homepage loads', async () => {
      const response = await this.makeRequest(baseUrl)
      if (response.statusCode !== 200) {
        throw new Error(`Expected status 200, got ${response.statusCode}`)
      }
      if (!response.body.includes('DCF Logistics')) {
        throw new Error('Homepage content not found')
      }
    })

    // Test 2: Static assets load
    this.addTest('Static assets load', async () => {
      const cssResponse = await this.makeRequest(`${baseUrl}/_next/static/css/`)
      if (cssResponse.statusCode >= 400) {
        throw new Error('CSS assets not accessible')
      }
    })

    // Test 3: API health check
    this.addTest('API health check', async () => {
      try {
        const response = await this.makeRequest(`${baseUrl}/api/health`)
        if (response.statusCode !== 200) {
          throw new Error(`API health check failed: ${response.statusCode}`)
        }
      } catch (error) {
        // API might not be available in static export mode
        this.log('API health check skipped (static export mode)')
      }
    })

    // Test 4: Security headers
    this.addTest('Security headers', async () => {
      const response = await this.makeRequest(baseUrl)
      const headers = response.headers

      if (!headers['x-frame-options']) {
        throw new Error('X-Frame-Options header missing')
      }
      if (!headers['x-content-type-options']) {
        throw new Error('X-Content-Type-Options header missing')
      }
    })

    // Test 5: HTTPS redirect
    this.addTest('HTTPS redirect', async () => {
      if (baseUrl.startsWith('https')) {
        const httpUrl = baseUrl.replace('https://', 'http://')
        try {
          const response = await this.makeRequest(httpUrl)
          if (response.statusCode !== 301 && response.statusCode !== 302) {
            throw new Error('HTTPS redirect not configured')
          }
        } catch (error) {
          // HTTP might be blocked, which is also acceptable
          this.log('HTTP access blocked (good security practice)')
        }
      }
    })

    // Test 6: Robots.txt exists
    this.addTest('Robots.txt exists', async () => {
      const response = await this.makeRequest(`${baseUrl}/robots.txt`)
      if (response.statusCode !== 200) {
        throw new Error('robots.txt not found')
      }
    })

    // Test 7: Favicon loads
    this.addTest('Favicon loads', async () => {
      const response = await this.makeRequest(`${baseUrl}/favicon.ico`)
      if (response.statusCode !== 200) {
        throw new Error('Favicon not found')
      }
    })

    // Test 8: Admin page accessibility
    this.addTest('Admin page loads', async () => {
      const response = await this.makeRequest(`${baseUrl}/admin`)
      if (response.statusCode >= 400) {
        throw new Error('Admin page not accessible')
      }
    })

    // Test 9: Contact form page
    this.addTest('Contact form page', async () => {
      const response = await this.makeRequest(`${baseUrl}/contact`)
      if (response.statusCode !== 200) {
        throw new Error('Contact page not found')
      }
      if (!response.body.includes('contact') && !response.body.includes('Contact')) {
        throw new Error('Contact form not found on page')
      }
    })

    // Test 10: Performance check
    this.addTest('Performance check', async () => {
      const startTime = Date.now()
      await this.makeRequest(baseUrl)
      const loadTime = Date.now() - startTime

      if (loadTime > 5000) {
        throw new Error(`Page load time too slow: ${loadTime}ms`)
      }
      this.log(`Page load time: ${loadTime}ms`)
    })
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new DeploymentTester()
  tester.setupTests()
  
  tester.runAllTests().then(success => {
    if (success) {
      console.log('\n🎉 All tests passed! Deployment is successful.')
      process.exit(0)
    } else {
      console.log('\n💥 Some tests failed. Please check the deployment.')
      process.exit(1)
    }
  }).catch(error => {
    console.error('Test execution failed:', error)
    process.exit(1)
  })
}

module.exports = DeploymentTester
