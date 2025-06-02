# DCF Logistics Platform - Production Setup Guide

## 🚀 **PRODUCTION DEPLOYMENT CHECKLIST**

This guide provides step-by-step instructions for deploying the DCF Logistics platform with complete email functionality to production.

---

## 📋 **PRE-DEPLOYMENT CHECKLIST**

### ✅ **1. Environment Configuration**
- [ ] Copy `.env.example` to `.env.local` (development) or `.env` (production)
- [ ] Configure all required environment variables
- [ ] Test email service configuration
- [ ] Verify database connection
- [ ] Set up domain and SSL certificates

### ✅ **2. Database Setup**
- [ ] Set up PostgreSQL database (recommended)
- [ ] Configure database connection string
- [ ] Run database migrations
- [ ] Set up database backups
- [ ] Configure database monitoring

### ✅ **3. Email Service Setup**
- [ ] Choose email provider (SendGrid recommended)
- [ ] Configure email authentication (SPF, DKIM, DMARC)
- [ ] Test email delivery
- [ ] Set up email monitoring
- [ ] Configure bounce and complaint handling

---

## 🗄️ **DATABASE SETUP**

### **Option 1: PostgreSQL (Recommended)**

1. **Install PostgreSQL**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   
   # macOS
   brew install postgresql
   
   # Windows
   # Download from https://www.postgresql.org/download/windows/
   ```

2. **Create Database and User**
   ```sql
   -- Connect to PostgreSQL as superuser
   sudo -u postgres psql
   
   -- Create database
   CREATE DATABASE dcf_logistics;
   
   -- Create user
   CREATE USER dcf_user WITH PASSWORD 'your_secure_password';
   
   -- Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE dcf_logistics TO dcf_user;
   
   -- Exit
   \q
   ```

3. **Configure Environment Variable**
   ```bash
   DATABASE_URL="postgresql://dcf_user:your_secure_password@localhost:5432/dcf_logistics"
   ```

4. **Run Database Migrations**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

### **Option 2: Cloud Database (Production)**

**Recommended Providers:**
- **Supabase** (PostgreSQL with built-in features)
- **PlanetScale** (MySQL with branching)
- **Railway** (PostgreSQL with easy deployment)
- **AWS RDS** (Enterprise-grade PostgreSQL)

---

## 📧 **EMAIL SERVICE SETUP**

### **Option 1: SendGrid (Recommended)**

1. **Create SendGrid Account**
   - Sign up at https://sendgrid.com
   - Verify your account and domain
   - Create an API key with full access

2. **Domain Authentication**
   ```bash
   # Add these DNS records to your domain:
   # CNAME: em1234.yourdomain.com -> u1234.wl.sendgrid.net
   # CNAME: s1._domainkey.yourdomain.com -> s1.domainkey.u1234.wl.sendgrid.net
   # CNAME: s2._domainkey.yourdomain.com -> s2.domainkey.u1234.wl.sendgrid.net
   ```

3. **Environment Configuration**
   ```bash
   SENDGRID_API_KEY="SG.your_api_key_here"
   SENDGRID_FROM_EMAIL="noreply@yourdomain.com"
   SENDGRID_FROM_NAME="DCF Logistics"
   ```

### **Option 2: SMTP Configuration**

1. **Gmail SMTP Setup**
   ```bash
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"  # Use App Password, not regular password
   SMTP_FROM="noreply@yourdomain.com"
   ```

2. **Other SMTP Providers**
   - **Mailgun**: smtp.mailgun.org:587
   - **Amazon SES**: email-smtp.region.amazonaws.com:587
   - **Outlook**: smtp-mail.outlook.com:587

---

## 🔧 **APPLICATION DEPLOYMENT**

### **Option 1: Vercel (Recommended for Next.js)**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel --prod
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all variables from `.env.example`
   - Redeploy after adding variables

### **Option 2: Docker Deployment**

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run**
   ```bash
   docker build -t dcf-logistics .
   docker run -p 3000:3000 --env-file .env dcf-logistics
   ```

### **Option 3: Traditional VPS/Server**

1. **Install Node.js and PM2**
   ```bash
   # Install Node.js 18+
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   npm install -g pm2
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/your-repo/dcf-logistics.git
   cd dcf-logistics
   
   # Install dependencies
   npm ci
   
   # Build application
   npm run build
   
   # Start with PM2
   pm2 start npm --name "dcf-logistics" -- start
   pm2 save
   pm2 startup
   ```

---

## 🔒 **SECURITY CONFIGURATION**

### **1. Environment Variables**
```bash
# Generate secure secrets
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
CSRF_SECRET="$(openssl rand -base64 32)"
ENCRYPTION_KEY="$(openssl rand -base64 32)"
```

### **2. HTTPS Setup**
- Use SSL certificates (Let's Encrypt recommended)
- Configure HTTPS redirects
- Set secure headers

### **3. Rate Limiting**
```bash
RATE_LIMIT_ENABLED="true"
RATE_LIMIT_WINDOW="60000"
RATE_LIMIT_MAX_REQUESTS="100"
```

---

## 📊 **MONITORING AND ANALYTICS**

### **1. Email Monitoring**
- Set up SendGrid event webhooks
- Monitor bounce and complaint rates
- Track email delivery metrics

### **2. Application Monitoring**
```bash
# Sentry for error tracking
SENTRY_DSN="your-sentry-dsn"

# Google Analytics
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
```

### **3. Database Monitoring**
- Set up connection pooling
- Monitor query performance
- Configure automated backups

---

## 🧪 **TESTING IN PRODUCTION**

### **1. Email Functionality Test**
```bash
# Test newsletter subscription
curl -X POST https://yourdomain.com/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'

# Test contact form
curl -X POST https://yourdomain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'
```

### **2. Database Connection Test**
```bash
# Check database connectivity
npx prisma db pull
```

### **3. Performance Test**
- Test page load speeds
- Verify email delivery times
- Check API response times

---

## 🔄 **MAINTENANCE AND UPDATES**

### **1. Regular Tasks**
- Monitor email queue processing
- Check database performance
- Review error logs
- Update dependencies

### **2. Backup Strategy**
- Daily database backups
- Weekly full system backups
- Test backup restoration

### **3. Update Process**
```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm ci

# Run migrations
npx prisma db push

# Build application
npm run build

# Restart application
pm2 restart dcf-logistics
```

---

## 🆘 **TROUBLESHOOTING**

### **Common Issues**

1. **Email Not Sending**
   - Check API keys and credentials
   - Verify domain authentication
   - Check rate limits and quotas

2. **Database Connection Errors**
   - Verify connection string
   - Check firewall settings
   - Ensure database is running

3. **Build Failures**
   - Check Node.js version (18+)
   - Clear node_modules and reinstall
   - Verify environment variables

### **Support Resources**
- Check application logs: `pm2 logs dcf-logistics`
- Monitor email delivery: SendGrid Dashboard
- Database monitoring: Your database provider's dashboard

---

## 📞 **PRODUCTION SUPPORT**

For production deployment assistance:
- Email: support@dcflogistics.com
- Documentation: Check README.md and API documentation
- Issues: Create GitHub issue with detailed error information

---

**🎉 Your DCF Logistics platform is now ready for production deployment!**
