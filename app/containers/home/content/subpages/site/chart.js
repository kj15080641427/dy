import React, { useEffect } from "react";
import echarts from "echarts/lib/echarts";
import { Table } from "antd";
import "echarts";
import "./chart.scss";
const { Column, ColumnGroup } = Table;
// import charttest from "../dataMonitoring/echarts";
//柱状图
export const chart1 = (domId, title) => {
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
      data: ["不在线", "在线"],
      left: "center",
      top: "bottom",
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
    grid: {
      // left: "3%",
      // right: "4%",
      // bottom: "3%",
      width: 300,
      height: 200,
      containLabel: true,
      center: ["10", "200"],
    },
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
        data: [120, 132, 101, 134, 90, 230, 210],
        barWidth: 15,
        center: ["10", "200"],
        label: {
          show: true,
          position: "inside",
        },
      },
      {
        name: "不在线",
        type: "bar",
        stack: "广告",
        data: [0, 182, 191, 234, 290, 330, 310],
        barWidth: 15,
        label: {
          show: true,
          position: "inside",
        },
      },
    ],
  });
};
export const chart2 = (domId) => {
  let myChartcount = echarts.init(document.getElementById(domId));
  let option = {
    title: {
      text: "预警统计",
    },
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
          { text: "星期一", max: 100, color: "blue" },
          { text: "星期二", max: 100, color: "blue" },
          { text: "星期三", max: 100, color: "blue" },
          { text: "星期四", max: 100, color: "blue" },
          { text: "星期五", max: 100, color: "blue" },
          { text: "星期六", max: 100, color: "blue" },
          { text: "星期天", max: 100, color: "blue" },
        ],
        center: ["200", "200"],
        radius: 130,
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
            color: "blue",
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
        // label: {
        //   show: true,
        //   position: "inside",
        //   color: "red",
        // },
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
export const chart3 = (domId) => {
  let myChartcount = echarts.init(document.getElementById(domId));
  let option = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: ["40%", "55%"],

        data: [
          { value: 335, name: "直达" },
          { value: 310, name: "邮件营销" },
          { value: 234, name: "联盟广告" },
          { value: 135, name: "视频广告" },
          { value: 1048, name: "百度" },
          { value: 251, name: "谷歌" },
          { value: 147, name: "必应" },
          { value: 102, name: "其他" },
        ],
        left: -100,
      },
    ],
  };
  myChartcount.setOption(option);
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: "nice",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: "loser",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: "cool",
  },
];
const columnslist = [
  {
    name: "站点名称",
    dataIndex: "name",
  },
  {
    name: "警戒水位",
    dataIndex: "age",
  },
  {
    name: "站点水位",
    dataIndex: "address",
  },
  {
    name: "更新时间",
    dataIndex: "tags",
  },
];
export const TableShow = (columns, dataSource) => {
  return (
    <Table
      size="small"
      dataSource={dataSource}
      className="set-table-style"
      onRow={() => {
        return {
          onMouseEnter: () => console.log("???"),
        };
      }}
    >
      {columns.map((item) => {
        return (
          <Column
            title={item.name}
            dataIndex={item.dataIndex}
            key={item.dataIndex}
            className="table-background"
          />
        );
      })}
    </Table>
  );
};
const Chart = () => {
  useEffect(() => {
    // chart1("chartlint");
    // chart2("source");
    // chart3("chartlint");
  }, []);
  return (
    <>
      <Table
        size="small"
        dataSource={data}
        className="set-table-style"
        onRow={() => {
          return {
            onMouseEnter: () => console.log("???"),
          };
        }}
      >
        {columnslist.map((item) => {
          return (
            <Column
              title={item.name}
              dataIndex={item.dataIndex}
              key={item.dataIndex}
              className="table-background"
            />
          );
        })}
      </Table>
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
