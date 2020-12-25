import React, { useState } from "react";
import { Radio } from "antd";
import RwvData from "./rwvData";
import RiverAnnunciate from "./riverAnnunciate";
import Model from "./model";
import "./style.scss";

const Data = () => {
  const [value, setValue] = useState("1");
  return (
    <>
      <div className="home-layout-tabs">
        <Radio.Group
          optionType="button"
          onChange={(e) => {
            console.log(e);
            setValue(e.target.value);
          }}
          value={value}
        >
          <Radio.Button value="1">站点数据</Radio.Button>
          <Radio.Button value="2">河道信息</Radio.Button>
          <Radio.Button value="3">3D地图</Radio.Button>
        </Radio.Group>
      </div>
      <div>
        {value == 1 ? (
          <RwvData />
        ) : value == 2 ? (
          <RiverAnnunciate />
        ) : value == 3 ? (
          <Model />
        ) : null}
      </div>
    </>
    // <div className="base-tabs-display">
    //   <Tabs defaultActiveKey="site1" className="card-container" type="card">
    //     <Tabs.TabPane key="datasite1" tab="站点数据">
    //       <RwvData></RwvData>
    //     </Tabs.TabPane>
    //     <Tabs.TabPane key="site2" tab="河道信息">
    //       <RiverAnnunciate></RiverAnnunciate>
    //     </Tabs.TabPane>
    //     <Tabs.TabPane key="site3" tab="模型演示">
    //       <Model></Model>
    //     </Tabs.TabPane>
    //   </Tabs>
    // </div>
  );
};
export default Data;
