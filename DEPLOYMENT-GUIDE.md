# DCF Logistics — Vercel Deployment Guide

## Overview

This project is a **full Next.js 15** application (not a static export). It uses server-side API routes for form processing and must be deployed to **Vercel** (or a compatible Node.js host). The domain **dcfagency.com** is registered on GoDaddy.

---

## 1. Required Environment Variables

Set these in the **Vercel Dashboard → Project → Settings → Environment Variables** (Production + Preview).

### Email (required for quote form)

| Variable | Value | Notes |
|---|---|---|
| `SMTP_HOST` | `smtp.gmail.com` | Or your SMTP provider |
| `SMTP_PORT` | `587` | TLS port |
| `SMTP_USER` | `dcfagency@gmail.com` | Gmail address that sends email |
| `SMTP_PASS` | *(App Password)* | Generate at https://myaccount.google.com/apppasswords |
| `FROM_EMAIL` | `noreply@dcfagency.com` | Sender shown in emails |

> **Gmail App Password**: Go to Google Account → Security → 2-Step Verification → App passwords. Create one for "Mail / Other (DCF Website)".

### Optional

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://dcfagency.com` |
| `SENDGRID_API_KEY` | *(only if switching to SendGrid later)* |

---

## 2. Deploy to Vercel

### Option A: Import from GitHub (recommended)

1. Push this repository to GitHub (private repo is fine)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Click **Import** → select the repository
4. Vercel auto-detects Next.js — no special settings needed
5. Add the environment variables from Section 1
6. Click **Deploy**

### Option B: Deploy via CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

Follow the prompts and add env vars in the Vercel dashboard afterwards. Redeploy if needed.

---

## 3. Connect dcfagency.com (GoDaddy → Vercel)

### Step 3a: Add domain in Vercel

1. Vercel Dashboard → your project → **Settings → Domains**
2. Add `dcfagency.com`
3. Also add `www.dcfagency.com` (Vercel will auto-redirect one to the other)
4. Vercel will show the DNS records you need to create

### Step 3b: Configure DNS in GoDaddy

1. Log in to [GoDaddy](https://dcc.godaddy.com) → **My Products → DNS**
2. Select `dcfagency.com`

**Delete** any existing A records, CNAME for `@`, or forwarding/parking settings.

Then add these records:

| Type | Name | Value | TTL |
|---|---|---|---|
| **A** | `@` | `76.76.21.21` | 600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | 600 |

> The A record IP `76.76.21.21` is Vercel's anycast IP. Vercel may show a different value — use whatever they display in the Domains settings.

### Step 3c: Disable GoDaddy extras

In GoDaddy DNS settings, make sure these are **OFF**:
- **Domain forwarding** — remove any forwarding rules
- **Parking page** — disable if enabled
- **Email forwarding** — only disable if you're not using GoDaddy email

### Step 3d: Wait for propagation

DNS changes take **5 minutes to 48 hours** to propagate worldwide. You can check status at [dnschecker.org](https://dnschecker.org/#A/dcfagency.com).

### Step 3e: SSL / HTTPS

Vercel **automatically provisions a free SSL certificate** once DNS is verified. No manual steps required. All HTTP traffic is redirected to HTTPS automatically.

---

## 4. Verify After Deployment

- [ ] Visit `https://dcfagency.com` — homepage loads
- [ ] Test all pages: `/about`, `/services`, `/contact`, `/quote`, `/tracking`
- [ ] Submit a test quote at `/quote` — check all 3 inboxes receive the email
- [ ] Verify `https://www.dcfagency.com` redirects to `https://dcfagency.com`
- [ ] Check `https://dcfagency.com/sitemap.xml` returns valid XML
- [ ] Check `https://dcfagency.com/robots.txt` returns valid content

---

## 5. Quote Form Email Recipients

The `/api/quote` route sends every submission to:
1. **info@dcfagency.com**
2. **dcfagency@gmail.com**
3. **ejanneh1414@gmail.com**

To change recipients, edit `app/api/quote/route.ts` → `QUOTE_RECIPIENTS` array.

---

## 6. Troubleshooting

| Issue | Fix |
|---|---|
| Quote form returns 500 | Check env vars `SMTP_USER` and `SMTP_PASS` are set in Vercel |
| Emails not arriving | Verify Gmail App Password is correct; check spam folders |
| Domain shows Vercel 404 | Domain not linked to project — check Vercel Domains settings |
| DNS not resolving | Wait for propagation; verify A record is `76.76.21.21` |
| `www` not working | Add CNAME record for `www` → `cname.vercel-dns.com` |
