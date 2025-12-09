/**
 * Email Service for Consultation Notifications
 * Sends confirmation emails to users and admin notifications
 * 
 * Supports: Gmail SMTP, SendGrid, AWS SES, Zoho Mail
 */

import nodemailer from 'nodemailer';

interface ConsultationEmail {
  name: string;
  email: string;
  whatsapp: string;
  date: string;
  time: string;
  bookingId?: string;
}

interface EmailConfig {
  service: 'gmail' | 'sendgrid' | 'ses' | 'zoho';
  from: string;
  adminEmail: string;
}

// Email configuration - should be in environment variables
const emailConfig: EmailConfig = {
  service: process.env.EMAIL_SERVICE as any || 'gmail',
  from: process.env.EMAIL_FROM || 'noreply@jbslegal.com',
  adminEmail: process.env.ADMIN_EMAIL || 'yurekhsolutions@gmail.com',
};

// Initialize nodemailer transporter based on service
function getTransporter() {
  if (emailConfig.service === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  } else if (emailConfig.service === 'sendgrid') {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  } else if (emailConfig.service === 'ses') {
    return nodemailer.createTransport({
      host: process.env.SES_HOST || 'email-smtp.us-east-1.amazonaws.com',
      port: 587,
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASSWORD,
      },
    });
  } else if (emailConfig.service === 'zoho') {
    return nodemailer.createTransport({
      host: process.env.ZOHO_HOST || 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASSWORD,
      },
    });
  }
  
  throw new Error('Invalid email service configured');
}

/**
 * User Confirmation Email Template
 */
