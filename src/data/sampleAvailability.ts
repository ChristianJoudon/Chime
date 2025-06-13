import type { DailyAvailability } from '../types/calendar';

export const sampleAvailability: DailyAvailability[] = [
    {
        date: new Date(2025, 5, 6),
        slots: [
            { id: 'x1', timeLabel: '08:30 AM', available: false, label: 'SOLD OUT!' },
            { id: 'x2', timeLabel: '09:45 AM', available: false, label: 'SOLD OUT!' },
            { id: 'x3', timeLabel: '11:00 AM', available: false, label: 'Waitlist'  },
            { id: 'x4', timeLabel: '12:45 PM', available: false, label: 'Waitlist'  },
            { id: 'x5', timeLabel: '02:00 PM', available: true,  label: '4 left!'  },
            { id: 'x6', timeLabel: '03:15 PM', available: true,  label: 'SPECIAL OFFER' },
        ],
    },
    {
        date: new Date(2025, 5, 7),
        slots: [
            { id: 'y1', timeLabel: '08:30 AM', available: true,  label: '5 left!' },
            { id: 'y2', timeLabel: '10:00 AM', available: true,  label: '3 left!' },
        ],
    },
];