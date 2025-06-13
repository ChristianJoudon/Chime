import { motion } from 'framer-motion'
import type { DailyAvailability, Slot } from './components/types/calendar'

interface SlotModalProps {
    day: DailyAvailability
    onPick: (slot: Slot) => void
    onClose: () => void
}

export default function SlotModal({ day, onPick, onClose }: SlotModalProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed inset-0 bg-black/40 flex items-end sm:items-center sm:justify-center z-50"
        >
            <div className="glass-panel w-full sm:max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-2">{day.date.toDateString()}</h3>

                {day.slots.map((s) => (
                    <button
                        key={s.id}
                        disabled={!s.available}
                        onClick={() => {
                            if (s.available) onPick(s)
                            onClose()
                        }}
                        className={`w-full py-2 rounded-lg text-sm font-medium transition
              ${
                            s.available
                                ? 'bg-mint-500 hover:bg-mint-600 text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {s.timeLabel}
                        {s.label && <span className="ml-2 text-xs opacity-80">{s.label}</span>}
                    </button>
                ))}

                <button onClick={onClose} className="block w-full text-center text-sm mt-2 text-gray-500">
                    Close
                </button>
            </div>
        </motion.div>
    )
}