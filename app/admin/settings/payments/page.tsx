import type { Metadata } from "next"
import PaymentGatewayPageClient from "./PaymentGatewayPageClient"

export const metadata: Metadata = {
  title: "Payment Gateway Settings | DCF Logistics Admin",
  description: "Configure payment processing and gateway integrations",
}

export default function PaymentGatewayPage() {
  return <PaymentGatewayPageClient />
}
