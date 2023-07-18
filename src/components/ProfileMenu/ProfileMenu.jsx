import React, { useState } from 'react';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { Link } from 'react-router-dom';
import "./ProfileMenu.css";

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <>
        <button className='pp-btn' type='button' onClick={()=> setOpen(!open)}>
            <ProfilePicture photo={currentUser.img} badge={currentUser.isSeller ? currentUser.sub : null}/>
        </button>
        <div className="profile-menu-list" id={open ? "open" : ""}>
            <Link to="/me">Mon compte</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/settings">Paramètres</Link>
            <Link to="/help">Aide</Link>
        </div>
    </>
  )
}

export default ProfileMenu