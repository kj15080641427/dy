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
      weathershow: false,
      weatherstyle: "black",
      timeList: ["1小时", "12小时", "24小时", "近三天", "今年以来", "自定义"],
      selectedTime: "24小时",
      cityData: "",
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
    const { hideBorder, color } = this.props;
    const onChange = (value, dateString) => {
      getFiveCitydata({
        startTime: moment(value[0]).format("YYYY-MM-DD HH:00:00"),
        endTime: moment(value[1]).format("YYYY-MM-DD HH:00:00"),
      }).then((result) => {
        var myChart = echarts.init(document.getElementById("main"));
        let setData = [];
        let c = result.data.pop();
        this.setState({
          cityData: Number(c.prd).toFixed(1),
        });
        console.log(this.state.cityData, "????");
        for (var i = result.data.length - 1; i >= 0; i--) {
          setData.unshift((result.data[i].prd * 1).toFixed(2));
        }
        myChart.setOption({
          title: {
            text: `全市平均降雨:${this.state.cityData}(mm)`,
            left: "center",
            top: "2px",
            bottom: "20px",
            textStyle: {
              color: "#0099ff",
              fontSize: "25",
              fontWeight: "bold",
            },
          },
          series: [
            {
              data: setData,
              label: {
                show: true,
                position: "top",
              },
            },
          ],
        });
      });
    };
    return (
      <div className="m-wth-chart-rain">
        <img className="m-chart-img" src={hideBorder ? "" : imgURL} alt="" />
        <div
          className="m-chart-dev-rain"
          style={{ border: hideBorder ? "0px" : "1px solid #007ed7" }}
        >
          <div className="time-selector">
            {this.state.timeList.map((tm, index) => (
              <label
                style={{ color: color ? color : "white" }}
                key={index}
                className={this.state.selectedTime === tm ? "active" : ""}
                onClick={() => {
                  this.setState(
                    { selectedTime: tm, weathershow: tm === "自定义" },
                    () => this.selectInit()
                  );
                }}
              >
                {tm}
              </label>
            ))}
          </div>
          {/* <Row className="time-select2">
            <div>东营市降雨:{this.state.cityData}</div>
          </Row> */}
          <Row
            className="time-select"
            style={{ display: this.state.weathershow ? "block" : "none" }}
          >
            <span style={{ color: "white" }}>时间选择:</span>&nbsp;{" "}
            <RangePicker
              size="small"
              format="YYYY-MM-DD HH"
              showTime={{ format: "HH" }}
              bordered={false}
              suffixIcon={null}
              onChange={onChange}
              className="whitePicker"
            />
          </Row>

          <div id="main" className="m-chart-table-rain"></div>
        </div>
      </div>
    );
  }

  async selectInit() {
    let params = null;
    switch (this.state.selectedTime) {
      case "1小时":
        params = { type: 1 };
        break;
      case "12小时":
        params = {
          startTime: moment(new Date().getTime() - 12 * 60 * 60 * 1000).format(
            "YYYY-MM-DD HH:00:00"
          ),
          endTime: moment(new Date().getTime()).format("YYYY-MM-DD HH:00:00"),
        };
        break;
      case "24小时":
        params = { type: 2 };
        break;
      case "近三天":
        params = { type: 3 };
        break;
      case "今年以来":
        params = { type: 5 };
        break;
      case "自定义":
        break;
      default:
        break;
    }
    let dataSource;
    if (params) {
      const { data } = await getFiveCitydata(params);
      let c = data.pop();
      this.setState({ cityData: Number(c.prd).toFixed(1) });

      data.map((d) => (d.value = Number(d.prd)));
      dataSource = data;
    }
    const myChart = echarts.init(document.getElementById("main"));
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
        text: `全市平均降雨:${this.state.cityData}(mm)`,
        left: "center",
        top: "2px",
        bottom: "20px",
        textStyle: {
          color: "#0099ff",
          fontSize: "25",
          fontWeight: "bold",
        },
      },
      grid: {
        top: this.state.selectedTime === "自定义" ? "100px" : "100px",
        left: "5%",
        right: "0%",
        containLabel: true,
        show: true,
        borderColor: "#00A0FD",
      },
      xAxis: {
        data: dataSource
          ? dataSource.map((ds) => ({
              value: ds.areaName.split("(").join("\n("),
            }))
          : [
              "东营区\n(开发区)",
              "河口区\n(东营港)",
              "垦利区",
              "利津县",
              "广饶县\n(省农高区)",
            ],
        axisLabel: {
          textStyle: {
            color: "#ffffff",
          },
        },
        axisLine: {
          lineStyle: {
            color: "#00A0FD",
          },
        },
      },
      yAxis: {
        min: 0,
        // boundaryGap: ["10%", "10%"],
        nameLocation: "end",
        name: "单位(mm)",
        nameTextStyle: {
          color: "white",
        },
        type: "value",
        axisLabel: {
          textStyle: {
            color: "white",
          },
          formatter: (v) => {
            return Number(v).toFixed(2);
          },
        },
        axisLine: {
          lineStyle: {
            color: "#00A0FD",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#00A0FD",
          },
        },
      },
      series: [
        {
          type: "bar",
          barWidth: "30%",
          label: {
            show: true,
            position: "top",
            color: "#ffffff",
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(156, 79, 245, 1)" },
              { offset: 0.5, color: "rgba(156, 79, 245, 0.5)" },
              { offset: 1, color: "rgba(156, 79, 245, 0.1)" },
            ]),
          },
          data: dataSource ? dataSource.map((ds) => ds.value.toFixed(1)) : [],
        },
      ],
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
