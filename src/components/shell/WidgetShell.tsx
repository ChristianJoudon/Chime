import { useState } from 'react'
import ServiceList   from '../services/ServiceList'
import Calendar      from '../calendar/Calendar'
import TimeSlots     from '../calendar/time/TimeSlots'
import BookingForm   from '../booking/BookingForm'
import Payment       from '../booking/Payment'
import Confirmation  from '../booking/Confirmation'
import CalendarView from '@/components/calendar/dates/CalendarView' // UPDATE PATH
import { sampleAvailability } from '@/data/sampleAvailability'

export default function WidgetShell() {
  /* all your existing state stays */

  /* STEP RENDERERS */
  if (step === 'services') return <ServiceList services={dummyServices} onSelect={handleServiceSelect} />

  if (step === 'date')
    return (
        <CalendarView
            availability={sampleAvailability}
            onSlotPicked={(slot, date) => {
              setDate(date.toISOString())
              setTime(slot.timeLabel)
              setStep('form') // jump straight to form or 'time' if you keep that step
            }}
        />
    )

interface Service {
  id: string
  name: string
  duration: number
  deposit: number
}

const dummyServices: Service[] = [
  { id: 'svc1', name: 'Consultation', duration: 30, deposit: 20 },
  { id: 'svc2', name: 'Repair', duration: 60, deposit: 50 },
]

function generateTimes(duration: number) {
  const start = 9
  const end = 17
  const times = []
  for (let h = start; h < end; h++) {
    times.push(`${h.toString().padStart(2, '0')}:00`)
    if (duration <= 30) {
      times.push(`${h.toString().padStart(2, '0')}:30`)
    }
  }
  return times
}

export default function WidgetShell() {
  const [step, setStep] = useState<'services' | 'date' | 'time' | 'form' | 'payment' | 'confirm'>('services')
  const [service, setService] = useState<Service | null>(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [customer, setCustomer] = useState<{ name: string; email: string } | null>(null)
  const [booking, setBooking] = useState<any>(null)
  const [times, setTimes] = useState<string[]>([])

  function handleServiceSelect(svc: Service) {
    setService(svc)
    setDate('')
    setTime('')
    setTimes(generateTimes(svc.duration))
    setStep('date')
  }

  function handleDateSelect(d: string) {
    setDate(d)
    setStep('time')
  }

  function handleTimeSelect(t: string) {
    setTime(t)
    setStep('form')
  }

  function handleFormSubmit(data: { name: string; email: string }) {
    setCustomer(data)
    setStep('payment')
  }

  function handlePaymentSuccess(pay: { paymentIntentId: string }) {
    const b = {
      id: crypto.randomUUID(),
      service,
      date,
      time,
      customer,
      payment: pay,
    }
    setBooking(b)
    setStep('confirm')
  }

  if (step === 'services') {
    return <ServiceList services={dummyServices} onSelect={handleServiceSelect} />
  }
  if (step === 'date') {
    return <Calendar value={date} onChange={handleDateSelect} />
  }
  if (step === 'time') {
    return <TimeSlots slots={times} onSelect={handleTimeSelect} />
  }
  if (step === 'form') {
    return <BookingForm onSubmit={handleFormSubmit} deposit={service.deposit} />
  }
  if (step === 'payment') {
    return <Payment amount={service.deposit} onSuccess={handlePaymentSuccess} />
  }
  if (step === 'confirm') {
    return <Confirmation booking={booking} />
  }
  return null
}

