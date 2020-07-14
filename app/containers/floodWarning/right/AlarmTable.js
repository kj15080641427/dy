/**
 * AlarmTable 2020-05-12
 * zdl
 * 警戒站
 */
import React from 'react';
import "./style.scss";
import { Table, Popover, Radio, Modal, Button, Card, Row, Col } from 'antd';
import emitter from "@app/utils/emitter.js";
import localimgURL from '../../../resource/local.png';
import imgURL from '../../../resource/title_bg.png';
import warningImg from '../../../resource/warning.svg';
import { getWaterHistory, getWaterWarning } from "@app/data/request";
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts';
import WeatherDy from './WeatherDy';

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
      weatherWar: false,
      waterWar: true
    };
  }
  //模态框
  showModal = (value) => {
    this.setState({
      visible: true,
      mloading: true
    });
    this.setState({ mloading: true });
    let starttm = moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYY-MM-DD HH:mm:ss")
    let endtm = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss")
    getWaterHistory({
      "stcd": value.stcd,
      "starttm": starttm,
      "endtm": endtm,
      "current": 1,
      "size": 10000
    })
      .then((result) => {
        this.setState({
          mloading: false,
        })
        let xdata = []
        let ydata = []
        var myChart = echarts.init(document.getElementById('mainbywat'));
        if (result.data.length !== 0) {
          console.log(result)
          for (var i = result.data.records.length - 1; i >= 0; i--) {
            xdata.push(result.data.records[i].tm)
            ydata.push((result.data.records[i].z * 1).toFixed(2))
          }
          this.setState({
            dataSourceById: result.data.records,
          })

          myChart.setOption({
            title: {
              text: value.stnm + "-警戒站24小时水位变化",
              subtext: starttm + '至' + endtm,
              // left: 'center',
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
              name: '超警戒水位(m)',
            },
            visualMap: {
              show: false,
              pieces: [
                {
                  gt: value.baselevel > 0 ? -value.baselevel : value.baselevel,
                  lte: value.baselevel,          //这儿设置基线上下颜色区分 基线下面为绿色
                  color: '#03d6d6'
                }, {
                  gt: value.baselevel,          //这儿设置基线上下颜色区分 基线上面为红色
                  color: '#e91642',
                  lte: value.warning,
                }
              ]
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
                      formatter: "预警" + value.baselevel + "m",
                    },
                    yAxis: value.baselevel,
                  }
                ]
              }
            },],
          });
        } else {

          myChart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {// 坐标轴指示器，坐标轴触发有效
                type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
              }
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
            title: {
              text: "暂无数据",
              subtext: '暂无数据',
            },
            xAxis: {
              type: 'category',
              data: [],
              name: '时间',
            },
            yAxis: {
              type: 'value',
              name: '水位(m)'
            },
            series: [{
              data: [],
              type: 'line',
            }]
          })
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
      // {
      //   title: '警戒水位(m)',
      //   dataIndex: 'warning',
      //   className: 'column-money',
      // },
      {
        title: '当前水位(m)',
        dataIndex: 'z',
        className: 'column-money'
      },
      {
        title: '更新时间',
        dataIndex: 'tm',
        width: 140,
        className: 'column-money',
        render: (value, key) => moment(value).format("YYYY-MM-DD HH:mm")
      },
    ];
    const onChange = (e) => {
      console.log(`radio checked:${e.target.value}`);
      if (e.target.value === "a") {
        this.setState({
          waterWar: true
        })
      } else {
        this.setState({
          waterWar: false
        })
      }
    }
    const { loading } = this.state;
    return (
      <div className="m-alm-tableflood">
        <img className="m-alm-img" src={imgURL} alt="" /><div className="m-alm-divflood">
          <Row className="m-alm-row">
            <Col span={4}><img className="m-alm-warningImg" src={warningImg}></img></Col>
            <Col span={10}>
              <Row><Col span={12}>{this.state.waterWar ? <>超警戒水位<span className="m-alm-row-warning">{this.state.wacount}</span></> : <span>气象预警<span className="m-alm-row-warning"></span></span>}</Col>
                {/* <Col span={12}>已经处理<span className="m-alm-row-abnormal">2</span></Col> */}

              </Row>
              {/* <Row><Col span={12}>数据异常<span className="m-alm-row-processed">1</span></Col><Col span={12}>等待处理<span className="m-alm-row-pending">4</span></Col>
              </Row> */}

            </Col>
            <Col span={10}>
              <Radio.Group onChange={onChange} defaultValue="a" style={{
                position: 'relative',
                top: 10,
              }}>
                {/* <Radio.Button value="a">水位告警</Radio.Button>
                <Radio.Button value="b">气象预警</Radio.Button> */}
              </Radio.Group></Col>
          </Row>
          {this.state.waterWar ? <Table className="m-alm-div-table" size="small" loading={loading} columns={columns} dataSource={this.state.wardataSource} scroll={{ y: 370 }}
            rowKey={row => row.stcd}
            onRow={this.onClickRow}
          // pagination={pagination}
          /> : <WeatherDy></WeatherDy>}
          <Modal
            title="24小时水位详情"
            visible={this.state.visible}
            footer={null}
            onCancel={this.handleCancel}
            width={1300}
          >
            <Row>
              <Col span={12}>
                <div id="mainbywat" style={{ width: 600, height: 500 }}></div>
              </Col>
              <Col span={12}>
                <Table
                  size="small"
                  loading={this.state.mloading}
                  columns={swcolumnsById}
                  dataSource={this.state.dataSourceById}
                  scroll={{ y: 400 }}
                  rowKey={row => row.stcd}
                />
              </Col>
            </Row>
          </Modal>
        </div>
      </div>
    );
  }
  selectInit() {
    this.setState({ loading: true });
    //获取警戒水位信息
    getWaterWarning({})
      .then((result) => {
        console.log(result.data)
        // console.log(moment(new Date()).format("DD"))
        this.setState({ loading: false });
        let arr = []
        for (let i = 0; i < result.data.length; i++) {
          // if (moment(result.data[i].alarmtime).format("YYYY-MM-DD") === moment(new Date()).format("YYYY-MM-DD")) {
          arr.push(result.data[i])
          // }
        }
        this.setState({ wardataSource: arr })
        this.setState({ wacount: arr.length })
      })
  }
  componentDidMount() {
    this.selectInit()
    window.setInterval(() => {
      this.selectInit()
    }, 1000 * 5 * 60)
  }
  locationClick(e) {
    let lon = e.lon * 1;
    let lat = e.lat * 1;
    if (lon == null && lat == null) return;
    emitter.emit("map-move", [lon, lat], () => { console.log("moveend"); });
  }
}
export default AlarmTable;