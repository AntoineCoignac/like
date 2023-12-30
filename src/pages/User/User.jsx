import React from 'react'
import "./User.scss";
import { Link, useParams } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import Back from '../../components/Back/Back';
import LocationIcon from '../../icons/location/LocationIcon';
import InstagramIcon from '../../icons/social/InstagramIcon';
import YoutubeIcon from '../../icons/social/YoutubeIcon';
import TwitterIcon from '../../icons/social/TwitterIcon';
import TiktokIcon from '../../icons/social/TiktokIcon';
import LinkedinIcon from '../../icons/social/LinkedinIcon';
import Media from '../../components/Media/Media';
import Like from '../../icons/like/Like';
import { useState } from 'react';
import newRequest from '../../utils/newRequest';
import { useEffect } from 'react';
import Load from '../../components/Load/Load';
import { useNavigate } from 'react-router-dom';
import BackArrow from '../../icons/back/BackArrow';
import { useRef } from 'react';

function User() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [user, setUser] = useState(null);
  const [userGigs, setUserGigs] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const loadUser = async () => {
    try {
      const res = await newRequest.get(`/users/${id}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
      navigate(-1);
    }
  };

  const loadUserGigs = async () => {
    try {
      const res = await newRequest.get(`/gigs?userId=${id}`);
      setUserGigs(res.data);
    } catch (err) {
      console.log(err);
      navigate(-1);
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    loadUser();
    loadUserGigs();
  }, []); // Empty dependency array to ensure this effect runs only once

  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function formatPrice(price) {
      return price.toLocaleString('fr-FR', { minimumFractionDigits: 2 });
  }

  const gigsWrapperRef = useRef(null);

  const scrollLeft = () => {
    if (gigsWrapperRef.current) {
      gigsWrapperRef.current.scrollBy({
        top: 0,
        left: -gigsWrapperRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (gigsWrapperRef.current) {
      gigsWrapperRef.current.scrollBy({
        top: 0,
        left: gigsWrapperRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  // Check if user data is still loading
  if (!user || !userGigs) {
    return <Load/>;
  } else {
    if (user.isSeller) {
      return (
        <>
          <div className="top-bar">
            <Back />
            <p className="name big-title">{`${user.name} ${user.lastname.charAt(0)}.`}</p>
          </div>
          <div className="grid-wrapper">
            <div className="portfolio-wrapper">
              <div className="left">
                <div className="user-wrapper">
                  <div className="user">
                    <ProfilePicture photo={user.img} badge={user.sub} />
                    <p className="name">{`${user.name} ${user.lastname.charAt(0)}.`}</p>
                  </div>
                  <p className="desc">
                    {user.desc ? user.desc : "Aucune information"}
                  </p>
                  <div className="infos">
                    {
                      user.tag ? (
                        <span className="info">
                          #
                          <span>{capitalizeFirstLetter(user.tag)}</span>
                        </span>) :null 
                    }
                    {
                      user.location ? (
                        <span key={"location"} className="info">
                          <LocationIcon />
                          <span>{user.location}</span>
                        </span>
                      ) : null
                    }
                    <span className="info">
                      <Like />
                      <span>{user.like}</span>
                    </span>
                  </div>
                </div>
                {
                  currentUser ? (
                  currentUser._id !== user._id ?
                    <Link className='btn secondary' to={`/chat/${user._id}`}>💬 Discuter</Link> : null) : <Link className='btn secondary' to={`/login`}>💬 Discuter</Link>
                }
                {user.medias && user.medias.length > 0 && (
                <div className="medias-wrapper">
                  {
                    user.medias.map(media =>
                      media && <div className='media-wrapper'><Media type={media.includes('video/') ? "video" : "image"} src={media} /></div>
                    )
                  }
                </div>)}
              </div>
              <div className="right">
                {user.img && <Media type={"image"} src={user.img} />}
                {
                  currentUser ? (
                  currentUser._id !== user._id ?
                    <Link className='btn secondary' to={`/chat/${user._id}`}>💬 Discuter</Link> : null) : <Link className='btn secondary' to={`/login`}>💬 Discuter</Link>
                }
              </div>
            </div>
            {
              userGigs.length > 0 &&
            <div className="gigs-wrapper" ref={gigsWrapperRef}>
                {
                  !userGigs ? (
                    <div>Loading gigs...</div>
                  ) : (
                    userGigs.map((gig, index) => (
                      <div className="gig-wrapper" key={gig.id}>
                          <Media type={gig.cover.includes('video/') ? "video" : "image"} src={gig.cover} />
                          <div className="gig">
                            <div className="text-wrapper">
                              <p className="name big-title">
                                  {gig.title}
                              </p>
                              <p className="desc">{gig.desc}</p>
                              <div className="infos">
                                  <span className="info">{formatPrice(gig.price)}€ à payer</span>
                                  <span className="info">{gig.deliveryTime} jour{gig.deliveryTime  > 0 && 's'} de livraison</span>
                                  <span className="info">{gig.revisionNumber} modification{ gig.revisionNumber > 0 && 's'}</span>
                              </div>
                              {
                                  currentUser ? (
                                      currentUser._id !== user._id ?
                                          <Link className='btn secondary' to={`/pay/${gig._id}`}>🛒 Commander</Link>
                                          : null)
                                      : 
                                      <Link className='btn secondary' to={`/login`}>🛒 Commander</Link>
                              }
                            </div>
                            {
                              userGigs.length > 1 && 
                              <div className="gig-nav">
                                <button className="prev" onClick={scrollLeft} disabled={index === 0}>
                                  <button className="back"><BackArrow/></button>
                                  <p>Précédent</p>
                                </button>
                                <button className="next" onClick={scrollRight} disabled={index === userGigs.length - 1}>
                                  <p>Suivant</p>
                                  <button className="back"><BackArrow/></button>
                                </button>
                              </div>
                            }
                          </div>
                      </div>
                    )
                    )
                  )
                }
            </div>
            }
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="top-bar">
            <Back />
            <p className="name big-title">{user.name}</p>
          </div>
          <div className="profile-ctn">
            <div className="top">
              <div className="user">
                <ProfilePicture photo={user.img} />
                <p className="name">{user.name}</p>
              </div>
              <Link className='btn' to={`/chat/${user._id}`}>💬 Discuter</Link>
            </div>
          </div>
        </>
      )
    }
  }
}

export default User;