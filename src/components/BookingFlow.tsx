// Inside BookingFlow component (simplified)
{availableSlots.map(slot => (
    <div key={slot.id} className="mb-2">
        {/* Slot button */}
        <div
            onClick={() => setExpandedSlot(slot.id === expandedSlot ? null : slot.id)}
            className="flex justify-between items-center p-3 bg-white/20 backdrop-blur-md
                 rounded-lg cursor-pointer hover:bg-white/30"
        >
            <span>{slot.timeLabel}</span>
            <span className="text-sm text-gray-500">{slot.duration} min</span>
        </div>

        {/* Expandable details */}
        <AnimatePresence initial={false}>
            {expandedSlot === slot.id && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 mt-1 bg-white/50 backdrop-blur-md rounded-lg"
                >
                    {/* Example checklist inside expanded panel */}
                    <h4 className="font-medium mb-2">Appointment Details</h4>
                    <ul className="space-y-1 text-sm">
                        <li><input type="checkbox" id="chk1" /> <label htmlFor="chk1">I have filled out the intake form</label></li>
                        <li><input type="checkbox" id="chk2" /> <label htmlFor="chk2">I agree to the terms and conditions</label></li>
                    </ul>
                    {/* Continue/confirm button */}
                    <button
                        className="mt-3 w-full bg-mint-500 text-white py-2 rounded hover:bg-mint-600"
                        onClick={() => proceedToPayment(slot)}
                    >
                        Continue
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
))}
