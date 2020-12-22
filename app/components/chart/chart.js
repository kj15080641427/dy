import echarts from "echarts/lib/echarts";
import "echarts";
const iconColor = "#0099ff";
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
      },
      iconStyle: {
        borderColor: iconColor,
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
        radius: ["70%", "85%"],
        data: data,
        left: "center",
        labelLine: {
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
export const taskChart = (domId, data, title, width, legend) => {
  let myChartcount = echarts.init(document.getElementById(domId));
  let option = {
    title: {
      text: title,
      left: "center",
      top: "center",
      textStyle: { color: "white", fontWeight: "200", fontSize: 14 },
    },
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
      width: "190px",
    },
    series: [
      {
        clockwise: false,
        startAngle: 140,
        name: "",
        type: "pie",
        radius: ["20%", "26%"],
        data: data,
        left: "center",
        width: width || 400,
        labelLine: {
          length: 0,
          show: true,
          lineStyle: {
            color: "white",
          },
        },
        label: {
          fontSize: "16",
          width: "30px",
          color: "white",
          show: true,
          position: "outside",
          rotate: -40,
          formatter: "{b}: {@2012}",
        },
      },
    ],
  };
  myChartcount.setOption(option);
};

export const rotateBarChart = (domId, data, width, height) => {
  let myChartcount = echarts.init(document.getElementById(domId));
  let fontSize = 15;
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
        {
          value: "小雨(0-10mm)",
          textStyle: { color: "white", fontSize: fontSize },
        },
        {
          value: "中雨(10-25mm)",
          textStyle: { color: "white", fontSize: fontSize },
        },
        {
          value: "大雨(25-50mm)",
          textStyle: { color: "white", fontSize: fontSize },
        },
        {
          value: "暴雨(50-100mm)",
          textStyle: { color: "white", fontSize: fontSize },
        },
        {
          value: "大暴雨(100-250mm)",
          textStyle: { color: "white", fontSize: fontSize },
        },
        {
          value: "特大暴雨(>250mm)",
          textStyle: { color: "white", fontSize: fontSize },
        },
      ],
    },
    series: [
      {
        barMinHeight: 4,
        name: "站点数",
        type: "bar",
        label: {
          show: true,
          position: "left",
          color: "white",
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
        {
          value: "小雨(0-10mm)",
        },
        {
          value: "中雨(10-25mm)",
        },
        {
          value: "大雨(25-50mm)",
        },
        {
          value: "暴雨(50-100mm)",
        },
        {
          value: "大暴雨(100-250mm)",
        },
        {
          value: "特大暴雨(>250mm)",
        },
      ],
    },
    series: [
      {
        label: {
          show: true,
          position: "right",
          color: "white",
        },
        name: "站点数",
        type: "bar",
        barMinHeight: 4,
        data: data,
      },
    ],
  };
  myChartcount.setOption(option);
};
export const funnelChart = (domId, data) => {
  let myChartcount = echarts.init(document.getElementById(domId));
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
      data: ["0-10cm", "10-20cm", "20-30cm", "30-40cm", "40cm以上"],
    },
    series: [
      {
        label: {
          show: true,
          position: "right",
          color: "white",
        },
        barMinHeight: 4,
        name: "站点数",
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
    grid: {
      show: true,
      borderColor: "white",
      right: "4%",
    },
    toolbox: {
      show: true,
      feature: {
        // dataView: { show: true, readOnly: true },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        // saveAsImage: { show: true },
      },
      iconStyle: {
        borderColor: iconColor,
      },
    },
    xAxis: {
      boundaryGap: false,
      type: "category",
      data: xdata.length ? xdata : [],
      name: "",
      axisLabel: {
        color: "white",
        fontSize: 14,
        // showMaxLabel: true,
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
        formatter: (v) => {
          return Number(v).toFixed(1);
        },
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
    series: [
      {
        data: ydata.length ? ydata : [],
        type: "line",
        symbolSize: 0,
        markPoint: {
          data: [
            {
              type: "max",
              name: "最高",
              label: { show: true, formatter: "{b}\n{c}" },
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

//模型
export const modelChart = (data, id, yname, xvalue, yvalue) => {
  let xdata = [];
  let ydata = [];
  var myChart = echarts.init(document.getElementById(id));
  data.forEach((item) => {
    xdata.push(item[xvalue].split(" ")[1].slice(0, -3));
    ydata.push(item[yvalue]);
  });
  myChart.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      show: true,
      borderColor: "white",
      right: "3%",
    },
    toolbox: {
      show: true,
      feature: {
        // dataView: { show: true, readOnly: true },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        // saveAsImage: { show: true },
      },
      iconStyle: {
        borderColor: iconColor,
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
        formatter: (v) => {
          return Number(v).toFixed(1);
        },
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
              label: { show: true, formatter: "{b}\n{c}" },
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
//模型
export const modelBarChart = (data, id, yname, xvalue, yvalue) => {
  let xdata = [];
  let ydata = [];
  var myChart = echarts.init(document.getElementById(id));
  data.forEach((item) => {
    xdata.push(item[xvalue].split(" ")[1].slice(0, -3));
    ydata.push(Number(item[yvalue]).toFixed(2));
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
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        // saveAsImage: { show: true },
      },
      iconStyle: {
        borderColor: iconColor,
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
    grid: {
      show: true,
      borderColor: "white",
      right: "3%",
    },
    yAxis: {
      min: 1,
      type: "value",
      name: yname ? yname : "水位（m）",
      axisLabel: {
        color: "white",
        fontSize: 16,
        showMinLabel: true,
        showMaxLabel: true,
        formatter: (v) => {
          return Number(v).toFixed(1);
        },
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
    series: [
      {
        data: ydata.length ? ydata : [],
        type: "bar",
        lineStyle: {
          color: "rgb(27,184,108)", //改变折线颜色
        },
      },
    ],
  });
};
//河流水位
export const showChartRiver = (data, id) => {
  let xdata = [];
  let ydata = [];
  var myChart = echarts.init(document.getElementById(id));
  data.forEach((item) => {
    xdata.push(item.name);
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
      right: "3%",
      bottom: "3%",
      containLabel: true,
      show: true,
      borderColor: "white",
    },
    toolbox: {
      show: true,
      feature: {
        // dataView: { show: true, readOnly: true },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        // saveAsImage: { show: true },
      },
      iconStyle: {
        borderColor: iconColor,
      },
    },
    xAxis: [
      {
        boundaryGap: false,
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
        axisLabel: {
          color: "white",
          fontSize: 16,
          formatter: (v) => {
            return Number(v).toFixed(1);
          },
        },
      },
    ],
    series: [
      {
        symbolSize: 0,
        name: "水位",
        type: "line",
        data: ydata,
        lineStyle: {
          color: "rgb(27,184,108)", //改变折线颜色
        },
      },
    ],
  });
};
