import React from 'react'
import Like from '../../icons/like/Like';
import "./LikeCounter.scss";

function LikeCounter({nbr}) {
  return (
    <div className="like-counter">
        <Like/>
        <span>{nbr}</span>
    </div>
  )
}

export default LikeCounter;