import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactNotificationEmail: React.FC<Readonly<ContactEmailProps>> = ({
  name,
  email,
  message,
}) => (
  <Html>
    <Head />
    <Preview>New contact from {name}</Preview>
    <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f0f0' }}>
      <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff' }}>
        <Section style={{ backgroundColor: '#101010', padding: '20px', textAlign: 'center' }}>
          <Heading style={{ color: '#A9FF5B', margin: 0, fontFamily: 'Bungee, sans-serif', fontSize: '24px' }}>
            News AI
          </Heading>
        </Section>

        <Section style={{ padding: '30px' }}>
          <Heading style={{ color: '#101010', marginTop: 0, fontSize: '20px' }}>
            New Contact Form Submission
          </Heading>

          <div style={{ marginBottom: '20px' }}>
            <Text style={{ color: '#666', fontSize: '14px', margin: '5px 0', fontWeight: 'bold' }}>FROM:</Text>
            <Text style={{ color: '#101010', fontSize: '16px', fontWeight: 'bold', margin: '5px 0' }}>
              {name}
            </Text>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Text style={{ color: '#666', fontSize: '14px', margin: '5px 0', fontWeight: 'bold' }}>EMAIL:</Text>
            <Text style={{ color: '#101010', fontSize: '16px', margin: '5px 0' }}>
              <Link href={`mailto:${email}`} style={{ color: '#a476ff', textDecoration: 'none' }}>
                {email}
              </Link>
            </Text>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Text style={{ color: '#666', fontSize: '14px', margin: '5px 0', fontWeight: 'bold' }}>MESSAGE:</Text>
            <div style={{
              backgroundColor: '#f5f5f5',
              padding: '15px',
              borderRadius: '8px',
              borderLeft: '4px solid #A9FF5B'
            }}>
              <Text style={{ color: '#101010', fontSize: '14px', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap' }}>
                {message}
              </Text>
            </div>
          </div>

          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e5e5' }}>
            <Text style={{ color: '#999', fontSize: '12px', margin: 0 }}>
              Reply directly to this email to respond to {name}
            </Text>
          </div>
        </Section>

        <Section style={{ backgroundColor: '#f5f5f5', padding: '20px', textAlign: 'center' }}>
          <Text style={{ color: '#666', fontSize: '12px', margin: 0 }}>
            This email was sent from the News AI contact form
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// Plain text version for email clients that don't support HTML
export const ContactNotificationText = ({ name, email, message }: ContactEmailProps) => `
NEW CONTACT FORM SUBMISSION

From: ${name}
Email: ${email}

Message:
${message}

---
Reply to this email to respond to ${name}
`;
