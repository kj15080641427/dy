import React, { useEffect, useState } from "react";
import emitter from "@app/utils/emitter.js";
import { TableShow } from "../../components/chart/table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Modal, Row, Col, Tabs, Table, Popover } from "antd";
import * as actions from "../../redux/actions/handState";
import echarts from "echarts/lib/echarts";
import Highlighter from "react-highlight-words";

export const TabsList = (props) => {
  const { visible, rain, hourRain, dayRain, sevenDayRain, dataSource } = props;
  const {
    changeModalVisible,
    getHourRain,
    getDayRain,
    getSevenDayRain,
  } = props.actions;
  const showChart = (data, id, starttm, endtm) => {
    let xdata = [];
    let ydata = [];
    let name = data[0] ? data[0].stnm : "";
    var myChart = echarts.init(document.getElementById(id));
    data.forEach((item) => {
      xdata.push(item.endTime);
      ydata.push(item.avgDrp);
    });
    myChart.setOption({
      title: {
        text: name + "-雨量站雨量变化",
        // subtext: starttm + "至" + endtm,
        // left: 'center',
      },
      grid: {
        top: 90,
        show: true,
        borderColor: "black",
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
          // dataView: { show: true, readOnly: true },
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
        name: "降雨(mm)",
        axisLabel: {
          formatter: (v) => {
            return Number(v).toFixed(1);
          },
        },
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
    if (hourRain instanceof Array) {
      showChart(hourRain, "hourRainDiv", "22", "33");
    }
  }, [hourRain]);
  useEffect(() => {
    if (hourRain instanceof Array) {
      showChart(dayRain, "dayRainDiv", "22", "33");
    }
  }, [dayRain]);
  useEffect(() => {
    if (hourRain instanceof Array) {
      showChart(sevenDayRain, "sevenDayRainDiv", "22", "33");
    }
  }, [sevenDayRain]);
  return (
    <>
      <TableShow
        onRow={(record) => {
          return {
            onClick: () =>
              emitter.emit("map-move-focus", [record.lon, record.lat], 30000),
            onDoubleClick: () => {
              changeModalVisible(true);
              getHourRain(record.siteRain[0].stcd);
              getDayRain(record.siteRain[0].stcd);
              getSevenDayRain(record.siteRain[0].stcd);
            },
          };
        }}
        pageSize={6}
        columns={[
          {
            name: "站名",
            dataIndex: "aliasName",
            filter: "aliasName",
            width: "37%",
            align: "center",
            render: (text) => (
              <Popover content={text.toString()} title="站名全称">
                {text.toString().length > 9
                  ? text.toString().substring(0, 9) + "..."
                  : text.toString()}
              </Popover>
            ),
          },
          {
            name: "1小时(mm)",
            dataIndex: "raindataList",
            width: "13%",
            render: (v) => (v && v[0] ? `${v[0].hourDrp}` : "-"),
            align: "center",
          },
          {
            name: "24小时(mm)",
            dataIndex: "raindataList",
            width: "15%",
            render: (v) => (v && v[0] ? `${v[0].dayDrp}` : "-"),
            align: "center",
          },
          {
            name: "更新时间",
            dataIndex: "raindataList",
            width: "35%",
            render: (v) => (v && v[0] ? v[0].tm.slice(0, -3) : "-"),
            align: "center",
          },
        ]}
        dataSource={dataSource}
      />
      <Modal
        title="雨量详情"
        visible={visible}
        footer={null}
        onCancel={() => changeModalVisible(false)}
        width={1300}
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="一小时" key="1" forceRender>
            <Row>
              <Col span={12}>
                <div id="hourRainDiv" style={{ width: 600, height: 500 }}></div>
              </Col>
              <Col span={12}>
                <Table
                  size="small"
                  rowKey={(row) => row.hourId}
                  columns={[
                    { title: "站名", dataIndex: "stnm" },
                    {
                      title: "1小时",
                      dataIndex: "avgDrp",
                      render: (v) => Number(v).toFixed(1),
                    },
                    {
                      title: "更新时间",
                      dataIndex: "endTime",
                    },
                  ]}
                  dataSource={hourRain}
                />
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="24小时" key="2" forceRender={true}>
            <Row>
              <Col span={12}>
                <div id="dayRainDiv" style={{ width: 600, height: 500 }}></div>
              </Col>
              <Col span={12}>
                <Table
                  size="small"
                  rowKey={(row) => row.hourId}
                  columns={[
                    { title: "站名", dataIndex: "stnm" },
                    {
                      title: "24小时",
                      dataIndex: "avgDrp",
                      render: (v) => Number(v).toFixed(1),
                    },
                    {
                      title: "更新时间",
                      dataIndex: "endTime",
                    },
                  ]}
                  dataSource={dayRain}
                />
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="7天" key="3" forceRender={true}>
            <Row>
              <Col span={12}>
                <div
                  id="sevenDayRainDiv"
                  style={{ width: 600, height: 500 }}
                ></div>
              </Col>
              <Col span={12}>
                <Table
                  size="small"
                  rowKey={(row) => row.hourId}
                  columns={[
                    { title: "站名", dataIndex: "stnm" },
                    {
                      title: "7天",
                      dataIndex: "avgDrp",
                      render: (v) => Number(v).toFixed(1),
                    },
                    {
                      title: "更新时间",
                      dataIndex: "endTime",
                    },
                  ]}
                  dataSource={sevenDayRain}
                />
              </Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    visible: state.handState.visible,
    rain: state.rain.rain,
    hourRain: state.handState.hourRain,
    dayRain: state.handState.dayRain,
    sevenDayRain: state.handState.sevenDayRain,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TabsList);
