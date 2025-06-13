import { useState } from 'react'
import ServiceList from '../services/ServiceList'
import CalendarView from '../calendar/dates/CalendarView'
import BookingFlow from '../booking/BookingFlow'
import { Slot } from '@/types/calendar'
import { sampleAvailability } from '@/data/sampleAvailability'

// Define service types and data
interface Service {
  id: string
  name: string
  duration: number
  deposit: number
}

const dummyServices: Service[] = [
  { id: 'svc1', name: 'Consultation', duration: 30, deposit: 20 },
  { id: 'svc2', name: 'Repair',       duration: 60, deposit: 50 },
]

// Component
export default function WidgetShell() {
  const [step, setStep] = useState<'services' | 'calendar' | 'booking'>('services')
  const [service, setService] = useState<Service | null>(null)
  const [slot, setSlot] = useState<Slot | null>(null)

  // Step transitions
  function handleSelectService(svc: Service) {
    setService(svc)
    setStep('calendar')
  }

  function handleSelectSlot(slot: Slot) {
    setSlot(slot)
    setStep('booking')
  }

  function handleBookingClose() {
    setStep('calendar')
    setSlot(null)
  }

  // Render logic
  return (
      <div className="min-h-screen p-4 glass-root">
        <div className="max-w-2xl w-full mx-auto space-y-6">

          {/* Step: Services */}
          {step === 'services' && (
              <ServiceList services={dummyServices} onSelect={handleSelectService} />
          )}

          {/* Step: Calendar */}
          {step === 'calendar' && service && (
              <CalendarView
                  availability={sampleAvailability}
                  onSlotPicked={(slot) => handleSelectSlot(slot)}
              />
          )}

          {/* Step: Booking Flow */}
          {step === 'booking' && slot && (
              <BookingFlow slot={slot} onClose={handleBookingClose} />
          )}

        </div>
      </div>
  )
}