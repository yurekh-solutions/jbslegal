# Email Notification System Setup Guide

## Overview
Your consultation booking system now includes professional email notifications similar to Google Meet. Users receive beautiful HTML confirmation emails, and the admin gets notified of new bookings.

## Features

### ✅ User Confirmation Email
- Professional, branded HTML template
- Booking details (date, time, reference ID)
- Meeting preparation instructions
- Timezone information
- Rescheduling instructions
- WhatsApp contact link

### ✅ Admin Notification Email
- New booking alert
- Client contact information
- Quick action buttons (Send Email, Message WhatsApp)
- Reference ID for tracking
- Email timestamp

## File Structure

```
backend-services/
├── emailService.ts          # Email sending service
└── consultationRoutes.ts    # API endpoints

src/components/
└── ConsultationBooking.tsx  (Updated - now calls API)

.env.example                 # Configuration template
```

## Setup Instructions

### Step 1: Install Dependencies

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### Step 2: Choose Email Provider

#### Option A: Gmail (Recommended for Testing)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Windows Computer"
5. Google will generate a 16-character password
6. Copy this password

**Add to .env.local:**
```
EMAIL_SERVICE=gmail
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-16-char-app-password
```

#### Option B: SendGrid (Professional)

1. Create [SendGrid account](https://sendgrid.com)
2. Go to Settings > API Keys
3. Create new API key
4. Copy the key

**Add to .env.local:**
```
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=SG.your-api-key
```

#### Option C: AWS SES

1. Set up [AWS SES](https://aws.amazon.com/ses/)
2. Verify sender email address
3. Get SMTP credentials from AWS Console

**Add to .env.local:**
```
EMAIL_SERVICE=ses
SES_HOST=email-smtp.us-east-1.amazonaws.com
SES_USER=your-username
SES_PASSWORD=your-password
```

#### Option D: Zoho Mail

1. Create [Zoho account](https://www.zoho.com/mail/)
2. Generate app password in security settings

**Add to .env.local:**
```
EMAIL_SERVICE=zoho
ZOHO_HOST=smtp.zoho.com
ZOHO_USER=your-email@zoho.com
ZOHO_PASSWORD=your-app-password
```

### Step 3: Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your email provider credentials:

```env
EMAIL_SERVICE=gmail
EMAIL_FROM=noreply@jbslegal.com
ADMIN_EMAIL=yurekhsolutions@gmail.com

# Gmail credentials
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password

# Database (optional for now)
DATABASE_URL=mysql://user:password@localhost:3306/consultation_db
```

### Step 4: Integrate Backend API

Create your backend server (Node.js + Express recommended):

```typescript
// server.ts
import express from 'express';
import cors from 'cors';
import consultationRoutes from './backend-services/consultationRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/consultation', consultationRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### Step 5: Test the Integration

1. Go to Contact page on your website
2. Click "Schedule Call" button
3. Select date, time, and fill in details
4. Submit the form
5. Check email inbox for confirmation

**Check logs:**
```bash
# User email confirmation
console.log(`User confirmation email sent to ${email}`);

# Admin notification
console.log(`Admin notification email sent to admin@email.com`);
```

## Email Templates

### Template Components

Both emails include:
- Professional branding with company colors (#c3a14b gold)
- Responsive design (works on mobile & desktop)
- Clear typography with sans-serif fonts
- Call-to-action buttons
- Contact information
- Footer with disclaimer

### User Confirmation Email

```
Subject: Consultation Booking Confirmed – JBS Legal | Yurekh Solutions

Content:
- Greeting with user name
- Booking details (date, time, reference ID)
- Meeting preparation guide
- Timezone information (IST)
- Rescheduling instructions
- Contact methods
- Footer with automated email notice
```

### Admin Notification Email

```
Subject: New Consultation Booking – {User Name}

Content:
- Alert header
- Client information with email/WhatsApp links
- Scheduled consultation details
- Quick action buttons
- Reply instructions
```

## API Endpoints

### POST /api/consultation/book

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "whatsapp": "919876543210",
  "date": "2025-12-15",
  "time": "10:00 AM"
}
```

**Response (Success):**
```json
{
  "status": "success",
  "message": "Consultation booked successfully",
  "bookingId": "CONSULT-1702555800000-ABC123XYZ",
  "confirmationSent": {
    "email": true,
    "adminNotified": true
  }
}
```

**Response (Error):**
```json
{
  "status": "error",
  "message": "Invalid email format"
}
```

### GET /api/consultation/availability

Returns available time slots for the next 30 days.

**Response:**
```json
{
  "status": "success",
  "availableSlots": [
    {
      "date": "2025-12-15",
      "times": ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]
    }
  ]
}
```

## Database Schema (Optional)

If you want to store bookings:

```sql
CREATE TABLE consultation_bookings (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(20) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status ENUM('BOOKED', 'CANCELLED') DEFAULT 'BOOKED',
  booking_reference VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_date (date),
  UNIQUE KEY unique_booking (date, time)
);

CREATE TABLE admin_notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id VARCHAR(50),
  notification_sent BOOLEAN DEFAULT false,
  sent_at TIMESTAMP,
  response_status VARCHAR(50),
  FOREIGN KEY (booking_id) REFERENCES consultation_bookings(id)
);
```

## Troubleshooting

### Email Not Sending

**Check:**
1. Environment variables are loaded correctly
2. Email provider credentials are valid
3. Server logs for error messages

**Gmail Issues:**
- App password must be 16 characters
- 2-Step Verification must be enabled
- Less secure apps must be disabled (use App Passwords instead)

**SendGrid Issues:**
- API key must be valid and not revoked
- Sender email must be verified in SendGrid

### Emails Going to Spam

**Solutions:**
1. Set up SPF/DKIM records in DNS
2. Add reply-to email address
3. Use branded from address
4. Verify sender email in provider

### Database Connection Issues

- Ensure DATABASE_URL is correct
- Check database credentials
- Verify database exists and is accessible

## Security Considerations

1. **Never commit .env files** - Use .env.example as template
2. **Rotate API keys regularly** - SendGrid, AWS, etc.
3. **Use environment variables** for all sensitive data
4. **Validate all inputs** - Already implemented in API
5. **Rate limit bookings** - Prevent spam (TODO)
6. **Use HTTPS only** - Encrypt all data in transit
7. **Add CAPTCHA** - Optional but recommended (TODO)

## Email Customization

Edit `emailService.ts` to customize templates:

```typescript
// User email greeting
Hello ${data.name},

// Subject line
subject: `Consultation Booking Confirmed – JBS Legal`

// Colors
background: linear-gradient(135deg, #c3a14b 0%, #d4af37 100%);

// Company details
<strong>JBS Legal - Yurekh Solutions</strong>
```

## Next Steps

1. ✅ Set up email provider credentials
2. ✅ Configure environment variables
3. ✅ Install nodemailer package
4. ✅ Create backend server
5. ⏳ Test email sending
6. ⏳ Add database integration (optional)
7. ⏳ Set up WhatsApp notifications (optional)
8. ⏳ Add CAPTCHA protection (optional)
9. ⏳ Set up email reminder system (optional)

## Support

For issues or questions:
- Check browser console for client-side errors
- Check server logs for backend errors
- Verify email provider credentials
- Test with test email address first

**Contact:** info@jbslegal.com | +91 72038 81108
