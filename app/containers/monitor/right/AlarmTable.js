/**
 * AlarmTable 2020-05-12
 */
import React from 'react';
import "./style.scss";
import { Table } from 'antd';
import localimgURL from '../../../resource/local.png';
import imgURL from '../../../resource/title_bg.png';

class AlarmTable extends React.PureComponent {
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
    return (
      <div className="m-alm-table"><div style={{
        width: '514px',
        height: '100px',
        border: '1px solid #007ed7',
      }}>
        <Table size="small" columns={columns} dataSource={data} scroll={{ y: 300 }} pagination={false} />
      </div></div>
    );
  }
  componentDidMount() { }
}
export default AlarmTable;