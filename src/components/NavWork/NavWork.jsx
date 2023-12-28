import React from 'react';
import { NavLink } from 'react-router-dom';
import "./NavWork.scss";

function NavWork() {
  return (
    <div className="navwork">
        <NavLink to="/work/dashboard">🕹️ Tableau de bord</NavLink>
        <NavLink to="/work/orders">🛒 Commandes</NavLink>
        <NavLink to="/work/chats">💌 Messages</NavLink>
    </div>
  )
}

export default NavWork;