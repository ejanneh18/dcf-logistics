import { z } from 'zod'
import { createTRPCRouter, publicProcedure, protectedProcedure, staffProcedure } from '../server'
import bcrypt from 'bcryptjs'
import { TRPCError } from '@trpc/server'
import { UserRole } from '@prisma/client'
import { EmailService } from '@/lib/email/service'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.nativeEnum(UserRole).optional().default(UserRole.CUSTOMER),
  companyName: z.string().optional(),
  phone: z.string().optional(),
})

const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  companyName: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
})

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, email, password, role, companyName, phone } = input

      // Check if user already exists
      const existingUser = await ctx.db.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User with this email already exists'
        })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Create user with customer profile if role is CUSTOMER
      const user = await ctx.db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
          phone,
          customer: role === UserRole.CUSTOMER ? {
            create: {
              companyName,
            }
          } : undefined
        },
        include: {
          customer: true
        }
      })

      // Send welcome email
      try {
        await EmailService.sendWelcomeEmail({
          name: user.name,
          email: user.email,
          loginUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/account/login`,
        })
      } catch (error) {
        console.error('Failed to send welcome email:', error)
        // Don't fail the registration if email fails
      }

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user

      return userWithoutPassword
    }),

  getProfile: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        include: {
          customer: true
        }
      })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found'
        })
      }

      const { password: _, ...userWithoutPassword } = user
      return userWithoutPassword
    }),

  updateProfile: protectedProcedure
    .input(updateProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const { companyName, address, city, country, postalCode, ...userFields } = input

      // Update user
      const user = await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: userFields,
        include: {
          customer: true
        }
      })

      // Update customer profile if user is a customer and customer data provided
      if (user.role === UserRole.CUSTOMER && user.customer) {
        const customerData = { companyName, address, city, country, postalCode }
        const hasCustomerData = Object.values(customerData).some(value => value !== undefined)

        if (hasCustomerData) {
          await ctx.db.customer.update({
            where: { userId: ctx.session.user.id },
            data: customerData
          })
        }
      }

      const { password: _, ...userWithoutPassword } = user
      return userWithoutPassword
    }),

  changePassword: protectedProcedure
    .input(z.object({
      currentPassword: z.string(),
      newPassword: z.string().min(8, 'Password must be at least 8 characters')
    }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id }
      })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found'
        })
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(
        input.currentPassword,
        user.password
      )

      if (!isCurrentPasswordValid) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Current password is incorrect'
        })
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(input.newPassword, 12)

      // Update password
      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { password: hashedNewPassword }
      })

      return { success: true }
    }),

  createUser: staffProcedure
    .input(z.object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      email: z.string().email('Invalid email address'),
      password: z.string().min(8, 'Password must be at least 8 characters'),
      role: z.nativeEnum(UserRole).default(UserRole.CUSTOMER),
    }))
    .mutation(async ({ ctx, input }) => {
      const { name, email, password, role } = input

      // Check if user already exists
      const existingUser = await ctx.db.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User with this email already exists'
        })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Create user
      const user = await ctx.db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
        }
      })

      // Send welcome email
      try {
        await EmailService.sendWelcomeEmail({
          name: user.name,
          email: user.email,
          loginUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/account/login`,
        })
      } catch (error) {
        console.error('Failed to send welcome email:', error)
        // Don't fail the creation if email fails
      }

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user

      return userWithoutPassword
    }),
})
