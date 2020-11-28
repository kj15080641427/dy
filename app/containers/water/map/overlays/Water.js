import React from "react";
import "./style.scss";
import Base from "./Base";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/rain";
class Water extends Base {
  static type = "water";
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.onClose = this.onClose.bind(this);
  }
  render() {
    let { model } = this.props;
    const { dict } = model;
    console.log(model);
    //let drpLevel = (model.drp !== null && model.drp !== undefined) ? model.drp + 'mm' : '--';
    let tmDesc = model?.riverwaterdataList[0]?.tm
      ? model?.riverwaterdataList[0]?.tm
      : "--";
    return (
      <div
        className="m-ovl-box m-ovl-rain luo-ovl-rain"
        style={{ display: "none" }}
        ref={(node) => {
          this.container = node;
        }}
      >
        <div className="m-ovl-line luo-ovl-title">
          水位站点：{model?.siteWaterLevels[0]?.name}
        </div>
        <div className="m-ovl-line">
          <label style={{ width: "80px" }}>站点水位：</label>
          {model?.riverwaterdataList[0]?.z || "--"}m
        </div>
        <div className="m-ovl-line">
          <label style={{ width: "80px" }}>警戒水位：</label>
          {model?.siteWaterLevels[0]?.warning || "--"}m
        </div>
        <div className="m-ovl-line">
          <label style={{ width: "80px" }}>数据来源：</label>
          {model.dict[model?.siteWaterLevels[0]?.siteDictionariesID]}
        </div>
        <div className="m-ovl-line">
          <label style={{ width: "80px" }}>所属区县：</label>
          {model?.siteWaterLevels[0]?.stlc || "--"}
        </div>
        <div className="m-ovl-line">
          <label style={{ width: "80px" }}>所属河流：</label>
          {model?.siteWaterLevels[0]?.rvnm}
        </div>
        {/* <div className="m-ovl-line">
          <label>水位</label>
          {model.z}cm
        </div> */}
        <div className="m-ovl-line">
          <label style={{ width: "80px" }}>更新时间：</label>
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
    return Water.type;
  }
  onCustomClick(e) {}
  onClose() {
    let { onClose, model } = this.props;
    if (onClose) {
      onClose(model.id, Water.type);
    }
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Rain);
export default Water;
