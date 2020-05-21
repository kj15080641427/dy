/**
 * WeatherPic 2020-05-12
 */
import React from 'react';
import "./style.scss";
import { Carousel, Tabs } from 'antd';
import imgURL from '../../../resource/title_bg.png';
import moment from 'moment';
const { TabPane } = Tabs;
class WeatherPic extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      totalData: [],
    };
  }
  render() {
    const elements = [];
    for (var i = this.state.totalData.length - 1; i >= 0; i--) {
      elements.push(
        <img key={i} className="m-pic-Carousel-img" src={this.state.totalData[i].img_url}></img>
      )
    }
    return (
      <div className="m-wth-pic">
        <img className="m-pic-img" src={imgURL} alt="" />
        <div className="m-pic-div">
          <Tabs defaultActiveKey="1" onChange={this.callback} animated="true" tabBarGutter={44} tabPosition="left" size="small" >
            <TabPane tab="卫星云图" key="1" >
              <div className="m-pic-div-img">
                <Carousel effect="fade" dots={false} autoplaySpeed={400} speed={1} autoplay>
                  {elements}
                </Carousel>
              </div>
            </TabPane>
            <TabPane tab="气象雷达" key="2">
            <div className="m-pic-div-img">
            <iframe width="100%" height='100%' src="http://127.0.0.1:8848/testss/Radar.html" />
            </div>
            </TabPane>
            <TabPane tab="台风路径" key="3">
            <div className="m-pic-div-img">
            <iframe src="http://127.0.0.1:8848/testss/test.html" width="410px" height='390px'></iframe>
            </div>
            </TabPane>
            <TabPane tab="全国日量" key="4">
            <div className="m-pic-div-img">
            <iframe src="http://127.0.0.1:8848/testss/rainfall.html" width="410px" height='390px'></iframe>
            </div>
            </TabPane>
            <TabPane tab="全国时量" key="5">
            <div className="m-pic-div-img">
            <iframe src="http://127.0.0.1:8848/testss/rainfallHour.html" width="410px" height='390px'></iframe>
            </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
  componentDidMount() {
    let startTime = moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYY-MM-DD")
    let entTime = moment(new Date().getTime() + 24 * 60 * 60 * 1000).format("YYYY-MM-DD")
    fetch("/api/satellite/getSatellite", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "startTime": startTime,
        "entTime": entTime
      })
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({ totalData: result.data })
      })
  }
}

export default WeatherPic;