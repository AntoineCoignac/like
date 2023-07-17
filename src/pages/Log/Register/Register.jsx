
import { Link } from 'react-router-dom'
import Logo from '../../../icons/logo/Logo'
import "../Log.css";
import { useState } from 'react';

function Register() {
  const [type, setType] = useState("creator");

  const handleClick = (event) => {
    const elementId = event.target.id;
    setType(elementId);
    console.log(elementId);
  }

  return (
    <div className='log'>
      <div className="banner">
        <img src="/img/design/fond.webp" alt="" />
      </div>
      <div className="log-ctn">
        <Link to='https://like.cr'>
          <Logo/>
        </Link>
        <p className="log-title">Inscription</p>
        <div className="toggle">
          <button className={type === "creator" ? "active" : ""} onClick={handleClick} id='creator'>Créateur</button>
          <button className={type === "brand" ? "active" : ""} onClick={handleClick} id='brand'>Entreprise</button>
        </div>
        <div className={`log-forms ${type}`} >
          <form className='form' action="">
            <div className="field">
              <label htmlFor="">Prénom</label>
              <input type="text" placeholder='ex : Jean' />
            </div>
            <div className="field">
              <label htmlFor="">Nom</label>
              <input type="text" placeholder='ex : Dupont' />
            </div>
            <div className="field">
              <label htmlFor="">Identifiant</label>
              <input type="text" placeholder='ex : jeandupont' />
            </div>
            <div className="field">
              <label htmlFor="">Email</label>
              <input type="email" placeholder='ex : jeandupont@mail.com' />
            </div>
            <div className="field">
              <label htmlFor="">Mot de passe</label>
              <input type="password" placeholder='8 caractères minimum' />
            </div>
            <button className='btn' type="submit">S'inscrire</button>
            <Link to="/login" className='link'>J'ai déjà un compte</Link>
          </form>
          <form className='form' action="">
            <div className="field">
              <label htmlFor="">Dénomination sociale</label>
              <input type="text" placeholder='ex : Like' />
            </div>
            <div className="field">
              <label htmlFor="">Identifiant</label>
              <input type="text" placeholder='ex : likecompany' />
            </div>
            <div className="field">
              <label htmlFor="">Email</label>
              <input type="email" placeholder='ex : like@mail.com' />
            </div>
            <div className="field">
              <label htmlFor="">Mot de passe</label>
              <input type="password" placeholder='8 caractères minimum' />
            </div>
            <button className='btn' type="submit">S'inscrire</button>
            <Link to="/login" className='link'>J'ai déjà un compte</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;