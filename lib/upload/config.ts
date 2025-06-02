import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import { NextRequest } from 'next/server'

// Configure Cloudinary
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

// File type validation
export const ALLOWED_FILE_TYPES = {
  images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  documents: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'text/csv',
  ],
}

export const ALL_ALLOWED_TYPES = [
  ...ALLOWED_FILE_TYPES.images,
  ...ALLOWED_FILE_TYPES.documents,
]

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  image: 5 * 1024 * 1024, // 5MB
  document: 10 * 1024 * 1024, // 10MB
}

// Multer configuration for memory storage
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: Math.max(...Object.values(FILE_SIZE_LIMITS)),
  },
  fileFilter: (req, file, cb) => {
    if (ALL_ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error(`File type ${file.mimetype} is not allowed`))
    }
  },
})

export interface UploadResult {
  url: string
  publicId: string
  originalName: string
  size: number
  mimeType: string
}

export class FileUploadService {
  static async uploadToCloudinary(
    buffer: Buffer,
    originalName: string,
    mimeType: string,
    folder: string = 'dcf-logistics'
  ): Promise<UploadResult> {
    try {
      if (!process.env.CLOUDINARY_CLOUD_NAME) {
        throw new Error('Cloudinary not configured')
      }

      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: 'auto',
            public_id: `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9.-]/g, '_')}`,
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )
        uploadStream.end(buffer)
      })

      return {
        url: result.secure_url,
        publicId: result.public_id,
        originalName,
        size: buffer.length,
        mimeType,
      }
    } catch (error) {
      console.error('Cloudinary upload error:', error)
      throw new Error('Failed to upload file to cloud storage')
    }
  }

  static async uploadToLocal(
    buffer: Buffer,
    originalName: string,
    mimeType: string,
    folder: string = 'uploads'
  ): Promise<UploadResult> {
    try {
      const fs = await import('fs/promises')
      const path = await import('path')
      
      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), 'public', folder)
      await fs.mkdir(uploadsDir, { recursive: true })

      // Generate unique filename
      const timestamp = Date.now()
      const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_')
      const filename = `${timestamp}-${sanitizedName}`
      const filepath = path.join(uploadsDir, filename)

      // Write file
      await fs.writeFile(filepath, buffer)

      return {
        url: `/${folder}/${filename}`,
        publicId: filename,
        originalName,
        size: buffer.length,
        mimeType,
      }
    } catch (error) {
      console.error('Local upload error:', error)
      throw new Error('Failed to upload file to local storage')
    }
  }

  static async uploadFile(
    buffer: Buffer,
    originalName: string,
    mimeType: string,
    folder?: string
  ): Promise<UploadResult> {
    // Validate file type
    if (!ALL_ALLOWED_TYPES.includes(mimeType)) {
      throw new Error(`File type ${mimeType} is not allowed`)
    }

    // Validate file size
    const isImage = ALLOWED_FILE_TYPES.images.includes(mimeType)
    const maxSize = isImage ? FILE_SIZE_LIMITS.image : FILE_SIZE_LIMITS.document
    
    if (buffer.length > maxSize) {
      throw new Error(`File size exceeds limit of ${maxSize / (1024 * 1024)}MB`)
    }

    // Upload to Cloudinary if configured, otherwise local
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      return this.uploadToCloudinary(buffer, originalName, mimeType, folder)
    } else {
      return this.uploadToLocal(buffer, originalName, mimeType, folder)
    }
  }

  static async deleteFile(publicId: string): Promise<boolean> {
    try {
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        // Delete from Cloudinary
        const result = await cloudinary.uploader.destroy(publicId)
        return result.result === 'ok'
      } else {
        // Delete from local storage
        const fs = await import('fs/promises')
        const path = await import('path')
        
        const filepath = path.join(process.cwd(), 'public', 'uploads', publicId)
        await fs.unlink(filepath)
        return true
      }
    } catch (error) {
      console.error('File deletion error:', error)
      return false
    }
  }

  static validateFileType(mimeType: string, allowedTypes: string[]): boolean {
    return allowedTypes.includes(mimeType)
  }

  static validateFileSize(size: number, maxSize: number): boolean {
    return size <= maxSize
  }

  static getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || ''
  }

  static generateUniqueFilename(originalName: string): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8)
    const extension = this.getFileExtension(originalName)
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '')
    const sanitizedName = nameWithoutExt.replace(/[^a-zA-Z0-9-]/g, '_')
    
    return `${timestamp}_${random}_${sanitizedName}.${extension}`
  }
}

export default FileUploadService
