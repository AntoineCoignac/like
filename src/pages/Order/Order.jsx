import React, { useEffect, useState } from 'react';
import Back from '../../components/Back/Back';
import "./Order.css";
import { Link } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import { useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import Cross from '../../icons/cross/Cross';
import SendIcon from '../../icons/send/SendIcon';

function Order() {
  const { orderId } = useParams();
  const [orderInfo, setOrderInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [isAccepting, setIsAccepting] = useState(null);

  useEffect(() => {
    const loadOrderInfo = async () => {
      try {
        const orderRes = await newRequest.get(`/orders/${orderId}`);
        const buyerRes = await newRequest.get(`/users/${orderRes.data.buyerId}`);
        const sellerRes = await newRequest.get(`/users/${orderRes.data.sellerId}`);
        const gigRes = await newRequest.get(`/gigs/single/${orderRes.data.gigId}`);

        const orderData = orderRes.data;
        const buyerData = buyerRes.data;
        const sellerData = sellerRes.data;
        const gigData = gigRes.data;

        setOrderInfo({
          order: orderData,
          buyer: buyerData,
          seller: sellerData,
          gig: gigData
        });

        setIsLoading(false);
        setIsAccepting(orderData.acceptedBySeller);
        console.log(orderData, buyerData, sellerData, gigData);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    loadOrderInfo();
  }, [orderId]);

  const handleAccept = async () => {
    try {
      await newRequest.put(`/orders/accept/${orderId}`, { acceptedBySeller: true });
      setIsAccepting(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async () => {
    try {
      await newRequest.put(`/orders/accept/${orderId}`, { acceptedBySeller: false });
      setIsAccepting(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    isLoading ? (
      <p>Loading...</p>
    ) : (

      currentUser._id === orderInfo.seller._id ?
        //l'utilisateur est le vendeur
        <>
          <div className="top-bar">
            <Back />
            <div className='chat-top'>
              <Link to={`/user/${orderInfo.buyer._id}`} className="profile">
                <ProfilePicture photo={orderInfo.buyer.img} badge={orderInfo.buyer.sub} />
                <p className='name'>{orderInfo.buyer.name}</p>
              </Link>
            </div>
          </div>
          {
            isAccepting === null ?
              <div className='order-dialogue' id='wait'>
                <div className="order-title">
                  <p className="big-title">Récapitulatif</p>
                </div>
                <div className="order-content">
                  <section>
                    <p className="title">Brief</p>
                    <p className="desc">{orderInfo.order.brief}</p>
                    <Link to={`/chat/${orderInfo.buyer._id}`}>
                      <SendIcon />
                      Discuter avec le client
                    </Link>
                  </section>
                  <section>
                    <p className="title">Vendeur</p>
                    <p className="desc">{orderInfo.seller.name}</p>
                  </section>
                  <section>
                    <p className="title">Acheteur</p>
                    <p className="desc">{orderInfo.buyer.name}</p>
                  </section>
                  <section>
                    <p className="title">Tarif</p>
                    <p className="desc">{orderInfo.gig.title}</p>
                  </section>
                  <section>
                    <p className="title">Description</p>
                    <p className="desc">{orderInfo.gig.desc}</p>
                  </section>
                  <section>
                    <p className="title">Catégorie</p>
                    <p className="desc">{orderInfo.gig.tag}</p>
                  </section>
                  <section>
                    <p className="title">Délai</p>
                    <p className="desc">{orderInfo.gig.deliveryTime} jours</p>
                  </section>
                  <section>
                    <p className="title">Nombre de modifications</p>
                    <p className="desc">{orderInfo.gig.revisionNumber} modifcations disponibles</p>
                  </section>
                  <section>
                    <p className="title">Prix</p>
                    <p className="desc">{orderInfo.gig.price}€</p>
                  </section>
                </div>
                <div className="order-bottom">
                  <button onClick={handleAccept} className="btn">Valider le brief</button>
                  <button onClick={handleReject} className="btn negative">Refuser</button>
                </div>
              </div>
              :
              (isAccepting ?
                <div className='situation' id='ok'>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.28828 0.815376L11.7903 3.99223C11.91 4.07671 11.9867 4.20945 12 4.35537L12.5002 9.84266C12.5194 10.0533 12.4039 10.2533 12.2119 10.342L7.20966 12.6524C7.07664 12.7138 6.92336 12.7138 6.79034 12.6524L1.7881 10.342C1.59606 10.2533 1.48062 10.0533 1.49982 9.84266L2.00004 4.35536C2.01335 4.20945 2.08998 4.07671 2.2097 3.99223L6.71172 0.815375C6.88456 0.693414 7.11544 0.693414 7.28828 0.815376Z" stroke="#29B9F2" />
                    <rect x="4.42705" y="7.62125" width="0.486236" height="2.23073" transform="rotate(-47.2528 4.42705 7.62125)" fill="#29B9F2" stroke="#29B9F2" strokeWidth="0.486236" />
                    <rect x="6.0651" y="9.13496" width="0.486236" height="5.16859" transform="rotate(-137.253 6.0651 9.13496)" fill="#29B9F2" stroke="#29B9F2" strokeWidth="0.486236" />
                  </svg>
                  <span>Validé</span>
                </div>
                :
                <div className='order-dialogue' id='wait'>
                <div className="order-title">
                  <p className="big-title">Récapitulatif</p>
                </div>
                <div className="order-content">
                  <section>
                    <p className="title">Brief</p>
                    <p className="desc">{orderInfo.order.brief}</p>
                    <Link to={`/chat/${orderInfo.seller._id}`}>
                      <SendIcon />
                      Discuter avec le créateur
                    </Link>
                  </section>
                  <section>
                    <p className="title">Vendeur</p>
                    <p className="desc">{orderInfo.seller.name}</p>
                  </section>
                  <section>
                    <p className="title">Acheteur</p>
                    <p className="desc">{orderInfo.buyer.name}</p>
                  </section>
                  <section>
                    <p className="title">Tarif</p>
                    <p className="desc">{orderInfo.gig.title}</p>
                  </section>
                  <section>
                    <p className="title">Description</p>
                    <p className="desc">{orderInfo.gig.desc}</p>
                  </section>
                  <section>
                    <p className="title">Catégorie</p>
                    <p className="desc">{orderInfo.gig.tag}</p>
                  </section>
                  <section>
                    <p className="title">Délai</p>
                    <p className="desc">{orderInfo.gig.deliveryTime} jours</p>
                  </section>
                  <section>
                    <p className="title">Nombre de modifications</p>
                    <p className="desc">{orderInfo.gig.revisionNumber} modifcations disponibles</p>
                  </section>
                  <section>
                    <p className="title">Prix</p>
                    <p className="desc">{orderInfo.gig.price}€</p>
                  </section>
                </div>
                <div className="order-bottom">
                <div className='situation' id='no'>
                  <Cross />
                  <span>Non validé</span>
                </div>
                </div>
              </div>
              )
          }
        </>

        :
        //l'utilisateur est l'acheteur
        <>
          <div className="top-bar">
            <Back />
            <div className='chat-top'>
              <Link to={`/user/${orderInfo.seller._id}`} className="profile">
                <ProfilePicture photo={orderInfo.seller.img} badge={orderInfo.seller.sub} />
                <p className='name'>{orderInfo.seller.name}</p>
              </Link>
            </div>
          </div>
          {
            isAccepting === null ?
              <div className='order-dialogue' id='wait'>
                <div className="order-title">
                  <p className="big-title">Récapitulatif</p>
                </div>
                <div className="order-content">
                  <section>
                    <p className="title">Brief</p>
                    <p className="desc">{orderInfo.order.brief}</p>
                    <Link to={`/chat/${orderInfo.seller._id}`}>
                      <SendIcon />
                      Discuter avec le créateur
                    </Link>
                  </section>
                  <section>
                    <p className="title">Vendeur</p>
                    <p className="desc">{orderInfo.seller.name}</p>
                  </section>
                  <section>
                    <p className="title">Acheteur</p>
                    <p className="desc">{orderInfo.buyer.name}</p>
                  </section>
                  <section>
                    <p className="title">Tarif</p>
                    <p className="desc">{orderInfo.gig.title}</p>
                  </section>
                  <section>
                    <p className="title">Description</p>
                    <p className="desc">{orderInfo.gig.desc}</p>
                  </section>
                  <section>
                    <p className="title">Catégorie</p>
                    <p className="desc">{orderInfo.gig.tag}</p>
                  </section>
                  <section>
                    <p className="title">Délai</p>
                    <p className="desc">{orderInfo.gig.deliveryTime} jours</p>
                  </section>
                  <section>
                    <p className="title">Nombre de modifications</p>
                    <p className="desc">{orderInfo.gig.revisionNumber} modifcations disponibles</p>
                  </section>
                  <section>
                    <p className="title">Prix</p>
                    <p className="desc">{orderInfo.gig.price}€</p>
                  </section>
                </div>
                <div className="order-bottom">
                      <div className='situation' id='wait'>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12C5.16 12 4.375 11.845 3.645 11.535C2.915 11.225 2.28 10.8 1.74 10.26C1.2 9.72 0.775 9.085 0.465 8.355C0.155 7.625 0 6.84 0 6C0 5.16 0.155 4.375 0.465 3.645C0.775 2.915 1.2 2.28 1.74 1.74C2.28 1.2 2.915 0.775 3.645 0.465C4.375 0.155 5.16 0 6 0C6.12 0 6.225 0.045 6.315 0.135C6.405 0.225 6.45 0.33 6.45 0.45C6.45 0.57 6.405 0.675 6.315 0.765C6.225 0.855 6.12 0.9 6 0.9C4.59 0.9 3.3875 1.3975 2.3925 2.3925C1.3975 3.3875 0.9 4.59 0.9 6C0.9 7.41 1.3975 8.6125 2.3925 9.6075C3.3875 10.6025 4.59 11.1 6 11.1C7.41 11.1 8.6125 10.6025 9.6075 9.6075C10.6025 8.6125 11.1 7.41 11.1 6C11.1 5.88 11.145 5.775 11.235 5.685C11.325 5.595 11.43 5.55 11.55 5.55C11.67 5.55 11.775 5.595 11.865 5.685C11.955 5.775 12 5.88 12 6C12 6.84 11.845 7.625 11.535 8.355C11.225 9.085 10.8 9.72 10.26 10.26C9.72 10.8 9.085 11.225 8.355 11.535C7.625 11.845 6.84 12 6 12Z" fill="#CACACA"/>
                        </svg>
                        <span>En attente de validation</span>
                      </div>
                </div>
              </div>
              :
              (isAccepting ?
                <div className='situation' id='ok'>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.28828 0.815376L11.7903 3.99223C11.91 4.07671 11.9867 4.20945 12 4.35537L12.5002 9.84266C12.5194 10.0533 12.4039 10.2533 12.2119 10.342L7.20966 12.6524C7.07664 12.7138 6.92336 12.7138 6.79034 12.6524L1.7881 10.342C1.59606 10.2533 1.48062 10.0533 1.49982 9.84266L2.00004 4.35536C2.01335 4.20945 2.08998 4.07671 2.2097 3.99223L6.71172 0.815375C6.88456 0.693414 7.11544 0.693414 7.28828 0.815376Z" stroke="#29B9F2" />
                    <rect x="4.42705" y="7.62125" width="0.486236" height="2.23073" transform="rotate(-47.2528 4.42705 7.62125)" fill="#29B9F2" stroke="#29B9F2" strokeWidth="0.486236" />
                    <rect x="6.0651" y="9.13496" width="0.486236" height="5.16859" transform="rotate(-137.253 6.0651 9.13496)" fill="#29B9F2" stroke="#29B9F2" strokeWidth="0.486236" />
                  </svg>
                  <span>Validé</span>
                </div>
                :
                <div className='order-dialogue' id='wait'>
                <div className="order-title">
                  <p className="big-title">Récapitulatif</p>
                </div>
                <div className="order-content">
                  <section>
                    <p className="title">Brief</p>
                    <p className="desc">{orderInfo.order.brief}</p>
                    <Link to={`/chat/${orderInfo.seller._id}`}>
                      <SendIcon />
                      Discuter avec le créateur
                    </Link>
                  </section>
                  <section>
                    <p className="title">Vendeur</p>
                    <p className="desc">{orderInfo.seller.name}</p>
                  </section>
                  <section>
                    <p className="title">Acheteur</p>
                    <p className="desc">{orderInfo.buyer.name}</p>
                  </section>
                  <section>
                    <p className="title">Tarif</p>
                    <p className="desc">{orderInfo.gig.title}</p>
                  </section>
                  <section>
                    <p className="title">Description</p>
                    <p className="desc">{orderInfo.gig.desc}</p>
                  </section>
                  <section>
                    <p className="title">Catégorie</p>
                    <p className="desc">{orderInfo.gig.tag}</p>
                  </section>
                  <section>
                    <p className="title">Délai</p>
                    <p className="desc">{orderInfo.gig.deliveryTime} jours</p>
                  </section>
                  <section>
                    <p className="title">Nombre de modifications</p>
                    <p className="desc">{orderInfo.gig.revisionNumber} modifcations disponibles</p>
                  </section>
                  <section>
                    <p className="title">Prix</p>
                    <p className="desc">{orderInfo.gig.price}€</p>
                  </section>
                </div>
                <div className="order-bottom">
                <div className='situation' id='no'>
                  <Cross />
                  <span>Non validé</span>
                </div>
                </div>
              </div>
              )
          }
        </>
    )
  )
}

export default Order;
