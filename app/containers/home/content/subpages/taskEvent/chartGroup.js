import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as action from "../../../redux/actions";
import { bindActionCreators } from "redux";
import {
  Tabs,
  Table,
  Descriptions,
  Card,
  Button,
  Modal,
  Input,
  message,
} from "antd";
import TreeSelected from "./component/tree";
import DYForm from "@app/components/home/form";
import * as req from "@app/data/home";
import ListRender from "./component/list";

const ChartGroup = (props) => {
  const { getFloodExpert, getFloodRankUser } = props.actions;
  const { expert, floodRanks, listRender } = props;
  const [userList, setUserList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [tableList, setTableList] = useState([]);
  useEffect(() => {
    getFloodExpert();
    getFloodRankUser();
  }, []);

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
  const baseFilter = (data) => {
    return listRender.filter((item) => item == data);
  };
  const getlist = () => {
    return req.getChartGroupList({ current: 1, size: -1 });
  };
  useEffect(() => {
    getlist().then((res) => {
      setTableList(res.data.records);
    });
  }, []);
  const onFinish = (data) => {
    console.log(data, "DDD");
    req.addChartGroup(data).then((res) => {
      let data = userList.map((item) => ({
        chatGroupId: item.data,
        state: "",
        userId: "",
      }));
      req.addChartGroupUser(data).then((success) => {
        setVisible(false);
        getlist().then((res) => {
          setTableList(res.data.records);
        });
        message.success("新建成功");
      });
      console.log(res);
    });
  };
  return (
    <>
      <Tabs defaultActiveKey="add">
        <Tabs.TabPane key="add" tab="新建群聊">
          <div className="chart-group-flex">
            <div className="chart-group-left">
              <Card>
                <Descriptions bordered title="通知联系人">
                  <Descriptions.Item
                    label={<div style={{ width: "90px" }}>人员组别</div>}
                    span={3}
                  >
                    <div style={{ width: "100%" }}>人员</div>
                  </Descriptions.Item>
                  {/* 防汛 */}
                  <Descriptions.Item span={3} label={"群聊人员"}>
                    <div className="task-voerflow">
                      <TreeSelected
                        treeDefaultExpandAll={false}
                        placeholderInfo="点击选择群聊人员"
                        onChange={(value) => {
                          setUserList([
                            // ...listRender,
                            ...value.map((item) => {
                              return {
                                name: item.split("|")[0],
                                type: "防汛专家",
                                id: item.split("|")[1],
                              };
                            }),
                          ]);
                        }}
                        treeData={[
                          {
                            title: "防汛专家",
                            value: "expert",
                            children: [
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
                            ],
                          },
                          {
                            title: "防汛人员",
                            value: "user",
                            children: floodRanks?.map((item) => {
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
                            }),
                          },
                        ]}
                      ></TreeSelected>
                    </div>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </div>
            <div className="chart-group-right">
              <Card>已选择{userList.length}</Card>
              {userList.map((item) => {
                console.log(item, "III");
                return (
                  <Card>
                    <div>{item.name}</div>
                    <div>{item.type}</div>
                  </Card>
                );
              })}
              {/* <ListRender buttonText="新建群聊" listItemText="type" /> */}
              <Button
                className="chart-group-right-button"
                type="primary"
                onClick={() => {
                  if (userList[0]) {
                    setVisible(true);
                  } else {
                    message.warning("请选择人员");
                  }
                }}
              >
                新建群聊
              </Button>
            </div>
          </div>
          <Modal
            visible={visible}
            footer={null}
            onCancel={() => setVisible(false)}
          >
            <DYForm
              showCancel
              cancelClick={() => setVisible(false)}
              formItem={[
                {
                  label: "群名称",
                  name: "name",
                  rules: [{ required: true }],
                  ele: <Input></Input>,
                },
                {
                  label: "群备注",
                  name: "remark",
                  rules: [{ required: true }],
                  ele: <Input></Input>,
                },
              ]}
              onFinish={onFinish}
            />
          </Modal>
        </Tabs.TabPane>
        <Tabs.TabPane key="get" tab="查询群聊">
          <Table
            columns={[
              {
                title: "群聊名称",
                dataIndex: "name",
              },
              {
                title: "备注",
                dataIndex: "remark",
              },
              {
                title: "创建时间",
                dataIndex: "createTime",
              },
            ]}
            dataSource={tableList}
          ></Table>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    expert: state.mapAboutReducers.expert,
    floodRanks: state.mapAboutReducers.floodRanks,
    rankSelect: state.mapAboutReducers.rankSelect,
    listRender: state.management.listRender,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChartGroup);
