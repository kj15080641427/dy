/**
 * Rain 2020-05-14
 */
import React from "react";
import "./style.scss";
import Base from "./Base";
class Rain extends Base {
  static type = "rain";
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.onClose = this.onClose.bind(this);
  }
  render() {
    let { model } = this.props;
    //let drpLevel = (model.drp !== null && model.drp !== undefined) ? model.drp + 'mm' : '--';
    let drpLevel =
      model.drp === null || model.drp === undefined
        ? "--"
        : model.drp.toFixed(1) + "mm";
    let hourRain = model.hourAvg ? (model.hourAvg * 1).toFixed(1) + "mm" : "--";
    let dayRain =
      model.dayAvg === null || model.dayAvg === undefined
        ? "--"
        : (model.dayAvg * 1).toFixed(1) + "mm";

    let tmDesc = model.tm ? model.tm : "--";
    return (
      <div
        className="m-ovl-box m-ovl-rain"
        style={{ display: "none" }}
        ref={(node) => {
          this.container = node;
        }}
      >
        <div className="m-ovl-line">雨量站点：{model.name}</div>
        <div className="m-ovl-line">站点编号：{model.stcd}</div>
        <div className="m-ovl-line">数据来源：{model.dataSourceDesc}</div>
        <div className="m-ovl-line">站点地址：{model.address}</div>
        <div className="m-ovl-line">5分钟降水量：{drpLevel}</div>
        <div className="m-ovl-line">1小时降水量: {hourRain}</div>
        <div className="m-ovl-line">24小时降水量：{dayRain}</div>
        <div className="m-ovl-line">更新时间：{tmDesc}</div>
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
    return Rain.type;
  }
  onCustomClick(e) {}
  onClose() {
    let { onClose, model } = this.props;
    if (onClose) {
      onClose(model.id, Rain.type);
    }
  }
}
export default Rain;
