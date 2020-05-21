/**
 * WeatherTable 2020-05-12
 */
import React from 'react';
import "./style.scss";
import imgURL from '../../../resource/title_bg.png';
import { Table, Tabs } from 'antd';
import Precipitation from './WeatherModule/Precipitation';
import WaterLevel from './WeatherModule/WaterLevel';
import emitter from "@app/utils/emitter.js";

class WeatherTable extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }
  render() {
    this.state = {};
    this.locationClick = this.locationClick.bind(this);
    const columns = [
      {
        title: '站点编号',
        dataIndex: 'id',
        width: 100,
        className: 'column-money'
      },
      {
        title: '站名',
        dataIndex: 'name',
        width: 75,
        className: 'column-money'
      },
      {
        title: '监测时间',
        dataIndex: 'date',
        width: 140,
        className: 'column-money'
      },
      {
        title: '监测值(m)',
        dataIndex: 'num',
        width: 109,
        className: 'column-money'
      },
      {
        title: '定位',
        dataIndex: 'loca',
        render: value => <img src={localimgURL} data-lon={118.37} data-lat={37.43} onClick={this.locationClick} alt="" />,
        className: 'column-money'
      },
    ];
    const data = [{
      id: "31103937",
      name: `丁王是`,
      date: '2020-05-03 12:00',
      num: `6.08`,
      loca: '',
    }, {
      id: "31103937",
      name: `丁王`,
      date: '2020-05-03 12:00',
      num: `6.08`,
      loca: '',
    }, {
      id: "31103937",
      name: `丁王`,
      date: '2020-05-03 12:00',
      num: `6.08`,
      loca: '',
    }, {
      id: "31103937",
      name: `丁王`,
      date: '2020-05-03 12:00',
      num: `6.08`,
      loca: '',
    }, {
      id: "31103937",
      name: `丁王`,
      date: '2020-05-03 12:00',
      num: `6.08`,
      loca: '',
    }, {
      id: "31103937",
      name: `丁王`,
      date: '2020-05-03 12:00',
      num: `6.08`,
      loca: '',
    }, {
      id: "31103937",
      name: `丁王`,
      date: '2020-05-03 12:00',
      num: `6.08`,
      loca: '',
    }];
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
  locationClick(e) {
    let lon = e.target.dataset.lon * 1;
    let lat = e.target.dataset.lat * 1;
    if (lon == null && lat == null) return;
    emitter.emit("map-move", [lon, lat], () => { console.log("moveend");});
  }
}
export default WeatherTable;