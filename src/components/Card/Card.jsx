import React, { useState, useRef, useEffect } from 'react';
import Media from '../Media/Media';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { Link } from 'react-router-dom';
import "./Card.scss";
import newRequest from '../../utils/newRequest';

function Card({ rate, userId }) {
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
            threshold: 0.88, // Définir la limite à 80% de la visibilité
        };

        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setPlay(true);
                } else {
                    setPlay(false);
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
    }, [user]); // Empty dependency array ensures this effect runs once on mount

    useEffect(() => {
        loadUser();
    }, []);

    const windowWidth = window.innerWidth;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function formatPrice(price) {
        return price.toLocaleString('fr-FR', { minimumFractionDigits: 2 });
    }

    if (user) {
        return (
            <div className="card" ref={cardRef}>
                <div className="media-ctn">
                    <Media type={rate.cover.includes('video/') ? "video" : "image"} src={rate.cover} play={windowWidth < 600 ? play : false} />
                </div>
                <Link to={`/user/${user._id}`} className="card-content">
                    <Link to={`/user/${user._id}`}>
                        <ProfilePicture photo={user.img} badge={user.sub ? user.sub : 0} />
                    </Link>
                    <div className="gig">
                        <p className="gig-title">
                            {rate.title}
                        </p>
                        <div className="infos">
                            <span className='info'>{`${user.name} ${user.lastname.charAt(0)}.`}</span>
                            <span className="info">{formatPrice(rate.price)}€</span>
                            <span className="info"># {capitalizeFirstLetter(rate.tag)}</span>
                        </div>
                    </div>
                </Link>
            </div>
        )
    } else {
        return ""
    }
}

export default Card;
