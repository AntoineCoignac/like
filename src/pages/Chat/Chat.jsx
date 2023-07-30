import React, { useState } from 'react'
import Back from '../../components/Back/Back';
import { Link, useParams } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import "./Chat.css";
import ChatBox from '../../components/ChatBox/ChatBox';
import newRequest from '../../utils/newRequest';
import { useEffect } from 'react';


function Chat() {
  const { userId } = useParams();
  const [user, setUser] = useState({});

  const loadUser = async () => {
    try {
      const res = await newRequest.get(`/users/${userId}`);
      setUser(res.data);
      console.log(res.data); // This should log the data fetched from the API
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (user) {
    return (
      <>
        <div className="top-bar">
          <Back />
          <div className='chat-top'>
            <Link to={`/user/${userId}`} className="profile">
              <ProfilePicture photo={user.img} badge={user.sub} />
              <p className='name'>{
                user.isSeller ?
                  `${user.name} ${user.lastname.charAt(0)}.` : user.name
              }</p>
            </Link>
          </div>
        </div>
        <ChatBox fullscreen={true} user={user} />
      </>
    )
  } else {
    return (
      <></>
    )
  }
}

export default Chat;