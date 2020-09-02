import React from "react";
import BaseLayout from "../connectComponents";
import { Input } from "antd";
import {
  getSiteDict,
  delSiteDict,
  addSiteDict,
  updSiteDict,
} from "@app/data/home";
const formItem = [
  {
    label: "名称",
    name: "name",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "类别",
    name: "category",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "类型",
    name: "type",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
];

const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "类别",
    dataIndex: "category",
  },
  {
    title: "ID",
    dataIndex: "stateRelationID",
  },
  {
    title: "类型",
    dataIndex: "type",
  },
];
const rowSelect = [{ label: "名称", name: "name", element: <Input></Input> }];

class BaseDict extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <BaseLayout
          get={getSiteDict} // 分页查询接口
          add={addSiteDict} // 添加数据接口
          upd={updSiteDict} // 更新数据接口
          del={delSiteDict} // 删除数据接口
          columns={columns} // 表格配置项
          formItem={formItem} // 表单配置项
          rowSelect={rowSelect} // 查询配置项
          keyId={"stateRelationID"} // 数据的唯一ID
          storeKey={"baseDict"} // store中的key值. 要与 mapStatetoProps 中的key相同
        ></BaseLayout>
      </>
    );
  }
}

export default BaseDict;
