import React, { useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { DailyAvailability } from '@/lib/types';
import { availability } from '@/data/availability';
import SlotModal from './SlotModal';
import { AnimatePresence } from 'framer-motion';

export interface CalendarProps {
    onSlotPicked: (slot: DailyAvailability['slots'][0]) => void;
}

export default function Calendar({ onSlotPicked }: CalendarProps){
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const availableDays = useMemo(() =>
        availability.filter(d => d.slots.some(s => s.available)).map(d => d.date), []);

    const dayAvail = availability.find(a => selectedDay && a.date.toDateString() === selectedDay.toDateString());

    return (
        <>
            <DayPicker
                mode="single"
                selected={selectedDay!}
                onSelect={d => setSelectedDay(d ?? null)}
                modifiers={{ available: availableDays }}
                modifiersClassNames={{ available: 'bg-mint/20 hover:bg-mint/40 text-mint' }}
                disabled={[ d => !availableDays.some(av => av.toDateString() === d.toDateString()) ]}
                className="glass-panel p-4"
            />

            <AnimatePresence>
                {dayAvail && (
                    <SlotModal key="slot" day={dayAvail} onPick={onSlotPicked} onClose={() => setSelectedDay(null)} />
                )}
            </AnimatePresence>
        </>
    );
}