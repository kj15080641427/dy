import React, { useState, useEffect } from "react";
import { Tabs } from "antd";

const TabsBase = (props) => {
  const { tabpane } = props;
  return (
    <Tabs>
      <Tabs.TabPane key="1" tab="父">
        <Tabs>
          <Tabs.TabPane key="3" tab="子">
            {" "}
          </Tabs.TabPane>
        </Tabs>
      </Tabs.TabPane>
      <Tabs.TabPane key="2" tab="父2"></Tabs.TabPane>
    </Tabs>
  );
};
export default TabsBase;
