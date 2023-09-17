import React, { useEffect, useState } from 'react';
import Back from '../../components/Back/Back';
import "./Order.css";
import { Link } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import { useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import Cross from '../../icons/cross/Cross';
import SendIcon from '../../icons/send/SendIcon';
import Dropzone from '../../components/Dropzone/Dropzone';
import { useNavigate } from 'react-router-dom';

function Order() {
  const { orderId } = useParams();
  const [orderInfo, setOrderInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [isAccepting, setIsAccepting] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  const [validation, setValidation] = useState("accept");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await newRequest.get(`/deliveries/order/${orderId}`);
        setDeliveries(response.data);
        console.log(response.data);
        if (response.data.length > 0){
          if (response.data[0].isValid === null){
            setIsWaiting(true);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchDeliveries();
  }, [orderId]);

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

  function getFileExtensionFromUrl(url) {
    // Utilisez la méthode split() pour diviser l'URL en segments en utilisant le caractère "/"
    const segments = url.split('/');
    
    // Prenez le dernier segment (qui devrait être le nom du fichier)
    const filename = segments[segments.length - 1];
    
    // Utilisez la méthode split() à nouveau pour diviser le nom du fichier en parties en utilisant le caractère "."
    const parts = filename.split('.');
    
    // Prenez la dernière partie (qui devrait être l'extension)
    const extension = parts[parts.length - 1];
    
    return extension;
  }

  function formatDistanceToNow(isoDateString) {
    const date = new Date(isoDateString);
    const now = new Date();
    const timeDifferenceMillis = now - date;
  
    const millisecondsPerHour = 3600000; // 1000 ms * 60 min * 60 s
    const millisecondsPerDay = 86400000; // 1000 ms * 60 min * 60 s * 24 h
    const millisecondsPerWeek = 604800000; // 1000 ms * 60 min * 60 s * 24 h * 7 jours
  
    if (timeDifferenceMillis < millisecondsPerHour) {
      const minutes = Math.floor(timeDifferenceMillis / 60000);
      return `il y a ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    } else if (timeDifferenceMillis < millisecondsPerDay) {
      const hours = Math.floor(timeDifferenceMillis / millisecondsPerHour);
      return `il y a ${hours} ${hours === 1 ? 'heure' : 'heures'}`;
    } else if (timeDifferenceMillis < millisecondsPerWeek) {
      const days = Math.floor(timeDifferenceMillis / millisecondsPerDay);
      return `il y a ${days} ${days === 1 ? 'jour' : 'jours'}`;
    } else {
      const weeks = Math.floor(timeDifferenceMillis / millisecondsPerWeek);
      return `il y a ${weeks} ${weeks === 1 ? 'semaine' : 'semaines'}`;
    }
  }

  const navigate = useNavigate();

  const handleValidationSubmit = async (e, deliveryId) => { // Ajoutez deliveryId comme paramètre
    e.preventDefault();
    try {
      console.log(validation, deliveryId);
      const res = await newRequest.patch(`/deliveries/${deliveryId}`, {validation, feedback });
      navigate("/work/orders");
    } catch (err) {
      console.log(err);
    }
  }
  

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
              <div className='order-dialogue' >
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
                <div className='order-dashboard' >
                  <div className="order-recap">
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
                        <p className="desc">{orderInfo.order.remainingRevisions}/{orderInfo.gig.revisionNumber} modifcations disponibles</p>
                      </section>
                      <section>
                        <p className="title">Prix</p>
                        <p className="desc">{orderInfo.gig.price}€</p>
                      </section>
                    </div>
                  </div>
                  <div className="management">
                  {
                    !isWaiting ? (
                      <Dropzone order={orderInfo.order} />
                    ) : (
                      <div className='deliveries'>
                        <p className="name big-title">
                          Mes dernières livraisons
                        </p>
                        {deliveries.map(delivery => (
                          <div className='delivery-item'>
                            <div className='delivery' key={delivery._id}>
                              {delivery.docs.map(doc => (
                                <Link target='_blank' key={doc} to={doc}>
                                  {getFileExtensionFromUrl(doc)}
                                </Link>
                              ))}
                            </div>
                            <span>{
                              delivery.isValid === null ? "En attente d'un retour de l'acheteur · " : null
                            }{formatDistanceToNow(delivery.createdAt)}</span>
                          </div>
                        ))}
                      </div>
                    )
                  }
                  </div>
                </div>
                :
                <div className='order-dialogue' >
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
              <div className='order-dialogue' >
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
                  <div className='situation' >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12C5.16 12 4.375 11.845 3.645 11.535C2.915 11.225 2.28 10.8 1.74 10.26C1.2 9.72 0.775 9.085 0.465 8.355C0.155 7.625 0 6.84 0 6C0 5.16 0.155 4.375 0.465 3.645C0.775 2.915 1.2 2.28 1.74 1.74C2.28 1.2 2.915 0.775 3.645 0.465C4.375 0.155 5.16 0 6 0C6.12 0 6.225 0.045 6.315 0.135C6.405 0.225 6.45 0.33 6.45 0.45C6.45 0.57 6.405 0.675 6.315 0.765C6.225 0.855 6.12 0.9 6 0.9C4.59 0.9 3.3875 1.3975 2.3925 2.3925C1.3975 3.3875 0.9 4.59 0.9 6C0.9 7.41 1.3975 8.6125 2.3925 9.6075C3.3875 10.6025 4.59 11.1 6 11.1C7.41 11.1 8.6125 10.6025 9.6075 9.6075C10.6025 8.6125 11.1 7.41 11.1 6C11.1 5.88 11.145 5.775 11.235 5.685C11.325 5.595 11.43 5.55 11.55 5.55C11.67 5.55 11.775 5.595 11.865 5.685C11.955 5.775 12 5.88 12 6C12 6.84 11.845 7.625 11.535 8.355C11.225 9.085 10.8 9.72 10.26 10.26C9.72 10.8 9.085 11.225 8.355 11.535C7.625 11.845 6.84 12 6 12Z" fill="#CACACA" />
                    </svg>
                    <span>En attente de validation</span>
                  </div>
                </div>
              </div>
              :
              (isAccepting ?
                <div className='order-dashboard' >
                  <div className="order-recap">
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
                        <p className="desc">{orderInfo.order.remainingRevisions}/{orderInfo.gig.revisionNumber} modifcations disponibles</p>
                      </section>
                      <section>
                        <p className="title">Prix</p>
                        <p className="desc">{orderInfo.gig.price}€</p>
                      </section>
                    </div>
                  </div>
                  <div className="management">
                    <div className='deliveries'>
                        <p className="name big-title">
                          Les dernières livraisons
                        </p>
                        {
                          deliveries.length > 0 ?
                            deliveries.map(delivery => (
                              <div className='delivery-item'>
                                <div className='delivery' key={delivery._id}>
                                  {delivery.docs.map(doc => (
                                    <Link target='_blank' key={doc} to={doc}>
                                      {getFileExtensionFromUrl(doc)}
                                    </Link>
                                  ))}
                                </div>
                                <span>
                                  {formatDistanceToNow(delivery.createdAt)}
                                </span>
                                {
                                  delivery.isValid === null ?
                                    <form className="form valid-delivery" onSubmit={(e) => handleValidationSubmit(e, delivery._id)}> {/* Passer l'ID de la livraison ici */}
                                      <div className="field">
                                        <label htmlFor="validation">
                                          Validation
                                        </label>
                                        <select required name="validation" onChange={e=>setValidation(e.target.value)}>
                                          <option value="accept">Valider</option>
                                          <option value="reject">Refuser</option>
                                        </select>
                                      </div>
                                      <div className="field">
                                        <label htmlFor="feedback">
                                          Feedback
                                        </label>
                                        <textarea onChange={e=>setFeedback(e.target.value)} placeholder='Expliquez les modifications que vous souhaitez apporter' required name="feedback" cols="30" rows="5">
                                        </textarea>
                                      </div>
                                      <button className='btn' type="submit">Envoyer</button>
                                    </form>
                                  : <p>{delivery.feedback}</p>
                                }
                              </div>
                            ))
                            :
                            <p className='wait-delivery'>En attente de la première livraison</p>
                        }
                      </div>
                  </div>
                </div>
                :
                <div className='order-dialogue' >
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
