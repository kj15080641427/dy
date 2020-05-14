/**
 * WeatherBox 2020-05-12
 */
import React from 'react';
import "./style.scss";
import { Statistic, Row, Col,Card } from 'antd';

class WeatherBox extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return (
      <div className="m-wth-box">
        <div style={{
          width: '514px',
          height: '500px',
          border: '1px solid #007ed7',
        }}>
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="全市平均降水量" value={19.56} precision={2} suffix="mm"
            valueStyle={{ color: '#3eb468',fontSize:'40px',fontWeight: 'bold',
             }}/>
          </Col>
          <Col span={5}>
            <Statistic title="河流数" value={42} precision={2} suffix="条"
            valueStyle={{ color: '#3eb468' }}/>
          </Col>
          <Col span={3}>
            <Statistic title="水库数" value={8} precision={2} suffix=""
            valueStyle={{ color: '#3eb468' }}/>
          </Col>
          <Col span={5}>
            <Statistic title="水闸数" value={109} precision={2} suffix=""
            valueStyle={{ color: '#3eb468' }}/>
          </Col>
          <Col span={5}>
            <Statistic title="总蓄水量" value={1.14} precision={2} suffix="亿m³"
            valueStyle={{ color: '#3eb468' }}/>
          </Col>
        </Row>
        </div>
      </div>
    );
  }
  componentDidMount() { }
}
export default WeatherBox;