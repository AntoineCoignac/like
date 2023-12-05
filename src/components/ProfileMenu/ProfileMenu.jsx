import React, { useState } from 'react';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { Link } from 'react-router-dom';
import "./ProfileMenu.css";
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleDisconnect = async () => {
    try {
      await newRequest.post("/auth/logout");
      console.log("Before removal:", localStorage.getItem("currentUser"));
      localStorage.removeItem('currentUser');
      console.log("After removal:", localStorage.getItem("currentUser"));
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
            <Link className='menu-item' to="/me">Mon compte</Link>
            <Link className='menu-item' to="/settings">Paramètres</Link>
            <Link className='menu-item' to="/help">Aide</Link>
            <button className='menu-item negative' onClick={handleDisconnect}>Se déconnecter</button>
        </div>
    </>
  )
}

export default ProfileMenu