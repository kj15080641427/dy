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
import hyyb from '../../../resource/hyyb.png';
import hhsq from '../../../resource/hhsq.png';
import zhjk from '../../../resource/zhjk.png';
import sqjk from '../../../resource/sqjk.png';
import yqjk from '../../../resource/yqjk.png';
import yld from '../../../resource/yld.png';
import moment from "moment";
import TowBtn from "@app/containers/monitor/right/Module/TowBtn"
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
      <>
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
            <Row className="m-alm-row-index" >
              <Col span={4}>  
              {/* <Link to={'/index'} ><img
                className="m-btn-flood-index"
                style={{ border: '3px solid #007ed7', height: 79 ,
                '-webkit-filter': 'opacity(0.5)'}}
                src={zhjk}
              // onClick={this.handlefxyj}
              ></img>
              </Link> */}
              </Col>
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

      </>
    );
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