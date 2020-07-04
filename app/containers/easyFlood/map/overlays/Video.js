/**
 * Video 2020-05-14
 */
import React from 'react';
import "./style.scss";
import Base from "./Base";
import {transform} from 'ol/proj.js';
import VideoComponent from '@app/components/video/VideoComponent';
class Video extends Base {
  static type = "video";
  static single = true; // 仅能弹出最近一个,其他关闭
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
    let token = model.strtoken;
    let type = model.dataSource;
    return ( 
      <div className="m-ovl-box m-ovl-video" style={{display: "none", width: 620, height: 420}} ref={(node) => { this.container = node;}}>
        <span className="iconfont iconcuo m-ovl-close"></span>
        <div className="m-ovl-line" onClick={this.onRequestFullScreen.bind(this)}>
          <span>视频站点: {model.sitename}</span>
        </div>
        <div className="m-ovl-vc">
          <VideoComponent
            videoControl={videoControl}
            token={token}
            type={type}
            style={{ width: 590, height: 380, borderWidth: 0 }}
          />
        </div>
      </div>
    );
  }
  componentDidCatch() {

  }
  componentDidMount() {
    //super.componentDidMount();
    let { map, model } = this.props;
    if (!map || !model) return;
    let nowNode = this.container.cloneNode(true);
    nowNode.style.display = "block";
    this.installEvent(nowNode);
    let id = this.getType() + "_" + model.id;
    let map_center = map.getView().getCenter();
    let center = transform(map_center, 'EPSG:3857', 'EPSG:4326');
    map.addOverlay(id, { Coordinate: center, offset: [-290, -140] }, nowNode);
    

  }
  componentWillUnmount() {
    super.componentWillUnmount();
  }
  getType() {
    return Video.type;
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