import React, { useState } from 'react'
import Back from '../../components/Back/Back'
import { Link } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import "./Gig.css";
import { useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import { useEffect } from 'react';
import LikeCounter from '../../components/LikeCounter/LikeCounter';

function Gig() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const { gigId } = useParams();
    const [gig, setGig] = useState({});
    const [user, setUser] = useState({});

    const loadUser = async (userId) => {
        try {
            const res = await newRequest.get(`/users/${userId}`);
            // Récupérer le lastname complet depuis res.data
            const lastname = res.data.lastname;

            // Obtenir le premier caractère du lastname
            const firstCharOfLastname = lastname.charAt(0);

            // Créer un nouvel objet avec les propriétés du res.data et mettre à jour seulement lastname
            const updatedData = { ...res.data, lastname: firstCharOfLastname };

            // Mettre à jour le state de l'utilisateur avec le nouvel objet
            setUser(updatedData);
        } catch (err) {
            console.log(err);
        }
    };

    const loadGig = async () => {
        try {
            const res = await newRequest.get(`/gigs/single/${gigId}`);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gigData = await loadGig(); // Attendre la résolution de la promesse
                setGig(gigData);

                // Après avoir récupéré les données du gig, vous pouvez maintenant charger l'utilisateur en utilisant gigData.userId
                loadUser(gigData.userId);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData(); // Appeler la fonction asynchrone pour commencer le chargement des données
    }, []);

    if (user != {} && gig != {}) {
        return (
            <>
                <div className="top-bar">
                    <Back />
                    <p className="name big-title">{gig.title}</p>
                </div>
                <div className="gig-ctn">
                    <div className="top-gig">
                        <Link to={`/user/${user._id}`} className="profile">
                            <ProfilePicture photo={user.img} badge={user.sub} />
                            <p className='name'>{user.name} {user.lastname}.</p>
                        </Link>
                        <LikeCounter nbr={user.like} />
                    </div>

                    <div className="infos">
                        <span className="info">{gig.price}€</span>
                        <span className="info">{gig.deliveryTime} jours</span>
                        <span className="info">{gig.revisionNumber} modifications</span>
                        <span className="info">{gig.tag}</span>
                    </div>
                    <p className='desc'>{gig.desc}</p>
                </div>
                {
                    currentUser ? (
                        currentUser._id !== user._id ?
                            <div className="fixed-btn">
                                <Link className='btn' to={`/pay/${gig._id}`}>Commander à {user.name} {user.lastname}.</Link>
                            </div>
                            : null)
                        : 
                        <div className="fixed-btn">
                            <Link className='btn' to={`/login`}>Commander à {user.name} {user.lastname}.</Link>
                        </div>
                }
            </>
        )
    } else {
        return (
            <></>
        )
    }

}

export default Gig;