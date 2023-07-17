import React from 'react'
import Nav from '../../components/Nav/Nav';
import NavWork from '../../components/NavWork/NavWork';
import { Link } from 'react-router-dom';
import "./Orders.css";
import { useContext } from 'react';
import { GlobalContext } from '../../App';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';

function Orders() {
  let { users, rates, translations } = useContext(GlobalContext);

  return (
    <>
      <Nav />
      <NavWork />
      <div className="orders-ctn">

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
        <div className='order-item' id='previous' >
            <ProfilePicture  />
            <div>
              <p className="title">Test</p>
              <div className="infos">
                <span className="info">100€</span>
                <span className="info">6 jours</span>
                <span className="info">photographe</span>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Orders;