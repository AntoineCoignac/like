import newRequest from "../../../utils/newRequest"
import { Link } from 'react-router-dom'
import Logo from '../../../icons/logo/Logo'
import "../Log.css";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    username: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
    isSeller: true,
  });
  const [type, setType] = useState("creator");
  const [error, setError] = useState(null);
  const [seePW, setSeePW] = useState(false);

  const handleClick = (event) => {
    const elementId = event.target.id;
    setType(elementId);
    setUser((prev) => {
      return { ...prev, isSeller: (elementId === "creator") };
    });
    console.log(elementId);
  }

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newRequest.post("/auth/register", user);
      navigate("/login")
    } catch (err) {
      setError(err.response.data.error);
    }
  };

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
          <form onSubmit={handleSubmit} className='form'>
            <div className="field">
              <label htmlFor="name">Prénom</label>
              <input onChange={handleChange} name='name' type="text" placeholder='ex : Jean' />
            </div>
            <div className="field">
              <label htmlFor="lastname">Nom</label>
              <input onChange={handleChange} name='lastname' type="text" placeholder='ex : Dupont' />
            </div>
            <div className="field">
              <label htmlFor="username">Identifiant</label>
              <input onChange={handleChange} name="username" type="text" placeholder='ex : jeandupont' />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input onChange={handleChange} name='email' type="email" placeholder='ex : jeandupont@mail.com' />
            </div>
            <div className="field">
              <label htmlFor="password">Mot de passe</label>
              <input onChange={handleChange} name='password' type={seePW ? "text" : "password"} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$" placeholder='8 caractères minimum' title="Le mot de passe doit contenir au moins 8 caractères, incluant au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (!@#$%^&*)."/>
              <span className="see" onClick={() => setSeePW(!seePW)}>{seePW ? "Cacher" : "Voir"} le mot de passe</span>
            </div>
            {error && error}
            <button className='btn' type="submit">S'inscrire</button>
            <Link to="/login" className='link'>J'ai déjà un compte</Link>
          </form>
          <form onSubmit={handleSubmit} className='form'>
            <div className="field">
              <label htmlFor="name">Dénomination sociale</label>
              <input onChange={handleChange} name='name' type="text" placeholder='ex : Like' />
            </div>
            <div className="field">
              <label htmlFor="username">Identifiant</label>
              <input onChange={handleChange} name='username' type="text" placeholder='ex : likecompany' />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input onChange={handleChange} name='email' type="email" placeholder='ex : like@mail.com' />
            </div>
            <div className="field">
              <label htmlFor="password">Mot de passe</label>
              <input onChange={handleChange} name='password' type={seePW ? "text" : "password"} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$" placeholder='8 caractères minimum' title="Le mot de passe doit contenir au moins 8 caractères, incluant au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (!@#$%^&*)."/>
              <span className="see" onClick={() => setSeePW(!seePW)}>{seePW ? "Cacher" : "Voir"} le mot de passe</span>
            </div>
            {error && <p className="error">{error}</p>}
            <button className='btn' type="submit">S'inscrire</button>
            <Link to="/login" className='link'>J'ai déjà un compte</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;