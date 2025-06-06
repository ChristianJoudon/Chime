import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { DailyAvailability } from '../types/calendar'

interface CalendarGlassProps {
  availability: DailyAvailability[]
  onSelectDay: (availability: DailyAvailability) => void
}

export default function CalendarGlass({ availability, onSelectDay }: CalendarGlassProps) {
  const dates = availability.map(a => a.date)
  function handleSelect(day?: Date) {
    if (!day) return
    const found = availability.find(d => d.date.toDateString() === day.toDateString())
    if (found) onSelectDay(found)
  }
  return (
    <div className="glass-panel p-4">
      <DayPicker
        mode="single"
        onSelect={handleSelect}
        modifiers={{ available: dates }}
        modifiersClassNames={{ available: 'bg-mint/30 text-mint' }}
      />
    </div>
  )
}
