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
    this.state = {};
  }
  render() {
    var divStyle = {
      img: {
        top: '100px',
        width: '107px',
        height: '8px',
        top: '200px'
      },
      table: {
        width: '514px',
        height: '352px',
        border: '1px solid #007ed7',
        bottom: '6px'
      }
    };
    return (
      <div className="m-wth-chart">
        <img style={divStyle.img} src={imgURL} alt="" />
        <div style={divStyle.table} id="main"></div>
      </div>
    );
  }
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
      color: ['#fba02b'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
          fontSize: 18
        },
      },
      legend: {
        right: 'center',
        x: '100px',
        y: '30px',
        data: ['1小时', '24小时', '近三天', '近一周'],
        selected: {
          '24小时': false,
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
          data: ['河口区', '垦利区', '东营区', '利津区', '广饶县'],
          axisTick: {
            alignWithLabel: true
          },
        }
      ],
      yAxis: [
        {
          name: '单位(mm)',
          nameTextStyle: {
            padding: [-345, -670, 0, 0],// 四个数字分别为上右下左与原位置距离
            color:'#007ed7',
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
          data: [6, 10, 13, 6, 8],
          itemStyle: {
            normal: {
            }
          },
        },
        {
          name: '24小时',
          type: 'bar',
          barWidth: '20%',
          data: [60, 100, 130, 60, 80],
          itemStyle: {
            normal: {
            }
          },
        },
        {
          name: '近三天',
          type: 'bar',
          barWidth: '20%',
          data: [180, 300, 290, 555, 144],
          itemStyle: {
            normal: {
            }
          },
        },
        {
          name: '近一周',
          type: 'bar',
          barWidth: '20%',
          data: [500, 255, 252, 144, 777],
          itemStyle: {
            normal: {
            }
          },
        }
      ]
    });
  }
}
export default WeatherChart;