import { motion } from 'framer-motion'

interface TabsProps {
  activeTab: 'Services' | 'Dates'
  setActiveTab: (tab: 'Services' | 'Dates') => void
}

export function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const tabs: ('Services' | 'Dates')[] = ['Services', 'Dates']
  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <nav className="flex space-x-4 rounded-full bg-white/20 backdrop-blur-md p-1 shadow-md">
        {tabs.map(tab => (
          <motion.button
            key={tab}
            className={
              `px-6 py-2 font-semibold text-lg rounded-full ` +
              (activeTab === tab
                ? 'bg-mint-500 text-white shadow-xl'
                : 'text-mint-700 hover:bg-mint-100/60')
            }
            onClick={() => setActiveTab(tab)}
            whileTap={{ scale: 0.95 }}
          >
            {tab === 'Services' ? '🔧 Services' : '📅 Dates'}
          </motion.button>
        ))}
      </nav>
    </div>
  )
}
