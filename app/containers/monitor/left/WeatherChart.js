/**
 * WeatherChart 2020-05-12
 */
import React from 'react';
import "./style.scss";
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts';
import imgURL from '../../../resource/title_bg.png';
import { getFiveCitydata } from "@app/data/request";
class WeatherChart extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }
  render() {
    return (
      <div className="m-wth-chart">
        <img className="m-chart-img" src={imgURL} alt="" />
        <div className="m-chart-dev">
          <div id="main" className="m-chart-table"></div>
        </div>
      </div>
    );
  }
  selectInit() {

    getFiveCitydata({ "type": 1 })
      .then((result) => {
        let hourData = [];
        let dayData = [];
        let thDayData = [];
        let seDayData = [];
        let addData = [];
        let yearData = [];
        var myChart = echarts.init(document.getElementById('main'));
        for (var i = result.data.length - 1; i >= 0; i--) {
          hourData.push((result.data[i].prd * 1).toFixed(1))
          addData.push(result.data[i].areaName)
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
            text: '区县降雨量',
            left: 'center',
            textStyle: {
              color: '#007ed7',
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
              fontSize: '18'
            },
          },
          legend: {
            right: 'center',
            x: '60px',
            y: '30px',
            data: ['1小时', '24小时', '近三天', '近一周', '近一年以来'],
            selected: {
              '1小时': false,
              '24小时': false,
              '近三天': true,
              '近一周': false,
              '近一年以来': false
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              position: 'top',
              type: 'category',
              data: addData,
              axisTick: {
                alignWithLabel: true
              },
            }
          ],
          yAxis: [
            {
              axisLabel: {
                formatter: '{value} mm'
              },
              inverse: true,
              type: 'value',
            },
            // {
            //   type: 'value',
            //   name: 'mm',
            //   inverse: true,
            // }

          ],
          series: [

            {
              name: '1小时',
              type: 'bar',
              barWidth: '15%',
              data: hourData == 0 ? null : hourData,
              // markPoint: {
              //   data: [
              //     {
              //       type: 'max',
              //       label: {
              //         show: hourData,
              //         // position: 'top'
              //       },
              //       symbolSize: 1,
              //     },
              //     // {
              //     //   type: 'min', name: '最小值', itemStyle: {
              //     //     color: '#03d6d6'
              //     //   }
              //     // }
              //   ],

              // },
              label: {
                show: true,
                position: 'bottom'

              },
            },
            {
              name: '24小时',
              type: 'bar',
              barWidth: '15%',
              data: dayData,
            },
            {
              name: '近三天',
              type: 'bar',
              barWidth: '15%',
            },
            {
              name: '近一周',
              type: 'bar',
              barWidth: '15%',

            },
            {
              name: '近一年以来',
              type: 'bar',
              barWidth: '15%',
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
                    position: 'bottom'

                  },
                  // markPoint: {
                  //   data: [
                  //     {
                  //       type: 'max',
                  //       name: '最大值',
                  //       label: {
                  //         show: true,
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
                    position: 'bottom'

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
                    position: 'bottom'

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
                    position: 'bottom'

                  },
                },
              ]
            })
          });
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
export default WeatherChart;