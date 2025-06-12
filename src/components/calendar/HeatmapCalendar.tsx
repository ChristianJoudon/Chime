import { motion } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import { AvailabilityMap } from '../../types/service'
import 'react-day-picker/dist/style.css'

interface HeatmapCalendarProps {
  availability: AvailabilityMap
  onSelectDate: (date: Date) => void
}

export function HeatmapCalendar({ availability, onSelectDate }: HeatmapCalendarProps) {
  function getDayClassName(date: Date) {
    const key = date.toISOString().slice(0, 10)
    const slots = availability[key] ?? -1
    if (slots < 0) return 'bg-gray-200/50 cursor-not-allowed'
    if (slots === 0) return 'bg-pink-200'
    if (slots <= 2) return 'bg-yellow-200'
    if (slots <= 4) return 'bg-blue-200'
    return 'bg-mint-200'
  }

  const daysInMonth = Array.from({ length: 30 }, (_, i) => new Date(2025, 5, i + 1))

  return (
    <motion.div
      className="glass-panel-deep p-6 rounded-3xl shadow-xl w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
    >
      <div className="w-full mb-4 bg-mint-500 text-white rounded-t-2xl py-3 px-6 flex items-center justify-between">
        <button className="hover:scale-110 hover:animate-ping">◀</button>
        <h2 className="text-xl font-semibold">June 2025</h2>
        <button className="hover:scale-110 hover:animate-ping">▶</button>
      </div>
      <div className="grid grid-cols-7 text-center bg-mint-100 text-mint-700 font-semibold uppercase text-sm py-1 rounded-t-md">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(wd => <div key={wd}>{wd}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {daysInMonth.map((date, idx) => {
          const formatted = date.toISOString().slice(0, 10)
          const slots = availability[formatted] ?? -1
          const isDisabled = slots < 0
          const cls = getDayClassName(date)
          return (
            <motion.div
              key={formatted}
              className={`${cls} backdrop-blur-md border border-white/30 rounded-md w-10 h-10 flex items-center justify-center cursor-pointer relative`}
              whileHover={isDisabled ? {} : { scale: 1.05, boxShadow: '0 6px 20px rgba(0,0,0,0.12)' }}
              onClick={() => { if (!isDisabled) onSelectDate(date) }}
            >
              <span className="text-sm text-gray-800">{idx + 1}</span>
              {slots === 0 && <span className="absolute top-1 right-1 text-xs text-pink-600">X</span>}
            </motion.div>
          )
        })}
      </div>
      <div className="flex justify-around items-center mt-4 text-sm">
        <div className="flex items-center space-x-1"><span className="block w-4 h-4 bg-mint-200 rounded"></span><span>5+ slots</span></div>
        <div className="flex items-center space-x-1"><span className="block w-4 h-4 bg-blue-200 rounded"></span><span>3–4 slots</span></div>
        <div className="flex items-center space-x-1"><span className="block w-4 h-4 bg-yellow-200 rounded"></span><span>1–2 slots</span></div>
        <div className="flex items-center space-x-1"><span className="block w-4 h-4 bg-pink-200 rounded"></span><span>Sold Out</span></div>
      </div>
    </motion.div>
  )
}
