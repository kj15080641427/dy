/**
 * PannelBtn 2020-05-12
 * zdl
 * 天气，日常，防汛
 */
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import "@app/containers/monitor/right/style.scss";
import { Row, Col } from 'antd';
import fxyj from '../../../resource/fxyj.png';
import sjgl from '../../../resource/sjgl.png';
import spjk from '../../../resource/spjk.png';
import sqjk from '../../../resource/sqjk.png';
import yld from '../../../resource/yld.png';
import yqjk from '../../../resource/yqjk.png';
import zhjk from '../../../resource/zhjk.png';
import moment from "moment";
import TowBtn from "@app/containers/monitor/right/Module/TowBtn"
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

          <Row className="m-alm-row-index" >
            <Col span={4}>  <Link to={'/index'} ><img
              className="m-btn-flood-index"

              src={zhjk}
            // onClick={this.handlefxyj}
            ></img>
            </Link></Col>
            <Col span={4}><Link to={"/rain"}><img

              className="m-btn-flood-index"
              src={yqjk}
            // onClick={this.handleysgq}
            ></img>
            </Link></Col>
            <Col span={4}>
              <Link to={'/water'} ><img
                className="m-btn-flood-index"
                src={sqjk}
              // onClick={this.handlefxyj}
              ></img>
              </Link></Col>
            <Col span={4}>
              <Link to={"/easyFlood"}><img
                className="m-btn-flood-index"
                src={yld}
              // onClick={this.handleysgq}

              ></img>
              </Link></Col>
            <Col span={4}>  <Link to={"/video"}><img
              className="m-btn-flood-index"
              style={{
                border: '3px solid #007ed7', height: 79,
                '-webkit-filter': 'opacity(0.5)',
              }}
              src={spjk}
            // onClick={this.handlespjk}
            ></img></Link></Col>
            <Col span={4}><Link to={'/floodWarning'} ><img

              className="m-btn-flood-index"
              src={fxyj}
            // onClick={this.handlefxyj}
            ></img>
            </Link></Col>
          </Row>
          <TowBtn></TowBtn>
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
  handlesjgl() {
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