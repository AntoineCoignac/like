import React, { useState } from 'react';
import Cross from "../../icons/cross/Cross";
import "./MediaField.scss";

function MediaField({defaultType="image"}) {
    const [type, setType] = useState(defaultType);
      return (
    <div className="media-field">
        <button type='button' className="delete">
            <Cross/>
        </button>
        {
            type == "image" ? (
                <img loading='lazy' src="/img/pp/noavatar.jpg" alt="" />
            ) : (
                <video loading='lazy' src="/img/post/video/video2.mp4" controls loop></video>
            )
        }
        <input type="file" name="" id="" />
    </div>
  )
}

export default MediaField;