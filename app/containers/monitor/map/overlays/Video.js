/**
 * Video 2020-05-14
 */
import React from 'react';
import "./style.scss";
import Base from "./Base";
class Video extends Base {
  static type = "video";
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.onClose = this.onClose.bind(this);
  }
  render() {
    let { model } = this.props;
    return ( 
      <div className="m-ovl-box m-ovl-video" style={{display: "none"}} ref={(node) => { this.container = node;}}>
        <span className="iconfont iconcuo m-ovl-close"></span>
        <div className="m-ovl-line"><span>视频站点: {model.id}</span><span>更新日期: 2020-05-10 12:00</span></div>
        <div className="m-ovl-vc">
          <video preload="none" control="true" muted autoPlay="autoplay"
            src="https://img1.isheji5.com/ips_video_previews/2020-04-02/11/117beb60-5453-494a-ad83-cab0ba844328.mp4?auth_key=1589625184-0-0-e1b04d01c30101ba346b37a1de981573"
            poster="https://img1.isheji5.com/ips_video_thumbs/2020-04-02/93/93bdd3b3-fb13-4802-a6de-c3996a7a2cd9.png!w380?auth_key=1589625184-0-0-c10d84c5b2cfed27f284aa06da855c95"
          ></video>
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
  onClose() {
    let { onClose, model } = this.props;
    if (onClose) {
      onClose(model.id, Video.type);
    }
  }
}
export default Video;