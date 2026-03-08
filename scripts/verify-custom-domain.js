#!/usr/bin/env node

/**
 * DCF Logistics - Custom Domain Verification Script
 * 
 * This script automates the verification process for custom domain setup
 * and provides comprehensive testing of DNS, SSL, and functionality.
 */

const { execSync } = require('child_process')
const https = require('https')
const dns = require('dns')
const { promisify } = require('util')

const dnsLookup = promisify(dns.lookup)
const dnsResolve = promisify(dns.resolve)

class CustomDomainVerifier {
  constructor(domain) {
    this.domain = domain
    this.vercelDomain = 'dcf-logistics-hn0in9dwt-ejanneh18-gmailcoms-projects.vercel.app'
    this.expectedIP = '76.76.19.61'
    this.expectedCNAME = 'cname.vercel-dns.com'
    this.testResults = {
      dns: { status: 'pending', details: [] },
      ssl: { status: 'pending', details: [] },
      functionality: { status: 'pending', details: [] },
      performance: { status: 'pending', details: [] }
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

  async testDNSResolution() {
    this.log('🔍 Testing DNS Resolution...', 'info')
    
    try {
      // Test A record resolution
      const result = await dnsLookup(this.domain)
      this.testResults.dns.details.push(`Resolved to IP: ${result.address}`)
      
      if (result.address === this.expectedIP) {
        this.testResults.dns.details.push('✅ IP address matches Vercel')
        this.testResults.dns.status = 'success'
      } else {
        this.testResults.dns.details.push('⚠️ IP address does not match expected Vercel IP')
        this.testResults.dns.status = 'warning'
      }
      
    } catch (error) {
      try {
        // Test CNAME resolution
        const cnames = await dnsResolve(this.domain, 'CNAME')
        this.testResults.dns.details.push(`CNAME points to: ${cnames[0]}`)
        
        if (cnames[0] === this.expectedCNAME) {
          this.testResults.dns.details.push('✅ CNAME correctly configured')
          this.testResults.dns.status = 'success'
        } else {
          this.testResults.dns.details.push('⚠️ CNAME does not match expected value')
          this.testResults.dns.status = 'warning'
        }
        
      } catch (cnameError) {
        this.testResults.dns.details.push(`❌ DNS resolution failed: ${error.message}`)
        this.testResults.dns.status = 'error'
      }
    }
  }

  async testSSLCertificate() {
    this.log('🔒 Testing SSL Certificate...', 'info')
    
    return new Promise((resolve) => {
      const options = {
        hostname: this.domain,
        port: 443,
        path: '/',
        method: 'HEAD',
        timeout: 10000
      }

      const req = https.request(options, (res) => {
        const cert = res.socket.getPeerCertificate()
        
        if (cert && Object.keys(cert).length > 0) {
          this.testResults.ssl.details.push('✅ SSL certificate is valid')
          this.testResults.ssl.details.push(`Issuer: ${cert.issuer.O || 'Unknown'}`)
          this.testResults.ssl.details.push(`Valid until: ${cert.valid_to}`)
          
          // Check if certificate covers the domain
          const altNames = cert.subjectaltname || ''
          if (altNames.includes(this.domain) || cert.subject.CN === this.domain) {
            this.testResults.ssl.details.push('✅ Certificate covers the domain')
            this.testResults.ssl.status = 'success'
          } else {
            this.testResults.ssl.details.push('⚠️ Certificate may not cover this domain')
            this.testResults.ssl.status = 'warning'
          }
        } else {
          this.testResults.ssl.details.push('❌ No SSL certificate found')
          this.testResults.ssl.status = 'error'
        }
        
        resolve()
      })

      req.on('error', (error) => {
        this.testResults.ssl.details.push(`❌ SSL test failed: ${error.message}`)
        this.testResults.ssl.status = 'error'
        resolve()
      })

      req.on('timeout', () => {
        this.testResults.ssl.details.push('❌ SSL test timed out')
        this.testResults.ssl.status = 'error'
        req.destroy()
        resolve()
      })

      req.end()
    })
  }

  async testWebsiteFunctionality() {
    this.log('🌐 Testing Website Functionality...', 'info')
    
    const testUrls = [
      '/',
      '/about',
      '/services',
      '/contact',
      '/tracking'
    ]

    let successCount = 0
    
    for (const path of testUrls) {
      try {
        const url = `https://${this.domain}${path}`
        const response = await this.makeHttpRequest(url)
        
        if (response.statusCode >= 200 && response.statusCode < 400) {
          this.testResults.functionality.details.push(`✅ ${path} - Status: ${response.statusCode}`)
          successCount++
        } else {
          this.testResults.functionality.details.push(`⚠️ ${path} - Status: ${response.statusCode}`)
        }
        
      } catch (error) {
        this.testResults.functionality.details.push(`❌ ${path} - Error: ${error.message}`)
      }
    }

    if (successCount === testUrls.length) {
      this.testResults.functionality.status = 'success'
      this.testResults.functionality.details.push(`✅ All ${testUrls.length} pages loaded successfully`)
    } else if (successCount > 0) {
      this.testResults.functionality.status = 'warning'
      this.testResults.functionality.details.push(`⚠️ ${successCount}/${testUrls.length} pages loaded successfully`)
    } else {
      this.testResults.functionality.status = 'error'
      this.testResults.functionality.details.push('❌ No pages loaded successfully')
    }
  }

  async makeHttpRequest(url) {
    return new Promise((resolve, reject) => {
      const request = https.get(url, { timeout: 10000 }, (response) => {
        resolve({
          statusCode: response.statusCode,
          headers: response.headers
        })
      })

      request.on('error', reject)
      request.on('timeout', () => {
        request.destroy()
        reject(new Error('Request timeout'))
      })
    })
  }

  async testPerformance() {
    this.log('⚡ Testing Performance...', 'info')
    
    try {
      const startTime = Date.now()
      await this.makeHttpRequest(`https://${this.domain}`)
      const loadTime = Date.now() - startTime
      
      this.testResults.performance.details.push(`Load time: ${loadTime}ms`)
      
      if (loadTime < 2000) {
        this.testResults.performance.details.push('✅ Excellent load time (< 2s)')
        this.testResults.performance.status = 'success'
      } else if (loadTime < 5000) {
        this.testResults.performance.details.push('⚠️ Acceptable load time (2-5s)')
        this.testResults.performance.status = 'warning'
      } else {
        this.testResults.performance.details.push('❌ Slow load time (> 5s)')
        this.testResults.performance.status = 'error'
      }
      
    } catch (error) {
      this.testResults.performance.details.push(`❌ Performance test failed: ${error.message}`)
      this.testResults.performance.status = 'error'
    }
  }

  generateReport() {
    this.log('', 'info')
    this.log('📊 CUSTOM DOMAIN VERIFICATION REPORT', 'info')
    this.log('=' .repeat(50), 'info')
    this.log('', 'info')

    const sections = [
      { name: 'DNS Resolution', key: 'dns', icon: '🔍' },
      { name: 'SSL Certificate', key: 'ssl', icon: '🔒' },
      { name: 'Website Functionality', key: 'functionality', icon: '🌐' },
      { name: 'Performance', key: 'performance', icon: '⚡' }
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
      this.log('✅ EXCELLENT: Custom domain is fully functional!', 'success')
    } else if (!hasErrors) {
      this.log('⚠️ GOOD: Custom domain is working with minor issues', 'warning')
    } else {
      this.log('❌ ISSUES: Custom domain has problems that need attention', 'error')
    }
    
    this.log('', 'info')
    this.log('=' .repeat(50), 'info')
  }

  async runFullVerification() {
    this.log(`🚀 Starting Custom Domain Verification for: ${this.domain}`, 'info')
    this.log('', 'info')

    await this.testDNSResolution()
    await this.testSSLCertificate()
    await this.testWebsiteFunctionality()
    await this.testPerformance()
    
    this.generateReport()
  }
}

// Command line usage
if (require.main === module) {
  const domain = process.argv[2]
  
  if (!domain) {
    console.log('Usage: node verify-custom-domain.js <domain>')
    console.log('Example: node verify-custom-domain.js app.dcflogistics.com')
    process.exit(1)
  }
  
  const verifier = new CustomDomainVerifier(domain)
  verifier.runFullVerification().catch(console.error)
}

module.exports = CustomDomainVerifier
