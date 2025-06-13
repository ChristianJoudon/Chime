import React from 'react';
import type { DailyAvailability, Slot } from '../src/types/calendar

interface Props {
  slot: Slot;
  customer: { name:string; email:string };
}
export default function ConfirmationPage({ slot, customer }: Props){
  return (
    <div className="space-y-3 text-center">
      <h2 className="text-2xl font-semibold text-mint-700">Booking Confirmed!</h2>
      <p>{slot.timeLabel} — ID: <code>{slot.id}</code></p>
      <p>Thanks, {customer.name}! A confirmation has been sent to {customer.email}.</p>
      <p className="text-sm text-gray-500">(Payment + calendar invite coming soon)</p>
    </div>
  );
}