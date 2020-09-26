import React, { useEffect } from "react";
import emitter from "@app/utils/emitter.js";
import { TableShow } from "../../components/chart/table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Modal, Row, Col, Tabs, Table, Popover } from "antd";
import * as actions from "../../redux/actions/handState";
import * as mapActions from "../../redux/actions/map";
import echarts from "echarts/lib/echarts";

export const TabsList = (props) => {
  const { visible, dataSource, dayWater } = props;
  const { changeModalVisible, getDayWater, getDsplayWater } = props.actions;
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
      showChart(dayWater, "dayWaterDiv");
    }
  }, [dayWater]);

  return (
    <>
      <TableShow
        onRow={(record) => {
          return {
            onClick: () => {
              changeWaterId({
                id: record?.siteWaterLevels[0]?.stcd,
                name: record.name,
              });
              emitter.emit("map-move-focus", [record.lon, record.lat], 30000);
              getDsplayWater(record.siteWaterLevels[0]?.stcd);
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
            render: (name) => (
              <Popover content={name}>
                {name?.length > 9
                  ? name.toString().substring(0, 9) + "..."
                  : name}
              </Popover>
            ),
          },
          {
            name: "实时水位",
            dataIndex: "riverwaterdataList",
            // width: "10%",
            render: (v) => (v && v[0] ? v[0].z : "-"),
          },
          {
            name: "更新时间",
            dataIndex: "riverwaterdataList",
            // width: "45%",
            render: (v) => (v && v[0] ? v[0].tm : "-"),
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
                    { title: "站名", dataIndex: "stnm" },
                    {
                      title: "水位",
                      dataIndex: "z",
                    },
                    {
                      title: "更新时间",
                      dataIndex: "tm",
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
