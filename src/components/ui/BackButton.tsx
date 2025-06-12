import { motion } from 'framer-motion'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

interface BackButtonProps {
  onClick: () => void
}

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="glass-panel rounded-full p-2"
      whileHover={{ scale: 1.2, rotate: 360 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowLeftIcon className="h-5 w-5" />
    </motion.button>
  )
}
