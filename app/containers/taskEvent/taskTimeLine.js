import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/actions/taskEvent";
import { bindActionCreators } from "redux";
import { Card, Timeline, Popover } from "antd";
import { createHashHistory } from "history";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import taskTimelineIcon from "@app/resource/过程.svg";
import taskTimelineHeaderIcon from "@app/resource/事件动态.svg";
import "./task.scss";
const hashHistory = createHashHistory();
const typeList = ["事件新增", "消息发送", "人员调度", "专家调度", "物资调度"];

const TaskTimeLine = (props) => {
  const { getTaskTimeLine } = props.actions;
  const { taskInfo, taskTimeLine } = props;
  const srcoolRef = useRef(null);
  useEffect(() => {
    getTaskTimeLine({ taskEventsID: taskInfo?.taskEventsID });
    srcoolRef.current.scrollTop = 900;
    // window.scrollTo(0, 100);
    console.log(srcoolRef.current, "srcoolRef", srcoolRef);
  }, [taskInfo]);

  const renderTimeLine = (item) => {
    return (
      <div>
        {item.type == 1 ? (
          <div>发送至:{item.peopleNames.length}人</div>
        ) : item.type == 2 || item.type == 3 ? (
          <>
            <br />
            <div>任务状态:</div>
            <div>
              调度人员
              {item.taskDynamicResultStateDo.countNumber}人
            </div>
            <div>已确认 {item.taskDynamicResultStateDo.confirmNumber}人</div>
            <div>已取消 {item.taskDynamicResultStateDo.cancelNumber}人</div>
            <div>
              已确认，已反馈 {item.taskDynamicResultStateDo.feedbackNumber}人
            </div>
            <div>
              未完成已反馈 {item.taskDynamicResultStateDo.noFeedbackNumber}人
            </div>
            <div>已读取 {item.taskDynamicResultStateDo.readNumber}人</div>
            <div>已发送 {item.taskDynamicResultStateDo.sendNumber}人</div>
          </>
        ) : (
          <div>调度{item.peopleNames.length}人</div>
        )}
      </div>
    );
  };

  return (
    <div className="task-info-timeline">
      <div className="task-timeline-div" ref={srcoolRef}>
        <Timeline mode="alternate">
          <Timeline.Item
            style={{ height: "80px" }}
            position="left"
            // label={taskInfo?.happenTime}
            dot={
              <div>
                <img
                  src={taskTimelineHeaderIcon}
                  width="50px"
                  height="50px"
                ></img>
                <div>事件动态</div>
              </div>
            }
          ></Timeline.Item>
          <Timeline.Item
            position="right"
            label={taskInfo?.happenTime}
            dot={<img src={taskTimelineIcon} width="20px" height="20px"></img>}
          >
            <Popover
              content={
                <div>
                  <div>时间：{taskInfo?.happenTime}</div>
                  <div>操作人：{taskInfo?.reportPersonName}</div>
                </div>
              }
              title="事件新增"
            >
              <div
                className="task-timeline-arrow"
                style={{ justifyContent: "flex-end" }}
              >
                <Card className="task-timeline-card">事件新增</Card>
                <CaretRightOutlined style={{ color: "white" }} />
              </div>
            </Popover>
          </Timeline.Item>

          {taskTimeLine?.map((item, index) => {
            const path = index % 2;
            return (
              <Timeline.Item
                dot={
                  <img src={taskTimelineIcon} width="20px" height="20px"></img>
                }
                key={index}
                label={item.time}
                position={path == 0 ? "left" : "right"}
              >
                {path == 0 ? (
                  <>
                    <Popover
                      content={
                        <div>
                          <div>时间：{item.time}</div>
                          <div>操作人：{item.operatorName}</div>
                          <div>
                            {`${typeList[item.type]}内容：${item.content}`}
                          </div>
                          {renderTimeLine(item)}
                          {/* <div>
                            {item.type == 1 ? (
                              <div>发送至:{item.peopleNames.length}人</div>
                            ) : (
                              <div></div>
                            )}
                          </div> */}
                        </div>
                      }
                      title={typeList[item.type]}
                    >
                      <div
                        className="task-timeline-arrow"
                        style={{ justifyContent: "flex-start" }}
                      >
                        <CaretLeftOutlined
                          style={{
                            color:
                              index == taskTimeLine.length - 1
                                ? "#1890ff"
                                : "white",
                          }}
                        />
                        <Card className="task-timeline-card">
                          <div>{typeList[item.type]}</div>
                        </Card>
                      </div>
                    </Popover>
                  </>
                ) : (
                  <>
                    <Popover
                      content={
                        <div>
                          <div>时间：{item.time}</div>
                          <div>操作人：{item.operatorName}</div>
                          <div>{`${typeList[item.type]}内容：${
                            item.content
                          }`}</div>
                          {renderTimeLine(item)}
                        </div>
                      }
                      title={typeList[item.type]}
                    >
                      <div
                        className="task-timeline-arrow"
                        style={{ justifyContent: "flex-end" }}
                      >
                        <Card className="task-timeline-card">
                          <div>{typeList[item.type]}</div>
                        </Card>
                        <CaretRightOutlined
                          style={{
                            color:
                              index == taskTimeLine.length - 1
                                ? "#1890ff"
                                : "white",
                          }}
                        />
                      </div>
                    </Popover>
                  </>
                )}
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    taskTimeLine: state.taskReducers.taskTimeLine,
    taskInfo: state.taskReducers.taskInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskTimeLine);
