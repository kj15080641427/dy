/**
 * WeatherChart 2020-05-12
 */
import React from 'react';
import "./style.scss";
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts';
import moment from 'moment';
import imgURL from '../../../resource/title_bg.png';
import { getFiveCitydata } from "@app/data/request";
import { DatePicker } from 'antd';


const areaMap = {
  "370502": '东营区\n(开发区)',
  '370503': '河口区\n(东营港)',
  '370521': '垦利区',
  '370522': '利津县',
  '370523': '广饶县\n(省农高区)',
  '370500': '东营市'
}
class WeatherChart extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      timeIsShow: 'none'
    };
    this.selectInit = this.selectInit.bind(this)
  }
  render() {
    const { RangePicker } = DatePicker;
    function onOk(value) {

    }

    function onChange(value, dateString) {

      getFiveCitydata(
        {
          "startTime": moment(value[0]).format("YYYY-MM-DD HH:00:00"),
          "endTime": moment(value[1]).format("YYYY-MM-DD HH:00:00")
        }
      ).then((result) => {
        console.log(result)
        var myChart = echarts.init(document.getElementById('main'));
        let setData = [];
        for (var i = result.data.length - 1; i >= 0; i--) {
          setData.push((result.data[i].prd * 1).toFixed(1))
        }
        myChart.setOption({
          series: [
            {
              name: '自定义',
              data: setData,
              label: {
                show: true,
                position: 'top'
              },
            },

          ]
        })

      })
    }
    return (
      <div className="m-wth-chart">
        <img className="m-chart-img" src={imgURL} alt="" />
        <div className="m-chart-dev">
          <RangePicker size="small" className="time-select" format="YYYY-MM-DD HH" showTime={{ format: 'HH' }}
            // style={{ display: this.state.timeIsShow }}
            onChange={onChange}
            onOk={onOk}
            format="YYYY-MM-DD HH" />
          <div id="main" className="m-chart-table">

          </div>
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
          let areaName = areaMap[result.data[i].areaId]
          addData.push(areaName);
        }
        let _this = this;
        myChart.on('legendselectchanged', function (obj) {
          var selected = obj.selected;
          var legend = obj.name;

          if (selected.自定义) {
            _this.setState({
              timeIsShow: 'block'
            })
          }else{
            _this.setState({
              timeIsShow: 'none'
            })
          }
          console.log(obj)
        })
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
            x: '6px',
            y: '30px',
            data: ['1小时', '24小时', '近三天', '近一周', '近一年以来', '自定义'],
            selected: {
              '1小时': false,
              '24小时': false,
              '近三天': true,
              '近一周': false,
              '近一年以来': false,
              '自定义': false ? console.log(false) : console.log(true),
            }
          },
          grid: {
            top: '25%',
            left: '3%',
            right: '0%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              // position: 'top',
              type: 'category',
              data: addData,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                show: true,
                textStyle: {  //更改坐标轴文字颜色
                  fontSize: 11      //更改坐标轴文字大小
                }
              },
            }
          ],
          yAxis: [
            {
              axisLabel: {
                formatter: '{value}'
              },
              // inverse: true,
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
                position: 'top'

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
            },
            {
              name: '自定义',
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
                    position: 'top'
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
                    position: 'top'

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