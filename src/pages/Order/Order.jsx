import React from 'react';
import Back from '../../components/Back/Back';
import "./Order.css";
import { Link } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import ChatBox from '../../components/ChatBox/ChatBox';
import { useParams } from 'react-router-dom';


function Order() {
  let { orderId } = useParams();

  return (
    <>
      <div className="top-bar">
        <Back />
        <div className='order-top'>
          <span className="title">Lorem Ipsum</span>
        </div>
      </div>
      <ChatBox />
      <div className="order-info">
          <Link to={`/creator/${1}`} className="profile">
            <ProfilePicture photo={"/img/pp/user1.jpg"} badge={1} />
            <span>{"Lorem Ipsum"}</span>
          </Link>
        <div className="order-info-top">
          <span className="price">
            Montant : {100} €
          </span>
          <span className="delay">
            Livraison dans {6} jours
          </span>
        </div>
        <div className="desc">
          {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam numquam fuga nemo fugit perferendis! Neque architecto sunt temporibus possimus. Incidunt!"}
        </div>
        <button className='link'>Annuler ma commande</button>
      </div>
    </>
  )
}

export default Order;