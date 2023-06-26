import React from 'react';
import "./ProfilePicture.css";

function ProfilePicture({photo="/img/pp/noavatar.jpg", badge=""}) {
  return (
    <div className='pp'>
        <img className='photo' src={photo} alt="" />
        {
          badge != "" ? (
              <img className="badge" src={
                badge==="starter" ? "/img/badges/starter.svg" : (
                  badge==="premium" ? "/img/badges/premium.svg" : (
                    badge==="pro" ? "/img/badges/pro.svg" : null
                  )
                )
              } alt="" />
            ) : null
        }

    </div>
  )
}

export default ProfilePicture;