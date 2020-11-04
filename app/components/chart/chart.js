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
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        shadowStyle: {
          color: "rgba(0, 51, 102, 0.5)",
        },
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
      show: false,
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
        data: ["东营区", "广饶县", "利津县", "河口区", "垦利区"],
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
          color: "rgba(33,115,111,1)",
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
          color: "rgba(128,110,98,1)",
        },
      },
    ],
  });
};
export const radarChart = (domId, data) => {
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
          { text: "今天", max: 80, color: "rgba(0,153,255,1)" },
          { text: "一天前", max: 80, color: "rgba(0,153,255,1)" },
          { text: "两天前", max: 80, color: "rgba(0,153,255,1)" },
          { text: "三天前", max: 80, color: "rgba(0,153,255,1)" },
          { text: "四天前", max: 80, color: "rgba(0,153,255,1)" },
          { text: "五天前", max: 80, color: "rgba(0,153,255,1)" },
          { text: "六天前", max: 80, color: "rgba(0,153,255,1)" },
        ],
        center: ["50%", "50%"],
        radius: 60,
        startAngle: 90,
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
            value: data,
            name: "报警统计",
          },
        ],
      },
    ],
  };
  myChartcount.setOption(option);
};
export const pieChart = (domId, data, width, legend, title) => {
  let myChartcount = echarts.init(document.getElementById(domId));
  let option = {
    title,
    tooltip: {
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      data: legend ? legend : [],
      bottom: 10,
      textStyle: {
        color: "white",
      },
    },
    grid: {
      left: "center",
    },
    series: [
      {
        clockwise: false,
        startAngle: 140,
        name: "",
        type: "pie",
        radius: ["50%", "65%"],
        data: data,
        left: "center",
        width: width || 400,
        labelLine: {
          // show: false,
          lineStyle: {
            color: "white",
          },
        },
        label: {
          fontSize: "16",
          width: "30px",
          color: "white",
          formatter: "{b}: {@2012}",
        },
      },
    ],
  };
  myChartcount.setOption(option);
};
export const taskChart = (domId, data, width, legend, title) => {
  let myChartcount = echarts.init(document.getElementById(domId));
  let option = {
    title,
    tooltip: {
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      data: legend ? legend : [],
      bottom: 10,
      textStyle: {
        color: "white",
      },
    },
    grid: {
      left: "center",
    },
    series: [
      {
        clockwise: false,
        startAngle: 140,
        name: "",
        type: "pie",
        radius: ["50%", "65%"],
        data: data,
        left: "center",
        width: width || 400,
        labelLine: {
          // show: false,
          lineStyle: {
            color: "white",
          },
        },
        label: {
          fontSize: "16",
          width: "30px",
          color: "white",
          show: false,
          // position: "inside",
          formatter: "{b}: {@2012}",
        },
      },
    ],
  };
  myChartcount.setOption(option);
};
export const lineChart = (domId, data, width, warningline) => {
  let myChartcount = echarts.init(document.getElementById(domId));
  const time = [
    "00:00",
    "02:00",
    "04:00",
    "06:00",
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
    "22:00",
    "24:00",
  ];
  const warning = time?.map(() => warningline);
  let option = {
    xAxis: {
      type: "category",
      show: true,
      data: time,
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "white",
        interval: 0,
        rotate: 40,
        fontSize: "15",
      },
    },
    yAxis: {
      min: 10,
      name: "积水(cm)",
      nameTextStyle: {
        color: "white",
        fontSize: "18",
      },
      axisLabel: {
        color: "white",
        fontSize: "15",
      },
      max: "dataMax",
      type: "value",
      axisLine: {
        color: "green",
      },
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      width: width || 400,
    },
    series: [
      {
        data: data || [],
        type: "line",
        color: "rgb(30,182,107)",
        markPoint: {
          data: [
            { type: "max", name: "最大值" },
            // {
            //   type: "min",
            //   name: "最小值",
            //   itemStyle: {
            //     color: "#03d6d6",
            //   },
            // },
          ],
        },
      },
      // { data: warningline == -0.1 ? warning : null, type: "line" },
    ],
  };
  myChartcount.setOption(option);
};

//
export const rotateBarChart = (domId, data, width, height) => {
  let myChartcount = echarts.init(document.getElementById(domId));
  let fontSize = 15;
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.filter((d) => d.value > 0).map((d) => d.value));
  let reduceNum = Math.floor(max / 15);
  if (reduceNum >= min) {
    reduceNum = min - 1;
  }
  if (reduceNum == 0) {
    reduceNum = max / 10;
  }
  data.map((d) => {
    if (d.value == 0) {
      d.value = reduceNum;
      d.reduceFlag = true;
    }
  });
  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: (params) => {
        if (params[0].data.reduceFlag) {
          return 0;
        } else {
          return params[0].value;
        }
      },
    },
    legend: {
      data: [],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "3",
      containLabel: true,
      width: width || 300,
      height: height,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      inverse: true,
      show: false,
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      position: "right",
      splitLine: {
        show: false,
      },

      show: true,
      type: "category",
      data: [
        // { value: "无雨(0)", textStyle: { color: "white", fontSize: fontSize } },
        {
          value: "小雨(0-10)",
          textStyle: { color: "white", fontSize: fontSize },
        },
        {
          value: "中雨(10-25)",
          textStyle: { color: "white", fontSize: fontSize },
        },
        {
          value: "大雨(25-50)",
          textStyle: { color: "white", fontSize: fontSize },
        },
        {
          value: "暴雨(50-100)",
          textStyle: { color: "white", fontSize: fontSize },
        },
        {
          value: "大暴雨(100-250)",
          textStyle: { color: "white", fontSize: fontSize },
        },
        {
          value: "特大暴雨(>250)",
          textStyle: { color: "white", fontSize: fontSize },
        },
        // {
        //   value: "短历时强降雨",
        //   textStyle: { color: "white", fontSize: fontSize },
        // },
      ],
    },
    series: [
      {
        name: "24小时降雨",
        type: "bar",
        label: {
          show: true,
          position: "left",
          color: "white",
          formatter: (params) => {
            if (params.data.reduceFlag) {
              return 0;
            } else {
              return params.value;
            }
          },
        },
        width: width || 300,
        height: height,
        data: data || [],
      },
    ],
  };
  myChartcount.setOption(option);
};

