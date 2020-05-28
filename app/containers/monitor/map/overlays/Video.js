/**
 * Video 2020-05-14
 */
import React from 'react';
import "./style.scss";
import Base from "./Base";
import VideoComponent from '@app/components/video/VideoComponent';
class Video extends Base {
  static type = "video";
  
  constructor(props, context) {
    super(props, context);
    // this.state = {
    //   videoControl: props.videoControl ? props.videoControl : null,
    // };
    this.onClose = this.onClose.bind(this);

  }
  render() {
    let { model } = this.props;
    let { videoControl } = model;
    return ( 
      <div className="m-ovl-box m-ovl-video" style={{display: "none", width: 620, height: 420}} ref={(node) => { this.container = node;}}>
        <span className="iconfont iconcuo m-ovl-close"></span>
        <div className="m-ovl-line" onClick={this.onRequestFullScreen.bind(this)}>
          <span>视频站点: {model.sitename}</span>
        </div>
        <div className="m-ovl-vc">
          <VideoComponent videoControl={videoControl} token={'device1--21'} style={{width: 590 , height: 380 , borderWidth: 0}} />
      
        </div>
      </div>
    );
  }
  componentDidCatch() {

  }
  componentDidMount() {
    super.componentDidMount();
  }
  componentWillUnmount() {
    super.componentWillUnmount();
  }
  onCustomClick(e) {

  }
  onRequestFullScreen() {
    console.log('click');
    if (this.requestFullscreen) {
      this.requestFullscreen();
    }
  }

  onClose() {
    let { onClose, model } = this.props;
    if (onClose) {
      onClose(model.id, Video.type);
    }
  }
}
export default Video;