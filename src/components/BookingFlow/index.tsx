import React, { useState } from 'react';
import { Slot } from '@/lib/types';
import ConfirmationPrompt from './ConfirmationPrompt';
import DetailsForm from './DetailsForm';
import ConfirmationPage from './ConfirmationPage';
import { AnimatePresence } from 'framer-motion';

interface Props { slot: Slot; onClose?: () => void }
export default function BookingFlow({ slot, onClose }: Props){
    const [step,setStep] = useState<'prompt'|'details'|'done'>('prompt');
    const [customer,setCustomer] = useState<{name:string;email:string}|null>(null);
    return (
        <>
            <AnimatePresence>
                {step==='prompt' && (
                    <ConfirmationPrompt key="p" slot={slot} onCancel={onClose??(()=>{})} onConfirm={()=>setStep('details')} />
                )}
            </AnimatePresence>

            {step==='details' && (
                <DetailsForm onNext={(d)=>{ setCustomer(d); setStep('done'); }} />
            )}

            {step==='done' && customer && (
                <ConfirmationPage slot={slot} customer={customer} />
            )}
        </>
    );
}