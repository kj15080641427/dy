import React from "react";
import BaseLayout from "../connectComponents";
import { Input } from "antd";
import { delUser, getUser, addUser, updUser } from "@app/data/home";
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
    title: "用户名",
    dataIndex: "username",
    className: "column-money",
  },
  {
    title: "用户姓名",
    dataIndex: "realname",
    className: "column-money",
  },
  {
    title: "状态",
    dataIndex: "state",
    className: "column-money",
    render: (state) => {
      if (state === "0") {
        return <a>正常</a>;
      } else {
        return <a style={{ color: "red" }}>冻结</a>;
      }
    },
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    className: "column-money",
    sorter: (a, b) =>
      new Date(b.createTime).getTime() - new Date(a.createTime).getTime(),
  },
];
const rowSelect = [
  { label: "名称", name: "realname", element: <Input></Input> },
];
class SiteGate extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BaseLayout
        get={getUser} // 分页查询接口
        add={addUser} // 添加数据接口
        upd={updUser} // 更新数据接口
        del={delUser} // 删除数据接口
        columns={columns} // 表格配置项
        formItem={formItem} // 表单配置项
        keyId={"userId"} // 数据的唯一ID
        storeKey={"systemUser"} // store中的key值
        rowSelect={rowSelect}
      ></BaseLayout>
    );
  }
}

export default SiteGate;
