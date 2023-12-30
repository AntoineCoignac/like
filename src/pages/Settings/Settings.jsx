import React from 'react';
import Back from '../../components/Back/Back';
import "./Settings.scss";
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Settings() {
  const navigate = useNavigate();
  const [seeNewPW, setSeeNewPW] = useState(false);
  const [newPW, setNewPW] = useState("");
  const [seePW, setSeePW] = useState(false);
  const [PW, setPW] = useState("");
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem('currentUser');
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoi de la requête POST vers /auth/changepassword
      const response = await newRequest.put("/auth/changepassword", {
        oldPassword: PW,
        newPassword: newPW,
      });
      navigate("/");
    } catch (err) {
      setError(err.response.data.error || "An error occurred");
      console.error(err);
    }
  };

  const handleChangeNew = (e) => {
    setNewPW(e.target.value);
  };

  const handleChange = (e) => {
    setPW(e.target.value);
  };
  
  return (
    <>
      <div className="top-bar">
        <Back/>
        <p className="name big-title">Paramètres</p>
      </div>
      <div className="settings">
        <div className="row">
        <p className="name big-title">Changer de mot de passe</p>
        <form className='form' onSubmit={handleSubmit}>
          <div className="field-grid">
            <div className="field">
              <label htmlFor="password">Ancien mot de passe</label>
              <input required maxLength={32} onChange={handleChange} name='password' type={seePW ? "text" : "password"} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$" placeholder='8 caractères mini, avec au moins une lettre MAJ, une lettre minuscule, un chiffre et un caractère spécial (!@#$%^&*)' title="Le mot de passe doit contenir au moins 8 caractères, incluant au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (!@#$%^&*)."/>
              <span className="see" onClick={() => setSeePW(!seePW)}>{seePW ? "🙈 Cacher" : "👀 Voir"}</span>
            </div>
            <div className="field">
              <label htmlFor="newpassword">Nouveau mot de passe</label>
              <input required maxLength={32} onChange={handleChangeNew} name='newpassword' type={seeNewPW ? "text" : "password"} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$" placeholder='8 caractères mini, avec au moins une lettre MAJ, une lettre minuscule, un chiffre et un caractère spécial (!@#$%^&*)' title="Le mot de passe doit contenir au moins 8 caractères, incluant au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (!@#$%^&*)."/>
              <span className="see" onClick={() => setSeeNewPW(!seeNewPW)}>{seeNewPW ? "🙈 Cacher" : "👀 Voir"}</span>
            </div>
            </div>
            {
              error && <p className="error">{error}</p>
            }
            <button className='btn' type="submit">🖊️ Modifier</button>
        </form>
        </div>
        <div className="row">
          <p className="name big-title">Une petite pause café ?</p>
          <button onClick={handleClick} className='btn negative'>💔 Se déconnecter</button>
        </div>
      </div>
    </>
  )
}

export default Settings;