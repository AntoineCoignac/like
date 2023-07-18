import React from 'react';
import Back from '../../components/Back/Back';
import "./Settings.css";
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const navigate = useNavigate();

  const handleClick = async ()=>{
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem('currentUser', undefined)
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="top-bar">
        <Back/>
        <p className="name">Paramètres</p>
      </div>
      <div className="settings">
        <button onClick={handleClick} className='btn disconnect'>Se déconnecter</button>
      </div>
    </>
  )
}

export default Settings;