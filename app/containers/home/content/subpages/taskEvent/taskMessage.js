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
} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DYForm from "@app/components/home/form";
import * as actions from "../../../redux/actions";
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
  const [selectExpert, setSelectExpert] = useState({
    city: [],
    county: [],
    town: [],
  });
  const [selectFloodUser, setSelectFloodUser] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  });
  const tableColumns = [
    { title: "发送时间", dataIndex: "createTime" },
    { title: "发送内容", dataIndex: "content" },
    { title: "接收人", dataIndex: "name" },
    { title: "反馈情况", dataIndex: "state", render: (e) => messageStatus[e] },
  ];
  const onFinish = (e) => {
    e = {
      ...e,
      typeCode: e.typeCode[0],
      floodcontrolexpertList: [
        ...selectExpert.city,
        ...selectExpert.county,
        ...selectExpert.town,
      ],
      flooduserList: [
        ...selectFloodUser[1],
        ...selectFloodUser[2],
        ...selectFloodUser[3],
        ...selectFloodUser[4],
        ...selectFloodUser[5],
        ...selectFloodUser[6],
      ],
    };
    if (e.floodcontrolexpertList[0] || e.flooduserList[0]) {
      sendMessage(e);
    } else {
      message.error("请选择人员");
    }
    // console.log(e);
  };
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
                  {/* 市级专家 */}
                  <Descriptions.Item
                    span={3}
                    label={
                      <Checkbox
                        onChange={(e) => {
                          e.target.checked
                            ? setSelectExpert({
                                ...selectExpert,
                                city: expert?.citySelect,
                              })
                            : setSelectExpert({
                                ...selectExpert,
                                city: [],
                              });
                        }}
                      >
                        市级专家
                      </Checkbox>
                    }
                  >
                    <div className="task-voerflow">
                      <Checkbox.Group
                        onChange={(e) =>
                          setSelectExpert({ ...selectExpert, city: e })
                        }
                        value={selectExpert.city}
                      >
                        <Row>
                          {expert?.city?.map((item) => {
                            return (
                              <Col key={item.floodControlExpertId} span={span}>
                                <Checkbox value={item.floodControlExpertId}>
                                  {item.name}&nbsp;
                                  ({item.unit})
                                </Checkbox>
                              </Col>
                            );
                          })}
                        </Row>
                      </Checkbox.Group>
                    </div>
                  </Descriptions.Item>
                  {/* 县级专家 */}
                  <Descriptions.Item
                    span={3}
                    label={
                      <Checkbox
                        onChange={(e) => {
                          e.target.checked
                            ? setSelectExpert({
                                ...selectExpert,
                                county: expert?.countySelect,
                              })
                            : setSelectExpert({
                                ...selectExpert,
                                county: [],
                              });
                          console.log(selectExpert);
                        }}
                      >
                        县级专家
                      </Checkbox>
                    }
                  >
                    <div className="task-voerflow">
                      <Checkbox.Group
                        onChange={(e) =>
                          setSelectExpert({ ...selectExpert, county: e })
                        }
                        value={selectExpert.county}
                      >
                        <Row>
                          {expert?.county?.map((item) => {
                            return (
                              <Col key={item.floodControlExpertId} span={span}>
                                <Checkbox value={item.floodControlExpertId}>
                                  {item.name}&nbsp;
                                  ({item.unit})
                                </Checkbox>
                              </Col>
                            );
                          })}
                        </Row>
                      </Checkbox.Group>
                    </div>
                  </Descriptions.Item>
                  {/* 乡镇专家 */}
                  <Descriptions.Item
                    span={3}
                    label={
                      <Checkbox
                        onChange={(e) => {
                          e.target.checked
                            ? setSelectExpert({
                                ...selectExpert,
                                town: expert?.townSelect,
                              })
                            : setSelectExpert({
                                ...selectExpert,
                                town: [],
                              });
                        }}
                      >
                        乡镇专家
                      </Checkbox>
                    }
                  >
                    <div className="task-voerflow">
                      <Checkbox.Group
                        onChange={(e) =>
                          setSelectExpert({ ...selectExpert, town: e })
                        }
                        value={selectExpert.town}
                      >
                        <Row>
                          {expert?.town?.map((item) => {
                            return (
                              <Col key={item.floodControlExpertId} span={span}>
                                <Checkbox value={item.floodControlExpertId}>
                                  {item.name}&nbsp;
                                  ({item.unit})
                                </Checkbox>
                              </Col>
                            );
                          })}
                        </Row>
                      </Checkbox.Group>
                    </div>
                  </Descriptions.Item>
                  {floodRanks?.map((item) => {
                    return (
                      <Descriptions.Item
                        key={item.floodRanksId}
                        span={3}
                        label={
                          <Checkbox
                            onChange={(e) => {
                              e.target.checked
                                ? setSelectFloodUser({
                                    ...selectFloodUser,
                                    [item.floodRanksId]:
                                      rankSelect[item.floodRanksId],
                                  })
                                : setSelectFloodUser({
                                    ...selectFloodUser,
                                    [item.floodRanksId]: [],
                                  });
                            }}
                          >
                            {item.name}
                          </Checkbox>
                        }
                      >
                        <div className="task-voerflow">
                          <Checkbox.Group
                            onChange={(e) =>
                              setSelectFloodUser({
                                ...selectFloodUser,
                                [item.floodRanksId]: e,
                              })
                            }
                            value={selectFloodUser[item.floodRanksId]}
                          >
                            <Row>
                              {item?.userList?.map((t) => {
                                return (
                                  <Col key={t.floodId} span={span}>
                                    <Checkbox value={t.floodId}>
                                      {t.name}&nbsp;
                                      ({t.unit})
                                    </Checkbox>
                                  </Col>
                                );
                              })}
                            </Row>
                          </Checkbox.Group>
                        </div>
                      </Descriptions.Item>
                    );
                  })}
                </Descriptions>
              </Card>
            </div>
            <div className="task-display-right">
              <Card title="发送内容">
                <DYForm
                  id={"task"}
                  // formRef={this.formRef}
                  // name={storeKey}
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
                          autoSize={{ minRows: 16, maxRows: 20 }}
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
            // total={messageList?.length}
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
    messageList: state.management.messageList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Task);
