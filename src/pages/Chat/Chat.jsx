import React from 'react'
import Back from '../../components/Back/Back';
import { Link, useParams } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import "./Chat.css";
import ChatBox from '../../components/ChatBox/ChatBox';


function Chat() {
  const {userId} = useParams();

  return (
    <>
      <div className="top-bar">
        <Back/>
        <div className='chat-top'>
          <Link to={`/creator/${userId}`} className="profile">
              <ProfilePicture photo="/img/pp/user1.jpg" badge={1}/>
              <p className='name'>Lorem Ipsum</p>
          </Link>
        </div>
      </div>
      <ChatBox fullscreen={true}/>
    </>
  )
}

export default Chat;