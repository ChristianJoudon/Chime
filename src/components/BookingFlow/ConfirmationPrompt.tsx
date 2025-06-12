import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Slot } from '@/lib/types';

interface Props {
    slot: Slot;
    onConfirm: () => void;
    onCancel: () => void;
}
export default function ConfirmationPrompt({ slot, onConfirm, onCancel }: Props){
    const date = new Date(); // replace w/ chosen date if multi‑date support
    return (
        <motion.div
            initial={{ y:-200, opacity:0 }}
            animate={{ y:0, opacity:1, transition:{ duration:0.45, ease:'easeOut' } }}
            exit={{ y:-200, opacity:0, transition:{ duration:0.35 } }}
            className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-sm glass-panel p-6 rounded-b-3xl z-50"
        >
            <h2 className="text-xl font-semibold mb-2">Confirm Your Slot</h2>
            <p className="mb-3">You chose <b>{format(date,'MMM d, yyyy')}</b> at <b>{slot.timeLabel}</b>.</p>
            <p className="text-sm mb-4">A <span className="font-semibold text-mint-600">$20 refundable hold</span> will be placed.</p>
            <div className="flex space-x-3">
                <ContinueButton onClick={onConfirm}>Confirm & Pay</ContinueButton>
                <button onClick={onCancel} className="flex-1 py-2 rounded-lg bg-white/20 backdrop-blur-md text-mint-600">Cancel</button>
            </div>
        </motion.div>
    );