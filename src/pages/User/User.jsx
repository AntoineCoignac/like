import React from 'react'
import "./User.css";
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
      console.log(res.data); // This should log the data fetched from the API
    } catch (err) {
      console.log(err);
      navigate(-1);
    }
  };

  const loadUserGigs = async () => {
    try {
      const res = await newRequest.get(`/gigs?userId=${id}`);
      setUserGigs(res.data);
      console.log(res.data); // This should log the data fetched from the API
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
          <div className="profile-ctn">
            <div className="top">
              <ProfilePicture photo={user.img} badge={user.sub} />
              <p className="name big-title">{`${user.name} ${user.lastname.charAt(0)}.`}</p>
              {
                currentUser ? (
                currentUser._id !== user._id ?
                  <Link className='btn' to={`/chat/${user._id}`}>Discuter</Link> : null) : <Link className='btn' to={`/login`}>Discuter</Link>
              }
              
              <p className="desc">
                {user.desc ? user.desc : "Aucune information"}
              </p>
              <div className="infos">
                <span className="info">
                  <Like />
                  <span>{user.like}</span>
                </span>
                {
                  user.location ? (
                    <span key={"location"} className="info">
                      <LocationIcon />
                      <span>{user.location}</span>
                    </span>
                  ) : null
                }
                {/*
                  user.instagram ? (
                    <span key={"instagram"} className="info">
                      <InstagramIcon />
                      <span>{user.instagram}</span>
                    </span>
                  ) : null
                  */}
                {/*
                  user.youtube ? (
                    <span key={"youtube"} className="info">
                      <YoutubeIcon />
                      <span>{user.location}</span>
                    </span>
                  ) : null
                */}
                {/*
                  user.twitter ? (
                    <span key={"twitter"} className="info">
                      <TwitterIcon />
                      <span>{user.twitter}</span>
                    </span>
                  ) : null
                */}
                {/*
                  user.tiktok ? (
                    <span key={"tiktok"} className="info">
                      <TiktokIcon />
                      <span>{user.tiktok}</span>
                    </span>
                  ) : null
                */}
                {/*
                  user.linkedin ? (
                    <span key={"linkedin"} className="info">
                      <LinkedinIcon />
                      <span>{user.linkedin}</span>
                    </span>
                  ) : null
                */}
              </div>
            </div>
            <div className="section">
              <span className='section-title big-title'>Prestations</span>
              <div className="gallery">
                {
                  !userGigs ? (
                    <div>Loading gigs...</div>
                  ) : (
                    userGigs.map(gig => (
                      <div className="gig-result">
                          <div className="media-ctn">
                              <Media type={gig.cover.includes('video/') ? "video" : "image"} src={gig.cover} />
                          </div>
                          <Link to={`/gig/${gig._id}`} className="card-content">
                              <Link to={`/user/${user._id}`}>
                                  <ProfilePicture photo={user.img} badge={user.sub ? user.sub : 0} />
                              </Link>
                              <div className="gig">
                                  <p className="gig-title">
                                      {gig.title}
                                  </p>
                                  <p className="gig-name">
                                      {`${user.name} ${user.lastname.charAt(0)}.`}
                                  </p>
                                  <div className="infos">
                                      <span className="info">{formatPrice(gig.price)}€</span>
                                      <span className="info">{capitalizeFirstLetter(gig.tag)}</span>
                                  </div>
                              </div>
                          </Link>
                      </div>
                    )
                    )
                  )
                }
              </div>
            </div>
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
              <ProfilePicture photo={user.img} />
              <p className="name big-title">{user.name}</p>
              <Link className='btn' to={`/chat/${user._id}`}>Discuter</Link>
              <p className="desc">
                {user.desc ? user.desc : "Aucune information"}
              </p>
              <div className="infos">
                {
                  user.location ? (
                    <span key={"location"} className="info">
                      <LocationIcon />
                      <span>{user.location}</span>
                    </span>
                  ) : null
                }
              </div>
            </div>
          </div>
        </>
      )
    }
  }
}

export default User;