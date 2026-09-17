import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!stripe || !elements) return

        setSubmitting(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/booking/complete`,
            },
        });

        if (error) {
            setErrorMessage(error.message ?? "Payment failed, please try again");
            setSubmitting(false)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button type="submit" disabled={!stripe || submitting}>
                {submitting ? "Processing..." : "Pay now"}
            </button>
        </form>
    );
};