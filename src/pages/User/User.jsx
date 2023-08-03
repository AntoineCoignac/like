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
import Media from '../../components/Media/Media';
import Like from '../../icons/like/Like';
import { useState } from 'react';
import newRequest from '../../utils/newRequest';
import { useEffect } from 'react';

function User() {
  const [user, setUser] = useState(null);
  const [userGigs, setUserGigs] = useState(null);
  const { id } = useParams();

  const loadUser = async () => {
    try {
      const res = await newRequest.get(`/users/${id}`);
      setUser(res.data);
      console.log(res.data); // This should log the data fetched from the API
    } catch (err) {
      console.log(err);
    }
  };

  const loadUserGigs = async () => {
    try {
      const res = await newRequest.get(`/gigs?userId=${id}`);
      setUserGigs(res.data);
      console.log(res.data); // This should log the data fetched from the API
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    loadUser();
    loadUserGigs();
  }, []); // Empty dependency array to ensure this effect runs only once

  // Check if user data is still loading
  if (!user || !userGigs) {
    return <div>Loading user data...</div>;
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
              <Link className='btn' to={`/chat/${user._id}`}>Discuter</Link>
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
                {
                  user.instagram ? (
                    <span key={"instagram"} className="info">
                      <InstagramIcon />
                      <span>{user.instagram}</span>
                    </span>
                  ) : null
                }
                {
                  user.youtube ? (
                    <span key={"youtube"} className="info">
                      <YoutubeIcon />
                      <span>{user.location}</span>
                    </span>
                  ) : null
                }
                {
                  user.twitter ? (
                    <span key={"twitter"} className="info">
                      <TwitterIcon />
                      <span>{user.twitter}</span>
                    </span>
                  ) : null
                }
                {
                  user.tiktok ? (
                    <span key={"tiktok"} className="info">
                      <TiktokIcon />
                      <span>{user.tiktok}</span>
                    </span>
                  ) : null
                }
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
                      <div key={gig._id} className='gig-result'>
                        <Media type={gig.cover.includes('/video/') ? "video" : "image"} src={gig.cover} />
                        <Link to={`/gig/${gig._id}`} className="gig">
                          <p className="title">{gig.title}</p>
                          <p className='desc'>{gig.desc}</p>
                          <div className="infos">
                            <span className="info">{gig.price}€</span>
                            <span className="info">{gig.deliveryTime} jours</span>
                            <span className="info">{gig.revisionNumber} modifications</span>
                            <span className="info">{gig.tag}</span>
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