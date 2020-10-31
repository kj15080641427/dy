/**
 * deviceManage 设备管理 2020-10-12
 * auth. 罗剑涛 - 13760171731
 */
import React, { Component } from "react";
import Flood from "./Flood1";
const AllApi = require("@app/data/home");
import { Tabs } from "antd";
const { TabPane } = Tabs;

const deviceTypeMap = [{
  type: '2', name: '水位站', typeName: 'WaterLevels'
}, {
  type: '3', name: '易涝点', typeName: 'WaterPoint'
}, {
  type: '1', name: '雨量站', typeName: 'Rain'
}, {
  type: '4', name: '视频站', typeName: 'WaterRadio'
}]

class deviceManage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      deviceTypeMap: []
    }
  }

  async componentWillMount () {
    for (let i = 0; i < deviceTypeMap.length; i++) {
      const deviceType = deviceTypeMap[i];
      const { data } = await AllApi[`getSite${deviceType.typeName}Page`]({
        current: 1,
        size: -1,
        isRepairTime: '2'
      });
      deviceType.siteData = data;
    }
    this.setState({ deviceTypeMap })
  }
  
  render () {
    return (
      <Tabs>
        {this.state.deviceTypeMap.map(device => (
          <TabPane tab={`${device.name}(${device.siteData.records.length}个)`} key={device.typeName}>
            <Flood device={device} />
          </TabPane>
        ))}
      </Tabs>
    )
  }
};

export default deviceManage;
