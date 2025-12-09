/**
 * JBS Legal - Consultation Booking Server
 * Handles API requests and email notifications
 */

import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { format } from 'date-fns';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
const emailConfig = {
  service: process.env.EMAIL_SERVICE || 'gmail',
  from: process.env.EMAIL_FROM || 'noreply@jbslegal.com',
  adminEmail: process.env.ADMIN_EMAIL || 'yurekhsolutions@gmail.com',
};

// Initialize email transporter based on service
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
  }
  // Default to Gmail for demo
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
}

// User confirmation email template
function getUserConfirmationTemplate(data: any): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #c3a14b 0%, #d4af37 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; color: white; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { background: #f8f9fa; padding: 40px 30px; border-radius: 0 0 12px 12px; }
    .booking-details { background: white; padding: 20px; border-left: 4px solid #c3a14b; margin: 20px 0; border-radius: 8px; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
    .detail-label { font-weight: 600; color: #333; }
    .detail-value { color: #666; }
    .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ Consultation Confirmed</h1>
    </div>
    
    <div class="content">
      <p>Hi ${data.name},</p>
      
      <p>Thank you for scheduling a consultation with <strong>JBS Legal - Yurekh Solutions</strong>. Your booking has been confirmed!</p>
      
      <div class="booking-details">
        <h3 style="margin-top: 0; color: #333;">Booking Details</h3>
        <div class="detail-row">
          <span class="detail-label">📅 Date:</span>
          <span class="detail-value">${formatDateForEmail(data.date)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">🕐 Time:</span>
          <span class="detail-value">${data.time} IST</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Booking ID:</span>
          <span class="detail-value">${data.bookingId}</span>
        </div>
      </div>
      
      <p style="color: #666;">We look forward to connecting with you. You will receive a meeting link via email before your scheduled consultation.</p>
      
      <p style="margin-top: 40px; color: #666;">
        Best regards,<br>
        <strong>JBS Legal - Yurekh Solutions</strong><br>
        <em>Expert Legal Solutions</em>
      </p>
    </div>
    
    <div class="footer">
      <p>&copy; 2025 JBS Legal. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

// Admin notification email template
function getAdminNotificationTemplate(data: any): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 6px; margin-bottom: 20px; }
    .booking-card { background: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .field { margin-bottom: 12px; }
    .field-label { font-weight: 600; color: #555; font-size: 12px; text-transform: uppercase; }
    .field-value { color: #333; font-size: 14px; margin-top: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="alert">
      <h2 style="margin: 0 0 10px 0;">🔔 New Consultation Booking</h2>
      <p>A new consultation booking has been received.</p>
    </div>
    
    <div class="booking-card">
      <h3>Client Information</h3>
      <div class="field">
        <div class="field-label">Name</div>
        <div class="field-value">${data.name}</div>
      </div>
      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="field-label">WhatsApp</div>
        <div class="field-value"><a href="https://wa.me/${data.whatsapp.replace(/\D/g, '')}">${data.whatsapp}</a></div>
      </div>
    </div>
    
    <div class="booking-card">
      <h3>Scheduled Consultation</h3>
      <div class="field">
        <div class="field-label">Date</div>
        <div class="field-value">${formatDateForEmail(data.date)}</div>
      </div>
      <div class="field">
        <div class="field-label">Time</div>
        <div class="field-value">${data.time} IST</div>
      </div>
      <div class="field">
        <div class="field-label">Booking ID</div>
        <div class="field-value">${data.bookingId}</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

// Format date for email
function formatDateForEmail(dateString: string): string {
  try {
    const date = new Date(dateString);
    return format(date, 'EEEE, MMMM dd, yyyy');
  } catch {
    return dateString;
  }
}

// Validation function
function validateBooking(data: any): { valid: boolean; error?: string } {
  if (!data.name || !data.email || !data.whatsapp || !data.date || !data.time) {
    return { valid: false, error: 'Missing required fields' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  const whatsappRegex = /^[0-9]{10,}$/;
  if (!whatsappRegex.test(data.whatsapp.replace(/\D/g, ''))) {
    return { valid: false, error: 'Invalid WhatsApp number' };
  }

  return { valid: true };
}

// POST /api/consultation/book
app.post('/api/consultation/book', async (req: Request, res: Response) => {
  try {
    const bookingData = req.body;

    // Validate input
    const validation = validateBooking(bookingData);
    if (!validation.valid) {
      return res.status(400).json({
        status: 'error',
        message: validation.error,
      });
    }

    // Generate booking ID
    const bookingId = `CONSULT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Send emails
    let userEmailSent = false;
    let adminEmailSent = false;

    try {
      const transporter = getTransporter();

      // Send user confirmation email
      await transporter.sendMail({
        from: emailConfig.from,
        to: bookingData.email,
        subject: 'Consultation Booking Confirmed – JBS Legal',
        html: getUserConfirmationTemplate({ ...bookingData, bookingId }),
        replyTo: emailConfig.adminEmail,
      });
      userEmailSent = true;
      console.log(`✅ User confirmation email sent to ${bookingData.email}`);

      // Send admin notification email
      await transporter.sendMail({
        from: emailConfig.from,
        to: emailConfig.adminEmail,
        subject: `New Consultation Booking – ${bookingData.name}`,
        html: getAdminNotificationTemplate({ ...bookingData, bookingId }),
        replyTo: bookingData.email,
      });
      adminEmailSent = true;
      console.log(`✅ Admin notification email sent to ${emailConfig.adminEmail}`);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Continue even if email fails
    }

    // Send success response
    res.status(201).json({
      status: 'success',
      message: 'Consultation booked successfully',
      bookingId: bookingId,
      confirmationSent: {
        email: userEmailSent,
        adminNotified: adminEmailSent,
      },
    });

    console.log('Booking created:', {
      id: bookingId,
      name: bookingData.name,
      email: bookingData.email,
      date: bookingData.date,
      time: bookingData.time,
      emailsSent: { user: userEmailSent, admin: adminEmailSent },
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create booking. Please try again.',
    });
  }
});

// GET /api/consultation/availability
app.get('/api/consultation/availability', (req: Request, res: Response) => {
  try {
    const availableSlots = [
      { date: '2025-12-15', times: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'] },
      { date: '2025-12-16', times: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'] },
      { date: '2025-12-17', times: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'] },
      { date: '2025-12-18', times: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'] },
      { date: '2025-12-19', times: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM'] },
    ];

    res.json({
      status: 'success',
      availableSlots,
    });
  } catch (error) {
    console.error('Availability error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch availability',
    });
  }
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'JBS Legal Consultation API is running',
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✨ JBS Legal Consultation Server running on http://localhost:${PORT}`);
  console.log(`\n📧 Email Service: ${emailConfig.service.toUpperCase()}`);
  console.log(`📬 Admin Email: ${emailConfig.adminEmail}`);
  console.log(`\n🔗 Available Endpoints:`);
  console.log(`   POST /api/consultation/book`);
  console.log(`   GET  /api/consultation/availability`);
  console.log(`   GET  /api/health`);
  console.log(`\n⏹️  Press Ctrl+C to stop the server\n`);
});
