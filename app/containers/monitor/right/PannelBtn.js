/**
 * PannelBtn 2020-05-12
 */
import React from 'react';
import "./style.scss";
import { Row, Col } from 'antd';
import everyday from '../../../resource/everyday.png';
import flood from '../../../resource/flood.png';
import moment from "moment";

class PannelBtn extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      weatherData: {}
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
                <Col span={12}><img className="m-btn-everyday" src={everyday}></img></Col>
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
    fetch("/api/weather/get", {
      method: 'GET',
      mode: 'cors',
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ weatherData: result.data })
        console.log(this.state.weatherData)
      })
  }
  componentWillUnmount() {
    clearTimeout(this.time);
  }
}
export default PannelBtn;