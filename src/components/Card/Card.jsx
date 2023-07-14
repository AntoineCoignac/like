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

    return (
        <div className="card">
            <div className="media-ctn">
                <Media type={rate.cover.type} src={rate.cover.src} />
            </div>
            <div className="card-content">
                <div>
                    <Link to={`gig/123`} className="gig">
                        <p className="title">{rate.title}</p>
                        <p className='desc'>{rate.desc}</p>
                        <div className="infos">
                            <span className="info">{rate.price}€</span>
                            <span className="info">{rate.delay} jour{rate.delay > 1 ? "s" : ""}</span>
                            <span className="info">{translations.tags[rate.tag].fr}</span>
                        </div>
                    </Link>
                    <div className="user">
                        <Link to={`/creator/${cardUser.userId}`}>
                            <ProfilePicture photo={cardUser.pp} badge={cardUser.badge} />
                        </Link>
                        <LikeCounter nbr={cardUser.like} />
                    </div>
                </div>
                <Link className='btn' to={`/work/chat/${userId}`}>Contacter {cardUser.username}</Link>
            </div>
        </div>
    )
}

export default Card;