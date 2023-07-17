
import { Link } from 'react-router-dom'
import Logo from '../../../icons/logo/Logo'
import "../Log.css";
import { useState } from 'react';

function Login() {
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
        <p className="log-title">Connexion</p>
          <form className='form' action="">
            <div className="field">
              <label htmlFor="">Identifiant</label>
              <input type="text" placeholder='ex : jeandupont' />
            </div>
            <div className="field">
              <label htmlFor="">Mot de passe</label>
              <input type="password" placeholder='8 caractères minimum' />
            </div>
            <button className='btn' type="submit">Se connecter</button>
            <Link to="/register" className='link'>Je n'ai pas de compte</Link>
          </form>
      </div>
    </div>
  )
}

export default Login;