import React, { useRef, useEffect, useState } from 'react';
import "./Media.css";

function Media({ type = "video", src, play = false }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (play) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(error => {
          // Handle play() promise rejection (e.g., due to autoplay restrictions)
          console.log("Failed to play video:", error);
        });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [play]);

  const handleVideoClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }else{
      videoRef.current.muted = false;
      videoRef.current.play().catch(error => {
        // Handle play() promise rejection (e.g., due to autoplay restrictions)
        console.log("Failed to play video:", error);
      });
      setIsPlaying(true);
    }
  };

  if (type === "video") {
    return (
      <video
        ref={videoRef}
        loop
        muted
        disablePictureInPicture
        controls={true}
        controlsList='nodownload noremoteplayback noplaybackrate nofullscreen'
        className='media'
        onClick={handleVideoClick}
      >
        <source src={src} />
      </video>
    );
  } else if (type === "image") {
    return <img className='media' src={src} alt="" />;
  }
}

export default Media;
