import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { saveContact, NewContact } from '@/lib/db/client';
import { ContactNotificationEmail, ContactNotificationText } from '@/lib/email/contact-notification';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Trim and validate lengths
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2 || trimmedName.length > 255) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 255 characters' },
        { status: 400 }
      );
    }

    if (trimmedMessage.length < 10 || trimmedMessage.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    const contact: NewContact = {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    };

    // Save to database
    const savedContact = await saveContact(contact);

    // Send email notification (don't block if it fails)
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #101010; padding: 20px; text-align: center;">
              <h1 style="color: #A9FF5B; margin: 0;">News AI</h1>
            </div>
            <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e5e5;">
              <h2 style="color: #101010; margin-top: 0;">New Contact Form Submission</h2>

              <div style="margin-bottom: 20px;">
                <p style="color: #666; font-size: 14px; margin: 5px 0; font-weight: bold;">FROM:</p>
                <p style="color: #101010; font-size: 16px; font-weight: bold; margin: 5px 0;">${trimmedName}</p>
              </div>

              <div style="margin-bottom: 20px;">
                <p style="color: #666; font-size: 14px; margin: 5px 0; font-weight: bold;">EMAIL:</p>
                <p style="color: #101010; font-size: 16px; margin: 5px 0;">
                  <a href="mailto:${trimmedEmail}" style="color: #a476ff; text-decoration: none;">${trimmedEmail}</a>
                </p>
              </div>

              <div style="margin-bottom: 20px;">
                <p style="color: #666; font-size: 14px; margin: 5px 0; font-weight: bold;">MESSAGE:</p>
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; border-left: 4px solid #A9FF5B;">
                  <p style="color: #101010; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${trimmedMessage}</p>
                </div>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
                <p style="color: #999; font-size: 12px; margin: 0;">Reply directly to this email to respond to ${trimmedName}</p>
              </div>
            </div>
            <div style="background-color: #f5f5f5; padding: 20px; text-align: center;">
              <p style="color: #666; font-size: 12px; margin: 0;">This email was sent from the News AI contact form</p>
            </div>
          </div>
        `;

        const result = await resend.emails.send({
          from: 'News AI <onboarding@resend.dev>',
          to: process.env.NOTIFICATION_EMAIL,
          replyTo: trimmedEmail,
          subject: `New Contact: ${trimmedName}`,
          html: emailHtml,
        });

        console.log('Email sent successfully. Resend ID:', result.data?.id);
      } catch (emailError: any) {
        console.error('Failed to send email notification:', emailError);
        console.error('Error details:', emailError.message);
      }
    }

    return NextResponse.json({
      data: savedContact,
      error: null,
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    return NextResponse.json(
      {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to send message',
      },
      { status: 500 }
    );
  }
}
