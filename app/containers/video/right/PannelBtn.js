/**
 * PannelBtn 2020-05-12
 * zdl
 * 天气，日常，防汛
 */
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import "./style.scss";
import { Row, Col } from 'antd';
import fxyj from '../../../resource/fxyj.png';
import sjgl from '../../../resource/sjgl.png';
import spjk from '../../../resource/spjk.png';
import ysgq from '../../../resource/ysgq.png';
import zhjk from '../../../resource/zhjk.png';
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
            {/* <Col span={12}> */}
            {/* <div className="m-btn-weather">
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
              </div> */}
            {/* <Row> */}
            <Col span={4}><Link to={"/index"}><img
              className="m-btn-flood"
              src={zhjk}
            // onClick={this.handleindex}
            ></img>
            </Link></Col>
            <Col span={4}>
              <Link to={"/floodWarning"}>
                <img
                  className="m-btn-flood"
                  src={fxyj}
                // onClick={this.handlefxyj}
                ></img>
              </Link>
            </Col>
            <Col span={4}>
              <Link to={"/rain"}>
                <img
                  // className="m-btn-everyday"
                  className="m-btn-flood"
                  src={ysgq}
                // onClick={this.handleysgq}
                ></img>
              </Link>
            </Col>
            {/* </Row> */}
            {/* </Col> */}
            {/* <Col span={12}> */}
            {/* <Row> */}

            <Col span={4}>
              {/* <Link to={"/home"}> */}
              {localStorage.getItem("username") === "admin1" ? null :
              <img
                // className="m-btn-everyday"
                className="m-btn-flood"
                src={sjgl}
              onClick={this.handle}
              ></img>
            }
              {/* </Link> */}
            </Col>
            <Col span={4}></Col>
            <Col span={4}></Col>
            {/* </Row> */}
            {/* </Col> */}
          </Row>
        </div>
      </div>
    );
  }
  handleindex() {
    const w = window.open('about:blank');
    w.location.href = "http://172.19.112.74/new/dist/index.html#/index"
    //  w.location.href = "http://localhost/dist/index.html#/index"
    w.location.href = "/#/index"
  }
  handle() {
    const w = window.open('about:blank');
    // w.location.href = "http://172.19.112.74/new/dist/index.html#/home/rwvdata"
    w.location.href = "http://172.19.112.74/dist/index.html#/home/rwvdata"
    //  w.location.href = "http://localhost/dist/index.html#/home"
    // w.location.href = "/#/home"
  }
  handleysgq() {
    const w = window.open('about:blank');
    w.location.href = "http://172.19.112.74/new/dist/index.html#/rain"
    //  w.location.href = "http://localhost/dist/index.html#/rain"
    // w.location.href = "/#/rain"
  }
  handlefxyj() {
    const w = window.open('about:blank');
    w.location.href = "http://172.19.112.74/new/dist/index.html#/floodWarning"
    //  w.location.href = "http://localhost/dist/index.html#/floodWarning"
    // w.location.href = "/#/floodWarning"
  }
  componentDidMount() {
    this._timer = window.setInterval(() => {
      if (this.time) {
        this.time.innerHTML = moment().format("MM月DD日");
      }
    }, 1000);
    this.selectInit()
    window.setInterval(() => {
      this.selectInit()
    }, 1000 * 12);

  }
  selectInit() {
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