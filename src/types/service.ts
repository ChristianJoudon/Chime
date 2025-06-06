export interface Service {
  id: string;
  name: string;
  duration: string;
  description: string;
  requiresHardware: boolean;
  hardwareDelayDays?: number;
}

export interface Slot {
  time: string;
  available: boolean;
}

export type AvailabilityMap = Record<string, number>;
export type AvailabilityWeek = Record<string, Slot[]>;
