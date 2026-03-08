#!/usr/bin/env node

/**
 * Rollback Script for GoDaddy Deployment
 * Restores previous deployment in case of failure
 */

const fs = require('fs')
const path = require('path')
const ftp = require('basic-ftp')

class RollbackManager {
  constructor() {
    this.config = this.loadConfig()
    this.backupDir = path.join(process.cwd(), 'backups')
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

  getLatestBackup() {
    if (!fs.existsSync(this.backupDir)) {
      throw new Error('No backups directory found')
    }

    const backups = fs.readdirSync(this.backupDir)
      .filter(name => name.startsWith('backup-'))
      .map(name => ({
        name,
        path: path.join(this.backupDir, name),
        timestamp: parseInt(name.replace('backup-', ''))
      }))
      .sort((a, b) => b.timestamp - a.timestamp)

    if (backups.length === 0) {
      throw new Error('No backups found')
    }

    return backups[0]
  }

  async createCurrentBackup() {
    this.log('Creating backup of current (failed) deployment...')
    
    const failedBackupName = `failed-deployment-${Date.now()}`
    const failedBackupPath = path.join(this.backupDir, failedBackupName)
    
    try {
      const client = new ftp.Client()
      await client.access(this.config.ftp)
      
      if (!fs.existsSync(failedBackupPath)) {
        fs.mkdirSync(failedBackupPath, { recursive: true })
      }
      
      await client.downloadToDir(failedBackupPath, this.config.remoteDir)
      await client.close()
      
      this.log(`Failed deployment backed up to: ${failedBackupName}`, 'success')
      return failedBackupPath
    } catch (error) {
      this.log(`Failed to backup current deployment: ${error.message}`, 'error')
      throw error
    }
  }

  async restoreBackup(backupPath) {
    this.log(`Restoring backup from: ${path.basename(backupPath)}`)
    
    try {
      const client = new ftp.Client()
      client.ftp.verbose = true
      
      await client.access(this.config.ftp)
      
      // Clear current deployment
      this.log('Clearing current deployment...')
      const remoteFiles = await client.list(this.config.remoteDir)
      
      for (const file of remoteFiles) {
        if (file.name !== '.' && file.name !== '..') {
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
      
      // Upload backup files
      this.log('Uploading backup files...')
      await client.uploadFromDir(backupPath, this.config.remoteDir)
      await client.close()
      
      this.log('Backup restored successfully', 'success')
    } catch (error) {
      this.log(`Restore failed: ${error.message}`, 'error')
      throw error
    }
  }

  async testRollback() {
    this.log('Testing rollback deployment...')
    
    try {
      const https = require('https')
      const http = require('http')
      
      const testUrl = this.config.siteUrl
      const client = testUrl.startsWith('https') ? https : http
      
      return new Promise((resolve, reject) => {
        const req = client.get(testUrl, (res) => {
          if (res.statusCode === 200) {
            this.log('Rollback test successful', 'success')
            resolve(true)
          } else {
            this.log(`Rollback test failed: HTTP ${res.statusCode}`, 'error')
            reject(new Error(`HTTP ${res.statusCode}`))
          }
        })
        
        req.on('error', (error) => {
          this.log(`Rollback test failed: ${error.message}`, 'error')
          reject(error)
        })
        
        req.setTimeout(10000, () => {
          this.log('Rollback test timed out', 'error')
          reject(new Error('Timeout'))
        })
      })
    } catch (error) {
      this.log(`Rollback test failed: ${error.message}`, 'error')
      throw error
    }
  }

  async rollback() {
    try {
      this.log('Starting rollback process...')
      
      // Get latest backup
      const latestBackup = this.getLatestBackup()
      this.log(`Found backup: ${latestBackup.name} (${new Date(latestBackup.timestamp).toISOString()})`)
      
      // Create backup of failed deployment
      await this.createCurrentBackup()
      
      // Restore from backup
      await this.restoreBackup(latestBackup.path)
      
      // Test rollback
      await this.testRollback()
      
      this.log('🔄 Rollback completed successfully!', 'success')
      this.log(`Site URL: ${this.config.siteUrl}`)
      this.log(`Restored from: ${latestBackup.name}`)
      
    } catch (error) {
      this.log(`Rollback failed: ${error.message}`, 'error')
      this.log('Manual intervention required!', 'error')
      process.exit(1)
    }
  }

  listBackups() {
    if (!fs.existsSync(this.backupDir)) {
      this.log('No backups directory found')
      return
    }

    const backups = fs.readdirSync(this.backupDir)
      .filter(name => name.startsWith('backup-'))
      .map(name => ({
        name,
        timestamp: parseInt(name.replace('backup-', ''))
      }))
      .sort((a, b) => b.timestamp - a.timestamp)

    if (backups.length === 0) {
      this.log('No backups found')
      return
    }

    this.log('Available backups:')
    backups.forEach((backup, index) => {
      const date = new Date(backup.timestamp).toISOString()
      const isLatest = index === 0 ? ' (latest)' : ''
      this.log(`  ${backup.name} - ${date}${isLatest}`)
    })
  }
}

// Command line interface
if (require.main === module) {
  const rollback = new RollbackManager()
  const command = process.argv[2]

  switch (command) {
    case 'list':
      rollback.listBackups()
      break
    case 'rollback':
    default:
      rollback.rollback()
      break
  }
}

module.exports = RollbackManager
