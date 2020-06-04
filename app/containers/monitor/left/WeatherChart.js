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
      address: []
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
  componentDidMount() {

    getFiveCitydata({ "type": 1 })
      .then((result) => {
        let hourData = [];
        let dayData = [];
        let thDayData = [];
        let seDayData = [];
        let addData = [];
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
            text: '区县降水量',
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
            x: '100px',
            y: '30px',
            data: ['1小时', '24小时', '近三天', '近一周'],
            selected: {
              '1小时': true,
              '24小时': true,
              '近三天': true,
              '近一周': true
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
            }
          ],
          series: [

            {
              name: '1小时',
              type: 'bar',
              barWidth: '20%',
              data: hourData,
              markPoint: {
                data: [
                  {
                    type: 'max',
                    label: {
                      show: true,
                      // position: 'top'
                    },
                    symbolSize: 1,
                  },
                  // {
                  //   type: 'min', name: '最小值', itemStyle: {
                  //     color: '#03d6d6'
                  //   }
                  // }
                ],

              },
            },
            {
              name: '24小时',
              type: 'bar',
              barWidth: '20%',
              data: dayData,
              markPoint: {
                data: [
                  {

                    type: 'max', name: '最大值',
                    label: {
                      show: true,
                      position: 'left'
                    },
                    symbolSize: 1,
                  }
                ],

              },
            },
            {
              name: '近三天',
              type: 'bar',
              barWidth: '20%',
              markPoint: {
                data: [
                  {
                    type: 'max', name: '最大值',
                    label: {
                      show: true,
                      // position: 'Right'
                    },
                    symbolSize: 1,
                  }
                ],

              },
            },
            {
              name: '近一周',
              type: 'bar',
              barWidth: '20%',
              markPoint: {
                data: [
                  {
                    type: 'max', name: '最大值',
                    label: {
                      show: true,
                      position: 'bottom'
                    },
                    symbolSize: 1,
                  }
                ],

              },
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
                },
              ]
            })
          });

      })

  }
}
export default WeatherChart;