import React, { useEffect } from "react";
import emitter from "@app/utils/emitter.js";
import { TableShow } from "../../components/chart/table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/handState";

export const TabsList = (props) => {
  const { dataSource, dayWater } = props;
  const { setVideoInfo } = props.actions;

  useEffect(() => {
    if (dayWater instanceof Array) {
      // showChart(dayWater, "dayWaterDiv");
    }
  }, [dayWater]);

  return (
    <>
      <TableShow
        pageSize={6}
        onRow={(record) => {
          return {
            onClick: () => {
              console.log(record.lon, record.lat);
              emitter.emit("map-move-focus", [record.lon, record.lat], 3000);
            },
            onDoubleClick: () => {
              // changeModalVisible(true);
              // getDayWater(record.siteWaterLevels[0].stcd);
            },
          };
        }}
        columns={[
          { name: "站名", dataIndex: "strname", filter: "name" },
          {
            name: "状态",
            sorter: (a, b) => a.isOnline - b.isOnline,
            dataIndex: "isOnline",
            width: "20%",
            render: (v) =>
              v == "0" ? <a>在线</a> : <a style={{ color: "red" }}>离线</a>,
          },
          {
            name: "操作",
            dataIndex: "",
            width: "20%",
            render: (row) => (
              <a
                onClick={() => {
                  console.log(row);
                  setVideoInfo(row);
                }}
              >
                播放
              </a>
            ),
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
