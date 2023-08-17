import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import Back from "../Back/Back";
import "./CheckoutForm.css";

function CheckoutForm({gig={}}) {
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000/success",
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    };


    return (
        <>
            <div className="top-bar">
                <Back />
                <p className="name big-title">Commander</p>
            </div>
            <div className="payment-ctn">
                <h1>{gig.title}</h1>
                <form id="payment-form" onSubmit={handleSubmit}>
                    <LinkAuthenticationElement
                        id="link-authentication-element"
                        onChange={(e) => {
                            if (e && e.target && e.target.value) {
                                setEmail(e.target.value);
                            }
                        }}
                    />

                    <PaymentElement id="payment-element" options={paymentElementOptions} />

                    <div className="gig-info">
                        <p className="price">Total : {gig.price}€</p>
                    </div>

                    <button className="payment-btn" disabled={isLoading || !stripe || !elements} id="submit">
                        <span id="button-text">
                            {isLoading ? <div className="spinner" id="spinner"></div> : "Commander"}
                        </span>
                    </button>
                    <span className="security">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9 15.3246L16.6 9.62461L15.55 8.59961L10.975 13.1746L8.45 10.6496L7.35 11.7496L10.9 15.3246ZM12 21.9746C9.66667 21.3913 7.75 20.0371 6.25 17.9121C4.75 15.7871 4 13.4579 4 10.9246V4.97461L12 1.97461L20 4.97461V10.9246C20 13.4579 19.25 15.7871 17.75 17.9121C16.25 20.0371 14.3333 21.3913 12 21.9746ZM12 20.4246C13.9167 19.7913 15.4792 18.5954 16.6875 16.8371C17.8958 15.0788 18.5 13.1079 18.5 10.9246V6.02461L12 3.57461L5.5 6.02461V10.9246C5.5 13.1079 6.10417 15.0788 7.3125 16.8371C8.52083 18.5954 10.0833 19.7913 12 20.4246Z" fill="#0C70E7"/>
                        </svg>
                        Paiement sécurisé par Stripe®
                    </span>
                    {/* Show any error or success messages */}
                    {message && <div id="payment-message">{message}</div>}
                </form>
            </div>
        </>

    )
}

export default CheckoutForm;