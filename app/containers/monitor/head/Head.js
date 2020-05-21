/**
 * Head 2020-05-12
 */
import React from 'react';
import "./style.scss";
import moment from "moment";

class Head extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      weatherData: {},
    };
  }
  render() {
    const { weatherData } = this.state;

    return (
        <div className="m-head">
          <div className="m-hd-weather">
            <img className="m-hd-weather-img" src={weatherData.state1MinIco}></img>
            <span>{weatherData.stateDetailed}</span>
            <span>{weatherData.temNow}℃</span>
            <span>{weatherData.windState}</span>
          </div>
          <div className="m-hd-title">
          </div>
          <div className="m-hd-time">
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
    fetch("/api/weather/get", {
      method: 'GET',
      mode: 'cors',
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ weatherData: result.data })
      })
  }
  componentWillUnmount() {
    clearTimeout(this.time);
  }
}
export default Head;