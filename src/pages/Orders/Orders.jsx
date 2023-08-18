import React from 'react'
import Nav from '../../components/Nav/Nav';
import NavWork from '../../components/NavWork/NavWork';
import { Link } from 'react-router-dom';
import "./Orders.css";
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import { useState } from 'react';
import newRequest from '../../utils/newRequest';
import { useEffect } from 'react';

function Orders() {
  const [orders, setOrders] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await newRequest.get(`/orders/`);
        setOrders(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadOrders();
  }, []);

  return (
    <>
      <Nav />
      <div className="orders-ctn">
        <NavWork />
        {
          orders.map(order => (
            <Link key={1} className='order-item' to={`/work/order/${order._id}`}>
              <ProfilePicture photo={"/img/pp/user1.jpg"} badge={1} />
              <div>
                <p className="title">{order.title}</p>
                <div className="infos">
                  <span className="info">{order.price}€</span>
                  <span className="info">{6} jours</span>
                  <span className="info">{"influence"}</span>
                </div>
              </div>
            </Link>
          ))
        }
        

        <div className='order-item' id='previous' >
          <ProfilePicture />
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