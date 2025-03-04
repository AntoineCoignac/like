import React from 'react';
import "./noti-icon.scss";

function MessageIcon() {
    return (
        <svg className='noti-icon' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 24.05H23.65V21.05H8V24.05ZM8 17.55H32V14.55H8V17.55ZM8 11.05H32V8.05H8V11.05ZM0 40V3C0 2.2 0.3 1.5 0.9 0.9C1.5 0.3 2.2 0 3 0H37C37.8 0 38.5 0.3 39.1 0.9C39.7 1.5 40 2.2 40 3V29C40 29.8 39.7 30.5 39.1 31.1C38.5 31.7 37.8 32 37 32H8L0 40ZM6.7 29H37V3H3V33L6.7 29Z" fill="#F8F8F8" />
        </svg>
    )
}

export default MessageIcon;