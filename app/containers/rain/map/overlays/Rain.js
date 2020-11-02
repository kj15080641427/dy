/**
 * Rain 2020-05-14
 */
import React from "react";
import "./style.scss";
import Base from "./Base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/rain";
class Rain extends Base {
  static type = "rain";
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.onClose = this.onClose.bind(this);
  }
  render() {
    let { model } = this.props;
    const { dict } = model;
    console.log(model, "MODEL");
    const { drp, hourDrp, dayDrp } = model;
    //let drpLevel = (model.drp !== null && model.drp !== undefined) ? model.drp + 'mm' : '--';
    let drpLevel =
      drp === null || drp === undefined ? "--" : (drp * 1).toFixed(1) + "mm";
    let hourRain =
      hourDrp === null || hourDrp === undefined
        ? "--"
        : (hourDrp * 1).toFixed(1) + "mm";
    let dayRain =
      dayDrp === null || dayDrp === undefined
        ? "--"
        : (dayDrp * 1).toFixed(1) + "mm";

    let tmDesc = model.tm ? model.tm : "--";
    return (
      <div
        className="m-ovl-box m-ovl-rain luo-ovl-rain"
        style={{ display: "none" }}
        ref={(node) => {
          this.container = node;
        }}
      >
        <div className="m-ovl-line luo-ovl-title">雨量站点：{model.name}</div>
        <div className="m-ovl-line"><label>站点编号：</label>{model.stcd}</div>
        <div className="m-ovl-line">
        <label>数据来源：</label>雨量
        </div>
        <div className="m-ovl-line"><label>站点地址：</label>{model.address}</div>
        <div className="m-ovl-line"><label>5分钟降水量：</label>{drpLevel}</div>
        <div className="m-ovl-line"><label>1小时降水量：</label>{hourRain}</div>
        <div className="m-ovl-line"><label>24小时降水量：</label>{dayRain}</div>
        <div className="m-ovl-line"><label>更新时间：</label>{tmDesc}</div>
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
function mapStateToProps(state) {
  return {
    dict: state.currency.dict,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

// export default connect(mapStateToProps, mapDispatchToProps)(Rain);
export default Rain;
