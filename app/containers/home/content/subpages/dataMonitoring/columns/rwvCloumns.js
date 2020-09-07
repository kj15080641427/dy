import React from "react";
import { Input } from "antd";
import moment from "moment";
//水位
export const water = [
  {
    title: "站名",
    dataIndex: "name",
    ellipsis: true,
    render: (value) => value || "-",
  },
  {
    title: "数据来源",
    dataIndex: "dataSourceDesc",
    render: (value) => value || "-",
  },
  {
    title: "地址",
    ellipsis: true,
    dataIndex: "address",
    render: (value) => value || "-",
  },
  {
    title: "流域",
    ellipsis: true,
    dataIndex: "flowarea",
    render: (value) => value || "-",
  },
  {
    title: "河流名称",
    ellipsis: true,
    dataIndex: "rivername",
    render: (value) => value || "-",
  },
  {
    title: "纬度",
    dataIndex: "lat",
    render: (value) => value || "-",
  },
  {
    title: "经度",
    dataIndex: "lon",
    render: (value) => value || "-",
  },
  {
    title: "水位(m)",
    dataIndex: "riverwaterdataList",
    className: "column-money",
    render: (value) => {
      return value && value[0] ? value[0].z.toFixed(2) : "-";
    },
    // sorter: (a, b) => a.z - b.z,
  },
  {
    title: "警戒水位(m)",
    dataIndex: "siteWaterLevels",
    className: "column-money",
    render: (value) => {
      return value && value[0] ? (value[0].warning * 1).toFixed(2) : "-";
    },
    // sorter: (a, b) => a.warning - b.warning,
  },
  {
    title: "更新时间",
    dataIndex: "riverwaterdataList",
    className: "column-money",
    render: (value) =>
      value && value[0] ? moment(value[0]?.tm).format("YYYY-MM-DD HH:mm") : "-",
  },
  {
    title: "更新状态",
    dataIndex: "riverwaterdataList",
    className: "column-money",
    render: (value) => {
      if (value && value[0]) {
        let startdata = new Date().getTime();
        let date = new Date(value[0].tm).getTime();
        if (startdata - date >= 1000 * 60 * 60 * 24 * 3) {
          return <a style={{ color: "orange" }}>三天前</a>;
        } else {
          return <a>最近更新</a>;
        }
      } else {
        return <a>离线</a>;
      }
    },
  },
];
export const rowSelect = [
  { label: "站点名称", name: "name", element: <Input></Input> },
];

//雨量
export const rain = [
  {
    title: "站名",
    dataIndex: "name",
    ellipsis: true,
    className: "column-money",
    key: "riverwaterdataID",
    render: (value) => value || "-",
  },
  {
    title: "数据来源",
    width: 110,
    dataIndex: "dataSourceDesc",
    render: (value) => value || "-",
  },
  {
    title: "地址",
    ellipsis: true,
    dataIndex: "address",
    render: (value) => value || "-",
  },
  {
    title: "流域名称",
    dataIndex: "siteRain",
    render: (value) => {
      return value && value[0] ? value[0].bsnm : "-";
    },
  },
  {
    title: "河流名称",
    dataIndex: "siteRain",
    render: (value) => {
      return value && value[0] ? value[0].rvnm : "-";
    },
  },
  {
    title: "纬度",
    dataIndex: "lat",
    render: (value) => value || "-",
  },
  {
    title: "经度",
    dataIndex: "lon",
    render: (value) => value || "-",
  },
  {
    title: "雨量(mm)",
    dataIndex: "raindataList",
    width: 140,
    className: "column-money",
    render: (value) => {
      return value && value[0] ? value[0].drp.toFixed(2) : "-";
    },
  },
  {
    title: "更新时间",
    dataIndex: "raindataList",
    width: 160,
    className: "column-money",
    render: (value) =>
      value && value[0] ? moment(value[0]?.tm).format("YYYY-MM-DD HH:mm") : "-",
  },
  {
    title: "更新状态",
    dataIndex: "raindataList",
    width: 160,
    className: "column-money",
    render: (value) => {
      if (value && value[0]) {
        let startdata = new Date().getTime();
        let date = new Date(value[0]?.tm).getTime();
        if (startdata - date >= 1000 * 60 * 60 * 24 * 3) {
          return <a>三天前</a>;
        } else {
          return <a>最近更新</a>;
        }
      } else {
        return <a>离线</a>;
      }
    },
  },
];

export const flood = [
  {
    title: "站名",
    dataIndex: "name",
    // width: 80,
    className: "column-money",
    ellipsis: true,
    key: "riverwaterdataID",
    render: (value) => (value === null ? "-" : value),
  },
  {
    title: "数据来源",
    ellipsis: true,
    dataIndex: "dataSourceDesc",
    render: (value) => (value === null ? "-" : value),
  },
  {
    title: "地址",
    dataIndex: "address",
    ellipsis: true,
    render: (value) => (value === null ? "-" : value),
  },
  {
    title: "纬度",
    dataIndex: "lat",
    render: (value) => (value === null ? "-" : value),
  },
  {
    title: "经度",
    dataIndex: "lon",
    render: (value) => (value === null ? "-" : value),
  },
  {
    title: "水深(m)",
    dataIndex: "minuteAvg",
    width: 120,
    className: "column-money",
    render: (minuteAvg) =>
      minuteAvg == "-" ? "-" : (minuteAvg * 1).toFixed(1),
    sorter: (a, b) => a.minuteAvg - b.minuteAvg,
  },
  {
    title: "更新时间",
    dataIndex: "ztm",
    className: "column-money",
    sorter: (a, b) => new Date(b.ztm).getTime() - new Date(a.ztm).getTime(),
    render: (value) =>
      !value ? "-" : moment(value).format("YYYY-MM-DD HH:mm"),
  },
  {
    title: "更新状态",
    dataIndex: "ztm",
    width: 160,
    className: "column-money",
    render: (value) => {
      let startdata = new Date().getTime();
      let date = new Date(value).getTime();
      if (!value) {
        return <a style={{ color: "red" }}>离线</a>;
      } else if (startdata - date >= 1000 * 60 * 60 * 24 * 3) {
        return <a style={{ color: "orange" }}>三天前</a>;
      } else {
        return <a>最近更新</a>;
      }
    },
  },
];
