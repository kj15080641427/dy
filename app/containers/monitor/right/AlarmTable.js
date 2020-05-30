/**
 * AlarmTable 2020-05-12
 * zdl
 * 警戒站
 */
import React from 'react';
import "./style.scss";
import { Table, Popover, Tag, Modal, Button, Card, Row, Col } from 'antd';
import emitter from "@app/utils/emitter.js";
import localimgURL from '../../../resource/local.png';
import imgURL from '../../../resource/title_bg.png';
import warningImg from '../../../resource/warning.svg';
import { getwaterlevelAlarmLog, getWaterWarning } from "@app/data/request";
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts';

import moment from 'moment';

class AlarmTable extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      wardataSource: [],//警戒信息
      loading: false,//警戒站数据源加载
      total: 0,//警戒站数据源总数页
      current: 1,//警戒站数据源开始页
      pageSize: 10,//警戒站数据源单页条数
      dataSourceById: [],//单个站点警戒站数据源
      visible: false,//模态框
      mloading: false,//模态框表格加载动画
      wacount: 0,//超警戒水位总数
    };
  }
  //模态框
  showModal = (value) => {
    this.setState({
      visible: true,
    });
    this.setState({ mloading: true });
    let starttm = moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YY-MM-DD HH:mm:ss")
    let endtm = moment(new Date().getTime()).format("YY-MM-DD HH:mm:ss")
    getwaterlevelAlarmLog({
      "stcd": value.stcd,
      "starttm": starttm,
      "endtm": endtm,
    })
      .then((result) => {
        let xdata = []
        let ydata = []
        if (result.data.length !== 0) {
          for (var i = result.data.length - 1; i >= 0; i--) {
            xdata.push(result.data[i].alarmtime)
            ydata.push(result.data[i].actuallevel)
          }
          this.setState({
            dataSourceById: result.data,
            mloading: false,
          })
          var myChart = echarts.init(document.getElementById('mainbywat'));
          myChart.setOption({
            title: {
              text: result.data[0].stnm + "-警戒站24小时水位变化",
              subtext: starttm + '至' + endtm,
              left: 'center',
            },
            grid: {
              top: 90,
            },
            dataZoom: [
              {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
              },
            ],
            tooltip: {
              trigger: 'axis',
              axisPointer: {// 坐标轴指示器，坐标轴触发有效
                type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
              }
            },
            toolbox: {
              show: true,
              feature: {
                dataView: { show: true, readOnly: true },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true },
              }
            },
            xAxis: {
              type: 'category',
              data: xdata,
              name: '时间',
            },
            yAxis: {
              type: 'value',
              name: '超警戒水位(m)'
            },
            visualMap: {
              show: true,
              pieces: [
                {
                  gt: 0,
                  lte: value.baselevel,          //这儿设置基线上下颜色区分 基线下面为绿色
                  color: '#03d6d6'
                }, {
                  gt: value.baselevel,          //这儿设置基线上下颜色区分 基线上面为红色
                  color: '#e91642',
                }]
              ,
            },
            series: [{
              data: ydata,
              type: 'line',
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                  {
                    type: 'min', name: '最小值', itemStyle: {
                      color: '#03d6d6'
                    }
                  }
                ]
              },
              markLine: {
                label: {
                  position: "end",
                },
                color: '#ffcc33',
                data: [
                  {
                    silent: false,
                    label: {
                      position: 'left',
                      formatter: "警戒值" + value.baselevel + "m",
                    },
                    yAxis: value.baselevel,
                  }
                ]
              }
            },],
          });
        } else {
          this.setState({
            mloading: false
          });
        }
      })
  };
  //关闭模态框
  handleCancel = () => {
    this.setState({
      visible: false,
      dataSourceById: []
    })
    var myChart = echarts.init(document.getElementById('mainbywat'));
    myChart.setOption({
      title: {
        text: "暂无数据",
        subtext: '暂无数据',
      },
      xAxis: {
        data: []
      },
      series: [{
        data: [],
      }]
    })
  }
  // 选中行
  onClickRow = (record) => {
    return {
      //单击定位
      onClick: () => {
        console.log(record)
        this.locationClick(record)
      },
      //双击打开历史水位
      onDoubleClick: () => {
        this.showModal(record)
      },
    };
  }
  render() {
    const columns = [
      {
        title: '站点名称',
        dataIndex: 'stnm',
        className: 'column-money',
        render:
          (stnm, key) => {
            return (
              <Popover content={stnm} title="站名全称">
                {stnm.substring(0, 6) + '...'}
              </Popover>
            )
          }
      },

      {
        title: '警戒水位(m)',
        dataIndex: 'baselevel',
        className: 'column-money',
      },
      {
        title: '当前水位(m)',
        dataIndex: 'actuallevel',
        className: 'column-money'
      },
      {
        title: '更新时间',
        dataIndex: 'alarmtime',
        width: 140,
        className: 'column-money',
        render: (value, key) => moment(value).format("YYYY-MM-DD HH:mm")
      },
    ];
    //根据编号获取信息表头daata
    const swcolumnsById = [
      {
        title: '站名',
        dataIndex: 'stnm',
        className: 'column-money',
        render:
          stnm => {
            if (stnm !== null && stnm !== "") {
              return (
                <a>
                  {stnm}
                </a>
              )
            } else {
              return (
                <a>
                  {stnm ? stnm : "暂无数据"}
                </a>
              )
            }
          }
      },
      {
        title: '报警时间',
        dataIndex: 'alarmtime',
        className: 'column-money',
        render: value => moment(value).format("YYYY-MM-DD HH:mm")
      },
      {
        title: '超警戒水位(m)',
        dataIndex: 'baselevel',
        className: 'column-money',
        key: 'baselevel',
        render:
          (baselevel, key) => {
            if (baselevel !== null && baselevel > 0) {
              return (
                <Tag color={'#ec595f'} key={baselevel}>
                  {baselevel - key.actuallevel}
                </Tag>
              );
            } else {
              return (
                <Tag color={'#40b96c'} key={baselevel}>
                  {baselevel - key.actuallevel}
                </Tag>
              );
            }
          }
      },
    ];
    const { loading } = this.state;
    return (
      <div className="m-alm-table">
        <img className="m-alm-img" src={imgURL} alt="" /><div className="m-alm-div">
          <Row className="m-alm-row">
            <Col span={6}><img className="m-alm-warningImg" src={warningImg}></img></Col>
            <Col span={18}><Row><Col span={12}>超警戒水位<span className="m-alm-row-warning">{this.state.wacount}</span></Col>
              {/* <Col span={12}>已经处理<span className="m-alm-row-abnormal">2</span></Col> */}
            </Row>
              {/* <Row><Col span={12}>数据异常<span className="m-alm-row-processed">1</span></Col><Col span={12}>等待处理<span className="m-alm-row-pending">4</span></Col>
              </Row> */}
            </Col>
          </Row>
          <Table className="m-alm-div-table" size="small" loading={loading} columns={columns} dataSource={this.state.wardataSource} scroll={{ y: 280 }}
            rowKey={row => row.stcd}
            onRow={this.onClickRow}
          // pagination={pagination}
          />
          <Modal
            title="24小时水位详情"
            visible={this.state.visible}
            footer={null}
            onCancel={this.handleCancel}
            width={1300}
          >
            <Row>
              <Col span={12}><Card title="水位走势" bordered={false}>
                <div id="mainbywat" style={{ width: 600, height: 500 }}></div>
              </Card></Col>
              <Col span={12}><Card title="水位数据" bordered={false}>
                <Table
                  size="small"
                  loading={this.state.loading}
                  columns={swcolumnsById}
                  dataSource={this.state.dataSourceById}
                  scroll={{ y: 500 }}
                  rowKey={row => row.stcd}
                />
              </Card></Col>
            </Row>
          </Modal>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.setState({ loading: true });
    //获取警戒水位信息
    getWaterWarning({})
      .then((result) => {
        this.setState({ loading: false });
        this.setState({ wardataSource: result.data })
        this.setState({ wacount: result.data.length })
      })
  }
  locationClick(e) {
    let lon = e.lon * 1;
    let lat = e.lat * 1;
    if (lon == null && lat == null) return;
    emitter.emit("map-move", [lon, lat], () => { console.log("moveend"); });
  }
}
export default AlarmTable;