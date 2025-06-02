import { PrismaClient, UserRole, ServiceCategory, ShipmentStatus, InvoiceStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@dcflogistics.com' },
    update: {},
    create: {
      email: 'admin@dcflogistics.com',
      name: 'DCF Admin',
      password: adminPassword,
      role: UserRole.ADMIN,
    },
  })
  console.log('✅ Created admin user')

  // Create staff user
  const staffPassword = await bcrypt.hash('staff123', 12)
  const staff = await prisma.user.upsert({
    where: { email: 'staff@dcflogistics.com' },
    update: {},
    create: {
      email: 'staff@dcflogistics.com',
      name: 'DCF Staff',
      password: staffPassword,
      role: UserRole.STAFF,
    },
  })
  console.log('✅ Created staff user')

  // Create customer users
  const customerPassword = await bcrypt.hash('customer123', 12)
  const customer1 = await prisma.user.upsert({
    where: { email: 'customer1@example.com' },
    update: {},
    create: {
      email: 'customer1@example.com',
      name: 'John Doe',
      password: customerPassword,
      role: UserRole.CUSTOMER,
      customer: {
        create: {
          companyName: 'Acme Trading Ltd',
          address: '123 Business Street',
          city: 'Banjul',
          country: 'Gambia',
          postalCode: '1000',
          creditLimit: 50000,
          paymentTerms: 30,
        }
      }
    },
  })

  const customer2 = await prisma.user.upsert({
    where: { email: 'customer2@example.com' },
    update: {},
    create: {
      email: 'customer2@example.com',
      name: 'Jane Smith',
      password: customerPassword,
      role: UserRole.CUSTOMER,
      customer: {
        create: {
          companyName: 'Global Imports Inc',
          address: '456 Commerce Ave',
          city: 'Lagos',
          country: 'Nigeria',
          postalCode: '100001',
          creditLimit: 75000,
          paymentTerms: 15,
        }
      }
    },
  })
  console.log('✅ Created customer users')

  // Create services
  const services = [
    {
      name: 'Air Freight Express',
      description: 'Fast air freight service for urgent shipments',
      category: ServiceCategory.AIR_FREIGHT,
      basePrice: 150,
      regions: JSON.stringify(['West Africa', 'Europe', 'North America']),
      features: ['Express delivery', '24/7 tracking', 'Insurance included'],
    },
    {
      name: 'Sea Freight Standard',
      description: 'Cost-effective ocean freight for large shipments',
      category: ServiceCategory.SEA_FREIGHT,
      basePrice: 75,
      regions: JSON.stringify(['West Africa', 'Europe', 'Asia']),
      features: ['Container shipping', 'Port-to-port', 'Bulk cargo'],
    },
    {
      name: 'Road Transport',
      description: 'Ground transportation within West Africa',
      category: ServiceCategory.ROAD_TRANSPORT,
      basePrice: 50,
      regions: JSON.stringify(['West Africa']),
      features: ['Door-to-door', 'Regional coverage', 'Flexible scheduling'],
    },
    {
      name: 'Customs Clearance',
      description: 'Professional customs clearance services',
      category: ServiceCategory.CUSTOMS_CLEARANCE,
      basePrice: 100,
      regions: JSON.stringify(['West Africa', 'Global']),
      features: ['Expert handling', 'Documentation', 'Compliance'],
    },
    {
      name: 'Warehousing',
      description: 'Secure storage and distribution services',
      category: ServiceCategory.WAREHOUSING,
      basePrice: 25,
      regions: JSON.stringify(['West Africa']),
      features: ['Climate controlled', 'Security', 'Inventory management'],
    },
  ]

  const createdServices = []
  for (const service of services) {
    const created = await prisma.service.create({
      data: service,
    })
    createdServices.push(created)
  }
  console.log('✅ Created services')

  // Create pricing rules
  for (const service of createdServices) {
    await prisma.pricingRule.create({
      data: {
        serviceId: service.id,
        name: 'Weight-based pricing',
        conditions: {
          minWeight: 0,
          maxWeight: 100,
        },
        multiplier: 1.0,
      },
    })

    await prisma.pricingRule.create({
      data: {
        serviceId: service.id,
        name: 'Heavy cargo surcharge',
        conditions: {
          minWeight: 100,
        },
        multiplier: 1.5,
      },
    })
  }
  console.log('✅ Created pricing rules')

  // Get customer records
  const customers = await prisma.customer.findMany({
    include: { user: true }
  })

  // Create sample shipments
  const shipments = [
    {
      customerId: customers[0].id,
      serviceId: createdServices[0].id, // Air Freight
      origin: 'Banjul, Gambia',
      destination: 'Lagos, Nigeria',
      weight: 25.5,
      value: 5000,
      totalCost: 750,
      status: ShipmentStatus.IN_TRANSIT,
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    },
    {
      customerId: customers[1].id,
      serviceId: createdServices[1].id, // Sea Freight
      origin: 'Dakar, Senegal',
      destination: 'Hamburg, Germany',
      weight: 1500,
      value: 25000,
      totalCost: 2250,
      status: ShipmentStatus.CUSTOMS_CLEARANCE,
      estimatedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    },
    {
      customerId: customers[0].id,
      serviceId: createdServices[2].id, // Road Transport
      origin: 'Accra, Ghana',
      destination: 'Abidjan, Ivory Coast',
      weight: 75,
      value: 3000,
      totalCost: 375,
      status: ShipmentStatus.DELIVERED,
      actualDelivery: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      deliveredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
  ]

  const createdShipments = []
  for (const shipment of shipments) {
    const trackingNumber = `DCF${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`
    const created = await prisma.shipment.create({
      data: {
        ...shipment,
        trackingNumber,
      },
    })
    createdShipments.push(created)
  }
  console.log('✅ Created sample shipments')

  // Create sample invoices
  const createdInvoices = []
  for (let i = 0; i < createdShipments.length; i++) {
    const shipment = createdShipments[i]
    const invoiceNumber = `INV-${Date.now() + i}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`

    const subtotal = (shipment.totalCost || 0) // Use totalCost as subtotal
    const taxAmount = subtotal * 0.075 // 7.5% tax
    const totalAmount = subtotal + taxAmount

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        customerId: shipment.customerId,
        shipmentId: shipment.id,
        status: i === 2 ? InvoiceStatus.PAID : InvoiceStatus.SENT,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        paidDate: i === 2 ? new Date() : null,
        subtotal,
        taxAmount,
        totalAmount,
        items: {
          create: [
            {
              description: `Logistics service for ${shipment.trackingNumber}`,
              quantity: 1,
              unitPrice: subtotal,
              totalPrice: subtotal,
            }
          ]
        }
      },
    })
    createdInvoices.push(invoice)
  }
  console.log('✅ Created sample invoices')

  // Create sample payments for paid invoices
  for (let i = 0; i < createdInvoices.length; i++) {
    const invoice = createdInvoices[i]
    if (invoice.status === InvoiceStatus.PAID) {
      await prisma.payment.create({
        data: {
          invoiceId: invoice.id,
          amount: invoice.totalAmount,
          currency: 'USD',
          method: 'BANK_TRANSFER',
          status: 'COMPLETED',
          transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          paidAt: new Date(),
        },
      })
    }
  }
  console.log('✅ Created sample payments')

  // Create sample notifications
  for (const customer of customers) {
    await prisma.notification.create({
      data: {
        userId: customer.userId,
        type: 'SHIPMENT_UPDATE',
        title: 'Shipment Status Update',
        message: 'Your shipment has been updated to in-transit status.',
        data: { shipmentId: createdShipments[0].id },
      },
    })
  }
  console.log('✅ Created sample notifications')

  // Create sample quote requests
  const quoteRequests = [
    {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+220 123 4567',
      company: 'ABC Trading Ltd',
      serviceType: 'Air Freight',
      origin: 'Banjul, Gambia',
      destination: 'Dakar, Senegal',
      cargoType: 'Electronics',
      cargoDetails: 'Laptops and mobile phones for retail distribution',
      weight: '150 kg',
      dimensions: '120x80x60 cm',
      estimatedValue: 15000,
      status: 'PENDING',
    },
    {
      fullName: 'Jane Smith',
      email: 'jane.smith@company.com',
      phone: '+220 987 6543',
      company: 'XYZ Logistics',
      serviceType: 'Ground Transportation',
      origin: 'Banjul, Gambia',
      destination: 'Bamako, Mali',
      cargoType: 'Textiles',
      cargoDetails: 'Cotton fabrics for manufacturing',
      weight: '500 kg',
      dimensions: '200x150x100 cm',
      estimatedValue: 8000,
      status: 'QUOTED',
      quotedAmount: 1200,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      respondedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      fullName: 'Bob Wilson',
      email: 'bob.wilson@business.com',
      phone: '+220 555 1234',
      serviceType: 'Sea Freight',
      origin: 'Banjul, Gambia',
      destination: 'Lagos, Nigeria',
      cargoType: 'Machinery',
      cargoDetails: 'Industrial equipment for construction projects',
      weight: '2000 kg',
      estimatedValue: 45000,
      status: 'ACCEPTED',
      quotedAmount: 4800,
      validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      respondedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    },
  ]

  for (const quoteRequest of quoteRequests) {
    await prisma.quoteRequest.create({
      data: quoteRequest,
    })
  }
  console.log('✅ Created sample quote requests')

  console.log('🎉 Database seeding completed!')
  console.log('\n📋 Test Accounts:')
  console.log('Admin: admin@dcflogistics.com / admin123')
  console.log('Staff: staff@dcflogistics.com / staff123')
  console.log('Customer 1: customer1@example.com / customer123')
  console.log('Customer 2: customer2@example.com / customer123')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
