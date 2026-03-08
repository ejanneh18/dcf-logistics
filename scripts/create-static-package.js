#!/usr/bin/env node

/**
 * DCF Logistics - Static Deployment Package Creator
 * 
 * This script creates a deployment-ready package for static hosting
 * including all necessary files, configurations, and documentation.
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class StaticPackageCreator {
  constructor() {
    this.projectRoot = process.cwd()
    this.outDir = path.join(this.projectRoot, 'out')
    this.deploymentDir = path.join(this.projectRoot, 'deployment', 'static')
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
    this.packageName = `dcf-logistics-static-${this.timestamp}`
    this.packageDir = path.join(this.projectRoot, this.packageName)
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

  async checkBuildExists() {
    if (!fs.existsSync(this.outDir)) {
      this.log('Static build not found. Building now...', 'warning')
      try {
        execSync('npm run build:static', { 
          stdio: 'inherit',
          env: {
            ...process.env,
            NEXT_PUBLIC_SITE_URL: 'https://dcflogistics.com',
            NEXT_PUBLIC_CONTACT_EMAIL: 'info@dcflogistics.com'
          }
        })
        this.log('Static build completed', 'success')
      } catch (error) {
        this.log('Failed to build static version', 'error')
        throw error
      }
    } else {
      this.log('Using existing static build', 'info')
    }
  }

  async createPackageDirectory() {
    if (fs.existsSync(this.packageDir)) {
      this.log('Removing existing package directory', 'info')
      fs.rmSync(this.packageDir, { recursive: true, force: true })
    }
    
    fs.mkdirSync(this.packageDir, { recursive: true })
    this.log(`Created package directory: ${this.packageName}`, 'success')
  }

  async copyStaticFiles() {
    this.log('Copying static build files...', 'info')
    
    // Copy all files from out directory
    this.copyDirectory(this.outDir, this.packageDir)
    
    this.log('Static files copied successfully', 'success')
  }

  async copyDeploymentFiles() {
    this.log('Adding deployment configuration files...', 'info')
    
    // Copy .htaccess file
    const htaccessSource = path.join(this.deploymentDir, '.htaccess')
    const htaccessDest = path.join(this.packageDir, '.htaccess')
    
    if (fs.existsSync(htaccessSource)) {
      fs.copyFileSync(htaccessSource, htaccessDest)
      this.log('Added .htaccess configuration', 'success')
    }
    
    // Copy README
    const readmeSource = path.join(this.deploymentDir, 'README.md')
    const readmeDest = path.join(this.packageDir, 'DEPLOYMENT_INSTRUCTIONS.md')
    
    if (fs.existsSync(readmeSource)) {
      fs.copyFileSync(readmeSource, readmeDest)
      this.log('Added deployment instructions', 'success')
    }
  }

  async createDeploymentInfo() {
    const deploymentInfo = {
      packageName: this.packageName,
      createdAt: new Date().toISOString(),
      version: '1.0.0',
      buildType: 'static',
      totalFiles: this.countFiles(this.packageDir),
      packageSize: this.getDirectorySize(this.packageDir),
      deployment: {
        type: 'Static Hosting',
        compatibility: ['GoDaddy', 'cPanel', 'Apache', 'Nginx', 'IIS'],
        requirements: ['Web server with HTML support', 'Optional: SSL certificate'],
        features: {
          working: [
            'All public pages',
            'Contact forms (mailto)',
            'Service information',
            'Quote calculator',
            'Responsive design',
            'SEO optimization',
            'Offline support'
          ],
          limited: [
            'User authentication (demo only)',
            'Admin dashboard (static demo)',
            'Database operations (no persistence)',
            'Payment processing (external redirect)',
            'Email services (mailto links)'
          ]
        }
      },
      instructions: {
        quickStart: [
          '1. Extract all files from this package',
          '2. Upload contents to your web server root directory (public_html)',
          '3. Ensure file permissions: 644 for files, 755 for directories',
          '4. Configure SSL certificate if available',
          '5. Test your website'
        ],
        support: 'See DEPLOYMENT_INSTRUCTIONS.md for detailed setup guide'
      }
    }

    const infoPath = path.join(this.packageDir, 'deployment-info.json')
    fs.writeFileSync(infoPath, JSON.stringify(deploymentInfo, null, 2))
    this.log('Created deployment information file', 'success')
  }

  async createZipPackage() {
    this.log('Creating ZIP package...', 'info')
    
    const zipName = `${this.packageName}.zip`
    const zipPath = path.join(this.projectRoot, zipName)
    
    try {
      // Remove existing zip if it exists
      if (fs.existsSync(zipPath)) {
        fs.unlinkSync(zipPath)
      }
      
      // Create zip using PowerShell on Windows or zip command on Unix
      if (process.platform === 'win32') {
        execSync(`powershell Compress-Archive -Path "${this.packageDir}\\*" -DestinationPath "${zipPath}"`, { stdio: 'inherit' })
      } else {
        execSync(`cd "${this.packageDir}" && zip -r "../${zipName}" .`, { stdio: 'inherit' })
      }
      
      this.log(`ZIP package created: ${zipName}`, 'success')
      return zipPath
    } catch (error) {
      this.log('Failed to create ZIP package', 'error')
      this.log('Package directory is available for manual upload', 'info')
      return this.packageDir
    }
  }

  copyDirectory(source, destination) {
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true })
    }

    const items = fs.readdirSync(source)
    
    for (const item of items) {
      const sourcePath = path.join(source, item)
      const destPath = path.join(destination, item)
      
      if (fs.statSync(sourcePath).isDirectory()) {
        this.copyDirectory(sourcePath, destPath)
      } else {
        fs.copyFileSync(sourcePath, destPath)
      }
    }
  }

  countFiles(directory) {
    let count = 0
    const items = fs.readdirSync(directory)
    
    for (const item of items) {
      const itemPath = path.join(directory, item)
      if (fs.statSync(itemPath).isDirectory()) {
        count += this.countFiles(itemPath)
      } else {
        count++
      }
    }
    
    return count
  }

  getDirectorySize(directory) {
    let size = 0
    const items = fs.readdirSync(directory)
    
    for (const item of items) {
      const itemPath = path.join(directory, item)
      if (fs.statSync(itemPath).isDirectory()) {
        size += this.getDirectorySize(itemPath)
      } else {
        size += fs.statSync(itemPath).size
      }
    }
    
    return this.formatBytes(size)
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  async createPackage() {
    try {
      this.log('🚀 DCF Logistics - Static Package Creator', 'info')
      
      // Check if build exists
      await this.checkBuildExists()
      
      // Create package directory
      await this.createPackageDirectory()
      
      // Copy static files
      await this.copyStaticFiles()
      
      // Copy deployment files
      await this.copyDeploymentFiles()
      
      // Create deployment info
      await this.createDeploymentInfo()
      
      // Create ZIP package
      const packagePath = await this.createZipPackage()
      
      this.log('📦 Package creation completed!', 'success')
      this.log(`📁 Package location: ${packagePath}`, 'info')
      this.log('', 'info')
      this.log('🚀 Ready for deployment to:', 'info')
      this.log('  • GoDaddy shared hosting', 'info')
      this.log('  • cPanel hosting', 'info')
      this.log('  • Any Apache/Nginx server', 'info')
      this.log('', 'info')
      this.log('📋 Next steps:', 'info')
      this.log('  1. Extract the ZIP file', 'info')
      this.log('  2. Upload contents to your web server', 'info')
      this.log('  3. Follow DEPLOYMENT_INSTRUCTIONS.md', 'info')
      
    } catch (error) {
      this.log(`❌ Package creation failed: ${error.message}`, 'error')
      process.exit(1)
    }
  }
}

// Run if called directly
if (require.main === module) {
  const creator = new StaticPackageCreator()
  creator.createPackage()
}

module.exports = StaticPackageCreator
