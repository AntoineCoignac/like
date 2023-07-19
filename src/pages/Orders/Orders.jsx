import React from 'react'
import Nav from '../../components/Nav/Nav';
import NavWork from '../../components/NavWork/NavWork';
import { Link } from 'react-router-dom';
import "./Orders.css";
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';

function Orders() {

  return (
    <>
      <Nav />
      <NavWork />
      <div className="orders-ctn">
              <Link key={1} className='order-item' to={`/work/order/${1}`}>
                  <ProfilePicture photo={"/img/pp/user1.jpg"} badge={1} />
                  <div>
                    <p className="title">{"Lorem Ipsum"}</p>
                    <div className="infos">
                      <span className="info">{100}€</span>
                      <span className="info">{6} jours</span>
                      <span className="info">{"influence"}</span>
                    </div>
                  </div>
              </Link>
            
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