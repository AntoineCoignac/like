import React, { useState, useEffect, useRef } from 'react';
import SendIcon from '../../icons/send/SendIcon';
import "./ChatBox.css";
import Message from '../Message/Message';
import newRequest from '../../utils/newRequest';

function ChatBox({ fullscreen = false, user = {} }) {
  const [isWriting, setIsWriting] = useState(false);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]); // State pour stocker les messages
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const messagesRef = useRef(null); // Ref for the .messages container

  const handleInput = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setIsWriting(inputValue !== '');
  }

  const handleSubmit = async () => {
    try {
      await newRequest.post("/messages/", {
        receiverId: user._id,
        text: value,
      });
      setValue("");
      setIsWriting(false);
      // Rafraîchir la liste des messages après l'envoi
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isWriting) {
      handleSubmit();
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await newRequest.get(`/messages/messages/${user._id}`);
      setMessages(response.data); // Mettre à jour les messages récupérés dans le state
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages(); // Appeler fetchMessages lors du montage initial du composant
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the messages container after updating messages
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className={`chat ${fullscreen ? "fullscreen" : ""}`}>
      <div className="messages" ref={messagesRef}>
        {/* Afficher les messages récupérés */}
        {messages.map((message) => (
          <Message
            key={message._id} // Assurez-vous d'avoir une clé unique pour chaque message
            received={message.senderId !== currentUser._id}
            text={message.text}
            user={message.senderId !== currentUser._id ? { img : user.img, sub : user.sub} : null}
          />
        ))}
      </div>
      <div className="send">
        <input
          onInput={handleInput}
          onKeyPress={handleKeyPress}
          type="text"
          placeholder='Rédiger un message'
          value={value}
        />
        <button onClick={handleSubmit} className='send-btn' disabled={!isWriting}>
          <SendIcon />
        </button>
      </div>
    </div>
  )
}

export default ChatBox;
