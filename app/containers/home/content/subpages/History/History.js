import React, { useState, useEffect } from "react";
import { Radio, Tabs, message, Select } from "antd";
// import RwvData from "../dataMonitoring/RwvData";
// import RiverAnnunciate from "../dataMonitoring/riverAnnunciate";
// import Model from "../dataMonitoring/model";
import FilterCondition from "@app/components/filter/FilterCondition";
import {
  getHisNowRain,
  getHisFiveRain,
  getHisHourRain,
  getHisDayRain,
  //   getHisNowWater,
  //   getHisPoint,
  exportNowRain,
  exportFiveRain,
  exportHourRain,
  exportDayRain,
} from "@app/data/request";
import DYTable from "../../../../../components/home/table";
import "./style.scss";
import moment from "moment";
import { downloadFile } from "./download";
import Water from "./water";
import Point from "./point";

const type = {
  0: getHisNowRain,
  1: getHisFiveRain,
  2: getHisHourRain,
  3: getHisDayRain,
};
const exportType = {
  0: exportNowRain,
  1: exportFiveRain,
  2: exportHourRain,
  3: exportDayRain,
};
const rainCol = [
  {
    title: "名称",
    ellipsis: true,
    dataIndex: "stnm",
    render: (value) => value || "-",
  },
  {
    title: "来源",
    ellipsis: true,
    dataIndex: "dataSourceName",
    render: (value) => value || "-",
  },
  {
    title: "区县",
    ellipsis: true,
    dataIndex: "areaName",
    render: (value) => value || "-",
  },
  {
    title: "降雨量(mm)",
    ellipsis: true,
    dataIndex: "",
    render: (value) =>
      value.avgDrp
        ? value.avgDrp
        : value.avgDrp == 0
        ? value.avgDrp
        : value.drp,
  },
  {
    title: "更新时间",
    ellipsis: true,
    dataIndex: "",
    render: (value) => value.tm || value.startTime || "-",
  },
];
const History = () => {
  const [rainType, setRainType] = useState("0");
  const [rainData, setRainData] = useState();
  const [rainSelect, setRainSelect] = useState({});
  const [current, setCurrent] = useState(1);
  const [rainLoading, setRainLoading] = useState(false);
  useEffect(() => {
    setRainLoading(true);
    getHisNowRain({ current: 1, size: 10 }).then((res) => {
      setRainData(res.data);
      setRainLoading(false);
    });
  }, []);
  const reset = () => {
    setRainType("0");
    let req = type[0];
    req({
      current: 1,
      size: 10,
    }).then((res) => {
      setRainData(res.data);
    });
  };
  const onRainFinish = (values) => {
    setRainLoading(true);
    setCurrent(1);
    let req = type[rainType];
    if (values.time) {
      let start = moment(values.time[0]).format("YYYY-MM-DD HH:mm:ss");
      let end = moment(values.time[1]).format("YYYY-MM-DD HH:mm:ss");
      values = { ...values, startTime: start, endTime: end };
    }
    setRainSelect({ ...values });
    req({
      ...values,
      current: 1,
      size: 10,
    }).then((res) => {
      setRainLoading(false);
      setRainData(res.data);
    });
    console.log(values);
  };
  const changePage = (current) => {
    setRainLoading(true);
    let req = type[rainType];
    req({
      ...rainSelect,
      size: 10,
      current: current,
    }).then((res) => {
      setCurrent(current);
      setRainLoading(false);
      setRainData(res.data);
    });
  };
  const rainExportData = () => {
    let req = exportType[rainType];
    let obj = {
      0: "实时降雨量",
      1: "5分钟降雨量",
      2: "1小时降雨量",
      3: "24小时降雨量",
    };
    if (rainData?.total) {
      if (rainData.total < 100000) {
        downloadFile(
          req(),
          { ...rainSelect, current: 1, size: -1 },
          `${obj[rainType]}.xlsx`
        );
        // req({ ...rainSelect, current: 1, size: -1 }).then((res) => {
        //   return res.blob();
        // });
      } else {
        message.error("导出数据不能超过十万条");
      }
    } else {
      message.error("请选择导出数据");
    }
  };
  return (
    <>
      <div className="home-his-layout-tabs">
        <Radio.Group optionType="button" defaultValue="1">
          <Radio.Button value="1">历史监测数据</Radio.Button>
        </Radio.Group>
      </div>
      <Tabs className="history-tabs">
        <Tabs.TabPane key="1" tab="雨量">
          <FilterCondition
            onFinish={onRainFinish}
            reset={reset}
            exportData={rainExportData}
          >
            <Select
              defaultValue="0"
              value={rainType}
              onChange={(e) => setRainType(e)}
            >
              <Select.Option key="0" value="0">
                实时降雨量
              </Select.Option>
              <Select.Option key="1" value="1">
                5分钟降雨量
              </Select.Option>
              <Select.Option key="2" value="2">
                1小时降雨量
              </Select.Option>
              <Select.Option key="3" value="3">
                24小时降雨量
              </Select.Option>
            </Select>
          </FilterCondition>
          <DYTable
            showSizeChangeer={false}
            columns={rainCol}
            dataSource={rainData?.records}
            showEdit={false}
            // rowSelection={rowSelection}
            // columnsProps={columnsProps}
            loading={rainLoading}
            total={rainData?.total}
            current={current}
            size={10}
            rowkey={(row) => row.raindataID}
            changePage={(cur) => changePage(cur)}
            // confirm={confirm}
          ></DYTable>
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="水位">
          <Water></Water>
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="易涝点">
          <Point></Point>
        </Tabs.TabPane>
      </Tabs>

      {/* <div>
        {value == 1 ? (
          <FilterCondition onSearch={onSearch} />
        ) : value == 2 ? (
        ) : value == 3 ? (
          <Model />
        ) : null}
      </div> */}
    </>
  );
};

export default History;
