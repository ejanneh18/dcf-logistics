import { createTRPCRouter } from './server'
import { authRouter } from './routers/auth'
import { shipmentsRouter } from './routers/shipments'
import { servicesRouter } from './routers/services'
import { invoicesRouter } from './routers/invoices'
import { documentsRouter } from './routers/documents'
import { analyticsRouter } from './routers/analytics'
import { customersRouter } from './routers/customers'
import { newsletterRouter } from './routers/newsletter'
import { inquiriesRouter } from './routers/inquiries'
import { quotesRouter } from './routers/quotes'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  shipments: shipmentsRouter,
  services: servicesRouter,
  invoices: invoicesRouter,
  documents: documentsRouter,
  analytics: analyticsRouter,
  customers: customersRouter,
  newsletter: newsletterRouter,
  inquiries: inquiriesRouter,
  quotes: quotesRouter,
})

export type AppRouter = typeof appRouter
