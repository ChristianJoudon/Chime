import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Slot } from '@/lib/types'
import ConfirmationPrompt from './ConfirmationPrompt'
import DetailsForm       from './DetailsForm'
import Payment           from './Payment'
import ConfirmationPage  from './ConfirmationPage'

type Step = 'prompt' | 'checklist' | 'details' | 'payment' | 'done'

export default function BookingFlow({ slot, onClose }: { slot: Slot; onClose?: () => void }) {
    const [step, setStep] = useState<Step>('prompt')
    const [customer, setCustomer] = useState<{ name: string; email: string } | null>(null)

    /* ───────────────────────────────── checklist logic ───────────────────────── */
    const [checks, setChecks] = useState({ intake: false, terms: false })
    const allChecked = Object.values(checks).every(Boolean)

    /* ───────────────────────────────────────── UI ────────────────────────────── */
    return (
        <div className="space-y-6">
            {/* ➊ PROMPT (small banner at top of flow) */}
            <AnimatePresence>
                {step === 'prompt' && (
                    <ConfirmationPrompt
                        key="prompt"
                        slot={slot}
                        onCancel={onClose ?? (() => {})}
                        onConfirm={() => setStep('checklist')}
                    />
                )}
            </AnimatePresence>

            {/* ➋ CHECKLIST accordion */}
            {step === 'checklist' && (
                <motion.div
                    key="checklist"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="glass-panel-front p-4 rounded-xl"
                >
                    <h3 className="font-semibold text-lg mb-3">Before we lock it in…</h3>
                    <label className="block mb-2">
                        <input
                            type="checkbox"
                            className="mr-2 accent-mint-500"
                            checked={checks.intake}
                            onChange={() => setChecks(c => ({ ...c, intake: !c.intake }))}
                        />
                        I’ve completed the short intake form
                    </label>
                    <label className="block mb-4">
                        <input
                            type="checkbox"
                            className="mr-2 accent-mint-500"
                            checked={checks.terms}
                            onChange={() => setChecks(c => ({ ...c, terms: !c.terms }))}
                        />
                        I agree to the terms & conditions
                    </label>

                    <motion.button
                        disabled={!allChecked}
                        whileTap={{ scale: allChecked ? 0.97 : 1 }}
                        className={`w-full py-2 rounded-lg font-medium transition
              ${allChecked
                            ? 'bg-mint-500 text-white hover:bg-mint-600'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        onClick={() => allChecked && setStep('details')}
                    >
                        Continue
                    </motion.button>
                </motion.div>
            )}

            {/* ➌ DETAILS FORM */}
            {step === 'details' && (
                <DetailsForm
                    onNext={d => {
                        setCustomer(d)
                        setStep('payment')
                    }}
                />
            )}

            {/* ➍ PAYMENT mock */}
            {step === 'payment' && customer && (
                <Payment
                    amount={20}
                    onSuccess={() => setStep('done')}
                />
            )}

            {/* ➎ FINAL PAGE */}
            {step === 'done' && customer && <ConfirmationPage slot={slot} customer={customer} />}
        </div>
    )
}