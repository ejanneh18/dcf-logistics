# DCF Logistics - Vercel Deployment Guide

## 🚀 Quick Vercel Deployment

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Database provider (PlanetScale, Supabase, or Railway recommended)

### 1. Database Setup (Choose One)

#### Option A: PlanetScale (Recommended)
```bash
# 1. Sign up at planetscale.com
# 2. Create database: dcf-logistics
# 3. Get connection string
DATABASE_URL="mysql://username:password@host.planetscale.com:3306/dcf-logistics?sslaccept=strict"
```

#### Option B: Supabase
```bash
# 1. Sign up at supabase.com
# 2. Create new project
# 3. Get PostgreSQL connection string
DATABASE_URL="postgresql://username:password@host.supabase.co:5432/postgres"
```

#### Option C: Railway
```bash
# 1. Sign up at railway.app
# 2. Create PostgreSQL database
# 3. Get connection string
DATABASE_URL="postgresql://username:password@host.railway.app:5432/railway"
```

### 2. Deploy to Vercel

#### Method 1: GitHub Integration (Recommended)
1. **Push to GitHub** (this repository)
2. **Visit vercel.com** and sign in
3. **Import Git Repository**
4. **Select this repository**
5. **Configure environment variables** (see below)
6. **Deploy**

#### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 3. Environment Variables

Add these in Vercel Dashboard → Project → Settings → Environment Variables:

#### Required Variables
```env
NEXTAUTH_URL=https://your-vercel-app.vercel.app
NEXTAUTH_SECRET=your-super-secret-key-32-characters-long
DATABASE_URL=your-database-connection-string
```

#### Email Configuration (Choose One)
```env
# Option 1: SendGrid
SENDGRID_API_KEY=SG.your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_FROM_NAME=DCF Logistics

# Option 2: SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com
```

#### Contact Information
```env
CONTACT_EMAIL=info@yourdomain.com
SALES_EMAIL=sales@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
APP_URL=https://your-vercel-app.vercel.app
```

#### Optional Services
```env
# Stripe (Payment Processing)
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-public-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Cloudinary (File Upload)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Twilio (SMS)
TWILIO_ACCOUNT_SID=AC_your_account_sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

### 4. Database Migration

After deployment, run database migrations:

```bash
# Using Vercel CLI
vercel env pull .env.local
npx prisma generate
npx prisma db push

# Or using the deployed app
# Visit: https://your-app.vercel.app/api/admin/migrate
```

### 5. Custom Domain (Optional)

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Go to Settings → Domains**
4. **Add your custom domain**
5. **Update DNS records** as instructed
6. **Update environment variables:**
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   APP_URL=https://yourdomain.com
   ```

### 6. Verification Checklist

After deployment, verify:

- [ ] **Homepage loads:** `https://your-app.vercel.app`
- [ ] **Admin dashboard:** `https://your-app.vercel.app/admin`
- [ ] **Contact form works**
- [ ] **Database connection successful**
- [ ] **Email notifications working**
- [ ] **All pages load correctly**

## 🔧 Advanced Configuration

### Automatic Deployments

Vercel automatically deploys when you push to the main branch. To deploy from the `dcf_logistics` branch:

1. **Go to Vercel Dashboard**
2. **Settings → Git**
3. **Change Production Branch** to `dcf_logistics`

### Environment-Specific Deployments

```bash
# Preview deployments (for testing)
vercel

# Production deployment
vercel --prod
```

### Performance Optimization

The `vercel.json` file includes:
- **Function timeouts:** 10 seconds for Hobby plan, 30 seconds for Pro
- **Security headers:** XSS protection, frame options
- **Redirects:** Admin shortcuts
- **Cron jobs:** Daily tasks (Hobby plan compatible)

### Cron Jobs and Plan Limitations

#### Hobby Plan (Free)
- **Limitation:** Only daily cron jobs allowed
- **Configuration:** `vercel.json` (current) - runs daily tasks at 2 AM UTC
- **Features:** Combined email processing, cleanup, and statistics

#### Pro Plan ($20/month)
- **Features:** Unlimited cron job frequency
- **Configuration:** Use `vercel.pro.json` for advanced scheduling
- **Includes:** Every 5-minute email queue, hourly backups, weekly reports

#### Switching to Pro Plan Features
```bash
# To use Pro plan features, replace vercel.json:
cp vercel.pro.json vercel.json
git add vercel.json
git commit -m "Enable Pro plan cron jobs"
git push
```

### Monitoring and Analytics

1. **Enable Vercel Analytics** in dashboard
2. **Set up error tracking** with Sentry
3. **Monitor performance** with Vercel Speed Insights

## 🆘 Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check build logs in Vercel dashboard
# Common fixes:
- Ensure all dependencies are in package.json
- Check TypeScript errors
- Verify environment variables
```

#### 2. Database Connection Issues
```bash
# Verify DATABASE_URL format
# For PlanetScale: Add ?sslaccept=strict
# For Supabase: Use connection pooling URL
```

#### 3. API Routes Not Working
```bash
# Check function logs in Vercel dashboard
# Verify environment variables are set
# Check API route file structure
```

#### 4. Authentication Issues
```bash
# Verify NEXTAUTH_URL matches your domain
# Check NEXTAUTH_SECRET is set
# Ensure callback URLs are configured
```

### Debug Commands
```bash
# Pull environment variables locally
vercel env pull .env.local

# Check deployment logs
vercel logs

# Test functions locally
vercel dev
```

## 📊 Vercel Features Used

- **Next.js 15 App Router:** Full support
- **API Routes:** tRPC endpoints
- **Edge Functions:** Fast global performance
- **Automatic HTTPS:** SSL certificates
- **Custom Domains:** Professional URLs
- **Environment Variables:** Secure configuration
- **Git Integration:** Automatic deployments
- **Preview Deployments:** Test before production

## 🔗 Useful Links

- **Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js on Vercel:** [vercel.com/docs/frameworks/nextjs](https://vercel.com/docs/frameworks/nextjs)
- **Environment Variables:** [vercel.com/docs/concepts/projects/environment-variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ Deployment Summary

**Total Time:** 15-30 minutes
**Cost:** Free tier available
**Features:** Full Next.js support, automatic deployments, global CDN
**Scalability:** Automatic scaling based on traffic

**Your DCF Logistics application will be live at:**
`https://your-project-name.vercel.app`
