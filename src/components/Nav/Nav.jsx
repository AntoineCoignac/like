import React from 'react';
import Logo from "../../icons/logo/Logo"
import { Link } from 'react-router-dom';
import SearchIcon from '../../icons/nav/SearchIcon';
import NotificationsIcon from '../../icons/nav/NotificationsIcon';
import WorkIcon from '../../icons/nav/WorkIcon';
import "./Nav.css";
import ProfileMenu from '../ProfileMenu/ProfileMenu';

function Nav({transparent=false}) {
  return (
    <nav className={`nav ${transparent ? 'transparent' : ""}`}>
        <a href="/" className='logo-item'>
          <Logo/>
        </a>
        <div className="nav-list">
            <Link to="/search">
              <SearchIcon/>
            </Link>
            <Link to="/notifications">
              <NotificationsIcon/>
            </Link>
            <Link to="/work/orders">
              <WorkIcon/>
            </Link>
            <ProfileMenu/>
        </div>
    </nav>
  )
}

export default Nav;