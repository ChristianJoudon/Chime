// src/components/calendar/WeeklyAgenda.tsx
import { addDays, format, startOfWeek } from 'date-fns'
import { motion } from 'framer-motion'
import type { AvailabilityWeek, Slot } from '@/types/calendar'

interface Props {
  selectedDate: Date
  weekAvailability: AvailabilityWeek
  onSelectSlot: (day: Date, slot: Slot) => void
}

export default function WeeklyAgenda ({
                                        selectedDate,
                                        weekAvailability,
                                        onSelectSlot,
                                      }: Props) {
  /* ───────── helpers ───────── */
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 })          // Mon-first
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  /* ───────── UI ───────── */
  return (
      <div className="overflow-x-auto py-4 scroll-snap-x">
        <motion.ul
            /* horizontal “hand of cards” */
            className="flex space-x-4 w-max px-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: .45 } }}
        >
          {days.map(day => {
            const key   = day.toISOString().slice(0, 10)
            const slots = weekAvailability[key] ?? []
            const isSel = key === selectedDate.toISOString().slice(0, 10)

            return (
                <li
                    key={key}
                    className="flex-shrink-0 w-44 sm:w-52 lg:w-56 cursor-default"
                >
                  {/* Day header card */}
                  <div
                      className={`
                  ${isSel ? 'bg-mint-500 text-white' : 'bg-white/30 text-gray-900'}
                  backdrop-blur-md border border-white/20 rounded-t-2xl
                  pt-3 pb-2 text-center shadow-md
                `}
                  >
                    <p className="text-sm font-medium">
                      {format(day, 'EEE')}
                    </p>
                    <p className="text-lg font-semibold tracking-wide">
                      {format(day, 'd')}
                    </p>
                  </div>

                  {/* Slot list */}
                  <div
                      className="glass-panel-front h-72 overflow-y-auto px-2 py-3
                           rounded-b-2xl space-y-2"
                  >
                    {slots.length === 0 && (
                        <p className="text-xs italic text-gray-500 text-center">
                          No slots
                        </p>
                    )}

                    {slots.map(slot => (
                        <motion.button
                            key={slot.id}
                            disabled={!slot.available}
                            onClick={() => slot.available && onSelectSlot(day, slot)}
                            whileHover={
                              slot.available
                                  ? { scale: 1.03, y: -2 }
                                  : undefined
                            }
                            className={`
                      w-full flex items-center justify-between px-2 py-1 rounded-lg
                      text-sm font-medium transition
                      ${slot.available
                                ? 'bg-white/70 border border-green-300 hover:bg-mint-50'
                                : 'bg-white/50 border border-gray-300 text-gray-400 cursor-not-allowed line-through'}
                    `}
                        >
                          {slot.timeLabel}
                          {slot.available
                              ? <span className="text-[10px] text-mint-600 font-semibold uppercase">{slot.label ?? 'Book'}</span>
                              : <span className="text-xs">🔒</span>}
                        </motion.button>
                    ))}
                  </div>
                </li>
            )
          })}
        </motion.ul>
      </div>
  )
}