import React, { useEffect, useState } from "react";
import { Tabs, Descriptions, Checkbox, Col, Row, Card, Input } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DYForm from "@app/components/home/form";
import DYTable from "@app/components/home/table";
import * as actions from "../../../redux/actions";
import "./task.scss";
const { TabPane } = Tabs;
const Task = (props) => {
  const { expert } = props;
  const { getFloodExpert, sendMessage } = props.actions;
  const [selectExpert, setSelectExpert] = useState({
    city: [],
    county: [],
    town: [],
  });
  const tableColumns = [
    { title: "发送时间", dataIndex: "time" },
    { title: "发送内容", dataIndex: "time" },
    { title: "接收人", dataIndex: "time" },
    { title: "反馈情况", dataIndex: "time" },
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
    };
    sendMessage(e);
    // console.log(e);
  };
  useEffect(() => {
    getFloodExpert();
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
                    <Checkbox.Group
                      onChange={(e) =>
                        setSelectExpert({ ...selectExpert, city: e })
                      }
                      value={selectExpert.city}
                    >
                      <Row>
                        {expert?.city?.map((item) => {
                          return (
                            <Col key={item.floodControlExpertId} span={10}>
                              <Checkbox value={item.floodControlExpertId}>
                                {item.name}
                                {item.phone}
                              </Checkbox>
                            </Col>
                          );
                        })}
                      </Row>
                    </Checkbox.Group>
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
                    <Checkbox.Group
                      onChange={(e) =>
                        setSelectExpert({ ...selectExpert, county: e })
                      }
                      value={selectExpert.county}
                    >
                      <Row>
                        {expert?.county?.map((item) => {
                          return (
                            <Col key={item.floodControlExpertId} span={10}>
                              <Checkbox value={item.floodControlExpertId}>
                                {item.name}
                                {item.phone}
                              </Checkbox>
                            </Col>
                          );
                        })}
                      </Row>
                    </Checkbox.Group>
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
                    <Checkbox.Group
                      onChange={(e) =>
                        setSelectExpert({ ...selectExpert, town: e })
                      }
                      value={selectExpert.town}
                    >
                      <Row>
                        {expert?.town?.map((item) => {
                          return (
                            <Col key={item.floodControlExpertId} span={10}>
                              <Checkbox value={item.floodControlExpertId}>
                                {item.name}
                                {item.phone}
                              </Checkbox>
                            </Col>
                          );
                        })}
                      </Row>
                    </Checkbox.Group>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </div>
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
                    ele: <Input></Input>,
                  },
                  {
                    label: "发送方式",
                    name: "typeCode",
                    rules: [{ required: true }],
                    ele: (
                      <Checkbox.Group>
                        {/* <Checkbox value={1} onChange={() => 1}>
                          短信
                        </Checkbox> */}
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
        </TabPane>
        <TabPane tab="已发送消息记录" key="2">
          <DYTable columns={tableColumns} showEdit={false}></DYTable>
        </TabPane>
      </Tabs>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    expert: state.mapAboutReducers.expert,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Task);
