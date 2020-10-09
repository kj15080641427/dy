import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as action from "../../../redux/actions";
import { bindActionCreators } from "redux";
import Map from "../../../../monitor/map/map";
import { Card, Col, Row } from "antd";
import { createHashHistory } from "history";
import { Link } from "react-router-dom";
import "./task.scss";
const gutter = [1, 20];
const hashHistory = createHashHistory();
const navi = [
  { icon: "", text: "发消息", url: "/message" },
  { icon: "", text: "专家调度", url: "/expertDispatch" },
  { icon: "", text: "防汛人员调度", url: "/" },
  { icon: "", text: "物资调度", url: "/" },
  { icon: "", text: "事件调整", url: "/" },
];
const TaskInfo = (props) => {
  const { taskInfo, floodUser, floodAddress } = props;
  const { getFloodAddress, getAllFloodUser } = props.actions;
  const [person, stPerson] = useState([]);

  useEffect(() => {
    if (!taskInfo) {
      hashHistory.push("/home/taskList");
    }
    getFloodAddress();
    getAllFloodUser();
  }, []);
  useEffect(() => {
    if (floodUser && floodAddress) {
      floodUser?.map((item) => {
        floodAddress?.records?.map((t) => {
          if (item.phone == t.deviceSerial) {
            stPerson([...person, { ...item, ...t }]);
          }
        });
      });
    }
    return () => {
      stPerson([]);
    };
  }, [floodUser, floodAddress]);
  return (
    <React.Fragment>
      <Map layerVisible={{}} person={person}></Map>

      <div className="task-info-fotter-center">
        <div className="task-info-fotter">
          {navi.map((item) => (
            <Link key={item.text} to={`/home${item.url}`}>
              <div
                className="task-info-fotter-div"
                // onClick={() => hashHistory.push(`/home${item.url}`)}
              >
                <div className="task-info-fotter-message"></div>
                <div className="task-info-fotter-text">{item.text}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="task-info-modal">
        <Card title="事件信息">
          <Row gutter={gutter}>
            <Col span={5}>事件名称:</Col>
            <Col span={19}>{taskInfo?.name}</Col>
          </Row>
          <Row gutter={gutter}>
            <Col span={5}>发生时间:</Col>
            <Col span={19}>{taskInfo?.happenTime}</Col>
          </Row>
          <Row gutter={gutter}>
            <Col span={5}>区域位置:</Col>
            <Col span={19}>{taskInfo?.address}</Col>
          </Row>
          {/* <Row gutter={gutter}>
            <Col span={10}>上报人及电话:</Col>
            <Col span={14}>111111</Col>
          </Row> */}
          <Row gutter={gutter}>
            <Col span={5}>事件描述:</Col>
            <Col span={19}> {taskInfo?.remark}</Col>
          </Row>
        </Card>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
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
export default connect(mapStateToProps, mapDispatchToProps)(TaskInfo);
