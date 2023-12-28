import React, { useState } from 'react'
import Back from '../../components/Back/Back'
import { Link } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import "./Gig.scss";
import { useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import { useEffect } from 'react';
import LikeCounter from '../../components/LikeCounter/LikeCounter';
import Media from '../../components/Media/Media';
import { useNavigate } from 'react-router-dom';

function Gig() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const { gigId } = useParams();
    const [gig, setGig] = useState({});
    const [user, setUser] = useState({});
    const navigate = useNavigate();

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
            navigate(-1);
        }
    };

    const loadGig = async () => {
        try {
            const res = await newRequest.get(`/gigs/single/${gigId}`);
            return res.data;
        } catch (err) {
            console.log(err);
            navigate(-1);
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
                navigate(-1);
            }
        };

        fetchData(); // Appeler la fonction asynchrone pour commencer le chargement des données
    }, []);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function formatPrice(price) {
        return price.toLocaleString('fr-FR', { minimumFractionDigits: 2 });
    }

    if (user != {} && gig.cover && gig.price) {
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
                    <div className="gig-media">
                        <Media type={gig.cover.includes('video/') ? "video" : "image"} src={gig.cover} />
                    </div>
                    <div className="gig-recap">
                        <div className="recap-item">
                            <span>{formatPrice(gig.price)}€</span>
                            <p>à payer</p>
                        </div>
                        <div className="recap-item">
                            <span>{gig.deliveryTime} jour{gig.deliveryTime > 1 ? "s" : null }</span>
                            <p>de livraison</p>
                        </div>
                        <div className="recap-item">
                            <span>{gig.revisionNumber}</span>
                            <p>modification{gig.revisionNumber > 1 ? "s" : null }</p>
                        </div>
                    </div>
                    <p className='title'>{gig.title}</p>
                    <p className='desc'>{gig.desc}</p>
                    <p className="category">Catégorie : {capitalizeFirstLetter(gig.tag)}</p>
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