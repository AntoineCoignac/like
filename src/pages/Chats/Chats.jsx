import React, { useState } from 'react';
import Nav from '../../components/Nav/Nav';
import NavWork from '../../components/NavWork/NavWork';
import { Link } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import "./Chats.css";
import newRequest from '../../utils/newRequest';
import { useEffect } from 'react';

function Chats() {
  const [conversations, setConversations] = useState([]);

  const loadConversations = async () => {
    try {
      const res = await newRequest.get(`/messages/conversations`);
      setConversations(res.data);
      console.log(res.data); // This should log the data fetched from the API
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  return (
    <>
      <Nav/>
      <NavWork/>
      <div className="chats-ctn">
            <Link className='chat-item' to={`/chat/${1}`}>
              <ProfilePicture photo={"/img/pp/user1.jpg"} badge={1} />
              <div>
                <p className="name">{"Lorem Ipsum"}</p>
                <p className='last-message'>{"Lorem Ipsum dolor sit amet"}</p>
              </div>
            </Link>
            <Link className='chat-item' to={`/chat/${1}`}>
              <ProfilePicture photo={"/img/pp/user1.jpg"} badge={1} />
              <div>
                <p className="name">{"Lorem Ipsum"}</p>
                <p className='last-message'>{"Lorem Ipsum dolor sit amet"}</p>
              </div>
            </Link>
            <Link className='chat-item' to={`/chat/${1}`}>
              <ProfilePicture photo={"/img/pp/user1.jpg"} badge={1} />
              <div>
                <p className="name">{"Lorem Ipsum"}</p>
                <p className='last-message'>{"Lorem Ipsum dolor sit amet"}</p>
              </div>
            </Link>
      </div>
    </>
  )
}

export default Chats;