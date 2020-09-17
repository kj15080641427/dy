import React from "react";
import "./style.scss";
import imgURL from "../../../resource/title_bg.png";
import { Tabs } from "antd";
import Video from "./WeatherModule/Video";
import emitter from "@app/utils/emitter.js";

class WeatherTable extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    this.locationClick = this.locationClick.bind(this);
    const { TabPane } = Tabs;
    return (
      <div>
        {/* <img className="m-table-img" src={imgURL} /> */}
        {/* <div className="m-divvideo"> */}
        {/* <Tabs
            type="card"
            defaultActiveKey="1"
            onChange={this.callback}
            animated="true"
            tabBarGutter={10}
            size="large"
            className="ant-tabs-nav-container"
          > */}
        {/* <TabPane tab="视频站点" key="1"> */}
        <Video></Video>
        {/* </TabPane> */}
        {/* </Tabs> */}
        {/* </div> */}
      </div>
    );
  }
  componentDidMount() {}
  locationClick(e) {
    let lon = e.target.dataset.lon * 1;
    let lat = e.target.dataset.lat * 1;
    if (!lon && !lat) {
      return;
    }
    emitter.emit("map-move", [lon, lat], () => {
      console.log("moveend");
    });
  }
}
export default WeatherTable;
