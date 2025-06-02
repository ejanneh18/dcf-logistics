#!/usr/bin/env node

/**
 * GoDaddy Deployment Script
 * Automates the deployment process to GoDaddy shared hosting
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const ftp = require('basic-ftp')

class GoDaddyDeployer {
  constructor() {
    this.config = this.loadConfig()
    this.buildDir = path.join(process.cwd(), 'out')
    this.backupDir = path.join(process.cwd(), 'backups')
  }

  loadConfig() {
    const configPath = path.join(process.cwd(), 'deployment', 'godaddy', 'config.json')
    if (!fs.existsSync(configPath)) {
      throw new Error('GoDaddy deployment config not found. Please create deployment/godaddy/config.json')
    }
    return JSON.parse(fs.readFileSync(configPath, 'utf8'))
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString()
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️'
    console.log(`${prefix} [${timestamp}] ${message}`)
  }

  async createBackup() {
    this.log('Creating backup of current deployment...')
    
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true })
    }

    const backupName = `backup-${Date.now()}`
    const backupPath = path.join(this.backupDir, backupName)
    
    try {
      const client = new ftp.Client()
      await client.access(this.config.ftp)
      
      // Download current files for backup
      await client.downloadToDir(backupPath, this.config.remoteDir)
      await client.close()
      
      this.log(`Backup created: ${backupName}`, 'success')
      return backupPath
    } catch (error) {
      this.log(`Backup failed: ${error.message}`, 'error')
      throw error
    }
  }

  async buildApplication() {
    this.log('Building application for production...')
    
    try {
      // Copy production config
      const prodConfig = path.join(process.cwd(), 'deployment', 'godaddy', 'next.config.production.mjs')
      const currentConfig = path.join(process.cwd(), 'next.config.mjs')
      
      if (fs.existsSync(currentConfig)) {
        fs.copyFileSync(currentConfig, `${currentConfig}.backup`)
      }
      fs.copyFileSync(prodConfig, currentConfig)

      // Build the application
      execSync('npm run build:godaddy', { stdio: 'inherit' })
      
      // Restore original config
      if (fs.existsSync(`${currentConfig}.backup`)) {
        fs.copyFileSync(`${currentConfig}.backup`, currentConfig)
        fs.unlinkSync(`${currentConfig}.backup`)
      }
      
      this.log('Application built successfully', 'success')
    } catch (error) {
      this.log(`Build failed: ${error.message}`, 'error')
      throw error
    }
  }

  async optimizeFiles() {
    this.log('Optimizing files for GoDaddy hosting...')
    
    try {
      // Create .htaccess file for GoDaddy
      const htaccessContent = `
# GoDaddy Next.js Configuration
RewriteEngine On

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Security headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set Referrer-Policy "origin-when-cross-origin"

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
`
      
      fs.writeFileSync(path.join(this.buildDir, '.htaccess'), htaccessContent.trim())
      
      // Create robots.txt
      const robotsContent = `
User-agent: *
Allow: /

Sitemap: ${this.config.siteUrl}/sitemap.xml
`
      fs.writeFileSync(path.join(this.buildDir, 'robots.txt'), robotsContent.trim())
      
      this.log('Files optimized for GoDaddy', 'success')
    } catch (error) {
      this.log(`Optimization failed: ${error.message}`, 'error')
      throw error
    }
  }

  async uploadFiles() {
    this.log('Uploading files to GoDaddy...')
    
    try {
      const client = new ftp.Client()
      client.ftp.verbose = true
      
      await client.access(this.config.ftp)
      
      // Clear remote directory (except for important files)
      const preserveFiles = ['.htaccess', 'robots.txt', 'sitemap.xml']
      const remoteFiles = await client.list(this.config.remoteDir)
      
      for (const file of remoteFiles) {
        if (!preserveFiles.includes(file.name) && file.name !== '.' && file.name !== '..') {
          try {
            if (file.isDirectory) {
              await client.removeDir(`${this.config.remoteDir}/${file.name}`)
            } else {
              await client.remove(`${this.config.remoteDir}/${file.name}`)
            }
          } catch (error) {
            this.log(`Warning: Could not remove ${file.name}: ${error.message}`)
          }
        }
      }
      
      // Upload new files
      await client.uploadFromDir(this.buildDir, this.config.remoteDir)
      await client.close()
      
      this.log('Files uploaded successfully', 'success')
    } catch (error) {
      this.log(`Upload failed: ${error.message}`, 'error')
      throw error
    }
  }

  async testDeployment() {
    this.log('Testing deployment...')
    
    try {
      const https = require('https')
      const http = require('http')
      
      const testUrl = this.config.siteUrl
      const client = testUrl.startsWith('https') ? https : http
      
      return new Promise((resolve, reject) => {
        const req = client.get(testUrl, (res) => {
          if (res.statusCode === 200) {
            this.log('Deployment test successful', 'success')
            resolve(true)
          } else {
            this.log(`Deployment test failed: HTTP ${res.statusCode}`, 'error')
            reject(new Error(`HTTP ${res.statusCode}`))
          }
        })
        
        req.on('error', (error) => {
          this.log(`Deployment test failed: ${error.message}`, 'error')
          reject(error)
        })
        
        req.setTimeout(10000, () => {
          this.log('Deployment test timed out', 'error')
          reject(new Error('Timeout'))
        })
      })
    } catch (error) {
      this.log(`Deployment test failed: ${error.message}`, 'error')
      throw error
    }
  }

  async deploy() {
    try {
      this.log('Starting GoDaddy deployment process...')
      
      // Create backup
      const backupPath = await this.createBackup()
      
      // Build application
      await this.buildApplication()
      
      // Optimize files
      await this.optimizeFiles()
      
      // Upload files
      await this.uploadFiles()
      
      // Test deployment
      await this.testDeployment()
      
      this.log('🎉 Deployment completed successfully!', 'success')
      this.log(`Site URL: ${this.config.siteUrl}`)
      this.log(`Backup created: ${path.basename(backupPath)}`)
      
    } catch (error) {
      this.log(`Deployment failed: ${error.message}`, 'error')
      process.exit(1)
    }
  }
}

// Run deployment if called directly
if (require.main === module) {
  const deployer = new GoDaddyDeployer()
  deployer.deploy()
}

module.exports = GoDaddyDeployer
