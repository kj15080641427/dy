/**
 * WeatherTable 2020-05-12
 * zdl
 * 雨量站，水位，视频，人员
 */
import React from "react";
import "./style.scss";
import imgURL from "../../../resource/title_bg.png";
import { Table, Tabs } from "antd";
import { connect } from "react-redux";
import RainHelper from "@app/utils/rainhelper";
import Precipitation from "./WeatherModule/Precipitation";
import WaterLevel from "./WeatherModule/WaterLevel";
import Video from "./WeatherModule/Video";
import EasyFlood from "./WeatherModule/easyFlood";
import RiverWater from "./WeatherModule/RiverWater";
import emitter from "@app/utils/emitter.js";
import FloodPeople from "./WeatherModule/FloodPeople";
import RainStatistics from "./WeatherModule/RainStatistics";

const { TabPane } = Tabs;

class WeatherTable extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      count: 0,
    };
  }
  render() {
    this.locationClick = this.locationClick.bind(this);
    return (
      <div>
        {/* <div className="m-wth-table-rain"> */}
        {/* <img className="m-table-img" src={imgURL} /> */}
        {/* <div className="m-div-rain"> */}
        {/* <Tabs type="card" defaultActiveKey="1" onChange={this.callback} animated="true" tabBarGutter={10} size="large" className="ant-tabs-nav-container">
            <TabPane tab={`雨量站(${this.state.count})`} key="1"> */}
        <Precipitation parent={this} />
        {/* </TabPane>
            <TabPane tab={'雨量统计'} key={'2'}> */}
        {/* <RainStatistics
                dataSource={this.rainCatalog}
                onRowClick={this.onStationClick.bind(this)} /> */}
        {/* </TabPane> */}
        {/* <TabPane tab="河道" key="2">
              <RiverWater></RiverWater>
            </TabPane> */}
        {/*
            <TabPane tab="易涝点" key="3">
              <EasyFlood></EasyFlood>
            </TabPane> */}
        {/* <TabPane tab="视频站点" key="4">
              <Video></Video>
            </TabPane>
            <TabPane tab="防汛人员" key="5">
              <FloodPeople></FloodPeople>
            </TabPane> */}
        {/* </Tabs> */}
        {/* </div> */}
      </div>
    );
  }
  getChildrenMsg = (result, count) => {
    this.setState({
      count: count,
    });
  };

  componentDidMount() {}

  //即将更新
  componentWillUpdate(nextProps, nextState, nextContext) {
    let stations = nextProps.stations ? { ...nextProps.stations } : [];
    let rainData = nextProps.rainData ? nextProps.rainData.data : [];
    this.rainCatalog = this.getRainCatalog(stations, rainData);
  }

  /**
   * 按照雨量级别分别返回各个级别雨量站的数组
   */
  getRainCatalog(stations, rainData) {
    //rain1 - rain6 分别保存特大暴雨-小雨的站点信息
    let rain1 = [],
      rain2 = [],
      rain3 = [],
      rain4 = [],
      rain5 = [],
      rain6 = [];

    rainData.forEach((item) => {
      let drp = item.avgDrp * 1;
      let station = stations[item.stcd];

      if (station === null || station === undefined) {
        return;
      }

      let info = {
        stcd: item.stcd,
        name: station.name,
        region: station.regionName,
        drp: drp,
      };
      //特大暴雨
      if (RainHelper.isRainHardStorm(drp)) {
        rain1.push(info);
      } else if (RainHelper.isRainHeavyStorm(drp)) {
        //大暴雨
        rain2.push(info);
      } else if (RainHelper.isRainStorm(drp)) {
        //暴雨
        rain3.push(info);
      } else if (RainHelper.isRainHeavy(drp)) {
        //大雨
        rain4.push(info);
      } else if (RainHelper.isRainModerate(drp)) {
        //中雨
        rain5.push(info);
      } else if (RainHelper.isRainLight(drp)) {
        //小雨
        rain6.push(info);
      }
    });

    return [rain1, rain2, rain3, rain4, rain5, rain6];
  }

  locationClick(e) {
    let lon = e.target.dataset.lon * 1;
    let lat = e.target.dataset.lat * 1;
    if (lon == null && lat == null) return;
    emitter.emit("map-move", [lon, lat], () => {
      console.log("moveend");
    });
  }

  onStationClick(param) {
    const { stations } = this.props;
    if (stations) {
      let station = stations[param.stcd];

      if (station) {
        const { lon, lat } = station;

        if (lon && lat) {
          emitter.emit("map-move-focus", [lon, lat], 3000);
        }
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    rainData: state.rain.rainData,
    stations: state.rain.stations,
  };
}

export default connect(mapStateToProps)(WeatherTable);
