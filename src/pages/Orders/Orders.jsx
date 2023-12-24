import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav/Nav';
import NavWork from '../../components/NavWork/NavWork';
import { Link } from 'react-router-dom';
import "./Orders.css";
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import newRequest from '../../utils/newRequest';
import TimeRemaining from '../../components/TimeRemaining/TimeRemaining';
import Transaction from '../../icons/transaction/Transaction';
import Cross from "../../icons/cross/Cross";
import Like from "../../icons/like/Like";
import Load from '../../components/Load/Load';

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
        console.log(fetchedOrders);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  function formatPrice(price) {
    return price.toLocaleString('fr-FR', { minimumFractionDigits: 2 });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <Nav />
      <div className="orders-ctn">
        <NavWork />
        {isLoading ? (
          <Load/>
        ) : (
           orders.length === 0 ? (
            <div className="no-result">
              Aucune commande en cours
            </div>
          ) : (
          orders.map(({ order, user, gig, seller }) => (
            !order.isFinished ? (
              <Link key={order._id} className='order-item' to={`/work/order/${order._id}`}>
                {
                  order.sellerId === currentUser._id ?
                    <div className='transaction'>
                      <ProfilePicture photo={seller.img} badge={seller.badge} />
                      <Transaction />
                      <ProfilePicture photo={user.img} badge={user.badge} />
                    </div>
                    :
                    <div className='transaction'>
                      <ProfilePicture photo={seller.img} badge={seller.badge} />
                      <Transaction />
                      <ProfilePicture photo={user.img} badge={user.badge} />
                    </div>
                }
                <div>
                  <p className="title">{gig.title}</p>
                  <div className="infos">
                    <span className="info">{formatPrice(order.price)}€</span>
                    <span className="info"><TimeRemaining endTime={order.deadline} /></span>
                    <span className="info">{capitalizeFirstLetter(gig.tag)}</span>
                  </div>
                  <p className="desc">
                    {
                      order.sellerId === currentUser._id ?
                        `Vendu par vous à ${user.name}` : `Vendu par ${seller.name} à vous`
                    }
                  </p>
                  {
                    order.acceptedBySeller === null ?
                      <div className='situation' id='wait'>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12C5.16 12 4.375 11.845 3.645 11.535C2.915 11.225 2.28 10.8 1.74 10.26C1.2 9.72 0.775 9.085 0.465 8.355C0.155 7.625 0 6.84 0 6C0 5.16 0.155 4.375 0.465 3.645C0.775 2.915 1.2 2.28 1.74 1.74C2.28 1.2 2.915 0.775 3.645 0.465C4.375 0.155 5.16 0 6 0C6.12 0 6.225 0.045 6.315 0.135C6.405 0.225 6.45 0.33 6.45 0.45C6.45 0.57 6.405 0.675 6.315 0.765C6.225 0.855 6.12 0.9 6 0.9C4.59 0.9 3.3875 1.3975 2.3925 2.3925C1.3975 3.3875 0.9 4.59 0.9 6C0.9 7.41 1.3975 8.6125 2.3925 9.6075C3.3875 10.6025 4.59 11.1 6 11.1C7.41 11.1 8.6125 10.6025 9.6075 9.6075C10.6025 8.6125 11.1 7.41 11.1 6C11.1 5.88 11.145 5.775 11.235 5.685C11.325 5.595 11.43 5.55 11.55 5.55C11.67 5.55 11.775 5.595 11.865 5.685C11.955 5.775 12 5.88 12 6C12 6.84 11.845 7.625 11.535 8.355C11.225 9.085 10.8 9.72 10.26 10.26C9.72 10.8 9.085 11.225 8.355 11.535C7.625 11.845 6.84 12 6 12Z" fill="#CACACA"/>
                        </svg>
                        <span>En attente de validation</span>
                      </div>
                      :
                      (order.acceptedBySeller ?
                      <div className='situation' id='ok'>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.28828 0.815376L11.7903 3.99223C11.91 4.07671 11.9867 4.20945 12 4.35537L12.5002 9.84266C12.5194 10.0533 12.4039 10.2533 12.2119 10.342L7.20966 12.6524C7.07664 12.7138 6.92336 12.7138 6.79034 12.6524L1.7881 10.342C1.59606 10.2533 1.48062 10.0533 1.49982 9.84266L2.00004 4.35536C2.01335 4.20945 2.08998 4.07671 2.2097 3.99223L6.71172 0.815375C6.88456 0.693414 7.11544 0.693414 7.28828 0.815376Z" stroke="#29B9F2"/>
                          <rect x="4.42705" y="7.62125" width="0.486236" height="2.23073" transform="rotate(-47.2528 4.42705 7.62125)" fill="#29B9F2" stroke="#29B9F2" strokeWidth="0.486236"/>
                          <rect x="6.0651" y="9.13496" width="0.486236" height="5.16859" transform="rotate(-137.253 6.0651 9.13496)" fill="#29B9F2" stroke="#29B9F2" strokeWidth="0.486236"/>
                        </svg>
                        <span>Validé</span>
                      </div>
                      : 
                      <div className='situation' id='no'>
                        <Cross/>
                        <span>Non validé</span>
                      </div>
                      )
                  }


                </div>
              </Link>
            ) : (
              <Link key={order._id} className='order-item' to={`/work/order/${order._id}`} id='previous'>
                {
                  order.sellerId === currentUser._id ?
                    <div className='transaction'>
                      <ProfilePicture photo={seller.img} badge={seller.badge} />
                      <Transaction />
                      <ProfilePicture photo={user.img} badge={user.badge} />
                    </div>
                    :
                    <div className='transaction'>
                      <ProfilePicture photo={seller.img} badge={seller.badge} />
                      <Transaction />
                      <ProfilePicture photo={user.img} badge={user.badge} />
                    </div>
                }
                <div>
                  <p className="title">{gig.title}</p>
                  <div className="infos">
                    <span className="info">{formatPrice(order.price)}€</span>
                    <span className="info"><TimeRemaining endTime={order.deadline} /></span>
                    <span className="info">{capitalizeFirstLetter(gig.tag)}</span>
                  </div>
                  <p className="desc">
                    {
                      order.sellerId === currentUser._id ?
                        `Vendu par vous à ${user.name}` : `Vendu par ${seller.name} à vous`
                    }
                  </p>
                  {
                    order.isLiked === null && order.buyerId === currentUser._id ?
                      <p className='like-action'>
                        <Like/>
                        Vous pouvez liker la commande
                      </p> : null
                  }
                </div>
              </Link>
            )
          )))
        )}
      </div>
    </>
  );
}

export default Orders;
