#!/usr/bin/env node

/**
 * Portable Package Builder
 * Creates a self-contained deployment package with installation wizard
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const archiver = require('archiver')

class PackageBuilder {
  constructor() {
    this.projectRoot = process.cwd()
    this.buildDir = path.join(this.projectRoot, 'dist-package')
    this.packageName = 'dcf-logistics-portable'
    this.version = this.getVersion()
  }

  getVersion() {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(this.projectRoot, 'package.json'), 'utf8'))
      return packageJson.version || '1.0.0'
    } catch {
      return '1.0.0'
    }
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString()
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️'
    console.log(`${prefix} [${timestamp}] ${message}`)
  }

  async cleanBuildDir() {
    this.log('Cleaning build directory...')
    if (fs.existsSync(this.buildDir)) {
      fs.rmSync(this.buildDir, { recursive: true, force: true })
    }
    fs.mkdirSync(this.buildDir, { recursive: true })
  }

  async buildApplication() {
    this.log('Building Next.js application...')
    
    try {
      // Copy portable config
      const portableConfig = path.join(this.projectRoot, 'deployment', 'portable', 'next.config.portable.mjs')
      const currentConfig = path.join(this.projectRoot, 'next.config.mjs')
      
      if (fs.existsSync(currentConfig)) {
        fs.copyFileSync(currentConfig, `${currentConfig}.backup`)
      }
      fs.copyFileSync(portableConfig, currentConfig)

      // Build the application
      execSync('npm run build', { stdio: 'inherit' })
      
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

  async copyApplicationFiles() {
    this.log('Copying application files...')
    
    const appDir = path.join(this.buildDir, 'app')
    fs.mkdirSync(appDir, { recursive: true })

    // Copy built application
    const sourceDir = path.join(this.projectRoot, '.next')
    if (fs.existsSync(sourceDir)) {
      this.copyDirectory(sourceDir, path.join(appDir, '.next'))
    }

    // Copy public assets
    const publicDir = path.join(this.projectRoot, 'public')
    if (fs.existsSync(publicDir)) {
      this.copyDirectory(publicDir, path.join(appDir, 'public'))
    }

    // Copy essential files
    const essentialFiles = [
      'package.json',
      'next.config.mjs',
      'tailwind.config.ts',
      'postcss.config.mjs'
    ]

    for (const file of essentialFiles) {
      const sourcePath = path.join(this.projectRoot, file)
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, path.join(appDir, file))
      }
    }

    // Copy source code (for server-side functionality)
    const sourceDirectories = ['app', 'components', 'lib', 'hooks', 'prisma']
    for (const dir of sourceDirectories) {
      const sourcePath = path.join(this.projectRoot, dir)
      if (fs.existsSync(sourcePath)) {
        this.copyDirectory(sourcePath, path.join(appDir, dir))
      }
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

  async createInstallationWizard() {
    this.log('Creating installation wizard...')
    
    const wizardDir = path.join(this.buildDir, 'installer')
    fs.mkdirSync(wizardDir, { recursive: true })

    // Copy wizard files
    const wizardSource = path.join(this.projectRoot, 'deployment', 'portable', 'installer')
    if (fs.existsSync(wizardSource)) {
      this.copyDirectory(wizardSource, wizardDir)
    }

    // Create installation script
    const installScript = this.generateInstallScript()
    fs.writeFileSync(path.join(this.buildDir, 'install.js'), installScript)

    // Create batch/shell scripts for different platforms
    this.createPlatformScripts()
  }

  generateInstallScript() {
    return `#!/usr/bin/env node

/**
 * DCF Logistics Installation Script
 * Automated setup for portable deployment
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const http = require('http')
const url = require('url')

class Installer {
  constructor() {
    this.installDir = process.cwd()
    this.config = {}
    this.port = 3000
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString()
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️'
    console.log(\`\${prefix} [\${timestamp}] \${message}\`)
  }

  async startWizard() {
    this.log('Starting DCF Logistics Installation Wizard...')
    this.log('Open your browser and go to: http://localhost:3000/installer')
    
    const server = http.createServer((req, res) => {
      this.handleRequest(req, res)
    })

    server.listen(this.port, () => {
      this.log(\`Installation wizard running on port \${this.port}\`, 'success')
    })
  }

  handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true)
    const pathname = parsedUrl.pathname

    if (pathname === '/installer' || pathname === '/') {
      this.serveInstaller(res)
    } else if (pathname === '/api/install') {
      this.handleInstallation(req, res)
    } else {
      res.writeHead(404)
      res.end('Not Found')
    }
  }

  serveInstaller(res) {
    const installerPath = path.join(this.installDir, 'installer', 'index.html')
    if (fs.existsSync(installerPath)) {
      const content = fs.readFileSync(installerPath, 'utf8')
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(content)
    } else {
      res.writeHead(500)
      res.end('Installer not found')
    }
  }

  async handleInstallation(req, res) {
    // Handle POST request with installation configuration
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', async () => {
      try {
        this.config = JSON.parse(body)
        await this.performInstallation()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: true, message: 'Installation completed' }))
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: error.message }))
      }
    })
  }

  async performInstallation() {
    this.log('Performing installation...')
    
    // Create environment file
    this.createEnvironmentFile()
    
    // Setup database
    await this.setupDatabase()
    
    // Install dependencies
    this.installDependencies()
    
    // Run migrations
    await this.runMigrations()
    
    // Create admin user
    await this.createAdminUser()
    
    this.log('Installation completed successfully!', 'success')
  }

  createEnvironmentFile() {
    const envContent = \`
NEXTAUTH_URL=\${this.config.siteUrl}
NEXTAUTH_SECRET=\${this.config.authSecret}
DATABASE_URL=\${this.config.databaseUrl}
EMAIL_FROM=\${this.config.emailFrom}
SENDGRID_API_KEY=\${this.config.sendgridKey || ''}
STRIPE_PUBLIC_KEY=\${this.config.stripePublicKey || ''}
STRIPE_SECRET_KEY=\${this.config.stripeSecretKey || ''}
\`.trim()

    fs.writeFileSync(path.join(this.installDir, 'app', '.env.local'), envContent)
  }

  async setupDatabase() {
    this.log('Setting up database...')
    
    if (this.config.databaseType === 'sqlite') {
      // Create SQLite database file
      const dbPath = path.join(this.installDir, 'app', 'database.sqlite')
      if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, '')
      }
    }
  }

  installDependencies() {
    this.log('Installing dependencies...')
    process.chdir(path.join(this.installDir, 'app'))
    execSync('npm install --production', { stdio: 'inherit' })
  }

  async runMigrations() {
    this.log('Running database migrations...')
    execSync('npx prisma generate', { stdio: 'inherit' })
    execSync('npx prisma db push', { stdio: 'inherit' })
  }

  async createAdminUser() {
    this.log('Creating admin user...')
    // Implementation for creating admin user
  }
}

const installer = new Installer()
installer.startWizard()
`
  }

  createPlatformScripts() {
    // Windows batch script
    const windowsScript = `@echo off
echo Starting DCF Logistics Installation...
node install.js
pause`
    fs.writeFileSync(path.join(this.buildDir, 'install.bat'), windowsScript)

    // Unix shell script
    const unixScript = `#!/bin/bash
echo "Starting DCF Logistics Installation..."
node install.js`
    fs.writeFileSync(path.join(this.buildDir, 'install.sh'), unixScript)
    
    // Make shell script executable
    try {
      fs.chmodSync(path.join(this.buildDir, 'install.sh'), '755')
    } catch (error) {
      // Ignore chmod errors on Windows
    }
  }

  async createDocumentation() {
    this.log('Creating documentation...')
    
    const readmeContent = \`# DCF Logistics - Portable Installation Package

## Quick Start

1. Extract this package to your web server directory
2. Run the installation script:
   - Windows: Double-click \`install.bat\`
   - Linux/Mac: Run \`./install.sh\`
3. Open your browser to http://localhost:3000/installer
4. Follow the installation wizard

## System Requirements

- Node.js 18 or higher
- 500MB free disk space
- Modern web browser

## Manual Installation

If the automatic installer doesn't work:

1. Navigate to the \`app\` directory
2. Run \`npm install\`
3. Copy \`.env.example\` to \`.env.local\` and configure
4. Run \`npx prisma db push\`
5. Run \`npm run build\`
6. Run \`npm start\`

## Support

For support, visit: https://github.com/your-repo/issues
\`

    fs.writeFileSync(path.join(this.buildDir, 'README.md'), readmeContent)
  }

  async createPackage() {
    this.log('Creating deployment package...')
    
    const packagePath = path.join(this.projectRoot, \`\${this.packageName}-v\${this.version}.zip\`)
    const output = fs.createWriteStream(packagePath)
    const archive = archiver('zip', { zlib: { level: 9 } })

    return new Promise((resolve, reject) => {
      output.on('close', () => {
        this.log(\`Package created: \${packagePath} (\${archive.pointer()} bytes)\`, 'success')
        resolve(packagePath)
      })

      archive.on('error', reject)
      archive.pipe(output)
      archive.directory(this.buildDir, false)
      archive.finalize()
    })
  }

  async build() {
    try {
      this.log('Starting portable package build...')
      
      await this.cleanBuildDir()
      await this.buildApplication()
      await this.copyApplicationFiles()
      await this.createInstallationWizard()
      await this.createDocumentation()
      const packagePath = await this.createPackage()
      
      this.log('🎉 Portable package build completed!', 'success')
      this.log(\`Package location: \${packagePath}\`)
      
    } catch (error) {
      this.log(\`Build failed: \${error.message}\`, 'error')
      process.exit(1)
    }
  }
}

// Run build if called directly
if (require.main === module) {
  const builder = new PackageBuilder()
  builder.build()
}

module.exports = PackageBuilder
