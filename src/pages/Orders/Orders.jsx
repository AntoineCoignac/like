import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav/Nav';
import NavWork from '../../components/NavWork/NavWork';
import { Link } from 'react-router-dom';
import "./Orders.css";
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import newRequest from '../../utils/newRequest';
import TimeRemaining from '../../components/TimeRemaining/TimeRemaining';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await newRequest.get(`/orders/`);
        const fetchedOrders = await Promise.all(
          res.data.map(async order => {
            const userRes = await newRequest.get(`/users/${order.buyerId}`);
            const gigRes = await newRequest.get(`/gigs/single/${order.gigId}`);
            const user = userRes.data;
            const gig = gigRes.data;
            const sellerRes = await newRequest.get(`/users/${gig.userId}`);
            const seller = sellerRes.data;
            return {
              order,
              user,
              gig,
              seller
            };
          })
        );
        setOrders(fetchedOrders);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <>
      <Nav />
      <div className="orders-ctn">
        <NavWork />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          orders.map(({ order, user, gig, seller }) => (
            !order.isFinished ? (
                <Link key={order._id} className='order-item' to={`/work/order/${order._id}`}>
                  {
                    order.sellerId === currentUser._id ? 
                      <ProfilePicture photo={user.img} badge={user.badge}/>
                      :
                      <ProfilePicture photo={seller.img} badge={seller.badge}/>
                  }
                  <div>
                    <p className="title">{gig.title}</p>
                    <div className="infos">
                      <span className="info">{order.price}€</span>
                      <span className="info"><TimeRemaining endTime={order.deadline} /></span>
                      <span className="info">{gig.tag}</span>
                    </div>
                    <p className="desc">
                    {
                      order.sellerId === currentUser._id ? 
                        `Vendu par vous à ${user.name}` : `Vendu par ${seller.name} à vous`
                    }
                    </p>
                  </div>
                </Link>
              ) : (
                <div key={order._id} className='order-item' id='previous'>
                  <ProfilePicture />
                  <div>
                    <p className="title">{gig.title}</p>
                    <div className="infos">
                      <span className="info">{order.price}€</span>
                      <span className="info">{user.influence}</span>
                    </div>
                  </div>
                </div>
              )
            ))
          )}
      </div>
    </>
  );
}

export default Orders;
