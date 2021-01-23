import React from "react";
import BaseLayout from "../connectComponents";
import { Input, Select, Radio } from "antd";
import { delUser, getUser, addUser, updUser, getRole } from "@app/data/home";
const formItem = [
  {
    label: "账号",
    name: "username",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "密码",
    name: "password",
    rules: [{ required: true }],
    ele: <Input type="password"></Input>,
  },
  {
    label: "用户真实名称",
    name: "realname",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "单位",
    name: "unit",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "状态",
    name: "state",
    rules: [{ required: true }],
    ele: (
      <Radio.Group>
        <Radio value={'0'}>正常</Radio>
        <Radio value={'1'}>冻结</Radio>
      </Radio.Group>
    ),
  },
  {
    label: "手机号码",
    name: "phone",
    rules: [{ required: true }],
    ele: <Input type="number"></Input>,
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
  // {
  //   title: "角色",
  //   dataIndex: "roleName",
  //   className: "column-money",
  // },
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
  { label: "用户姓名", name: "realname", element: <Input></Input> },
];
class SiteGate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roleData: [],
    };
  }
  componentDidMount() {
    getRole({ current: 1, size: -1 }).then((res) => {
      let data = res.data.records.map((item) => {
        return {
          id: item.roleId,
          name: item.roleName,
        };
      });
      this.setState({
        roleData: data,
      });
    });
  }
  render() {
    const roleColumns = {
      label: "角色",
      name: "roleId",
      ele: (
        <Select>
          {this.state.roleData.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      ),
    };
    return (
      <BaseLayout
        get={getUser} // 分页查询接口
        add={addUser} // 添加数据接口
        upd={updUser} // 更新数据接口
        del={delUser} // 删除数据接口
        columns={columns} // 表格配置项
        formItem={[...formItem, roleColumns]} // 表单配置项
        keyId={"userId"} // 数据的唯一ID
        storeKey={"systemUser"} // store中的key值
        rowSelect={rowSelect}
      ></BaseLayout>
    );
  }
}

export default SiteGate;
