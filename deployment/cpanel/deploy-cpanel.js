#!/usr/bin/env node

/**
 * cPanel Deployment Script for DCF Logistics
 * Automates the build and deployment process for shared hosting
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const archiver = require('archiver')

class CpanelDeployer {
  constructor() {
    this.projectRoot = process.cwd()
    this.buildDir = path.join(this.projectRoot, 'out')
    this.deploymentDir = path.join(this.projectRoot, 'deployment', 'cpanel')
    this.packageName = 'dcf-logistics-cpanel-deployment'
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString()
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️'
    console.log(`${prefix} [${timestamp}] ${message}`)
  }

  async cleanBuildDir() {
    this.log('Cleaning previous build...')
    if (fs.existsSync(this.buildDir)) {
      fs.rmSync(this.buildDir, { recursive: true, force: true })
    }
  }

  async prepareConfiguration() {
    this.log('Preparing configuration for static export...')

    const staticConfig = path.join(this.deploymentDir, 'next.config.static.mjs')
    const currentConfig = path.join(this.projectRoot, 'next.config.mjs')

    // Check if static config exists
    if (!fs.existsSync(staticConfig)) {
      throw new Error(`Static config not found: ${staticConfig}`)
    }

    // Backup current config
    if (fs.existsSync(currentConfig)) {
      fs.copyFileSync(currentConfig, `${currentConfig}.backup`)
    }

    // Copy static export config
    fs.copyFileSync(staticConfig, currentConfig)

    this.log('Configuration updated for static export', 'success')
  }

  async buildApplication() {
    this.log('Building application for static export...')

    try {
      // Install dependencies
      this.log('Installing dependencies...')
      execSync('npm ci', { stdio: 'inherit' })

      // Generate Prisma client
      this.log('Generating Prisma client...')
      execSync('npx prisma generate', { stdio: 'inherit' })

      // Build the application
      this.log('Building Next.js application...')
      execSync('npm run build', { stdio: 'inherit' })

      this.log('Application built successfully', 'success')
    } catch (error) {
      this.log(`Build failed: ${error.message}`, 'error')
      throw error
    }
  }

  async restoreConfiguration() {
    this.log('Restoring original configuration...')

    const currentConfig = path.join(this.projectRoot, 'next.config.mjs')
    const backupConfig = `${currentConfig}.backup`

    if (fs.existsSync(backupConfig)) {
      fs.copyFileSync(backupConfig, currentConfig)
      fs.unlinkSync(backupConfig)
      this.log('Original configuration restored', 'success')
    }
  }

  async createHtaccess() {
    this.log('Creating .htaccess file...')

    const htaccessContent = `# DCF Logistics - cPanel Configuration

# Enable Rewrite Engine
RewriteEngine On

# Force HTTPS (if SSL is available)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle Next.js routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/api/
RewriteRule ^(.*)$ /index.html [L]

# Security Headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set Referrer-Policy "origin-when-cross-origin"
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

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
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Prevent access to sensitive files
<Files ".env*">
    Order allow,deny
    Deny from all
</Files>

<Files "*.config.*">
    Order allow,deny
    Deny from all
</Files>`

    fs.writeFileSync(path.join(this.buildDir, '.htaccess'), htaccessContent)
    this.log('.htaccess file created', 'success')
  }

  async createRobotsTxt() {
    this.log('Creating robots.txt...')

    const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://yourdomain.com/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /_next/
Disallow: /api/`

    fs.writeFileSync(path.join(this.buildDir, 'robots.txt'), robotsContent)
    this.log('robots.txt created', 'success')
  }

  async optimizeFiles() {
    this.log('Optimizing files for production...')

    try {
      // Remove unnecessary files
      const unnecessaryFiles = [
        'package.json',
        'package-lock.json',
        'node_modules',
        '.env*',
        '*.config.*'
      ]

      unnecessaryFiles.forEach(pattern => {
        const files = fs.readdirSync(this.buildDir).filter(file =>
          file.match(new RegExp(pattern.replace('*', '.*')))
        )
        files.forEach(file => {
          const filePath = path.join(this.buildDir, file)
          if (fs.existsSync(filePath)) {
            fs.rmSync(filePath, { recursive: true, force: true })
          }
        })
      })

      this.log('Files optimized', 'success')
    } catch (error) {
      this.log(`Optimization warning: ${error.message}`)
    }
  }

  async createDeploymentPackage() {
    this.log('Creating deployment package...')

    const packagePath = path.join(this.projectRoot, `${this.packageName}.zip`)
    const output = fs.createWriteStream(packagePath)
    const archive = archiver('zip', { zlib: { level: 9 } })

    return new Promise((resolve, reject) => {
      output.on('close', () => {
        this.log(`Deployment package created: ${packagePath} (${archive.pointer()} bytes)`, 'success')
        resolve(packagePath)
      })

      archive.on('error', reject)
      archive.pipe(output)
      archive.directory(this.buildDir, false)
      archive.finalize()
    })
  }

  async createDeploymentInstructions() {
    this.log('Creating deployment instructions...')

    const instructions = `# DCF Logistics - cPanel Deployment Package

## Quick Deployment Steps:

1. **Extract this ZIP file**
2. **Upload all files to your cPanel public_html directory**
3. **Create MySQL database in cPanel**
4. **Configure environment variables**
5. **Test your website**

## Detailed Instructions:

See the complete guide at: deployment/cpanel/CPANEL_DEPLOYMENT_GUIDE.md

## Files Included:

- index.html (main application)
- _next/ (Next.js assets)
- admin/ (admin dashboard)
- contact/ (contact page)
- services/ (services pages)
- .htaccess (server configuration)
- robots.txt (SEO configuration)

## Support:

For support, visit: https://github.com/your-repo/issues

---

Generated on: ${new Date().toISOString()}
Package version: ${require(path.join(this.projectRoot, 'package.json')).version}
`

    fs.writeFileSync(path.join(this.buildDir, 'DEPLOYMENT_INSTRUCTIONS.txt'), instructions)
    this.log('Deployment instructions created', 'success')
  }

  async deploy() {
    try {
      this.log('🚀 Starting cPanel deployment process...')

      // Clean previous build
      await this.cleanBuildDir()

      // Prepare configuration
      await this.prepareConfiguration()

      // Build application
      await this.buildApplication()

      // Restore configuration
      await this.restoreConfiguration()

      // Create additional files
      await this.createHtaccess()
      await this.createRobotsTxt()

      // Optimize files
      await this.optimizeFiles()

      // Create deployment instructions
      await this.createDeploymentInstructions()

      // Create deployment package
      const packagePath = await this.createDeploymentPackage()

      this.log('🎉 cPanel deployment package ready!', 'success')
      this.log(`Package location: ${packagePath}`)
      this.log('📋 Next steps:')
      this.log('1. Extract the ZIP file')
      this.log('2. Upload all files to your cPanel public_html directory')
      this.log('3. Follow the deployment guide for database setup')
      this.log('4. Configure your environment variables')
      this.log('5. Test your website')

    } catch (error) {
      this.log(`Deployment failed: ${error.message}`, 'error')

      // Restore configuration on error
      try {
        await this.restoreConfiguration()
      } catch (restoreError) {
        this.log(`Failed to restore configuration: ${restoreError.message}`, 'error')
      }

      process.exit(1)
    }
  }
}

// Run deployment if called directly
if (require.main === module) {
  const deployer = new CpanelDeployer()
  deployer.deploy()
}

module.exports = CpanelDeployer
