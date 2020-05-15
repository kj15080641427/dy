/**
 * WeatherTable 2020-05-12
 */
import React from 'react';
import "./style.scss";
import localimgURL from '../../../resource/local.png';
import imgURL from '../../../resource/title_bg.png';
import { Table,Tabs } from 'antd';

class WeatherTable extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
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
        width: 160,
        className: 'column-money'
      },
      {
        title: '监测值(mm)',
        dataIndex: 'num',
        width: 110,
        className: 'column-money'
      },
      {
        title: '定位',
        dataIndex: 'loca',
        render: value => <img src={localimgURL} alt="" />,
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
    function callback(key) {
      console.log(key);
    }
    return (
      <div className="m-wth-table">
        <img style={{
          top: '100px',
          width: '107px',
          height: '8px',
        }} src={imgURL} alt="" />
        <div style={{
          width: '514px',
          height: '418px',
          border: '1px solid #007ed7',
          bottom: '-10px'
        }}>
          <Tabs defaultActiveKey="1" onChange={callback} type="card" animated="true" >
            <TabPane tab="雨量站" key="1">
              <Table size="small" loading="true" columns={columns} dataSource={data} scroll={{ y: 300 }} pagination={false} />
            </TabPane>
            <TabPane tab="水位站" key="2">
              <Table size="small" columns={columns} dataSource={data} scroll={{ y: 300 }} pagination={false} />
            </TabPane>
            <TabPane tab="视频站点" key="3">
              <Table size="small" columns={columns} dataSource={data} scroll={{ y: 300 }} pagination={false} />
            </TabPane>
            <TabPane tab="防汛人员" key="4">
              <Table size="small" columns={columns} dataSource={data} scroll={{ y: 300 }} pagination={false} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
  componentDidMount() { }
}
export default WeatherTable;