import { useState, useEffect } from 'react';
import { Calendar, X, Clock, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { DayPicker } from 'react-day-picker';
import { format, isPast, isToday, addDays } from 'date-fns';
import 'react-day-picker/dist/style.css';

interface ConsultationBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export const ConsultationBooking = ({ isOpen, onClose }: ConsultationBookingProps) => {
  const [step, setStep] = useState<'date' | 'time' | 'details'>('date');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  // Load available dates on mount
  useEffect(() => {
    // Generate next 30 days as available
    const dates: Date[] = [];
    for (let i = 1; i <= 30; i++) {
      dates.push(addDays(new Date(), i));
    }
    setAvailableDates(dates);
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    if (date && !isPast(date) && !isToday(date)) {
      setSelectedDate(date);
      setStep('time');
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('details');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.whatsapp) {
      toast.error('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // WhatsApp validation (basic)
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

      // Call backend API to create booking and send emails
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

      toast.success('Consultation booked successfully!', {
        description: `Confirmation email sent to ${formData.email}. Check your inbox!`,
      });

      // Reset form
      setFormData({ name: '', email: '', whatsapp: '' });
      setSelectedDate(undefined);
      setSelectedTime('');
      setStep('date');
      onClose();
    } catch (error) {
      toast.error('Failed to book consultation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#c3a14b]/10 rounded-lg">
              <Calendar className="w-5 h-5 text-[#c3a14b]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Schedule Consultation</h2>
              <p className="text-xs text-slate-500">{step === 'date' ? 'Select Date' : step === 'time' ? 'Select Time' : 'Your Details'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'date' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#c3a14b]/10 to-[#d4af37]/10 border border-[#c3a14b]/20 rounded-xl p-5 flex gap-3">
                <Calendar className="w-5 h-5 text-[#c3a14b] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Choose Your Date</p>
                  <p className="text-xs text-slate-600 mt-1">Select from the next 30 days • Timezone: IST (UTC+5:30)</p>
                </div>
              </div>
              <style>{`
                .rdp {
                  --rdp-cell-size: 45px;
                  --rdp-accent-color: #c3a14b;
                  --rdp-background-color: #c3a14b20;
                  margin: 0 auto;
                  font-weight: 500;
                }
                .rdp-head_cell {
                  font-weight: 700;
                  color: #1f2937;
                  font-size: 11px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }
                .rdp-cell {
                  padding: 2px;
                }
                .rdp-day {
                  border-radius: 8px;
                  font-weight: 500;
                  font-size: 13px;
                }
                .rdp-day_selected {
                  background-color: #c3a14b;
                  color: white;
                  font-weight: 700;
                  box-shadow: 0 4px 12px rgba(195, 161, 75, 0.3);
                }
                .rdp-day_disabled {
                  opacity: 0.4;
                  cursor: not-allowed;
                  color: #9ca3af;
                }
                .rdp-day_today {
                  font-weight: 700;
                  color: #1f2937;
                }
              `}</style>
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={date => isPast(date) || isToday(date)}
              />
              <div className="text-center text-xs text-slate-500">
                <span className="inline-block px-3 py-1 bg-slate-50 rounded-full">
                  Selected: {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'None'}
                </span>
              </div>
              <Button onClick={onClose} variant="outline" className="w-full text-slate-700 border-slate-200 hover:bg-slate-50">
                Cancel
              </Button>
            </div>
          )}

          {step === 'time' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#c3a14b]/10 to-[#d4af37]/10 border border-[#c3a14b]/20 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-[#c3a14b] flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {selectedDate ? format(selectedDate, 'EEEE, MMMM dd, yyyy') : 'Select Date'}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">Select your preferred time slot</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Available Time Slots</p>
                <div className="grid grid-cols-2 gap-3">
                  {AVAILABLE_TIME_SLOTS.map(slot => (
                    <button
                      key={slot.time}
                      onClick={() => handleTimeSelect(slot.time)}
                      disabled={!slot.available}
                      className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
                        selectedTime === slot.time
                          ? 'bg-[#c3a14b] text-white shadow-lg scale-105'
                          : slot.available
                          ? 'bg-slate-100 text-slate-900 hover:bg-[#c3a14b]/15 hover:border-[#c3a14b] border-2 border-transparent cursor-pointer'
                          : 'bg-slate-50 text-slate-400 cursor-not-allowed opacity-50'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-[#c3a14b]">
                <p className="text-xs text-slate-600"><span className="font-semibold text-slate-900">{selectedTime || 'Select a time'}</span> • IST (Indian Standard Time)</p>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep('date')} variant="outline" className="flex-1 text-slate-700 border-slate-200">
                  ← Back
                </Button>
                <Button
                  onClick={() => selectedTime && setStep('details')}
                  disabled={!selectedTime}
                  className="flex-1 bg-[#c3a14b] hover:bg-[#b39041] text-white font-semibold"
                >
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {step === 'details' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="bg-gradient-to-r from-[#c3a14b]/10 to-[#d4af37]/10 border border-[#c3a14b]/20 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Scheduled For</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">
                      {format(selectedDate!, 'MMMM dd, yyyy')} • {selectedTime}
                    </p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-[#c3a14b]" />
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#c3a14b] focus:ring-2 focus:ring-[#c3a14b]/20 outline-none transition-all text-slate-900"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#c3a14b] focus:ring-2 focus:ring-[#c3a14b]/20 outline-none transition-all text-slate-900"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-slate-900 mb-2">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#c3a14b] focus:ring-2 focus:ring-[#c3a14b]/20 outline-none transition-all text-slate-900"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep('time')} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#c3a14b] hover:bg-[#b39041]"
                >
                  {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
