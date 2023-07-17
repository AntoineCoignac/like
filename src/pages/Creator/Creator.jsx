import React from 'react'
import "./Creator.css"
import Nav from '../../components/Nav/Nav';
import { Link, useParams } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import LikeCounter from '../../components/LikeCounter/LikeCounter';
import { useContext } from 'react';
import { GlobalContext } from '../../App';
import Back from '../../components/Back/Back';
import LocationIcon from '../../icons/location/LocationIcon';
import InstagramIcon from '../../icons/social/InstagramIcon';
import YoutubeIcon from '../../icons/social/YoutubeIcon';
import TwitterIcon from '../../icons/social/TwitterIcon';
import TiktokIcon from '../../icons/social/TiktokIcon';
import Media from '../../components/Media/Media';
import Accordion from '../../components/Accordion/Accordion';
import Like from '../../icons/like/Like';

function Creator() {
  let { users, rates, translations } = useContext(GlobalContext);

  const { id } = useParams();
  let user = users.find(user => user.userId === id);
  let userRates = rates.filter(rate => rate.userId === user.userId);
  console.log(userRates)

  return (
    <>
      <div className="top-bar">
        <Back />
        <p className="name">{user.username}</p>
      </div>
      <div className="profile-ctn">
        <div className="top">
          <ProfilePicture photo={user.pp} badge={user.badge} />
          <p className="name">{user.username}</p>
          <Link className='btn' to={`/work/chat/${user.userId}`}>Contacter {user.username}</Link>
          <p className="desc">
            {user.desc}
          </p>
          <div className="infos">
            <span className="info">
              <Like/>
              <span>{user.like}</span>
            </span>
            <span className="info">
              <LocationIcon />
              <span>{user.location}</span>
            </span>
            {
              user.instagram !== "" ? (
                <span key={"insta"} className="info">
                  <InstagramIcon />
                  <span>{user.instagram}</span>
                </span>
              ) : null
            }
            {
              user.youtube !== "" ? (
                <span key={"ytb"} className="info">
                  <YoutubeIcon />
                  <span>{user.youtube}</span>
                </span>
              ) : null
            }
            {
              user.twitter !== "" ? (
                <span key={"twitter"} className="info">
                  <TwitterIcon />
                  <span>{user.twitter}</span>
                </span>
              ) : null
            }
            {
              user.tiktok !== "" ? (
                <span key={"tiktok"} className="info">
                  <TiktokIcon />
                  <span>{user.tiktok}</span>
                </span>
              ) : null
            }
          </div>
        </div>
        <div className="section">
          <span className='section-title'>Prestations</span>
          <div className="gallery">
            {
              userRates.map(rate => (
                <div className='gig-result'>
                  <Media key={rate.cover.src} type={rate.cover.type} src={rate.cover.src} />
                  <Link to={`gig/123`} className="gig">
                    <p className="title">{rate.title}</p>
                    <p className='desc'>{rate.desc}</p>
                    <div className="infos">
                      <span className="info">{rate.price}€</span>
                      <span className="info">{rate.delay} jours</span>
                      <span className="info">{rate.tag}</span>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Creator;