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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-200/50">
        {/* Header - Enhanced */}
        <div className="sticky top-0 bg-gradient-to-r from-[#c3a14b] to-[#d4af37] px-6 py-8 border-b border-[#b39041]/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Schedule Consultation</h2>
              <p className="text-sm text-white/80 font-medium mt-1">{step === 'date' ? '📅 Select Date' : step === 'time' ? '🕐 Select Time' : '👤 Your Details'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-all text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {step === 'date' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-gradient-to-br from-blue-50 via-blue-40 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 flex gap-4 shadow-sm">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-blue-900">Choose Your Date</p>
                  <p className="text-xs text-blue-700 mt-2 leading-relaxed">Next 30 days available • IST (UTC+5:30)</p>
                </div>
              </div>
              
              <style>{`
                @keyframes slideUp {
                  from { opacity: 0; transform: translateY(10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                .animate-in { animation: slideUp 0.3s ease-out; }
                
                .rdp {
                  --rdp-cell-size: 50px;
                  --rdp-accent-color: #c3a14b;
                  --rdp-background-color: #c3a14b15;
                  margin: 0 auto;
                  font-weight: 600;
                  width: 100%;
                }
                .rdp-head_cell {
                  font-weight: 800;
                  color: #1e293b;
                  font-size: 12px;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                  padding: 8px 0;
                }
                .rdp-cell {
                  padding: 4px;
                }
                .rdp-day {
                  border-radius: 10px;
                  font-weight: 600;
                  font-size: 14px;
                  transition: all 0.2s;
                }
                .rdp-day:hover:not(.rdp-day_disabled) {
                  background-color: #f1e8d9;
                  transform: scale(1.05);
                }
                .rdp-day_selected {
                  background: linear-gradient(135deg, #c3a14b, #d4af37);
                  color: white;
                  font-weight: 800;
                  box-shadow: 0 8px 16px rgba(195, 161, 75, 0.4);
                  transform: scale(1.08);
                }
                .rdp-day_disabled {
                  opacity: 0.35;
                  cursor: not-allowed;
                  color: #cbd5e1;
                }
                .rdp-day_today {
                  font-weight: 800;
                  color: #0284c7;
                  border: 2px solid #0284c7;
                }
              `}</style>
              
              <div className="bg-white border-2 border-slate-100 rounded-2xl p-4 shadow-sm">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={date => isPast(date) || isToday(date)}
                />
              </div>
              
              <div className="text-center">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#c3a14b]/10 to-[#d4af37]/10 border border-[#c3a14b]/20 rounded-full text-sm font-semibold text-slate-700">
                  {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : '📅 Select a date'}
                </span>
              </div>
              
              <Button onClick={onClose} variant="outline" className="w-full text-slate-700 border-2 border-slate-200 hover:bg-slate-50 font-semibold py-3 rounded-xl transition-all">
                Cancel
              </Button>
            </div>
          )}

          {step === 'time' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-gradient-to-br from-orange-50 via-amber-40 to-yellow-50 border-2 border-orange-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-orange-900">
                      {selectedDate ? format(selectedDate, 'EEEE, MMMM dd') : 'Select Date'}
                    </p>
                    <p className="text-xs text-orange-700 mt-1">Pick your preferred time slot</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider px-1">⏰ Available Slots</p>
                <div className="grid grid-cols-2 gap-3">
                  {AVAILABLE_TIME_SLOTS.map(slot => (
                    <button
                      key={slot.time}
                      onClick={() => handleTimeSelect(slot.time)}
                      disabled={!slot.available}
                      className={`py-4 px-4 rounded-xl font-bold text-sm transition-all duration-200 transform ${
                        selectedTime === slot.time
                          ? 'bg-gradient-to-br from-[#c3a14b] to-[#d4af37] text-white shadow-xl scale-105 ring-2 ring-[#c3a14b]/50'
                          : slot.available
                          ? 'bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 hover:from-[#c3a14b]/10 hover:to-[#d4af37]/10 border-2 border-slate-200 hover:border-[#c3a14b] cursor-pointer hover:scale-105'
                          : 'bg-slate-50 text-slate-400 cursor-not-allowed opacity-40'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-xl border-l-4 border-[#c3a14b] shadow-sm">
                <p className="text-xs text-slate-600"><span className="font-bold text-slate-900 text-sm">{selectedTime || '🕐 Select a time'}</span> • IST</p>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep('date')} variant="outline" className="flex-1 text-slate-700 border-2 border-slate-200 hover:bg-slate-50 font-semibold py-3 rounded-xl">
                  ← Back
                </Button>
                <Button
                  onClick={() => selectedTime && setStep('details')}
                  disabled={!selectedTime}
                  className="flex-1 bg-gradient-to-r from-[#c3a14b] to-[#d4af37] hover:shadow-lg text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                >
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {step === 'details' && (
            <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-300">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-green-700 uppercase tracking-wider">✓ Scheduled For</p>
                    <p className="text-lg font-bold text-green-900 mt-2">
                      {format(selectedDate!, 'MMM dd, yyyy')} • {selectedTime}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-slate-900 mb-2.5">
                    👤 Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200 focus:border-[#c3a14b] focus:ring-2 focus:ring-[#c3a14b]/20 outline-none transition-all text-slate-900 font-medium placeholder-slate-500"
                    placeholder="Sonia Jaiswal"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2.5">
                    ✉️ Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200 focus:border-[#c3a14b] focus:ring-2 focus:ring-[#c3a14b]/20 outline-none transition-all text-slate-900 font-medium placeholder-slate-500"
                    placeholder="sonia@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-bold text-slate-900 mb-2.5">
                    💬 WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200 focus:border-[#c3a14b] focus:ring-2 focus:ring-[#c3a14b]/20 outline-none transition-all text-slate-900 font-medium placeholder-slate-500"
                    placeholder="+91 70213 41409"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <p className="text-xs text-blue-700 leading-relaxed">
                  <span className="font-bold">📧 Confirmation:</span> A detailed email with meeting link will be sent to your email address.
                </p>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep('time')} variant="outline" className="flex-1 text-slate-700 border-2 border-slate-200 hover:bg-slate-50 font-semibold py-3 rounded-xl">
                  ← Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-[#c3a14b] to-[#d4af37] hover:shadow-lg text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <><Loader className="w-4 h-4 animate-spin" /> Booking...</>
                  ) : (
                    <>✓ Confirm Booking</>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
