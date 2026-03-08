# DCF Logistics - cPanel Quick Setup Checklist

## 🚀 Quick Deployment (30 minutes)

### ✅ Pre-Deployment Checklist

- [ ] **Hosting Account Ready**
  - cPanel access working
  - Domain pointed to hosting
  - SSL certificate available

- [ ] **Local Environment**
  - Node.js 18+ installed
  - Project cloned locally
  - Dependencies installed (`npm install`)

### ✅ Step 1: Build Deployment Package (5 minutes)

```bash
# Navigate to project directory
cd dcf-logistics

# Install dependencies
npm install

# Build deployment package
npm run build:cpanel
```

This creates: `dcf-logistics-cpanel-deployment.zip`

### ✅ Step 2: Database Setup (10 minutes)

1. **Login to cPanel**
2. **Go to "MySQL Databases"**
3. **Create Database:**
   - Name: `dcf_logistics`
   - Note the full name: `yourusername_dcf_logistics`

4. **Create User:**
   - Username: `dcf_user`
   - Password: Generate strong password
   - Note full username: `yourusername_dcf_user`

5. **Add User to Database:**
   - Grant ALL PRIVILEGES

6. **Note Your Credentials:**
   ```
   Host: localhost
   Database: yourusername_dcf_logistics
   Username: yourusername_dcf_user
   Password: [your generated password]
   ```

### ✅ Step 3: Upload Files (5 minutes)

1. **Extract deployment ZIP file**
2. **Login to cPanel File Manager**
3. **Navigate to `public_html`**
4. **Delete default files** (index.html, etc.)
5. **Upload all extracted files**
6. **Verify file structure:**
   ```
   public_html/
   ├── index.html
   ├── _next/
   ├── admin/
   ├── .htaccess
   └── ...
   ```

### ✅ Step 4: Environment Configuration (5 minutes)

1. **Copy environment template:**
   ```bash
   cp deployment/cpanel/.env.cpanel.example .env.production
   ```

2. **Edit `.env.production` with your details:**
   ```env
   # Update these with your actual values
   NEXTAUTH_URL="https://yourdomain.com"
   APP_URL="https://yourdomain.com"
   NEXTAUTH_SECRET="your-32-character-secret-key"
   DATABASE_URL="mysql://yourusername_dcf_user:password@localhost:3306/yourusername_dcf_logistics"
   CONTACT_EMAIL="info@yourdomain.com"
   ADMIN_EMAIL="admin@yourdomain.com"
   ```

3. **Upload `.env.production` to `public_html`**

### ✅ Step 5: SSL & Security (3 minutes)

1. **Enable SSL in cPanel:**
   - Go to "SSL/TLS"
   - Install Let's Encrypt (free)
   - Enable "Force HTTPS Redirect"

2. **Verify .htaccess is uploaded** (should be automatic)

### ✅ Step 6: Email Setup (2 minutes)

**Option A: SendGrid (Recommended)**
1. Sign up at sendgrid.com
2. Create API key
3. Add to `.env.production`:
   ```env
   SENDGRID_API_KEY="SG.your-api-key"
   SENDGRID_FROM_EMAIL="noreply@yourdomain.com"
   ```

**Option B: cPanel Email**
1. Create email account in cPanel
2. Add to `.env.production`:
   ```env
   SMTP_HOST="mail.yourdomain.com"
   SMTP_USER="noreply@yourdomain.com"
   SMTP_PASS="your-email-password"
   ```

### ✅ Step 7: Testing (5 minutes)

1. **Visit your website:** `https://yourdomain.com`
2. **Check these pages work:**
   - [ ] Homepage loads
   - [ ] Contact page works
   - [ ] Services pages load
   - [ ] Admin login: `https://yourdomain.com/admin`

3. **Test contact form:**
   - [ ] Form submits successfully
   - [ ] Email notifications work

---

## 🔧 Quick Commands Reference

```bash
# Build for cPanel
npm run build:cpanel

# Build static export only
npm run build:static

# Clean build files
npm run clean
```

---

## 🆘 Quick Troubleshooting

### Issue: 404 on page refresh
**Fix:** Check `.htaccess` file is uploaded and contains rewrite rules

### Issue: Images not loading
**Fix:** Verify all files from `_next/` folder are uploaded

### Issue: Contact form not working
**Fix:** Check email configuration in `.env.production`

### Issue: Admin login not working
**Fix:** Verify database connection and run migrations

### Issue: SSL errors
**Fix:** Ensure SSL certificate is installed and HTTPS redirect is enabled

---

## 📞 Need Help?

- **Full Guide:** `deployment/cpanel/CPANEL_DEPLOYMENT_GUIDE.md`
- **GitHub Issues:** [Create an issue](https://github.com/your-repo/issues)
- **Email Support:** support@dcflogistics.com

---

## ✅ Final Verification Checklist

- [ ] Website loads at `https://yourdomain.com`
- [ ] All pages accessible (home, contact, services, admin)
- [ ] Contact form sends emails
- [ ] Admin dashboard accessible
- [ ] SSL certificate working (green lock icon)
- [ ] Mobile responsive design working
- [ ] Page speed acceptable (test with PageSpeed Insights)

**🎉 Congratulations! Your DCF Logistics website is now live!**

---

**Estimated Total Time: 30 minutes**
**Difficulty Level: Beginner-friendly**
