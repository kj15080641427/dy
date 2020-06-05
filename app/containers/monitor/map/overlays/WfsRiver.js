/**
 * Gate 2020-05-14
 */
import React from 'react';
import "./style.scss";
import Base from "./Base";
class WfsRiver extends Base {
  static type = "wfsRiver";
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.onClose = this.onClose.bind(this);
  }
  render() {
    let { model } = this.props;
    return ( 
      <div className="m-ovl-box m-ovl-wfsRiver" style={{display: "none"}} ref={(node) => { this.container = node;}}>
        <div className="m-ovl-line">河流名称：{model.name}</div>
        <div className="m-ovl-line">流域名称：{model.basin}</div>
        <div className="m-ovl-line">河流总长：{(model.riverlen || 0) + '公里'}</div>
        {/* <div className="m-ovl-line">东营境内长度：{(model.Riverlendy || 0) + '公里'}</div> */}
        <div className="m-ovl-line">河源地址：{model.addresssrs}</div>
        <div className="m-ovl-line">河口地址：{model.addressdest}</div>
        
        <span className="iconfont iconcuo m-ovl-close" ></span>
      </div>
    );
  }
  
  componentDidMount() {
    super.componentDidMount();
  }
  componentWillUnmount() {
    super.componentWillUnmount();
  }
  getType() {
    return WfsRiver.type;
  }
  onCustomClick(e) {

  }
  onClose() {
    let { onClose, model } = this.props;
    if (onClose) {
      onClose(model.id, WfsRiver.type);
    }
  }
}
export default WfsRiver;