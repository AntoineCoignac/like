import React, { useState } from 'react'
import Back from '../../components/Back/Back';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import "./Chat.css";
import ChatBox from '../../components/ChatBox/ChatBox';
import newRequest from '../../utils/newRequest';
import { useEffect } from 'react';
import Load from '../../components/Load/Load';


function Chat() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
    if (userId) { // Vérifiez si userId est défini
      loadUser();
    }

    // Check if currentUser._id === userId and redirect if necessary
    if (currentUser._id === userId) {
      navigate('/'); // Redirect to the homepage using navigate
    }
  }, [userId, currentUser, navigate]);

  return (
    <>
      {user ? (
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
      ) : (
        <Load/>
      )}
    </>
  );

}

export default Chat;