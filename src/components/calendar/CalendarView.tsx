import { FC, useMemo, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { AnimatePresence, motion } from 'framer-motion'
import 'react-day-picker/dist/style.css'
import type { DailyAvailability, Slot } from '../../types/calendar';
import SlotModal from './SlotModal'
import WeeklyAgenda from './WeeklyAgenda'          // ⬅️ your existing file
import HeatmapCalendar from './HeatmapCalendar'    // ⬅️ optional colourful month view

type ViewMode = 'month' | 'week' | 'day'

interface CalendarViewProps {
    availability: DailyAvailability[]
    // callback bubbles slot + date up to WidgetShell or BookingFlow
    onSlotPicked?: (slot: Slot, date: Date) => void
}

const CalendarView: FC<CalendarViewProps> = ({ availability, onSlotPicked }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('month')
    const [pickedDate, setPickedDate] = useState<Date | null>(null)

    /* ───────── helpers ───────── */
    const availableDates = useMemo(
        () => availability.filter((d) => d.slots.some((s) => s.available)).map((d) => d.date),
        [availability],
    )
    const thisDay = pickedDate
        ? availability.find((d) => d.date.toDateString() === pickedDate.toDateString())
        : undefined

    /* ───────── callbacks ───────── */
    function handleMonthPick(day?: Date) {
        if (!day) return
        setPickedDate(day)
        setViewMode('week')
    }

    function handleWeekPick(date: Date, slot: Slot) {
        onSlotPicked?.(slot, date)
        setPickedDate(date)
        setViewMode('day')
    }

    /* ───────── render ───────── */
    return (
        <div className="w-full max-w-lg mx-auto space-y-6">
            {/* mini tabs */}
            <div className="flex justify-center space-x-2">
                {(['month', 'week', 'day'] as ViewMode[]).map((mode) => (
                    <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`px-4 py-1 rounded-full text-sm font-medium transition
              ${viewMode === mode ? 'bg-mint-500 text-white' : 'bg-white/20 text-mint-600'}`}
                    >
                        {mode.toUpperCase()}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {viewMode === 'month' && (
                    <motion.div
                        key="month"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35 }}
                    >
                        {/* pick your flavour: HeatmapCalendar OR vanilla DayPicker */}
                        {/* <HeatmapCalendar availabilityMap={…} onSelectDate={(d)=>{setPickedDate(d);setViewMode('week')}} /> */}
                        <DayPicker
                            mode="single"
                            onSelect={handleMonthPick}
                            modifiers={{ available: availableDates }}
                            modifiersClassNames={{ available: 'bg-mint/20 hover:bg-mint/40 text-mint' }}
                            disabled={[
                                (date: Date) =>
                                    !availability.some((d) => d.date.toDateString() === date.toDateString()),
                            ]}
                            className="glass-panel p-4 rounded-xl border border-gray-200 shadow-lg"
                        />
                    </motion.div>
                )}

                {viewMode === 'week' && pickedDate && (
                    <motion.div
                        key="week"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.35 }}
                    >
                        <WeeklyAgenda
                            selectedDate={pickedDate}
                            weekAvailability={buildWeekMap(availability)} // helper below
                            onSelectSlot={handleWeekPick}
                        />
                    </motion.div>
                )}

                {/* “day” really just means open the SlotModal directly.
            Keeping it here lets you animate back & forth */}
                {viewMode === 'day' && thisDay && (
                    <SlotModal
                        key="day"
                        day={thisDay}
                        onPick={(slot) => onSlotPicked?.(slot, thisDay.date)}
                        onClose={() => setViewMode('week')}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

/* converts DailyAvailability[] → { '2025-06-06': Slot[] … }  */
function buildWeekMap(days: DailyAvailability[]) {
    return days.reduce<Record<string, Slot[]>>((acc, d) => {
        acc[d.date.toISOString().slice(0, 10)] = d.slots
        return acc
    }, {})
}

export default CalendarView
