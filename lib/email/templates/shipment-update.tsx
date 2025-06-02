import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { ShipmentStatus } from '@prisma/client'

interface ShipmentUpdateEmailProps {
  customerName: string
  trackingNumber: string
  status: ShipmentStatus
  origin: string
  destination: string
  estimatedDelivery?: Date
  actualDelivery?: Date
  trackingUrl?: string
}

const statusMessages = {
  PENDING: 'Your shipment has been received and is being processed.',
  CONFIRMED: 'Your shipment has been confirmed and is ready for pickup.',
  IN_TRANSIT: 'Your shipment is on its way to the destination.',
  CUSTOMS_CLEARANCE: 'Your shipment is currently going through customs clearance.',
  OUT_FOR_DELIVERY: 'Your shipment is out for delivery and will arrive soon.',
  DELIVERED: 'Your shipment has been successfully delivered.',
  CANCELLED: 'Your shipment has been cancelled.',
}

const statusColors = {
  PENDING: '#f59e0b',
  CONFIRMED: '#3b82f6',
  IN_TRANSIT: '#8b5cf6',
  CUSTOMS_CLEARANCE: '#f97316',
  OUT_FOR_DELIVERY: '#10b981',
  DELIVERED: '#059669',
  CANCELLED: '#ef4444',
}

export const ShipmentUpdateEmail = ({
  customerName = 'Customer',
  trackingNumber,
  status,
  origin,
  destination,
  estimatedDelivery,
  actualDelivery,
  trackingUrl = 'https://dcflogistics.com/tracking',
}: ShipmentUpdateEmailProps) => (
  <Html>
    <Head />
    <Preview>Shipment Update: {trackingNumber} - {status.replace('_', ' ')}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src="https://dcflogistics.com/logo.png"
            width="120"
            height="40"
            alt="DCF Logistics"
            style={logo}
          />
        </Section>
        
        <Heading style={h1}>Shipment Status Update</Heading>
        
        <Text style={text}>
          Hello {customerName},
        </Text>
        
        <Text style={text}>
          We have an update on your shipment <strong>{trackingNumber}</strong>.
        </Text>
        
        <Section style={statusContainer}>
          <div style={{
            ...statusBadge,
            backgroundColor: statusColors[status],
          }}>
            {status.replace('_', ' ')}
          </div>
        </Section>
        
        <Text style={text}>
          {statusMessages[status]}
        </Text>
        
        <Section style={shipmentDetails}>
          <Text style={detailsTitle}>Shipment Details:</Text>
          <table style={detailsTable}>
            <tr>
              <td style={detailsLabel}>Tracking Number:</td>
              <td style={detailsValue}>{trackingNumber}</td>
            </tr>
            <tr>
              <td style={detailsLabel}>Origin:</td>
              <td style={detailsValue}>{origin}</td>
            </tr>
            <tr>
              <td style={detailsLabel}>Destination:</td>
              <td style={detailsValue}>{destination}</td>
            </tr>
            {estimatedDelivery && (
              <tr>
                <td style={detailsLabel}>Estimated Delivery:</td>
                <td style={detailsValue}>
                  {estimatedDelivery.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </td>
              </tr>
            )}
            {actualDelivery && (
              <tr>
                <td style={detailsLabel}>Delivered On:</td>
                <td style={detailsValue}>
                  {actualDelivery.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </td>
              </tr>
            )}
          </table>
        </Section>
        
        <Section style={buttonContainer}>
          <Button style={button} href={`${trackingUrl}?tracking=${trackingNumber}`}>
            Track Your Shipment
          </Button>
        </Section>
        
        <Text style={text}>
          For any questions or concerns about your shipment, please contact our customer support team at{' '}
          <Link href="mailto:support@dcflogistics.com" style={link}>
            support@dcflogistics.com
          </Link>{' '}
          or call us at +220 123 4567.
        </Text>
        
        <Text style={text}>
          Thank you for choosing DCF Logistics!<br />
          The DCF Logistics Team
        </Text>
        
        <Section style={footer}>
          <Text style={footerText}>
            DCF Logistics | Banjul, The Gambia | +220 123 4567
          </Text>
          <Text style={footerText}>
            <Link href="https://dcflogistics.com" style={footerLink}>
              Visit our website
            </Link>{' '}
            |{' '}
            <Link href="https://dcflogistics.com/contact" style={footerLink}>
              Contact us
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const logoContainer = {
  margin: '32px 0',
  textAlign: 'center' as const,
}

const logo = {
  margin: '0 auto',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
}

const statusContainer = {
  textAlign: 'center' as const,
  margin: '24px 0',
}

const statusBadge = {
  display: 'inline-block',
  padding: '8px 16px',
  borderRadius: '20px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 'bold',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
}

const shipmentDetails = {
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
}

const detailsTitle = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
}

const detailsTable = {
  width: '100%',
  borderCollapse: 'collapse' as const,
}

const detailsLabel = {
  color: '#666',
  fontSize: '14px',
  fontWeight: 'bold',
  padding: '8px 0',
  verticalAlign: 'top',
  width: '40%',
}

const detailsValue = {
  color: '#333',
  fontSize: '14px',
  padding: '8px 0',
  verticalAlign: 'top',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#007cba',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '200px',
  padding: '12px 0',
  margin: '0 auto',
}

const link = {
  color: '#007cba',
  textDecoration: 'underline',
}

const footer = {
  borderTop: '1px solid #eaeaea',
  marginTop: '32px',
  paddingTop: '32px',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
}

const footerLink = {
  color: '#666',
  textDecoration: 'underline',
}

export default ShipmentUpdateEmail
