import React from "react";
import { Input, DatePicker, Popover, Select } from "antd";
const { TextArea } = Input;
export const expertForm = [
  {
    label: "任务内容",
    name: "content",
    rules: [{ required: true }],
    ele: <TextArea />,
  },
  // {
  //   label: "概述",
  //   name: "explain",
  //   rules: [{ required: true }],
  //   ele: <TextArea />,
  // },
];
export const taskListform = [
  {
    label: "事件名称",
    name: "name",
    rules: [{ required: true }],
    ele: <Input />,
  },
  // {
  //   label: "发生时间",
  //   name: "happenTime",
  //   ele: <DatePicker showTime />,
  // },
  {
    label: "事件等级",
    name: "grade",
    rules: [{ required: true }],
    ele: (
      <Select>
        <Select.Option value={1}>一级</Select.Option>
        <Select.Option value={2}>二级</Select.Option>
        <Select.Option value={3}>三级</Select.Option>
      </Select>
    ),
  },
  {
    label: "事件类型",
    name: "stateRelationID",
    rules: [{ required: true }],
    ele: (
      <Select>
        <Select.Option value={26}>河流水位</Select.Option>
        <Select.Option value={27}>城市积水</Select.Option>
        <Select.Option value={28}>设备问题</Select.Option>
        <Select.Option value={29}>其他</Select.Option>
      </Select>
    ),
  },
  {
    label: "发生区域",
    name: "address",
    // rules: [{ required: true }],
    ele: <Input />,
  },
  {
    label: "联系人",
    name: "reportPersonName",
    ele: <Input />,
  },
  {
    label: "电话",
    name: "reportPersonPhone",
    ele: <Input />,
  },
  // {
  //   label: "经度",
  //   name: "lon",
  //   ele: <Input />,
  // },
  // {
  //   label: "纬度",
  //   name: "lat",
  //   ele: <Input />,
  // },
  {
    label: "事件描述",
    name: "remark",
    rules: [{ required: true }],
    ele: <TextArea autoSize={{ minRows: 6, maxRows: 10 }} />,
  },
];

const expertType = ["市级专家", "县级专家", "乡镇专家"];
export const expertColumns = [
  { title: "姓名", dataIndex: "name", width: "80px" },
  { title: "专家级别", dataIndex: "type", render: (e) => expertType[e - 1] },
  { title: "工作单位", dataIndex: "unit" },
  {
    title: "专业特长",
    dataIndex: "major",
    render: (name) => (
      <Popover content={name}>
        {name?.length > 11 ? name.toString().substring(0, 11) + "..." : name}
      </Popover>
    ),
  },
  { title: "熟悉流域", dataIndex: "field" },
  { title: "电话", dataIndex: "phone" },
];
const grade = ["队长", "副队长", "组长", "成员"];
export const userColumns = [
  { title: "姓名", dataIndex: "name" },
  { title: "年龄", dataIndex: "age" },
  { title: "工作单位", dataIndex: "unit" },
  { title: "等级", dataIndex: "grade", render: (e) => grade[e - 1] },
  { title: "备注", dataIndex: "remark" },
  { title: "电话", dataIndex: "phone" },
];
export const userTab2Columns = [
  { title: "姓名", dataIndex: "name" },
  { title: "等级", dataIndex: "grade", render: (e) => grade[e - 1] },
  { title: "工作单位", dataIndex: "unit" },
  { title: "备注", dataIndex: "remark" },
  { title: "电话", dataIndex: "phone" },
];
export const expertRadioList = [
  { label: "全部", value: "all" },
  { label: "市级专家", value: "city" },
  { label: "县级专家", value: "county" },
  { label: "乡镇专家", value: "town" },
];
export const userRadioList = [
  { label: "市级", value: "city" },
  { label: "东营区", value: "dy" },
  { label: "垦利区", value: "kl" },
  { label: "利津县", value: "jl" },
  { label: "河口区", value: "hk" },
  { label: "广饶县", value: "gr" },
];
//物资
export const materialColumns = [
  { title: "物品名称", dataIndex: "name" },
  { title: "仓库数量", dataIndex: "saveTotal" },
  { title: "单位", dataIndex: "company" },
  { title: "规格", dataIndex: "spec" },
  { title: "负责人", dataIndex: "remark" },
  { title: "电话", dataIndex: "phone" },
  { title: "调派数量", dataIndex: "phone" },
];
export const materialWarehouse = {
  32: "市水务局防汛仓库",
  33: "东营区防汛仓库",
  34: "垦利区防汛仓库",
  35: "河口区防汛仓库",
  36: "利津县防汛仓库",
  37: "广饶县防汛仓库",
};
const stateImg = ["未处理", "处理中", "已处理", "已终止"];
export const materiaTab2lColumns = [
  {
    title: "调派时间",
    dataIndex: "createTime",
  },
  { title: "操作人", dataIndex: "user" },
  {
    title: "物资种类",
    dataIndex: "taskMaterialListList",
    render: (row) => row?.length,
  },
  { title: "任务内容", dataIndex: "content" },
  {
    title: "任务状态",
    dataIndex: "state",
    width: "20%",
    render: (e) => stateImg[e],
  },
];
export const offTaskForm = [
  {
    label: "描述",
    name: "endRemark",
    rules: [{ required: true }],
    ele: <TextArea />,
  },
];
export const tableColumns = [
  { title: "发送时间", dataIndex: "time", width: "20%" },
  { title: "操作人", dataIndex: "operatorName", width: "15%" },
  {
    title: "发送人数",
    dataIndex: "personList",
    width: "15%",
    render: (e) => e.length,
  },
  {
    title: "信息内容",
    dataIndex: "content",
    render: (name) => (
      <Popover content={name}>
        {name?.length > 34 ? name.toString().substring(0, 34) + "..." : name}
      </Popover>
    ),
  },
];
