/**
 * Head 2020-05-12
 * 头部信息
 */
import React from "react";
import "./style.scss";
import moment from "moment";
import { getWeatherdata } from "@app/data/request";
class Head extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      weatherData: {}, //天气信息
    };
  }
  render() {
    const { weatherData } = this.state;
    const { titleImg, groundColor } = this.props;
    return (
      <div
        className="m-head-water"
        style={{
          background: `url(${titleImg}) center no-repeat`,
          backgroundColor: groundColor,
        }}
      >
        <div className="m-hd-weather">
          <img
            className="m-hd-weather-img"
            src={weatherData.state1MinIco}
          ></img>
          <span>{weatherData.stateDetailed}</span>
          <span>{weatherData.temNow}℃</span>
          <span>{weatherData.windState}</span>
        </div>
        <div className="m-hd-title"></div>
        <div className="m-hd-time">
          <span className="iconfont iconshijian"></span>
          <span
            ref={(node) => {
              this.time = node;
            }}
          >
            {moment().format("YYYY-MM-DD HH:mm:ss dddd")}
          </span>
        </div>
      </div>
    );
  }
  selectInit() {
    //获取天气信息
    getWeatherdata().then((result) => {
      this.setState({ weatherData: result.data });
    });
  }
  componentDidMount() {
    this._timer = window.setInterval(() => {
      if (this.time) {
        this.time.innerHTML = moment().format("YYYY-MM-DD HH:mm:ss dddd");
      }
    }, 1000);
    this.selectInit();
    this.init = window.setInterval(() => {
      this.selectInit();
    }, 1000 * 5 * 60);
  }
  componentWillUnmount() {
    clearTimeout(this.time);
    clearTimeout(this.init);
  }
}
export default Head;
