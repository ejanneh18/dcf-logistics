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

interface WelcomeEmailProps {
  name: string
  email: string
  loginUrl?: string
}

export const WelcomeEmail = ({
  name = 'Customer',
  email,
  loginUrl = 'https://dcflogistics.gm/account/login',
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to DCF Logistics - Your logistics partner in West Africa</Preview>
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
        
        <Heading style={h1}>Welcome to DCF Logistics!</Heading>
        
        <Text style={text}>
          Hello {name},
        </Text>
        
        <Text style={text}>
          Thank you for joining DCF Logistics, West Africa's leading logistics and freight forwarding company. 
          We're excited to help you with all your shipping and logistics needs.
        </Text>
        
        <Text style={text}>
          Your account has been successfully created with the email address: <strong>{email}</strong>
        </Text>
        
        <Section style={buttonContainer}>
          <Button style={button} href={loginUrl}>
            Access Your Account
          </Button>
        </Section>
        
        <Text style={text}>
          With your DCF Logistics account, you can:
        </Text>
        
        <ul style={list}>
          <li>Track your shipments in real-time</li>
          <li>Request quotes for new shipments</li>
          <li>View and download invoices</li>
          <li>Manage your shipping preferences</li>
          <li>Access our 24/7 customer support</li>
        </ul>
        
        <Text style={text}>
          If you have any questions or need assistance, please don't hesitate to contact our customer support team at{' '}
          <Link href="mailto:info@dcfagency.com" style={link}>
            info@dcfagency.com
          </Link>{' '}
          or call us at +220 395 1020.
        </Text>
        
        <Text style={text}>
          Welcome aboard!<br />
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
            <Link href="https://dcflogistics.gm/contact" style={footerLink}>
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

export default WelcomeEmail
