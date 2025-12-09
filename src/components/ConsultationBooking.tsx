import { useState } from 'react';
import { Calendar, X, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { DayPicker } from 'react-day-picker';
import { format, isPast, isToday } from 'date-fns';
import 'react-day-picker/dist/style.css';

interface ConsultationBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

// Sample available time slots - can be replaced with API call
const AVAILABLE_TIME_SLOTS: TimeSlot[] = [
  { time: '09:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: true },
  { time: '02:00 PM', available: true },
  { time: '03:00 PM', available: true },
  { time: '04:00 PM', available: true },
];

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
      // Simulate API call - replace with actual backend call
      const bookingData = {
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
        time: selectedTime,
      };

      console.log('Booking submitted:', bookingData);

      // Simulate success
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success('Consultation booked successfully!', {
        description: `Your booking is confirmed for ${format(selectedDate!, 'MMM dd, yyyy')} at ${selectedTime}`,
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
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">Select an available date. Timezone: IST (Indian Standard Time)</p>
              </div>
              <style>{`
                .rdp {
                  --rdp-cell-size: 50px;
                  --rdp-accent-color: #c3a14b;
                  --rdp-background-color: #c3a14b20;
                  margin: 0 auto;
                }
                .rdp-head_cell {
                  font-weight: 600;
                  color: #1f2937;
                }
                .rdp-cell {
                  padding: 0;
                }
                .rdp-day {
                  border-radius: 8px;
                }
                .rdp-day_selected {
                  background-color: #c3a14b;
                  color: white;
                }
                .rdp-day_disabled {
                  opacity: 0.5;
                  cursor: not-allowed;
                }
              `}</style>
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={date => isPast(date) || isToday(date)}
              />
              <Button onClick={onClose} variant="outline" className="w-full">
                Cancel
              </Button>
            </div>
          )}

          {step === 'time' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-[#c3a14b]" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {format(selectedDate!, 'EEEE, MMMM dd, yyyy')}
                  </p>
                  <p className="text-xs text-slate-500">Select your preferred time slot</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {AVAILABLE_TIME_SLOTS.map(slot => (
                  <button
                    key={slot.time}
                    onClick={() => handleTimeSelect(slot.time)}
                    disabled={!slot.available}
                    className={`py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                      selectedTime === slot.time
                        ? 'bg-[#c3a14b] text-white shadow-lg'
                        : slot.available
                        ? 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                        : 'bg-slate-50 text-slate-400 cursor-not-allowed opacity-50'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep('date')} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={() => selectedTime && setStep('details')}
                  disabled={!selectedTime}
                  className="flex-1 bg-[#c3a14b] hover:bg-[#b39041]"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 'details' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">
                    {format(selectedDate!, 'MMMM dd, yyyy')} • {selectedTime}
                  </span>
                </p>
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
