/**
 * Head 2020-05-12
 */
import React from 'react';
import "./style.scss";
import moment from "moment";
class Head extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return (
      <div className="m-head">
        <div className="m-hd-weather">
          <span className="iconfont iconiconset0451"></span>
          <span>晴转多云</span>
          <span>27℃</span>
          <span>东南风二级</span>
        </div>
        <div className="m-hd-title">
          
        </div>
        <div className="m-hd-time">
          <span className="iconfont iconshijian"></span>
          <span ref={(node) => { this.time = node;}}>{moment().format("YYYY-MM-DD HH:mm:ss dddd")}</span>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this._timer = window.setInterval(() => {
      if (this.time) {
          this.time.innerHTML = moment().format("YYYY-MM-DD HH:mm:ss dddd");
      }
    },1000);
  }
  componentWillUnmount() {
    clearTimeout(this.time);
  }
}
export default Head;