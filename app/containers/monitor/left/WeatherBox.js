/**
 * WeatherBox 2020-05-12
 */
import React from 'react';
import "./style.scss";
import { Statistic, Row, Col } from 'antd';

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
            <Col span={8}>
              <span className="m-box-value">{this.state.weatherCount}</span>mm
          </Col>
            <Col span={3}>
              <span className="m-box-value">42</span>
            </Col>
            <Col span={3}>
              <span className="m-box-value">8</span>
            </Col>
            <Col span={4}>
              <span className="m-box-value">109</span>
            </Col>
            <Col span={6}>
              <span className="m-box-value">1.14</span>亿m³
          </Col>
          </Row>
          <Row>
            <Col span={8}>
              全市平均降水量
          </Col>
            <Col span={3}>
              河流数
          </Col>
            <Col span={3}>
              水库数
          </Col>
            <Col span={4}>
              水闸数
          </Col>
            <Col span={6}>
              河槽总蓄水量
          </Col>
          </Row>
        </div>
      </div>
    );
  }
  fomatFloat(num, pos) {
    // Math.pow(x,y) x 的 y 次幂
    return Math.round(num * Math.pow(10, pos)) / Math.pow(10, pos);
  }
  componentDidMount() {

    fetch("/api/count/getCityAvgRaindata", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify()
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data.length > 5) {
          this.setState({ weatherCount: Math.round(result.data * 100) / 100 })
        }
      })

  }
}
export default WeatherBox;