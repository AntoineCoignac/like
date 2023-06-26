import React from 'react'
import Nav from '../../components/Nav/Nav';
import NavWork from '../../components/NavWork/NavWork';
import { Link } from 'react-router-dom';
import "./Orders.css";
import { useContext } from 'react';
import { GlobalContext } from '../../App';

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
                <span className="title">
                  {rate.title}
                </span>
                <div>
                  <span className="name">{user.username}</span>
                  <span className="price">{rate.price} €</span>
                </div>
              </Link>
            )
          }
          )
        }
        <div className='order-item' id='previous' to={`/work/order/1`}>
          <span className="title">
            Pack partenariat Instagram
          </span>
          <div>
            <span className="name">Julie</span>
            <span className="price">1000 €</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Orders;