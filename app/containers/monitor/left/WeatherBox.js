/**
 * WeatherBox 2020-05-12
 */
import React from 'react';
import "./style.scss";
import { Statistic, Row, Col } from 'antd';

class WeatherBox extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    var Style = {
      value:{color: '#3eb468',fontSize:'40px',fontWeight: 'bold'}
    }
    return (
      <div className="m-wth-box">
        <div className="m-box-table">
        <Row>
          <Col span={7}>
            <span className="m-box-value">19.56</span>mm
          </Col>
          <Col span={3}>
          <span className="m-box-value">42</span>
          </Col>
          <Col span={3}>
          <span className="m-box-value">8</span>
          </Col>
          <Col span={5}>
          <span className="m-box-value">109</span>
          </Col>
          <Col span={6}>
          <span className="m-box-value">1.14</span>亿m³
          </Col>
        </Row>
        <Row>
          <Col span={7}>
            全市平均降水量
          </Col>
          <Col span={3}>
            河流数
          </Col>
          <Col span={3}>
            水库数
          </Col>
          <Col span={5}>
            水闸数
          </Col>
          <Col span={6}>
            总蓄水量
          </Col>
        </Row>
        </div>
      </div>
    );
  }
  componentDidMount() { }
}
export default WeatherBox;