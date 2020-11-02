import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/actions/taskEvent";
import { bindActionCreators } from "redux";
import { Card, Tabs, Timeline } from "antd";
import { createHashHistory } from "history";
import PageHeader from "./component/pageHeader";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import "./task.scss";
const hashHistory = createHashHistory();
const text = {
  调度物资: "个防汛物资",
  调度防汛人员: "名防汛人员",
  调度防汛专家: "名防汛专家",
};
const TaskTimeLine = (props) => {
  const { getTaskTimeLine } = props.actions;
  const { taskInfo, taskTimeLine } = props;

  useEffect(() => {
    if (taskInfo) {
      getTaskTimeLine({ taskEventsID: taskInfo?.taskEventsID });
    } else {
      hashHistory.push("/taskList");
    }
  }, []);
  return (
    <>
      {/* <PageHeader></PageHeader>
      <Tabs>
        <Tabs.TabPane key="1" tab="事件处置动态"> */}
      <div className="">
        <Timeline mode="alternate">
          <Timeline.Item position="right" label={taskInfo?.happenTime}>
            <Card className="task-timeline-card" title={"事件创建"}>
              {taskInfo?.name}
            </Card>
          </Timeline.Item>
          {taskTimeLine?.map((item, index) => {
            const path = index % 2;
            return (
              <Timeline.Item
                key={index}
                label={item.createTime}
                position={path == 0 ? "left" : "right"}
              >
                <div className="task-timeline-arrow">
                  {path == 0 ? (
                    <>
                      <CaretLeftOutlined />
                      <Card
                        className="task-timeline-card"
                        title={item.operationTypeName}
                      >
                        {`调度${item.number}${text[item.operationTypeName]}`}
                      </Card>
                    </>
                  ) : (
                    <>
                      <Card
                        className="task-timeline-card"
                        title={item.operationTypeName}
                      >
                        {`调度${item.number}${text[item.operationTypeName]}`}
                      </Card>
                      <CaretRightOutlined />
                    </>
                  )}
                </div>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
      {/* </Tabs.TabPane>
      </Tabs> */}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    taskTimeLine: state.taskReducers.taskTimeLine,
    taskInfo: state.management.taskInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskTimeLine);
