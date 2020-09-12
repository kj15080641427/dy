import React, { useEffect } from "react";
import echarts from "echarts/lib/echarts";
import "echarts";
//柱状图
export const barChart = (domId, legend, online, line) => {
  let myChartcount = echarts.init(document.getElementById(domId));
  myChartcount.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "line", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      data: legend,
      left: "center",
      top: "10",
      textStyle: {
        color: "white",
      },
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: {
          show: true,
          type: ["pie", "funnel"],
        },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    // grid: {
    //   left: "center",
    // },
    xAxis: [
      {
        type: "category",
        data: ["东营县", "广饶县", "利津县", "河口区", "垦利区"],
        splitNumber: 0,
        maxInterval: 0,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "white",
          fontSize: 18,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        show: false,
      },
    ],
    series: [
      {
        name: "在线",
        type: "bar",
        stack: "广告",
        data: online,
        barWidth: 25,
        label: {
          show: true,
          position: "inside",
        },
        itemStyle: {
          color: "red",
        },
      },
      {
        name: "不在线",
        type: "bar",
        stack: "广告",
        data: line,
        barWidth: 25,
        label: {
          show: true,
          position: "inside",
        },
        itemStyle: {
          color: "#8c8c8c",
        },
      },
    ],
  });
};
export const radarChart = (domId, legend, data) => {
  let myChartcount = echarts.init(document.getElementById(domId));
  let option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      left: "center",
      data: ["今日累计报警", "本周累计报警", "本月累计报警"],
    },
    radar: [
      {
        indicator: [
          { text: "星期一", max: 100, color: "rgb(0,175,255)" },
          { text: "星期二", max: 100, color: "#1890ff" },
          { text: "星期三", max: 100, color: "#1890ff" },
          { text: "星期四", max: 100, color: "#1890ff" },
          { text: "星期五", max: 100, color: "#1890ff" },
          { text: "星期六", max: 100, color: "#1890ff" },
          { text: "星期天", max: 100, color: "#1890ff" },
        ],
        center: ["50%", "50%"],
        radius: 90,
        startAngle: 100,
        axisLabel: {
          //连线图背景
          color: "red",
          backgroundColor: "red",
        },
        axisLine: false, //显示坐标
        splitArea: {
          show: false, //是否显示分隔区域。
        },
        splitLine: {
          //线
          show: true,
          lineStyle: {
            color: "#1890ff",
          },
        },
      },
    ],
    series: [
      {
        type: "radar",
        tooltip: {
          trigger: "item",
        },
        areaStyle: {
          color: "red",
          opacity: 0.2,
        },
        data: [
          {
            value: [60, 73, 85, 40, 22, 77, 45],
            name: "报警统计",
          },
        ],
      },
    ],
  };
  myChartcount.setOption(option);
};
export const pieChart = (domId, data, width, legend) => {
  let myChartcount = echarts.init(document.getElementById(domId));
  let option = {
    tooltip: {},
    legend: {
      data: legend ? legend : [],
      textStyle: {
        color: "white",
      },
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: ["50%", "55%"],
        data: data,
        left: "center",
        width: width || 330,

        // itemStyle: {
        //   color: "red",
        // },
      },
    ],
  };
  myChartcount.setOption(option);
};
export const lineChart = (domId) => {
  let myChartcount = echarts.init(document.getElementById(domId));
  let option = {
    xAxis: {
      type: "category",
      show: true,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "white",
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "white",
      },
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      width: 350,
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
      },
    ],
  };
  myChartcount.setOption(option);
};

//
export const rotateBarChart = (domId) => {
  let myChartcount = echarts.init(document.getElementById(domId));
  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: [],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      inverse: true,
      show: true,
    },
    yAxis: {
      position: "right",
      splitLine: {
        show: false,
      },
      show: true,
      type: "category",
      data: [
        { value: "无雨(0)", textStyle: { color: "white" } },
        { value: "小雨(0-10)", textStyle: { color: "white" } },
        { value: "中雨(10-25)", textStyle: { color: "white" } },
        { value: "大雨(25-50)", textStyle: { color: "white" } },
        { value: "暴雨(50-100)", textStyle: { color: "white" } },
        { value: "大暴雨(100-250)", textStyle: { color: "white" } },
        { value: "特大暴雨(>250)", textStyle: { color: "white" } },
        { value: "短历时强降雨", textStyle: { color: "white" } },
      ],
    },
    series: [
      {
        name: "2011年",
        type: "bar",
        data: [
          { value: 188, itemStyle: { color: "rgb(229,229,229)" } },
          { value: 181, itemStyle: { color: "rgb(175,233,159)" } },
          { value: 181, itemStyle: { color: "rgb(91,175,51)" } },
          { value: 181, itemStyle: { color: "rgb(121,190,255)" } },
          { value: 181, itemStyle: { color: "rgb(57,53,255)" } },
          { value: 181, itemStyle: { color: "rgb(228,41,255)" } },
          { value: 181, itemStyle: { color: "rgb(123,42,51)" } },
          { value: 181, itemStyle: { color: "rgb(228,41,50)" } },
        ],
      },
    ],
  };
  myChartcount.setOption(option);
};
const Chart = () => {
  useEffect(() => {
    barChart("chartlint");
    radarChart("source");
  }, []);
  return (
    <>
      <div className="barChart">
        <div className="echarts-count" id="chartlint"></div>
        <div />
        <div className="radar">
          <div className="echarts-count" id="source"></div>
        </div>
      </div>
    </>
  );
};
export default Chart;
