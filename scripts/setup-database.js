#!/usr/bin/env node

/**
 * DCF Logistics - Database Setup Script
 * 
 * This script helps set up the database for DCF Logistics
 * with proper schema, migrations, and initial data.
 */

const { execSync } = require('child_process')

class DatabaseSetup {
  constructor() {
    this.databaseProviders = {
      supabase: {
        name: 'Supabase',
        description: 'PostgreSQL with real-time features',
        url: 'https://supabase.com',
        freeLimit: '500MB, 2 projects',
        connectionString: 'postgresql://postgres:[password]@[host]:5432/postgres'
      },
      planetscale: {
        name: 'PlanetScale',
        description: 'Serverless MySQL platform',
        url: 'https://planetscale.com',
        freeLimit: '1GB storage, 1 billion reads',
        connectionString: 'mysql://[username]:[password]@[host]/[database]?sslaccept=strict'
      },
      railway: {
        name: 'Railway',
        description: 'PostgreSQL with simple deployment',
        url: 'https://railway.app',
        freeLimit: '$5/month credit',
        connectionString: 'postgresql://[username]:[password]@[host]:[port]/[database]'
      },
      neon: {
        name: 'Neon',
        description: 'Serverless PostgreSQL',
        url: 'https://neon.tech',
        freeLimit: '3GB storage, 1 project',
        connectionString: 'postgresql://[username]:[password]@[host]/[database]?sslmode=require'
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

  showDatabaseProviders() {
    this.log('🗄️ Recommended Database Providers:', 'info')
    this.log('', 'info')
    
    Object.entries(this.databaseProviders).forEach(([key, provider]) => {
      this.log(`📊 ${provider.name}`, 'success')
      this.log(`   ${provider.description}`, 'info')
      this.log(`   🌐 ${provider.url}`, 'info')
      this.log(`   💰 Free tier: ${provider.freeLimit}`, 'info')
      this.log(`   🔗 Connection: ${provider.connectionString}`, 'info')
      this.log('', 'info')
    })
  }

  async checkPrisma() {
    try {
      execSync('npx prisma --version', { stdio: 'pipe' })
      this.log('✅ Prisma CLI is available', 'success')
      return true
    } catch (error) {
      this.log('❌ Prisma CLI not found', 'error')
      this.log('📦 Installing Prisma...', 'info')
      try {
        execSync('npm install prisma @prisma/client', { stdio: 'inherit' })
        this.log('✅ Prisma installed successfully', 'success')
        return true
      } catch (installError) {
        this.log('❌ Failed to install Prisma', 'error')
        return false
      }
    }
  }

  async generatePrismaClient() {
    try {
      this.log('🔧 Generating Prisma client...', 'info')
      execSync('npx prisma generate', { stdio: 'inherit' })
      this.log('✅ Prisma client generated successfully', 'success')
      return true
    } catch (error) {
      this.log('❌ Failed to generate Prisma client', 'error')
      return false
    }
  }

  async runMigrations() {
    if (!process.env.DATABASE_URL) {
      this.log('❌ DATABASE_URL environment variable not set', 'error')
      this.log('Please set DATABASE_URL and try again', 'warning')
      return false
    }

    try {
      this.log('🚀 Running database migrations...', 'info')
      execSync('npx prisma db push', { stdio: 'inherit' })
      this.log('✅ Database migrations completed successfully', 'success')
      return true
    } catch (error) {
      this.log('❌ Database migrations failed', 'error')
      this.log('Please check your DATABASE_URL and database connectivity', 'warning')
      return false
    }
  }

  async seedDatabase() {
    try {
      this.log('🌱 Seeding database with initial data...', 'info')
      execSync('npx prisma db seed', { stdio: 'inherit' })
      this.log('✅ Database seeded successfully', 'success')
      return true
    } catch (error) {
      this.log('⚠️ Database seeding failed or no seed script found', 'warning')
      this.log('This is optional - your application will still work', 'info')
      return true
    }
  }

  async testDatabaseConnection() {
    if (!process.env.DATABASE_URL) {
      this.log('❌ DATABASE_URL not set - cannot test connection', 'error')
      return false
    }

    try {
      this.log('🔍 Testing database connection...', 'info')
      
      // Create a simple test script
      const testScript = `
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Database connection successful')
    await prisma.$disconnect()
    process.exit(0)
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    process.exit(1)
  }
}

testConnection()
      `
      
      require('fs').writeFileSync('test-db.js', testScript)
      execSync('node test-db.js', { stdio: 'inherit' })
      require('fs').unlinkSync('test-db.js')
      
      this.log('✅ Database connection test passed', 'success')
      return true
    } catch (error) {
      this.log('❌ Database connection test failed', 'error')
      return false
    }
  }

  showSetupInstructions() {
    this.log(`
📋 Database Setup Instructions:

1. 🏗️ Choose a database provider (see options above)
2. 🔧 Create a new database instance
3. 📝 Copy the connection string
4. 🔐 Set DATABASE_URL environment variable:
   
   For local development:
   echo "DATABASE_URL=your-connection-string" >> .env.local
   
   For Vercel:
   vercel env add DATABASE_URL production
   (then paste your connection string)

5. 🚀 Run database setup:
   npm run db:setup

6. 🧪 Test your setup:
   npm run db:test

Example DATABASE_URL formats:
- PostgreSQL: postgresql://user:pass@host:5432/database
- MySQL: mysql://user:pass@host:3306/database
    `, 'info')
  }

  async fullSetup() {
    this.log('🗄️ DCF Logistics - Database Setup', 'info')
    
    try {
      // Check Prisma
      if (!(await this.checkPrisma())) {
        throw new Error('Prisma setup failed')
      }

      // Generate Prisma client
      if (!(await this.generatePrismaClient())) {
        throw new Error('Prisma client generation failed')
      }

      // Test database connection
      if (!(await this.testDatabaseConnection())) {
        throw new Error('Database connection test failed')
      }

      // Run migrations
      if (!(await this.runMigrations())) {
        throw new Error('Database migrations failed')
      }

      // Seed database
      await this.seedDatabase()

      this.log('🎉 Database setup completed successfully!', 'success')
      this.log('Your DCF Logistics application is ready to use', 'info')

    } catch (error) {
      this.log(`❌ Database setup failed: ${error.message}`, 'error')
      this.log('Please check the error messages and try again', 'warning')
      process.exit(1)
    }
  }

  async run() {
    const args = process.argv.slice(2)
    const command = args[0]

    switch (command) {
      case 'providers':
        this.showDatabaseProviders()
        break
      
      case 'instructions':
        this.showSetupInstructions()
        break
      
      case 'test':
        await this.testDatabaseConnection()
        break
      
      case 'migrate':
        await this.runMigrations()
        break
      
      case 'seed':
        await this.seedDatabase()
        break
      
      case 'setup':
      default:
        await this.fullSetup()
        break
    }
  }
}

// Run if called directly
if (require.main === module) {
  const setup = new DatabaseSetup()
  setup.run()
}

module.exports = DatabaseSetup
