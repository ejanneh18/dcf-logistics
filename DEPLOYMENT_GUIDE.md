# DCF Logistics - Deployment Guide

## 🚀 Production Deployment Tutorial

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (for production)
- Domain name and hosting provider
- Email service (SMTP or service like SendGrid)
- Stripe account (for payments)
- Cloudinary account (for file uploads)

### 1. Environment Setup

#### Production Environment Variables
Create a `.env.production` file:

```bash
# Database (PostgreSQL for production)
DATABASE_URL="postgresql://username:password@host:5432/dcf_logistics"

# NextAuth.js
NEXTAUTH_SECRET="your-super-secure-secret-key-here"
NEXTAUTH_URL="https://yourdomain.com"

# Email Configuration (Production SMTP)
SMTP_HOST="smtp.youremailprovider.com"
SMTP_PORT="587"
SMTP_USER="noreply@yourdomain.com"
SMTP_PASS="your-email-password"
SMTP_FROM="noreply@yourdomain.com"

# Contact and Admin Emails
CONTACT_EMAIL="info@yourdomain.com"
SALES_EMAIL="sales@yourdomain.com"
ADMIN_EMAIL="admin@yourdomain.com"

# App Configuration
APP_URL="https://yourdomain.com"

# Production flags
EMAIL_QUEUE_ENABLED="true"
RATE_LIMIT_ENABLED="true"

# Stripe (for payments)
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# AI Chat (optional)
GEMINI_API_KEY="your-gemini-api-key"
OPENAI_API_KEY="your-openai-api-key"
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