export const easyfloodRain = (domId, data) => {
  let myChartcount = echarts.init(document.getElementById(domId));
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.filter((d) => d.value > 0).map((d) => d.value));
  let reduceNum = Math.floor(max / 15);
  if (reduceNum >= min) {
    reduceNum = min - 1;
  }
  data.map((d) => {
    if (d.value == 0) {
      d.value = reduceNum;
      d.reduceFlag = true;
    }
  });
  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "5%",
      top: "8%",
      containLabel: true,
    },
    xAxis: {
      show: false,
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      axisLabel: { color: "white", fontSize: "15" },
      axisLine: { show: false },
      axisTick: { show: false },
      position: "left",
      type: "category",
      data: [
        { value: "无雨(0)" },
        {
          value: "小雨(0-10)",
        },
        {
          value: "中雨(10-25)",
        },
        {
          value: "大雨(25-50)",
        },
        {
          value: "暴雨(50-100)",
        },
        {
          value: "大暴雨(100-250)",
        },
        {
          value: "特大暴雨(>250)",
        },
      ],
    },
    series: [
      {
        label: {
          show: true,
          position: "right",
          color: "white",
          formatter: (params) => {
            if (params.data.reduceFlag) {
              return 0;
            } else {
              return params.value;
            }
          },
        },
        name: "积水",
        type: "bar",
        data: data,
      },
    ],
  };
  myChartcount.setOption(option);
};
export const funnelChart = (domId, data) => {
  let myChartcount = echarts.init(document.getElementById(domId));
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.filter((d) => d.value > 0).map((d) => d.value));
  let reduceNum = Math.floor(max / 15);
  if (reduceNum >= min) {
    reduceNum = min - 1;
  }
  data.map((d) => {
    if (d.value == 0) {
      d.value = reduceNum;
      d.reduceFlag = true;
    }
  });
  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "5%",
      top: "10%",
      containLabel: true,
    },
    xAxis: {
      show: false,
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      axisLabel: { color: "white", fontSize: "15" },
      axisLine: { show: false },
      axisTick: { show: false },
      position: "left",
      type: "category",
      data: [
        "0cm 无积水",
        "0-10cm",
        "10-20cm",
        "20-30cm",
        "30-40cm",
        "40cm以上",
      ],
    },
    series: [
      {
        label: {
          show: true,
          position: "right",
          color: "white",
          formatter: (params) => {
            if (params.data.reduceFlag) {
              return 0;
            } else {
              return params.value;
            }
          },
        },
        name: "积水",
        type: "bar",
        data: data,
      },
    ],
  };
  myChartcount.setOption(option);
};
//24小时折线图
export const showChart = (data, id, yd, yname) => {
  let xdata = [];
  let ydata = [];
  var myChart = echarts.init(document.getElementById(id));
  data.forEach((item) => {
    xdata.push(item.tm);
    yd ? ydata.push(item[yd]) : ydata.push(item.z);
  });
  myChart.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    toolbox: {
      show: true,
      feature: {
        // dataView: { show: true, readOnly: true },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: {
      type: "category",
      data: xdata.length ? xdata : [],
      name: "",
      axisLabel: {
        color: "white",
        fontSize: 16,
      },
      axisLine: {
        lineStyle: {
          color: "white",
        },
      },
    },
    yAxis: {
      min: 1,
      type: "value",
      name: yname ? yname : "水位（m）",
      axisLabel: {
        color: "white",
        fontSize: 16,
      },
      axisLine: {
        lineStyle: {
          color: "white",
        },
      },
    },
    legend: {
      right: "center",
      x: "0px",
      y: "0px",
      data: ["1小时降水", "24小时降水"],
    },
    // grid: {
    //   width: 250,
    //   height: 250,
    // },
    series: [
      {
        // name: '1小时降水',
        data: ydata.length ? ydata : [],
        type: "line",
        markPoint: {
          data: [
            {
              type: "max",
              name: "最高",
              label: { show: true, formatter: "{b}{c}" },
            },
          ],
        },
        lineStyle: {
          color: "rgb(27,184,108)", //改变折线颜色
        },
      },
    ],
  });
};

export const showChartRiver = (data, id) => {
  let xdata = [];
  let ydata = [];
  var myChart = echarts.init(document.getElementById(id));
  data.forEach((item) => {
    // item.stnm = `${item.stnm.slice(0, 2)}\n${item.stnm.slice(
    //   2,
    //   4
    // )}\n${item.stnm.slice(4, 33)}`;
    xdata.push(item.stnm);
    ydata.push(item.z);
  });
  myChart.setOption({
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        // name: "站点",
        type: "category",
        data: xdata,
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: "white",
          },
        },
        axisLabel: {
          rotate: 50,
        },
      },
    ],
    yAxis: [
      {
        name: "水位(m)",
        barWidth: 25,
        type: "value",
        axisLine: {
          lineStyle: {
            color: "white",
          },
        },
      },
    ],
    series: [
      {
        name: "站点",
        type: "line",
        data: ydata,
        lineStyle: {
          color: "rgb(27,184,108)", //改变折线颜色
        },
      },
    ],
  });
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
