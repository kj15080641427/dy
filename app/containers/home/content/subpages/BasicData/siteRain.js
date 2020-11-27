import React from "react";
import BaseLayout from "../connectComponents";
import ReadOnlyTable from "../readOnlyTable";

import { Input, Select, Radio, InputNumber } from "antd";
import {
  getSIteRainData,
  delSIteRainData,
  updateSIteRainData,
  addSIteRainData,
} from "@app/data/home";
import "../../../style.scss";

const formItem = [
  {
    label: "名称",
    name: "name",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "站点别名",
    name: "aliasName",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "经度",
    name: "lgtd",
    rules: [{ required: true }],
    ele: <InputNumber style={{ width: "200px" }}></InputNumber>,
  },
  {
    label: "纬度",
    name: "lttd",
    rules: [{ required: true }],
    ele: <InputNumber style={{ width: "200px" }}></InputNumber>,
  },
  {
    label: "地址",
    name: "stlc",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "河流名称",
    name: "rvnm",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "来源",
    name: "siteDictionariesID",
    rules: [{ required: true }],
    ele: (
      <Select>
        <Select.Option value={1}>水文局</Select.Option>
        <Select.Option value={2}>气象局</Select.Option>
        <Select.Option value={3}>水务局</Select.Option>
        <Select.Option value={4}>农村基层防汛监测预警平台</Select.Option>
        <Select.Option value={5}>河道</Select.Option>
        <Select.Option value={6}>河口区水利局</Select.Option>
        <Select.Option value={7}>水务局河道</Select.Option>
        <Select.Option value={22}>黄河东营境内水位站点</Select.Option>
        <Select.Option value={23}>人工录入</Select.Option>
        <Select.Option value={25}>经开区</Select.Option>
      </Select>
    ),
  },
  {
    label: "状态",
    name: "state",
    rules: [{ required: true }],
    ele: (
      <Radio.Group>
        <Radio value={0}>显示</Radio>
        <Radio value={1}>隐藏</Radio>
      </Radio.Group>
    ),
  },
  {
    label: "站点编码",
    name: "stcd",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "行政区划码",
    name: "addvcd",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "积水面积",
    name: "drna",
    ele: <Input></Input>,
  },
  {
    label: "流域名称",
    name: "bsnm",
    ele: <Input></Input>,
  },
  {
    label: "站类",
    name: "sttp",
    ele: <Input></Input>,
  },
];
// 表格配置
const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "地址",
    dataIndex: "stlc",
  },
  {
    title: "流域名称",
    dataIndex: "bsnm",
  },
  {
    title: "行政区划码",
    dataIndex: "addvcd",
  },
  // {
  //   title: "积水面积",
  //   dataIndex: "drna",
  // },
  {
    title: "河流名称",
    dataIndex: "rvnm",
  },
];

const rowSelect = [
  { label: "站点名称", name: "name", element: <Input></Input> },
];

class SiteRain extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <BaseLayout
          get={getSIteRainData} // 分页查询接口
          add={addSIteRainData} // 添加数据接口
          upd={updateSIteRainData} // 更新数据接口
          del={delSIteRainData} // 删除数据接口
          columns={columns} // 表格配置项
          formItem={formItem} // 表单配置项
          keyId={"siteRainID"} // 数据的唯一ID
          storeKey={"siteRain"} // store中的key值
          rowSelect={rowSelect}
        ></BaseLayout>
      </>
    );
  }
}

export default SiteRain;

export const ReadonlyRain = () => {
  return (
    <ReadOnlyTable
      get={getSIteRainData}
      columns={columns}
      rowSelect={rowSelect}
      rowKey={"siteRainID"}
    />
  );
};
