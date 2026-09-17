import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { stripePromise } from "@/lib/stripe";

export const BookingComplete = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<"loading" | "succeeded" | "processing" | "failed">("loading");

    useEffect(() => {
        const clientSecret = searchParams.get("payment_intent_client_secret");
        if (!clientSecret) return;

        stripePromise.then(async (stripe) => {
            if (!stripe) return;
            const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
            if(paymentIntent){
                if(paymentIntent.status === "succeeded"){
                    setStatus("succeeded");
                }else if(paymentIntent.status === "processing"){
                    setStatus("processing");
                }else{
                    setStatus("failed");
                }
            }
        });
    }, [searchParams]);

    if (status === "loading") return <p>Checking payment status...</p>;
    if (status === "succeeded") return <p>Booking confirmed! Check your email.</p>;
    if (status === "processing") return <p>Payment is processing, we'll email you shortly.</p>;
    return <p>Payment failed. Please try again.</p>;
};