import React from 'react';
import { NavLink } from 'react-router-dom';
import "./NavWork.css";

function NavWork() {
  return (
    <div className="navwork">
        <NavLink to="/work/orders">Commandes</NavLink>
        <NavLink to="/work/chats">Messages</NavLink>
    </div>
  )
}

export default NavWork;