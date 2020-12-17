/**
 * Ponding 2020-05-14
 */
import React from "react";
import "./style.scss";
import Base from "./Base";
import { Popover } from "antd";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/rain";
class Ponding extends Base {
  static type = "ponding";
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.onClose = this.onClose.bind(this);
  }
  render() {
    let { model } = this.props;
    const { dict } = model;
    //let drpLevel = (model.drp !== null && model.drp !== undefined) ? model.drp + 'mm' : '--';
    let tmDesc = model.tm ? model.tm : "--";
    return (
      <div
        className="m-ovl-box m-ovl-rain luo-ovl-rain"
        style={{ display: "none" }}
        ref={(node) => {
          this.container = node;
        }}
      >
        <div className="m-ovl-line luo-ovl-title">积水站点：{model.name}</div>
        <div className="m-ovl-line">
          <label
            style={{ width: "80px", marginLeft: "10px", textAlign: "left" }}
          >
            积水深度：
          </label>
          {model.z}cm
        </div>
        <div className="m-ovl-line">
          <label
            style={{ width: "80px", marginLeft: "10px", textAlign: "left" }}
          >
            站点编号：
          </label>
          {model.stcd}
        </div>
        <div className="m-ovl-line">
          <label
            style={{ width: "80px", marginLeft: "10px", textAlign: "left" }}
          >
            数据来源：
          </label>
          {model.dict[model.siteDictionariesID]}
        </div>
        <div className="m-ovl-line">
          <label
            style={{ width: "80px", marginLeft: "10px", textAlign: "left" }}
          >
            更新时间：
          </label>
          {tmDesc}
        </div>
        <div className="m-ovl-line" style={{ display: "flex" }}>
          <label
            style={{ width: "80px", marginLeft: "10px", textAlign: "left" }}
          >
            站点地址：
          </label>
          {/* <Popover content={model.address.toString()} title="地址全称">
            {model.address.toString().length > 15
              ? model.address.toString().substring(0, 15) + "..."
              : model.address.toString()}
          </Popover> */}
          <div style={{ width: "150px" }}>{model.address}</div>
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
    return Ponding.type;
  }
  onCustomClick(e) {}
  onClose() {
    let { onClose, model } = this.props;
    if (onClose) {
      onClose(model.id, Ponding.type);
    }
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Rain);
export default Ponding;
