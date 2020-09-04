import React from "react";
import { Input } from "antd";
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
    label: "地址",
    name: "stlc",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "流域名称",
    name: "bsnm",
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
    label: "距河口距离",
    name: "distancetoport",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "河流名称",
    name: "rvnm",
    rules: [{ required: true }],
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
    title: "距河口距离",
    dataIndex: "distancetoport",
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