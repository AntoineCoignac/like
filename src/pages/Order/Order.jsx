import React from 'react';
import Back from '../../components/Back/Back';
import "./Order.css";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../App';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import ChatBox from '../../components/ChatBox/ChatBox';
import { useParams } from 'react-router-dom';


function Order() {
  let { users, rates, translations } = useContext(GlobalContext);
  let { orderId } = useParams();

  let rate = rates.find(rate => rate.rateId == orderId);
  console.log(rate);
  let user = users.find(user => user.userId == rate.userId);

  return (
    <>
      <div className="top-bar">
        <Back />
        <div className='order-top'>
          <span className="title">{rate.title}</span>
        </div>
      </div>
      <ChatBox />
      <div className="order-info">
          <Link to={`/creator/${user.userId}`} className="profile">
            <ProfilePicture photo={user.pp} badge={user.badge} />
            <span>{user.username}</span>
          </Link>
        <div className="order-info-top">
          <span className="price">
            Montant : {rate.price} €
          </span>
          <span className="delay">
            Livraison dans {rate.delay} jours
          </span>
        </div>
        <div className="desc">
          {rate.desc.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
        <button className='link'>Annuler ma commande</button>
      </div>
    </>
  )
}

export default Order;