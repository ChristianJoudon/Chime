import { useEffect, useState }            from 'react';
import { loadStripe }                     from '@stripe/stripe-js';
import { Elements, Appearance }           from '@stripe/react-stripe-js';
import CheckoutForm                       from './CheckoutForm';

/* ─── props ─── */
export interface PaymentProps {
    amount: number;                                        // cents
    onSuccess: (r: { paymentIntentId: string }) => void;
}

/* ─── Stripe instance (outside component) ─── */
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

export default function Payment({ amount, onSuccess }: PaymentProps) {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const appearance: Appearance = { theme: 'stripe' };    // tweak colours later

    /* fetch PI ⤵︎ once on mount */
    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body   : JSON.stringify({ amount }),
        })
            .then(r => r.json())
            .then(({ clientSecret }) => setClientSecret(clientSecret))
            .catch(() => console.error('⚠️  Payment-intent request failed'));
    }, [amount]);

    /* render children only when ready */
    if (!clientSecret) return <p>Loading payment …</p>;

    return (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
            <CheckoutForm amount={amount} onSuccess={onSuccess} />
        </Elements>
    );
}