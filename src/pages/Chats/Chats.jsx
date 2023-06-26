import React from 'react';
import Nav from '../../components/Nav/Nav';
import NavWork from '../../components/NavWork/NavWork';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../App';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import { useContext } from 'react';
import "./Chats.css"

function Chats() {
  let { users, messages } = useContext(GlobalContext);

  return (
    <>
      <Nav/>
      <NavWork/>
      <div className="chats-ctn">
        {
          users.map(user => (
            <Link className='chat-item' to={`/work/chat/${user.userId}`}>
              <div to={`/creator/${user.userId}`} className="profile">
                  <ProfilePicture photo={user.pp} badge={user.badge} />
                  <span>{user.username}</span>
              </div>
              <p>{messages[Math.floor(Math.random() * messages.length)]}</p>
            </Link>
          ))
        }
      </div>
    </>
  )
}

export default Chats;