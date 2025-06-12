import React, { useState } from 'react';
import Header from '@/components/Header';
import Calendar from '@/components/Calendar';
import BookingFlow from '@/components/BookingFlow';
import { Slot } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function App(){
    const [slot, setSlot] = useState<Slot|null>(null);

    return (
        <div className="min-h-full flex flex-col">
            <Header title="Chime Booking" />

            <main className="flex flex-col md:flex-row flex-1 md:divide-x md:divide-gray-200">
                <section className="md:w-2/3 p-4">
                    <Calendar onSlotPicked={setSlot} />
                </section>

                <section className="md:w-1/3 p-4">
                    <AnimatePresence mode="wait">
                        {slot ? (
                            <motion.div key="flow" initial={{ opacity:0,x:50 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:50 }} transition={{ duration:0.25 }} className="glass-panel p-4">
                                <BookingFlow slot={slot} />
                            </motion.div>
                        ) : (
                            <motion.p key="msg" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="text-center text-gray-500">Select a slot to continue</motion.p>
                        )}
                    </AnimatePresence>
                </section>
            </main>
        </div>
    );
}