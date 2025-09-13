import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

const LandingVideo = () => {
  const videoRef = useRef(null); // Create a ref for the video element

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Reduce playback speed
    }
  }, []); // Run this effect once when the component mounts
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      style={
        {
          // position: "relative",
          // width: "100%",
          // height: "100%",
          // objectFit: "contain",
        }
      }
    >
      <source
        src="https://res.cloudinary.com/dqbjijwmy/video/upload/v1738667093/csi_landing_vv8xkt.mp4"
        type="video/mp4"
      />
    </video>
  );
};

export default LandingVideo;
