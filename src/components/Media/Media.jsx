import React from 'react';
import "./Media.css";

function Media({ type = "video", src }) {
  if (type === "video") {
    return (
      <video autoPlay loop muted disablePictureInPicture controls={true} controlsList='nodownload noremoteplayback noplaybackrate nofullscreen' className='media'>
        <source src={src} />
      </video>
    );
  } else if (type === "image") {
    return (
      <img className='media' src={src} alt="" />
    );
  }
}

export default Media;
