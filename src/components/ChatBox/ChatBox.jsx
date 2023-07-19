import React from 'react'
import SendIcon from '../../icons/send/SendIcon';
import "./ChatBox.css";
import Message from '../Message/Message';
import { useState } from 'react';

function ChatBox({fullscreen = false}) {

  const [isWriting, setIsWriting] = useState(false);

  const handleInput = (e) => {
    const inputValue = e.target.value;
    setIsWriting(inputValue !== '');
  }

  return (
    <div className={`chat ${fullscreen ? "fullscreen" : ""}`}>
      <div className="messages">
        <Message received={true} text="Lorem ipsum dolor sit amet"/>
        <Message received={false} text="Lorem ipsum dolor sit amet"/>
        <Message received={false} text="Lorem ipsum dolor sit amet"/>
        <Message received={true} text="Lorem ipsum dolor sit amet"/>
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