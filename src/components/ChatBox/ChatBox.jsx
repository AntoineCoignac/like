import React from 'react';
import SendIcon from '../../icons/send/SendIcon';
import "./ChatBox.css";
import Message from '../Message/Message';
import { useState } from 'react';
import newRequest from '../../utils/newRequest';

function ChatBox({ fullscreen = false, user = {} }) {
  const [isWriting, setIsWriting] = useState(false);
  const [value, setValue] = useState("");

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
      console.log(value);
      setValue("");
      setIsWriting(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isWriting) {
      handleSubmit();
    }
  }

  return (
    <div className={`chat ${fullscreen ? "fullscreen" : ""}`}>
      <div className="messages">
        <Message received={true} text="Lorem ipsum dolor sit amet" />
        <Message received={false} text="Lorem ipsum dolor sit amet" />
        <Message received={false} text="Lorem ipsum dolor sit amet" />
        <Message received={true} text="Lorem ipsum dolor sit amet" />
      </div>
      <div className="send">
        <input
          onInput={handleInput}
          onKeyPress={handleKeyPress} // Call handleKeyPress when a key is pressed
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
