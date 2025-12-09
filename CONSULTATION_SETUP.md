# Schedule Consultation System - Implementation Guide

## Overview
A fully functional calendar-based consultation booking system has been integrated into your Contact page. Users can now schedule consultations directly through an intuitive multi-step modal interface.

## Features Implemented

### ✅ Frontend Components

#### 1. ConsultationBooking Component (`src/components/ConsultationBooking.tsx`)
- **Multi-step modal workflow:**
  - Step 1: Date selection with calendar (past dates disabled)
  - Step 2: Time slot selection (pre-defined slots with availability)
  - Step 3: User details collection (Name, Email, WhatsApp)

**Key Features:**
- Interactive calendar using `react-day-picker`
- Real-time validation (email format, WhatsApp number)
- Timezone support (IST - Indian Standard Time)
- Responsive design (mobile-friendly)
- Toast notifications for user feedback
- Form data management with React hooks

#### 2. Contact Page Enhancement (`src/pages/Contact.tsx`)
- New "Schedule Call" button alongside existing "Send via WhatsApp"
- Opens ConsultationBooking modal on click
- Maintains existing contact form functionality
- Dual CTA approach for better UX

## File Structure

```
src/
├── components/
│   ├── ConsultationBooking.tsx      (NEW - Booking modal component)
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
└── pages/
    ├── Contact.tsx                   (UPDATED - Added consultation button)
    └── ...
```

## Configuration

### Available Time Slots
Currently set to predefined slots in `ConsultationBooking.tsx`:
```typescript
const AVAILABLE_TIME_SLOTS: TimeSlot[] = [
  { time: '09:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: true },
  { time: '02:00 PM', available: true },
  { time: '03:00 PM', available: true },
  { time: '04:00 PM', available: true },
];
```

**To modify slots:**
1. Edit `AVAILABLE_TIME_SLOTS` array in `ConsultationBooking.tsx`
2. Change `time` property to desired time
3. Set `available` to `true` or `false`

## Backend Integration (Next Steps)

### API Endpoints to Create

#### 1. Create Booking
```
POST /api/consultation/book
```

**Request Body:**
```json
{
  "name": "User Name",
  "email": "user@email.com",
  "whatsapp": "+919999999999",
  "date": "2025-12-15",
  "time": "10:00 AM"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Consultation booked successfully",
  "bookingId": "uuid"
}
```

#### 2. Get Availability
```
GET /api/consultation/availability
```

**Response:**
```json
{
  "availableSlots": [
    {
      "date": "2025-12-15",
      "times": ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]
    }
  ]
}
```

### Database Schema

**consultation_bookings table:**
```sql
CREATE TABLE consultation_bookings (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(20) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status ENUM('BOOKED', 'CANCELLED') DEFAULT 'BOOKED',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**available_time_slots table:**
```sql
CREATE TABLE available_time_slots (
  id UUID PRIMARY KEY,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Notification System (To Implement)

### Email Notifications

**User Confirmation Email:**
- Subject: "Consultation Booking Confirmed – Yurekh Solutions"
- Content: Booking date, time, contact confirmation
- Recipient: User's email from form

**Admin Notification Email:**
- Subject: "New Consultation Booking Received"
- Recipient: yurekhsolutions@gmail.com
- Content: User name, email, WhatsApp, date, time

### WhatsApp Notifications

**User Confirmation:**
```
Hello {{name}},

Your consultation with Yurekh Solutions is confirmed.

Date: {{date}}
Time: {{time}}

We look forward to connecting with you.
```

**Recommended Providers:**
- Twilio WhatsApp API
- Meta WhatsApp Business API
- WATI / Interakt / Yellow.ai

## Integration Steps

### 1. Update ConsultationBooking Component

Replace the mock API call in the `handleSubmit` function:

```typescript
// Current (mock):
await new Promise(resolve => setTimeout(resolve, 1500));

// Replace with actual API call:
const response = await fetch('/api/consultation/book', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(bookingData)
});

if (!response.ok) {
  throw new Error('Booking failed');
}

const result = await response.json();
```

### 2. Fetch Available Slots (Optional)

Replace hardcoded slots with dynamic fetch:

```typescript
useEffect(() => {
  const fetchAvailability = async () => {
    const response = await fetch('/api/consultation/availability');
    const data = await response.json();
    // Update state with available slots
  };
  
  if (step === 'date') {
    fetchAvailability();
  }
}, [step]);
```

### 3. Add Validation

Currently validates:
- ✅ Email format
- ✅ WhatsApp number (basic numeric check)
- ✅ Required fields

**To add CAPTCHA:**
```typescript
import ReCAPTCHA from "react-google-recaptcha";

// Add to form and validate before submission
```

## Styling

### Color Scheme
- Primary: `#c3a14b` (Gold)
- Secondary: `#1f2937` (Slate)
- Accent: `#3b82f6` (Blue)

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly form inputs

## Testing Checklist

- [ ] Desktop view works correctly
- [ ] Mobile view is responsive
- [ ] Date selection prevents past dates
- [ ] Time slot selection updates correctly
- [ ] Form validation catches invalid inputs
- [ ] Submission shows success toast
- [ ] Modal closes after booking
- [ ] Back buttons navigate correctly
- [ ] Cancel button closes modal
- [ ] API integration works

## Troubleshooting

### Calendar not displaying
- Ensure `react-day-picker` CSS is imported
- Check browser console for errors

### Form validation not working
- Verify regex patterns for email/WhatsApp
- Check console for validation errors

### Modal not opening
- Verify `isConsultationModalOpen` state is being toggled
- Check onClick handler on "Schedule Call" button

## Future Enhancements

- [ ] Google Calendar sync
- [ ] Zoom/Google Meet auto-link generation
- [ ] Automatic reminder emails
- [ ] Admin dashboard for booking management
- [ ] CRM integration
- [ ] Multi-language support
- [ ] Recurring slots automation
- [ ] SMS confirmations
- [ ] Calendar timezone detection

## Support

For API integration questions or issues, refer to the Schedule Consultation System.pdf document included in the project.

**Admin Email for Notifications:** yurekhsolutions@gmail.com
