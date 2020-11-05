import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/actions/taskEvent";
import * as mapAction from "../../redux/actions/map";
import { bindActionCreators } from "redux";

import Map from "./map/map";
import { Input } from "antd";
import { createHashHistory } from "history";
import trackQuery from "@app/resource/icon/trackQuery.svg";
import TaskTimeLine from "./taskTimeLine";
import TaskUpdate from "./taskUpdate";
import Head from "../../components/head/head";
import titleImg from "@app/resource/title/rwdd.png";
import RouterList from "../../components/routerlist";
import TaskInfoNavi from "./component/taskInfoNavi";
import TaskInfoCard from "./component/taskInfoCard";
import TaskInfoCheck from "./component/taskInfoCheck";
import "./task.scss";
const hashHistory = createHashHistory();
const { Search } = Input;

const TaskInfo = (props) => {
  const {
    taskInfo,
    floodUser,
    floodAddress,
    expert,
    userPosition,
    taskList,
  } = props;
  const formRef = useRef(null);
  const {
    getFloodAddress,
    getAllFloodUser,
    setMapUserPosition, //设置人员定位
    getTaskList,
    setTaskInfo,
  } = props.actions;
  const { getFloodRankUser, getFloodExpert } = props.mapActions;

  const [text, setText] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    getTaskList({
      current: 1,
      size: 10,
    });
    getFloodAddress(); //人员定位
    getAllFloodUser(); //防汛人员
    getFloodRankUser(); //防汛队伍
    getFloodExpert(); //防汛专家
  }, []);
  useEffect(() => {
    console.log(props);
    if (props?.location?.query?.info) {
      setTaskInfo(props?.location?.query?.info);
    } else {
      if (taskList) {
        setTaskInfo(taskList?.records[0]);
      }
    }
  }, [taskList]);
  let init = [...floodUser, ...expert?.all];
  // let init = [];

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
    setMapUserPosition([]);
  }, [floodUser, floodAddress]);

  const onSearch = (value) => {
    if (value) {
      let filteredList = init.filter((item) => {
        return item.name.indexOf(value) !== -1;
      });
      setMapUserPosition(filteredList);
    } else {
      setMapUserPosition(init);
    }
  };
  return (
    <div style={{ height: "100%" }}>
      <div style={{ height: "90px", background: "#003366" }}></div>
      <div
        style={{
          height: "100%",
          width: "100px",
          background: "#003366",
          position: "absolute",
          right: "0px",
          zIndex: "9",
        }}
      ></div>
      <Map layerVisible={{}} person={userPosition}></Map>
      <Head titleImg={titleImg} />
      <RouterList />
      <div className="track-query-body">
        {showSearch ? (
          <Search
            onMouseEnter={() => setShowSearch(true)}
            placeholder="请输入查询人名称"
            onSearch={onSearch}
            onChange={(e) => setText(e.target.value)}
            suffix={
              <img
                width="30px"
                height="30px"
                style={{ cursor: "pointer" }}
                src={trackQuery}
                onClick={() => {
                  onSearch(text);
                }}
              ></img>
            }
          ></Search>
        ) : null}
        <img
          src={trackQuery}
          onMouseEnter={() => setShowSearch(true)}
          onMouseOut={() => {
            setShowSearch(false);
          }}
        ></img>
      </div>
      <TaskTimeLine></TaskTimeLine>
      <TaskUpdate formRef={formRef}></TaskUpdate>
      <TaskInfoNavi formRef={formRef} />
      <TaskInfoCard />
      <TaskInfoCheck />
    </div>
  );
};
const mapStateToProps = (state) => {
  // console.log(state, "S");
  return {
    floodAddress: state.taskReducers.floodAddress,
    taskInfo: state.taskReducers.taskInfo,
    floodUser: state.mapAboutReducers.floodUser,
    expert: state.mapAboutReducers.expert,
    userPosition: state.taskReducers.userPosition,
    taskList: state.taskReducers.taskList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
    mapActions: bindActionCreators(mapAction, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskInfo);
