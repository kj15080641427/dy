import React, { useEffect, useState } from "react";
import {
  Tabs,
  Descriptions,
  Checkbox,
  Col,
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
import * as actions from "../../../redux/actions";
import TreeSelected from "./component/tree";
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
const Task = (props) => {
  const { expert, floodRanks, rankSelect, messageList } = props;
  const {
    getFloodExpert,
    sendMessage,
    getFloodRankUser,
    getMessage,
  } = props.actions;
  const [selectExpert, setSelectExpert] = useState([]);
  const [selectFloodUser, setSelectFloodUser] = useState([]);
  const tableColumns = [
    { title: "发送时间", dataIndex: "createTime", width: "20%" },
    {
      title: "发送内容",
      dataIndex: "content",
      render: (name) => (
        <Popover content={name}>
          {name?.length > 34 ? name.toString().substring(0, 34) + "..." : name}
        </Popover>
      ),
    },
    { title: "接收人", dataIndex: "name", width: "15%" },
    {
      title: "反馈情况",
      dataIndex: "state",
      width: "15%",
      render: (e) => messageStatus[e],
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
    };
    if (e.floodcontrolexpertList[0] || e.flooduserList[0]) {
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
    getFloodExpert();
    getFloodRankUser();
    getMessage();
  }, []);
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="发送消息" key="1">
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
        </TabPane>
        <TabPane tab="已发送消息记录" key="2">
          <Table
            columns={tableColumns}
            dataSource={messageList}
            showEdit={false}
            // rowkey={(row) =>row.createTime}
          ></Table>
        </TabPane>
      </Tabs>
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Task);
