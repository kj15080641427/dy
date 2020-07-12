/**
 * WeatherTable 2020-05-12
 * zdl
 * 雨量站，水位，视频，人员
 */
import React from 'react';
import "./style.scss";
import imgURL from '../../../resource/title_bg.png';
import { Table, Tabs } from 'antd';
import Precipitation from './WeatherModule/Precipitation';
import WaterLevel from './WeatherModule/WaterLevel';
import Video from './WeatherModule/Video';
import Experts from './WeatherModule/Experts';
import emitter from "@app/utils/emitter.js";
import FloodPeople from './WeatherModule/FloodPeople';
import FloodGoods from './WeatherModule/FloodGoods';

class WeatherTable extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }
  render() {
    this.state = {};
    this.locationClick = this.locationClick.bind(this);
    const { TabPane } = Tabs;
    return (
      <div className="m-wth-tableflood">
        <img className="m-table-img" src={imgURL} />
        <div className="m-divflood">
          <Tabs type="card" defaultActiveKey="1" onChange={this.callback} animated="true" tabBarGutter={10} size="large" className="ant-tabs-nav-container">
            <TabPane tab="防汛人员" key="1">
              <FloodPeople></FloodPeople>
            </TabPane>
            <TabPane tab="防汛物资" key="2">
              <FloodGoods></FloodGoods>
            </TabPane>
            <TabPane tab="专家库" key="3">
              <Experts></Experts>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
  componentDidMount() { }
  locationClick(e) {
    let lon = e.target.dataset.lon * 1;
    let lat = e.target.dataset.lat * 1;
    if (lon == null && lat == null) return;
    emitter.emit("map-move", [lon, lat], () => { console.log("moveend"); });
  }
}
export default WeatherTable;