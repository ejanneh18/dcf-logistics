#!/usr/bin/env node

/**
 * DCF Logistics - Vercel Setup Script
 * 
 * This script helps set up the DCF Logistics application on Vercel
 * with all required environment variables and configurations.
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class VercelSetup {
  constructor() {
    this.projectRoot = process.cwd()
    this.requiredEnvVars = [
      'DATABASE_URL',
      'NEXTAUTH_SECRET',
      'NEXTAUTH_URL',
      'SENDGRID_API_KEY',
      'SENDGRID_FROM_EMAIL',
      'STRIPE_PUBLISHABLE_KEY',
      'STRIPE_SECRET_KEY',
      'CLOUDINARY_CLOUD_NAME',
      'CLOUDINARY_API_KEY',
      'CLOUDINARY_API_SECRET'
    ]
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

  async checkVercelCLI() {
    try {
      execSync('vercel --version', { stdio: 'pipe' })
      this.log('✅ Vercel CLI is installed', 'success')
      return true
    } catch (error) {
      this.log('❌ Vercel CLI not found', 'error')
      this.log('📦 Installing Vercel CLI...', 'info')
      try {
        execSync('npm install -g vercel', { stdio: 'inherit' })
        this.log('✅ Vercel CLI installed successfully', 'success')
        return true
      } catch (installError) {
        this.log('❌ Failed to install Vercel CLI', 'error')
        return false
      }
    }
  }

  async loginToVercel() {
    try {
      this.log('🔐 Logging into Vercel...', 'info')
      execSync('vercel login', { stdio: 'inherit' })
      this.log('✅ Successfully logged into Vercel', 'success')
      return true
    } catch (error) {
      this.log('❌ Failed to login to Vercel', 'error')
      return false
    }
  }

  async createVercelProject() {
    try {
      this.log('🚀 Creating Vercel project...', 'info')
      
      // Check if project already exists
      try {
        execSync('vercel inspect', { stdio: 'pipe' })
        this.log('✅ Vercel project already exists', 'success')
        return true
      } catch (error) {
        // Project doesn't exist, create it
        execSync('vercel --confirm', { stdio: 'inherit' })
        this.log('✅ Vercel project created successfully', 'success')
        return true
      }
    } catch (error) {
      this.log('❌ Failed to create Vercel project', 'error')
      return false
    }
  }

  generateSecureSecret() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  async setupEnvironmentVariables() {
    this.log('🔧 Setting up environment variables...', 'info')
    
    const envVars = {
      DEPLOYMENT_TYPE: 'vercel',
      NEXT_PUBLIC_DEPLOYMENT_TYPE: 'vercel',
      NEXTAUTH_SECRET: this.generateSecureSecret(),
      NEXTAUTH_URL: 'https://your-vercel-domain.vercel.app',
      NEXT_PUBLIC_SITE_URL: 'https://your-vercel-domain.vercel.app',
      CONTACT_EMAIL: 'info@dcflogistics.com',
      SALES_EMAIL: 'sales@dcflogistics.com',
      ADMIN_EMAIL: 'admin@dcflogistics.com',
      NEXT_PUBLIC_COMPANY_NAME: 'DCF Logistics',
      NEXT_PUBLIC_PHONE: '+220-395-1020'
    }

    try {
      for (const [key, value] of Object.entries(envVars)) {
        execSync(`vercel env add ${key} production`, {
          input: value,
          stdio: ['pipe', 'inherit', 'inherit']
        })
        this.log(`✅ Set ${key}`, 'success')
      }
      
      this.log('✅ Basic environment variables configured', 'success')
      this.showManualEnvSetup()
      
    } catch (error) {
      this.log('❌ Failed to set environment variables automatically', 'error')
      this.log('📋 Please set them manually in Vercel Dashboard', 'warning')
      this.showManualEnvSetup()
    }
  }

  showManualEnvSetup() {
    this.log(`
📋 Manual Environment Variable Setup Required:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables

2. Add the following variables for PRODUCTION environment:

🔐 Authentication:
   NEXTAUTH_SECRET=${this.generateSecureSecret()}
   NEXTAUTH_URL=https://your-vercel-domain.vercel.app

🗄️ Database (choose one):
   DATABASE_URL=postgresql://user:pass@host:5432/dcf_logistics
   
   Recommended providers:
   - Supabase: https://supabase.com (PostgreSQL)
   - PlanetScale: https://planetscale.com (MySQL)
   - Railway: https://railway.app (PostgreSQL)

📧 Email Service (choose one):
   SENDGRID_API_KEY=SG.your-sendgrid-api-key
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   
   OR
   
   SMTP_HOST=smtp.youremailprovider.com
   SMTP_PORT=587
   SMTP_USER=noreply@yourdomain.com
   SMTP_PASS=your-email-password

💳 Payment Processing:
   STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
   STRIPE_SECRET_KEY=sk_live_your_stripe_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

📁 File Storage:
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

3. Deploy your application:
   npm run deploy:vercel
    `, 'info')
  }

  async deployToVercel() {
    try {
      this.log('🚀 Deploying to Vercel...', 'info')
      execSync('npm run deploy:vercel', { stdio: 'inherit' })
      this.log('✅ Successfully deployed to Vercel!', 'success')
      
      // Get deployment URL
      try {
        const url = execSync('vercel inspect --url', { encoding: 'utf8' }).trim()
        this.log(`🌐 Your application is live at: ${url}`, 'success')
      } catch (error) {
        this.log('🌐 Check Vercel Dashboard for your deployment URL', 'info')
      }
      
      return true
    } catch (error) {
      this.log('❌ Deployment failed', 'error')
      this.log('Please check the error messages above and try again', 'warning')
      return false
    }
  }

  async setupCustomDomain() {
    this.log(`
🌐 Custom Domain Setup:

1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., dcflogistics.com)
3. Configure DNS records as shown in Vercel
4. Update NEXTAUTH_URL environment variable to your custom domain
5. Redeploy the application

DNS Configuration:
- Type: CNAME, Name: www, Value: cname.vercel-dns.com
- Type: A, Name: @, Value: 76.76.19.61
    `, 'info')
  }

  async run() {
    this.log('🚀 DCF Logistics - Vercel Setup', 'info')
    this.log('This script will help you deploy DCF Logistics to Vercel', 'info')

    try {
      // Check and install Vercel CLI
      if (!(await this.checkVercelCLI())) {
        throw new Error('Vercel CLI setup failed')
      }

      // Login to Vercel
      if (!(await this.loginToVercel())) {
        throw new Error('Vercel login failed')
      }

      // Create project
      if (!(await this.createVercelProject())) {
        throw new Error('Vercel project creation failed')
      }

      // Setup environment variables
      await this.setupEnvironmentVariables()

      // Deploy
      this.log('🎯 Ready to deploy! Run the following command when environment variables are configured:', 'info')
      this.log('npm run deploy:vercel', 'success')

      // Show custom domain setup
      await this.setupCustomDomain()

      this.log('🎉 Vercel setup completed!', 'success')

    } catch (error) {
      this.log(`❌ Setup failed: ${error.message}`, 'error')
      process.exit(1)
    }
  }
}

// Run if called directly
if (require.main === module) {
  const setup = new VercelSetup()
  setup.run()
}

module.exports = VercelSetup
