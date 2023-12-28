import React from 'react'
import "./Message.scss";
import ProfilePicture from '../ProfilePicture/ProfilePicture';

function Message({received=true, text, user=null}) {
  return (
    <div className={`message ${received ? "received" : ""}`}>
      {
        user ? <ProfilePicture photo={user.img} badge={user.sub}/> : null
      }
      <p>{text}</p>
    </div>
  )
}

export default Message