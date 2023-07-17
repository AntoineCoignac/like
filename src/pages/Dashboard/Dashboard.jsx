import React from 'react'
import Nav from '../../components/Nav/Nav'
import { Link } from 'react-router-dom'
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture'
import BackArrow from '../../icons/back/BackArrow';
import './Dashboard.css';
import { GlobalContext } from '../../App';
import { useContext } from 'react';

function Dashboard() {
  let { users, rates, translations } = useContext(GlobalContext);

  return (
    <>
      <Nav />
      <div className="dashboard">
        <div className="recap">
          <div>
            <span className='big'>1260€</span>
            <p>Au total</p>
          </div>
          <div>
            <span className='big'>75</span>
            <p>Likes</p>
          </div>
        </div>
        <Link className='edit-link' to=''>
          <div className="profile">
            <ProfilePicture />
            <p className="name">Test</p>
          </div>
          <div className="arrow-button">
            <span>Modifier</span>
            <BackArrow />
          </div>
        </Link>
        <div className="section">
          <span className='section-title'>Commandes en cours</span>

          {
            rates.map(rate => {
              let user = users.find(aUser => aUser.userId === rate.userId)
              return (
                <Link key={rate.rateId} className='order-item' to={`/work/order/${rate.rateId}`}>
                  <ProfilePicture photo={user.pp} badge={user.badge} />
                  <div>
                    <p className="title">{rate.title}</p>
                    <div className="infos">
                      <span className="info">{rate.price}€</span>
                      <span className="info">{rate.delay} jours</span>
                      <span className="info">{rate.tag}</span>
                    </div>
                  </div>
                </Link>
              )
            }
            )
          }
        </div>
        <div className="section">
          <span className='section-title'>Mes tarifs <button className='add'></button></span>
          {
            rates.map(rate => {
              let user = users.find(aUser => aUser.userId === rate.userId)
              return (
                <Link className="rate">
                  <div>
                    <p className="title">{rate.title}</p>
                    <div className="infos">
                      <span className="info">{rate.price}€</span>
                      <span className="info">{rate.delay} jours</span>
                      <span className="info">{rate.tag}</span>
                    </div>
                  </div>
                  <div className="arrow-button">
                    <span>Modifier</span>
                    <BackArrow />
                  </div>
                </Link>
              )
            }
            )
          }
        </div>
      </div>
    </>
  )
}

export default Dashboard