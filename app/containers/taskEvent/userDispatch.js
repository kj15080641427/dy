import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/actions/taskEvent";
import { bindActionCreators } from "redux";
import { Tabs, Table, Modal, Card } from "antd";
import ListRender from "./component/list";
import ModalForm from "./component/modalForm";
import TaskRadio from "./component/radio";
import { userColumns, userRadioList, userTab2Columns } from "./cconfig";
import { createHashHistory } from "history";
import PageHeader from "./component/pageHeader";
import Head from "../../components/head/head";
import titleImg from "@app/resource/title/rwdd.png";
import RouterList from "../../components/routerlist";

const hashHistory = createHashHistory();
const { TabPane } = Tabs;

const UserDispatch = (props) => {
  const { taskInfo, floodRanksUser, listRender, dispatchUser } = props;
  const {
    getFloodRankUser,
    changeTaskRenderList,
    changeTaskRadioType,
    addUserDispatch,
    getUserDispatch,
  } = props.actions;
  const [showInfo, setShowInfo] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (taskInfo) {
      getUserDispatch(taskInfo.taskEventsID);
      getFloodRankUser();
      changeTaskRadioType("city");
    } else {
      hashHistory.push("/taskList");
    }
    return () => {
      changeTaskRenderList([]);
    };
  }, []);
  const onFinish = (data) => {
    let formData = listRender.map((item) => {
      console.log(item);
      return {
        ...data,
        name: taskInfo?.name,
        floodRanksID: item.floodRanksId,
        floodUserID: item.floodId,
        taskEventsID: taskInfo.taskEventsID,
      };
    });
    addUserDispatch(formData);
  };
  return (
    <div>
      <div style={{ height: "90px", background: "#003366" }}></div>
      <div className="right-background"></div>
      <Head titleImg={titleImg} />
      <RouterList />
      <PageHeader></PageHeader>
      <div className="task-dispatch-body">
        <Tabs defaultActiveKey="1">
          <TabPane key="1" tab="防汛人员调度">
            <ModalForm onFinish={onFinish}></ModalForm>
            <div className="expert-dispatch">
              <TaskRadio
                columns={userColumns}
                dataSource={floodRanksUser}
                radioList={userRadioList}
                radioText={"抢险队"}
                defaultRadio="city"
              ></TaskRadio>
              <ListRender
                buttonText="调派人员"
                listItemText="remark"
              ></ListRender>
            </div>
          </TabPane>
          <TabPane key="2" tab="已调派人员">
            <Table
              columns={[
                ...userTab2Columns,
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
              dataSource={dispatchUser}
            ></Table>
          </TabPane>
        </Tabs>
        <Modal
          // width="1200px"
          visible={showInfo}
          footer={null}
          closable={false}
          onCancel={() => {
            setShowInfo(false);
          }}
        >
          <Card title="人员调度">
            <div className="task-list-card-text-margin">
              <div className="task-list-card-text-span"></div>
              <div>调度时间：{info.createTime?.substring(0, 16)}</div>
            </div>
            <div className="task-list-card-text-margin">
              <div className="task-list-card-text-span"></div>
              <div>操作人：{info.name}</div>
            </div>
            <div className="task-list-card-text-margin">
              <div>
                <div className="task-list-card-text-margin">
                  <div className="task-list-card-text-span"></div>
                  <div>任务内容：</div>
                </div>
                <div className="task-list-card-remark">
                  &nbsp;&nbsp; &nbsp;&nbsp; {info.content}
                </div>
              </div>
            </div>
            <div className="task-list-card-text-margin">
              <div>
                <div className="task-list-card-text-margin">
                  <div className="task-list-card-text-span"></div>
                  <div>调度人员：</div>
                </div>
                <div className="task-list-card-remark">
                  &nbsp;&nbsp; &nbsp;&nbsp; {info.resultCount}
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
  console.log(state);
  return {
    floodRanksUser: state.mapAboutReducers.floodRanksUser,
    taskInfo: state.taskReducers.taskInfo,
    listRender: state.taskReducers.listRender,
    dispatchUser: state.taskReducers.dispatchUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserDispatch);