function getUserConfirmationTemplate(data: ConsultationEmail): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #c3a14b 0%, #d4af37 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
    .header h1 { color: white; margin: 0; font-size: 28px; }
    .content { background: #f8f9fa; padding: 40px 30px; border-radius: 0 0 12px 12px; }
    .booking-details { background: white; padding: 20px; border-left: 4px solid #c3a14b; margin: 20px 0; border-radius: 8px; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { font-weight: 600; color: #333; }
    .detail-value { color: #666; }
    .cta-button { display: inline-block; background: #c3a14b; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
    .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
    .timezone { background: #e3f2fd; padding: 12px; border-radius: 6px; margin: 15px 0; font-size: 13px; color: #1976d2; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ Consultation Confirmed</h1>
    </div>
    
    <div class="content">
      <p>Hi ${data.name},</p>
      
      <p>Thank you for scheduling a consultation with <strong>JBS Legal - Yurekh Solutions</strong>. Your booking has been confirmed and we're excited to connect with you!</p>
      
      <div class="booking-details">
        <h3 style="margin-top: 0; color: #333;">Booking Details</h3>
        <div class="detail-row">
          <span class="detail-label">📅 Date:</span>
          <span class="detail-value">${formatDateForEmail(data.date)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">🕐 Time:</span>
          <span class="detail-value">${data.time}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">📱 Confirmation:</span>
          <span class="detail-value">Sent to +${data.whatsapp}</span>
        </div>
        ${data.bookingId ? `<div class="detail-row">
          <span class="detail-label">Reference ID:</span>
          <span class="detail-value">${data.bookingId}</span>
        </div>` : ''}
      </div>
      
      <div class="timezone">
        ⏰ <strong>Timezone:</strong> IST (Indian Standard Time, UTC+5:30)
      </div>
      
      <h3 style="color: #333; margin-top: 30px;">What to Expect:</h3>
      <ul style="color: #666; line-height: 1.8;">
        <li>You'll receive a meeting link via email and WhatsApp before the consultation</li>
        <li>Ensure you have a stable internet connection</li>
        <li>Join 5 minutes early for a smooth experience</li>
        <li>Our legal experts will be ready to address all your concerns</li>
      </ul>
      
      <h3 style="color: #333; margin-top: 30px;">Need to Reschedule?</h3>
      <p>If you need to change your appointment, please reply to this email or contact us immediately at:</p>
      <ul style="color: #666;">
        <li>📧 <strong>Email:</strong> info@jbslegal.com</li>
        <li>📱 <strong>WhatsApp:</strong> <a href="https://wa.me/917203881108" style="color: #c3a14b; text-decoration: none;">+91 72038 81108</a></li>
      </ul>
      
      <p style="margin-top: 40px; color: #666;">
        Best regards,<br>
        <strong>JBS Legal - Yurekh Solutions</strong><br>
        <em>Expert Legal Solutions, Professional Advisory Services</em>
      </p>
    </div>
    
    <div class="footer">
      <p>This is an automated confirmation email. Please do not reply with sensitive information.</p>
      <p>&copy; 2025 JBS Legal. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Admin Notification Email Template
 */
function getAdminNotificationTemplate(data: ConsultationEmail): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 6px; margin-bottom: 20px; }
    .alert h2 { margin: 0 0 10px 0; color: #856404; }
    .booking-card { background: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .booking-card h3 { margin: 0 0 15px 0; color: #333; }
    .field { margin-bottom: 12px; }
    .field-label { font-weight: 600; color: #555; font-size: 12px; text-transform: uppercase; }
    .field-value { color: #333; font-size: 14px; margin-top: 4px; }
    .action-buttons { margin-top: 20px; }
    .btn { display: inline-block; padding: 10px 20px; margin-right: 10px; border-radius: 4px; text-decoration: none; font-weight: 600; }
    .btn-primary { background: #c3a14b; color: white; }
    .btn-secondary { background: #f0f0f0; color: #333; }
  </style>
</head>
<body>
  <div class="container">
    <div class="alert">
      <h2>🔔 New Consultation Booking</h2>
      <p>A new consultation booking has been received and is awaiting your confirmation.</p>
    </div>
    
    <div class="booking-card">
      <h3>Client Information</h3>
      
      <div class="field">
        <div class="field-label">📛 Name</div>
        <div class="field-value">${data.name}</div>
      </div>
      
      <div class="field">
        <div class="field-label">📧 Email</div>
        <div class="field-value"><a href="mailto:${data.email}" style="color: #c3a14b; text-decoration: none;">${data.email}</a></div>
      </div>
      
      <div class="field">
        <div class="field-label">📱 WhatsApp</div>
        <div class="field-value"><a href="https://wa.me/${data.whatsapp.replace(/\D/g, '')}" style="color: #c3a14b; text-decoration: none;">+${data.whatsapp}</a></div>
      </div>
    </div>
    
    <div class="booking-card">
      <h3>Scheduled Consultation</h3>
      
      <div class="field">
        <div class="field-label">📅 Date</div>
        <div class="field-value">${formatDateForEmail(data.date)}</div>
      </div>
      
      <div class="field">
        <div class="field-label">🕐 Time</div>
        <div class="field-value">${data.time} IST</div>
      </div>
      
      ${data.bookingId ? `<div class="field">
        <div class="field-label">Reference ID</div>
        <div class="field-value">${data.bookingId}</div>
      </div>` : ''}
    </div>
    
    <div class="action-buttons">
      <a href="mailto:${data.email}" class="btn btn-primary">Send Meeting Link</a>
      <a href="https://wa.me/${data.whatsapp.replace(/\D/g, '')}" class="btn btn-secondary">Message on WhatsApp</a>
    </div>
    
    <p style="margin-top: 30px; color: #999; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px;">
      This is an automated notification. Reply to client emails at info@jbslegal.com
    </p>
  </div>
</body>
</html>
  `;
}

/**
 * Format date for email display
 */
function formatDateForEmail(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Send user confirmation email
 */
export async function sendUserConfirmationEmail(bookingData: ConsultationEmail): Promise<boolean> {
  try {
    const transporter = getTransporter();
    
    const mailOptions = {
      from: emailConfig.from,
      to: bookingData.email,
      subject: 'Consultation Booking Confirmed – JBS Legal | Yurekh Solutions',
      html: getUserConfirmationTemplate(bookingData),
      replyTo: emailConfig.adminEmail,
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log(`User confirmation email sent to ${bookingData.email}:`, result.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send user confirmation email:', error);
    return false;
  }
}

/**
 * Send admin notification email
 */
export async function sendAdminNotificationEmail(bookingData: ConsultationEmail): Promise<boolean> {
  try {
    const transporter = getTransporter();
    
    const mailOptions = {
      from: emailConfig.from,
      to: emailConfig.adminEmail,
      subject: `New Consultation Booking – ${bookingData.name}`,
      html: getAdminNotificationTemplate(bookingData),
      replyTo: bookingData.email,
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log(`Admin notification email sent to ${emailConfig.adminEmail}:`, result.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send admin notification email:', error);
    return false;
  }
}

/**
 * Send both user and admin emails
 */
export async function sendConsultationEmails(bookingData: ConsultationEmail): Promise<{ user: boolean; admin: boolean }> {
  const [userEmailSent, adminEmailSent] = await Promise.all([
    sendUserConfirmationEmail(bookingData),
    sendAdminNotificationEmail(bookingData),
  ]);
  
  return { user: userEmailSent, admin: adminEmailSent };
}
