import React from 'react'
import Back from '../../components/Back/Back';
import { Link, useParams } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import { useContext } from 'react';
import { GlobalContext } from '../../App';
import "./Chat.css";
import ChatBox from '../../components/ChatBox/ChatBox';


function Chat() {
  let { users, rates, translations } = useContext(GlobalContext);
  const {userId} = useParams();
  let user = users.find(user => user.userId == userId);

  return (
    <>
      <div className="top-bar">
        <Back/>
        <div className='chat-top'>
          <Link to={`/creator/${user.userId}`} className="profile">
              <ProfilePicture photo={user.pp} badge={user.badge}/>
              <p className='name'>{user.username}</p>
          </Link>
        </div>
      </div>
      <ChatBox fullscreen={true}/>
    </>
  )
}

export default Chat;