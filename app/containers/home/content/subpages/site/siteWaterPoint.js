import React from "react";
import BaseLayout from "../connectComponents";
import ReadOnlyTable from "../readOnlyTable";
import { Input } from "antd";
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
    name: "lon",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "纬度",
    name: "lat",
    rules: [{ required: true }],
    ele: <Input></Input>,
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
    label: "行政区划码",
    name: "addvcd",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "管理机构",
    name: "admauth",
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
    label: "至河口距离",
    name: "distancetoport",
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
    label: "来源编码",
    name: "siteDictionariesID",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "状态",
    name: "state",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "测站岸别",
    name: "stbk",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "警戒值",
    name: "warning",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "站类",
    name: "sttp",
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
