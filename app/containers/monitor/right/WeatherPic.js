/**
 * WeatherPic 2020-05-12
 * zdl
 * 云图
 */
import React from 'react';
import "./style.scss";
import { Carousel, Tabs } from 'antd';
import imgURL from '../../../resource/title_bg.png';
import moment from 'moment';
const { TabPane } = Tabs;
import { getSatellite } from "@app/data/request";

class WeatherPic extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      totalData: [],//卫星云图信息
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
          <Tabs defaultActiveKey="1" onChange={this.callback} animated="true" tabBarGutter={25} tabPosition="left" size="small" >
            <TabPane tab="卫星云图" key="1" >
              <div className="m-pic-div-img">
                <Carousel effect="fade" dots={false} autoplaySpeed={400} speed={1} autoplay>
                  {elements}
                </Carousel>
              </div>
            </TabPane>
            <TabPane tab="气象雷达" key="2">
              <div className="m-pic-div-img">
                <iframe width="100%" height='100%' src="http://172.19.112.74/nephogram/Radar.html" />
              </div>
            </TabPane>
            <TabPane tab="台风路径" key="3">
              <div className="m-pic-div-img">
                <iframe src="http://172.19.112.74/nephogram/typhoon.html" width="410px" height='390px'></iframe>
              </div>
            </TabPane>
            <TabPane tab="全国预报" key="4">
              <div className="m-pic-div-img">
                <iframe src="http://172.19.112.74/nephogram/rainfall.html" width="410px" height='390px'></iframe>
              </div>
            </TabPane>
            <TabPane tab="全国时报" key="5">
              <div className="m-pic-div-img">
                <iframe src="http://172.19.112.74/nephogram/rainfallHour.html" width="410px" height='390px'></iframe>
              </div>
            </TabPane>
            <TabPane tab="市降雨量" key="6">
              <div className="m-pic-div-img">
                <iframe src="http://172.19.112.74/nephogram/rainfallHour.html" width="410px" height='390px'></iframe>
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
    //获取卫星云图
    getSatellite({
      "startTime": startTime,
      "entTime": entTime
    })
      .then((result) => {
        this.setState({ totalData: result.data })
      })
  }
}

export default WeatherPic;