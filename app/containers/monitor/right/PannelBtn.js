/**
 * PannelBtn 2020-05-12
 * zdl
 * 天气，日常，防汛
 */
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import "./style.scss";
import { Row, Col } from 'antd';
import everyday from '../../../resource/everyday.png';
import flood from '../../../resource/flood.png';
import moment from "moment";
import { getWeatherdata } from "@app/data/request";
class PannelBtn extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      weatherData: {}//天气信息
    };
  }

  render() {
    const { weatherData } = this.state;
    return (
      <div className="m-pannel-btns">
        <div>
          <Row className="m-alm-row">
            <Col span={14}>
              <div className="m-btn-weather">
                <Row>
                  <Col span={6}><img className="m-btn-sunny" src={weatherData.state1MaxIco}></img></Col>
                  <Col span={18}>
                    <div className="m-btn-weather-data">
                      <Row>
                        天气预报:<span ref={(node) => { this.time = node; }}>{moment().format("MM月DD日")}</span>,
                      </Row>
                      <Row>
                        {weatherData.stateDetailed},{weatherData.temNow}℃,
                      </Row>
                      <Row>
                        {weatherData.windState}
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={10}>
              <Row>
                <Col span={12}><img className="m-btn-flood" src={flood}></img></Col>
                <Col span={12}><Link to={"/home"}><img className="m-btn-everyday" src={everyday}></img></Link></Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this._timer = window.setInterval(() => {
      if (this.time) {
        this.time.innerHTML = moment().format("MM月DD日");
      }
    }, 1000);
    //获取天气信息
    getWeatherdata()
      .then(result => {
        this.setState({ weatherData: result.data })
      })
  }
  componentWillUnmount() {
    clearTimeout(this.time);
  }
}
export default PannelBtn;