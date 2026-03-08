# DCF Logistics Deployment Guide

This comprehensive guide covers both deployment strategies for the DCF Logistics Next.js application.

## 🚀 Deployment Options

### 1. GoDaddy Shared Hosting (Primary)
- **Best for:** Production websites with custom domains
- **Features:** Automated CI/CD, FTP deployment, SSL support
- **Requirements:** GoDaddy hosting account, FTP access

### 2. Portable Installation Package (Secondary)
- **Best for:** Self-hosted environments, development setups
- **Features:** Web-based installer, self-contained package
- **Requirements:** Node.js 18+, web server capability

---

## 📦 Quick Start Commands

```bash
# GoDaddy Deployment
npm run build:godaddy          # Build for GoDaddy hosting
npm run deploy:godaddy         # Deploy to GoDaddy
npm run deploy:test           # Test deployment
npm run deploy:rollback       # Rollback if needed

# Portable Package
npm run build:portable        # Create portable package
# Extract and run install.bat/install.sh
```

---

## 🏗️ GoDaddy Deployment

### Prerequisites
1. **GoDaddy Hosting Account**
   - Shared hosting plan (Economy, Deluxe, or Ultimate)
   - cPanel access
   - FTP credentials

2. **Domain Configuration**
   - Domain pointed to GoDaddy hosting
   - SSL certificate installed
   - DNS properly configured

### Step 1: Configuration Setup

1. **Create deployment config:**
   ```bash
   cp deployment/godaddy/config.example.json deployment/godaddy/config.json
   ```

2. **Edit configuration:**
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

3. **Set environment variables:**
   ```bash
   # Create .env.production
   NEXTAUTH_URL=https://yourdomain.com
   NEXTAUTH_SECRET=your-secret-key
   DATABASE_URL=mysql://user:pass@host:3306/database
   EMAIL_FROM=noreply@yourdomain.com
   SENDGRID_API_KEY=your-sendgrid-key
   ```

### Step 2: Database Setup

#### Option A: GoDaddy MySQL
1. Login to cPanel
2. Go to "MySQL Databases"
3. Create database: `dcf_logistics`
4. Create user with full privileges
5. Update DATABASE_URL in config

#### Option B: External Database (Recommended)
- **PlanetScale:** `mysql://user:pass@host.planetscale.com:3306/database?sslaccept=strict`
- **Railway:** `postgresql://user:pass@host.railway.app:5432/database`
- **Supabase:** `postgresql://user:pass@host.supabase.co:5432/database`

### Step 3: Automated Deployment

```bash
# Build and deploy in one command
npm run deploy:godaddy

# Or step by step
npm run build:godaddy
npm run deploy:test
```

### Step 4: GitHub Actions (Optional)

1. **Add repository secrets:**
   ```
   FTP_HOST=ftp.yourdomain.com
   FTP_USER=your-username
   FTP_PASSWORD=your-password
   FTP_REMOTE_DIR=/public_html
   SITE_URL=https://yourdomain.com
   NEXTAUTH_SECRET=your-secret
   DATABASE_URL=your-database-url
   ```

2. **Push to main branch** - deployment runs automatically

---

## 📱 Portable Installation Package

### Creating the Package

```bash
# Build portable package
npm run build:portable

# This creates: dcf-logistics-portable-v1.0.0.zip
```

### Package Contents
```
dcf-logistics-portable-v1.0.0.zip
├── app/                    # Next.js application
│   ├── .next/             # Built application
│   ├── public/            # Static assets
│   ├── package.json       # Dependencies
│   └── ...
├── installer/             # Web-based installer
│   ├── index.html         # Installation wizard
│   └── installer.js       # Installation logic
├── install.js             # Installation script
├── install.bat            # Windows installer
├── install.sh             # Unix installer
└── README.md              # Installation instructions
```

### Installation Process

1. **Extract package:**
   ```bash
   unzip dcf-logistics-portable-v1.0.0.zip
   cd dcf-logistics-portable
   ```

2. **Run installer:**
   ```bash
   # Windows
   install.bat
   
   # Linux/Mac
   ./install.sh
   
   # Manual
   node install.js
   ```

3. **Open browser:**
   - Go to `http://localhost:3000/installer`
   - Follow the step-by-step wizard

### Installation Wizard Steps

1. **Welcome Screen**
   - System requirements check
   - Feature overview

2. **Database Configuration**
   - SQLite (recommended for small deployments)
   - MySQL/PostgreSQL for larger setups

3. **Site Configuration**
   - Site URL and company name
   - Admin email address

4. **Admin User Creation**
   - Full name and email
   - Secure password setup

5. **Email Configuration (Optional)**
   - SendGrid API integration
   - SMTP server setup

6. **Installation Progress**
   - Automated setup process
   - Real-time progress updates

7. **Completion**
   - Success confirmation
   - Access to admin dashboard

---

## 🔧 Advanced Configuration

### Custom Domain Setup
```bash
# Update site URL in all configs
NEXTAUTH_URL=https://your-custom-domain.com
```

### SSL Certificate
```apache
# .htaccess for HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### Performance Optimization
```bash
# Enable all optimizations
npm run optimize:godaddy

# Individual optimizations
npm run compress:images
npm run minify:css
```

### Database Migration
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed initial data
npx prisma db seed
```

---

## 🔍 Troubleshooting

### Common Issues

#### 1. FTP Connection Failed
```bash
# Test FTP connection
node deployment/godaddy/scripts/test-ftp.js
```

#### 2. Database Connection Error
- Verify DATABASE_URL format
- Check database server accessibility
- Ensure user has proper permissions

#### 3. Build Failures
```bash
# Clean and rebuild
npm run clean
npm install
npm run build:godaddy
```

#### 4. SSL Certificate Issues
- Verify domain DNS settings
- Check SSL certificate installation
- Force HTTPS in .htaccess

### Debug Commands
```bash
# Test deployment
npm run deploy:test

# Check build output
ls -la out/

# Validate configuration
node -e "console.log(require('./deployment/godaddy/config.json'))"
```

---

## 📊 Monitoring and Maintenance

### Health Checks
- **Uptime Monitoring:** UptimeRobot, Pingdom
- **Performance:** Google PageSpeed Insights
- **Error Tracking:** Sentry integration

### Backup Strategy
```bash
# Create backup
npm run backup:db

# Restore from backup
npm run restore:db
```

### Updates
```bash
# Update dependencies
npm update

# Security audit
npm audit

# Deploy updates
npm run deploy:godaddy
```

---

## 🆘 Support

### Documentation
- [GoDaddy Deployment Guide](./godaddy/README.md)
- [Portable Package Guide](./portable/README.md)
- [GitHub Actions Workflow](./.github/workflows/deploy-godaddy.yml)

### Emergency Procedures
```bash
# Immediate rollback
npm run deploy:rollback

# Emergency contact
# Email: support@dcflogistics.com
# Phone: +220-XXX-XXXX
```

### Getting Help
- **GitHub Issues:** [Repository Issues](https://github.com/your-repo/issues)
- **Documentation:** [Wiki](https://github.com/your-repo/wiki)
- **Community:** [Discussions](https://github.com/your-repo/discussions)

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Database setup and tested
- [ ] FTP credentials verified
- [ ] SSL certificate installed
- [ ] Domain DNS configured

### Post-Deployment
- [ ] Site accessibility verified
- [ ] Admin dashboard functional
- [ ] Email notifications working
- [ ] Performance optimized
- [ ] Monitoring configured
- [ ] Backup strategy implemented

### Security
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Database secured
- [ ] Admin credentials strong
- [ ] Error tracking enabled
