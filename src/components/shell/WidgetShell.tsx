/* --------------------------------------------------------------------------
 *  src/components/shell/WidgetShell.tsx
 * ------------------------------------------------------------------------ */
import { useState } from 'react';

/* ─── sectional UI pieces ──────────────────────────────────────────────── */
import ServiceList   from '../services/ServiceList';
import CalendarView  from '../calendar/CalendarView';
import BookingFlow   from '../booking/BookingFlow';
import Header        from '../layout/Header';           // nice to have, drop if not needed

/* ─── sample data & types ──────────────────────────────────────────────── */
import { sampleAvailability } from '../../data/sampleAvailability';
import type { Service }        from '../../types/service';
import type { Slot }           from '../../types/calendar';

/* ─── cheap demo list of services (replace w/ real API later) ──────────── */
const demoServices: Service[] = [
  { id: 'svc1', name: 'Consultation', duration: 30, deposit: 20 },
  { id: 'svc2', name: 'Repair',       duration: 60, deposit: 50 },
];

type Step = 'services' | 'calendar' | 'booking' | 'done';

export default function WidgetShell() {
  /* ── page-level state ─────────────────────────────────────────────── */
  const [step,  setStep]       = useState<Step>('services');
  const [svc,   setSvc]        = useState<Service | null>(null);
  const [slot,  setSlot]       = useState<Slot   | null>(null);

  /* ── handlers ─────────────────────────────────────────────────────── */
  const handleServiceSelect = (s: Service) => {
    setSvc(s);
    setStep('calendar');
  };

  const handleSlotPicked = (picked: Slot) => {
    setSlot(picked);
    setStep('booking');           // jump straight into BookingFlow
  };

  const handleBookingDone = () => {
    setStep('done');
  };

  /* ── rendering ────────────────────────────────────────────────────── */
  return (
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        {/* top bar – optional */}
        <Header title="📅 Minty Booking Widget" />

        <main className="flex-1 flex items-center justify-center p-4">
          {step === 'services' && (
              <ServiceList services={demoServices} onSelect={handleServiceSelect} />
          )}

          {step === 'calendar' && svc && (
              <CalendarView
                  /* you can filter availability by selected service later */
                  availability={sampleAvailability}
                  onSlotPicked={handleSlotPicked}
              />
          )}

          {step === 'booking' && slot && (
              <BookingFlow
                  slot={slot}
                  onClose={() => setStep('calendar')}
                  onDone={handleBookingDone}
              />
          )}

          {step === 'done' && (
              <div className="glass-panel p-8 rounded-xl text-center space-y-4">
                <h2 className="text-2xl font-semibold text-mint-600">All set!</h2>
                <p className="text-gray-700">Check your inbox for the confirmation.</p>
                <button
                    onClick={() => {
                      setSvc(null);
                      setSlot(null);
                      setStep('services');
                    }}
                    className="px-6 py-2 rounded-lg bg-mint-500 text-white hover:bg-mint-600"
                >
                  Book another
                </button>
              </div>
          )}
        </main>
      </div>
  );
}