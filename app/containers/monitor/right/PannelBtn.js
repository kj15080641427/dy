/**
 * PannelBtn 2020-05-12
 */
import React from 'react';
import "./style.scss";
import { Row, Col } from 'antd';
import everyday from '../../../resource/everyday.png';
import flood from '../../../resource/flood.png';
import sunny from '../../../resource/sunny.svg';

class PannelBtn extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return (
      <div className="m-pannel-btns">
        <div>
          <Row className="m-alm-row">
            <Col span={14}>
              <div className="m-btn-weather">
                <Row>
                  <Col span={6}><img className="m-btn-sunny" src={sunny}></img></Col>
                  <Col span={18}>
                    <div className="m-btn-weather-data">
                      <Row>
                        天气预报:5月15日,
                      </Row>
                      <Row>
                        晴,22℃,东南风,4-5级风
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={10}>
              <Row>
                <Col span={12}><img className="m-btn-flood" src={flood}></img></Col>
                <Col span={12}><img className="m-btn-everyday" src={everyday}></img></Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
  componentDidMount() { }
}
export default PannelBtn;