import React from "react";
import VideoComponent from "./VideoComponent";
import VideoControl from "./VideoControl";
import Holder from "./Holder";
import "./style.scss";
const VideoPlayer = (props) => {
  const videoControl = new VideoControl();
  const { strtoken, style, holderStyle } = props;
  return (
    <div className="video-player">
      <VideoComponent
        style={
          style || {
            width: "620px",
            height: "357px",
            transform: "scale(0.9)",
            position: "absolute",
            left: "-30px",
          }
        }
        videoControl={videoControl}
        token={strtoken}
        type={0}
      ></VideoComponent>
      {/* <div className="video-control"> */}
      <Holder token={strtoken}></Holder>
      {/* </div> */}
    </div>
  );
};
export default VideoPlayer;
