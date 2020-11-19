import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as action from "../../../redux/actions";
import { bindActionCreators } from "redux";
import Map from "../../../../monitor/map/map";
import { Input, TreeSelect } from "antd";
import trackQuery from "@app/resource/icon/trackQuery.svg";
// import trackQuery2 from "../../../../../resource/icon/trackQuery2.svg";
// import trackTime from "../../../../../resource/icon/trackTime.svg";
import emitter from "@app/utils/emitter.js";
const { Search } = Input;

const TrackQuery = (props) => {
  const {
    getFloodAddress,
    getAllFloodUser,
    getFloodExpert,
    // setTaskUpdateModal,
    // setFeedTaskModal,
    // recallTask,
  } = props.actions;
  const { floodUser, floodAddress } = props;
  let init = floodUser;
  // let init = [];
  const [person, setPerson] = useState(floodUser);

  useEffect(() => {
    // if (floodUser && floodAddress) {
    //   floodUser?.map((item) => {
    //     floodAddress?.records?.map((t) => {
    //       if (item.userid === t.userid) {
    //         init.push({ ...item, ...t });
    //         setPerson([...person, { ...item, ...t }]);
    //         return;
    //       }
    //     });
    //   });
    // }
    // return () => {
    //   setPerson([]);
    // };
    setPerson(floodUser);
  }, [floodUser, floodAddress]);

  useEffect(() => {
    getFloodAddress();
    getAllFloodUser();
    getFloodExpert();
  }, []);
  const onSearch = (value) => {
    if (value) {
      let filteredList = init.filter((item) => {
        return item.name.indexOf(value) !== -1;
      });
      setPerson(filteredList);
      // filteredList.map((item) => {
      //   emitter.emit("map-move-focus", [item.longitude, item.latitude], 3000);
      // });
    } else {
      setPerson(init);
    }
  };
  return (
    <div className="track-query-box">
      <div className="track-query-body">
        <Search onSearch={onSearch} suffix={trackQuery}></Search>
        {/* <img className="track-query-icon" src={trackQuery}></img> */}
      </div>
      <Map layerVisible={{}} person={person} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    feedTaskModalVisible: state.taskReducers.feedTaskModalVisible,
    floodAddress: state.taskReducers.floodAddress,
    taskInfo: state.taskReducers.taskInfo,
    floodUser: state.mapAboutReducers.floodUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TrackQuery);
