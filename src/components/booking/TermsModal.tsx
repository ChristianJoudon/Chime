import { motion, AnimatePresence } from 'framer-motion';

export default function TermsModal({
                                       open,
                                       onClose,
                                   }: {
    open   : boolean;
    onClose: () => void;
}) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    onClick={onClose}                 /* click backdrop = close */
                >
                    <motion.article
                        initial={{ scale: .9, y: 40 }}
                        animate={{ scale: 1,  y: 0 }}
                        exit={{    scale: .9, y: 40 }}
                        className="max-h-[80vh] w-[90vw] max-w-lg overflow-auto rounded-2xl bg-white p-6 shadow-2xl"
                        onClick={e => e.stopPropagation()} /* keep clicks inside */
                    >
                        <h2 className="text-xl font-semibold mb-4">Terms &amp; Conditions</h2>

                        {/* Replace with your real legal text */}
                        <p className="mb-3 text-sm leading-relaxed">
                            By booking an appointment you agree to our service policies,
                            refund rules, and liability waivers. In summary: …
                        </p>
                        <ul className="mb-4 list-disc list-inside space-y-1 text-sm">
                            <li>24-hour reschedule window.</li>
                            <li>No-show = deposit forfeited.</li>
                            <li>All data handled per GDPR.</li>
                        </ul>

                        <a
                            href="/docs/chime-terms.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-lg bg-mint-500 px-4 py-2 text-white hover:bg-mint-600"
                        >
                            Download full PDF
                        </a>
                    </motion.article>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
