import React, { useEffect } from "react";
import emitter from "@app/utils/emitter.js";
import { TableShow } from "../../components/chart/table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Modal, Row, Col, Tabs, Table, Popover } from "antd";
import * as actions from "../../redux/actions/handState";
import echarts from "echarts/lib/echarts";

export const TabsList = (props) => {
  const { visible, dataSource, dayWater } = props;
  const { changeModalVisible, getDayWater } = props.actions;
  const showChart = (data, id) => {
    let xdata = [];
    let ydata = [];
    let name = data[0] ? data[0].stnm : "";
    var myChart = echarts.init(document.getElementById(id));
    data.forEach((item) => {
      xdata.push(item.tm);
      ydata.push(item.z);
    });
    myChart.setOption({
      title: {
        text: name + "-雨量站雨量变化",
        // subtext: starttm + "至" + endtm,
        // left: 'center',
      },
      grid: {
        top: 90,
      },
      dataZoom: [
        {
          type: "slider",
          show: true,
          xAxisIndex: [0],
        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: true },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: {
        type: "category",
        data: xdata.length ? xdata : [],
        name: "时间",
      },
      yAxis: {
        type: "value",
        name: "雨量（mm）",
      },
      legend: {
        right: "center",
        x: "190px",
        y: "50px",
        // data: ['1小时降水', '24小时降水'],
      },
      series: [
        {
          // name: '1小时降水',
          data: ydata.length ? ydata : [],
          type: "line",
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" },
            ],
          },
        },
      ],
    });
  };

  useEffect(() => {
    if (dayWater instanceof Array) {
      showChart(dayWater, "dayWaterDiv");
    }
  }, [dayWater]);

  return (
    <>
      <TableShow
        pageSize={9}
        onRow={(record) => {
          return {
            onClick: () =>
              emitter.emit("map-move-focus", [record.lon, record.lat], 30000),
            onDoubleClick: () => {
              // changeModalVisible(true);
              // getDayWater(record.siteWaterLevels[0].stcd);
            },
          };
        }}
        columns={[
          { name: "站名", dataIndex: "strname" },
          {
            name: "状态",
            sorter: (a, b) => a.isOnline - b.isOnline,
            dataIndex: "isOnline",
            render: (v) =>
              v == "0" ? <a>在线</a> : <a style={{ color: "red" }}>离线</a>,
          },
          {
            name: "操作",
            dataIndex: "tm",
            render: () => <a>播放</a>,
          },
        ]}
        dataSource={dataSource}
        rowKey={(row) => row.radioID}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    visible: state.handState.visible,
    dayWater: state.handState.dayWater,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TabsList);
