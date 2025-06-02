# DCF Logistics - Enterprise Management Platform

A comprehensive, enterprise-grade logistics management platform built with Next.js 15, featuring real-time tracking, payment processing, advanced analytics, and complete business automation.

## 🌟 Key Features

### 🚛 **Complete Logistics Management**
- **Real-time Shipment Tracking** with WebSocket updates
- **Automated Invoice Generation** with Stripe payment processing
- **Document Management** with secure file upload and cloud storage
- **Customer Portal** with self-service capabilities
- **Advanced Analytics** with interactive business intelligence dashboard

### 💳 **Payment & Billing**
- **Stripe Integration** with automated payment processing
- **Invoice Automation** with email delivery and payment links
- **Payment Tracking** with webhook-driven status updates
- **Multi-currency Support** with flexible pricing models

### 📧 **Communication & Notifications**
- **Email Automation** with professional React Email templates
- **Real-time Notifications** via WebSocket connections
- **SMS Integration** ready for mobile notifications
- **Automated Workflows** for status updates and alerts

### 📊 **Business Intelligence**
- **Advanced Analytics Dashboard** with revenue and performance metrics
- **Interactive Charts** with Recharts visualizations
- **Custom Reporting** with data export capabilities
- **Performance Monitoring** with delivery time optimization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Optional: Stripe account, SendGrid/SMTP, Cloudinary account

### Installation

1. **Clone and Install**
```bash
git clone <repository-url>
cd logistics-website
npm install
```

2. **Environment Setup**
Create `.env.local` file:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dcf_logistics"

# Authentication
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Email (choose one)
SENDGRID_API_KEY="SG.your_sendgrid_api_key"
FROM_EMAIL="noreply@dcflogistics.com"

# Payment Processing
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"

# File Upload (optional)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

3. **Database Setup**
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

4. **Start Development**
```bash
npm run dev
```

Visit `http://localhost:3000` and login with:
- **Admin**: admin@dcflogistics.com / admin123
- **Staff**: staff@dcflogistics.com / staff123
- **Customer**: customer1@example.com / customer123

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: tRPC, Prisma ORM, PostgreSQL
- **Authentication**: NextAuth.js with JWT sessions
- **Real-time**: Socket.IO for WebSocket connections
- **Payments**: Stripe with webhook integration
- **Email**: React Email with SendGrid/SMTP
- **File Storage**: Cloudinary with local fallback
- **Analytics**: Custom engine with Recharts

### Project Structure
```
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── account/           # Customer portal pages
│   └── api/               # API routes
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── analytics/        # Analytics dashboards
│   ├── payment/          # Payment processing
│   └── ui/               # Reusable UI components
├── lib/                   # Core libraries
│   ├── trpc/             # tRPC routers and client
│   ├── email/            # Email service and templates
│   ├── payment/          # Stripe integration
│   ├── websocket/        # Real-time functionality
│   └── analytics/        # Business intelligence
└── prisma/               # Database schema and migrations
```

## 📱 User Interfaces

### Admin Dashboard
- **Overview**: Key metrics, recent activity, quick actions
- **Shipments**: Create, track, and manage all shipments
- **Invoices**: Generate invoices with automated calculations
- **Customers**: Manage customer profiles and relationships
- **Analytics**: Advanced reporting with interactive charts
- **Documents**: Secure file management and organization

### Customer Portal
- **Dashboard**: Personal shipment overview and account status
- **Tracking**: Real-time shipment tracking with live updates
- **Invoices**: View and pay invoices online
- **Documents**: Access shipment-related documents
- **Profile**: Manage company information and preferences

### Public Website
- **Landing Page**: Professional showcase of services
- **Service Catalog**: Detailed service descriptions and pricing
- **Quote System**: Instant pricing estimates
- **Tracking Portal**: Public shipment lookup
- **Contact Forms**: Automated inquiry handling

## 🔧 Features

### Core Functionality
- ✅ Complete shipment lifecycle management
- ✅ Real-time tracking with WebSocket updates
- ✅ Automated invoice generation and billing
- ✅ Stripe payment processing with webhooks
- ✅ Document upload and management
- ✅ Customer relationship management
- ✅ Service catalog with dynamic pricing
- ✅ Quote generation and management

### Advanced Features
- ✅ Email automation with professional templates
- ✅ Real-time notifications and alerts
- ✅ Advanced analytics and reporting
- ✅ Performance monitoring and optimization
- ✅ File upload with cloud storage
- ✅ Role-based access control
- ✅ Responsive mobile design
- ✅ PWA capabilities with offline support

## 📊 Analytics & Reporting

### Business Intelligence
- **Revenue Analytics**: Track income trends and growth
- **Shipment Performance**: Monitor delivery times and efficiency
- **Customer Insights**: Analyze customer behavior and retention
- **Operational Metrics**: Measure business performance
- **Interactive Dashboards**: Real-time data visualization
- **Custom Reports**: Flexible reporting with data export

### Key Metrics
- Total revenue and growth trends
- Shipment volume and status distribution
- Customer acquisition and retention rates
- Average delivery times and on-time performance
- Payment processing and collection metrics
- Document management and compliance tracking

## 🔒 Security & Compliance

### Security Features
- **Authentication**: Secure login with NextAuth.js
- **Authorization**: Role-based access control
- **Data Protection**: Encrypted sensitive information
- **File Security**: Secure upload with type validation
- **Payment Security**: PCI-compliant Stripe integration
- **API Security**: Type-safe tRPC endpoints

### Compliance Ready
- GDPR compliance with data protection
- SOC 2 ready with audit logging
- PCI DSS compliant payment processing
- ISO 27001 security framework compatible

## 🚀 Deployment

### Production Deployment
1. **Vercel** (Recommended)
   - Connect GitHub repository
   - Configure environment variables
   - Automatic deployments on push

2. **Docker**
   ```bash
   docker build -t dcf-logistics .
   docker run -p 3000:3000 dcf-logistics
   ```

3. **Traditional Hosting**
   ```bash
   npm run build
   npm start
   ```

### Environment Configuration
- Database: PostgreSQL (Supabase, Railway, etc.)
- File Storage: Cloudinary or AWS S3
- Email: SendGrid or SMTP provider
- Payments: Stripe account with webhooks
- Monitoring: Vercel Analytics or custom solution

## 📈 Performance

### Optimization Features
- **Next.js 15**: Latest performance optimizations
- **Static Generation**: Pre-rendered pages for speed
- **Image Optimization**: Automatic image compression
- **Code Splitting**: Lazy loading for faster initial load
- **Database Optimization**: Efficient queries with Prisma
- **Caching**: Strategic caching for improved performance

### Monitoring
- Real-time performance metrics
- Error tracking and logging
- User analytics and behavior tracking
- System health monitoring
- Automated alerts for issues

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check README-BACKEND.md for detailed setup
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join community discussions
- **Email**: Contact support team

---

**Built with ❤️ for modern logistics management**
