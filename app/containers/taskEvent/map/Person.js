/**
 * Person 2020-05-14
 */
import React from "react";
import "./style.scss";
import Base from "./Base";
import { DatePicker, Button } from "antd";
class Person extends Base {
  static type = "person";
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.onClose = this.onClose.bind(this);
  }
  onStartOk(value) {
    console.log(value);
  }
  onEndOk(value) {
    console.log(value);
  }
  render() {
    let { model, onSelect } = this.props;
    console.log(model, "MMM");
    return (
      <div
        className="m-ovl-box m-ovl-person"
        style={{ display: "none" }}
        ref={(node) => {
          this.container = node;
        }}
      >
        <div className="m-ovl-line">
          <span>姓名: {model.name}</span>
        </div>
        <div className="m-ovl-line">
          <span>工作单位: {model.unit}</span>
        </div>
        <div className="m-ovl-line">
          <span>人员类型: {model.remark}</span>
        </div>
        <div className="m-ovl-line">
          <span>电话号码: {model.phone}</span>
          {/*<span className="iconfont iconshipin m-ovl-video"/>*/}
        </div>

        {/*<div style={{ color: "white" }}>*/}
        {/*  开始时间:*/}
        {/*  <DatePicker*/}
        {/*    format="YYYY-MM-DD HH:mm"*/}
        {/*    onOk={this.onStartOk}*/}
        {/*    onChange={() => console.log(111)}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div style={{ color: "white" }}>*/}
        {/*  结束时间:*/}
        {/*  <DatePicker*/}
        {/*    format="YYYY-MM-DD HH:mm"*/}
        {/*    onOk={this.onEndOk}*/}
        {/*    onChange={() => console.log(111)}*/}
        {/*  />*/}
        {/*</div>*/}
        <div style={{alignItems: 'right'}}>
          <Button type={'link'}
            onClick={() => {
              onSelect;
            }}
          >
            轨迹查询
          </Button>
        </div>
        {/* <span className="iconfont iconcuo m-ovl-close"></span> */}
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
    return Person.type;
  }
  onCustomClick(e) {}
  onClose() {
    let { onClose, model } = this.props;
    if (onClose) {
      onClose(model.id, Person.type);
    }
  }
}
export default Person;
