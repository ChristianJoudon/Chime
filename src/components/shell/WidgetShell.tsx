/* ──────────────────────────────────────────────────────────────────────────
 *  WidgetShell.tsx
 *
 *  “Shell” that coordinates the three mini-apps:
 *    ① ServiceList     – pick WHAT
 *    ② CalendarView    – pick WHEN
 *    ③ BookingFlow     – confirm + pay
 *
 *  2025-06-19  – slide-over behaviour refined
 *  ────────────────────────────────────────────────────────────────────────
 *  • Fixed className bug (template-string now quoted correctly)
 *  • bookingOpen ➜  true the moment a slot is picked
 *      – CLOSED  =  ⅔ left   | ⅓ right
 *      – OPEN    =  ⅓ left   | ⅔ right   (stays until a full restart)
 *  • Copious comments for maintainers
 * ------------------------------------------------------------------------ */

import { useState } from 'react';

/* section UIs */
import ServiceList  from '../services/ServiceList';
import CalendarView from '../calendar/CalendarView';
import BookingFlow  from '../booking/BookingFlow';
import Header       from '../layout/Header';

/* demo data & types */
import { sampleAvailability } from '../../data/sampleAvailability';
import type { Slot }          from '../../types/calendar';

/* Fake service seeds (swap for API later) */
interface DemoService {
  id      : string;
  name    : string;
  duration: number;   // minutes
  deposit : number;   // USD
}
const demoServices: DemoService[] = [
  { id: 'svc1', name: 'Consultation', duration: 30, deposit: 20 },
  { id: 'svc2', name: 'Repair',       duration: 60, deposit: 50 },
];

/* Finite-state machine */
type Step = 'services' | 'calendar' | 'booking' | 'done';

export default function WidgetShell() {
  /* ─── GLOBAL STATE ─────────────────────────────────────────────── */
  const [step,  setStep]  = useState<Step>('services');
  const [svc,   setSvc]   = useState<DemoService | null>(null);
  const [slot,  setSlot]  = useState<Slot        | null>(null);

  /* toggles `booking-open` CSS ==> ⅓ | ⅔ layout                        */
  const [bookingOpen, setBookingOpen] = useState(false);

  /* ─── HANDLERS ──────────────────────────────────────────────────── */
  /* ① user picks a service */
  function handleServiceSelect(selected: DemoService) {
    setSvc(selected);
    setStep('calendar');
  }

  /* ② user picks a free slot              (opens sidebar) */
  function handleSlotPicked(pickedSlot: Slot) {
    setSlot(pickedSlot);
    setStep('booking');
    setBookingOpen(true);
  }

  /* ③ inside BookingFlow → Cancel (goes back to calendar, collapse) */
  function handleFlowClose() {
    setStep('calendar');
    setBookingOpen(false);
  }

  /* ④ payment finished – keep sidebar open until restart */
  function handleBookingDone() {
    setStep('done');
  }

  /* ⑤ restart the whole flow */
  function handleRestart() {
    setSvc(null);
    setSlot(null);
    setStep('services');
    setBookingOpen(false);
  }

  /* ─── RENDER ────────────────────────────────────────────────────── */
  return (
      /* booking-shell grid:
         · CLOSED  = 2 / 1   (index.css → grid-template-columns: 2fr 1fr)
         · OPEN    = 1 / 2   (index.css → .booking-open overrides to 1fr 2fr) */
      <div className={`booking-shell ${bookingOpen ? 'booking-open' : ''}`}>
        {/* LEFT column (service list / calendar) */}
        <section className="flex-1 flex flex-col">
          <Header title="Chime" />

          <div className="flex-1 flex items-start justify-center p-6">
            {step === 'services' && (
                <ServiceList
                    services={demoServices}
                    onSelect={handleServiceSelect}
                />
            )}

            {step === 'calendar' && svc && (
                <CalendarView
                    availability={sampleAvailability}
                    onSlotPicked={handleSlotPicked}
                />
            )}
          </div>
        </section>

        {/* RIGHT column (booking sidebar) */}
        <aside className="flex flex-col px-6 pt-10">
          {/* confirm / pay multi-step flow */}
          {step === 'booking' && slot && svc && (
              <BookingFlow
                  service={svc}
                  slot={slot}
                  onClose={handleFlowClose}
                  onDone={handleBookingDone}
              />
          )}

          {/* thank-you screen */}
          {step === 'done' && (
              <div className="glass-panel p-8 rounded-xl text-center space-y-4">
                <h2 className="text-2xl font-semibold text-mint-600">All set!</h2>
                <p className="text-gray-700">We’ve emailed your confirmation.</p>

                <button
                    onClick={handleRestart}
                    className="px-6 py-2 rounded-lg bg-mint-500 text-white hover:bg-mint-600 focus-ring"
                >
                  Book another
                </button>
              </div>
          )}

          {/* helper hint while sidebar is empty */}
          {(step === 'services' || step === 'calendar') && (
              <p className="mt-24 text-center text-gray-500 select-none">
                Select a date &amp; time<br />to begin booking.
              </p>
          )}
        </aside>
      </div>
  );
}

/* EOF ─────────────────────────────────────────────────────────────────── */
