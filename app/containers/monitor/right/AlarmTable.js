/**
 * AlarmTable 2020-05-12
 */
import React from 'react';
import "./style.scss";
import { Table, Tag, Row, Col } from 'antd';
import emitter from "@app/utils/emitter.js";
import localimgURL from '../../../resource/local.png';
import imgURL from '../../../resource/title_bg.png';
import warningImg from '../../../resource/warning.svg';

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
        title: '报警时间',
        dataIndex: 'date',
        width: 140,
        className: 'column-money'
      },
      {
        title: '超警戒水位(m)',
        dataIndex: 'num',
        width: 109,
        className: 'column-money',
        key: 'num',
        render:
          num => {
            let color = num > 5 ? '#ec595f' : '#40b96c';
            if (num === '5.00') {
              color = '#eee54c';
            }
            return (
              <Tag color={color} key={num}>
                {num}
              </Tag>
            );
          }
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
      num: `5.00`,
      loca: '',
    }, {
      id: "31103937",
      name: `丁王`,
      date: '2020-05-03 12:00',
      num: `4.00`,
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
      <div className="m-alm-table">
        <img className="m-alm-img" src={imgURL} alt="" /><div className="m-alm-div">
          <Row className="m-alm-row">
            <Col span={6}><img className="m-alm-warningImg" src={warningImg}></img></Col>
            <Col span={18}><Row><Col span={12}>超警戒水位<span className="m-alm-row-warning">5</span></Col><Col span={12}>已经处理<span className="m-alm-row-abnormal">2</span></Col>
            </Row><Row><Col span={12}>数据异常<span className="m-alm-row-processed">1</span></Col><Col span={12}>等待处理<span className="m-alm-row-pending">4</span></Col>
              </Row>
            </Col>
          </Row>
          <Table className="m-alm-div-table" size="small" columns={columns} dataSource={data} scroll={{ y: 300 }} pagination={false} />
        </div></div>
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
export default AlarmTable;