import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, staffProcedure } from '../server'
import { TRPCError } from '@trpc/server'
import { DocumentType, UserRole } from '@prisma/client'
import { FileUploadService } from '@/lib/upload/config'

const createDocumentSchema = z.object({
  filename: z.string(),
  url: z.string(),
  size: z.number(),
  mimeType: z.string(),
  type: z.nativeEnum(DocumentType),
  description: z.string().optional(),
  shipmentId: z.string().optional(),
})

const updateDocumentSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(DocumentType).optional(),
  description: z.string().optional(),
  shipmentId: z.string().optional(),
})

export const documentsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createDocumentSchema)
    .mutation(async ({ ctx, input }) => {
      const document = await ctx.db.document.create({
        data: {
          ...input,
          uploadedById: ctx.session.user.id,
        },
        include: {
          uploadedBy: {
            select: {
              name: true,
              email: true,
            }
          },
          shipment: {
            select: {
              trackingNumber: true,
            }
          }
        }
      })

      return document
    }),

  getAll: protectedProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      type: z.nativeEnum(DocumentType).optional(),
      shipmentId: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const { page, limit, type, shipmentId } = input
      const skip = (page - 1) * limit

      let where: any = {}

      // Filter by type
      if (type) {
        where.type = type
      }

      // Filter by shipment
      if (shipmentId) {
        where.shipmentId = shipmentId
      }

      // Filter by user if customer
      if (ctx.session.user.role === UserRole.CUSTOMER) {
        const customer = await ctx.db.customer.findUnique({
          where: { userId: ctx.session.user.id }
        })
        
        if (customer) {
          where.OR = [
            { uploadedById: ctx.session.user.id },
            {
              shipment: {
                customerId: customer.id
              }
            }
          ]
        } else {
          where.uploadedById = ctx.session.user.id
        }
      }

      const [documents, total] = await Promise.all([
        ctx.db.document.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            uploadedBy: {
              select: {
                name: true,
                email: true,
              }
            },
            shipment: {
              select: {
                trackingNumber: true,
                customer: {
                  include: {
                    user: {
                      select: {
                        name: true,
                        email: true,
                      }
                    }
                  }
                }
              }
            }
          }
        }),
        ctx.db.document.count({ where })
      ])

      return {
        documents,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      let where: any = { id: input.id }

      // Filter by user if customer
      if (ctx.session.user.role === UserRole.CUSTOMER) {
        const customer = await ctx.db.customer.findUnique({
          where: { userId: ctx.session.user.id }
        })
        
        if (customer) {
          where.OR = [
            { uploadedById: ctx.session.user.id },
            {
              shipment: {
                customerId: customer.id
              }
            }
          ]
        } else {
          where.uploadedById = ctx.session.user.id
        }
      }

      const document = await ctx.db.document.findFirst({
        where,
        include: {
          uploadedBy: {
            select: {
              name: true,
              email: true,
            }
          },
          shipment: {
            include: {
              customer: {
                include: {
                  user: {
                    select: {
                      name: true,
                      email: true,
                    }
                  }
                }
              }
            }
          }
        }
      })

      if (!document) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Document not found'
        })
      }

      return document
    }),

  update: protectedProcedure
    .input(updateDocumentSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input

      // Check if user has permission to update
      const existingDocument = await ctx.db.document.findUnique({
        where: { id },
        include: {
          shipment: {
            include: {
              customer: true
            }
          }
        }
      })

      if (!existingDocument) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Document not found'
        })
      }

      // Check permissions
      const canUpdate = 
        existingDocument.uploadedById === ctx.session.user.id ||
        ['ADMIN', 'STAFF'].includes(ctx.session.user.role) ||
        (ctx.session.user.role === UserRole.CUSTOMER && 
         existingDocument.shipment?.customer?.userId === ctx.session.user.id)

      if (!canUpdate) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Not authorized to update this document'
        })
      }

      const document = await ctx.db.document.update({
        where: { id },
        data: updateData,
        include: {
          uploadedBy: {
            select: {
              name: true,
              email: true,
            }
          },
          shipment: {
            select: {
              trackingNumber: true,
            }
          }
        }
      })

      return document
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Check if user has permission to delete
      const document = await ctx.db.document.findUnique({
        where: { id: input.id },
        include: {
          shipment: {
            include: {
              customer: true
            }
          }
        }
      })

      if (!document) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Document not found'
        })
      }

      // Check permissions
      const canDelete = 
        document.uploadedById === ctx.session.user.id ||
        ['ADMIN', 'STAFF'].includes(ctx.session.user.role)

      if (!canDelete) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Not authorized to delete this document'
        })
      }

      // Extract public ID for file deletion
      let publicId = ''
      if (document.url.includes('cloudinary.com')) {
        const urlParts = document.url.split('/')
        const filename = urlParts[urlParts.length - 1]
        publicId = filename.split('.')[0]
      } else {
        publicId = document.url.split('/').pop() || ''
      }

      // Delete file from storage
      try {
        await FileUploadService.deleteFile(publicId)
      } catch (error) {
        console.error('Failed to delete file from storage:', error)
        // Continue with database deletion even if file deletion fails
      }

      // Delete document record
      await ctx.db.document.delete({
        where: { id: input.id }
      })

      return { success: true }
    }),

  getStats: staffProcedure
    .query(async ({ ctx }) => {
      const [
        totalDocuments,
        documentsByType,
        recentDocuments
      ] = await Promise.all([
        ctx.db.document.count(),
        ctx.db.document.groupBy({
          by: ['type'],
          _count: {
            id: true
          }
        }),
        ctx.db.document.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            uploadedBy: {
              select: {
                name: true,
                email: true,
              }
            },
            shipment: {
              select: {
                trackingNumber: true,
              }
            }
          }
        })
      ])

      return {
        totalDocuments,
        documentsByType,
        recentDocuments
      }
    }),
})
