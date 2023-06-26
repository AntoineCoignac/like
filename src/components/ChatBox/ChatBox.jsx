import React from 'react'
import SendIcon from '../../icons/send/SendIcon';
import "./ChatBox.css";
import Message from '../Message/Message';
import { useState } from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../../App';

function ChatBox({fullscreen = false}) {
  let { messages } = useContext(GlobalContext);

  const [isWriting, setIsWriting] = useState(false);

  const handleInput = (e) => {
    const inputValue = e.target.value;
    setIsWriting(inputValue !== '');
  }

  return (
    <div className={`chat ${fullscreen ? "fullscreen" : ""}`}>
      <div className="messages">
        <Message received={true} text={messages[Math.floor(Math.random() * messages.length)]}/>
        <Message received={false} text={messages[Math.floor(Math.random() * messages.length)]}/>
        <Message received={false} text={messages[Math.floor(Math.random() * messages.length)]}/>
        <Message received={true} text={messages[Math.floor(Math.random() * messages.length)]}/>
      </div>
      <div className="send">
        <input onInput={handleInput} type="text" placeholder='Rédiger un message'/>
        <button className='send-btn' disabled={!isWriting}>
          <SendIcon/>
        </button>
      </div>
    </div>
  )
}

export default ChatBox;