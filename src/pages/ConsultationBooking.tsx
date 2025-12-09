import { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, ArrowRight, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { DayPicker } from 'react-day-picker';
import { format, isPast, isToday, addDays } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { useNavigate } from 'react-router-dom';

interface TimeSlot {
  time: string;
  available: boolean;
}

const AVAILABLE_TIME_SLOTS: TimeSlot[] = [
  { time: '09:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: true },
  { time: '02:00 PM', available: true },
  { time: '03:00 PM', available: true },
  { time: '04:00 PM', available: true },
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const ConsultationBookingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'date' | 'time' | 'details' | 'success'>('date');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');

  const handleDateSelect = (date: Date | undefined) => {
    if (date && !isPast(date) && !isToday(date)) {
      setSelectedDate(date);
      setStep('time');
      window.scrollTo(0, 0);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('details');
    window.scrollTo(0, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.whatsapp) {
      toast.error('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    const whatsappRegex = /^[0-9]{10,}$/;
    if (!whatsappRegex.test(formData.whatsapp.replace(/\D/g, ''))) {
      toast.error('Please enter a valid WhatsApp number');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
        time: selectedTime,
      };

      console.log('Booking submitted:', bookingData);

      const response = await fetch(`${API_URL}/api/consultation/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Booking failed');
      }

      const result = await response.json();
      setBookingId(result.bookingId);
      setStep('success');
      
      toast.success('Consultation booked successfully!', {
        description: `Confirmation email sent to ${formData.email}`,
      });
    } catch (error) {
      toast.error('Failed to book consultation. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ←
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#c3a14b] to-[#d4af37] bg-clip-text text-transparent">
                  Schedule Your Consultation
                </h1>
                <p className="text-slate-600 mt-1">Expert legal advice, booked at your convenience</p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mt-8 flex items-center justify-between">
            {['date', 'time', 'details', 'success'].map((stepName, idx) => (
              <div key={stepName} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    step === stepName
                      ? 'bg-gradient-to-r from-[#c3a14b] to-[#d4af37] text-white shadow-lg scale-110'
                      : ['date', 'time', 'details'].includes(step) &&
                        ['date', 'time', 'details'].indexOf(step) > idx
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {['date', 'time', 'details'].indexOf(step) > idx ? '✓' : idx + 1}
                </div>
                {idx < 3 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded-full transition-all ${
                      ['date', 'time', 'details'].indexOf(step) > idx
                        ? 'bg-green-500'
                        : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: Date Selection */}
        {step === 'date' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-200/50">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Choose Your Date</h2>
                  <p className="text-slate-600 mt-2">Select from the next 30 days • IST (UTC+5:30)</p>
                </div>
              </div>

              <style>{`
                .rdp {
                  --rdp-cell-size: 70px;
                  --rdp-accent-color: #c3a14b;
                  --rdp-background-color: #c3a14b15;
                  margin: 0 auto;
                  font-weight: 600;
                  width: 100%;
                  padding: 20px;
                }
                .rdp-head_cell {
                  font-weight: 800;
                  color: #1e293b;
                  font-size: 14px;
                  text-transform: uppercase;
                  letter-spacing: 1.5px;
                  padding: 12px 0;
                }
                .rdp-cell {
                  padding: 6px;
                }
                .rdp-day {
                  border-radius: 14px;
                  font-weight: 600;
                  font-size: 16px;
                  transition: all 0.2s;
                }
                .rdp-day:hover:not(.rdp-day_disabled) {
                  background-color: #f1e8d9;
                  transform: scale(1.08);
                }
                .rdp-day_selected {
                  background: linear-gradient(135deg, #c3a14b, #d4af37);
                  color: white;
                  font-weight: 800;
                  box-shadow: 0 12px 24px rgba(195, 161, 75, 0.5);
                  transform: scale(1.12);
                }
                .rdp-day_disabled {
                  opacity: 0.3;
                  cursor: not-allowed;
                  color: #cbd5e1;
                }
                .rdp-day_today {
                  font-weight: 800;
                  color: #0284c7;
                  border: 3px solid #0284c7;
                }
              `}</style>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border-2 border-slate-200 overflow-hidden">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={date => isPast(date) || isToday(date)}
                />
              </div>

              {selectedDate && (
                <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-2xl">
                  <p className="text-center text-lg font-bold text-blue-900">
                    📅 Selected: {format(selectedDate, 'EEEE, MMMM dd, yyyy')}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Time Selection */}
        {step === 'time' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-200/50">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl">
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Select Time Slot</h2>
                  <p className="text-slate-600 mt-2">{selectedDate ? format(selectedDate, 'EEEE, MMMM dd, yyyy') : 'Date selected'}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 md:gap-6 mb-10">
                {AVAILABLE_TIME_SLOTS.map(slot => (
                  <button
                    key={slot.time}
                    onClick={() => handleTimeSelect(slot.time)}
                    disabled={!slot.available}
                    className={`py-6 px-4 rounded-2xl font-bold text-lg transition-all duration-200 transform ${
                      selectedTime === slot.time
                        ? 'bg-gradient-to-br from-[#c3a14b] to-[#d4af37] text-white shadow-2xl scale-110 ring-4 ring-[#c3a14b]/30'
                        : slot.available
                        ? 'bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 hover:from-[#c3a14b]/15 hover:to-[#d4af37]/15 border-3 border-slate-200 hover:border-[#c3a14b] cursor-pointer hover:scale-105'
                        : 'bg-slate-50 text-slate-400 cursor-not-allowed opacity-40'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl">
                  <p className="text-center text-lg font-bold text-orange-900">
                    ✓ Time Selected: {selectedTime}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Details Form */}
        {step === 'details' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-200/50">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Your Details</h2>
                <p className="text-slate-600">Complete your booking information</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl">
                  <p className="text-xs font-bold text-green-700 uppercase tracking-wider">📅 Date</p>
                  <p className="text-2xl font-bold text-green-900 mt-3">{format(selectedDate!, 'MMM dd')}</p>
                  <p className="text-sm text-green-700 mt-1">{format(selectedDate!, 'EEEE')}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl">
                  <p className="text-xs font-bold text-orange-700 uppercase tracking-wider">⏰ Time</p>
                  <p className="text-2xl font-bold text-orange-900 mt-3">{selectedTime}</p>
                  <p className="text-sm text-orange-700 mt-1">IST (India)</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-slate-900 mb-3">
                    👤 Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200 focus:border-[#c3a14b] focus:ring-4 focus:ring-[#c3a14b]/20 outline-none transition-all text-lg text-slate-900 font-medium placeholder-slate-500"
                    placeholder="Sonia Jaiswal"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-3">
                    ✉️ Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200 focus:border-[#c3a14b] focus:ring-4 focus:ring-[#c3a14b]/20 outline-none transition-all text-lg text-slate-900 font-medium placeholder-slate-500"
                    placeholder="sonia@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-bold text-slate-900 mb-3">
                    💬 WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200 focus:border-[#c3a14b] focus:ring-4 focus:ring-[#c3a14b]/20 outline-none transition-all text-lg text-slate-900 font-medium placeholder-slate-500"
                    placeholder="+91 70213 41409"
                  />
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mt-8">
                  <p className="text-sm text-blue-700 leading-relaxed">
                    <span className="font-bold">📧 Confirmation Email:</span> We'll send a detailed email with meeting link and agenda to your email address.
                  </p>
                </div>

                <div className="flex gap-4 mt-10">
                  <Button
                    type="button"
                    onClick={() => setStep('time')}
                    variant="outline"
                    className="flex-1 text-slate-700 border-2 border-slate-200 hover:bg-slate-50 font-bold py-4 rounded-2xl text-lg transition-all"
                  >
                    ← Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-[#c3a14b] to-[#d4af37] hover:shadow-2xl text-white font-bold py-4 rounded-2xl text-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <><Loader className="w-5 h-5 animate-spin" /> Booking...</>
                    ) : (
                      <>✓ Confirm Booking</>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border border-slate-200/50 text-center">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-8">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              <h2 className="text-4xl font-bold text-slate-900 mb-4">Booking Confirmed!</h2>
              <p className="text-xl text-slate-600 mb-8">Your consultation has been successfully scheduled.</p>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div>
                    <p className="text-xs font-bold text-green-700 uppercase tracking-wider">📅 Date & Time</p>
                    <p className="text-xl font-bold text-green-900 mt-3">{format(selectedDate!, 'MMM dd, yyyy')}</p>
                    <p className="text-lg font-semibold text-green-800">{selectedTime}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-green-700 uppercase tracking-wider">📧 Email</p>
                    <p className="text-lg font-bold text-green-900 mt-3 break-all">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-green-700 uppercase tracking-wider">🔖 Reference ID</p>
                    <p className="text-lg font-bold text-green-900 mt-3 font-mono">{bookingId}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
                <p className="text-slate-700 leading-relaxed">
                  <span className="font-bold text-blue-900">✉️ Email Confirmation Sent</span>
                  <br />
                  <span className="text-sm">Check your email at <strong>{formData.email}</strong> for your booking confirmation and meeting details. Be sure to check your spam folder if you don't see it in your inbox.</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate('/')}
                  className="flex-1 bg-gradient-to-r from-[#c3a14b] to-[#d4af37] hover:shadow-xl text-white font-bold py-4 rounded-2xl text-lg transition-all"
                >
                  Go to Home
                </Button>
                <Button
                  onClick={() => navigate('/contact')}
                  variant="outline"
                  className="flex-1 text-slate-700 border-2 border-slate-200 hover:bg-slate-50 font-bold py-4 rounded-2xl text-lg"
                >
                  Back to Contact
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
