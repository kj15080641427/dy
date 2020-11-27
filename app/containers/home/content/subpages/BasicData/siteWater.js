import React from "react";
import { Input, Select, Radio, InputNumber } from "antd";
import BaseLayout from "../connectComponents";
import ReadOnlyTable from "../readOnlyTable";
import {
  getSiteWaterData,
  addSiteWaterData,
  deleteSiteWaterData,
  updateSiteWaterData,
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
    label: "别名",
    name: "aliasName",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "地址",
    name: "stlc",
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
    label: "警戒值",
    name: "warning",
    rules: [{ required: true }],
    ele: <InputNumber style={{ width: "200px" }}></InputNumber>,
  },
  {
    label: "距河口距离",
    name: "distancetoport",
    rules: [{ required: true }],
    ele: <InputNumber style={{ width: "200px" }}></InputNumber>,
  },

  {
    label: "行政区划码",
    name: "addvcd",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "流域名称",
    name: "bsnm",
    ele: <Input></Input>,
  },
  {
    label: "河流名称",
    name: "rvnm",
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
  {
    label: "管理机构",
    name: "admauth",
    ele: <Input></Input>,
  },
  // {
  //   label: "始报年月",
  //   name: "bgfrym",
  //   ele: <DatePicker format={"YYYY-MM-DD HH:mm:ss"}></DatePicker>,
  // },
  {
    label: "拍报段次",
    name: "dfrtms",
    ele: <Input></Input>,
  },

  {
    label: "积水面积",
    name: "drna",
    ele: <Input></Input>,
  },
  {
    label: "基层高层",
    name: "dtmel",
    ele: <Input></Input>,
  },
  {
    label: "基层名称",
    name: "dtmnm",
    ele: <Input></Input>,
  },
  // {
  //   label: "止报年月",
  //   name: "edfrym",
  //   ele: <DatePicker format={"YYYY-MM-DD HH:mm:ss"}></DatePicker>,
  // },
  {
    label: "防汛等级",
    name: "frgrd",
    ele: <Input></Input>,
  },
  {
    label: "拍报项目",
    name: "fritm",
    ele: <Input></Input>,
  },
  {
    label: "水系名称",
    name: "hnnm",
    ele: <Input></Input>,
  },
  {
    label: "修正基值",
    name: "mdbz",
    ele: <Input></Input>,
  },
  {
    label: "修正参数",
    name: "mdpr",
    ele: <Input></Input>,
  },

  {
    label: "拼音码",
    name: "phcd",
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
  {
    title: "警戒值",
    dataIndex: "warning",
  },
  {
    title: "河流名称",
    dataIndex: "rvnm",
  },
];

const rowSelect = [{ label: "名称", name: "name", element: <Input></Input> }];
class SiteWater extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <BaseLayout
          // formatList={["edfrym", "bgfrym"]}
          get={getSiteWaterData} // 分页查询接口
          add={addSiteWaterData} // 添加数据接口
          upd={updateSiteWaterData} // 更新数据接口
          del={deleteSiteWaterData} // 删除数据接口
          columns={columns} // 表格配置项
          formItem={formItem} // 表单配置项
          keyId={"siteWaterLevelsID"} // 数据的唯一ID
          storeKey={"siteWater"} // store中的key值
          rowSelect={rowSelect}
        ></BaseLayout>
      </>
    );
  }
}

export default SiteWater;
export const ReadonlyWater = () => {
  return (
    <ReadOnlyTable
      get={getSiteWaterData}
      columns={columns}
      rowSelect={rowSelect}
      rowKey={"siteWaterLevelsID"}
    />
  );
};
