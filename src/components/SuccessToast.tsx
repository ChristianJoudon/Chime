import { motion } from 'framer-motion'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

export function SuccessToast({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed bottom-6 right-6 bg-white/30 backdrop-blur-md border border-white/25 rounded-full px-6 py-3 flex items-center space-x-2 shadow-xl z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
      onClick={onClose}
    >
      <CheckCircleIcon className="h-6 w-6 text-mint-500" />
      <span className="text-gray-900 font-medium">You\u2019re All Set! Check your inbox for confirmation.</span>
    </motion.div>
  )
}
