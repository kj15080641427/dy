/**
 * Water 2020-05-14
 */
import React from 'react';
import "./style.scss";
import Base from "./Base";
import {Tabs} from "antd";

class Water extends Base {
  static type = "water";
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.onClose = this.onClose.bind(this);
  }
  render() {
    let { model } = this.props;
    let water = (model.z !== null && model.z !== undefined) ? (model.z + 'm') : '--';
    let udpTm = model.tm ? model.tm : '--';
    let warningLevel = (model.warning && model.warning !== 99) ? (model.warning + 'm') : '--';
    return (
      <div className="m-ovl-box m-ovl-water" style={{display: "none"}} ref={(node) => {this.container = node;}}>
        {/*<div className="m-ovl-line">水位站点：{model.stnm || model.name}</div>*/}
        {/*<div className="m-ovl-line">站点编号：{model.stcd}</div>*/}
        {/*<div className="m-ovl-line">数据来源：{model.dataSourceDesc}</div>*/}
        {/*<div className="m-ovl-line">站点地址：{model.address}</div>*/}
        {/*<div className="m-ovl-line">当前水位：{water}</div>*/}
        {/*<div className="m-ovl-line">警戒水位：{warningLevel}</div>*/}
        {/*<div className="m-ovl-line">更新时间：{udpTm}</div>*/}
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Tab 1" key="1">
            他把
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 2" key="2">
            他2333
          </Tabs.TabPane>
        </Tabs>
        <span className="iconfont iconcuo m-ovl-close" />

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
  getType() {
    return Water.type;
  }
  onCustomClick(e) {

  }
  onClose() {
    let { onClose, model } = this.props;
    if (onClose) {
      onClose(model.id, Water.type);
    }
  }
}
export default Water;
