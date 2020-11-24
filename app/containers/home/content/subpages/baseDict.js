import React from "react";
import { Select } from "antd";
const BaseDict = () => {
  return (
    <Select>
      <Select.Option value={1}>水文局</Select.Option>
      <Select.Option value={2}>气象局</Select.Option>
      <Select.Option value={3}>水务局</Select.Option>
      <Select.Option value={4}>农村基层防汛监测预警平台</Select.Option>
      <Select.Option value={5}>河道</Select.Option>
      <Select.Option value={6}>河口区水利局</Select.Option>
      <Select.Option value={7}>水务局河道</Select.Option>
      <Select.Option value={22}>黄河东营境内水位站点</Select.Option>
      <Select.Option value={23}>人工录入</Select.Option>
      <Select.Option value={25}>经开区</Select.Option>
    </Select>
  );
};

export default BaseDict;
