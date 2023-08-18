import React, { useEffect } from 'react';
import "./Success.css";
import { useLocation, useNavigate } from 'react-router-dom';
import newRequest from "../../utils/newRequest";

function Success() {
  const {search} = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");
  const brief = params.get("brief");

  useEffect(()=>{
    const makeRequest = async ()=>{
      try {
        await newRequest.put("/orders", {payment_intent, brief});
        setTimeout(()=>{
          navigate("/work/orders");
        }, 5000);
        
      } catch (err) {
          console.log(err);
      }
    };

    makeRequest();
  }, [])

  return (
    <div className="success-ctn">
      <div className="success">
        <h1>Félicitations 🎉</h1>
        <p>Votre commande a été effectuée avec succès !<br></br>Merci de faire confiance aux créateurs Like 🤝</p>
        <span>Ne quittez pas la page, vous allez être redirigé dans 5 secondes...</span>
      </div>
    </div>
  )
}

export default Success;