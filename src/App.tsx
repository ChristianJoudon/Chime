import { useState } from 'react'
import Header from './src/components/layout/Header'
import CalendarView from './src/components/calendar/dates/CalendarView'
import BookingFlow from './src/components/booking/BookingFlow'
import { sampleAvailability } from './src/data/sampleAvailability'
import { Slot } from './src/types/calendar'
import { AnimatePresence, motion } from 'framer-motion'

export default function App() {
    const [slot, setSlot] = useState<Slot | null>(null)

    return (
        <div className="min-h-full flex flex-col bg-gray-50 text-gray-900">
            <Header title="Chime Booking" />

            <main className="flex flex-col md:flex-row flex-1 md:divide-x md:divide-gray-200">
                {/* Calendar Section */}
                <section className="md:w-2/3 p-4">
                    <CalendarView
                        availability={sampleAvailability}
                        onSlotPicked={setSlot}
                    />
                </section>

                {/* Booking Flow Section */}
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
                                <BookingFlow slot={slot} onClose={() => setSlot(null)} />
                            </motion.div>
                        ) : (
                            <motion.p
                                key="msg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center text-gray-500"
                            >
                                Select a date and time to begin booking.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </section>
            </main>
        </div>
    )
}