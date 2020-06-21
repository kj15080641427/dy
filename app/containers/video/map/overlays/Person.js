/**
 * Person 2020-05-14
 */
import React from 'react';
import "./style.scss";
import Base from "./Base";
class Person extends Base {
  static type = "person";
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.onClose = this.onClose.bind(this);
  }
  render() {
    let { model } = this.props;
    return ( 
      <div className="m-ovl-box m-ovl-person" style={{display: "none"}} ref={(node) => { this.container = node;}}>
        {<div className="m-ovl-line"><span>姓名: {model.id}</span><span>职位: 工程师</span></div>}
        <div className="m-ovl-line"><span>电话: 12345678901</span><span className="iconfont iconshipin m-ovl-video"></span></div>
        <span className="iconfont iconcuo m-ovl-close"></span>
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
    return Person.type;
  }
  onCustomClick(e) {

  }
  onClose() {
    let { onClose, model } = this.props;
    if (onClose) {
      onClose(model.id, Person.type);
    }
  }
}
export default Person;