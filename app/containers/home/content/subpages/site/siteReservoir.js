import React from "react";
import BaseLayout from "../connectComponents";
import ReadOnlyTable from "../readOnlyTable";
import { Input } from "antd";
import {
  getSiteReservoir,
  delSiteReservoir,
  addSiteReservoir,
  updSiteReservoir,
} from "@app/data/home";
const items = [
  { label: "水库名称", value: "name", rules: true },
  { label: "所在河流", value: "rivername" },
  { label: "水库类型", value: "rvtype", isDict: "rvType" },
  { label: "管理单位", value: "management" },
  { label: "主坝类型(材料)", value: "rvbartypem", isDict: "rvbartypem" },
  { label: "主坝类型(结构)", value: "rvbartypes", isDict: "rvbartypes" },
  { label: "调节性能", value: "rvadjust" },
  { label: "主坝坝高（m）", value: "barheight" },
  { label: "主坝坝长（m）", value: "barlen" },
  { label: "最大泄洪流量（m3/S）", value: "floodmax" },
  { label: "主坝级别", value: "barlevel" },
  { label: "工程等别", value: "projectlevel" },
  { label: "高程系统", value: "elevationsystem" },
  { label: "坝顶高程(m)", value: "bartopheight" },
  { label: "正常蓄水位(m)", value: "waterlevelnormal" },
  { label: "死水位(m)", value: "waterleveldeath" },
  { label: "总库容（万m3）", value: "capacitymax" },
  { label: "死库容(万m3)", value: "capacitydeath" },
  { label: "设计年供水量(万m3)", value: "waterproviddesign" },
  { label: "设计灌溉面积(万亩)", value: "waterprovidactualsrs" },
  { label: "建成时间", value: "buildtime" },
];
let formItems = items.map((item) => {
  return {
    label: item.label,
    name: item.value,
    rules: [{ required: item.rules }],
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
          formItem={formItems} // 表单配置项
          rowSelect={rowSelect}
        ></BaseLayout>
      </>
    );
  }
}

export default SiteReservoir;
export const ReadonlyReservoir = () => {
  return (
    <ReadOnlyTable
      get={getSiteReservoir}
      columns={columns}
      rowSelect={rowSelect}
      rowKey={"reservoirID"}
    />
  );
};
