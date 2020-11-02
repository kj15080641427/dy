/**
 * Rain 2020-05-14
 */
import React from "react";
import "./style.scss";
import Base from "./Base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/rain";
class Video extends Base {
  static type = "video";
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.onClose = this.onClose.bind(this);
  }
  render() {
    let { model } = this.props;
    const { dict } = model;
    console.log(model, "MODEL");

    let tmDesc = model.tm ? model.tm : "--";
    return (
      <div
        className="m-ovl-box m-ovl-rain luo-ovl-rain"
        style={{ display: "none" }}
        ref={(node) => {
          this.container = node;
        }}
      >
        <div className="m-ovl-line luo-ovl-title">视频站点：{model.name}</div>
        <div className="m-ovl-line">
          <label>站点编号：</label>
          {model.stcd}
        </div>
        <div className="m-ovl-line">
          <label>数据来源：</label>视频
        </div>
        <div className="m-ovl-line">
          <label>站点地址：</label>
          {model.address}
        </div>
        {/* <div className="m-ovl-line"><label>5分钟降水量：</label>{drpLevel}</div>
        <div className="m-ovl-line"><label>1小时降水量：</label>{hourRain}</div>
        <div className="m-ovl-line"><label>24小时降水量：</label>{dayRain}</div> */}
        <div className="m-ovl-line">
          <label>更新时间：</label>
          {tmDesc}
        </div>
        <span className="iconfont iconcuo m-ovl-close"></span>
      </div>
    );
  }
  componentDidCatch() {}
  componentDidMount() {
    super.componentDidMount();
  }
  componentWillUnmount() {
    super.componentWillUnmount();
  }
  getType() {
    return Video.type;
  }
  onCustomClick(e) {}
  onClose() {
    let { onClose, model } = this.props;
    if (onClose) {
      onClose(model.id, Video.type);
    }
  }
}

export default Video;
