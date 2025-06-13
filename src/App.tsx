/* --------------------------------------------------------------------------
 *  src/App.tsx
 * ------------------------------------------------------------------------ */
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/* shared UI */
import Header       from './components/layout/Header';

/* calendar → booking flow */
import CalendarView from './components/calendar/CalendarView';
import BookingFlow  from './components/booking/BookingFlow';

/* demo data & types */
import { sampleAvailability } from './data/sampleAvailability';
import type { Slot }          from './types/calendar';

export default function App() {
    const [slot, setSlot] = useState<Slot | null>(null);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            {/* sticky top bar (remove if you want a frameless widget) */}
            <Header title="📅 Chime Booking" />

            <main className="flex flex-col md:flex-row flex-1 md:divide-x md:divide-gray-200">
                {/* ── Calendar panel ───────────────────────────────────────────── */}
                <section className="md:w-2/3 p-4">
                    <CalendarView
                        availability={sampleAvailability}
                        onSlotPicked={setSlot}
                    />
                </section>

                {/* ── Booking-flow panel ──────────────────────────────────────── */}
                <section className="md:w-1/3 p-4">
                    <AnimatePresence mode="wait">
                        {slot ? (
                            <motion.div
                                key="flow"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.3 }}
                                className="glass-panel p-4 rounded-xl shadow-xl"
                            >
                                <BookingFlow
                                    slot={slot}
                                    onClose={() => setSlot(null)}     // go back to calendar
                                    onDone={() => setSlot(null)}      // reset after confirmation
                                />
                            </motion.div>
                        ) : (
                            <motion.p
                                key="msg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center text-gray-500"
                            >
                                Select a date &amp; time to begin booking.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </section>
            </main>
        </div>
    );
}