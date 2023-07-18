import React from 'react';
import "./ProfilePicture.css";

function ProfilePicture({photo="/img/pp/noavatar.jpg", badge=""}) {
  return (
    <div className='pp'>
        <img className='photo' src={photo} alt="" />
        {
          badge ? (
              <img className="badge" src={
                badge===1 ? "/img/badges/starter.svg" : (
                  badge===2 ? "/img/badges/premium.svg" : (
                    badge===3 ? "/img/badges/pro.svg" : null
                  )
                )
              } alt="" />
            ) : null
        }

    </div>
  )
}

export default ProfilePicture;