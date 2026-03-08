# GoDaddy Deployment Guide for DCF Logistics

This guide provides comprehensive instructions for deploying the DCF Logistics Next.js application to GoDaddy shared hosting.

## 📋 Prerequisites

### GoDaddy Account Requirements
- GoDaddy shared hosting plan (Economy, Deluxe, or Ultimate)
- cPanel access
- FTP credentials
- MySQL database (if using external database)

### Local Development Setup
- Node.js 18+ installed
- Git repository access
- Environment variables configured

## 🚀 Quick Start Deployment

### 1. Clone and Setup
```bash
git clone <your-repository-url>
cd dcf-logistics
npm install
```

### 2. Configure Environment
```bash
# Copy the example config
cp deployment/godaddy/config.example.json deployment/godaddy/config.json

# Edit with your GoDaddy details
nano deployment/godaddy/config.json
```

### 3. Deploy
```bash
npm run deploy:godaddy
```

## 🔧 Detailed Configuration

### Database Setup

#### Option 1: GoDaddy MySQL Database
1. **Create Database in cPanel:**
   - Login to cPanel
   - Go to "MySQL Databases"
   - Create new database: `dcf_logistics`
   - Create database user with full privileges
   - Note down credentials

2. **Update DATABASE_URL:**
   ```
   mysql://username:password@localhost:3306/dcf_logistics
   ```

#### Option 2: External Database (Recommended)
- **PlanetScale:** Free tier with 1GB storage
- **Railway:** PostgreSQL with generous free tier
- **Supabase:** PostgreSQL with real-time features

### Environment Variables Configuration

Create `.env.production` file:
```env
# Core Application
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-super-secret-key-here

# Database
DATABASE_URL=mysql://user:pass@host:3306/database

# Email Service
EMAIL_FROM=noreply@yourdomain.com
SENDGRID_API_KEY=SG.your-sendgrid-api-key

# Payment Processing
STRIPE_PUBLIC_KEY=pk_live_your_stripe_public_key
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key

# File Storage
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### FTP Configuration

Update `deployment/godaddy/config.json`:
```json
{
  "ftp": {
    "host": "ftp.yourdomain.com",
    "user": "your-ftp-username",
    "password": "your-ftp-password",
    "port": 21,
    "secure": false
  },
  "remoteDir": "/public_html",
  "siteUrl": "https://yourdomain.com"
}
```

## 📁 File Structure After Deployment

```
public_html/
├── .htaccess              # URL rewriting and security
├── index.html             # Main application entry
├── robots.txt             # SEO configuration
├── sitemap.xml           # Search engine sitemap
├── _next/                # Next.js static assets
│   ├── static/           # Optimized assets
│   └── chunks/           # JavaScript bundles
├── images/               # Static images
├── icons/                # Favicon and app icons
└── api/                  # API routes (if using hybrid mode)
```

## 🔒 Security Configuration

### SSL Certificate Setup
1. **Enable SSL in cPanel:**
   - Go to "SSL/TLS"
   - Enable "Force HTTPS Redirect"
   - Install Let's Encrypt certificate (free)

2. **Update .htaccess:**
   ```apache
   # Force HTTPS
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

### Security Headers
The deployment automatically adds security headers:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin

## 🎯 Performance Optimization

### Automatic Optimizations
- **Image Compression:** Automatic optimization of all images
- **CSS Minification:** Reduced CSS file sizes
- **JavaScript Bundling:** Optimized chunk splitting
- **Gzip Compression:** Server-level compression
- **Browser Caching:** Long-term caching for static assets

### Manual Optimizations
1. **Enable cPanel Optimizations:**
   - Go to "Optimize Website"
   - Enable "Compress All Content"

2. **Configure Cloudflare (Optional):**
   - Add domain to Cloudflare
   - Enable CDN and caching
   - Configure security rules

## 🔄 Automated Deployment with GitHub Actions

### Setup GitHub Secrets
Add these secrets to your GitHub repository:

```
FTP_HOST=ftp.yourdomain.com
FTP_USER=your-ftp-username
FTP_PASSWORD=your-ftp-password
FTP_REMOTE_DIR=/public_html
SITE_URL=https://yourdomain.com
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=your-database-url
SENDGRID_API_KEY=your-sendgrid-key
STRIPE_PUBLIC_KEY=your-stripe-public-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

### Deployment Workflow
The GitHub Action automatically:
1. Builds the application
2. Runs tests
3. Creates backup of current deployment
4. Uploads new files via FTP
5. Tests the deployment
6. Sends notifications

## 🛠 Manual Deployment Steps

### 1. Build for Production
```bash
# Install dependencies
npm ci

# Generate Prisma client
npx prisma generate

# Build application
npm run build:godaddy
```

### 2. Upload Files
```bash
# Using built-in FTP script
npm run deploy:ftp

# Or manually via FTP client
# Upload contents of 'out' folder to public_html
```

### 3. Database Migration
```bash
# Run database migrations
npx prisma migrate deploy

# Seed initial data (optional)
npx prisma db seed
```

## 🔍 Troubleshooting

### Common Issues

#### 1. 500 Internal Server Error
- **Cause:** Missing .htaccess or incorrect permissions
- **Solution:** Ensure .htaccess is uploaded and files have correct permissions (644 for files, 755 for directories)

#### 2. Database Connection Failed
- **Cause:** Incorrect DATABASE_URL or database not accessible
- **Solution:** Verify database credentials and whitelist GoDaddy IP addresses

#### 3. Static Assets Not Loading
- **Cause:** Incorrect asset paths or missing files
- **Solution:** Verify all files in `_next/static/` are uploaded correctly

#### 4. API Routes Not Working
- **Cause:** GoDaddy shared hosting doesn't support Node.js server
- **Solution:** Use static export mode or upgrade to VPS hosting

### Debug Commands
```bash
# Test FTP connection
node deployment/godaddy/scripts/test-ftp.js

# Validate build output
node deployment/godaddy/scripts/validate-build.js

# Check deployment status
curl -I https://yourdomain.com
```

## 📊 Monitoring and Maintenance

### Health Checks
- **Uptime Monitoring:** Use UptimeRobot or similar service
- **Performance Monitoring:** Google PageSpeed Insights
- **Error Tracking:** Sentry or LogRocket integration

### Backup Strategy
- **Automated Backups:** Daily FTP backups via cron job
- **Database Backups:** Regular MySQL dumps
- **Version Control:** Git tags for each deployment

### Updates and Maintenance
```bash
# Update dependencies
npm update

# Security audit
npm audit

# Deploy updates
npm run deploy:godaddy
```

## 🆘 Support and Resources

### GoDaddy Resources
- [cPanel Documentation](https://www.godaddy.com/help/cpanel)
- [FTP Setup Guide](https://www.godaddy.com/help/set-up-ftp-access)
- [SSL Certificate Installation](https://www.godaddy.com/help/install-ssl-certificate)

### Next.js Resources
- [Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Deployment Best Practices](https://nextjs.org/docs/app/building-your-application/deploying)

### Emergency Contacts
- **Technical Support:** support@dcflogistics.com
- **Emergency Hotline:** +220-XXX-XXXX
- **GitHub Issues:** [Repository Issues](https://github.com/your-repo/issues)

---

## 📝 Deployment Checklist

- [ ] Environment variables configured
- [ ] Database setup and migrated
- [ ] FTP credentials tested
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] Backup strategy implemented
- [ ] Monitoring tools configured
- [ ] Performance optimizations enabled
- [ ] Security headers configured
- [ ] Error tracking setup
