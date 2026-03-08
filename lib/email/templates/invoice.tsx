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

interface InvoiceEmailProps {
  customerName: string
  invoiceNumber: string
  totalAmount: number
  currency: string
  dueDate: Date
  invoiceUrl?: string
  paymentUrl?: string
}

export const InvoiceEmail = ({
  customerName = 'Customer',
  invoiceNumber,
  totalAmount,
  currency = 'USD',
  dueDate,
  invoiceUrl = 'https://dcflogistics.gm/account/invoices',
  paymentUrl = 'https://dcflogistics.gm/payment',
}: InvoiceEmailProps) => (
  <Html>
    <Head />
    <Preview>New Invoice {invoiceNumber} - ${totalAmount} {currency}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src="https://dcflogistics.gm/logo.png"
            width="120"
            height="40"
            alt="DCF Logistics"
            style={logo}
          />
        </Section>
        
        <Heading style={h1}>New Invoice</Heading>
        
        <Text style={text}>
          Hello {customerName},
        </Text>
        
        <Text style={text}>
          We've generated a new invoice for your recent logistics services. Please find the details below:
        </Text>
        
        <Section style={invoiceDetails}>
          <Text style={detailsTitle}>Invoice Details:</Text>
          <table style={detailsTable}>
            <tr>
              <td style={detailsLabel}>Invoice Number:</td>
              <td style={detailsValue}>{invoiceNumber}</td>
            </tr>
            <tr>
              <td style={detailsLabel}>Total Amount:</td>
              <td style={detailsValue}>
                <strong style={amountText}>
                  ${totalAmount.toFixed(2)} {currency}
                </strong>
              </td>
            </tr>
            <tr>
              <td style={detailsLabel}>Due Date:</td>
              <td style={detailsValue}>
                {dueDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </td>
            </tr>
          </table>
        </Section>
        
        <Section style={buttonContainer}>
          <Button style={button} href={invoiceUrl}>
            View Invoice
          </Button>
          <Button style={payButton} href={paymentUrl}>
            Pay Now
          </Button>
        </Section>
        
        <Text style={text}>
          <strong>Payment Instructions:</strong>
        </Text>
        
        <ul style={list}>
          <li>Click "Pay Now" to pay online with credit card or bank transfer</li>
          <li>Bank transfer details are included in the invoice PDF</li>
          <li>Please include the invoice number in your payment reference</li>
          <li>Payment is due within 30 days of the invoice date</li>
        </ul>
        
        <Text style={text}>
          If you have any questions about this invoice or need to discuss payment terms, 
          please contact our billing department at{' '}
          <Link href="mailto:info@dcfagency.com" style={link}>
            info@dcfagency.com
          </Link>{' '}
          or call us at +220 395 1020.
        </Text>
        
        <Text style={text}>
          Thank you for your business!<br />
          The DCF Logistics Team
        </Text>
        
        <Section style={footer}>
          <Text style={footerText}>
            DCF Logistics | Serekunda, The Gambia | +220 395 1020
          </Text>
          <Text style={footerText}>
            <Link href="https://dcflogistics.gm" style={footerLink}>
              Visit our website
            </Link>{' '}
            |{' '}
            <Link href="mailto:info@dcfagency.com" style={footerLink}>
              Billing support
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

const invoiceDetails = {
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

const amountText = {
  color: '#059669',
  fontSize: '18px',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
}

const button = {
  backgroundColor: '#6b7280',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  width: '140px',
  padding: '12px 0',
  margin: '0 8px',
}

const payButton = {
  backgroundColor: '#059669',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  width: '140px',
  padding: '12px 0',
  margin: '0 8px',
}

const list = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
  paddingLeft: '20px',
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

export default InvoiceEmail
