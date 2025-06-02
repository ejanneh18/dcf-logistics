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

interface NewsletterWelcomeEmailProps {
  name?: string
  email: string
  unsubscribeUrl?: string
}

export const NewsletterWelcomeEmail = ({
  name,
  email,
  unsubscribeUrl = 'https://dcflogistics.com/unsubscribe',
}: NewsletterWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to DCF Logistics Newsletter - Stay updated with logistics insights</Preview>
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
        
        <Heading style={h1}>Welcome to Our Newsletter!</Heading>
        
        <Text style={text}>
          {name ? `Hello ${name}` : 'Hello'},
        </Text>
        
        <Text style={text}>
          Thank you for subscribing to the DCF Logistics newsletter! You've joined thousands of logistics 
          professionals who stay informed about industry trends, shipping insights, and our latest services.
        </Text>
        
        <Text style={text}>
          Your subscription has been confirmed for: <strong>{email}</strong>
        </Text>
        
        <Section style={benefitsContainer}>
          <Text style={benefitsTitle}>What you'll receive:</Text>
          <ul style={benefitsList}>
            <li>Weekly logistics industry insights and trends</li>
            <li>Shipping tips and best practices</li>
            <li>Updates on our services and capabilities</li>
            <li>Exclusive offers and promotions</li>
            <li>Market analysis and trade updates</li>
          </ul>
        </Section>
        
        <Section style={buttonContainer}>
          <Button style={button} href="https://dcflogistics.com/services">
            Explore Our Services
          </Button>
        </Section>
        
        <Text style={text}>
          We're committed to providing valuable content that helps your business succeed. 
          If you have any questions or suggestions for newsletter topics, please don't hesitate to reach out.
        </Text>
        
        <Text style={text}>
          Best regards,<br />
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
            <Link href={unsubscribeUrl} style={footerLink}>
              Unsubscribe
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

const benefitsContainer = {
  margin: '32px 0',
  padding: '0 40px',
}

const benefitsTitle = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
}

const benefitsList = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0',
  paddingLeft: '20px',
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

export default NewsletterWelcomeEmail
