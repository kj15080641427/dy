import React from "react";
import BaseLayout from "../connectComponents";
import ReadOnlyTable from "../readOnlyTable";
import { Input } from "antd";
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
    label: "积水面积",
    name: "drna",
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
