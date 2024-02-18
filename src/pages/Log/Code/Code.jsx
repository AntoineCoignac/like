
import { Link } from 'react-router-dom'
import Logo from '../../../icons/logo/Logo'
import "../Log.scss";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../../utils/newRequest';

function Code() {
  const [code, setCode] = useState();
  const [error, setError] = useState(null);
  const email = localStorage.getItem("email-forget");
  
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const res = await newRequest.post("/codes/test", {email, code});
      navigate("/login");
    }catch(err){
      setError(err.response.data);
    }
  
  }

  return (
    <div className='log'>
      <div className="banner">
        <img loading='lazy' src="/img/design/mobile.webp" alt="" />
      </div>
      <div className="log-ctn">
        <Link to='/'>
          <Logo/>
        </Link>
        <p className="log-title">Mot de passe oublié</p>
        <p className='desc'>Entrez le code que vous avez reçu, et vous recevrez un nouveau mot de passe sur votre adresse e-mail : {email}</p>
          <form className='form' onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="code">Code à 6 chiffres</label>
              <input min={0} max={999999} onChange={e=>setCode(e.target.value)} name='code' type="number" placeholder='123456' />
            </div>
            <button className='btn' type="submit">🔒 Recevoir mon nouveau mot de passe</button>
            {error && <p className="error-message">{error.error}</p>}
            <Link to="/login" className='link'>Retour à la connexion</Link>
          </form>
      </div>
    </div>
  )
}

export default Code;