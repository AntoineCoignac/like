import React, { useState } from 'react';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { Link } from 'react-router-dom';
import "./ProfileMenu.scss";
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleDisconnect = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem('currentUser');
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
        <button className='pp-btn' type='button' onClick={()=> setOpen(!open)}>
            {
              currentUser ? (
                <ProfilePicture photo={currentUser.img} badge={currentUser.isSeller ? currentUser.sub : null}/>
              ) : (
                <ProfilePicture />
              )
            }
        </button>
        <div className="profile-menu-list" id={open ? "open" : ""}>
          <p className='separator'>Mon compte</p>
            <Link className='menu-item' to="/me">🎒 Portfolio</Link>
            <Link className='menu-item' to="/settings">⚙️Paramètres</Link>
            <p className='separator'>Besoin d'aide ?</p>
            <Link className='menu-item' to="https://forms.gle/9WgzeTDbya8S8uFL7">🚧 Signaler un bug</Link>
            <Link className='menu-item discord' to="https://discord.com/invite/UYKHwS6UhT">💜 Discord</Link>
            <button className='menu-item negative' onClick={handleDisconnect}>💔 Se déconnecter</button>
        </div>
    </>
  )
}

export default ProfileMenu