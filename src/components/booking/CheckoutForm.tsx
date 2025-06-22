import { useState }                      from 'react';
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

interface Props {
    amount: number;                                       // not used here, but handy
    onSuccess: (r: { paymentIntentId: string }) => void;
}

export default function CheckoutForm({ onSuccess }: Props) {
    const stripe   = useStripe();
    const elements = useElements();
    const [paying,   setPaying]   = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!stripe || !elements) return;

        setPaying(true);
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });
        setPaying(false);

        if (error) {
            setErrorMsg(error.message ?? 'Payment failed.');
            return;
        }
        onSuccess({ paymentIntentId: paymentIntent!.id });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement />
            <button
                className={`w-full py-2 rounded-lg font-medium transition
          ${!stripe || paying
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-mint-500 text-white hover:bg-mint-600'}`}
                disabled={!stripe || paying}
            >
                Pay Deposit
            </button>
            {errorMsg && <p className="text-sm text-coral-600">{errorMsg}</p>}
        </form>
    );
}