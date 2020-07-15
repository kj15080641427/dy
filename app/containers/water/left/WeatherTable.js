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
import EasyFlood from './WeatherModule/easyFlood';
import emitter from "@app/utils/emitter.js";
import FloodPeople from './WeatherModule/FloodPeople';
import RiverWater from './WeatherModule/RiverWater';
class WeatherTable extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      waterscount: 0,
    };
  }
  render() {
    this.locationClick = this.locationClick.bind(this);
    const { TabPane } = Tabs;
    return (
      <div className="m-wth-tablewater">
        <img className="m-table-img" src={imgURL} />
        <div className="m-divwater">
          <Tabs type="card" defaultActiveKey="2" onChange={this.callback} animated="true" tabBarGutter={10} size="large" className="ant-tabs-nav-container">
            {/* <TabPane tab="雨量站" key="1">
              <Precipitation></Precipitation>
            </TabPane> */}
            <TabPane tab={`水位站(${this.state.waterscount})`} key="2">
              <WaterLevel parent={this}></WaterLevel>
            </TabPane>
            <TabPane tab={`河道`} key="3">
              <RiverWater></RiverWater>
            </TabPane>
            {/* <TabPane tab="视频站点" key="4">
              <Video></Video>
            </TabPane>
            <TabPane tab="防汛人员" key="5">
              <FloodPeople></FloodPeople>
            </TabPane> */}
          </Tabs>
        </div>
      </div>
    );
  }
  getChildrenMsgone = (result, countone) => {
    this.setState({
      waterscount: countone
    })
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