
import { Link } from 'react-router-dom'
import Logo from '../../../icons/logo/Logo'
import "../Log.scss";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../../utils/newRequest';

function Forget() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const res = await newRequest.post("/codes/create", {email});
      localStorage.setItem("email-forget", email);
      navigate("/code");
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
        <p className='desc'>Entrez votre adresse e-mail, vous allez recevoir un code de validation.</p>
          <form className='form' onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input maxLength={100} onChange={e=>setEmail(e.target.value)} name='email' type="email" placeholder='jeandupont@mail.com' />
            </div>
            <button className='btn' type="submit">✉️ Envoyer</button>
            {error && error}
            <Link to="/login" className='link'>Retour à la connexion</Link>
          </form>
      </div>
    </div>
  )
}

export default Forget;