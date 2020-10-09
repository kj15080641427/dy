import React from "react";
import { Input, DatePicker } from "antd";
const { TextArea } = Input;
export const expertForm = [
  {
    label: "任务内容",
    name: "content",
    rules: [{ required: true }],
    ele: <TextArea />,
  },
];
export const taskListform = [
  {
    label: "事件名称",
    name: "name",
    rules: [{ required: true }],
    ele: <Input />,
  },
  {
    label: "发生时间",
    name: "happenTime",
    ele: <DatePicker showTime />,
  },
  {
    label: "区域位置",
    name: "address",
    // rules: [{ required: true }],
    ele: <Input />,
  },
  {
    label: "上报人",
    name: "reportPersonName",
    ele: <Input />,
  },
  {
    label: "电话",
    name: "reportPersonPhone",
    ele: <Input />,
  },
  {
    label: "事件描述",
    name: "remark",
    rules: [{ required: true }],
    ele: <TextArea autoSize={{ minRows: 6, maxRows: 10 }} />,
  },
];
