/**
 * StoreManage 2020-06-04
 * zdl
 * 仓库管理
 */
import React from "react";
import BaseLayout from "../connectComponents";
import {
  getMaterialWarehouse,
  addMaterialWarehouse,
  delMaterialWarehouse,
  updMaterialWarehouse,
} from "@app/data/home";
import { Input } from "antd";

const columns = [
  {
    title: "仓库名称",
    dataIndex: "name",
    className: "column-money",
  },
  {
    title: "仓库经度",
    dataIndex: "lon",
    className: "column-money",
  },
  {
    title: "仓库纬度",
    dataIndex: "lat",
    className: "column-money",
  },
];
const formItem = [
  {
    label: "仓库名称",
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
];
const rowSelect = [
  { label: "仓库名称", name: "name", element: <Input></Input> },
];
const StoreManage = () => (
  <BaseLayout
    get={getMaterialWarehouse} // 分页查询接口
    add={addMaterialWarehouse} // 添加数据接口
    upd={updMaterialWarehouse} // 更新数据接口
    del={delMaterialWarehouse} // 删除数据接口
    columns={columns} // 表格配置项
    formItem={formItem} // 表单配置项
    keyId={"materialWarehouseId"} // 数据的唯一ID
    storeKey={"storeManage"} // store中的key值
    rowSelect={rowSelect}
  />
);
export default StoreManage;
