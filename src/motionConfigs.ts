export const hoverLift = {
  whileHover: {
    scale: 1.03,
    backdropFilter: 'blur(24px)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.2)'
  },
  transition: { duration: 0.2, ease: 'easeOut' },
}

export const pressDent = {
  whileTap: {
    scale: 0.97,
    boxShadow: '0 6px 20px rgba(0,0,0,0.25)'
  },
  transition: { type: 'spring', stiffness: 400, damping: 20 },
}
