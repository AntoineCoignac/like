import React from 'react';
import "./Media.css";

function Media({type, src}) {
  if (type=="video"){
    return (
      <video autoPlay loop muted className='media'>
        <source src={src} />
      </video>
    )
  }else if (type=="image"){
    return (
      <img className='media' src={src} alt="" />
    )
  }
}

export default Media;