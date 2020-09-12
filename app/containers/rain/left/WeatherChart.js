/**
 * WeatherChart 2020-05-12
 */
import React from "react";
import "./style.scss";
// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";
import "echarts";
import moment from "moment";
import imgURL from "../../../resource/title_bg.png";
import { getFiveCitydata } from "@app/data/request";
import { DatePicker, Radio, Button, Row } from "antd";
import WeatherDy from "../right/WeatherDy";

const areaMap = {
  370502: "东营区\n(开发区)",
  370503: "河口区\n(东营港)",
  370521: "垦利区",
  370522: "利津县",
  370523: "广饶县\n(省农高区)",
  370500: "东营市",
};
class WeatherChart extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      weathershow: true,
      weatherstyle: "black",
    };
    this.selectInit = this.selectInit.bind(this);
    this.btnClick = this.btnClick.bind(this);
  }
  btnClick = () => {
    this.setState({
      weathershow: !this.state.weathershow,
      // weatherstyle: this.state.weathershow ? 'black' : 'none'
    });
    // console.log(this.state.weatherstyle)
  };
  render() {
    const { RangePicker } = DatePicker;

    function onChange(value, dateString) {
      getFiveCitydata({
        startTime: moment(value[0]).format("YYYY-MM-DD HH:00:00"),
        endTime: moment(value[1]).format("YYYY-MM-DD HH:00:00"),
      }).then((result) => {
        console.log(result);
        var myChart = echarts.init(document.getElementById("main"));
        let setData = [];
        for (var i = result.data.length - 1; i >= 0; i--) {
          setData.push((result.data[i].prd * 1).toFixed(1));
        }
        myChart.setOption({
          legend: {
            selected: {
              "1小时": false,
              "24小时": false,
              近三天: false,
              近一周: false,
              今年以来: false,
              自定义: true,
            },
          },
          series: [
            {
              name: "自定义",
              data: setData,
              label: {
                show: true,
                position: "top",
              },
            },
          ],
        });
      });
    }
    return (
      <div className="m-wth-chart-rain">
        <img className="m-chart-img" src={imgURL} alt="" />
        {/* <Radio.Group onChange={this.btnClick}>
          <Radio.Button size="small" value="a">县区降雨</Radio.Button>
          <Radio.Button size="small" value="b">气象预警</Radio.Button>
        </Radio.Group> */}
        <div className="m-chart-dev-rain">
          {this.state.weathershow ? (
            <>
              <Row className="time-select">
                <span style={{ color: "white" }}>时间选择:</span>&nbsp;{" "}
                <RangePicker
                  size="small"
                  format="YYYY-MM-DD HH"
                  showTime={{ format: "HH" }}
                  // allowClear={false}
                  bordered={false}
                  suffixIcon={null}
                  onChange={onChange}
                  format="YYYY-MM-DD HH"
                />
              </Row>
              <div id="main" className="m-chart-table-rain"></div>
            </>
          ) : (
            <WeatherDy></WeatherDy>
          )}
        </div>
      </div>
    );
  }

  selectInit() {
    getFiveCitydata({ type: 1 }).then((result) => {
      let hourData = [];
      let towData = [];
      let dayData = [];
      let thDayData = [];
      let seDayData = [];
      let addData = [];
      let yearData = [];

      var myChart = echarts.init(document.getElementById("main"));
      for (var i = result.data.length - 1; i >= 0; i--) {
        hourData.push((result.data[i].prd * 1).toFixed(1));
        let areaName = areaMap[result.data[i].areaId];
        addData.push({ value: areaName, textStyle: { color: "white" } });
      }
      myChart.setOption({
        // color:["#c23531","#99CCFF","#FFFF66","#666666",],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        title: {
          text: "县区降雨量(单位mm)",
          left: "center",
          textStyle: {
            color: "#007ed7",
            fontStyle: "normal",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            fontSize: "18",
          },
        },
        legend: {
          textStyle: { color: "white" },
          right: "center",
          x: "10px",
          y: "30px",
          data: ["1小时", "12小时", "24小时", "近三天", "今年以来", "自定义"],
          selectedMode: "single",
          selected: {
            "1小时": false,
            "12小时": false,
            "24小时": true,
            近三天: false,
            今年以来: false,
            自定义: false,
          },
        },
        grid: {
          top: "25%",
          left: "3%",
          right: "0%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            // position: 'top',
            type: "category",
            data: addData,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              show: true,
              textStyle: {
                //更改坐标轴文字颜色
                fontSize: 11, //更改坐标轴文字大小
              },
            },
          },
        ],
        yAxis: [
          {
            axisLabel: {
              formatter: "{value}",
            },
            // inverse: true,
            type: "value",
          },
          // {
          //   type: 'value',
          //   name: 'mm',
          //   inverse: true,
          // }
        ],
        series: [
          {
            name: "1小时",
            type: "bar",
            barWidth: "50%",
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
              position: "top",
            },
          },
          {
            name: "12小时",
            type: "bar",
            barWidth: "50%",
            data: towData,
          },
          {
            name: "24小时",
            type: "bar",
            barWidth: "50%",
            data: dayData,
          },
          {
            name: "近三天",
            type: "bar",
            barWidth: "50%",
          },
          // {
          //   name: '近一周',
          //   type: 'bar',
          //   barWidth: '50%',

          // },
          {
            name: "今年以来",
            type: "bar",
            barWidth: "50%",
          },
          {
            name: "自定义",
            type: "bar",
            barWidth: "50%",
          },
        ],
      });
      //12小时
      getFiveCitydata({
        startTime: moment(new Date().getTime() - 12 * 60 * 60 * 1000).format(
          "YYYY-MM-DD HH:00:00"
        ),
        endTime: moment(new Date().getTime()).format("YYYY-MM-DD HH:00:00"),
      }).then((result) => {
        for (var i = result.data.length - 1; i >= 0; i--) {
          towData.push((result.data[i].prd * 1).toFixed(1));
        }
        myChart.setOption({
          series: [
            {
              name: "12小时",
              data: towData,
              label: {
                show: true,
                position: "top",
              },
            },
          ],
        });
      });
      getFiveCitydata({ type: 2 }).then((result) => {
        for (var i = result.data.length - 1; i >= 0; i--) {
          dayData.push((result.data[i].prd * 1).toFixed(1));
        }
        myChart.setOption({
          series: [
            {
              name: "24小时",
              data: dayData,
              label: {
                show: true,
                position: "top",
              },
            },
          ],
        });
      });
      getFiveCitydata({ type: 3 }).then((result) => {
        for (var i = result.data.length - 1; i >= 0; i--) {
          thDayData.push((result.data[i].prd * 1).toFixed(1));
        }
        myChart.setOption({
          series: [
            {
              name: "近三天",
              data: thDayData,
              label: {
                show: true,
                position: "top",
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
          ],
        });
      });
      // getFiveCitydata({ "type": 4 })
      //   .then((result) => {
      //     for (var i = result.data.length - 1; i >= 0; i--) {
      //       seDayData.push((result.data[i].prd * 1).toFixed(1))
      //     }
      //     myChart.setOption({
      //       series: [
      //         {
      //           name: '近一周',
      //           data: seDayData,
      //           label: {
      //             show: true,
      //             position: 'top'

      //           },
      //         },
      //       ]
      //     })
      //   });
      getFiveCitydata({ type: 5 }).then((result) => {
        for (var i = result.data.length - 1; i >= 0; i--) {
          yearData.push((result.data[i].prd * 1).toFixed(1));
        }
        myChart.setOption({
          series: [
            {
              name: "今年以来",
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
                position: "top",
              },
            },
          ],
        });
      });
    });
  }
  //初始化数据
  componentDidMount() {
    this.selectInit();
    this.init = window.setInterval(() => {
      this.selectInit();
    }, 1000 * 5 * 60);
  }
  componentWillUnmount() {
    clearTimeout(this.init);
  }
}
export default WeatherChart;
