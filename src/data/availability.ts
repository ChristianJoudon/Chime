import { DailyAvailability } from '@/lib/types';

export const availability: DailyAvailability[] = [
    {
        date: new Date(2025, 5, 6),
        slots: [
            { id: '1', timeLabel: '08:30 AM', available: false, label: 'SOLD OUT!' },
            { id: '2', timeLabel: '11:00 AM', available: true,  label: '4 left' },
            { id: '3', timeLabel: '02:00 PM', available: true,  label: 'Promo' },
        ],
    },
    {
        date: new Date(2025, 5, 7),
        slots: [
            { id: '4', timeLabel: '09:00 AM', available: true },
            { id: '5', timeLabel: '01:30 PM', available: true },
        ],
    },
];