import React from 'react'
import Nav from '../../components/Nav/Nav'
import { Link } from 'react-router-dom'
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture'
import BackArrow from '../../icons/back/BackArrow';
import './Dashboard.css';
import NavWork from '../../components/NavWork/NavWork';
import { useEffect } from 'react';
import newRequest from '../../utils/newRequest';
import { useState } from 'react';

function Dashboard() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [userGigs, setUserGigs] = useState(null);

  const loadUserGigs = async () => {
    try {
      const res = await newRequest.get(`/gigs?userId=${currentUser._id}`);
      setUserGigs(res.data);
      console.log(res.data); // This should log the data fetched from the API
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUserGigs();
  }, []);

  return (
    <>
      <Nav />
      <div className="dashboard">
        <NavWork />
        {
          userGigs ? (
            <>
              <div className="recap">
                <div>
                  <span className='big'>1260€</span>
                  <p>Au total</p>
                </div>
                <div>
                  <span className='big'>{currentUser.like}</span>
                  <p>Likes</p>
                </div>
              </div>
              <Link className='edit-link' to='/me'>
                <div className="profile">
                  <ProfilePicture photo={currentUser.img} badge={currentUser.sub} />
                  <p className="name">{currentUser.isSeller ? `${currentUser.name} ${currentUser.lastname.charAt(0)}.` : currentUser.name}</p>
                </div>
                <div className="arrow-button">
                  <span>Modifier</span>
                  <BackArrow />
                </div>
              </Link>
              <div className="section">
                <span className='section-title big-title'>Commandes en cours</span>
                <Link key={1} className='order-item' to={`/work/order/${1}`}>
                  <ProfilePicture photo={"/img/pp/user1.jpg"} badge={1} />
                  <div>
                    <p className="title">{"Lorem ipsum"}</p>
                    <div className="infos">
                      <span className="info">{100}€</span>
                      <span className="info">{6} jours</span>
                      <span className="info">{"influence"}</span>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="section">
                <span className='section-title big-title'>Mes tarifs <Link to="/newgig" className='add'></Link></span>
                {
                  userGigs.map(gig => (
                    <Link key={gig._id} to={`/editgig/${gig._id}`} className="rate">
                      <div>
                        <p className="title">{gig.title}</p>
                        <div className="infos">
                          <span className="info">{gig.price}€</span>
                          <span className="info">{gig.deliveryTime} jours</span>
                          <span className="info">{gig.revisionNumber} modifications</span>
                          <span className="info">{gig.tag}</span>
                        </div>
                      </div>
                      <div className="arrow-button">
                        <span>Modifier</span>
                        <BackArrow />
                      </div>
                    </Link>
                  ))
                }

              </div>
            </>
          ) : <></>
        }
      </div>
    </>
  )

}

export default Dashboard