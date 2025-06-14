// src/types/calendar.ts
export interface Slot {
  id: string;             // unique id
  timeLabel: string;      // "03:30 PM"
  available: boolean;
  label?: string;         // "SOLD OUT!" / "4 left" / etc
}

export interface DailyAvailability {
  date: Date;             // JS Date object (midnight of that day)
  slots: Slot[];
}

/** A quick look-up map used by WeeklyAgenda:
 *  { "2025-06-06": [ …slots… ], "2025-06-07": [ … ] }  */
export type AvailabilityWeek = Record<string, Slot[]>;