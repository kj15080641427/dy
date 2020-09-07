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
import Rain from "./Rain";
import Water from "./Water";
import Vodeo from "./Vodeo";
import Flood from "./Flood";
import { getCountStation, getBasicsAll } from "@app/data/request";
import { rain, water, flood, rowSelect } from "./columns/rwvCloumns";
import initecharts from "./echarts";

const rwvData = (props) => {
  const { TabPane } = Tabs;
  const { raincount, watercount, floodcount, vodeocount, readOnlyData } = props;
  //   const { siteData } = props;
  const { getCountStation } = props.actions;
  const [config, setConfig] = useState({
    type: 1,
    columns: rain,
    source: raincount,
    name: "雨量",
    onlineListName: "raindataList",
    // onlinetm:
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
  const waterOnline = () => {
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
      "水位站点在线统计图",
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
    waterOnline();
  }, [readOnlyData]);
  //画图
  useEffect(() => {
    if (config.source) {
      selectRainSource(config.source);
    } else {
      selectRainSource(raincount);
    }
  }, [raincount, config.type]);

  return (
    <>
      <Tabs
        onChange={(e) => {
          if (e === "rain") {
            setConfig({
              type: 1,
              columns: rain,
              source: raincount,
              name: "雨量",
              onlineListName: "raindataList",
            });
          } else if (e === "water") {
            setConfig({
              type: 2,
              columns: water,
              source: watercount,
              name: "水位",
              onlineListName: "riverwaterdataList",
            });
          } else if (e === "flood") {
            // setType(3);
            // setColumns(flood);
            // setEchartSource(floodcount);
            // setEchartName("易涝点");
          }
        }}
      >
        <TabPane tab="雨量站" key="rain">
          {/* <Rain raincount={raincount}></Rain> */}
        </TabPane>
        <TabPane tab="水位站" key="water">
          {/* <Water watercount={watercount}></Water> */}
        </TabPane>
        <TabPane tab="易涝点" key="flood">
          {/* <Flood floodcount={floodcount}></Flood> */}
        </TabPane>
        <TabPane tab="视频站点" key="video">
          {/* <Vodeo></Vodeo> */}
        </TabPane>
      </Tabs>
      <div className="div-left-echarts">
        <div className="echarts-count" id="count"></div>
        <div className="echarts-isOnline" id="online"></div>
      </div>
      <ReadonlyTable
        getAll
        get={getBasicsAll}
        type={config.type}
        columns={config.columns}
        rowSelect={rowSelect}
        rowKey={"siteBaseID"}
        footer={() => (
          <>
            <a>雨量站共计：{watercount?.number}个</a>&nbsp;其中：&nbsp;
            {/* {element} */}
          </>
        )}
      />
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
};
function mapStateToProps(state) {
  return {
    readOnlyData: state.management.readOnlyData,
    raincount: state.management.raincount,
    watercount: state.management.watercount,
    floodcount: state.management.floodcount,
    vodeocount: state.management.vodeocount,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(rwvData);
