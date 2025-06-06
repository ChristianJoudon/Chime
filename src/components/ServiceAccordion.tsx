import { useState } from 'react'
import { motion } from 'framer-motion'
import { hoverLift } from '../motionConfigs'
import { Service } from '../types/service'

interface ServiceAccordionProps {
  onSelectService: (svc: Service) => void
}

const services: Service[] = [
  {
    id: 'first_consult',
    name: 'First-Time Tech Check (Free – 30 min)',
    duration: '30 min',
    description: 'Let\u2019s diagnose your gear, no strings attached.',
    requiresHardware: false,
  },
  {
    id: 'emergency',
    name: 'Emergency Rescue: System Down (60 min)',
    duration: '60 min',
    description: 'If your setup\u2019s on fire (metaphorically), we jump in.',
    requiresHardware: false,
  },
  {
    id: 'tune_up',
    name: 'One-Hour Tune-Up (60 min – $20 Hold)',
    duration: '60 min',
    description: 'Give your rig a performance boost.',
    requiresHardware: false,
  },
  {
    id: 'starlink',
    name: 'Network Overhaul (2 hrs – Hardware Required)',
    duration: '120 min',
    description: 'Starlink, routers, cabling—let\u2019s get it humming again.',
    requiresHardware: true,
    hardwareDelayDays: 14,
  },
]

export function ServiceAccordion({ onSelectService }: ServiceAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      {services.map(svc => {
        const isOpen = openId === svc.id
        return (
          <motion.div key={svc.id} className="glass-panel-base p-5" {...hoverLift}>
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold text-gray-900">{svc.name}</h3>
              <button
                className="text-xl text-mint-600 hover:text-mint-800"
                onClick={() => setOpenId(isOpen ? null : svc.id)}
              >
                {isOpen ? '▾' : '▸'}
              </button>
            </div>
            <p className="mt-1 text-gray-700">{svc.description}</p>
            <p className="mt-1 text-sm text-gray-500 italic">{svc.duration}</p>
            {isOpen && (
              <motion.div
                className="mt-4 space-y-3 border-t border-white/30 pt-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1, transition: { duration: 0.4 } }}
                exit={{ height: 0, opacity: 0, transition: { duration: 0.3 } }}
              >
                {svc.requiresHardware ? (
                  <div className="glass-panel-front p-4 space-y-2">
                    <p className="text-gray-800">
                      ⚠️ You\u2019ll need your own Starlink hardware. It can take up to {svc.hardwareDelayDays} days to arrive.
                    </p>
                    <a
                      href="https://www.starlink.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-mint-600 hover:underline"
                    >
                      Order Starlink Now
                    </a>
                  </div>
                ) : (
                  <div className="glass-panel-front p-4">
                    <p className="text-gray-800">
                      No hardware required—just show up with your device, and we\u2019ll handle the rest.
                    </p>
                  </div>
                )}
                <motion.button
                  className="mt-4 bg-mint-500 hover:bg-mint-600 text-white font-semibold rounded-lg py-2 px-5 shadow-md"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSelectService(svc)}
                >
                  I\u2019m In!
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
