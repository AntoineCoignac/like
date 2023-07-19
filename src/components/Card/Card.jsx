import React, { useState, useRef, useEffect } from 'react';
import Media from '../Media/Media';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import LikeCounter from '../LikeCounter/LikeCounter';
import { Link } from 'react-router-dom';
import "./Card.css";

function Card({ rateId, userId }) {
    console.log(userId);

    const [play, setPlay] = useState(false);
    const cardRef = useRef(null);

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

    const windowWidth = window.innerWidth;

    return (
        <div className="card" ref={cardRef}>
            <div className="media-ctn">
                <Media type="video" src="/img/post/video/video1.mp4" play={windowWidth < 600 ? play : false} />
            </div>
            <div className="card-content">
                <div>
                    <Link to={`gig/123`} className="gig">
                        <p className="title">Lorem Ipsum</p>
                        <p className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deleniti asperiores amet itaque nulla voluptas ipsam earum autem ab repellendus!</p>
                        <div className="infos">
                            <span className="info">100€</span>
                            <span className="info">5 jours</span>
                            <span className="info">influence</span>
                        </div>
                    </Link>
                    <div className="user">
                        <Link to={`/creator/${1}`}>
                            <ProfilePicture photo="/img/pp/user1.jpg" badge={1} />
                        </Link>
                        <LikeCounter nbr={20} />
                    </div>
                </div>
                <Link className='btn' to={`/work/chat/${1}`}>Contacter {"Lorem"}</Link>
            </div>
        </div>
    )
}

export default Card;