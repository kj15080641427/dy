/**
 * Water 2020-05-14
 */
import React from 'react';
import "./style.scss";
import Base from "./Base";
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
    return ( 
      <div className="m-ovl-box m-ovl-water" ref={(node) => { this.container = node;}}>
        <div className="m-ovl-line">水位站点:{model.stnm}</div>
        <div className="m-ovl-line">站点编号:{model.stcd}</div>
        <div className="m-ovl-line">超警戒水位:{model.z}mm</div>
        <div className="m-ovl-line">报警时间:{model.tm}</div>
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
      onClose(model.id, Water.type);
    }
  }
}
export default Water;