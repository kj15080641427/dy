import React from "react";
import VideoComponent from "./VideoComponent";
import VideoControl from "./VideoControl";
import "./style.scss";
const VideoPlayer = (props) => {
  const videoControl = new VideoControl();
  const { strtoken, style} = props;
  return (
    <div className="video-player">
      <VideoComponent
          style={style}
        videoControl={videoControl}
        token={strtoken}
        type={0}
      />
    </div>
  );
};
export default VideoPlayer;
