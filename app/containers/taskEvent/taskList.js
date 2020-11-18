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
  Spin,
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
    taskWarningModalVisible,
    taskWarning,
    taskEventLoading, //加载中
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
    setTaskWarningModal,
  } = props.actions;
  const formRef = useRef(null);
  const warningFormRef = useRef(null);
  const [page, setPage] = useState(1);
  const [danger, setDanger] = useState({});
  const [showDanger, setShowDanger] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [source, setSource] = useState(0);
  const [grade, setGrade] = useState("");
  const [dangerList, setDangerList] = useState([]);
  const [dangerPage, setDangerPage] = useState(1);
  useEffect(() => {
    getTaskWarning({});
    getTaskDanger({ size: 6, current: 1 });
    getTaskList({
      current: 1,
      name: taskInput,
      size: 6,
      grade: grade,
    });
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      getTaskList({
        current: 1,
        name: taskInput,
        size: 6,
        grade: grade,
      });
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  });
  const onFinish = (form) => {
    form = {
      ...form,
      happenTime: moment(form.happenTime).format("YYYY-MM-DD HH:mm:ss"),
      dataSource: source,
    };
    addTaskEvent(form);
    setTaskWarningModal(false);
    setTaskDangerModal(false);
  };

  return (
    <div
      style={{ background: "#003366", height: "100%" }}
      className="task-list-body"
    >
      <div className="top-bacground"></div>
      <div className="right-background"></div>
      <Head titleImg={titleImg} />
      <RouterList />
      <div className="task-card-container">
        <Tabs
          defaultActiveKey="1"
          type="card"
          onChange={() => setTaskDangerModal(false)}
        >
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
                      grade: grade,
                    })
                  }
                  value={taskInput}
                  onChange={(e) => changeTaskInput(e.target.value)}
                ></Input>
                &nbsp; 事件等级：
                <Select
                  defaultValue={""}
                  onChange={(e) => {
                    setGrade(e);
                    setPage(1);
                    getTaskList({ current: 1, grade: e, size: 6 });
                  }}
                >
                  <Select.Option value={""}>全部</Select.Option>
                  <Select.Option value={1}>一级</Select.Option>
                  <Select.Option value={2}>二级</Select.Option>
                  <Select.Option value={3}>三级</Select.Option>
                </Select>
                {/* &nbsp; 事件类型：
                <Select
                  defaultValue={""}
                  onChange={(e) =>
                    getTaskList({ current: 1, grade: grade, size: 6 })
                  }
                >
                  <Select.Option value={""}>全部</Select.Option>
                  <Select.Option value={1}>一级</Select.Option>
                  <Select.Option value={2}>二级</Select.Option>
                  <Select.Option value={3}>三级</Select.Option>
                </Select> */}
                <Button
                  type="primary"
                  onClick={() => {
                    setSource(0);
                    setModalVislble(true);
                  }}
                >
                  新增事件
                </Button>
              </div>
            </div>
            {taskEventLoading ? (
              <Spin spinning={taskEventLoading} />
            ) : (
              <>
                <div className="task-list-card">
                  {taskList?.records?.map((item) => {
                    return (
                      <div
                        key={item.taskEventsID}
                        className="task-list-card-item"
                      >
                        <Card
                          className="task-list-card-item-card"
                          title={
                            <div
                              className="task-list-card-title"
                              style={{
                                color:
                                  item.grade == "1"
                                    ? "red"
                                    : item.grade == "2"
                                    ? "green"
                                    : "blue",
                              }}
                            >
                              <div>{item.name}</div>
                            </div>
                          }
                        >
                          <img
                            src={stateImg[item.state]}
                            className="task-list-card-img"
                          ></img>
                          <div
                            className="task-list-card-text-margin"
                            style={{
                              color:
                                item.grade == "1"
                                  ? "red"
                                  : item.grade == "2"
                                  ? "green"
                                  : "blue",
                            }}
                          >
                            <div className="task-list-card-text-span"></div>
                            <div>
                              事件等级：
                              <span>{gradeElement[item.grade - 1]}</span>
                            </div>
                          </div>
                          <div className="task-list-card-text-margin">
                            <div className="task-list-card-text-span"></div>
                            <div>
                              {" "}
                              事件来源：{taskSourceColor[item.dataSource]}
                            </div>
                          </div>
                          <div className="task-list-card-text-margin">
                            <div className="task-list-card-text-span"></div>
                            <div>
                              {" "}
                              事件类型：{dangerType[item.stateRelationID]}
                            </div>
                          </div>
                          <div className="task-list-card-text-margin">
                            <div className="task-list-card-text-span"></div>
                            <div>
                              事件时间：{item.happenTime?.substring(0, 16)}
                            </div>
                          </div>
                          <div className="task-list-card-text-margin">
                            <div>
                              <div className="task-list-card-text-margin">
                                <div className="task-list-card-text-span"></div>
                                <div>事件地址：</div>
                              </div>
                              <div className="task-list-card-remark">
                                &nbsp;&nbsp; &nbsp;&nbsp;
                                <Popover content={item.address}>
                                  {item.address}
                                </Popover>
                              </div>
                            </div>
                          </div>

                          <div className="task-list-card-text-margin">
                            <div>
                              <div className="task-list-card-text-margin">
                                <div className="task-list-card-text-span"></div>
                                <div>事件描述：</div>
                              </div>
                              <div className="task-list-card-remark">
                                &nbsp;&nbsp; &nbsp;&nbsp;
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
                            to={{
                              pathname: "/taskInfo",
                              query: { info: item },
                            }}
                          >
                            事件详情
                          </Link>
                        </Card>
                      </div>
                    );
                  })}
                </div>
                <Modal
                  visible={taskModalVisible}
                  footer={null}
                  closable={false}
                >
                  <DYForm
                    formItem={[
                      {
                        label: "事件来源",
                        name: "happenTime",
                        ele: <text>新建事件</text>,
                      },
                      ...taskListform,
                    ]}
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
                      grade: grade,
                    });
                  }}
                ></Pagination>
              </>
            )}
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="险情上报" className="task-body-border">
            <div className="task-list-head">
              <div className="task-list-head-div">
                上报日期：
                <DatePicker
                  onChange={(e) => {
                    let start = moment(e).format("YYYY-MM-DD 00:00:00");
                    let end = moment(e).format("YYYY-MM-DD 23:59:00");
                    getTaskDanger({
                      size: 6,
                      current: 1,
                      endtm: end,
                      starttm: start,
                    });
                  }}
                ></DatePicker>
                <Button
                  onClick={() => {
                    setDangerPage(1);
                    getTaskDanger({ size: 6, current: 1 });
                  }}
                >
                  重置
                </Button>
              </div>
            </div>
            {/* card */}
            <div className="task-list-card">
              {taskDanger?.records?.map((item) => {
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
                      {/* <div className="task-list-card-text-margin">
                        <div className="task-list-card-text-span"></div>
                        <div> 事件区域：{item.address}</div>
                      </div> */}
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
                            <div>事件地址：</div>
                          </div>
                          <div className="task-list-card-remark">
                            &nbsp;&nbsp; &nbsp;&nbsp;{" "}
                            <Popover content={item.address}>
                              {item.address}
                            </Popover>
                          </div>
                        </div>
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
                      <div
                        className="task-list-card-footer"
                        onClick={() => {
                          setTaskDangerModal(true);
                          setDanger(item);
                          // setTaskInfo(item);
                        }}
                        // to={{ pathname: "/taskInfo", query: { info: item } }}
                      >
                        事件详情
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
            <Modal
              width="100%"
              height="900px"
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
                  {/* <div className="task-list-card-text-margin">
                    <div className="task-list-card-text-span"></div>
                    <div>
                      事件区域：<span>{danger.address}</span>
                    </div>
                  </div> */}
                  <div className="task-list-card-text-margin">
                    <div>
                      <div className="task-list-card-text-margin">
                        <div className="task-list-card-text-span"></div>
                        <div>事件地址：</div>
                      </div>
                      <div className="task-list-card-remark">
                        &nbsp;&nbsp; &nbsp;&nbsp;{" "}
                        <Popover content={danger.address}>{danger.address}</Popover>
                      </div>
                    </div>
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
                        setSource(1);
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
                    // title="新增事件"
                    style={{
                      height: "100%",
                      width: "400px",
                      display: showDanger ? "block" : "none",
                    }}
                  >
                    <DYForm
                      formRef={formRef}
                      formItem={[
                        {
                          label: "事件来源",
                          name: "happenTime",
                          ele: <text>险情上报</text>,
                        },
                        ...taskListform,
                      ]}
                      onFinish={onFinish}
                      showCancel
                      cancelClick={() => {
                        setTaskDangerModal(false);
                        setShowButton(true);
                        setShowDanger(false);
                      }}
                    ></DYForm>
                  </Card>
                </div>
              </div>
            </Modal>
            <Pagination
              className="task-list-pagination"
              current={dangerPage}
              defaultPageSize={6}
              // pageSize={6}
              // hideOnSinglePage
              total={taskDanger?.total}
              onChange={(page) => {
                setDangerPage(page);
                getTaskDanger({ size: 6, current: page });
              }}
            ></Pagination>
          </Tabs.TabPane>
          <Tabs.TabPane key="3" tab="超警戒" className="task-body-border">
            <Table
              columns={[
                {
                  title: "类型",
                  dataIndex: "alarmtype",
                },
                {
                  title: "警戒值",
                  dataIndex: "baselevel",
                },
                {
                  title: "实时值",
                  dataIndex: "actuallevel",
                },
                {
                  title: "站名",
                  dataIndex: "stnm",
                },
                {
                  title: "地址",
                  dataIndex: "stlc",
                },
                {
                  title: "操作",
                  dataIndex: "",
                  key: "x",
                  render: (row) => (
                    <a
                      onClick={() => {
                        warningFormRef.current.setFieldsValue({
                          ...row,
                          address: row.stlc,
                          name:
                            row.alarmtype == 1
                              ? "水位站点超警"
                              : "积水站点超警",
                          remark: `${row.alarmtime},${row.stnm},${
                            row.alarmtype == 1 ? "水位站点超警" : "积水站点超警"
                          }`,
                        });
                        setTaskWarningModal(true);
                      }}
                    >
                      处理
                    </a>
                  ),
                },
              ]}
              dataSource={taskWarning}
            ></Table>

            <Modal
              visible={taskWarningModalVisible}
              footer={null}
              closable={false}
              onCancel={() => {
                setTaskWarningModal(false);
                // setShowButton(true);
                // setShowDanger(false);
              }}
              className="task-danger-body"
              forceRender
            >
              <div className="task-danger-modal">
                <Card style={{ width: "100%" }}>
                  <DYForm
                    formRef={warningFormRef}
                    formItem={[
                      {
                        label: "事件来源：",
                        name: "happenTime",
                        ele: <text>超预警</text>,
                      },
                      ...taskListform,
                    ]}
                    onFinish={onFinish}
                    showCancel
                    cancelClick={() => setTaskWarningModal(false)}
                  ></DYForm>
                </Card>
              </div>
            </Modal>
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
    taskWarningModalVisible: state.taskReducers.taskWarningModalVisible,
    taskEventLoading: state.taskReducers.taskEventLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
