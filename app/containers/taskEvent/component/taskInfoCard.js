import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../../../redux/actions/taskEvent";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { Card, Col, Row, Button, Modal, Statistic, Space } from "antd";
import {AppstoreOutlined, AlignCenterOutlined, HeatMapOutlined} from '@ant-design/icons';
import taskListIcon from "@app/resource/事件中心.svg";
import DYForm from "@app/components/home/form";
import { offTaskForm } from "../cconfig";
import { taskChart } from "../../../components/chart/chart";
import state1 from "@app/resource/未处理.svg";
import state2 from "@app/resource/处理中.svg";
import state3 from "@app/resource/已处理.svg";
import state4 from "@app/resource/已终止.svg";

import "../task.scss";

const gutter = [1, 20];

const grade = ["一级", "二级", "三级"];
const source = ["新增事件", "险情上报", "预警告警"];
const state = [state1, state2, state3, state4];
const TaskInfoCard = (props) => {
  const [title, setTitle] = useState("");

  const {
    taskInfo,
    feedTaskModalVisible,
    taskCountSource,
    taskCountGrade,
    taskCountState,
  } = props;
  const {
    setFeedTaskModal,
    endTask,
    getTaskCountSource,
    getTaskCountGrade,
    getTaskCountState,
  } = props.actions;

  useEffect(() => {
    getTaskCountSource();
    getTaskCountGrade();
    getTaskCountState();
  }, []);

  useEffect(() => {
    let sourceList = taskCountSource.map((item, index) => ({
      name: item.taskName,
      value: item.number,
      itemStyle: {
        color: index == 0 ? "red" : "blue",
      },
    }));

    let gradeList = taskCountGrade.map((item) => ({
      name: item.taskName,
      value: item.number,
      itemStyle: {
        color: item.taskkey == 1 ? "red" : item.taskkey == 2 ? "green" : "blue",
      },
    }));

    let stateList = taskCountState.map((item, index) => ({
      name: item.taskName,
      value: item.number,
      itemStyle: {
        color: index == 1 ? "red" : index == 2 ? "green" : "blue",
      },
    }));
    // stateList
    // let a = stateList[0];
    // stateList[0] = stateList[2];
    // stateList[2] = a;
    // taskChart("stateChart", stateList, "状态");
    // taskChart("sourceChart", sourceList, "来源");
    // taskChart("gradeChart", gradeList.reverse(), "等级");
  }, [taskCountSource, taskCountGrade, taskCountState]);

  const onOffFinish = (data) => {
    data = { ...data, taskEventsID: taskInfo?.taskEventsID };
    endTask({ param: data, eventType: title });
  };

  return (
      <>
        <div className={'task-info-statistics-modal-center'}>
          <div className={'task-info-statistics-modal'}>
            <Space size={40}>
              <Link to="/taskList" className="task-event-flex">
                <div>
                  <img src={taskListIcon} width="100px" height="60px"/>
                  <div>事件中心</div>
                </div>
              </Link>
              <Statistic title={'未处理'} value={20} valueStyle={{fontSize: '24px', color:'red'}} prefix={<AppstoreOutlined style={{fontSize: '12px'}} />}/>
              <Statistic title={'完成'} valueStyle={{fontSize: '24px', color:'green'}} value={20} prefix={<AlignCenterOutlined style={{fontSize: '12px'}} />} />
              <Statistic title={'取消'} valueStyle={{fontSize: '24px', color:'orange'}} value={20} prefix={<HeatMapOutlined style={{fontSize: '12px'}} />}/>
            </Space>
          </div>
        </div>

        <div className="task-info-modal">
          <div className="task-event-info-card">
            {/*<Card>*/}
            {/*<div className="task-event-chart">*/}
            {/*  <Link to="/taskList" className="task-event-flex">*/}
            {/*    <div>*/}
            {/*      <img src={taskListIcon} width="100px" height="100px"></img>*/}
            {/*      <div>事件中心</div>*/}
            {/*    </div>*/}
            {/*  </Link>*/}
            {/*  <div className="task-event-flex">*/}
            {/*    <div className="task-event-card-head" id="stateChart"></div>*/}
            {/*    /!* <div>事件状态统计</div> *!/*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*<div className="task-event-chart">*/}
            {/*  <div className="task-event-flex">*/}
            {/*    <div className="task-event-card-head" id="gradeChart"></div>*/}
            {/*    /!* <div> 事件等级统计</div> *!/*/}
            {/*  </div>*/}
            {/*  <div className="task-event-flex">*/}
            {/*    <div className="task-event-card-head" id="sourceChart"></div>*/}
            {/*    /!* <div> 事件来源统计</div> *!/*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*</Card>*/}
            {/*<br />*/}
            <Card
                title={taskInfo?.name}
                className="task-left-card">

              <img
                  src={state[taskInfo?.state]}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    width: "100px",
                    height: "100px",
                  }}
              />
              <Row gutter={gutter}>
                <Col span={5}>发生时间:</Col>
                <Col span={19}>{taskInfo?.happenTime}</Col>
              </Row>
              <Row gutter={gutter}>
                <Col span={5}>事件等级:</Col>
                <Col span={19}>{grade[taskInfo?.grade - 1]}</Col>
              </Row>
              <Row gutter={gutter}>
                <Col span={5}>事件来源:</Col>
                <Col span={19}>{source[taskInfo?.dataSource]}</Col>
              </Row>
              <Row gutter={gutter}>
                <Col span={5}>区域位置:</Col>
                <Col span={19}>{taskInfo?.address}</Col>
              </Row>
              <Row gutter={gutter}>
                <Col span={16}>
                  联系人及电话:{taskInfo?.reportPersonName}&nbsp;
                  {taskInfo?.reportPersonPhone}
                </Col>
                <Col span={8}></Col>
              </Row>
              <Row gutter={gutter}>
                <Col span={5}>事件详情:</Col>
                <Col span={19} className="task-card-srcoll">
                  {" "}
                  {taskInfo?.remark}
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div>
                    <Button
                        onClick={() => {
                          setTitle("终止事件");
                          setFeedTaskModal(true);
                        }}
                        disabled={taskInfo?.state == 3}
                        type={"primary"} >
                      取消
                    </Button>
                    <Button
                        onClick={() => {
                          setTitle("完成事件");
                          setFeedTaskModal(true);
                        }}
                        type="primary"
                        disabled={taskInfo?.state == 3}
                    >
                      完成
                    </Button>
                  </div>
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
                />
              </Modal>
            </Card>
          </div>
        </div>
      </>
  );
};
const mapStateToProps = (state) => {
  // console.log(state.taskReducers.taskInfo);
  return {
    feedTaskModalVisible: state.taskReducers.feedTaskModalVisible,
    taskInfo: state.taskReducers.taskInfo,
    taskCountSource: state.taskReducers.taskCountSource,
    taskCountGrade: state.taskReducers.taskCountGrade,
    taskCountState: state.taskReducers.taskCountState,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskInfoCard);
