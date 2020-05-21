/**
 * WeatherChart 2020-05-12
 */
import React from 'react';
import "./style.scss";
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts';
import imgURL from '../../../resource/title_bg.png';

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
    var myChart = echarts.init(document.getElementById('main'));
    let hourData = [];
    let dayData = [];
    let thDayData = [];
    let seDayData = [];
    let addData = [];
    fetch("/api/count/getAreaAvgRaindata", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "type": 1 })
    })
      .then((response) => response.json())
      .then((result) => {
        for (var i = result.data.length - 1; i >= 0; i--) {
          if (result.data[i].prd.length > 5) {
            hourData.push(Math.round(result.data[i].prd * 100) / 100)
          }
          addData.push(result.data[i].areaName)
        }
        myChart.setOption({
          color: ['#fba02b'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {// 坐标轴指示器，坐标轴触发有效
              type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
            }
          },
          title: {
            text: '五个区县平均降雨量',
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
              '1小时': false,
              '24小时': true,
              '近三天': false,
              '近一周': false
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
              name: '单位(mm)',
              nameTextStyle: {
                color: '#007ed7',
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
              data: thDayData,
            },
            {
              name: '近一周',
              type: 'bar',
              barWidth: '20%',
              data: seDayData,
            }
          ]
        });
      })
    fetch("/api/count/getAreaAvgRaindata", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "type": 2 })
    })
      .then((response) => response.json())
      .then((result) => {
        for (var i = result.data.length - 1; i >= 0; i--) {
          if (result.data[i].prd.length > 5) {
            dayData.push(Math.round(result.data[i].prd * 100) / 100)
          }
        }
        console.log(dayData)
        myChart.setOption({
          series: [
            {
              name: '24小时',
              type: 'bar',
              barWidth: '20%',
              data: dayData,
              itemStyle: {
                normal: {
                }
              },
            }]
        })
      });
    fetch("/api/count/getAreaAvgRaindata", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "type": 3 })
    })
      .then((response) => response.json())
      .then((result) => {
        for (var i = result.data.length - 1; i >= 0; i--) {
          if (result.data[i].prd.length > 5) {
            thDayData.push(Math.round(result.data[i].prd * 100) / 100)
          }
        }
        console.log(thDayData)
        myChart.setOption({
          series: [
            {
              name: '近三天',
              type: 'bar',
              barWidth: '20%',
              data: thDayData,
              itemStyle: {
                normal: {
                }
              },
            }]
        })
      });
    fetch("/api/count/getAreaAvgRaindata", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "type": 4 })
    })
      .then((response) => response.json())
      .then((result) => {
        for (var i = result.data.length - 1; i >= 0; i--) {
          if (result.data[i].prd.length > 5) {
            seDayData.push(Math.round(result.data[i].prd * 100) / 100)
          }
        }
        console.log(seDayData)
        myChart.setOption({
          series: [
            {
              name: '近一周',
              type: 'bar',
              barWidth: '20%',
              data: seDayData,
              itemStyle: {
                normal: {
                }
              },
            }]
        })
      });
  }
}
export default WeatherChart;