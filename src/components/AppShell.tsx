import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ServiceGrid, Service } from './ServiceGrid'
import DateLayer from './DateLayer'
import TimeLayer from './TimeLayer'
import { DailyAvailability } from '../types/calendar'

const services: Service[] = [
  { id: 1, name: 'Consultation', duration: '30 min', description: 'General consultation session' },
  { id: 2, name: 'Therapy Session', duration: '1 hr', description: 'One-hour therapy appointment' },
  { id: 3, name: 'Follow-up', duration: '30 min', description: 'Follow-up meeting' }
]

const sampleAvailability: DailyAvailability[] = [
  {
    date: new Date(2025, 5, 6),
    slots: [
      { time: '08:30 AM', available: false, label: 'SOLD OUT!' },
      { time: '09:45 AM', available: false, label: 'SOLD OUT!' },
      { time: '11:00 AM', available: false, label: 'Waitlist' },
      { time: '12:45 PM', available: false, label: 'Waitlist' },
      { time: '02:00 PM', available: true, label: '4 left!' },
      { time: '03:15 PM', available: true, label: 'SPECIAL OFFER' }
    ]
  },
  {
    date: new Date(2025, 5, 7),
    slots: [
      { time: '08:30 AM', available: true, label: '5 left!' },
      { time: '10:00 AM', available: true, label: '3 left!' }
    ]
  }
]

export default function AppShell() {
  const [layer, setLayer] = useState<'service' | 'date' | 'time'>('service')
  const [service, setService] = useState<Service | null>(null)
  const [dayAvail, setDayAvail] = useState<DailyAvailability | null>(null)

  function handleServiceSelect(s: Service) {
    setService(s)
    setLayer('date')
  }

  function handleDateSelect(avail: DailyAvailability) {
    setDayAvail(avail)
    setLayer('time')
  }

  return (
    <div className="glass-root">
      <motion.div className="glass-panel w-full max-w-md p-6 space-y-4" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
        <AnimatePresence mode="wait">
          {layer === 'service' && (
            <motion.div key="services" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <ServiceGrid services={services} onSelect={handleServiceSelect} selectedId={service?.id} />
            </motion.div>
          )}
          {layer === 'date' && service && (
            <DateLayer key="date" service={service} availability={sampleAvailability} onSelectDay={handleDateSelect} onClose={() => setLayer('service')} />
          )}
          {layer === 'time' && dayAvail && (
            <TimeLayer key="time" availability={dayAvail} onClose={() => setLayer('date')} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
