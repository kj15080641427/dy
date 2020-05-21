/**
 * WeatherTable 2020-05-12
 */
import React from 'react';
import "./style.scss";
import imgURL from '../../../resource/title_bg.png';
import { Table, Tabs } from 'antd';
import Precipitation from './WeatherModule/Precipitation';
import WaterLevel from './WeatherModule/WaterLevel';

class WeatherTable extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }
  render() {
    const { TabPane } = Tabs;
    return (
      <div className="m-wth-table">
        <img className="m-table-img" src={imgURL} alt="" />
        <div className="m-div">
          <Tabs type="card" defaultActiveKey="1" onChange={this.callback} animated="true" tabBarGutter={20} size="large" className="ant-tabs-nav-container">
            <TabPane tab="雨量站" key="1">
              <Precipitation></Precipitation>
            </TabPane>
            <TabPane tab="水位站" key="2">
              <WaterLevel></WaterLevel>
            </TabPane>
            <TabPane tab="视频站点" key="3">
              <Table className="m-div-table" size="small" loading={true} dataSource={this.state.qydataSource} scroll={{ y: 300 }} pagination={false} />
            </TabPane>
            <TabPane tab="防汛人员" key="4">
              <Table className="m-div-table" size="small" loading={true} dataSource={this.state.qydataSource} scroll={{ y: 300 }} pagination={false} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
  componentDidMount() { }
}
export default WeatherTable;