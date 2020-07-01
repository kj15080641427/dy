/**
 * PannelBtn 2020-05-12
 * zdl
 * 天气，日常，防汛
 */
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import "./style.scss";
import { Row, Col, Drawer } from 'antd';
import fxyj from '../../../resource/fxyj.png';
import sjgl from '../../../resource/sjgl.png';
import spjk from '../../../resource/spjk.png';
import ysgq from '../../../resource/ysgq.png';
import hhsq from '../../../resource/hhsq.png';
import hyyb from '../../../resource/hyyb.png';
import moment from "moment";
import { getWeatherdata } from "@app/data/request";
class PannelBtn extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      weatherData: {},//天气信息
      visible: false,//黄河水情
      hyvisible: false,//海洋预警
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  hyshowModal = () => {
    this.setState({
      hyvisible: true,
    });
  };

  hyhandleCancel = e => {
    console.log(e);
    this.setState({
      hyvisible: false,
    });
  };
  render() {
    const { weatherData } = this.state;
    return (
      <div className="m-pannel-btns">
        <Drawer
          title="黄河水情"
          placement="top"
          onClose={this.handleCancel}
          visible={this.state.visible}
          width={"100%"}
          height="100%"
        >
          <div style={{ height: '950px', width: '1060px' }}>
            <iframe src="http://61.163.88.227:8006/hwsq.aspx" width="1870px" height="950px"
              frameborder="0" scrolling="no" style={{ position: 'relative' }}></iframe>
          </div>
        </Drawer>
        <Drawer
          title="海洋预警"
          placement="top"
          onClose={this.hyhandleCancel}
          visible={this.state.hyvisible}
          width={"100%"}
          height="100%"
        >
          <div style={{ height: '950px', width: '1060px' }}>
            <iframe src="http://hsdy.dongying.gov.cn/col/col36593/index.html" width="1870px" height="1225px"
              frameborder="0" scrolling="no" style={{ position: 'relative', top: -340 }}></iframe>
          </div>
        </Drawer>
        <div>
          <Row className="m-alm-row">
            <Col span={4}><img
              className="m-btn-flood"
              src={hhsq}
              onClick={this.showModal}
            ></img>
            </Col>
            <Col span={4}><img
              className="m-btn-flood"
              src={hyyb}
              onClick={this.hyshowModal}
            ></img>
            </Col>
            <Col span={4}>
              <Link to={'/floodWarning'} ><img
                className="m-btn-flood"
                src={fxyj}
              // onClick={this.handlefxyj}
              ></img>
              </Link>
            </Col>
            <Col span={4}>
              <Link to={"/rain"}><img
                className="m-btn-flood"
                src={ysgq}
              // onClick={this.handleysgq}
              ></img>
              </Link>
            </Col>
            <Col span={4}>
              <Link to={"/video"}><img
                className="m-btn-flood"
                src={spjk}
              // onClick={this.handlespjk}
              ></img></Link></Col>

            <Col span={4}>
              {/* <Link to={"/home"}> */}
              {localStorage.getItem("username") === "admin1" ? null :
                <img
                  className="m-btn-flood"
                  src={sjgl}
                  onClick={this.handlesjgl}
                ></img>
              }
              {/* </Link> */}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
  handlespjk() {
    const w = window.open('about:blank');
    w.location.href = "http://172.19.112.74/new/dist/index.html#/video"
    //  w.location.href = "http://localhost/dist/index.html#/home"
    // w.location.href = "/#/video"
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
    // this._timer = window.setInterval(() => {
    //   if (this.time) {
    //     this.time.innerHTML = moment().format("MM月DD日");
    //   }
    // }, 1000);
    // this.selectInit()
    // window.setInterval(() => {
    //   this.selectInit()
    // }, 1000 * 12);

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