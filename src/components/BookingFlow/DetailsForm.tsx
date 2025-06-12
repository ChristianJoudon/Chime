import React, { useState } from 'react';
import { ContinueButton } from '@/components/ui/ContinueButton';

interface Props { onNext: (details: { name:string; email:string }) => void }
export default function DetailsForm({ onNext }: Props){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    return (
        <form className="space-y-3" onSubmit={e=>{e.preventDefault(); onNext({name,email});}}>
            <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full rounded border p-2" />
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full rounded border p-2" />
            <ContinueButton disabled={!name||!email}>Continue</ContinueButton>
        </form>
    );
}