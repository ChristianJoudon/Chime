export interface TimeSlot {
  time: string
  available: boolean
  label?: string
}

export interface DailyAvailability {
  date: Date
  slots: TimeSlot[]
}
