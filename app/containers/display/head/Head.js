/**
 * Head 2020-05-12
 * 头部信息
 */
import React from 'react';
import "./style.scss";
import moment from "moment";
class Head extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      weatherData: {},//天气信息
    };
  }
  render() {
    const { weatherData } = this.state;

    return (
      <div className="dis-head">
        <div className="dis-hd-weather">
          <img className="dis-hd-weather-img" src={weatherData.state1MinIco||""}></img>
          <span>{weatherData.stateDetailed||""}</span>
          <span>{weatherData.temNow||""}℃</span>
          <span>{weatherData.windState||""}</span>
        </div>
        <div className="dis-hd-title">
        </div>
        <div className="dis-hd-time">
          <span className="iconfont iconshijian"></span>
          <span ref={(node) => { this.time = node; }}>{moment().format("YYYY-MM-DD HH:mm:ss dddd")}</span>
        </div>
      </div>
    );
  }
  
  componentDidMount() {
    this._timer = window.setInterval(() => {
      if (this.time) {
        this.time.innerHTML = moment().format("YYYY-MM-DD HH:mm:ss dddd");
      }
    }, 1000);
    
  }
  componentWillUnmount() {
    clearTimeout(this.time);
  }
}
export default Head;