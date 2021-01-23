import React from "react";
import BaseLayout from "../connectComponents";
import { Input } from "antd";
import ReadOnlyTable from "../readOnlyTable";
import {
  delSiteGate,
  getSiteGate,
  addSiteGate,
  updSiteGate,
} from "@app/data/home";
const items = [
  { label: "水闸名称", value: "name" },
  { label: "水闸类别", value: "type", isDict: "type" },
  { label: "所在灌区", value: "irrigateregion" },
  { label: "所在河流", value: "rivername" },
  { label: "工程等级", value: "projectlevel" },
  { label: "管理单位", value: "management" },
  { label: "归口部门", value: "ownermanagement" },
  { label: "建成时间", value: "buildtime" },
  { label: "闸站编号", value: "stcd" },
  { label: "地区编码", value: "region" },
  { label: "经度", value: "lon" },
  { label: "纬度", value: "lat" },
  { label: "所在水资源三级区名称", value: "waterresource3" },
  { label: "主要建筑物级别", value: "buidinglevel" },
  { label: "是否为闸站工程", value: "isgateproject", isDict: "whether" },
  { label: "是否为套闸工程", value: "isdualproject", isDict: "whether" },
  { label: "是否完成划界", value: "isbordered", isDict: "whether" },
  { label: "是否完成确权", value: "isauthorized", isDict: "whether" },
];
let formItems = items.map((item) => {
  return {
    label: item.label,
    name: item.value,
    rules: [{ required: true }],
    ele: <Input></Input>,
  };
});

// 表格配置
const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "主建筑物级别",
    dataIndex: "buidinglevel",
  },
  {
    title: "所在灌区",
    dataIndex: "irrigateregion",
  },
  {
    title: "管理部门",
    dataIndex: "ownermanagement",
  },
  {
    title: "管理单位",
    dataIndex: "management",
  },
  {
    title: "河流名称",
    dataIndex: "rivername",
  },
];
const rowSelect = [{ label: "名称", name: "name", element: <Input></Input> }];

class SiteGate extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BaseLayout
        get={getSiteGate} // 分页查询接口
        add={addSiteGate} // 添加数据接口
        upd={updSiteGate} // 更新数据接口
        del={delSiteGate} // 删除数据接口
        columns={columns} // 表格配置项
        formItem={formItems} // 表单配置项
        keyId={"gateID"} // 数据的唯一ID
        storeKey={"siteGate"} // store中的key值
        rowSelect={rowSelect}
      ></BaseLayout>
    );
  }
}

export default SiteGate;

export const ReadonlyGate = () => {
  return (
    <ReadOnlyTable
      get={getSiteGate}
      columns={columns}
      rowSelect={rowSelect}
      rowKey={"gateID"}
    />
  );
};
