/**
 * Rain 2020-05-14
 */
import React from 'react';
import "./style.scss";
import Base from "./Base";
class Rain extends Base {
  static type = "rain";
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.onClose = this.onClose.bind(this);
  }
  render() {
    let { model } = this.props;
    return ( 
      <div className="m-ovl-box m-ovl-rain" ref={(node) => { this.container = node;}}>
        <div className="m-ovl-line">雨量站点:丁王</div>
        <div className="m-ovl-line">站点编号:3100029</div>
        <div className="m-ovl-line">超警戒水位:6.08mm</div>
        <div className="m-ovl-line">报警时间:2020-5-16 12:01</div>
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
      onClose(model.id, Rain.type);
    }
  }
}
export default Rain;