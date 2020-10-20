import React, { useEffect } from "react";
import emitter from "@app/utils/emitter.js";
import { TableShow } from "../../components/chart/table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Modal, Row, Col, Tabs, Table } from "antd";
import * as actions from "../../redux/actions/handState";
import * as mapActions from "../../redux/actions/map";
import echarts from "echarts/lib/echarts";
import moment from "moment";
export const TabsList = (props) => {
  const { visible, dataSource, dayWater } = props;
  const { changeModalVisible, getDayWater, changeWaterVideo } = props.actions;
  const { changeWaterId } = props.mapActions;
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
        text: name + "-水位变化",
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
        name: "水位（mm）",
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
      showChart(dayWater.reverse(), "dayWaterDiv");
    }
  }, [dayWater]);

  return (
    <>
      <TableShow
        onRow={(record) => {
          return {
            onClick: () => {
              changeWaterId(
                {
                  id: record?.siteWaterLevels[0]?.stcd,
                  name: record.name,
                },
                changeWaterVideo(record)
              );
              emitter.emit("map-move-focus", [record.lon, record.lat], 3000);
            },
            onDoubleClick: () => {
              changeModalVisible(true);
              getDayWater(record.siteWaterLevels[0]?.stcd);
            },
          };
        }}
        columns={[
          {
            name: "站名",
            dataIndex: "name",
            filter: "name",
            width: "40%",
          },
          {
            name: "实时水位",
            dataIndex: "z",
            width: "15%",
            render: (v) => (v ? v : "-"),
            sorter: (a, b) => a.z - b.z,
          },
          {
            name: "更新时间",
            dataIndex: "tm",
            width: "25%",
            render: (v) => (v ? v.slice(0, -3) : "-"),
            sorter: (a, b) => {
              console.log(moment(a.tm));
              return moment(a.tm).unix() - moment(b.tm).unix();
            },
          },
        ]}
        dataSource={dataSource}
      />
      <Modal
        title="水位详情"
        visible={visible}
        footer={null}
        onCancel={() => changeModalVisible(false)}
        width={1300}
      >
        <Tabs defaultActiveKey="1" style={{ color: "black" }}>
          <Tabs.TabPane
            tab="24小时"
            key="1"
            forceRender={true}
            style={{ color: "black" }}
          >
            <Row>
              <Col span={12}>
                <div id="dayWaterDiv" style={{ width: 600, height: 500 }}></div>
              </Col>
              <Col span={12}>
                <Table
                  size="small"
                  rowKey={(row) => row.riverwaterdataID}
                  columns={[
                    {
                      title: "站名",
                      dataIndex: "stnm",
                      width: "40%",
                      textWrap: "word-break",
                    },
                    {
                      title: "水位",
                      dataIndex: "z",
                      width: "20%",
                      textWrap: "word-break",
                    },
                    {
                      title: "更新时间",
                      dataIndex: "tm",
                      width: "20%",
                      textWrap: "word-break",
                    },
                  ]}
                  dataSource={dayWater}
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
    dayWater: state.handState.dayWater,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    mapActions: bindActionCreators(mapActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TabsList);
