/**
 * Consultation Booking API Endpoint
 * Handles booking creation and email notifications
 * 
 * POST /api/consultation/book
 */

import express, { Request, Response } from 'express';
import { sendConsultationEmails } from '../emailService';

const router = express.Router();

interface BookingRequest {
  name: string;
  email: string;
  whatsapp: string;
  date: string;
  time: string;
}

/**
 * Validate booking data
 */
function validateBooking(data: BookingRequest): { valid: boolean; error?: string } {
  if (!data.name || !data.email || !data.whatsapp || !data.date || !data.time) {
    return { valid: false, error: 'Missing required fields' };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // WhatsApp validation (10+ digits)
  const whatsappRegex = /^[0-9]{10,}$/;
  if (!whatsappRegex.test(data.whatsapp.replace(/\D/g, ''))) {
    return { valid: false, error: 'Invalid WhatsApp number' };
  }

  // Date validation
  const bookingDate = new Date(data.date);
  const today = new Date();
  if (bookingDate <= today) {
    return { valid: false, error: 'Date must be in the future' };
  }

  return { valid: true };
}

/**
 * Check if slot is available
 */
async function isSlotAvailable(date: string, time: string): Promise<boolean> {
  // TODO: Query database to check if slot is booked
  // This is a placeholder - implement with your database
  return true;
}

/**
 * Create booking in database
 */
async function createBooking(data: BookingRequest): Promise<{ id: string; success: boolean }> {
  // TODO: Insert booking into consultation_bookings table
  // This is a placeholder - implement with your database
  
  const bookingId = `CONSULT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  return {
    id: bookingId,
    success: true,
  };
}

/**
 * POST /api/consultation/book
 * Create a new consultation booking
 */
router.post('/book', async (req: Request, res: Response) => {
  try {
    const bookingData: BookingRequest = req.body;

    // Validate input
    const validation = validateBooking(bookingData);
    if (!validation.valid) {
      return res.status(400).json({
        status: 'error',
        message: validation.error,
      });
    }

    // Check slot availability
    const slotAvailable = await isSlotAvailable(bookingData.date, bookingData.time);
    if (!slotAvailable) {
      return res.status(409).json({
        status: 'error',
        message: 'Selected slot is no longer available',
      });
    }

    // Create booking in database
    const booking = await createBooking(bookingData);

    // Send notification emails
    const emailsResult = await sendConsultationEmails({
      ...bookingData,
      bookingId: booking.id,
    });

    // Log results
    console.log('Booking created:', {
      id: booking.id,
      email: bookingData.email,
      date: bookingData.date,
      time: bookingData.time,
      emailsSent: emailsResult,
    });

    // Send success response
    res.status(201).json({
      status: 'success',
      message: 'Consultation booked successfully',
      bookingId: booking.id,
      confirmationSent: {
        email: emailsResult.user,
        adminNotified: emailsResult.admin,
      },
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create booking. Please try again.',
    });
  }
});

/**
 * GET /api/consultation/availability
 * Get available time slots for a date range
 */
router.get('/availability', async (req: Request, res: Response) => {
  try {
    // TODO: Query database for available slots
    // This should return only unbooked slots for the next 30 days
    
    const availableSlots = [
      { date: '2025-12-15', times: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'] },
      { date: '2025-12-16', times: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'] },
      { date: '2025-12-17', times: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'] },
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

export default router;
