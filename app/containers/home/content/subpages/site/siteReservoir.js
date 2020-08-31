import React from "react";
import BaseLayout from "../connectComponents";
import { Input } from "antd";
import {
  getSiteReservoir,
  delSiteReservoir,
  addSiteReservoir,
  updSiteReservoir,
} from "@app/data/home";
const formItem = [
  {
    label: "名称",
    name: "name",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "高程系统",
    name: "elevationsystem",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "水口管理单位",
    name: "ownermanagement",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "工程建设情况",
    name: "projectstatus",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "设计灌溉面积(万亩)",
    name: "areairrigate",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "河流名称",
    name: "rivername",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "水库调节性能",
    name: "rvadjust",
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
    title: "高程系统",
    dataIndex: "elevationsystem",
  },
  {
    title: "水口管理单位",
    dataIndex: "ownermanagement",
  },
  {
    title: "工程建设情况",
    dataIndex: "projectstatus",
  },
  {
    title: "设计灌溉面积(万亩)",
    dataIndex: "areairrigate",
  },
  {
    title: "河流名称",
    dataIndex: "rivername",
  },
  {
    title: "水库调节性能",
    dataIndex: "rvadjust",
  },
];
const rowSelect = [{ label: "名称", name: "name", element: <Input></Input> }];
class SiteReservoir extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <BaseLayout
          get={getSiteReservoir} // 分页查询接口
          add={addSiteReservoir} // 添加数据接口
          upd={updSiteReservoir} // 更新数据接口
          del={delSiteReservoir} // 删除数据接口
          keyId={"reservoirID"} // 数据的唯一ID
          storeKey={"siteReservoir"} // store中的key值. 要与 mapStatetoProps 中的key相同
          columns={columns} // 表格配置项
          formItem={formItem} // 表单配置项
          rowSelect={rowSelect}
        ></BaseLayout>
      </>
    );
  }
}

export default SiteReservoir;
