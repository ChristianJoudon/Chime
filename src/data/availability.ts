import type { DailyAvailability } from '../types/calendar';

export const availability: DailyAvailability[] = [
    {
        date: new Date(2025, 5, 6),         // June 6 2025
        slots: [
            { id: 's1', timeLabel: '08:30 AM', available: false, label: 'SOLD OUT!' },
            { id: 's2', timeLabel: '11:00 AM', available: true,  label: '4 left' },
            { id: 's3', timeLabel: '02:00 PM', available: true,  label: 'Promo' },
        ],
    },
    {
        date: new Date(2025, 5, 7),
        slots: [
            { id: 's4', timeLabel: '09:00 AM', available: true },
            { id: 's5', timeLabel: '01:30 PM', available: true },
        ],
    },
];