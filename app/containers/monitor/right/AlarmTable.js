/**
 * AlarmTable 2020-05-12
 * zdl
 * 警戒站
 */
import React from 'react';
import "./style.scss";
import { Table, Tag, Row, Col, Popover } from 'antd';
import emitter from "@app/utils/emitter.js";
import localimgURL from '../../../resource/local.png';
import imgURL from '../../../resource/title_bg.png';
import warningImg from '../../../resource/warning.svg';
import { getWarning } from "@app/data/request";
import moment from 'moment';

class AlarmTable extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      wardataSource: [],//警戒信息
      loading: false,
      total: 0,
      current: 1,
      pageSize: 10,
    };
  }
  render() {
    const columns = [
      {
        title: '站点编号',
        dataIndex: 'stcd',
        width: 100,
        className: 'column-money',
        key:'stcd'
      },
      {
        title: '站名',
        dataIndex: 'stnm',
        width: 75,
        className: 'column-money',
        render:
          stnm => {
            if (stnm !== null && stnm !== "") {
              return (
                <Popover content={stnm} title="站名全称">
                  <Tag>
                    {stnm.substring(0, 3) + '...'}
                  </Tag>
                </Popover>
              )
            } else {
              return (
                <Popover content={stnm} title="站名全称">
                  <Tag>
                    {stnm ? stnm : "暂无数据"}
                  </Tag>
                </Popover>
              )
            }
          }
      },
      {
        title: '报警时间',
        dataIndex: 'tm',
        width: 140,
        className: 'column-money',
        render: value => moment(value).format("YYYY-MM-DD HH:mm")
      },
      {
        title: '超警戒水位(m)',
        dataIndex: 'warning',
        width: 109,
        className: 'column-money',
        key: 'num',
        render:
          num => {
            return (
              <Tag color={'#ec595f'} key={num}>
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
    const { loading } = this.state;
    let pagination = {
      total: this.state.total,
      size: "small",
      current: this.state.current,
      onChange: (current) => this.changePage(current),
      pageSize: this.state.pageSize,
      onShowSizeChange: (current, pageSize) => {//设置每页显示数据条数，current表示当前页码，pageSize表示每页展示数据条数
        console.log(pageSize);
        this.onShowSizeChange(current, pageSize)
      }
    }
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
          <Table className="m-alm-div-table" size="small" loading={loading} columns={columns} dataSource={this.state.wardataSource} scroll={{ y: 280 }} pagination={pagination} />
        </div></div>
    );
  }
  //分页
  onShowSizeChange(current, pageSize) {
    this.setState({ loading: true });
    getWarning({
      "current": current,
      "size": pageSize
    })
      .then((result) => {
        this.setState({ wardataSource: result.data.records })
        this.setState({ loading: false });
        this.setState({ current: result.data.current })
        this.setState({
          pageSize: pageSize
        })
      })
  }
  // 回调函数，切换下一页
  changePage(current) {
    console.log(current)
    this.setState({ loading: true });
    getWarning({
      "current": current,
      "size": this.state.pageSize
    })
      .then((result) => {
        this.setState({ wardataSource: result.data.records })
        this.setState({ loading: false });
        this.setState({ total: result.data.total })
        this.setState({ current: result.data.current })
      })
  }
  componentDidMount() {
    this.setState({ loading: true });
    //获取警戒水位信息
    getWarning({
      "current": this.state.current,
      "size": this.state.pageSize
    })
      .then((result) => {
        this.setState({ wardataSource: result.data.records })
        this.setState({ loading: false });
        this.setState({ total: result.data.total })
        console.log(result.data.records)
      })
  }
  locationClick(e) {
    let lon = e.target.dataset.lon * 1;
    let lat = e.target.dataset.lat * 1;
    if (lon == null && lat == null) return;
    emitter.emit("map-move", [lon, lat], () => { console.log("moveend"); });
  }
}
export default AlarmTable;