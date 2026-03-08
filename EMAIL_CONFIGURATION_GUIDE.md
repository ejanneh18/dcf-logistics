# DCF Logistics - Email Configuration Guide

## 📧 **COMPREHENSIVE EMAIL SETUP INSTRUCTIONS**

This guide provides step-by-step instructions for configuring email delivery for all DCF Logistics website forms.

---

## **📋 OVERVIEW**

The DCF Logistics website uses a **multi-layered email delivery system** with the following forms:
- **Contact Form** (`/contact`)
- **Quote Request Form** (`/quote`) 
- **General Inquiry Forms** (various pages)
- **Newsletter Signup** (footer)

### **Email Routing Configuration**
```
Contact Form → info@dcflogistics.com
Quote Requests → quotes@dcflogistics.com  
Support Inquiries → support@dcflogistics.com
Partnership Inquiries → partnerships@dcflogistics.com
Newsletter Signups → info@dcflogistics.com
```

---

## **🔧 METHOD 1: SMTP EMAIL CONFIGURATION**

### **Step 1: Set Up Business Email Accounts**

Create the following email accounts with your hosting provider:
- `info@dcflogistics.com` (Primary business email)
- `quotes@dcflogistics.com` (Quote requests)
- `support@dcflogistics.com` (Customer support)
- `partnerships@dcflogistics.com` (Business partnerships)

### **Step 2: Configure SMTP Settings**

Add these environment variables to your `.env.local` file:

```env
# SMTP Configuration
SMTP_HOST=mail.dcflogistics.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@dcflogistics.com
SMTP_PASS=your_email_password
SMTP_FROM=info@dcflogistics.com
SMTP_FROM_NAME=DCF Logistics

# Email Recipients
EMAIL_CONTACT=info@dcflogistics.com
EMAIL_QUOTES=quotes@dcflogistics.com
EMAIL_SUPPORT=support@dcflogistics.com
EMAIL_PARTNERSHIPS=partnerships@dcflogistics.com
```

### **Step 3: Install Email Dependencies**

```bash
npm install nodemailer @types/nodemailer
```

### **Step 4: Create SMTP Service**

Create `lib/email/smtp-service.ts`:

```typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM}>`,
      to,
      subject,
      html,
    })
    return { success: true }
  } catch (error) {
    console.error('SMTP Error:', error)
    return { success: false, error }
  }
}
```

---

## **🔧 METHOD 2: FORMSPREE CONFIGURATION**

### **Step 1: Create Formspree Account**

1. Visit [formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create forms for each type:
   - Contact Form
   - Quote Request Form
   - Newsletter Signup

### **Step 2: Configure Form Endpoints**

Add to your `.env.local`:

```env
# Formspree Configuration
FORMSPREE_CONTACT_ENDPOINT=https://formspree.io/f/your-contact-id
FORMSPREE_QUOTE_ENDPOINT=https://formspree.io/f/your-quote-id
FORMSPREE_NEWSLETTER_ENDPOINT=https://formspree.io/f/your-newsletter-id
```

### **Step 3: Update Form Service**

The existing `lib/forms/form-service.ts` already includes Formspree integration. Ensure these endpoints are configured.

---

## **🔧 METHOD 3: NETLIFY FORMS CONFIGURATION**

### **Step 1: Enable Netlify Forms**

If deploying to Netlify, add `netlify` attribute to forms:

```html
<form netlify name="contact">
  <!-- form fields -->
