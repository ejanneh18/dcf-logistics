# DCF Logistics - Deployment Quick Reference

## 🚀 **QUICK START COMMANDS**

### **Check Status**
```bash
npm run status                    # View deployment dashboard
```

### **Vercel Deployment (Recommended)**
```bash
npm run setup:vercel             # Automated Vercel setup
npm run deploy:vercel            # Deploy to production
npm run deploy:vercel-preview    # Deploy preview
```

### **Static Hosting Deployment**
```bash
npm run build:static             # Build static version
npm run package:static           # Create deployment package
npm run package:godaddy          # Same as above
```

### **Database Setup**
```bash
npm run db:providers             # View database options
npm run setup:database           # Setup database
npm run db:test                  # Test connection
```

### **Build & Test**
```bash
npm run test:build-all           # Test both deployments
npm run config:validate-vercel   # Validate Vercel env
npm run config:validate-static   # Validate static env
```

## 🎯 **DEPLOYMENT TARGETS**

### **Primary: Vercel (Full-Featured)**
- **URL**: Auto-generated or custom domain
- **Features**: 100% functionality
- **Setup**: `npm run setup:vercel`
- **Deploy**: `npm run deploy:vercel`

### **Backup: Static Hosting**
- **Platforms**: GoDaddy, cPanel, Apache, Nginx
- **Features**: Public pages, forms, demo mode
- **Package**: `npm run package:static`
- **Upload**: Extract ZIP to web root

## 🔐 **ENVIRONMENT VARIABLES**

### **Vercel Required**
```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=32-character-secret
NEXTAUTH_URL=https://your-domain.com
SENDGRID_API_KEY=SG.your-key
STRIPE_SECRET_KEY=sk_live_...
```

### **Static Required**
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_EMAIL=info@your-domain.com
```

## 📁 **FILE LOCATIONS**

### **Configuration Files**
- `next.config.vercel.mjs` - Vercel configuration
- `next.config.static.mjs` - Static configuration
- `vercel.json` - Vercel deployment settings
- `deployment-config.js` - Build system manager

### **Scripts**
- `scripts/setup-vercel.js` - Vercel setup automation
- `scripts/setup-database.js` - Database configuration
- `scripts/create-static-package.js` - Static package creator
- `scripts/deployment-status.js` - Status dashboard

### **Deployment Files**
- `deployment/static/README.md` - Static hosting guide
- `deployment/static/.htaccess` - Apache configuration
- `out/` - Static build output
- `dcf-logistics-static-*.zip` - Deployment packages

## 🛠️ **TROUBLESHOOTING**

### **Build Errors**
```bash
# Check configuration
npm run config:validate-vercel

# Clean and rebuild
npm run clean
npm run build:vercel
```

### **Vercel Issues**
```bash
# Check logs
vercel logs

# Redeploy
vercel --prod --force
```

### **Static Issues**
```bash
# Rebuild package
npm run clean
npm run package:static

# Check file permissions (Linux/Mac)
chmod 644 files
chmod 755 directories
```

## 📊 **PLATFORM COMPARISON**

| Feature | Vercel | Static Hosting |
|---------|--------|----------------|
| Setup Time | 15-30 min | 5-10 min |
| Full Features | ✅ Yes | ❌ Limited |
| Database | ✅ Yes | ❌ No |
| Authentication | ✅ Yes | ❌ Demo only |
| Admin Dashboard | ✅ Yes | ❌ Static demo |
| Payments | ✅ Yes | ❌ External |
| Performance | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Cost | Free tier | Usually free |

## 🔗 **USEFUL LINKS**

### **Services**
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Supabase](https://supabase.com) - Database
- [SendGrid](https://sendgrid.com) - Email
- [Stripe](https://stripe.com) - Payments
- [Cloudinary](https://cloudinary.com) - Images

### **Documentation**
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)

## ⚡ **EMERGENCY PROCEDURES**

### **If Vercel is Down**
1. Use static backup deployment
2. Upload latest static package to shared hosting
3. Update DNS if necessary

### **If Database is Down**
1. Check database provider status
2. Use backup database if available
3. Switch to static mode temporarily

### **If Build Fails**
1. Check environment variables
2. Verify all dependencies are installed
3. Clear cache: `npm run clean`
4. Rebuild: `npm run build:vercel`

## 📞 **SUPPORT CHECKLIST**

Before seeking help, run:
```bash
npm run status                   # Check overall status
node --version                   # Check Node.js version
npm --version                    # Check npm version
git status                       # Check git status
```

Include this information when reporting issues:
- Deployment target (Vercel/Static)
- Error messages
- Environment (Windows/Mac/Linux)
- Node.js version
- Build logs

---

**💡 Tip**: Bookmark this page for quick reference during deployments!
