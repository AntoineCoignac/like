
import { Link } from 'react-router-dom'
import Logo from '../../../icons/logo/Logo'
import "../Log.scss";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../../utils/newRequest';
import CryptoJS from 'crypto-js';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [seePW, setSeePW] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const res = await newRequest.post("/auth/login", {username,password});
      localStorage.setItem("currentUser", JSON.stringify({...res.data}));
      navigate("/")
    }catch(err){
      setError(err.response.data);
    }
  
  }

  return (
    <div className='log'>
      <div className="banner">
        <img src="/img/design/mobile.webp" alt="" />
      </div>
      <div className="log-ctn">
        <Link to='/'>
          <Logo/>
        </Link>
        <p className="log-title">Connexion</p>
        <p className='desc'>L'écosystème créatif pour les créateurs et les entreprises.</p>
          <form className='form' onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="username">Identifiant</label>
              <input maxLength={24} name="username" type="text" placeholder='jeandupont' onChange={e=>setUsername(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="password">Mot de passe</label>
              <input maxLength={32} name='password' type={seePW ? "text" : "password"} placeholder='8 caractères mini, avec au moins une lettre MAJ, une lettre minuscule, un chiffre et un caractère spécial (!@#$%^&*)' pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$" title="Le mot de passe doit contenir au moins 8 caractères, incluant au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (!@#$%^&*)." onChange={e=>setPassword(e.target.value)}/>
              <span className="see" onClick={() => setSeePW(!seePW)}>{seePW ? "🙈 Cacher" : "👀 Voir"}</span>
            </div>
            <button className='btn' type="submit">❤️ Se connecter</button>
            {error && error}
            <Link to="https://forms.gle/dgb2uRwfmK8Nj5YG9" className='link'>Je m'inscris à la Bêta</Link>
          </form>
      </div>
    </div>
  )
}

export default Login;