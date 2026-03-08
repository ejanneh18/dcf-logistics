# DCF Logistics - Deployment Guide

## � **CRITICAL: GoDaddy Hosting Issues Identified**

### **Current Problem Analysis**
The DCF Logistics website is experiencing deployment issues on GoDaddy shared hosting due to:

1. **Server-Side Dependencies**: The codebase contains API routes and server-side code incompatible with shared hosting
2. **Static Export Conflicts**: Remaining tRPC, Prisma, and NextAuth dependencies prevent proper static generation
3. **Hosting Limitations**: GoDaddy shared hosting only supports static files (HTML, CSS, JS) - no Node.js runtime

### **Immediate Solution: Migration to Vercel (Recommended)**

## 🚀 **Vercel Deployment (Primary Recommendation)**

Vercel is the optimal hosting platform for Next.js applications, offering:
- ✅ **Native Next.js Support**: Built by the Next.js team
- ✅ **Automatic Deployments**: Git-based CI/CD
- ✅ **Edge Functions**: Server-side functionality support
- ✅ **Global CDN**: Fast worldwide performance
- ✅ **Free Tier**: Generous limits for small to medium projects
- ✅ **Custom Domains**: Easy domain configuration
- ✅ **Environment Variables**: Secure configuration management

### **Quick Vercel Deployment Steps**

#### 1. Prepare Repository
```bash
# Ensure your code is pushed to GitHub
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

#### 2. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

#### 3. Configure Environment Variables
In Vercel Dashboard → Project Settings → Environment Variables:

```bash
# Core Application
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
NEXTAUTH_SECRET=your-super-secure-secret-key-here

# Database (use external service)
DATABASE_URL=postgresql://username:password@host:5432/dcf_logistics

# Email Configuration
SMTP_HOST=smtp.youremailprovider.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your-email-password
SMTP_FROM=noreply@yourdomain.com

# Contact Information
CONTACT_EMAIL=info@yourdomain.com
SALES_EMAIL=sales@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com

# App Configuration
APP_URL=https://your-vercel-domain.vercel.app

# Stripe (for payments)
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 2. Database Setup

#### Convert Schema to PostgreSQL
Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### Deploy Database
```bash
# Generate Prisma client
npx prisma generate

# Deploy database schema
npx prisma db push

# Seed with production data
npx prisma db seed
```

### 3. Build and Deploy

#### Build Application
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

#### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Deploy to Other Platforms
- **Netlify**: Connect GitHub repo and set build command to `npm run build`
- **Railway**: Connect repo and set environment variables
- **DigitalOcean**: Use App Platform with Node.js buildpack

### 4. Post-Deployment Setup

#### Admin Account Creation
1. Access `/admin` route
2. Use seeded admin credentials:
   - Email: `admin@dcflogistics.com`
   - Password: `admin123`
3. Change default password immediately

#### Email Configuration Test
1. Go to Admin → Newsletter
2. Send test email to verify SMTP setup
3. Test contact form submissions

#### Payment Setup
1. Configure Stripe webhooks
2. Test payment flows
3. Set up invoice automation

### 5. Monitoring and Maintenance

#### Health Checks
- Monitor `/api/health` endpoint
- Set up uptime monitoring
- Configure error tracking (Sentry recommended)

#### Database Maintenance
- Regular backups
- Monitor query performance
- Update indexes as needed

#### Security
- Enable HTTPS
- Configure security headers
- Regular dependency updates
- Monitor for vulnerabilities

### 6. Scaling Considerations

#### Performance Optimization
- Enable Redis for caching
- Configure CDN for static assets
- Implement database connection pooling
- Add search indexing (Elasticsearch)

#### High Availability
- Load balancer setup
- Database replication
- Backup strategies
- Disaster recovery plan

## 🔧 Troubleshooting

### Common Issues

#### Build Failures
- Check Node.js version compatibility
- Verify all environment variables
- Clear `.next` cache and rebuild

#### Database Connection Issues
- Verify DATABASE_URL format
- Check firewall settings
- Ensure database server is running

#### Email Not Working
- Verify SMTP credentials
- Check spam folders
- Test with different email providers

### Support
For deployment assistance, contact the development team or refer to the comprehensive documentation in the `/docs` folder.
