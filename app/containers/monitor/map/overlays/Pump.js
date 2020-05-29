/**
 * Gate 2020-05-14
 */
import React from 'react';
import "./style.scss";
import Base from "./Base";
class Pump extends Base {
  static type = "pump";
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.onClose = this.onClose.bind(this);
  }
  render() {
    let { model } = this.props;
    return ( 
      <div className="m-ovl-box m-ovl-pump" style={{display: "none"}} ref={(node) => { this.container = node;}}>
        <div className="m-ovl-line">泵站名称:{model.name}</div>
        <div className="m-ovl-line">所属河流:{model.rivername}</div>
        <div className="m-ovl-line">管理单位:{model.management || "未知"}</div>
        <span className="iconfont iconcuo m-ovl-close" ></span>
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
      onClose(model.id, Pump.type);
    }
  }
}
export default Pump;