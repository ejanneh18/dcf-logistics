# DCF Logistics - Custom Domain Setup Guide
## Connecting GoDaddy Subdomain to Vercel Deployment

### 📋 **Business Context**

Setting up a custom domain for the DCF Logistics website provides:
- **Professional Branding**: Custom domain enhances credibility and trust
- **SEO Benefits**: Better search engine ranking with branded domain
- **Marketing Advantage**: Easier to remember and share domain name
- **SSL Security**: Automatic HTTPS with custom SSL certificate
- **Scalability**: Future-proof domain strategy for business growth

---

## 🎯 **Prerequisites Verification**

### **Step 1: Verify Vercel Deployment Status**
**Estimated Time**: 2 minutes

1. **Check Current Deployment**
   ```bash
   # Test current Vercel deployment
   curl -I https://dcf-logistics-hn0in9dwt-ejanneh18-gmailcoms-projects.vercel.app
   ```
   
2. **Verify Website Functionality**
   - ✅ Homepage loads correctly
   - ✅ Navigation works
   - ✅ Contact forms are functional
   - ✅ All pages accessible

3. **Confirm Vercel Dashboard Access**
   - Login to [Vercel Dashboard](https://vercel.com/dashboard)
   - Locate "dcf-logistics" project
   - Verify deployment status shows "Ready"

### **Step 2: Verify GoDaddy Access**
**Estimated Time**: 1 minute

1. **Domain Management Access**
   - Login to [GoDaddy Account](https://account.godaddy.com)
   - Navigate to "My Products" → "Domains"
   - Confirm you can access DNS management

2. **Required Information**
   - Domain name (e.g., `dcflogistics.com`)
   - Desired subdomain (e.g., `app.dcflogistics.com` or `www.dcflogistics.com`)
   - GoDaddy account credentials

---

## 🌐 **Domain Configuration Steps**

### **Step 3: Add Custom Domain in Vercel**
**Estimated Time**: 3-5 minutes

1. **Access Vercel Project Settings**
   ```
   1. Go to Vercel Dashboard
   2. Click on "dcf-logistics" project
   3. Navigate to "Settings" tab
   4. Click "Domains" in the sidebar
   ```

2. **Add New Domain**
   ```
   1. Click "Add" button
   2. Enter your custom domain (e.g., app.dcflogistics.com)
   3. Click "Add" to confirm
   ```

3. **Note DNS Configuration Requirements**
   Vercel will display required DNS records:
   ```
   Type: CNAME
   Name: app (or your subdomain)
   Value: cname.vercel-dns.com //old dcf test ip=  92.205.173.26
   
   OR
   
   Type: A
   Name: @ (for root domain)
   Value: 76.76.19.61
   ```

### **Step 4: Configure DNS Records in GoDaddy**
**Estimated Time**: 5-10 minutes

1. **Access GoDaddy DNS Management**
   ```
   1. Login to GoDaddy account
   2. Go to "My Products" → "Domains"
   3. Click "DNS" next to your domain
   4. Click "Manage DNS"
   ```

2. **Add CNAME Record (For Subdomain)**
   ```
   Record Type: CNAME
   Host: app (replace with your subdomain)
   Points to: cname.vercel-dns.com
   TTL: 1 Hour (3600 seconds)
   ```

3. **Alternative: Add A Record (For Root Domain)**
   ```
   Record Type: A
   Host: @ (for root domain)
   Points to: 76.76.19.61
   TTL: 1 Hour (3600 seconds)
   ```

4. **Save DNS Changes**
   - Click "Save" to apply changes
   - Note: DNS propagation may take 24-48 hours

### **Step 5: Verify Domain Configuration**
**Estimated Time**: 2-3 minutes

1. **Check Vercel Domain Status**
   ```
   1. Return to Vercel Dashboard → Domains
   2. Wait for domain status to show "Valid Configuration"
   3. Status may show "Pending" initially - this is normal
   ```

2. **DNS Propagation Check**
   ```bash
   # Check DNS propagation
   nslookup app.dcflogistics.com
   
   # Should return Vercel's IP address
   # May take time to propagate globally
   ```

---

## 🔒 **SSL Certificate Setup**

### **Step 6: Automatic SSL Provisioning**
**Estimated Time**: 5-15 minutes (automatic)

1. **Vercel Automatic SSL**
   - Vercel automatically provisions SSL certificates
   - Uses Let's Encrypt for free SSL certificates
   - Process begins once DNS is properly configured

2. **Monitor SSL Status**
   ```
   1. In Vercel Dashboard → Domains
   2. Check SSL certificate status
   3. Status will show "Provisioning" then "Valid"
   ```

3. **Verify SSL Certificate**
   ```bash
   # Test SSL certificate
   curl -I https://app.dcflogistics.com
   
   # Should return 200 OK with HTTPS
   ```

---

## 🔧 **Environment Variable Updates**

### **Step 7: Update Domain-Dependent Variables**
**Estimated Time**: 3-5 minutes

1. **Access Vercel Environment Variables**
   ```
   1. Vercel Dashboard → dcf-logistics project
   2. Settings → Environment Variables
   3. Locate domain-dependent variables
   ```

2. **Update Required Variables**
   ```env
   # Update these environment variables:
   NEXTAUTH_URL=https://app.dcflogistics.com
   NEXT_PUBLIC_SITE_URL=https://app.dcflogistics.com
   APP_URL=https://app.dcflogistics.com
   
   # Email configuration (if using custom domain)
   SENDGRID_FROM_EMAIL=noreply@dcflogistics.com
   CONTACT_EMAIL=info@dcflogistics.com
   SALES_EMAIL=sales@dcflogistics.com
   ```

3. **Redeploy Application**
   ```bash
   # Trigger new deployment with updated environment variables
   vercel --prod
   
   # Or use Vercel Dashboard → Deployments → Redeploy
   ```

---

## ✅ **Testing and Verification**

### **Step 8: Comprehensive Testing**
**Estimated Time**: 10-15 minutes

1. **DNS Propagation Verification**
   ```bash
   # Check multiple DNS servers
   nslookup app.dcflogistics.com 8.8.8.8
   nslookup app.dcflogistics.com 1.1.1.1
   
   # Online tools:
   # https://dnschecker.org
   # https://whatsmydns.net
   ```

2. **Website Functionality Testing**
   ```
   Test Checklist:
   ✅ Homepage loads at custom domain
   ✅ All navigation links work
   ✅ Contact forms submit correctly
   ✅ SSL certificate is valid (green lock icon)
   ✅ Redirects from HTTP to HTTPS work
   ✅ All pages load without errors
   ✅ Images and assets load correctly
   ```

3. **Performance Testing**
   ```bash
   # Test page load speed
   curl -w "@curl-format.txt" -o /dev/null -s https://app.dcflogistics.com
   
   # Online tools:
   # https://pagespeed.web.dev
   # https://gtmetrix.com
   ```

4. **Authentication Testing** (if applicable)
   ```
   ✅ Login/logout functionality works
   ✅ Session persistence across pages
   ✅ Password reset emails use correct domain
   ✅ OAuth redirects work properly
   ```

### **Step 9: SEO and Analytics Setup**
**Estimated Time**: 5-10 minutes

1. **Update Google Analytics**
   ```javascript
   // Update tracking code with new domain
   gtag('config', 'GA_MEASUREMENT_ID', {
     'custom_map': {'custom_parameter': 'app.dcflogistics.com'}
   });
   ```

2. **Update Search Console**
   ```
   1. Add new property in Google Search Console
   2. Verify domain ownership
   3. Submit updated sitemap
   ```

3. **Update Social Media Links**
   - Update website URL in social media profiles
   - Update business listings and directories
   - Notify customers of new domain

---

## 🚨 **Troubleshooting Section**

### **Common Issues and Solutions**

#### **Issue 1: DNS Not Propagating**
**Symptoms**: Domain not resolving after 24 hours
```bash
# Solution 1: Check DNS configuration
nslookup app.dcflogistics.com

# Solution 2: Clear local DNS cache
ipconfig /flushdns  # Windows
sudo dscacheutil -flushcache  # macOS

# Solution 3: Verify GoDaddy DNS settings
# Ensure CNAME points to: cname.vercel-dns.com
```

#### **Issue 2: SSL Certificate Not Provisioning**
**Symptoms**: "Not Secure" warning in browser
```
Solution:
1. Verify DNS is properly configured
2. Wait 24-48 hours for full propagation
3. Contact Vercel support if issue persists
4. Check for conflicting DNS records
```

#### **Issue 3: 404 Errors on Custom Domain**
**Symptoms**: Pages not found on custom domain
```
Solution:
1. Verify domain is added correctly in Vercel
2. Check environment variables are updated
3. Redeploy application
4. Clear browser cache
```

#### **Issue 4: Authentication Redirect Errors**
**Symptoms**: Login redirects to wrong domain
```
Solution:
1. Update NEXTAUTH_URL environment variable
2. Update OAuth app settings (Google, GitHub, etc.)
3. Clear browser cookies
4. Redeploy application
```

### **DNS Propagation Delays**
```
Normal Timeframes:
- Local ISP: 2-4 hours
- Global propagation: 24-48 hours
- Some regions: Up to 72 hours

Check propagation status:
https://dnschecker.org
```

---

## 🔄 **Rollback Procedures**

### **Step 10: Emergency Rollback**
**Estimated Time**: 5-10 minutes

1. **Immediate Rollback to Vercel Domain**
   ```
   1. Vercel Dashboard → Domains
   2. Set original Vercel domain as primary
   3. Remove custom domain temporarily
   ```

2. **Revert Environment Variables**
   ```env
   # Revert to original Vercel URLs
   NEXTAUTH_URL=https://dcf-logistics-hn0in9dwt-ejanneh18-gmailcoms-projects.vercel.app
   NEXT_PUBLIC_SITE_URL=https://dcf-logistics-hn0in9dwt-ejanneh18-gmailcoms-projects.vercel.app
   ```

3. **Redeploy Application**
   ```bash
   vercel --prod
   ```

4. **Communicate Changes**
   - Notify users of temporary domain change
   - Update any marketing materials
   - Plan resolution timeline

---

## 📊 **Success Metrics**

### **Verification Checklist**
```
✅ Custom domain resolves correctly
✅ SSL certificate is valid and active
✅ All website functionality works
✅ Environment variables updated
✅ Authentication flows work properly
✅ Performance is maintained or improved
✅ SEO tools updated with new domain
✅ Analytics tracking correctly
```

### **Expected Timeframes**
- **DNS Configuration**: 10-15 minutes
- **DNS Propagation**: 24-48 hours
- **SSL Certificate**: 5-15 minutes (after DNS)
- **Full Setup**: 2-3 hours (including propagation)

---

## 🎉 **Completion**

Once all steps are completed successfully:

1. **Document the Setup**
   - Record DNS settings for future reference
   - Save SSL certificate details
   - Update internal documentation

2. **Monitor Performance**
   - Set up uptime monitoring
   - Configure alerts for SSL expiration
   - Monitor DNS health

3. **Business Benefits Achieved**
   - ✅ Professional branded domain
   - ✅ Enhanced SEO potential
   - ✅ Improved user trust and credibility
   - ✅ Scalable domain strategy

**🎯 Your DCF Logistics website is now live on a custom domain with enterprise-grade hosting and security!**

---

## 📋 **Quick Reference Card**

### **Essential DNS Settings**
```
For Subdomain (app.dcflogistics.com):
Type: CNAME
Host: app
Value: cname.vercel-dns.com
TTL: 3600

For Root Domain (dcflogistics.com):
Type: A
Host: @
Value: 76.76.19.61
TTL: 3600
```

### **Key Environment Variables**
```env
NEXTAUTH_URL=https://your-custom-domain.com
NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com
APP_URL=https://your-custom-domain.com
```

### **Verification Commands**
```bash
# Check DNS
nslookup your-domain.com

# Check SSL
curl -I https://your-domain.com

# Check propagation
dig your-domain.com

# Test website
curl -L https://your-domain.com
```

### **Emergency Contacts**
- **Vercel Support**: https://vercel.com/support
- **GoDaddy Support**: https://godaddy.com/help
- **DNS Checker**: https://dnschecker.org

---

## 🔗 **Related Documentation**

- **Main Deployment Guide**: `DEPLOYMENT_MIGRATION_GUIDE.md`
- **Quick Reference**: `DEPLOYMENT_QUICK_REFERENCE.md`
- **Success Report**: `DEPLOYMENT_SUCCESS_REPORT.md`
- **Troubleshooting**: `CUSTOM_DOMAIN_SETUP_GUIDE.md` (this document)

---

**📞 Need Help?**
If you encounter issues during setup:
1. Check the troubleshooting section above
2. Verify all prerequisites are met
3. Allow 24-48 hours for DNS propagation
4. Contact Vercel or GoDaddy support if needed

**🎉 Success!** Your professional DCF Logistics website is now accessible via custom domain with enterprise-grade performance and security.
