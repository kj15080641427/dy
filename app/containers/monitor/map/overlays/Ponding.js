/**
 * Ponding 2020-05-14
 */
import React from 'react';
import "./style.scss";
import Base from "./Base";
class Ponding extends Base {
  static type = "ponding";
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.onClose = this.onClose.bind(this);
  }
  render() {
    let { model } = this.props;
    return ( 
      <div className="m-ovl-box m-ovl-ponding" style={{display: "none"}} ref={(node) => { this.container = node;}}>
        <div className="m-ovl-line">积水站点:{model.stnm || model.name}</div>
        <div className="m-ovl-line">站点编号:{model.stcd}</div>
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
      onClose(model.id, Ponding.type);
    }
  }
}
export default Ponding;