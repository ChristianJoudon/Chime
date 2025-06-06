import { useState } from 'react'
import { Tabs } from './components/Tabs'
import { ServicesHeader } from './components/ServicesHeader'
import { ServiceAccordion } from './components/ServiceAccordion'
import { DatesHeader } from './components/DatesHeader'
import { HeatmapCalendar } from './components/HeatmapCalendar'
import { WeeklyAgenda } from './components/WeeklyAgenda'
import { ConfirmationPrompt } from './components/ConfirmationPrompt'
import { SuccessToast } from './components/SuccessToast'
import { Service, AvailabilityMap, AvailabilityWeek, Slot } from './types/service'

export default function BookingApp() {
  const [activeTab, setActiveTab] = useState<'Services' | 'Dates'>('Services')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [pendingSlot, setPendingSlot] = useState<{ date: Date; time: string } | null>(null)
  const [showToast, setShowToast] = useState(false)

  const monthAvailability: AvailabilityMap = {
    '2025-06-01': 5,
    '2025-06-02': 0,
    '2025-06-03': 2,
  }

  const weekAvailability: AvailabilityWeek = {
    '2025-06-02': [
      { time: '08:30 AM', available: false },
      { time: '09:45 AM', available: false },
      { time: '11:00 AM', available: true },
    ],
  }

  function handleServiceSelect(svc: Service) {
    setSelectedService(svc)
    setActiveTab('Dates')
  }

  function handleDateSelect(date: Date) {
    setSelectedDate(date)
  }

  function handleSlotSelect(date: Date, slot: Slot) {
    setPendingSlot({ date, time: slot.time })
  }

  function handleConfirm() {
    setPendingSlot(null)
    setShowToast(true)
  }

  function handleCancelConfirm() {
    setPendingSlot(null)
  }

  return (
    <div className="relative bg-gray-100 min-h-screen">
      <div className="glass-root z-0" />
      <div className="relative z-10 pt-12 px-4">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="relative z-10 px-4">
        {activeTab === 'Services' && (
          <>
            <ServicesHeader />
            <ServiceAccordion onSelectService={handleServiceSelect} />
          </>
        )}
        {activeTab === 'Dates' && selectedService && (
          <>
            <DatesHeader selectedService={selectedService} />
            <HeatmapCalendar availability={monthAvailability} onSelectDate={handleDateSelect} />
            {selectedDate && (
              <WeeklyAgenda
                selectedDate={selectedDate}
                weekAvailability={weekAvailability}
                onSelectSlot={handleSlotSelect}
              />
            )}
          </>
        )}
      </div>
      {pendingSlot && (
        <ConfirmationPrompt
          date={pendingSlot.date}
          slotTime={pendingSlot.time}
          onConfirm={handleConfirm}
          onCancel={handleCancelConfirm}
        />
      )}
      {showToast && <SuccessToast onClose={() => setShowToast(false)} />}
    </div>
  )
}
