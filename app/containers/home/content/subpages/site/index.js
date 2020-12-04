import React, { useState } from "react";
import { Radio } from "antd";
import BaseDict from "./baseDict";
import SiteDike from "./siteDike";
import SiteGate from "./siteGate";
import SitePump from "./sitePump";
import SiteReservoir from "./siteReservoir";
// import VideoStation from "./VideoStation";
import "../styles.scss";
const SiteInfo = () => {
  const [value, setValue] = useState("1");
  return (
    <div>
      <div className="home-layout-tabs">
        <Radio.Group
          optionType="button"
          onChange={(e) => {
            console.log(e);
            setValue(e.target.value);
          }}
          value={value}
        >
          <Radio.Button value="1">泵站信息</Radio.Button>
          <Radio.Button value="2">堤防工程</Radio.Button>
          <Radio.Button value="3">水库信息</Radio.Button>
          <Radio.Button value="4">水闸信息</Radio.Button>
          <Radio.Button value="5">基础字典</Radio.Button>
        </Radio.Group>
      </div>
      <div>
        {value == 1 ? (
          <SitePump />
        ) : value == 2 ? (
          <SiteDike />
        ) : value == 3 ? (
          <SiteReservoir />
        ) : value == 4 ? (
          <SiteGate></SiteGate>
        ) : (
          <BaseDict />
        )}
      </div>
    </div>
  );
};
export default SiteInfo;
