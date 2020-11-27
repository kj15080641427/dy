import React, { useState } from "react";
import { Radio } from "antd";
import Expert from "./Expert";
import FloodPrevention from "./FloodPrevention";
import MaterialsMange from "./MaterialsMange";
import StoreManage from "./StoreManage";
import "../styles.scss";

const FloodManagement = () => {
  const [value, setValue] = useState("1");
  return (
    <div className="base-tabs-display">
      <div className="home-layout-tabs">
        <Radio.Group
          optionType="button"
          onChange={(e) => {
            console.log(e);
            setValue(e.target.value);
          }}
          value={value}
        >
          <Radio.Button value="1">专家库</Radio.Button>
          <Radio.Button value="2">防汛人员</Radio.Button>
          <Radio.Button value="3">物资管理</Radio.Button>
          <Radio.Button value="4">仓库管理</Radio.Button>
        </Radio.Group>
      </div>
      {value == 1 ? (
        <Expert rowSelection={{}} />
      ) : value == 2 ? (
        <FloodPrevention />
      ) : value == 3 ? (
        <MaterialsMange />
      ) : (
        <StoreManage />
      )}
    </div>
  );
};
export default FloodManagement;
