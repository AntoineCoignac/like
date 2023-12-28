import React, { useEffect } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from 'react';
import newRequest from '../../utils/newRequest';
import { Link, useParams } from "react-router-dom";
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import "./Pay.scss";
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe("pk_test_51NflPFHKqiimyixL9JrW6CQaTqDMzuAWGKmMK6CYI9rTDWrARrxEG5OhsWkSZzxjxSG0f2WfTzIt4DHd7rxVFrO300WpUSvRZ6");

function Pay() {
    const [clientSecret, setClientSecret] = useState("");
    const [gig, setGig] = useState({});
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();

    const { id } = useParams();

    const loadGig = async () => {
        try {
            const res = await newRequest.get(`/gigs/single/${id}`);
            return res.data;
        } catch (err) {
            console.log(err);
            navigate(-1);
        }
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await newRequest.post(`/orders/create-payment-intent/${id}`);
                setClientSecret(res.data.clientSecret);
            } catch (err) {
                console.log(err);
                navigate(-1);
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
                navigate(-1);
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

    if (JSON.stringify(gig) !== JSON.stringify({})){
        return (
                !currentUser.isSeller ? (
                    <div className='pay'>
                        {clientSecret && (
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm gig={gig} />
                            </Elements>
                        )}
                    </div>
                ) : (
                    <>
                        <span className='info-message'>Vous n'avez pas la possibilité d'acheter en tant que créateur durant la Tech Launch. <Link to={"/"}>Retourner à l'accueil</Link></span>
                    </>
                )
        )
    }else{
        return (<><span className='info-message'>Nous n'avons pas pu charger les données nécessaires. <Link to={"/"}>Retourner à l'accueil</Link></span></>)
    }
    
}

export default Pay;