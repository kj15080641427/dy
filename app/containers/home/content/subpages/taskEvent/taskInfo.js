import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import * as action from "../../../redux/actions";
import { bindActionCreators } from "redux";
import Map from "../../../../monitor/map/map";
import { Card, Col, Row, Button, Modal } from "antd";
import { createHashHistory } from "history";
import { Link } from "react-router-dom";
import taskTimelineSvg from "../../../../../resource/icon/taskTimeline.png";
import {
  MailOutlined,
  UserOutlined,
  TeamOutlined,
  BuildOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import DYForm from "@app/components/home/form";
import moment from "moment";
import TaskUpdate from "./taskUpdate";
import { offTaskForm } from "./cconfig";
import "./task.scss";
const gutter = [1, 20];
const hashHistory = createHashHistory();
const iconStyle = {
  fontSize: "50px",
  width: "50px",
  height: "50px",
};
const navi = [
  {
    icon: <MailOutlined style={iconStyle} />,
    text: "发消息",
    url: "/taskInfoMessage",
  },
  {
    icon: <UserOutlined style={iconStyle} />,
    text: "专家调度",
    url: "/expertDispatch",
  },
  {
    icon: <TeamOutlined style={iconStyle} />,
    text: "防汛人员调度",
    url: "/userDispatch",
  },
  {
    icon: <BuildOutlined style={iconStyle} />,
    text: "物资调度",
    url: "/materialDispatch",
  },
  {
    icon: <img src={taskTimelineSvg} style={iconStyle} />,
    text: "事件处置动态",
    url: "/taskTimeLine",
  },
];
const TaskInfo = (props) => {
  const { taskInfo, floodUser, floodAddress, feedTaskModalVisible } = props;
  const formRef = useRef(null);
  const {
    getFloodAddress,
    getAllFloodUser,
    setTaskUpdateModal,
    setFeedTaskModal,
    recallTask,
  } = props.actions;
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

  const onOffFinish = (data) => {
    data = { ...data, taskEventsID: taskInfo?.taskEventsID };
    recallTask(data);
  };
  return (
    <div style={{ height: "100%" }}>
      <Map layerVisible={{}} person={person}></Map>
      <TaskUpdate formRef={formRef}></TaskUpdate>
      <div className="task-info-fotter-center">
        <div className="task-info-fotter">
          {navi.map((item) => (
            <Link key={item.text} to={`/home${item.url}`}>
              <div className="task-info-fotter-div">
                <div className="task-info-fotter-message">{item.icon}</div>
                <div className="task-info-fotter-text">{item.text}</div>
              </div>
            </Link>
          ))}
          <a>
            <div
              className="task-info-fotter-div"
              onClick={() => {
                setTaskUpdateModal(true);
                console.log(taskInfo, "taskInfo");
                formRef.current.setFieldsValue({
                  ...taskInfo,
                  happenTime: moment(taskInfo.happenTime),
                });
              }}
            >
              <div className="task-info-fotter-message">
                <SnippetsOutlined style={iconStyle} />
              </div>
              <div className="task-info-fotter-text">事件调整</div>
            </div>
          </a>
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
          <Row gutter={gutter}>
            <Col span={16}>
              上报人及电话:{taskInfo?.reportPersonName}
              {taskInfo?.reportPersonPhone}
            </Col>
            <Col span={8}></Col>
          </Row>
          <Row gutter={gutter}>
            <Col span={5}>事件描述:</Col>
            <Col span={19}> {taskInfo?.remark}</Col>
          </Row>
          <Row>
            <Col span={12}>
              <Button
                onClick={() => {
                  setFeedTaskModal(true);
                  console.log(taskInfo, "--");
                }}
              >
                取消事件
              </Button>
            </Col>
            <Col span={12}>
              <Button onClick={() => {}}>事件已完成</Button>
            </Col>
          </Row>
          <Modal
            visible={feedTaskModalVisible}
            title="事件取消描述"
            footer={null}
            onCancel={() => setFeedTaskModal(false)}
          >
            <DYForm
              formItem={offTaskForm}
              onFinish={onOffFinish}
              showCancel
              cancelClick={() => setFeedTaskModal(false)}
            ></DYForm>
          </Modal>
        </Card>
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(TaskInfo);
