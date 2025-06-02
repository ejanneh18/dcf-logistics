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

interface ContactNotificationEmailProps {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  type: string
  inquiryId: string
  priority?: string
}

export const ContactNotificationEmail = ({
  name,
  email,
  phone,
  company,
  subject,
  message,
  type,
  inquiryId,
  priority = 'normal',
}: ContactNotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>New {type} inquiry from {name} - {subject}</Preview>
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
        
        <Heading style={h1}>New Contact Inquiry</Heading>
        
        <Section style={alertContainer}>
          <Text style={alertText}>
            A new {type} inquiry has been submitted through the website contact form.
          </Text>
          {priority === 'high' || priority === 'urgent' ? (
            <div style={priorityBadge}>
              🚨 {priority.toUpperCase()} PRIORITY
            </div>
          ) : null}
        </Section>
        
        <Section style={inquiryContainer}>
          <Text style={sectionTitle}>Contact Information</Text>
          <div style={detailsGrid}>
            <Text style={detailItem}><strong>Name:</strong> {name}</Text>
            <Text style={detailItem}><strong>Email:</strong> {email}</Text>
            {phone && <Text style={detailItem}><strong>Phone:</strong> {phone}</Text>}
            {company && <Text style={detailItem}><strong>Company:</strong> {company}</Text>}
            <Text style={detailItem}><strong>Inquiry Type:</strong> {type.charAt(0).toUpperCase() + type.slice(1)}</Text>
            <Text style={detailItem}><strong>Reference ID:</strong> {inquiryId}</Text>
            <Text style={detailItem}><strong>Submitted:</strong> {new Date().toLocaleString()}</Text>
          </div>
        </Section>
        
        <Section style={inquiryContainer}>
          <Text style={sectionTitle}>Subject</Text>
          <div style={subjectBox}>
            {subject}
          </div>
        </Section>
        
        <Section style={inquiryContainer}>
          <Text style={sectionTitle}>Message</Text>
          <div style={messageBox}>
            {message}
          </div>
        </Section>
        
        <Section style={actionContainer}>
          <Text style={actionTitle}>Recommended Actions:</Text>
          <ul style={actionsList}>
            <li>Respond within 24 hours during business days</li>
            <li>Update inquiry status in admin dashboard</li>
            <li>Assign to appropriate team member if needed</li>
            {type === 'quote' && <li>Prepare detailed quote with pricing</li>}
            {type === 'support' && <li>Check for existing tickets or shipments</li>}
          </ul>
        </Section>
        
        <Section style={buttonContainer}>
          <Button style={button} href={`https://dcflogistics.com/admin/inquiries/${inquiryId}`}>
            View in Admin Dashboard
          </Button>
        </Section>
        
        <Section style={quickActions}>
          <Text style={quickActionsTitle}>Quick Actions:</Text>
          <div style={quickActionsGrid}>
            <Link href={`mailto:${email}?subject=Re: ${subject}`} style={quickActionLink}>
              Reply via Email
            </Link>
            {phone && (
              <Link href={`tel:${phone}`} style={quickActionLink}>
                Call Customer
              </Link>
            )}
            <Link href="https://dcflogistics.com/admin/inquiries" style={quickActionLink}>
              All Inquiries
            </Link>
          </div>
        </Section>
        
        <Section style={footer}>
          <Text style={footerText}>
            This notification was sent from the DCF Logistics website contact form.
          </Text>
          <Text style={footerText}>
            DCF Logistics Admin System | Automated Notification
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

const alertContainer = {
  backgroundColor: '#fff3cd',
  border: '1px solid #ffeaa7',
  borderRadius: '8px',
  margin: '0 40px 32px',
  padding: '16px',
  textAlign: 'center' as const,
}

const alertText = {
  color: '#856404',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
}

const priorityBadge = {
  backgroundColor: '#dc3545',
  borderRadius: '4px',
  color: '#ffffff',
  fontSize: '12px',
  fontWeight: 'bold',
  marginTop: '8px',
  padding: '4px 8px',
  display: 'inline-block',
}

const inquiryContainer = {
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  margin: '0 40px 24px',
  padding: '24px',
}

const sectionTitle = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
}

const detailsGrid = {
  display: 'grid',
  gap: '8px',
}

const detailItem = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
}

const subjectBox = {
  backgroundColor: '#ffffff',
  border: '1px solid #e1e5e9',
  borderRadius: '4px',
  color: '#333',
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '24px',
  padding: '12px',
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

const actionContainer = {
  margin: '32px 40px',
}

const actionTitle = {
  color: '#333',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
}

const actionsList = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '20px',
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

const quickActions = {
  backgroundColor: '#e9ecef',
  borderRadius: '8px',
  margin: '32px 40px',
  padding: '20px',
}

const quickActionsTitle = {
  color: '#333',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
}

const quickActionsGrid = {
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: '12px',
}

const quickActionLink = {
  backgroundColor: '#007cba',
  borderRadius: '4px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 'bold',
  padding: '8px 16px',
  textDecoration: 'none',
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

export default ContactNotificationEmail
