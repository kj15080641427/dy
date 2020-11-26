import React from "react";
import { Tabs } from "antd";
import RwvData from "./rwvData";
import RiverAnnunciate from "./riverAnnunciate";
import Model from "./model";
import "./style.scss";

const Data = () => {
  return (
    <div className="base-tabs-display">
      <Tabs defaultActiveKey="site1" className="card-container" type="card">
        <Tabs.TabPane key="datasite1" tab="站点数据">
          <RwvData></RwvData>
        </Tabs.TabPane>
        <Tabs.TabPane key="site2" tab="河道信息">
          <RiverAnnunciate></RiverAnnunciate>
        </Tabs.TabPane>
        <Tabs.TabPane key="site3" tab="模型演示">
          <Model></Model>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
export default Data;
