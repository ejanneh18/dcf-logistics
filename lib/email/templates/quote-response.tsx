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

interface QuoteResponseEmailProps {
  customerName: string
  email: string
  quoteId: string
  serviceType: string
  origin: string
  destination: string
  quotedAmount?: number
  currency?: string
  validUntil?: Date
  estimatedTransitTime?: string
  additionalServices?: string[]
  notes?: string
}

export const QuoteResponseEmail = ({
  customerName,
  email,
  quoteId,
  serviceType,
  origin,
  destination,
  quotedAmount,
  currency = 'USD',
  validUntil,
  estimatedTransitTime,
  additionalServices = [],
  notes,
}: QuoteResponseEmailProps) => (
  <Html>
    <Head />
    <Preview>Your logistics quote from DCF Logistics - Quote #{quoteId}</Preview>
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
        
        <Heading style={h1}>Your Logistics Quote</Heading>
        
        <Text style={text}>
          Dear {customerName},
        </Text>
        
        <Text style={text}>
          Thank you for your interest in DCF Logistics services. We're pleased to provide you with 
          a detailed quote for your shipping requirements.
        </Text>
        
        <Section style={quoteContainer}>
          <Text style={quoteTitle}>Quote Details</Text>
          <div style={quoteHeader}>
            <Text style={quoteId}>Quote #: {quoteId}</Text>
            <Text style={quoteDate}>Date: {new Date().toLocaleDateString()}</Text>
          </div>
          
          <div style={serviceDetails}>
            <Text style={detailItem}><strong>Service Type:</strong> {serviceType}</Text>
            <Text style={detailItem}><strong>Origin:</strong> {origin}</Text>
            <Text style={detailItem}><strong>Destination:</strong> {destination}</Text>
            {estimatedTransitTime && (
              <Text style={detailItem}><strong>Estimated Transit Time:</strong> {estimatedTransitTime}</Text>
            )}
          </div>
          
          {quotedAmount && (
            <Section style={pricingContainer}>
              <Text style={pricingTitle}>Pricing</Text>
              <div style={priceBox}>
                <Text style={priceAmount}>
                  {currency} {quotedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Text>
                <Text style={priceNote}>*Estimated total cost</Text>
              </div>
              {validUntil && (
                <Text style={validityNote}>
                  This quote is valid until: <strong>{validUntil.toLocaleDateString()}</strong>
                </Text>
              )}
            </Section>
          )}
          
          {additionalServices.length > 0 && (
            <Section style={servicesContainer}>
              <Text style={servicesTitle}>Included Services:</Text>
              <ul style={servicesList}>
                {additionalServices.map((service, index) => (
                  <li key={index} style={serviceItem}>{service}</li>
                ))}
              </ul>
            </Section>
          )}
          
          {notes && (
            <Section style={notesContainer}>
              <Text style={notesTitle}>Additional Notes:</Text>
              <div style={notesBox}>
                {notes}
              </div>
            </Section>
          )}
        </Section>
        
        <Section style={nextStepsContainer}>
          <Text style={nextStepsTitle}>Next Steps:</Text>
          <ol style={nextStepsList}>
            <li>Review the quote details above</li>
            <li>Contact us if you have any questions</li>
            <li>Accept the quote to proceed with booking</li>
            <li>Provide necessary documentation</li>
            <li>Schedule pickup or delivery</li>
          </ol>
        </Section>
        
        <Section style={buttonContainer}>
          <Button style={acceptButton} href={`https://dcflogistics.com/quote/accept/${quoteId}`}>
            Accept Quote
          </Button>
          <Button style={contactButton} href="https://dcflogistics.com/contact">
            Contact Us
          </Button>
        </Section>
        
        <Text style={text}>
          Our team is standing by to assist you with any questions about this quote. 
          Please don't hesitate to reach out if you need any clarifications or modifications.
        </Text>
        
        <Text style={text}>
          Thank you for choosing DCF Logistics for your shipping needs!
        </Text>
        
        <Text style={text}>
          Best regards,<br />
          The DCF Logistics Sales Team<br />
          Phone: +220 123 4567<br />
          Email: quotes@dcflogistics.com
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
            <Link href="https://dcflogistics.com/services" style={footerLink}>
              Our services
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

// Styles
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
  textAlign: 'center' as const,
  padding: '32px 0',
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
  padding: '0 40px',
}

const quoteContainer = {
  backgroundColor: '#f8f9fa',
  border: '2px solid #007cba',
  borderRadius: '12px',
  margin: '32px 40px',
  padding: '32px',
}

const quoteTitle = {
  color: '#007cba',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
}

const quoteHeader = {
  borderBottom: '1px solid #dee2e6',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
  paddingBottom: '12px',
}

const quoteId = {
  color: '#333',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
}

const quoteDate = {
  color: '#666',
  fontSize: '14px',
  margin: '0',
}

const serviceDetails = {
  marginBottom: '24px',
}

const detailItem = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
}

const pricingContainer = {
  backgroundColor: '#ffffff',
  border: '1px solid #007cba',
  borderRadius: '8px',
  margin: '24px 0',
  padding: '20px',
  textAlign: 'center' as const,
}

const pricingTitle = {
  color: '#007cba',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
}

const priceBox = {
  marginBottom: '12px',
}

const priceAmount = {
  color: '#007cba',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
}

const priceNote = {
  color: '#666',
  fontSize: '12px',
  margin: '4px 0 0 0',
}

const validityNote = {
  color: '#dc3545',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0',
}

const servicesContainer = {
  marginTop: '24px',
}

const servicesTitle = {
  color: '#333',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
}

const servicesList = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
  paddingLeft: '20px',
}

const serviceItem = {
  margin: '4px 0',
}

const notesContainer = {
  marginTop: '24px',
}

const notesTitle = {
  color: '#333',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
}

const notesBox = {
  backgroundColor: '#ffffff',
  border: '1px solid #e1e5e9',
  borderRadius: '4px',
  color: '#333',
  fontSize: '14px',
  lineHeight: '20px',
  padding: '12px',
}

const nextStepsContainer = {
  margin: '32px 40px',
}

const nextStepsTitle = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
}

const nextStepsList = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0',
  paddingLeft: '20px',
}

const buttonContainer = {
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
  margin: '32px 0',
}

const acceptButton = {
  backgroundColor: '#28a745',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
}

const contactButton = {
  backgroundColor: '#007cba',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
}

const footer = {
  borderTop: '1px solid #eaeaea',
  margin: '40px 0 0 0',
  padding: '20px 40px 0',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#666',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '8px 0',
}

const footerLink = {
  color: '#007cba',
  textDecoration: 'underline',
}

export default QuoteResponseEmail