</form>
```

### **Step 2: Configure Netlify Settings**

In your Netlify dashboard:
1. Go to Site Settings → Forms
2. Enable form notifications
3. Set up email notifications to appropriate addresses

---

## **📧 EMAIL TEMPLATE CUSTOMIZATION**

### **Contact Form Email Template**

Located in `lib/email/templates/contact-notification.tsx`:

```typescript
export const ContactEmailTemplate = ({ data }: { data: ContactFormData }) => (
  <div>
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> {data.name}</p>
    <p><strong>Email:</strong> {data.email}</p>
    <p><strong>Phone:</strong> {data.phone}</p>
    <p><strong>Company:</strong> {data.company}</p>
    <p><strong>Subject:</strong> {data.subject}</p>
    <p><strong>Message:</strong> {data.message}</p>
    <p><strong>Type:</strong> {data.type}</p>
    <p><strong>Submitted:</strong> {new Date().toLocaleString()}</p>
  </div>
)
```

---

## **🧪 TESTING EMAIL DELIVERY**

### **Step 1: Test Contact Form**

1. Visit `/contact` on your website
2. Fill out the form with test data
3. Submit the form
4. Check the configured email address for delivery

### **Step 2: Test Quote Request Form**

1. Visit `/quote` on your website
2. Fill out the quote request form
3. Submit the form
4. Check `quotes@dcflogistics.com` for delivery

### **Step 3: Test Newsletter Signup**

1. Scroll to the footer on any page
2. Enter an email address in the newsletter signup
3. Submit the form
4. Check `info@dcflogistics.com` for delivery

### **Step 4: Verify Email Content**

Ensure emails contain:
- ✅ All form field data
- ✅ Submission timestamp
- ✅ Proper sender information
- ✅ Professional formatting
- ✅ DCF Logistics branding

---

## **🔍 TROUBLESHOOTING**

### **Common Issues & Solutions**

#### **1. Emails Not Being Sent**
```bash
# Check environment variables
echo $SMTP_HOST
echo $SMTP_USER

# Check form service logs
npm run dev
# Submit a form and check console for errors
```

#### **2. Emails Going to Spam**
- Verify SPF records in DNS
- Set up DKIM authentication
- Use proper sender reputation
- Include unsubscribe links

#### **3. SMTP Authentication Errors**
- Verify email credentials
- Check if 2FA is enabled (use app passwords)
- Ensure SMTP settings match hosting provider

#### **4. Formspree Not Working**
- Verify endpoint URLs
- Check Formspree dashboard for submissions
- Ensure form fields match Formspree configuration

---

## **📊 MONITORING & ANALYTICS**

### **Email Delivery Monitoring**

1. **Check Form Submissions**
   - Monitor `localStorage` for backup submissions
   - Check server logs for delivery attempts
   - Use Formspree dashboard for submission tracking

2. **Set Up Email Alerts**
   - Configure email forwarding rules
   - Set up mobile notifications for urgent inquiries
   - Create auto-responders for common requests

3. **Track Response Times**
   - Monitor time between form submission and response
   - Set up SLA tracking for quote requests
   - Create escalation procedures for urgent inquiries

---

## **🚀 DEPLOYMENT CONSIDERATIONS**

### **For Vercel Deployment**
- Environment variables configured in Vercel dashboard
- SMTP works with serverless functions
- Consider using Vercel's email service integration

### **For Static Hosting (GoDaddy)**
- SMTP not available in static hosting
- Rely on Formspree and Netlify Forms
- Use client-side email services

### **For cPanel Hosting**
- Full SMTP support available
- Configure email accounts in cPanel
- Set up email forwarding and autoresponders

---

## **✅ FINAL CHECKLIST**

Before going live, verify:

- [ ] All email accounts created and accessible
- [ ] SMTP credentials tested and working
- [ ] Formspree forms configured and tested
- [ ] Email templates formatted correctly
- [ ] All form types tested (contact, quote, newsletter)
- [ ] Spam filters configured properly
- [ ] Auto-responders set up for immediate acknowledgment
- [ ] Email forwarding rules configured
- [ ] Mobile notifications enabled for urgent inquiries
- [ ] Backup email delivery methods tested
- [ ] Form validation working correctly
- [ ] Error handling tested and user-friendly

---

## **📞 SUPPORT**

If you encounter issues with email configuration:

1. **Check the form service logs** in browser console
2. **Verify environment variables** are properly set
3. **Test with different email providers** (Gmail, Outlook, etc.)
4. **Contact your hosting provider** for SMTP support
5. **Review Formspree documentation** for advanced configuration

**Remember**: The website uses multiple fallback methods, so if one email service fails, others should still work to ensure no inquiries are lost.
