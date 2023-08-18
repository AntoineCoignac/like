import React, { useState, useRef, useEffect } from 'react';
import Media from '../Media/Media';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import LikeCounter from '../LikeCounter/LikeCounter';
import { Link } from 'react-router-dom';
import "./Card.css";
import newRequest from '../../utils/newRequest';
import BackArrow from '../../icons/back/BackArrow';

function Card({ rate, userId }) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const [play, setPlay] = useState(false);
    const cardRef = useRef(null);

    const [user, setUser] = useState(null);

    const loadUser = async () => {
        try {
            const res = await newRequest.get(`/users/${userId}`);
            setUser(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.8, // Définir la limite à 80% de la visibilité
        };

        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.target === cardRef.current) {
                    if (entry.intersectionRatio >= 0.8) {
                        setPlay(true); // Le composant est visible à plus de 80%
                    } else {
                        setPlay(false); // Le composant n'est pas suffisamment visible
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, options);
        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    useEffect(() => {
        loadUser(); // Call the loadUser function here to fetch user data
    }, []);

    const windowWidth = window.innerWidth;

    return (
        <div className="card" ref={cardRef}>
            <div className="media-ctn">
                <Media type={rate.cover.includes('video/') ? "video" : "image"} src={rate.cover} play={windowWidth < 600 ? play : false} />
            </div>
            <div className="card-content">
                <div>
                    <Link to={`gig/${rate._id}`} className="gig">
                        <p className="title">{rate.title}</p>
                        <p className='desc'>{rate.desc}</p>
                        <div className="infos">
                            <span className="info">{rate.price}€</span>
                            <span className="info">{rate.deliveryTime} jours</span>
                            <span className="info">{rate.revisionNumber} modifications</span>
                            <span className="info">{rate.tag}</span>
                        </div>
                    </Link>
                    {
                        user ? (
                            <div className="user">
                                <Link to={`/user/${user._id}`}>
                                    <ProfilePicture photo={user.img} badge={user.sub ? user.sub : 0} />
                                </Link>
                                <LikeCounter nbr={user.like} />
                            </div>
                        ) : null
                    }

                </div>
                {user ? (
                    currentUser ? (
                        userId !== currentUser._id ? (
                            <Link className='btn' to={`/pay/${rate._id}`}>
                                Commander à {`${user.name} ${user.lastname.charAt(0)}.`}
                            </Link>
                        ) : (
                            <Link className='arrow-button' to={`/editgig/${rate._id}`}>
                                <span>Modifier</span>
                                <BackArrow />
                            </Link>
                        )) : <Link className='btn' to={`/login`}>
                                Commander à {`${user.name} ${user.lastname.charAt(0)}.`}
                            </Link>
                ) : null}
            </div>
        </div>
    )
}

export default Card;