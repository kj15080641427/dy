import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as action from "../../../redux/actions";
import { bindActionCreators } from "redux";
import Map from "../../../../monitor/map/map";
import { Input, TreeSelect } from "antd";
import trackQuery from "../../../../../resource/icon/trackQuery.svg";
import trackQuery2 from "../../../../../resource/icon/trackQuery2.svg";
import trackTime from "../../../../../resource/icon/trackTime.svg";
import emitter from "@app/utils/emitter.js";
const { Search } = Input;

const a = [
  {
    age: 39,
    createTime: "2020-05-30 15:13:00",
    deviceSerial: "18159774272",
    floodId: 4633,
    floodRanksId: 3,
    grade: "4",
    id: 1,
    isShow: "0",
    latitude: 37.434,
    longitude: 118.5552,
    lonlat: (2)[(118.5552, 37.434)],
    name: "张正华",
    parent: null,
    phone: "18159774272",
    positionTime: "2020-05-24 22:19:44",
    quality: 12,
    remark: "第一组",
    reportTime: "2020-05-24 11:21:17",
    sex: "1",
    type: "Point",
    unit: "南水北调",
    userId: null,
  },
  {
    age: 39,
    createTime: "2020-05-30 15:13:00",
    deviceSerial: "18159774272",
    floodId: 4633,
    floodRanksId: 3,
    grade: "4",
    id: 1,
    isShow: "0",
    latitude: 39.434,
    longitude: 120.5552,
    lonlat: (2)[(118.5552, 37.434)],
    name: "张正华",
    parent: null,
    phone: "18159774272",
    positionTime: "2020-05-24 22:19:44",
    quality: 12,
    remark: "第一组",
    reportTime: "2020-05-24 11:21:17",
    sex: "1",
    type: "Point",
    unit: "南水北调",
    userId: null,
  },
];

const TrackQuery = (props) => {
  const {
    getFloodAddress,
    getAllFloodUser,
    getFloodExpert,
    setTaskUpdateModal,
    setFeedTaskModal,
    recallTask,
  } = props.actions;
  const { floodUser, floodAddress } = props;

  let init = [];
  const [person, stPerson] = useState([]);

  useEffect(() => {
    let a = [];
    if (floodUser && floodAddress) {
      floodUser?.map((item) => {
        floodAddress?.records?.map((t) => {
          if (item.userid === t.userid) {
            a.push({ ...item, ...t });
            stPerson([...person, { ...item, ...t }]);
            return;
          }
        });
      });
      console.log(a, "AAAAAA");
    }
    return () => {
      stPerson([]);
    };
  }, [floodUser, floodAddress]);

  useEffect(() => {
    getFloodAddress();
    getAllFloodUser();
    getFloodExpert();
  }, []);
  const onSearch = (value) => {
    if (value) {
      let filteredList = person.filter((item) => {
        return item.name.indexOf(value) !== -1;
      });
      stPerson(filteredList);
      filteredList.map((item) => {
        emitter.emit("map-move-focus", [item.longitude, item.latitude], 3000);
      });
    } else {
      stPerson(init);
    }
  };
  return (
    <div className="track-query-box">
      <div className="track-query-body">
        <Search  onSearch={onSearch} suffix={trackQuery}></Search>
        <img className="track-query-icon" src={trackQuery}></img>
      </div>
      <Map layerVisible={{}} person={person} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    feedTaskModalVisible: state.taskReducers.feedTaskModalVisible,
    floodAddress: state.management.floodAddress,
    taskInfo: state.management.taskInfo,
    floodUser: state.mapAboutReducers.floodUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TrackQuery);
