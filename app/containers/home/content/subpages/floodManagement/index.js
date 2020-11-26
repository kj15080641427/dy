import React from "react";
import { Tabs } from "antd";
import Expert from "./Expert";
import FloodPrevention from "./FloodPrevention";
import MaterialsMange from "./MaterialsMange";
import StoreManage from "./StoreManage";

const FloodManagement = () => {
  return (
    <div className="base-tabs-display">
      <Tabs defaultActiveKey="site1" className="card-container" type="card">
        <Tabs.TabPane key="site1" tab="专家库">
          <Expert></Expert>
        </Tabs.TabPane>
        <Tabs.TabPane key="site2" tab="防汛人员">
          <FloodPrevention></FloodPrevention>
        </Tabs.TabPane>
        <Tabs.TabPane key="site3" tab="物资管理">
          <MaterialsMange></MaterialsMange>
        </Tabs.TabPane>
        <Tabs.TabPane key="site4" tab="仓库管理">
          <StoreManage></StoreManage>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
export default FloodManagement;
