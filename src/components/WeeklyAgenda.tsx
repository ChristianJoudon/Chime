import { format, addDays, startOfWeek } from 'date-fns'
import { motion } from 'framer-motion'
import { AvailabilityWeek, Slot } from '../types/service'

interface WeeklyAgendaProps {
  selectedDate: Date
  weekAvailability: AvailabilityWeek
  onSelectSlot: (date: Date, slot: Slot) => void
}

export function WeeklyAgenda({ selectedDate, weekAvailability, onSelectSlot }: WeeklyAgendaProps) {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 })
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  return (
    <motion.div
      className="grid grid-cols-7 gap-3 w-full max-w-5xl mx-auto mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
    >
      {days.map(day => {
        const key = day.toISOString().slice(0, 10)
        const slots = weekAvailability[key] ?? []
        const isToday = key === selectedDate.toISOString().slice(0, 10)
        return (
          <div key={key} className="flex flex-col">
            <div className={`${isToday ? 'bg-mint-500 text-white' : 'bg-white/30 text-gray-800'} backdrop-blur-md border border-white/20 rounded-t-lg py-2 text-center`}>
              <span className="block font-semibold text-sm">{format(day, 'EEE')}</span>
              <span className="block font-semibold">{format(day, 'M/d')}</span>
            </div>
            <div className="glass-panel-front flex-1 overflow-y-auto py-2 px-1 space-y-2">
              {slots.length === 0 && <p className="text-xs text-gray-500 italic text-center">No slots</p>}
              {slots.map(slot => (
                <motion.div
                  key={slot.time}
                  className={`flex justify-between items-center px-2 py-1 rounded-lg ${slot.available ? 'bg-white/70 border border-green-300 cursor-pointer' : 'bg-white/70 border border-gray-300 filter grayscale-70 text-gray-500 cursor-not-allowed'}`}
                  whileHover={slot.available ? { rotateX: -5, scale: 1.02, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' } : {}}
                  onClick={() => { if (slot.available) onSelectSlot(day, slot) }}
                >
                  <span className="text-sm font-medium">{slot.time}</span>
                  {slot.available ? (
                    <span className="bg-mint-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full animate-pulse">Snag It</span>
                  ) : (
                    <motion.span className="text-xs" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>🔒</motion.span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )
      })}
    </motion.div>
  )
}
