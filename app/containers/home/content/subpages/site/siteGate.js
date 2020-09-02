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

const formItem = [
  {
    label: "名称",
    name: "name",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "主建筑物级别",
    name: "buidinglevel",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "所在灌区",
    name: "irrigateregion",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },

  {
    label: "管理部门",
    name: "ownermanagement",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "管理单位",
    name: "management",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "河流名称",
    name: "rivername",
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
        formItem={formItem} // 表单配置项
        keyId={"gateID"} // 数据的唯一ID
        storeKey={"siteGate"} // store中的key值
        rowSelect={rowSelect}
      ></BaseLayout>

    );
  }
}

export default SiteGate;

export const gateSet = {
  get: getSiteGate,
  columns: columns,
  rowSelect: rowSelect,
  rowKey: "gateID",
};

export const ReadonlyGate = () => {
  return (
    <ReadOnlyTable
      // rowSelection={{
      //   fixed: true,
      //   type: "radio",
      //   selectedRowKeys: [1],
      //   onChange: (e) => console.log(e, "EEE"),
      // }}
      get={getSiteGate}
      columns={columns}
      rowSelect={rowSelect}
      rowKey={"gateID"}
    />
  );
};

