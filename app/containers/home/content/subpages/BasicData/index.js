import React, { useState } from "react";
import { Radio } from "antd";
import BaseStation from "./baseSite";
import SiteRain from "./siteRain";
import SiteWater from "./siteWater";
import SiteVideo from "./siteVideo";
import SiteWaterPoint from "./siteWaterPoint";
import VideoStation from "./VideoStation";
import "../styles.scss";
const BasicData = () => {
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
          <Radio.Button value="1">基础信息配置</Radio.Button>
          <Radio.Button value="2">雨量站点</Radio.Button>
          <Radio.Button value="3">水位站点</Radio.Button>
          <Radio.Button value="4">视频站点</Radio.Button>
          <Radio.Button value="5">积水站点</Radio.Button>
          <Radio.Button value="6">关联关系</Radio.Button>
        </Radio.Group>
      </div>
      <div>
        {value == 1 ? (
          <BaseStation />
        ) : value == 2 ? (
          <SiteRain />
        ) : value == 3 ? (
          <SiteWater />
        ) : value == 4 ? (
          <SiteVideo></SiteVideo>
        ) : value == 5 ? (
          <SiteWaterPoint />
        ) : (
          <VideoStation />
        )}
      </div>
    </div>
  );
};
export default BasicData;
