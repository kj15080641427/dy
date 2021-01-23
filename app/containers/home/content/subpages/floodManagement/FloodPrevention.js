/**
 * FloodPrevention 2020-06-04
 * zdl
 * 防汛人员
 */
import React from "react";
import BaseLayout from "../connectComponents";
import {
  queryFloodUser,
  saveFloodUser,
  deleteFloodUser,
  updateFloodUser,
} from "@app/data/request";
import { Input, Select, Radio } from "antd";

const { Option } = Select;

const obj = {
  3: "级防汛抢险应急队",
  1: "东营区防汛抢险应急队",
  2: "垦利区防汛抢险应急队",
  4: "利津县防汛抢险应急队",
  5: "河口区防汛抢险应急队",
  6: "广饶县防汛抢险应急队",
};
const selectList = (
  <Select size="large" style={{ width: 250 }} defaultValue={null}>
    <Option value={null}>所有</Option>
    <Option value={"1"}>队长</Option>
    <Option value={"2"}>副队长</Option>
    <Option value={"3"}>组长</Option>
    <Option value={"4"}>组员</Option>
  </Select>
);
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    className: "column-money",
    fixed: "left",
  },
  {
    title: "性别",
    dataIndex: "sex",
    className: "column-money",
    render: (sex) => (sex === "1" ? "男" : sex === "2" ? "女" : "未知"),
  },
  {
    title: "年龄",
    dataIndex: "age",
    className: "column-money",
    sorter: (a, b) => a.age - b.age,
    render: (age) => (age === null ? "未知" : age),
  },
  {
    title: "单位",
    dataIndex: "unit",
    className: "column-money",
  },
  {
    title: "联系电话",
    dataIndex: "phone",
    className: "column-money",
  },
  {
    title: "防汛队伍",
    dataIndex: "floodRanksId",
    render: (e) => obj[e],
  },
  {
    title: "是否显示",
    dataIndex: "isShow",
    className: "column-money",
    render: (isShow) => (isShow === "0" ? "是" : "否"),
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    className: "column-money",
    width: 170,
  },
  {
    title: "备注",
    dataIndex: "remark",
    className: "column-money",
  },
  {
    title: "等级",
    dataIndex: "grade",
    className: "column-money",
    render: (grade) =>
      grade === "1"
        ? "队长"
        : grade === "2"
        ? "副队长"
        : grade === "3"
        ? "组长"
        : grade === "4"
        ? "组员"
        : "未知",
  },
];
const formItem = [
  {
    label: "名称",
    name: "name",
    rules: [{ required: true }],
    ele: <Input />,
  },
  {
    label: "性别",
    name: "sex",
    rules: [{ required: true }],
    ele: (
      <Radio.Group defaultValue={"2"}>
        <Radio value={"1"}>男</Radio>
        <Radio value={"2"}>女</Radio>
      </Radio.Group>
    ),
  },
  {
    label: "年龄",
    name: "age",
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
    label: "电话",
    name: "phone",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },

  {
    label: "防汛队伍",
    name: "floodRanksId",
    ele: (
      <Select size="large" style={{ width: 250 }} defaultValue={3}>
        <Option value={3}>市级防汛抢险应急队</Option>
        <Option value={1}>东营区防汛抢险应急队</Option>
        <Option value={2}>垦利区防汛抢险应急队</Option>
        <Option value={4}>利津县防汛抢险应急队</Option>
        <Option value={5}>河口区防汛抢险应急队</Option>
        <Option value={6}>广饶县防汛抢险应急队</Option>
      </Select>
    ),
  },
  {
    label: "是否显示",
    name: "isShow",
    ele: (
      <Radio.Group defaultValue={"0"}>
        <Radio value={"0"}>是</Radio>
        <Radio value={"1"}>否</Radio>
      </Radio.Group>
    ),
  },
  {
    label: "备注",
    name: "remark",
    ele: <Input></Input>,
  },
  {
    label: "等级",
    name: "grade",
    ele: selectList,
  },
];
const rowSelect = [
  { label: "名称", name: "name", element: <Input></Input> },
  // { label: "单位", name: "unit", element: <Input></Input> },
  // { label: "备注", name: "remark", element: <Input></Input> },
  { label: "等级", name: "grade", element: selectList },
  {
    label: "性别",
    name: "sex",
    element: (
      <Select defaultValue="">
        <Option value="">全部</Option>
        <Option value="1">男</Option>
        <Option value="2">女</Option>
      </Select>
    ),
  },
  {
    label: "防汛队伍",
    name: "grade",
    element: (
      <Select size="large" style={{ width: 200 }} defaultValue={3}>
        <Option value={3}>市级防汛抢险应急队</Option>
        <Option value={1}>东营区防汛抢险应急队</Option>
        <Option value={2}>垦利区防汛抢险应急队</Option>
        <Option value={4}>利津县防汛抢险应急队</Option>
        <Option value={5}>河口区防汛抢险应急队</Option>
        <Option value={6}>广饶县防汛抢险应急队</Option>
      </Select>
    ),
  },
];
class FloodPrevention extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <BaseLayout
          get={queryFloodUser} // 分页查询接口
          add={saveFloodUser} // 添加数据接口
          upd={updateFloodUser} // 更新数据接口
          del={deleteFloodUser} // 删除数据接口
          columns={columns} // 表格配置项
          formItem={formItem} // 表单配置项
          keyId={"floodId"} // 数据的唯一ID
          storeKey={"floodPerson"} // store中的key值
          rowSelect={rowSelect}
          showImport={true}
        ></BaseLayout>
      </>
    );
  }
}

export default FloodPrevention;
