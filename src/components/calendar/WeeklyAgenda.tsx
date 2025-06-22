/* ──────────────────────────────────────────────────────────────────────────
 *  WeeklyAgenda.tsx  ▸  horizontally-scrollable “week-at-a-glance”
 *
 *  CHANGES - 2025-06-19
 *  ────────────────────────────────────────────────────────────────────────
 *  • Day-header cards stay the brand mint (no green ring)
 *  • Each *available* slot button:
 *      – background tint shows how busy the DAY is
 *      – outline is a slightly darker shade of the same hue
 *      – hover animation is faster & buttery-smooth
 *      – hover **does not** swap to white any more
 *  • Unavailable slots keep grey/strikethrough style
 *  • Lots of inline comments for easy tweaking
 * ---------------------------------------------------------------------- */

import { addDays, format, startOfWeek } from 'date-fns';
import { motion } from 'framer-motion';
import type { AvailabilityWeek, Slot } from '@/types/calendar';

/* ╭─ tiny helper – map #free slots in that DAY ➜ colour classes ───────────╮
 * │  ➜ update these if you change your palette                              │
 * ╰─────────────────────────────────────────────────────────────────────────╯ */
function tintByFree(count: number) {
    if (count === 0)      return { bg: 'bg-coral-100',  border: 'border-coral-300'  };
    if (count <= 2)       return { bg: 'bg-yellow-100', border: 'border-yellow-300' };
    if (count <= 4)       return { bg: 'bg-lime-100',   border: 'border-lime-300'   };
    return                  { bg: 'bg-mint-100',   border: 'border-mint-300'   };
}

interface Props {
    selectedDate    : Date;
    weekAvailability: AvailabilityWeek;               // {'yyyy-mm-dd': Slot[]}
    onSelectSlot    : (day: Date, slot: Slot) => void;
}

export default function WeeklyAgenda({
                                         selectedDate,
                                         weekAvailability,
                                         onSelectSlot,
                                     }: Props) {
    /* ─── build Mon-first week array ───────────────────────────────────── */
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const days      = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    /* ─── UI ──────────────────────────────────────────────────────────── */
    return (
        <div className="overflow-x-auto py-4 scroll-snap-x">
            <motion.ul
                className="flex space-x-4 w-max px-2"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35 } }}
            >
                {days.map((day) => {
                    const key         = day.toISOString().slice(0, 10);
                    const slots       = weekAvailability[key] ?? [];
                    const freeCount   = slots.filter((s) => s.available).length;
                    const tint        = tintByFree(freeCount);
                    const isSelected  = key === selectedDate.toISOString().slice(0, 10);

                    return (
                        <li
                            key={key}
                            className="flex-shrink-0 w-44 sm:w-52 lg:w-56 cursor-default"
                        >
                            {/* ────────── Day header card (brand mint) ────────── */}
                            <div
                                className={`
                  bg-mint-500 text-white
                  ${isSelected ? '' : 'opacity-95'}
                  backdrop-blur-md border border-white/20 rounded-t-2xl
                  pt-3 pb-2 text-center shadow-md
                `}
                            >
                                <p className="text-sm font-medium">{format(day, 'EEE')}</p>
                                <p className="text-lg font-semibold tracking-wide">
                                    {format(day, 'd')}
                                </p>
                            </div>

                            {/* ────────── Slot list ────────── */}
                            <div
                                className="
                  glass-panel-front h-72 overflow-y-auto px-2 py-3
                  rounded-b-2xl space-y-2
                "
                            >
                                {slots.length === 0 && (
                                    <p className="text-xs italic text-gray-500 text-center">
                                        No slots
                                    </p>
                                )}

                                {slots.map((slot) => (
                                    <motion.button
                                        key={slot.id}
                                        disabled={!slot.available}
                                        onClick={() => slot.available && onSelectSlot(day, slot)}
                                        whileHover={
                                            slot.available
                                                ? { scale: 1.05, y: -1, transition: { duration: 0.15 } }
                                                : undefined
                                        }
                                        className={`
                      w-full flex items-center justify-between px-2 py-1 rounded-lg
                      text-sm font-medium
                      ${
                                            slot.available
                                                ? `${tint.bg} ${tint.border} border hover:brightness-105`
                                                : 'bg-white/50 border border-gray-300 text-gray-400 cursor-not-allowed line-through'
                                        }
                      transition-[transform,filter] ease-out
                    `}
                                    >
                                        {slot.timeLabel}
                                        {slot.available ? (
                                            <span className="text-[10px] text-mint-600 font-semibold uppercase">
                        {slot.label ?? 'Book'}
                      </span>
                                        ) : (
                                            <span className="text-xs">🔒</span>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </li>
                    );
                })}
            </motion.ul>
        </div>
    );
}