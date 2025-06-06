import { motion } from 'framer-motion'
import { format } from 'date-fns'
import BackButton from './BackButton'
import { DailyAvailability } from '../types/calendar'

interface TimeLayerProps {
  availability: DailyAvailability
  onClose: () => void
}

export default function TimeLayer({ availability, onClose }: TimeLayerProps) {
  const { date, slots } = availability
  return (
    <motion.div
      key="time"
      initial={{ x: '100%', rotateY: -15, opacity: 0 }}
      animate={{ x: 0, rotateY: 0, opacity: 1 }}
      exit={{ x: '100%', rotateY: -15, opacity: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-3">
        <BackButton onClick={onClose} />
        <h3 className="text-lg font-semibold">{format(date, 'PPP')}</h3>
      </div>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {slots.map(slot => (
          <div
            key={slot.time}
            className={`glass-panel p-3 flex justify-between items-center ${slot.available ? 'border-green-300' : 'border-gray-300 filter grayscale'}`}
          >
            <span>{slot.time}</span>
            {slot.available ? (
              <span className="text-green-600">Book Now</span>
            ) : (
              <span className="text-gray-500">{slot.label || 'Closed'}</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
