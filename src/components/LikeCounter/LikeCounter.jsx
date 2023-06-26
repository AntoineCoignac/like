import React from 'react'
import Like from '../../icons/like/Like';
import "./LikeCounter.css";

function LikeCounter({nbr}) {
  return (
    <div className="like-counter">
        <Like/>
        <span>{nbr}</span>
    </div>
  )
}

export default LikeCounter;