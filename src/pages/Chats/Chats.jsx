import React, { useState, useEffect } from 'react';
import Nav from '../../components/Nav/Nav';
import NavWork from '../../components/NavWork/NavWork';
import { Link } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import "./Chats.css";
import newRequest from '../../utils/newRequest';

function Chats() {
  const [conversations, setConversations] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const res = await newRequest.get(`/messages/conversations`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadConversations();
  }, []);

  return (
    <>
      <Nav />
      <div className="chats-ctn">
        <NavWork />
        {conversations.map((conversation) => (
          <ChatItem key={conversation._id} conversation={conversation} currentUser={currentUser} />
        ))}
      </div>
    </>
  )
}

const ChatItem = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userId = conversation.senderId === currentUser._id ? conversation.receiverId : conversation.senderId;
        const res = await newRequest.get(`/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadUser();
  }, [conversation, currentUser]);

  if (!user) {
    return null; // Render a loading state or placeholder here if needed
  }

  return (
    <Link className='chat-item' to={`/chat/${user._id}`}>
      <ProfilePicture photo={user.img} badge={user.sub} />
      <div>
        <p className="name">
          {user.isSeller ? `${user.name} ${user.lastname.charAt(0)}.` : user.name}
        </p>
        <p className='last-message'>{conversation.text}</p>
      </div>
    </Link>
  );
};

export default Chats;
