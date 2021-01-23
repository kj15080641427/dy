/**
 * MaterialsMange 2020-06-04
 * zdl
 * 物资管理
 */
import React, { useState, useEffect } from "react";
import BaseLayout from "../connectComponents";
import {
  getMaterialWarehouseAll,
  getMaterial,
  addMaterial,
  delMaterial,
  updMaterial,
} from "@app/data/home";
import { Input, Radio, DatePicker, Select } from "antd";

const { Option } = Select;
const obj = {
  32: "市水务局防汛仓库",
  33: "东营区防汛仓库",
  34: "垦利区防汛仓库",
  35: "河口区防汛仓库",
  36: "利津县防汛仓库",
  37: "广饶县防汛仓库",
};
const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "规格型号",
    dataIndex: "spec",
  },
  {
    title: "存储总量",
    dataIndex: "saveTotal",
  },
  {
    title: "所属仓库",
    dataIndex: "materialWarehouseId",
    render: (e) => obj[e],
  },
  {
    title: "计量单位",
    dataIndex: "company",
  },
  {
    title: "价值(元)",
    dataIndex: "money",
    sorter: (a, b) => a.money - b.money,
  },
  // {
  //   title: "创建时间",
  //   dataIndex: "createTime",
  //   className: "column-money",
  //   width: 170,
  //   sorter: true,
  // },
  {
    title: "过期时间",
    dataIndex: "expireDate",
    width: 160,
    render: (expireDate) =>
      expireDate === null ? "暂无数据" : expireDate.slice(0, 10),
  },
  {
    title: "出厂日期",
    dataIndex: "manufactureDate",
    width: 160,
    render: (manufactureDate) =>
      manufactureDate === null ? "暂无数据" : manufactureDate.slice(0, 10),
  },
  {
    title: "预警数量",
    dataIndex: "warningNumber",
    render: (warningNumber) =>
      warningNumber === null ? "暂无数据" : warningNumber,
  },
  {
    title: "是否显示",
    dataIndex: "isShow",
    render: (isShow) => (isShow === "0" ? "是" : "否"),
  },
];
const MaterialsMange = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getMaterialWarehouseAll({}).then((res) => setData(res.data));
  }, []);

  const ele = (
    <Select style={{ width: 200 }}>
      {data.map((item) => (
        <Option
          value={Number(item.materialWarehouseId)}
          key={item.materialWarehouseId}
        >
          {item.name}
        </Option>
      ))}
    </Select>
  );
  var a = 1000;
  for (let i = 0; i++; i < 1000) {
    a = a * 1.1;
  }
  console.log(a, "IIi");
  const rowSelect = [
    { label: "名称", name: "name", element: <Input></Input> },
    {
      label: "物资仓库",
      name: "materialWarehouseId",
      element: ele,
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
      label: "规格型号",
      name: "spec",
      ele: <Input />,
    },
    {
      label: "计量单位",
      name: "company",
      ele: <Input />,
    },
    {
      label: "存储总量",
      name: "saveTotal",
      ele: <Input />,
    },
    {
      label: "价值",
      name: "money",
      ele: <Input />,
    },
    {
      label: "是否显示",
      name: "isShow",
      ele: (
        <Radio.Group>
          <Radio value={"0"}>是</Radio>
          <Radio value={"1"}>否</Radio>
        </Radio.Group>
      ),
    },
    {
      label: "物资仓库",
      name: "materialWarehouseId",
      rules: [{ required: true }],
      ele: ele,
    },
    {
      label: "过期时间",
      name: "expireDate",
      ele: <DatePicker format="YYYY-MM-DD HH:mm:ss" />,
    },
    {
      label: "出厂时间",
      name: "manufactureDate",
      ele: <DatePicker format="YYYY-MM-DD HH:mm:ss" />,
    },
    {
      label: "预警数量",
      name: "warningNumber",
      ele: <Input />,
    },
  ];

  return (
    <BaseLayout
      get={getMaterial} // 分页查询接口
      add={addMaterial} // 添加数据接口
      upd={updMaterial} // 更新数据接口
      del={delMaterial} // 删除数据接口
      columns={columns} // 表格配置项
      formItem={formItem} // 表单配置项
      keyId={"materialId"} // 数据的唯一ID
      storeKey={"material"} // store中的key值
      rowSelect={rowSelect}
      formatList={["expireDate", "manufactureDate"]}
      showImport={true}
    />
  );
};
export default MaterialsMange;
