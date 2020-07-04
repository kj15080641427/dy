/**
 * WeatherBox 2020-05-12
 * zdl
 * 数据展示（全市平均降水量河流数水库数水闸数河槽总蓄水量）
 */
import React from 'react';
import "./style.scss";
import { Statistic, Row, Col } from 'antd';
import { getCityAvgRaindata } from "@app/data/request";

class WeatherBox extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      weatherCount: 0
    };
  }
  render() {
    return (
      <div className="m-wth-box">
        <div className="m-box-table">
          <Row>
            <Col span={7}>
              <Row>
                <Col><span className="m-box-value">{this.state.weatherCount}</span>mm</Col></Row>
              <Row><span className="m-box-title">全市日降水量</span></Row>
            </Col>
            <Col span={6}>
              <Row><span className="m-box-value">40</span></Row>
              <Row><span className="m-box-title">河流数</span></Row>
            </Col>
            <Col span={6}>
              <Row><span className="m-box-value">14</span></Row>
              <Row><span className="m-box-title">大中型水库</span></Row>
            </Col>
            <Col span={5}>
              <Row><span style={{ position: 'relative', right: '2px' }} className="m-box-value">109</span></Row>
              <Row><span className="m-box-title">水闸数</span></Row>
            </Col>
            {/* <Col span={6}>
              <Row><Col> <span className="m-box-value">3.11</span>亿m³</Col></Row>
              <Row>水库蓄水量</Row>
            </Col> */}
          </Row>
        </div>
      </div>
    );
  }
  fomatFloat(num, pos) {
    // Math.pow(x,y) x 的 y 次幂
    return Math.round(num * Math.pow(10, pos)) / Math.pow(10, pos);
  }
  //初始化数据
  selectInit() {
    getCityAvgRaindata({})
      .then((result) => {
        if (result.data.length > 5) {
          this.setState({ weatherCount: (result.data * 1).toFixed(1) })
        }
      })
  }
  //初始化数据
  componentDidMount() {
    this.selectInit()
    window.setInterval(() => {
      this.selectInit()
    }, 1000 * 5 * 60)
  }
}
export default WeatherBox;