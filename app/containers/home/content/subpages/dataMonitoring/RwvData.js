/**
 * rain 2020-06-7
 * zdl
 * 雨情信息
 */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions";
import ReadonlyTable from "../readOnlyTable";
import { Tabs } from "antd";
import "./style.scss";
import { getBasicsAll, getAllVideo } from "@app/data/request";
import { rain, water, flood, video, rowSelect } from "./columns/rwvCloumns";
import initecharts from "./echarts";

const rwvData = (props) => {
  const { TabPane } = Tabs;
  const { count, readOnlyData } = props;
  const { getCountStation } = props.actions;
  const [config, setConfig] = useState({
    type: 1,
    columns: rain,
    source: "raincount",
    name: "雨量",
    onlineListName: "raindataList",
  });
  //站点来源
  const selectRainSource = (result) => {
    let nameArr = [];
    let data = [];
    result?.list?.map((item) => {
      nameArr.push(item.dataSourceDesc ? item.dataSourceDesc : "暂无数据");
      data.push({
        name: item.dataSourceDesc ? item.dataSourceDesc : "暂无数据",
        value: item.number,
      });
    });
    initecharts("count", `${config.name}来源统计图`, nameArr, data);
  };
  //站点在线图
  const waterOnline = (name = "雨量") => {
    let okcount = 0;
    let nocount = 0;
    let thday = 0;
    let startdata = new Date().getTime();
    readOnlyData?.map((item) => {
      if (item[config.onlineListName] && item[config.onlineListName][0]) {
        if (
          startdata - new Date(item?.[config.onlineListName][0].tm).getTime() >=
          1000 * 60 * 60 * 24 * 3
        ) {
          thday++;
        } else {
          okcount++;
        }
      } else {
        nocount++;
      }
    });
    initecharts(
      "online",
      `${name}站点在线统计图`,
      ["最近更新", "三天前", "离线"],
      [
        {
          value: okcount,
          name: "最近更新",
        },
        {
          value: thday,
          name: "三天前",
        },
        {
          value: nocount,
          name: "离线",
        },
      ]
    );
  };
  //获取来源
  useEffect(() => {
    getCountStation();
  }, []);
  //在线图
  useEffect(() => {
    waterOnline(config.name);
  }, [readOnlyData, config.name]);
  //来源图
  useEffect(() => {
    console.log(count, "COUNT");
    if (count) {
      selectRainSource(count[config.source]);
    }
  }, [count, config.name]);

  const footer = () =>
    count && (
      <>
        <a>
          {count[config.source]?.indTypeName}站共计：
          {count[config.source]?.number}个
        </a>
        &nbsp;其中：&nbsp;
        {count[config.source]?.list?.map((item) => (
          <>
            <a>
              {item.dataSourceDesc}共计：{item.number}个
            </a>
            &nbsp;
          </>
        ))}
      </>
    );

  return (
    <>
      <Tabs
        onChange={(e) => {
          if (e === "rain") {
            setConfig({
              type: 1,
              columns: rain,
              source: "raincount",
              name: "雨量",
              onlineListName: "raindataList",
            });
          } else if (e === "water") {
            setConfig({
              type: 2,
              columns: water,
              source: "watercount",
              name: "水位",
              onlineListName: "riverwaterdataList",
            });
          } else if (e === "flood") {
            setConfig({
              type: 3,
              columns: flood,
              source: "floodcount",
              name: "易涝点",
              onlineListName: "riverwaterdataList",
            });
          } else if (e === "video") {
            setConfig({
              source: "vodeocount",
              name: "视频",
            });
          }
        }}
      >
        <TabPane tab="雨量站" key="rain"></TabPane>
        <TabPane tab="水位站" key="water"></TabPane>
        <TabPane tab="易涝点" key="flood"></TabPane>
        <TabPane tab="视频站点" key="video"></TabPane>
      </Tabs>
      <div className="div-left-echarts">
        <div className="echarts-count" id="count"></div>
        <div className="echarts-isOnline" id="online"></div>
      </div>
      {config.name === "视频" ? (
        <ReadonlyTable
          getAll
          rowSelection={{}}
          get={getAllVideo}
          columns={video}
          rowSelect={rowSelect}
          rowKey={"siteBaseID"}
          footer={() => footer()}
        />
      ) : (
        <ReadonlyTable
          getAll
          rowSelection={{}}
          get={getBasicsAll}
          type={config.type}
          columns={config.columns}
          rowSelect={rowSelect}
          rowKey={"siteBaseID"}
          footer={() => footer()}
        />
      )}
    </>
  );
};

rwvData.propTypes = {
  actions: PropTypes.object,
  raincount: PropTypes.object,
  watercount: PropTypes.object,
  floodcount: PropTypes.object,
  vodeocount: PropTypes.object,
  siteData: PropTypes.object,
  count: PropTypes.object,
};
function mapStateToProps(state) {
  return {
    readOnlyData: state.management.readOnlyData,
    raincount: state.management.raincount,
    watercount: state.management.watercount,
    floodcount: state.management.floodcount,
    vodeocount: state.management.vodeocount,
    count: state.management.count,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(rwvData);
