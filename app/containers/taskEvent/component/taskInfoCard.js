import React, { useState } from "react";
import { connect } from "react-redux";
import * as action from "../../../redux/actions/taskEvent";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { Card, Col, Row, Button, Modal } from "antd";
import taskListIcon from "../../../resource/事件中心.svg";
import DYForm from "@app/components/home/form";
import { offTaskForm } from "../cconfig";
import { pieChart } from "../../../components/chart/chart";
import "../task.scss";

const gutter = [1, 20];

const TaskInfoCard = (props) => {
  const [title, setTitle] = useState("");

  const { taskInfo, feedTaskModalVisible } = props;
  const { setFeedTaskModal, endTask } = props.actions;

  // const {
  //   name,
  //   happenTime,
  //   address,
  //   reportPersonName,
  //   reportPersonPhone,
  //   remark,
  // } = taskInfo;

  const onOffFinish = (data) => {
    data = { ...data, taskEventsID: taskInfo?.taskEventsID };
    endTask({ param: data, eventType: title });
  };

  return (
    <div className="task-info-modal">
      <div className="task-event-info-card">
        <Card>
          <div className="task-event-chart">
            <Link to="/taskList" className="task-event-flex">
              <img src={taskListIcon}></img>
              <div>事件中心</div>
            </Link>
            <div className="task-event-card-head" id='statuChart'>事件状态统计</div>
            <div>事件等级统计</div>
            <div>事件来源统计</div>
          </div>
        </Card>
        <br />
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
              上报人及电话:{taskInfo?.reportPersonName}&nbsp;
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
                  setTitle("终止事件");
                  setFeedTaskModal(true);
                }}
              >
                终止事件
              </Button>
            </Col>
            <Col span={12}>
              <Button
                onClick={() => {
                  setTitle("完成事件");
                  setFeedTaskModal(true);
                }}
              >
                事件已处置
              </Button>
            </Col>
          </Row>
          <Modal
            visible={feedTaskModalVisible}
            title={title}
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
    taskInfo: state.taskReducers.taskInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskInfoCard);
