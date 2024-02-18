import React from 'react';
import "./ProfilePicture.scss";

function ProfilePicture({photo="/img/pp/noavatar.jpg", badge=0}) {
  return (
    <div className='pp'>
        <img loading='lazy' className='photo' src={photo} alt="" />
        {
          badge>0 ? (
              <img loading='lazy' className="badge" src={
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