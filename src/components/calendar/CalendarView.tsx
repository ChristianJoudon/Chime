/* ────────────────────────────────────────────────────────────────────────────
 *  CalendarView — MONTH / WEEK picker
 *  ( DAY view removed – picking a slot in WEEK now calls onSlotPicked() )
 *──────────────────────────────────────────────────────────────────────────── */

import { FC, useMemo, useState }      from 'react';
import { DayPicker }                  from 'react-day-picker';
import { AnimatePresence, motion }    from 'framer-motion';
import 'react-day-picker/dist/style.css';

import type { DailyAvailability, Slot } from '../../types/calendar';
import WeeklyAgenda                     from './WeeklyAgenda';  // ⬅️ unchanged
import { HeatmapCalendar }              from './HeatmapCalendar';// ⬅️ optional

/* ─────── TYPES ──────────────────────────────────────────────────────────── */
type ViewMode = 'month' | 'week';         // ✂︎  “day” removed

interface CalendarViewProps {
    availability : DailyAvailability[];
    onSlotPicked?: (slot: Slot, date: Date) => void;
}

/* ─────── COMPONENT ─────────────────────────────────────────────────────── */
const CalendarView: FC<CalendarViewProps> = ({ availability, onSlotPicked }) => {
    const [viewMode,  setViewMode ] = useState<ViewMode>('month');
    const [pickedDate, setPicked  ] = useState<Date | null>(null);

    /* -- helpers ----------------------------------------------------------- */
    const availableDates = useMemo(
        () =>
            availability
                .filter((d) => d.slots.some((s) => s.available))
                .map((d) => d.date),
        [availability],
    );

    /* -- callbacks --------------------------------------------------------- */
    function handleMonthPick(day?: Date) {
        if (!day) return;
        setPicked(day);
        setViewMode('week');          // jump to WEEK after a day click
    }

    // ① user clicks a slot in WeeklyAgenda ▶ bubble up immediately
    function handleWeekPick(date: Date, slot: Slot) {
        onSlotPicked?.(slot, date);   // parent (WidgetShell) moves to BookingFlow
        /* no “day” view anymore – stay on week so they can change their mind   */
    }

    /* ─── RENDER ─────────────────────────────────────────────────────────── */
    return (
        <div className="w-full max-w-lg mx-auto space-y-6 list-none">
            {/* mini-tabs --------------------------------------------------------- */}
            <div className="flex justify-center space-x-2">
                {(['month', 'week'] as ViewMode[]).map((mode) => (
                    <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`px-4 py-1 rounded-full text-sm font-medium transition
              ${viewMode === mode
                            ? 'bg-mint-500 text-white'
                            : 'bg-white/20 text-mint-600 hover:text-mint-700'}`}
                    >
                        {mode.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* view panels ------------------------------------------------------- */}
            <AnimatePresence mode="wait">
                {viewMode === 'month' && (
                    <motion.div
                        key="month"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35 }}
                    >
                        {/* Use HeatmapCalendar OR vanilla DayPicker – both still work */}
                        {/* <HeatmapCalendar … /> */}
                        <DayPicker
                            mode="single"
                            onSelect={handleMonthPick}
                            modifiers={{ available: availableDates }}
                            modifiersClassNames={{
                                available:
                                    'bg-mint/20 hover:bg-mint/40 text-mint-700 dark:text-mint-300',
                            }}
                            disabled={[
                                (date: Date) =>
                                    !availability.some(
                                        (d) => d.date.toDateString() === date.toDateString(),
                                    ),
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
                            weekAvailability={buildWeekMap(availability)}
                            onSelectSlot={handleWeekPick}   /* ← direct → onSlotPicked */
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* helper: DailyAvailability[] → { 'YYYY-MM-DD': Slot[] } ------------------ */
function buildWeekMap(days: DailyAvailability[]) {
    return days.reduce<Record<string, Slot[]>>((acc, d) => {
        acc[d.date.toISOString().slice(0, 10)] = d.slots;
        return acc;
    }, {});
}

export default CalendarView;

/* =========================================================================
 *  NOTES
 *  • SlotModal + “day” mode are gone – delete those files if unused.
 *  • WidgetShell already changes to step === 'booking' when it receives
 *    a slot; no edits required there.
 *  • Animations/tabs/layout all preserved; only minimal logic changed.
 * ========================================================================= */