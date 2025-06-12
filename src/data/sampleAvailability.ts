import {DailyAvailability} from "../types/calendar";
import BookingWidget from "../components/shell/BookingWidget";

const sampleAvailability: DailyAvailability[] = [
    {
        date: new Date(2025, 5, 6), // June 6, 2025
        slots: [
            { time: "08:30 AM", available: false, label: "SOLD OUT!" },
            { time: "09:45 AM", available: false, label: "SOLD OUT!" },
            { time: "11:00 AM", available: false, label: "Waitlist" },
            { time: "12:45 PM", available: false, label: "Waitlist" },
            { time: "02:00 PM", available: true, label: "4 left!" },
            { time: "03:15 PM", available: true, label: "SPECIAL OFFER" },
        ],
    },
    {
        date: new Date(2025, 5, 7),
        slots: [
            { time: "08:30 AM", available: true, label: "5 left!" },
            { time: "10:00 AM", available: true, label: "3 left!" },
            // …etc…
        ],
    },
    // Add more dates here as needed
];

export default sampleAvailability;