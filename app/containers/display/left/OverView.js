/**
 * OverView 2020-07-06
 */
import React from 'react';
import "./style.scss";
import hl from "@app/resource/display/board/5-河流.svg"
import sk from "@app/resource/display/board/2-水库.svg"
import sz from "@app/resource/display/board/3-水闸.svg"
import symj from "@app/resource/display/board/1-市域面积.svg"
import jsl from "@app/resource/display/board/1-平均降雨量.svg"
import swz from "@app/resource/display/board/7-水位站.svg"
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts';
import { getFiveCitydata, getCityAvgRaindata } from "@app/data/request";
import { Row, Col } from 'antd';
const areaMap = {
  "370502": '东营区\n(开发区)',
  '370503': '河口区\n(东营港)',
  '370521': '垦利区',
  '370522': '利津县',
  '370523': '广饶县\n(省农高区)',
  '370500': '东营市'
}

class OverView extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      weatherCount: 0
    };
  }
  render() {
    return (
      <div className="dis-overview">
        <div className="dis-ov-board">
          <div className="dis-ov-board-top">
            <Row>
              <Col span={10}>
                <div className="dis-ov-board-left">
                  <div className="dis-ov-div-left">
                    <img className="dis-ov-img" src={jsl}></img>
                  </div>
                  <div className="dis-ov-div-right">
                    <Row className="dos-vo-div-row">
                      <span className="dis-ov-value">{this.state.weatherCount}</span><span className="dis-ov-unit1">mm</span></Row>
                    <Row><span className="dis-ov-text">全市日降水量</span></Row>
                    <div className="dis-ov-board-one"></div>
                  </div>
                </div>
              </Col>
              <Col span={7}>
                <div className="dis-ov-board-center">
                  <div className="dis-ov-div-left">
                    <img className="dis-ov-img-right" src={hl}></img>
                  </div>
                  <div className="dis-ov-div-right2">
                    <Row className="dos-vo-div-row2">
                      <span className="dis-ov-value2">40</span>
                      <span className="dis-ov-unit">条</span>
                    </Row>
                    <Row><span className="dis-ov-text2">全市河流数</span></Row>
                  </div>
                  <div className="dis-ov-board-tow"></div>
                </div>
              </Col>
              <Col span={7}>
                <div className="dis-ov-board-right">
                  <div className="dis-ov-div-left">
                    <img className="dis-ov-img-right" src={sk}></img>
                  </div>
                  <div className="dis-ov-div-right2">
                    <Row className="dos-vo-div-row2">
                      <span className="dis-ov-value3">14</span>
                      <span className="dis-ov-unit">座</span>
                    </Row>
                    <Row><span className="dis-ov-text2">大中型水库</span></Row>
                  </div>
                  <div className="dis-ov-board-three"></div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="dis-ov-board-bottm">
            <Row>
              <Col span={10}>
                <div className="dis-ov-board-left">
                  <div className="dis-ov-div-left">
                    <img className="dis-ov-img-right" src={symj}></img>
                  </div>
                  <div className="dis-ov-div-right">
                    <Row className="dos-vo-div-row">
                      <span className="dis-ov-value">100</span><span className="dis-ov-unit1">个</span></Row>
                    <Row><span className="dis-ov-text">全市易涝点</span></Row>
                    <div className="dis-ov-board-one" style={{ bottom: 10 }}></div>
                  </div>
                </div>
              </Col>
              <Col span={7}> <div className="dis-ov-board-center">
                <div className="dis-ov-div-left">
                  <img className="dis-ov-img-right" src={sz}></img>
                </div>
                <div className="dis-ov-div-right2">
                  <Row className="dos-vo-div-row2">
                    <span className="dis-ov-value2">109</span>
                    <span className="dis-ov-unit">座</span>
                  </Row>
                  <Row><span className="dis-ov-text2">全市泵站数</span></Row>
                </div>
                <div className="dis-ov-board-tow" style={{ bottom: 10 }}></div>
              </div></Col>
              <Col span={7}>
                <div className="dis-ov-board-right">
                  <div className="dis-ov-div-left">
                    <img className="dis-ov-img-right" src={swz}></img>
                  </div>
                  <div className="dis-ov-div-right2">
                    <Row className="dos-vo-div-row2">
                      <span className="dis-ov-value3">127</span>
                      <span className="dis-ov-unit">座</span>
                    </Row>
                    <Row><span className="dis-ov-text2">全市水位站</span></Row>
                  </div>
                  <div className="dis-ov-board-three" style={{ bottom: 10 }}></div>
                </div></Col>
            </Row>
          </div>
        </div>
        <div className="dis-ov-table">
          <div id="fivemain" style={{
            width: '100%',
            height: '90%'
          }}>
          </div>
        </div>
      </div>
    );
  }
  selectInit() {
    getFiveCitydata({ "type": 1 })
      .then((result) => {
        console.log(result)
        let hourData = [];
        let dayData = [];
        let thDayData = [];
        let seDayData = [];
        let addData = [];
        let yearData = [];
        var myChart = echarts.init(document.getElementById('fivemain'));
        for (var i = result.data.length - 1; i >= 0; i--) {
          hourData.push((result.data[i].prd * 1).toFixed(1))
          let areaName = areaMap[result.data[i].areaId]
          addData.push(areaName);

        }
        myChart.setOption({
          // color:["#c23531","#99CCFF","#FFFF66","#666666",],
          tooltip: {
            trigger: 'axis',
            axisPointer: {// 坐标轴指示器，坐标轴触发有效
              type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
            }
          },
          title: {
            text: '区县降雨量(单位:mm)',
            left: 'center',
            textStyle: {
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '30',
              fontStyle: "italic",
              lineHeight: 80,
            },
          },
          legend: {
            // itemWidth: 0,
            right: 'center',
            top: "12%",
            width: "100%",
            backgroundColor: "#01337C",
            borderRadius: [4, 4, 4, 4],
            itemGap: 60,
            padding: [10, 10, 10, 10],
            pageIconInactiveColor: "#01337C",
            data: ['1小时', '24小时', '近三天', '近一周', '近一年以来'],
            selected: {
              '1小时': false,
              '24小时': false,
              '近三天': true,
              '近一周': false,
              '近一年以来': false
            },
            textStyle: {
              color: "#00CFFE"
            }
          },
          grid: {
            top: "25%",
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
          },
          textStyle: {
            color: "#fff",
            fontSize: 20,
            // lineHeight: 80,
          },
          xAxis:
          {
            // position: 'top',
            type: 'category',
            data: addData,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',  //更改坐标轴文字颜色
                fontSize: 20      //更改坐标轴文字大小
              }
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#0099FF' //更改坐标轴颜色
              }
            }
          },


          yAxis:
          {
            axisLabel: {
              formatter: '{value}'
            },
            // inverse: true,
            // type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#0099FF',  //更改坐标轴文字颜色
                fontSize: 20      //更改坐标轴文字大小
              }
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#0099FF' //更改坐标轴颜色
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#0099FF"
              }
            }
          },
          // {
          //   type: 'value',
          //   name: 'mm',
          //   inverse: true,
          // }


          series: [
            {
              name: '1小时',
              type: 'bar',
              barWidth: '20%',
              data: hourData == 0 ? null : hourData,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#5614B0'
                  }, {
                    offset: 1,
                    color: '#DBD65C'
                  }]),
                }
              },
              label: {
                show: true,
                position: 'top'
              },
            },
            {
              name: '24小时',
              type: 'bar',
              barWidth: '20%',
              data: dayData,
            },
            {
              name: '近三天',
              type: 'bar',
              barWidth: '20%',
            },
            {
              name: '近一周',
              type: 'bar',
              barWidth: '20%',

            },
            {
              name: '近一年以来',
              type: 'bar',
              barWidth: '20%',
            }
          ]
        });
        getFiveCitydata({ "type": 2 })
          .then((result) => {
            for (var i = result.data.length - 1; i >= 0; i--) {
              dayData.push((result.data[i].prd * 1).toFixed(1))
            }
            myChart.setOption({
              series: [
                {
                  name: '24小时',
                  data: dayData,
                  label: {
                    show: true,
                    position: 'top'
                  },
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#6441A5'
                      }, {
                        offset: 1,
                        color: '#2E1437'
                      }]),
                    }
                  },
                },

              ]
            })
          });

        getFiveCitydata({ "type": 3 })
          .then((result) => {
            for (var i = result.data.length - 1; i >= 0; i--) {
              thDayData.push((result.data[i].prd * 1).toFixed(1))
            }
            myChart.setOption({
              series: [
                {
                  name: '近三天',
                  data: thDayData,
                  label: {
                    show: true,
                    position: 'top'
                  },
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#9E1CBE'
                      }, {
                        offset: 1,
                        color: '#02F2FE'
                      }]),
                    }
                  },
                  // markPoint: {
                  //   data: [
                  //     {
                  //       type: 'max', name: '最大值',
                  //       label: {
                  //         show: thDayData = 0 ? false : true,
                  //         // position: 'Right'
                  //       },
                  //       symbolSize: 1,
                  //     }
                  //   ],

                  // },
                },
              ]
            })
          });
        getFiveCitydata({ "type": 4 })
          .then((result) => {
            for (var i = result.data.length - 1; i >= 0; i--) {
              seDayData.push((result.data[i].prd * 1).toFixed(1))
            }
            myChart.setOption({
              series: [
                {
                  name: '近一周',
                  data: seDayData,
                  label: {
                    show: true,
                    position: 'top'

                  },
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#a8c0ff'
                      }, {
                        offset: 1,
                        color: '#3f2b96'
                      }]),
                    }
                  },
                  // markPoint: {
                  //   data: [
                  //     {
                  //       type: 'max', name: '最大值',
                  //       label: {
                  //         show: seDayData = 0 ? false : true,
                  //         position: 'bottom'
                  //       },
                  //       symbolSize: 1,
                  //     }
                  //   ],

                  // },
                },
              ]
            })
          });
        getFiveCitydata({ "type": 5 })
          .then((result) => {
            for (var i = result.data.length - 1; i >= 0; i--) {
              yearData.push((result.data[i].prd * 1).toFixed(1))
            }
            myChart.setOption({
              series: [
                {
                  name: '近一年以来',
                  data: yearData,
                  // markPoint: {
                  //   data: [
                  //     {
                  //       type: 'max', name: '最大值',
                  //       label: {
                  //         show: yearData = 0 ? false : true,
                  //         position: 'bottom'
                  //       },
                  //       symbolSize: 1,
                  //     }
                  //   ],
                  // },
                  label: {
                    show: true,
                    position: 'top'

                  },
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#D38312'
                      }, {
                        offset: 1,
                        color: '#A83279'
                      }]),
                    }
                  },
                },
              ]
            })
          });
      })
    getCityAvgRaindata({})
      .then((result) => {
        if (result.data.length > 5) {
          this.setState({ weatherCount: (result.data * 1).toFixed(1) })
        }
      })
  }
  //初始化数据
  componentDidMount() {
    this.selectInit()
    window.setInterval(() => {
      this.selectInit()
    }, 1000 * 5 * 60)
  }
}
export default OverView;