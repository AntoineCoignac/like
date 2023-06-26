import React, { useContext, useState } from 'react';
import Media from '../Media/Media';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import LikeCounter from '../LikeCounter/LikeCounter';
import { Link } from 'react-router-dom';
import "./Card.css";
import { GlobalContext } from '../../App';

function Card({ rateId, userId }) {
    console.log(userId);
    let { users, rates, translations } = useContext(GlobalContext);
    let rate = rates.find(rate => rate.rateId === rateId);
    let cardUser = users.find(aUser => aUser.userId === userId);
    const [isPlaying, setIsPlaying] = useState(true);

    return (
        <div className="card">
            <Link className='btn absolute' to={`/work/chat/${userId}`}>Contacter</Link>
            <img src={cardUser.pp} alt="profile picture" className="background" />
            <div className="bg-filter"></div>
            <div className="media-ctn">
                <Media type={rate.cover.type} src={rate.cover.src} play={isPlaying} />
            </div>
            {
                rate.cover.type === "video" ? 
                    (
                        <button className="play" onClick={() => setIsPlaying(!isPlaying)}>
                            
                        </button>
                    ) : null
            }
            <div className="scrollable">
                <div className="txt">
                    <div className="top">
                        <Link to={`/creator/${cardUser.userId}`} className="profile">
                            <ProfilePicture photo={cardUser.pp} badge={cardUser.badge} />
                            <span>{cardUser.username}</span>
                        </Link>
                        <LikeCounter nbr={cardUser.like} />
                    </div>
                    <div className="rate">
                        <div className="rate-info">
                            <button className="filter" id={rate.tag}>{translations.tags[rate.tag].fr}</button>
                            <span className="title">{rate.title}</span>
                            <span className="price">{rate.price} €</span>
                        </div>
                        <p className="desc">
                            {rate.desc.split("\n").map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </p>
                        <p className="delay">Livraison : {rate.delay} jour{rate.delay > 1 ? "s" : ""}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;