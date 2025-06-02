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

interface ContactConfirmationEmailProps {
  name: string
  email: string
  subject: string
  message: string
  inquiryId: string
  type?: string
}

export const ContactConfirmationEmail = ({
  name,
  email,
  subject,
  message,
  inquiryId,
  type = 'general',
}: ContactConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank you for contacting DCF Logistics - We've received your inquiry</Preview>
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
        
        <Heading style={h1}>Thank You for Contacting Us!</Heading>
        
        <Text style={text}>
          Hello {name},
        </Text>
        
        <Text style={text}>
          We've received your inquiry and want to thank you for reaching out to DCF Logistics. 
          Our team is reviewing your message and will respond within 24 hours during business days.
        </Text>
        
        <Section style={inquiryContainer}>
          <Text style={inquiryTitle}>Your Inquiry Details:</Text>
          <div style={inquiryDetails}>
            <Text style={detailItem}><strong>Reference ID:</strong> {inquiryId}</Text>
            <Text style={detailItem}><strong>Type:</strong> {type.charAt(0).toUpperCase() + type.slice(1)} Inquiry</Text>
            <Text style={detailItem}><strong>Subject:</strong> {subject}</Text>
            <Text style={detailItem}><strong>Email:</strong> {email}</Text>
            <Text style={detailItem}><strong>Submitted:</strong> {new Date().toLocaleDateString()}</Text>
          </div>
          
          <Section style={messageContainer}>
            <Text style={messageTitle}>Your Message:</Text>
            <div style={messageBox}>
              {message}
            </div>
          </Section>
        </Section>
        
        <Text style={text}>
          In the meantime, you can:
        </Text>
        
        <ul style={actionsList}>
          <li>Track your shipments using our <Link href="https://dcflogistics.com/tracking" style={link}>tracking system</Link></li>
          <li>Browse our <Link href="https://dcflogistics.com/services" style={link}>logistics services</Link></li>
          <li>Read our <Link href="https://dcflogistics.com/blog" style={link}>industry insights</Link></li>
          <li>Call us directly at +220 123 4567 for urgent matters</li>
        </ul>
        
        <Section style={buttonContainer}>
          <Button style={button} href="https://dcflogistics.com/account/login">
            Access Your Account
          </Button>
        </Section>
        
        <Text style={text}>
          If you have any urgent questions or need immediate assistance, please don't hesitate to call our 
          customer service team at +220 123 4567.
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

const inquiryContainer = {
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  margin: '32px 40px',
  padding: '24px',
}

const inquiryTitle = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
}

const inquiryDetails = {
  marginBottom: '20px',
}

const detailItem = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '4px 0',
}

const messageContainer = {
  marginTop: '20px',
}

const messageTitle = {
  color: '#333',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
}

const messageBox = {
  backgroundColor: '#ffffff',
  border: '1px solid #e1e5e9',
  borderRadius: '4px',
  color: '#333',
  fontSize: '14px',
  lineHeight: '20px',
  padding: '12px',
  whiteSpace: 'pre-wrap' as const,
}

const actionsList = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
  paddingLeft: '60px',
}

const link = {
  color: '#007cba',
  textDecoration: 'underline',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
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

export default ContactConfirmationEmail
