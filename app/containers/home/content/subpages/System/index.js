import React from "react";
import { Tabs } from "antd";
import User from "./User";
import Jurisdiction from "./Jurisdiction";
import LoginLog from "./LoginLog";
import Role from "./Role";

const System = () => {
  return (
    <div className="base-tabs-display">
      <Tabs defaultActiveKey="site1" className="card-container" type="card">
        <Tabs.TabPane key="site1" tab="用户管理">
          <User></User>
        </Tabs.TabPane>
        <Tabs.TabPane key="site2" tab="权限管理">
          <Jurisdiction></Jurisdiction>
        </Tabs.TabPane>
        <Tabs.TabPane key="site3" tab="登录日志">
          <LoginLog></LoginLog>
        </Tabs.TabPane>
        <Tabs.TabPane key="site4" tab="角色管理">
          <Role></Role>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
export default System;
