import React, { useState, useEffect } from "react";
import { message } from "antd";
import FilterCondition from "@app/components/filter/FilterCondition";
import { getHisNowWater, exportWater } from "@app/data/request";
import DYTable from "../../../../../components/home/table";
import moment from "moment";
import { downloadFile } from "./download";

export default (props) => {
  const [data, setData] = useState();
  const [rainSelect, setRainSelect] = useState({});
  const [current, setCurrent] = useState(1);
  const [rainLoading, setRainLoading] = useState(false);
  const { dict } = props;
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
      dataIndex: "siteDictionariesId",
      render: (value) => {
        return dict[value] || "-";
      },
    },
    {
      title: "区县",
      ellipsis: true,
      dataIndex: "areaName",
      render: (value) => value || "-",
    },
    {
      title: "水位(m)",
      ellipsis: true,
      dataIndex: "z",
      render: (e) => Number(e)?.toFixed(2),
    },
    {
      title: "更新时间",
      ellipsis: true,
      dataIndex: "",
      render: (value) => value.tm?.slice(0, -3) || "-",
    },
  ];
  useEffect(() => {
    setRainLoading(true);
    getHisNowWater({ current: 1, size: 10 }).then((res) => {
      setData(res.data);
      setRainLoading(false);
    });
  }, []);

  const reset = () => {
    getHisNowWater({
      current: 1,
      size: 10,
    }).then((res) => {
      setData(res.data);
    });
  };
  const onRainFinish = (values) => {
    setRainLoading(true);
    setCurrent(1);
    if (values.addvcd == "370500") {
      values.addvcd = undefined;
    }
    if (values.time) {
      let start = moment(values.time[0]).format("YYYY-MM-DD HH:mm:ss");
      let end = moment(values.time[1]).format("YYYY-MM-DD HH:mm:ss");
      values = { ...values, startTime: start, endTime: end };
    }
    setRainSelect({ ...values });
    getHisNowWater({
      ...values,
      current: 1,
      size: 10,
    }).then((res) => {
      setRainLoading(false);
      setData(res.data);
    });
    console.log(values);
  };
  const changePage = (current) => {
    setRainLoading(true);
    getHisNowWater({
      ...rainSelect,
      size: 10,
      current: current,
    }).then((res) => {
      setCurrent(current);
      setRainLoading(false);
      setData(res.data);
    });
  };
  const rainExportData = () => {
    if (data?.total) {
      if (data.total < 100000) {
        downloadFile(
          exportWater(),
          { ...rainSelect, current: 1, size: -1 },
          `水位统计.xlsx`
        );
      } else {
        message.error("导出数据不能超过十万条");
      }
    } else {
      message.error("请选择导出数据");
    }
  };
  return (
    <>
      <FilterCondition
        onFinish={onRainFinish}
        reset={reset}
        exportData={rainExportData}
      ></FilterCondition>
      <DYTable
        showSizeChangeer={false}
        columns={rainCol}
        dataSource={data?.records}
        showEdit={false}
        // rowSelection={rowSelection}
        // columnsProps={columnsProps}
        loading={rainLoading}
        total={data?.total}
        current={current}
        size={10}
        rowkey={(row) => row.raindataID}
        changePage={(cur) => changePage(cur)}
        // confirm={confirm}
      ></DYTable>
    </>
  );
};
