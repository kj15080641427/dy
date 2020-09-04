import React from "react";
import { Input } from "antd";
import { getSiteDikeAll } from "@app/data/home";
import ReadOnlyTable from "../readOnlyTable";
// 表格配置
const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "河流名称",
    dataIndex: "rivername",
  },
  {
    title: "河流站点",
    dataIndex: "riverside",
  },
  {
    title: "状态",
    dataIndex: "dikeinfo",
  },
  {
    title: "管理单位",
    dataIndex: "management",
  },
  {
    title: "地址",
    dataIndex: "addrstart",
  },
  {
    title: "ID",
    dataIndex: "dikeID",
  },
];
const rowSelect = [{ label: "名称", name: "name", element: <Input></Input> }];
const SiteDike = () => (
  <ReadOnlyTable
    getAll={true}
    get={getSiteDikeAll}
    columns={columns}
    rowSelect={rowSelect}
    rowKey="dikeID"
  />
);

export default SiteDike;
export const ReadonlyDike = () => {
  return (
    <ReadOnlyTable
      getAll
      get={getSiteDikeAll}
      columns={columns}
      rowSelect={rowSelect}
      rowKey={"gateID"}
    />
  );
};
