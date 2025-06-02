# DCF Logistics - cPanel Shared Hosting Deployment Guide

This comprehensive guide will walk you through deploying the DCF Logistics Next.js application on shared hosting with cPanel.

## 📋 Prerequisites

### Hosting Requirements
- **Shared hosting with cPanel** (GoDaddy, Bluehost, HostGator, etc.)
- **Node.js support** (version 18+ required)
- **MySQL database** access
- **File Manager** or FTP access
- **Custom domain** or subdomain

### Local Requirements
- Node.js 18+ installed locally
- Git repository access
- Terminal/Command prompt access

---

## 🚀 Step 1: Prepare Your Application for Static Export

Since most shared hosting doesn't support Node.js server-side rendering, we'll create a static export.

### 1.1 Create Static Export Configuration

Create a new Next.js config for static export:

```bash
# Create the static export config
cp next.config.mjs next.config.static.mjs
```

Edit `next.config.static.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  
  // Disable server-side features
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './lib/image-loader.js'
  },
  
  // Optimize for production
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Environment variables for static export
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
}

export default nextConfig
```

### 1.2 Update Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "build:static": "next build && next export",
    "build:cpanel": "cp next.config.static.mjs next.config.mjs && npm run build:static",
    "deploy:prepare": "npm run build:cpanel && npm run optimize:static"
  }
}
```

---

## 🗄️ Step 2: Database Setup in cPanel

### 2.1 Create MySQL Database

1. **Login to cPanel**
2. **Navigate to "MySQL Databases"**
3. **Create a new database:**
   - Database Name: `dcf_logistics` (or your preferred name)
   - Click "Create Database"

4. **Create a database user:**
   - Username: `dcf_user` (or your preferred username)
   - Password: Generate a strong password
   - Click "Create User"

5. **Add user to database:**
   - Select the user and database
   - Grant "ALL PRIVILEGES"
   - Click "Make Changes"

6. **Note down your database credentials:**
   ```
   Database Host: localhost (usually)
   Database Name: yourusername_dcf_logistics
   Database User: yourusername_dcf_user
   Database Password: [your generated password]
   ```

### 2.2 Configure Database Connection

Create `.env.production` file:

```env
# Database Configuration
DATABASE_URL="mysql://yourusername_dcf_user:your_password@localhost:3306/yourusername_dcf_logistics"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-key-32-characters-long"
NEXTAUTH_URL="https://yourdomain.com"

# Email Configuration (Choose one option)
# Option 1: SendGrid (Recommended)
SENDGRID_API_KEY="SG.your-sendgrid-api-key"
SENDGRID_FROM_EMAIL="noreply@yourdomain.com"
SENDGRID_FROM_NAME="DCF Logistics"

# Option 2: SMTP (Alternative)
SMTP_HOST="mail.yourdomain.com"
SMTP_PORT="587"
SMTP_USER="noreply@yourdomain.com"
SMTP_PASS="your-email-password"
SMTP_FROM="noreply@yourdomain.com"

# Contact Information
CONTACT_EMAIL="info@yourdomain.com"
SALES_EMAIL="sales@yourdomain.com"
ADMIN_EMAIL="admin@yourdomain.com"

# App Configuration
APP_URL="https://yourdomain.com"

# File Upload (Cloudinary - Optional)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Payment Processing (Stripe - Optional)
STRIPE_SECRET_KEY="sk_live_your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="pk_live_your-stripe-public-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"
```

---

## 🔧 Step 3: Build Your Application

### 3.1 Install Dependencies and Build

```bash
# Install all dependencies
npm install

# Generate Prisma client
npx prisma generate

# Build for static export
npm run build:cpanel
```

This will create an `out` folder with your static files.

### 3.2 Verify Build Output

Check that the `out` folder contains:
```
out/
├── index.html
├── _next/
│   ├── static/
│   └── ...
├── admin/
├── contact/
├── services/
└── ...
```

---

## 📤 Step 4: Upload Files to cPanel

### 4.1 Using cPanel File Manager

1. **Login to cPanel**
2. **Open "File Manager"**
3. **Navigate to `public_html`** (or your domain's document root)
4. **Delete default files** (index.html, etc.)
5. **Upload your files:**
   - Select all files from the `out` folder
   - Upload them to `public_html`
   - Extract if uploaded as ZIP

### 4.2 Using FTP (Alternative)

```bash
# Using FileZilla or similar FTP client
Host: ftp.yourdomain.com
Username: your-cpanel-username
Password: your-cpanel-password
Port: 21

