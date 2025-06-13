import React, { useState } from 'react';
import { ContinueButton } from '@/components/ui/ContinueButton';

interface Props { onNext: (details: { name:string; email:string }) => void }
export default function DetailsForm({ onNext }: Props){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    return (
        <form className="space-y-3" onSubmit={(e: any) => { e.preventDefault(); onNext({ name, email }); }}>
            <input required value={name} onChange={(e: any) => setName((e.target as HTMLInputElement).value)} placeholder="Name" className="w-full rounded border p-2" />
            <input required type="email" value={email} onChange={(e: any) => setEmail((e.target as HTMLInputElement).value)} placeholder="Email" className="w-full rounded border p-2" />
            <ContinueButton disabled={!name||!email}>Continue</ContinueButton>
        </form>
    );
}