import React from "react";
import BaseLayout from "../connectComponents";
import ReadOnlyTable from "../readOnlyTable";
import { Input, Radio, Select, InputNumber } from "antd";
import {
  getSiteWaterPonit,
  delSiteWaterPonit,
  addSiteWaterPonit,
  updSiteWaterPonit,
} from "@app/data/home";
const formItem = [
  {
    label: "名称",
    name: "name",
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
    label: "站址",
    name: "stlc",
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
    label: "站点编码",
    name: "stcd",
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
    label: "行政区划码",
    name: "addvcd",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "警戒值",
    name: "warning",
    ele: <Input></Input>,
  },
  {
    label: "管理机构",
    name: "admauth",
    ele: <Input></Input>,
  },
  {
    label: "流域名称",
    name: "bsnm",
    ele: <Input></Input>,
  },
  {
    label: "至河口距离",
    name: "distancetoport",
    ele: <Input></Input>,
  },
  {
    label: "积水面积",
    name: "drna",
    ele: <Input></Input>,
  },

  {
    label: "测站岸别",
    name: "stbk",
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
    title: "站址",
    dataIndex: "stlc",
  },
  {
    title: "站点别名",
    dataIndex: "aliasName",
  },
  {
    title: "站点编码",
    dataIndex: "stcd",
  },
];
const rowSelect = [{ label: "名称", name: "name", element: <Input></Input> }];

class SiteWaterPoint extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <BaseLayout
          get={getSiteWaterPonit} // 分页查询接口
          add={addSiteWaterPonit} // 添加数据接口
          upd={updSiteWaterPonit} // 更新数据接口
          del={delSiteWaterPonit} // 删除数据接口
          keyId={"siteWaterPointID"} // 数据的唯一ID
          storeKey={"siteWaterPoint"} // store中的key值. 要与 mapStatetoProps 中的key相同
          columns={columns} // 表格配置项
          formItem={formItem} // 表单配置项
          rowSelect={rowSelect}
        ></BaseLayout>
      </>
    );
  }
}

export default SiteWaterPoint;
export const ReadonlyWaterPoint = () => {
  return (
    <ReadOnlyTable
      get={getSiteWaterPonit}
      columns={columns}
      rowSelect={rowSelect}
      rowKey={"siteWaterPointID"}
    />
  );
};
