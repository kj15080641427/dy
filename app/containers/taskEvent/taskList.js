import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/actions/taskEvent";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import {
  Modal,
  Button,
  Input,
  Pagination,
  Card,
  Popover,
  Select,
  Tabs,
  DatePicker,
  Table,
} from "antd";
import DYForm from "@app/components/home/form";
import moment from "moment";
import "./task.scss";
import { taskListform } from "./cconfig";
import Head from "../../components/head/head";
import titleImg from "@app/resource/title/rwdd.png";
import RouterList from "../../components/routerlist";
import state1 from "@app/resource/未处理.svg";
import state2 from "@app/resource/处理中.svg";
import state3 from "@app/resource/已处理.svg";
import state4 from "@app/resource/已终止.svg";
import jimg from "@app/resource/箭头.svg";
const stateImg = [state1, state2, state3, state4];
const gradeElement = ["一级", "二级", "三级"];
const taskSourceColor = ["新增事件", "险情上报", "超预警"];
const dangerType = {
  26: "河流水位",
  27: "城市积水",
  28: "设备问题",
  29: "其他",
};

const TaskList = (props) => {
  const {
    taskList,
    taskModalVisible,
    taskInput,
    taskDanger,
    taskdangerModalVisible,
    taskWarning,
  } = props;
  const {
    getTaskList,
    addTaskEvent,
    setModalVislble,
    changeTaskInput,
    setTaskInfo,
    getTaskDanger,
    setTaskDangerModal,
    getTaskWarning,
  } = props.actions;
  const formRef = useRef(null);
  const [page, setPage] = useState(1);
  const [danger, setDanger] = useState({});
  const [showDanger, setShowDanger] = useState(false);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    getTaskWarning({});
    getTaskDanger({});
    getTaskList({
      current: 1,
      name: taskInput,
      size: 6,
    });
  }, []);

  const onFinish = (form) => {
    form = {
      ...form,
      happenTime: moment(form.happenTime).format("YYYY-MM-DD HH:mm:ss"),
      dataSource: 0,
    };
    addTaskEvent(form);
    setTaskDangerModal(false);
  };

  return (
    <div style={{ background: "#003366" }} className="task-list-body">
      <div className="top-bacground"></div>
      <div className="right-background"></div>
      <Head titleImg={titleImg} />
      <RouterList />
      <div className="task-card-container">
        <Tabs defaultActiveKey="1" type="card">
          <Tabs.TabPane key="1" tab="事件中心" className="task-body-border">
            <div className="task-list-head">
              <div className="task-list-head-div">
                事件名称：
                <Input
                  onPressEnter={() =>
                    getTaskList({
                      current: 1,
                      name: taskInput,
                      size: 6,
                    })
                  }
                  value={taskInput}
                  onChange={(e) => changeTaskInput(e.target.value)}
                ></Input>
                &nbsp; 事件等级：
                <Select
                  defaultValue={""}
                  onChange={(e) =>
                    getTaskList({ current: 1, grade: e, size: 6 })
                  }
                >
                  <Select.Option value={""}>全部</Select.Option>
                  <Select.Option value={1}>一级</Select.Option>
                  <Select.Option value={2}>二级</Select.Option>
                  <Select.Option value={3}>三级</Select.Option>
                </Select>
                <Button
                  type="primary"
                  onClick={() => {
                    setModalVislble(true);
                  }}
                >
                  新增事件
                </Button>
              </div>
            </div>
            <div className="task-list-card">
              {taskList?.records?.map((item) => {
                return (
                  <div key={item.taskEventsID} className="task-list-card-item">
                    <Card
                      className="task-list-card-item-card"
                      title={
                        <div className="task-list-card-title">
                          <div>{item.name}</div>
                        </div>
                      }
                    >
                      <img
                        src={stateImg[item.state]}
                        className="task-list-card-img"
                      ></img>
                      <div className="task-list-card-text-margin">
                        <div className="task-list-card-text-span"></div>
                        <div>
                          {" "}
                          事件等级：
                          <span
                            style={{
                              color:
                                item.grade == "1"
                                  ? "red"
                                  : item.grade == "2"
                                  ? "green"
                                  : "blue",
                            }}
                          >
                            {gradeElement[item.grade - 1]}
                          </span>
                        </div>
                      </div>
                      <div className="task-list-card-text-margin">
                        <div className="task-list-card-text-span"></div>
                        <div> 事件来源：{taskSourceColor[item.dataSource]}</div>
                      </div>
                      <div className="task-list-card-text-margin">
                        <div className="task-list-card-text-span"></div>
                        <div> 事件区域：{item.address}</div>
                      </div>
                      <div className="task-list-card-text-margin">
                        <div className="task-list-card-text-span"></div>
                        <div>事件时间：{item.happenTime?.substring(0, 16)}</div>
                      </div>
                      <div className="task-list-card-text-margin">
                        <div>
                          <div className="task-list-card-text-margin">
                            <div className="task-list-card-text-span"></div>
                            <div>事件描述：</div>
                          </div>
                          <div className="task-list-card-remark">
                            &nbsp;&nbsp; &nbsp;&nbsp;{" "}
                            <Popover content={item.remark}>
                              {item.remark}
                            </Popover>
                          </div>
                        </div>
                      </div>
                      <Link
                        className="task-list-card-footer"
                        onClick={() => {
                          setTaskInfo(item);
                        }}
                        to={{ pathname: "/taskInfo", query: { info: item } }}
                      >
                        事件详情
                      </Link>
                    </Card>
                  </div>
                );
              })}
            </div>
            <Modal visible={taskModalVisible} footer={null} closable={false}>
              <DYForm
                formItem={taskListform}
                onFinish={onFinish}
                showCancel
                cancelClick={() => setModalVislble(false)}
              ></DYForm>
            </Modal>
            <Pagination
              className="task-list-pagination"
              current={page}
              defaultPageSize={6}
              // pageSize={6}
              // hideOnSinglePage
              total={taskList?.total}
              onChange={(page) => {
                setPage(page);
                getTaskList({
                  current: page,
                  name: taskInput,
                  size: 6,
                });
              }}
            ></Pagination>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="险情上报" className="task-body-border">
            <div className="task-list-head">
              <div className="task-list-head-div">
                上报日期：
                <DatePicker
                  onChange={(e) => {
                    let start = moment(e).format("YYYY-MM-DD 00:00:00");
                    let end = moment(e).format("YYYY-MM-DD 23:59:00");
                    getTaskDanger({ endtm: end, starttm: start });
                  }}
                ></DatePicker>
                <Button onClick={() => getTaskDanger({})}>重置</Button>
              </div>
            </div>
            {/* card */}
            <div className="task-list-card">
              {taskDanger?.map((item) => {
                return (
                  <div key={item.taskEventsID} className="task-list-card-item">
                    <Card
                      className="task-list-card-item-card"
                      title={
                        <div className="task-list-card-title">
                          <div>{dangerType[item.stateRelationID]}</div>
                        </div>
                      }
                    >
                      <div className="task-list-card-text-margin">
                        <div className="task-list-card-text-span"></div>
                        <div>上报时间：{item.createTime?.substring(0, 16)}</div>
                      </div>
                      <div className="task-list-card-text-margin">
                        <div className="task-list-card-text-span"></div>
                        <div> 事件区域：{item.address}</div>
                      </div>
                      <div className="task-list-card-text-margin">
                        <div className="task-list-card-text-span"></div>
                        <div> 上报人：{item.user}</div>
                      </div>
                      <div className="task-list-card-text-margin">
                        <div className="task-list-card-text-span"></div>
                        <div> 联系电话：{item.phone}</div>
                      </div>
                      <div className="task-list-card-text-margin">
                        <div>
                          <div className="task-list-card-text-margin">
                            <div className="task-list-card-text-span"></div>
                            <div>事件描述：</div>
                          </div>
                          <div className="task-list-card-remark">
                            &nbsp;&nbsp; &nbsp;&nbsp;{" "}
                            <Popover content={item.resultCount}>
                              {item.resultCount}
                            </Popover>
                          </div>
                        </div>
                      </div>
                      <Link
                        className="task-list-card-footer"
                        onClick={() => {
                          setTaskDangerModal(true);
                          setDanger(item);
                          // setTaskInfo(item);
                        }}
                        // to={{ pathname: "/taskInfo", query: { info: item } }}
                      >
                        事件详情
                      </Link>
                    </Card>
                  </div>
                );
              })}
            </div>
            <Modal
              width="1200px"
              visible={taskdangerModalVisible}
              footer={null}
              closable={false}
              onCancel={() => {
                setTaskDangerModal(false);
                setShowButton(true);
                setShowDanger(false);
              }}
              className="task-danger-body"
              forceRender
            >
              <div className="task-danger-modal">
                <Card
                  title={dangerType[danger.stateRelationID]}
                  style={{ height: "700px", width: "300px" }}
                >
                  <div className="task-list-card-text-margin">
                    <div className="task-list-card-text-span"></div>
                    <div>上报时间：{danger.createTime?.substring(0, 16)}</div>
                  </div>
                  <div className="task-list-card-text-margin">
                    <div className="task-list-card-text-span"></div>
                    <div> 事件区域：{danger.address}</div>
                  </div>
                  <div className="task-list-card-text-margin">
                    <div>
                      <div className="task-list-card-text-margin">
                        <div className="task-list-card-text-span"></div>
                        <div>事件描述：</div>
                      </div>
                      <div className="task-list-card-remark">
                        &nbsp;&nbsp; &nbsp;&nbsp;{" "}
                        <Popover content={danger.resultCount}>
                          {danger.resultCount}
                        </Popover>
                      </div>
                    </div>
                  </div>
                  <div>
                    {danger.resultFile &&
                      danger.resultFile.split(",").map((item, index) => {
                        return (
                          <img
                            src={item}
                            key={index}
                            width="150px"
                            height="150px"
                          ></img>
                        );
                      })}
                  </div>
                  {showButton ? (
                    <Button
                      onClick={() => {
                        setShowButton(false);
                        formRef.current.setFieldsValue({
                          ...danger,
                          name: dangerType[danger.stateRelationID],
                          remark: danger.resultCount,
                        });
                        setShowDanger(true);
                      }}
                      type="primary"
                      style={{ marginTop: "80px", marginLeft: "70px" }}
                    >
                      立即处理
                    </Button>
                  ) : null}
                </Card>
                <img
                  src={jimg}
                  width="50px"
                  height="50px"
                  style={{ display: showDanger ? "block" : "none" }}
                ></img>

                <div style={{ width: "300px" }}>
                  <Card
                    title="新增事件"
                    style={{
                      height: "700px",
                      width: "400px",
                      display: showDanger ? "block" : "none",
                    }}
                  >
                    <DYForm
                      formRef={formRef}
                      formItem={taskListform}
                      onFinish={onFinish}
                      showCancel
                      cancelClick={() => setModalVislble(false)}
                    ></DYForm>
                  </Card>
                </div>
              </div>
            </Modal>
          </Tabs.TabPane>
          <Tabs.TabPane key="3" tab="超警戒" className="task-body-border">
            <Table
              columns={[
                {
                  title: "类型",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "警戒值",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "实时值",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "站名",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "地址",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "操作",
                  dataIndex: "",
                  key: "x",
                  render: () => <a>处理</a>,
                },
              ]}
              dataSource={[]}
            ></Table>
          </Tabs.TabPane>
        </Tabs>
      </div>
      {/* <div>
        本页显示{taskList?.records?.length}条事件 共有事件
        {taskList?.total}条
      </div> */}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    taskList: state.taskReducers.taskList,
    taskModalVisible: state.taskReducers.taskModalVisible,
    taskInput: state.taskReducers.taskInput,
    taskDanger: state.taskReducers.taskDanger,
    taskdangerModalVisible: state.taskReducers.taskdangerModalVisible,
    taskWarning: state.taskReducers.taskWarning,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
