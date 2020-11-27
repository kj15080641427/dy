/**
 * Expert 2020-06-04
 * zdl
 * 专家库
 */
import React from "react";
import ReadOnlyTable from "../readOnlyTable";
import { getFloodControlExpertAll } from "@app/data/home";
import { Input, Select } from "antd";
const { Option } = Select;
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    className: "column-money",
  },
  {
    title: "性别",
    dataIndex: "sex",
    className: "column-money",
    render: (sex) => (sex === "1" ? "男" : "女"),
  },
  {
    title: "专业特长",
    dataIndex: "major",
    className: "column-money",
    width: 300,
  },
  {
    title: "熟悉流域（河道）",
    dataIndex: "field",
    className: "column-money",
    fixed: "left",
  },
  {
    title: "工作单位",
    dataIndex: "unit",
    className: "column-money",
  },
  {
    title: "专家电话",
    dataIndex: "phone",
    className: "column-money",
  },
  {
    title: "状态",
    dataIndex: "state",
    className: "column-money",
    render: (state) => (state === "0" ? "显示" : "不显示"),
  },
  {
    title: "类型",
    dataIndex: "type",
    className: "column-money",
    render: (type) =>
      type === "1"
        ? "市级专家"
        : type === "2"
        ? "区县专家"
        : type === "3"
        ? "乡镇专家"
        : "未知",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    className: "column-money",
    width: 170,
    render: (createTime) => (createTime === null ? "暂无数据" : createTime),
  },
];
const rowSelect = [
  { label: "专家名称", name: "name", element: <Input></Input> },
  { label: "电话", name: "phone", element: <Input></Input> },
  {
    label: "类型",
    name: "type",
    element: (
      <Select size="large" style={{ width: 200 }} defaultValue={0}>
        <Option value={0}>所有</Option>
        <Option value={1}>市级专家</Option>
        <Option value={2}>区县专家</Option>
        <Option value={3}>乡镇专家</Option>
      </Select>
    ),
  },
];

const Expert = (props) => (
  <ReadOnlyTable
    getAll
    rowSelection={props.rowSelection}
    get={getFloodControlExpertAll}
    columns={columns}
    rowSelect={rowSelect}
    rowKey="floodControlExpertId"
  />
);

export default Expert;
