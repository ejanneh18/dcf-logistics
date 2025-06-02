#!/usr/bin/env node

/**
 * Email Queue Processor
 * 
 * This script processes pending emails in the queue and retries failed emails.
 * Run this script as a background job or cron job in production.
 * 
 * Usage:
 *   node scripts/process-email-queue.js
 *   
 * Cron job example (every 5 minutes):
 *   */5 * * * * /usr/bin/node /path/to/your/app/scripts/process-email-queue.js
 */

const { PrismaClient } = require('@prisma/client')
const { EmailService } = require('../lib/email/service')

const prisma = new PrismaClient()

// Configuration
const CONFIG = {
  batchSize: parseInt(process.env.EMAIL_QUEUE_BATCH_SIZE) || 10,
  maxRetries: parseInt(process.env.EMAIL_QUEUE_MAX_RETRIES) || 3,
  retryDelay: parseInt(process.env.EMAIL_QUEUE_RETRY_DELAY) || 300000, // 5 minutes
  logLevel: process.env.LOG_LEVEL || 'info'
}

// Logging utility
const log = {
  info: (message, data = {}) => {
    if (CONFIG.logLevel === 'info' || CONFIG.logLevel === 'debug') {
      console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data)
    }
  },
  error: (message, error = {}) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error)
  },
  debug: (message, data = {}) => {
    if (CONFIG.logLevel === 'debug') {
      console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`, data)
    }
  }
}

/**
 * Process pending emails in the queue
 */
async function processEmailQueue() {
  try {
    log.info('Starting email queue processing...')

    // Get pending emails that haven't exceeded max retries
    const pendingEmails = await prisma.emailQueue.findMany({
      where: {
        status: 'PENDING',
        attempts: { lt: CONFIG.maxRetries }
      },
      orderBy: [
        { createdAt: 'asc' }
      ],
      take: CONFIG.batchSize
    })

    if (pendingEmails.length === 0) {
      log.info('No pending emails to process')
      return
    }

    log.info(`Processing ${pendingEmails.length} pending emails`)

    let successCount = 0
    let failureCount = 0

    // Process each email
    for (const email of pendingEmails) {
      try {
        log.debug(`Processing email ${email.id} to ${email.to}`)

        // Prepare email options
        const emailOptions = {
          to: email.to,
          subject: email.subject,
          html: email.htmlContent,
          text: email.textContent || undefined
        }

        // Attempt to send email
        const sent = await sendEmailWithRetry(emailOptions)

        if (sent) {
          // Mark as sent
          await prisma.emailQueue.update({
            where: { id: email.id },
            data: {
              status: 'SENT',
              sentAt: new Date(),
              attempts: email.attempts + 1
            }
          })
          
          successCount++
          log.info(`Email ${email.id} sent successfully`)
        } else {
          // Mark as failed or pending for retry
          const newAttempts = email.attempts + 1
          const newStatus = newAttempts >= CONFIG.maxRetries ? 'FAILED' : 'PENDING'
          
          await prisma.emailQueue.update({
            where: { id: email.id },
            data: {
              status: newStatus,
              attempts: newAttempts,
              lastError: 'Failed to send email - unknown error'
            }
          })
          
          failureCount++
          log.error(`Email ${email.id} failed to send (attempt ${newAttempts}/${CONFIG.maxRetries})`)
        }

      } catch (error) {
        // Handle individual email processing errors
        const newAttempts = email.attempts + 1
        const newStatus = newAttempts >= CONFIG.maxRetries ? 'FAILED' : 'PENDING'
        
        await prisma.emailQueue.update({
          where: { id: email.id },
          data: {
            status: newStatus,
            attempts: newAttempts,
            lastError: error.message || 'Unknown error occurred'
          }
        })
        
        failureCount++
        log.error(`Error processing email ${email.id}:`, error.message)
      }
    }

    log.info(`Email processing completed: ${successCount} sent, ${failureCount} failed`)

  } catch (error) {
    log.error('Error in email queue processing:', error)
  }
}

/**
 * Send email with retry logic
 */
async function sendEmailWithRetry(emailOptions, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Use the EmailService to send email
      const result = await EmailService.sendEmail(emailOptions)
      if (result) {
        return true
      }
    } catch (error) {
      log.error(`Email send attempt ${attempt} failed:`, error.message)
      
      if (attempt < retries) {
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
      }
    }
  }
  
  return false
}

/**
 * Clean up old processed emails
 */
async function cleanupOldEmails() {
  try {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - 30) // Keep emails for 30 days

    const result = await prisma.emailQueue.deleteMany({
      where: {
        status: { in: ['SENT', 'FAILED'] },
        createdAt: { lt: cutoffDate }
      }
    })

    if (result.count > 0) {
      log.info(`Cleaned up ${result.count} old email records`)
    }
  } catch (error) {
    log.error('Error cleaning up old emails:', error)
  }
}

/**
 * Get queue statistics
 */
async function getQueueStats() {
  try {
    const stats = await prisma.emailQueue.groupBy({
      by: ['status'],
      _count: { status: true }
    })

    const statsObj = stats.reduce((acc, stat) => {
      acc[stat.status] = stat._count.status
      return acc
    }, {})

    log.info('Email queue statistics:', statsObj)
    return statsObj
  } catch (error) {
    log.error('Error getting queue statistics:', error)
    return {}
  }
}

/**
 * Main execution function
 */
async function main() {
  try {
    log.info('Email queue processor started')
    
    // Get initial statistics
    await getQueueStats()
    
    // Process the email queue
    await processEmailQueue()
    
    // Clean up old emails (run less frequently)
    if (Math.random() < 0.1) { // 10% chance to run cleanup
      await cleanupOldEmails()
    }
    
    // Get final statistics
    await getQueueStats()
    
    log.info('Email queue processor completed')
    
  } catch (error) {
    log.error('Fatal error in email queue processor:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Handle process signals for graceful shutdown
process.on('SIGINT', async () => {
  log.info('Received SIGINT, shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  log.info('Received SIGTERM, shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

// Run the main function
if (require.main === module) {
  main().catch((error) => {
    log.error('Unhandled error:', error)
    process.exit(1)
  })
}

module.exports = {
  processEmailQueue,
  cleanupOldEmails,
  getQueueStats
}
