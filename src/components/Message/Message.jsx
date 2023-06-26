import React from 'react'
import "./Message.css";

function Message({received=true, text}) {
  return (
    <div className={`message ${received ? "received" : ""}`}>
      <p>{text}</p>
    </div>
  )
}

export default Message