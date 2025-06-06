import { motion } from 'framer-motion'
import { format } from 'date-fns'

interface ConfirmationPromptProps {
  slotTime: string
  date: Date
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmationPrompt({ slotTime, date, onConfirm, onCancel }: ConfirmationPromptProps) {
  return (
    <motion.div
      className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm glass-panel-top p-6 rounded-b-3xl shadow-3xl z-50"
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }}
      exit={{ y: -200, opacity: 0, transition: { duration: 0.4 } }}
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Confirm Your Slot</h2>
      <p className="text-gray-700 mb-4">
        You\u2019ve chosen <span className="font-medium">{format(date, 'MMMM d, yyyy')}</span> at <span className="font-medium">{slotTime}</span>.
      </p>
      <p className="text-gray-700 mb-4">
        A <span className="font-semibold text-mint-600">$20 refundable hold</span> will be placed on your card. You can cancel up to 24 hours before for a full refund.
      </p>
      <div className="flex space-x-3">
        <motion.button
          className="flex-1 bg-mint-500 hover:bg-mint-600 text-white py-2 rounded-lg font-semibold shadow-md"
          whileTap={{ scale: 0.97 }}
          onClick={onConfirm}
        >
          Confirm & Pay
        </motion.button>
        <motion.button
          className="flex-1 bg-white/20 backdrop-blur-md border border-white/25 text-mint-600 py-2 rounded-lg"
          whileTap={{ scale: 0.97 }}
          onClick={onCancel}
        >
          Cancel
        </motion.button>
      </div>
    </motion.div>
  )
}
