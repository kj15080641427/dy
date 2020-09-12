/**
 * water 2020-06-13
 * zdl
 * 权限管理
 */
import React from "react";
import BaseLayout from "../connectComponents";
import ReadOnlyTable from "../readOnlyTable";
import { Input } from "antd";
import {
  queryPermission,
  deletePermission,
  savePermission,
  updatePermission,
} from "@app/data/home";
const columns = [
  {
    title: "权限名",
    dataIndex: "permName",
    className: "column-money",
  },
  {
    title: "请求URL",
    dataIndex: "url",
    className: "column-money",
  },
  {
    title: "权限标识符",
    dataIndex: "permTag",
    className: "column-money",
  },
];
const formItem = [
  {
    name: "permName",
    label: "权限名",
    ele: <Input />,
  },
  {
    name: "url",
    label: "请求URL",
    ele: <Input />,
  },
  {
    name: "permTag",
    label: "权限标识符",
    ele: <Input />,
  },
];

const rowSelect = [
  { label: "名称", name: "permName", element: <Input></Input> },
];
class Jurisdiction extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <BaseLayout
          get={queryPermission} // 分页查询接口
          add={savePermission} // 添加数据接口
          upd={updatePermission} // 更新数据接口
          del={deletePermission} // 删除数据接口
          columns={columns} // 表格配置项
          formItem={formItem} // 表单配置项
          keyId={"permissionId"} // 数据的唯一ID
          storeKey={"permission"} // store中的key值
          rowSelect={rowSelect}
        ></BaseLayout>
      </>
    );
  }
}

export default Jurisdiction;
export const ReadonlyPermission = (props) => {
  return (
    <ReadOnlyTable
      handPage={{}}
      initSelect={{ current: 1, size: -1 }}
      rowSelection={props.rowSelection}
      get={queryPermission}
      columns={columns}
      rowSelect={rowSelect}
      rowKey={"permissionId"}
    />
  );
};
