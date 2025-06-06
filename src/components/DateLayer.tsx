import { motion } from 'framer-motion'
import { Service } from './ServiceGrid'
import CalendarGlass from './CalendarGlass'
import BackButton from './BackButton'
import { DailyAvailability } from '../types/calendar'

interface DateLayerProps {
  service: Service
  availability: DailyAvailability[]
  onSelectDay: (day: DailyAvailability) => void
  onClose: () => void
}

export default function DateLayer({ service, availability, onSelectDay, onClose }: DateLayerProps) {
  return (
    <motion.div
      key="date"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-3">
        <BackButton onClick={onClose} />
        <h2 className="text-lg font-semibold">Select a date for {service.name}</h2>
      </div>
      <CalendarGlass availability={availability} onSelectDay={onSelectDay} />
    </motion.div>
  )
}
