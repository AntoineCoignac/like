import React from 'react';
import Nav from '../../components/Nav/Nav';
import NavWork from '../../components/NavWork/NavWork';
import { Link } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import "./Chats.css"

function Chats() {

  return (
    <>
      <Nav/>
      <NavWork/>
      <div className="chats-ctn">
            <Link className='chat-item' to={`/work/chat/${1}`}>
              <ProfilePicture photo={"/img/pp/user1.jpg"} badge={1} />
              <div>
                <p className="name">{"Lorem Ipsum"}</p>
                <p className='last-message'>{"Lorem Ipsum dolor sit amet"}</p>
              </div>
            </Link>
            <Link className='chat-item' to={`/work/chat/${1}`}>
              <ProfilePicture photo={"/img/pp/user1.jpg"} badge={1} />
              <div>
                <p className="name">{"Lorem Ipsum"}</p>
                <p className='last-message'>{"Lorem Ipsum dolor sit amet"}</p>
              </div>
            </Link>
            <Link className='chat-item' to={`/work/chat/${1}`}>
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