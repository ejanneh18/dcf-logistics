#!/usr/bin/env node

/**
 * CSS Minification Script for GoDaddy Deployment
 * Minifies CSS files to reduce bandwidth and improve loading times
 */

const fs = require('fs')
const path = require('path')

class CSSMinifier {
  constructor() {
    this.inputDir = path.join(process.cwd(), 'out')
    this.stats = {
      processed: 0,
      originalSize: 0,
      minifiedSize: 0,
      savings: 0
    }
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString()
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️'
    console.log(`${prefix} [${timestamp}] ${message}`)
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  async findCSSFiles(dir) {
    const cssFiles = []
    const items = fs.readdirSync(dir)

    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        const subFiles = await this.findCSSFiles(fullPath)
        cssFiles.push(...subFiles)
      } else if (item.endsWith('.css')) {
        cssFiles.push(fullPath)
      }
    }

    return cssFiles
  }

  minifyCSS(cssContent) {
    return cssContent
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove unnecessary whitespace
      .replace(/\s+/g, ' ')
      // Remove whitespace around specific characters
      .replace(/\s*([{}:;,>+~])\s*/g, '$1')
      // Remove trailing semicolons before closing braces
      .replace(/;}/g, '}')
      // Remove leading/trailing whitespace
      .trim()
  }

  async minifyFiles() {
    this.log('Starting CSS minification...')

    try {
      const cssFiles = await this.findCSSFiles(this.inputDir)
      
      if (cssFiles.length === 0) {
        this.log('No CSS files found to minify')
        return
      }

      this.log(`Found ${cssFiles.length} CSS files to minify`)

      for (const cssPath of cssFiles) {
        await this.minifyFile(cssPath)
      }

      this.printStats()
      
    } catch (error) {
      this.log(`CSS minification failed: ${error.message}`, 'error')
      throw error
    }
  }

  async minifyFile(cssPath) {
    try {
      const originalContent = fs.readFileSync(cssPath, 'utf8')
      const originalSize = Buffer.byteLength(originalContent, 'utf8')
      
      const minifiedContent = this.minifyCSS(originalContent)
      const minifiedSize = Buffer.byteLength(minifiedContent, 'utf8')
      
      // Only write if there's actual savings
      if (minifiedSize < originalSize) {
        fs.writeFileSync(cssPath, minifiedContent, 'utf8')
        
        const savings = originalSize - minifiedSize
        const savingsPercent = ((savings / originalSize) * 100).toFixed(1)
        
        this.stats.processed++
        this.stats.originalSize += originalSize
        this.stats.minifiedSize += minifiedSize
        this.stats.savings += savings
        
        const relativePath = path.relative(this.inputDir, cssPath)
        this.log(`Minified ${relativePath}: ${this.formatBytes(originalSize)} → ${this.formatBytes(minifiedSize)} (${savingsPercent}% saved)`)
      } else {
        const relativePath = path.relative(this.inputDir, cssPath)
        this.log(`Skipped ${relativePath} (already optimized)`)
      }

    } catch (error) {
      this.log(`Failed to minify ${cssPath}: ${error.message}`, 'error')
    }
  }

  printStats() {
    const totalSavingsPercent = this.stats.originalSize > 0 
      ? ((this.stats.savings / this.stats.originalSize) * 100).toFixed(1)
      : 0

    this.log('CSS minification completed!', 'success')
    this.log(`Files processed: ${this.stats.processed}`)
    this.log(`Original size: ${this.formatBytes(this.stats.originalSize)}`)
    this.log(`Minified size: ${this.formatBytes(this.stats.minifiedSize)}`)
    this.log(`Total savings: ${this.formatBytes(this.stats.savings)} (${totalSavingsPercent}%)`)
  }
}

// Run minification if called directly
if (require.main === module) {
  const minifier = new CSSMinifier()
  minifier.minifyFiles().catch(error => {
    console.error('CSS minification failed:', error)
    process.exit(1)
  })
}

module.exports = CSSMinifier
