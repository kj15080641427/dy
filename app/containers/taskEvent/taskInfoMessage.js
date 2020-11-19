//发送时消息携带事件
import React, { useEffect, useState, useRef } from "react";
import {
  Tabs,
  Descriptions,
  Checkbox,
  Modal,
  Row,
  Card,
  Input,
  message,
  Table,
  Popover,
} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DYForm from "@app/components/home/form";
import * as actions from "../../redux/actions/taskEvent";
import TreeSelected from "./component/tree";
import { createHashHistory } from "history";
import PageHeader from "./component/pageHeader";
import Head from "../../components/head/head";
import titleImg from "@app/resource/title/rwdd.png";
import RouterList from "../../components/routerlist";
import "./task.scss";
const { TabPane } = Tabs;
const { TextArea } = Input;
const span = window.screen.width == 1920 ? 8 : 10;
const messageStatus = [
  "已发送",
  "已读取",
  "确认事件",
  "取消事件",
  "已确认，已反馈",
  "未完成已反馈",
];
const hashHistory = createHashHistory();

const TaskInfoMessage = (props) => {
  const { expert, floodRanks, rankSelect, messageList, taskInfo } = props;
  const {
    getFloodExpert,
    sendMessage,
    getFloodRankUser,
    getMessage,
  } = props.actions;
  const formRef = useRef();
  const [selectExpert, setSelectExpert] = useState([]);
  const [selectFloodUser, setSelectFloodUser] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [info, setInfo] = useState({});

  const tableColumns = [
    { title: "发送时间", dataIndex: "time", width: "20%" },
    { title: "操作人", dataIndex: "operatorName", width: "15%" },
    {
      title: "发送人数",
      dataIndex: "personList",
      width: "15%",
      render: (e) => e.length,
    },
    {
      title: "信息内容",
      dataIndex: "content",
      render: (name) => (
        <Popover content={name}>
          {name?.length > 34 ? name.toString().substring(0, 34) + "..." : name}
        </Popover>
      ),
    },
  ];

  const filteruser = (data) => {
    return data.map((item) => item.split("|")[1]);
  };
  const onFinish = (e) => {
    e = {
      ...e,
      typeCode: e.typeCode[0],
      floodcontrolexpertList: filteruser(selectExpert),
      flooduserList: filteruser(selectFloodUser),
      taskEventsID: taskInfo?.taskEventsID,
    };
    if (e.floodcontrolexpertList[0] || e.flooduserList[0]) {
      formRef.current.resetFields();
      sendMessage(e);
    } else {
      message.error("请选择人员");
    }
    // console.log(e);
  };
  const city = expert?.city?.map((item) => {
    return {
      title: item.name,
      value: `${item.name}|${item.floodControlExpertId}`,
    };
  });
  const county = expert?.county?.map((item) => {
    return {
      title: item.name,
      value: `${item.name}|${item.floodControlExpertId}`,
    };
  });
  const town = expert?.town?.map((item) => {
    return {
      title: item.name,
      value: `${item.name}|${item.floodControlExpertId}`,
    };
  });
  useEffect(() => {
    if (taskInfo) {
      getFloodExpert();
      getFloodRankUser();
      getMessage({ taskEventsID: taskInfo?.taskEventsID, type: 101 });
    } else {
      hashHistory.push("/taskList");
    }
  }, []);
  return (
    <div className="task-dispatch-root-body">
      <div style={{ height: "90px", background: "#003366" }}></div>
      <div className="right-background"></div>
      <Head titleImg={titleImg} />
      <RouterList />
      <PageHeader taskInfo={taskInfo}></PageHeader>
      <div className="task-dispatch-body">
        <div className="task-card-container">
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="发送消息" key="1">
              <div className="task-body-min-height">
                <div className="task-display">
                  <div className="task-display-left">
                    <Card>
                      <Descriptions bordered title="通知联系人">
                        <Descriptions.Item
                          label={<div style={{ width: "90px" }}>人员组别</div>}
                          span={3}
                        >
                          <div style={{ width: "100%" }}>人员</div>
                        </Descriptions.Item>
                        {/* 防汛 */}
                        <Descriptions.Item span={3} label={"防汛专家"}>
                          <div className="task-voerflow">
                            <TreeSelected
                              placeholderInfo="点击选择防汛专家"
                              onChange={(value) => setSelectExpert(value)}
                              treeData={[
                                {
                                  title: "市级专家",
                                  value: "city",
                                  children: city,
                                },
                                {
                                  title: "县级专家",
                                  value: "county",
                                  children: county,
                                },
                                {
                                  title: "乡镇专家",
                                  value: "town",
                                  children: town,
                                },
                              ]}
                            ></TreeSelected>
                          </div>
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label={"防汛人员"}>
                          <div className="task-voerflow">
                            <TreeSelected
                              placeholderInfo="点击选择防汛人员"
                              onChange={(value) => setSelectFloodUser(value)}
                              treeData={floodRanks?.map((item) => {
                                return {
                                  title: item.name,
                                  value: item.name,
                                  children: item?.userList?.map((t) => {
                                    return {
                                      title: t.name,
                                      value: `${t.name}|${t.floodId}`,
                                    };
                                  }),
                                };
                              })}
                            ></TreeSelected>
                          </div>
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </div>
                  <div className="task-display-right">
                    <Card title="发送内容">
                      <DYForm
                        formRef={formRef}
                        id={"task"}
                        formItem={[
                          {
                            label: "事件标题",
                            name: "name",
                            rules: [{ required: true }],
                            ele: <Input></Input>,
                          },
                          {
                            label: "内容",
                            name: "content",
                            rules: [{ required: true }],
                            ele: (
                              <TextArea
                                autoSize={{ minRows: 3, maxRows: 8 }}
                              ></TextArea>
                            ),
                          },
                          {
                            label: "发送方式",
                            name: "typeCode",
                            rules: [{ required: true }],
                            ele: (
                              <Checkbox.Group>
                                <Checkbox value={1} onChange={() => 1}>
                                  短信
                                </Checkbox>
                                <Checkbox value={2} onChange={() => 2}>
                                  APP
                                </Checkbox>
                              </Checkbox.Group>
                            ),
                          },
                        ]}
                        onFinish={onFinish}
                      ></DYForm>
                    </Card>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="已发送消息记录" key="2">
              <div className="task-body-min-height">
                <Table
                  columns={[
                    ...tableColumns,
                    {
                      title: "操作",
                      dataIndex: "",
                      render: (row) => (
                        <a
                          onClick={() => {
                            setInfo(row);
                            setShowInfo(true);
                          }}
                        >
                          详情
                        </a>
                      ),
                    },
                  ]}
                  dataSource={messageList}
                  showEdit={false}
                  // rowkey={(row) =>row.createTime}
                ></Table>
              </div>
            </TabPane>
          </Tabs>
        </div>
        <Modal
          // width="1200px"
          visible={showInfo}
          footer={null}
          closable={false}
          onCancel={() => {
            setShowInfo(false);
          }}
        >
          <Card title="发送消息">
            <div className="task-list-card-text-margin">
              <div className="task-list-card-text-span"></div>
              <div>发送时间：{info.time?.substring(0, 16)}</div>
            </div>
            <div className="task-list-card-text-margin">
              <div className="task-list-card-text-span"></div>
              <div>操作人：{info.operatorName}</div>
            </div>
            <div className="task-list-card-text-margin">
              <div>
                <div className="task-list-card-text-margin">
                  <div className="task-list-card-text-span"></div>
                  <div>信息内容：</div>
                </div>
                <div className="task-list-card-remark">
                  &nbsp;&nbsp; &nbsp;&nbsp; {info.content}
                </div>
              </div>
            </div>
            <div className="task-list-card-text-margin">
              <div style={{ width: "100%" }}>
                <div className="task-list-card-text-margin">
                  <div className="task-list-card-text-span"></div>
                  <div>调度人员：</div>
                </div>
                <div className="task-list-card-remark">
                  &nbsp;&nbsp; &nbsp;&nbsp;{" "}
                  <Table
                    columns={[
                      { title: "姓名", dataIndex: "name", width: "20%" },
                      { title: "类型", dataIndex: "ranks", width: "20%" },
                      { title: "联系电话", dataIndex: "phone", width: "20%" },
                      {
                        title: "任务状态",
                        dataIndex: "state",
                        width: "20%",
                        render: (e) => messageStatus[e],
                      },
                    ]}
                    dataSource={info.personList}
                  ></Table>
                </div>
              </div>
            </div>
          </Card>
        </Modal>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  // console.log(state, "=======");
  return {
    expert: state.mapAboutReducers.expert,
    floodRanks: state.mapAboutReducers.floodRanks,
    rankSelect: state.mapAboutReducers.rankSelect,
    messageList: state.taskReducers.messageList,
    taskInfo: state.taskReducers.taskInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskInfoMessage);
