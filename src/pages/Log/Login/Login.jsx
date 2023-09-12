
import { Link } from 'react-router-dom'
import Logo from '../../../icons/logo/Logo'
import "../Log.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../../utils/newRequest';
import CryptoJS from 'crypto-js';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const res = await newRequest.post("/auth/login", {username,password});
      const secretKey = 'VotreCleSecrete';
      const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
      localStorage.setItem("currentUser", JSON.stringify({...res.data, password: encryptedPassword}));
      navigate("/")
    }catch(err){
      setError(err.response.data);
    }
  
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
          <form className='form' onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="username">Identifiant</label>
              <input name="username" type="text" placeholder='ex : jeandupont' onChange={e=>setUsername(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="password">Mot de passe</label>
              <input name='password' type="password" placeholder='8 caractères minimum'onChange={e=>setPassword(e.target.value)}/>
            </div>
            <button className='btn' type="submit">Se connecter</button>
            {error && error}
            <Link to="/register" className='link'>Je n'ai pas de compte</Link>
          </form>
      </div>
    </div>
  )
}

export default Login;