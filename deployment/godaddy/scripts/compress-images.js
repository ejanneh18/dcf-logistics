#!/usr/bin/env node

/**
 * Image Compression Script for GoDaddy Deployment
 * Optimizes images to reduce bandwidth and improve loading times
 */

const fs = require('fs')
const path = require('path')
const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')

class ImageCompressor {
  constructor() {
    this.inputDir = path.join(process.cwd(), 'out')
    this.outputDir = path.join(process.cwd(), 'out')
    this.stats = {
      processed: 0,
      originalSize: 0,
      compressedSize: 0,
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

  async findImages(dir) {
    const images = []
    const items = fs.readdirSync(dir)

    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        const subImages = await this.findImages(fullPath)
        images.push(...subImages)
      } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(item)) {
        images.push(fullPath)
      }
    }

    return images
  }

  async compressImages() {
    this.log('Starting image compression...')

    try {
      const images = await this.findImages(this.inputDir)
      
      if (images.length === 0) {
        this.log('No images found to compress')
        return
      }

      this.log(`Found ${images.length} images to compress`)

      for (const imagePath of images) {
        await this.compressImage(imagePath)
      }

      this.printStats()
      
    } catch (error) {
      this.log(`Image compression failed: ${error.message}`, 'error')
      throw error
    }
  }

  async compressImage(imagePath) {
    try {
      const originalStats = fs.statSync(imagePath)
      const originalSize = originalStats.size
      
      const relativePath = path.relative(this.inputDir, imagePath)
      const outputPath = path.join(this.outputDir, relativePath)
      const outputDir = path.dirname(outputPath)

      // Ensure output directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      // Compress based on file type
      const ext = path.extname(imagePath).toLowerCase()
      let plugins = []

      if (ext === '.jpg' || ext === '.jpeg') {
        plugins = [
          imageminMozjpeg({
            quality: 85,
            progressive: true
          })
        ]
      } else if (ext === '.png') {
        plugins = [
          imageminPngquant({
            quality: [0.6, 0.8],
            strip: true
          })
        ]
      }

      if (plugins.length > 0) {
        const files = await imagemin([imagePath], {
          destination: outputDir,
          plugins
        })

        if (files.length > 0) {
          const compressedSize = files[0].data.length
          const savings = originalSize - compressedSize
          const savingsPercent = ((savings / originalSize) * 100).toFixed(1)

          this.stats.processed++
          this.stats.originalSize += originalSize
          this.stats.compressedSize += compressedSize
          this.stats.savings += savings

          this.log(`Compressed ${relativePath}: ${this.formatBytes(originalSize)} → ${this.formatBytes(compressedSize)} (${savingsPercent}% saved)`)
        }
      } else {
        // Copy unsupported formats as-is
        fs.copyFileSync(imagePath, outputPath)
        this.log(`Copied ${relativePath} (unsupported format)`)
      }

    } catch (error) {
      this.log(`Failed to compress ${imagePath}: ${error.message}`, 'error')
    }
  }

  printStats() {
    const totalSavingsPercent = this.stats.originalSize > 0 
      ? ((this.stats.savings / this.stats.originalSize) * 100).toFixed(1)
      : 0

    this.log('Image compression completed!', 'success')
    this.log(`Images processed: ${this.stats.processed}`)
    this.log(`Original size: ${this.formatBytes(this.stats.originalSize)}`)
    this.log(`Compressed size: ${this.formatBytes(this.stats.compressedSize)}`)
    this.log(`Total savings: ${this.formatBytes(this.stats.savings)} (${totalSavingsPercent}%)`)
  }
}

// Run compression if called directly
if (require.main === module) {
  const compressor = new ImageCompressor()
  compressor.compressImages().catch(error => {
    console.error('Image compression failed:', error)
    process.exit(1)
  })
}

module.exports = ImageCompressor
