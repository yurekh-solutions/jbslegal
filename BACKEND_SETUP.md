# Backend Server Setup - Quick Start Guide

## 🚀 Get Your Email Notifications Working in 5 Minutes

### Step 1: Set Up Gmail App Password (2 minutes)

1. **Go to Google Account:**
   - Visit: https://myaccount.google.com/apppasswords
   - You may need to sign in first

2. **Enable 2-Step Verification (if not already done):**
   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow the steps

3. **Generate App Password:**
   - Go back to https://myaccount.google.com/apppasswords
   - Select: **Mail** → **Windows Computer**
   - Google will show a 16-character password
   - Copy this password (e.g., `abcd efgh ijkl mnop`)

### Step 2: Configure Environment Variables (1 minute)

Open `.env.local` in your project root and replace:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-16-char-app-password
```

**Example:**
```env
GMAIL_USER=yurekh@gmail.com
GMAIL_PASSWORD=abcd efgh ijkl mnop
```

Save the file.

### Step 3: Start the Backend Server (1 minute)

Open a **NEW terminal** and run:

```bash
npm run dev:server
```

You should see:

```
✨ JBS Legal Consultation Server running on http://localhost:5000

📧 Email Service: GMAIL
📬 Admin Email: yurekhsolutions@gmail.com

🔗 Available Endpoints:
   POST /api/consultation/book
   GET  /api/consultation/availability
   GET  /api/health

⏹️  Press Ctrl+C to stop the server
```

### Step 4: Start Your Frontend (in a different terminal)

Keep the server running and open another terminal:

```bash
npm run dev
```

Your website should open at: `http://localhost:5173`

### Step 5: Test It! (1 minute)

1. Go to your website (http://localhost:5173)
2. Scroll to **Contact** page
3. Click **"Schedule Call"** button
4. Fill in the form:
   - **Name:** Your Name
   - **Email:** Your actual email address
   - **WhatsApp:** Your phone number (10+ digits)
5. Click **Submit**

### Expected Result ✅

- **Frontend:** "Consultation booked successfully! Confirmation email sent to your-email@gmail.com"
- **Server Console:** Shows "✅ User confirmation email sent to..."
- **Your Email Inbox:** Receive beautiful HTML confirmation email

## 🐛 Troubleshooting

### Error: "Failed to load resource: 404"

**Problem:** Server is not running

**Solution:**
```bash
# Make sure server is running with:
npm run dev:server

# You should see the startup message
```

### Error: "Invalid App Password"

**Problem:** Wrong password copied

**Solution:**
1. Go back to https://myaccount.google.com/apppasswords
2. Generate a NEW password
3. Copy the 16-character password (including spaces)
4. Update `.env.local`
5. Restart server: Press `Ctrl+C` then run `npm run dev:server` again

### Error: "Email not sending" but no error message

**Problem:** Gmail account may not have 2-Step Verification

**Solution:**
1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Use App Passwords, NOT your regular Gmail password
3. Restart the server

### Error: "GMAIL_USER is undefined"

**Problem:** Environment variables not loaded

**Solution:**
1. Check `.env.local` file exists in project root
2. Verify you added both `GMAIL_USER` and `GMAIL_PASSWORD`
3. Restart the server
4. If still not working, check the file isn't named `.env` or other variants

## 🎯 What's Happening Behind the Scenes

```
User fills form on website
        ↓
Frontend sends to: POST /api/consultation/book
        ↓
Backend receives and validates data
        ↓
Backend connects to Gmail SMTP
        ↓
Sends 2 emails:
  1️⃣  Confirmation to user (beautiful HTML email)
  2️⃣  Notification to admin (yurekhsolutions@gmail.com)
        ↓
Frontend shows success message
```

## 📧 Email Preview

### User Receives:

```
Subject: Consultation Booking Confirmed – JBS Legal

✓ Consultation Confirmed

Hi [Your Name],

Your consultation has been confirmed!

📅 Date: Monday, December 15, 2025
🕐 Time: 10:00 AM
📱 Confirmation: Sent to +919876543210

[Professional HTML template with branding]
```

### Admin Receives:

```
Subject: New Consultation Booking – [Your Name]

🔔 New Consultation Booking

Client Information:
- Name: [Your Name]
- Email: [Your Email]
- WhatsApp: [Your Number]

Scheduled Consultation:
- Date: Monday, December 15, 2025
- Time: 10:00 AM
```

## 🔄 Run Both Servers Together

**Terminal 1 - Backend Server:**
```bash
npm run dev:server
```

**Terminal 2 - Frontend Server:**
```bash
npm run dev
```

Both should run simultaneously. The frontend talks to the backend automatically.

## 🛑 Stop Servers

- Press `Ctrl+C` in each terminal to stop

## 💡 Pro Tips

### Tip 1: Test Different Emails
- First test with YOUR email
- Then test with a colleague's email
- Check both your inbox AND spam folder

### Tip 2: Check Server Logs
Watch the server terminal to see:
```
✅ User confirmation email sent to john@example.com
✅ Admin notification email sent to yurekhsolutions@gmail.com
Booking created: { id: 'CONSULT-...', date: '2025-12-15', ... }
```

### Tip 3: Use Your Own Email
In `.env.local`, change:
```env
ADMIN_EMAIL=your-email@gmail.com
```
To receive admin notifications at your email instead.

### Tip 4: Different Email Providers
You can also use:
- **SendGrid** (requires API key)
- **AWS SES** (requires AWS account)
- **Zoho Mail** (requires Zoho account)

See `EMAIL_SETUP.md` for detailed instructions.

## 🚀 Next Steps (Optional)

Once emails are working:

1. **Deploy to Production:**
   - Deploy frontend to Vercel/Netlify
   - Deploy backend to Heroku/Railway/Render
   - Update API URL in frontend

2. **Add Database:**
   - Save bookings to MySQL/PostgreSQL
   - Track booking history
   - See `EMAIL_SETUP.md` for schema

3. **Enhance Features:**
   - Add SMS notifications (WhatsApp)
   - Add calendar reminders
   - Add meeting link generation
   - Add rescheduling functionality

## 📞 Support

If you encounter issues:

1. Check server logs (Terminal running `npm run dev:server`)
2. Check browser console (DevTools → Console)
3. Verify `.env.local` file has correct credentials
4. Ensure Gmail 2-Step Verification is enabled
5. Try generating a new App Password

---

**Your consultation booking system is now fully functional with professional email notifications!** 🎉

Questions? Check `EMAIL_SETUP.md` for more detailed information.
