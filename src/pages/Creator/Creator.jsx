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

function Creator() {
  let { users, rates, translations } = useContext(GlobalContext);

  const { id } = useParams();
  let user = users.find(user => user.userId === id);
  let userRates = rates.filter(rate => rate.userId === user.userId);
  console.log(userRates)

  return (
    <>
      <Nav />
      <div className="creator">
        <Link className='btn fixed' to={`/work/chat/${user.userId}`}>Contacter</Link>
        <div className="top">
          <Back />
          <div className="user-info-top">
            <div to={`/creator/${user.userId}`} className="profile">
              <ProfilePicture photo={user.pp} badge={user.badge} />
              <span>{user.username}</span>
            </div>
            <LikeCounter nbr={user.like} />
          </div>

        </div>
        <div className="tags">
        { 
          user.tags.map(tag => (
            <button key={tag} className="filter">{translations.tags[tag].fr}</button>
          )
          )
        }
        </div>
        <p className="desc">
          {user.desc}
        </p>
        <div className="info location">
            <LocationIcon/>
            <span>{user.location}</span>
          </div>
        <div className="infos">
          {
            user.instagram !== "" ? (
              <div key={"insta"} className="info">
                <InstagramIcon/>
                <span>{user.instagram}</span>
              </div>
            ) : null
          }
          {
            user.youtube !== "" ? (
              <div key={"ytb"} className="info">
                <YoutubeIcon/>
                <span>{user.youtube}</span>
              </div>
            ) : null
          }
          {
            user.twitter !== "" ? (
              <div key={"twitter"} className="info">
                <TwitterIcon/>
                <span>{user.twitter}</span>
              </div>
            ) : null
          }
          {
            user.tiktok !== "" ? (
              <div key={"tiktok"} className="info">
                <TiktokIcon/>
                <span>{user.tiktok}</span>
              </div>
            ) : null
          }
        </div>
        <div className="portfolio">
            {
              user.gallery.map(media=>(
                <div className="pf-item">
                  <Media key={media.src} type={media.type} src={media.src}/>
                </div>
              ))
            }
            {
              userRates.map(rate=>(
                <div className="pf-item">
                  <Media key={rate.cover.src} type={rate.cover.type} src={rate.cover.src}/>
                </div>
              ))
            }
        </div>
        <div className="accordion-list">
          {
            userRates.map(rate => (
              <Accordion title={rate.title} price={rate.price} content={rate.desc} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Creator;