# Upload all files from 'out' folder to public_html
```

### 4.3 File Structure After Upload

Your `public_html` should look like:
```
public_html/
├── index.html
├── _next/
├── admin/
├── contact/
├── services/
├── .htaccess (we'll create this next)
└── ...
```

---

## ⚙️ Step 5: Configure .htaccess

Create `.htaccess` file in `public_html`:

```apache
# DCF Logistics - cPanel Configuration

# Enable Rewrite Engine
RewriteEngine On

# Force HTTPS (if SSL is available)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle Next.js routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/api/
RewriteRule ^(.*)$ /index.html [L]

# Security Headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set Referrer-Policy "origin-when-cross-origin"
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Prevent access to sensitive files
<Files ".env*">
    Order allow,deny
    Deny from all
</Files>

<Files "*.config.*">
    Order allow,deny
    Deny from all
</Files>
```

---

## 🗃️ Step 6: Database Migration

### 6.1 Using phpMyAdmin

1. **Access phpMyAdmin** from cPanel
2. **Select your database**
3. **Import SQL file:**
   - Generate schema: `npx prisma db push --preview-feature`
   - Or manually create tables using Prisma schema

### 6.2 Alternative: Remote Database Setup

If your hosting supports Node.js, you can run migrations remotely:

```bash
# Set DATABASE_URL environment variable
export DATABASE_URL="mysql://user:pass@host:3306/database"

# Run migrations
npx prisma migrate deploy

# Seed initial data
npx prisma db seed
```

---

## 🔐 Step 7: SSL Certificate Setup

### 7.1 Enable SSL in cPanel

1. **Navigate to "SSL/TLS"**
2. **Choose "Let's Encrypt" (free)** or upload your certificate
3. **Enable "Force HTTPS Redirect"**
4. **Verify SSL is working:** Visit `https://yourdomain.com`

### 7.2 Update Environment Variables

Update your `.env.production`:
```env
NEXTAUTH_URL="https://yourdomain.com"
APP_URL="https://yourdomain.com"
```

---

## 📧 Step 8: Email Configuration

### 8.1 Using cPanel Email

1. **Create email account** in cPanel
2. **Configure SMTP settings:**
   ```env
   SMTP_HOST="mail.yourdomain.com"
   SMTP_PORT="587"
   SMTP_USER="noreply@yourdomain.com"
   SMTP_PASS="your-email-password"
   ```

### 8.2 Using SendGrid (Recommended)

1. **Sign up for SendGrid**
2. **Create API key**
3. **Configure in environment:**
   ```env
   SENDGRID_API_KEY="SG.your-api-key"
   SENDGRID_FROM_EMAIL="noreply@yourdomain.com"
   ```

---

## ✅ Step 9: Testing and Verification

### 9.1 Basic Functionality Test

1. **Visit your website:** `https://yourdomain.com`
2. **Check homepage loads correctly**
3. **Test navigation between pages**
4. **Verify contact form works**
5. **Test admin login:** `https://yourdomain.com/admin`

### 9.2 Performance Test

1. **Google PageSpeed Insights:** Test your site speed
2. **GTmetrix:** Analyze performance metrics
3. **Check mobile responsiveness**

### 9.3 Security Test

1. **SSL Labs Test:** Verify SSL configuration
2. **Security Headers:** Check security headers are present
3. **Test HTTPS redirect**

---

## 🔧 Step 10: Ongoing Maintenance

### 10.1 Updates and Deployments

```bash
# For future updates:
1. Make changes locally
2. Run: npm run build:cpanel
3. Upload new files from 'out' folder
4. Clear any caches
```

### 10.2 Backup Strategy

1. **Database backups:** Use cPanel backup tools
2. **File backups:** Download website files regularly
3. **Automated backups:** Set up cPanel automated backups

### 10.3 Monitoring

1. **Uptime monitoring:** Use UptimeRobot or similar
2. **Error tracking:** Monitor error logs in cPanel
3. **Performance monitoring:** Regular speed tests

---

## 🆘 Troubleshooting

### Common Issues

#### 1. 404 Errors on Page Refresh
**Solution:** Ensure `.htaccess` is properly configured with rewrite rules.

#### 2. Images Not Loading
**Solution:** Check image paths and ensure `unoptimized: true` in Next.js config.

#### 3. CSS/JS Not Loading
**Solution:** Verify all files uploaded correctly and check browser console for errors.

#### 4. Database Connection Failed
**Solution:** Double-check database credentials and ensure user has proper permissions.

#### 5. Email Not Sending
**Solution:** Verify SMTP settings or SendGrid configuration.

### Debug Commands

```bash
# Check build output
ls -la out/

# Verify environment variables
cat .env.production

# Test database connection
npx prisma db push --preview-feature
```

---

## 📞 Support Resources

- **cPanel Documentation:** Your hosting provider's help center
- **Next.js Static Export:** [Next.js Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- **Prisma with MySQL:** [Prisma Documentation](https://www.prisma.io/docs/concepts/database-connectors/mysql)

---

## ✅ Deployment Checklist

- [ ] Database created and configured
- [ ] Environment variables set
- [ ] Application built for static export
- [ ] Files uploaded to public_html
- [ ] .htaccess configured
- [ ] SSL certificate installed
- [ ] Email configuration tested
- [ ] Admin access verified
- [ ] Contact form tested
- [ ] Performance optimized
- [ ] Backup strategy implemented

**Congratulations! Your DCF Logistics application is now live on shared hosting!** 🎉
