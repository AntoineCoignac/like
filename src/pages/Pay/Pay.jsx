import React, { useEffect } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from 'react';
import newRequest from '../../utils/newRequest';
import { useParams } from "react-router-dom";
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import "./Pay.css";

const stripePromise = loadStripe("pk_test_51NflPFHKqiimyixL9JrW6CQaTqDMzuAWGKmMK6CYI9rTDWrARrxEG5OhsWkSZzxjxSG0f2WfTzIt4DHd7rxVFrO300WpUSvRZ6");

function Pay() {
    const [clientSecret, setClientSecret] = useState("");
    const [gig, setGig] = useState({});

    const { id } = useParams();

    const loadGig = async () => {
        try {
            const res = await newRequest.get(`/gigs/single/${id}`);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await newRequest.post(`/orders/create-payment-intent/${id}`);
                setClientSecret(res.data.clientSecret);
            } catch (err) {
                console.log(err);
            }
        }
        makeRequest();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gigData = await loadGig(); // Attendre la résolution de la promesse
                setGig(gigData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData(); // Appeler la fonction asynchrone pour commencer le chargement des données
    }, []);

    const appearance = {
        theme: 'stripe',
    }

    const options = {
        clientSecret,
        appearance
    };

    if (gig !== {}){
        return (
            <div className='pay'>
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm gig={gig} />
                    </Elements>
                )}
            </div>
        )
    }else{
        return (<></>)
    }
    
}

export default Pay;