import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../../../redux/actions";
import { bindActionCreators } from "redux";
import { Tabs, Table } from "antd";
import ListRender from "./component/list";
import ModalForm from "./component/modalForm";
import TaskRadio from "./component/radio";
import { userColumns, userRadioList, userTab2Columns } from "./cconfig";
import { createHashHistory } from "history";

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

  useEffect(() => {
    if (taskInfo) {
      getUserDispatch(taskInfo.taskEventsID);
      getFloodRankUser();
      changeTaskRadioType("city");
    } else {
      hashHistory.push("/home/taskList");
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
    <React.Fragment>
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
            <ListRender buttonText="调派人员"></ListRender>
          </div>
        </TabPane>
        <TabPane key="2" tab="已调派人员">
          <Table columns={userTab2Columns} dataSource={dispatchUser}></Table>
        </TabPane>
      </Tabs>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    floodRanksUser: state.mapAboutReducers.floodRanksUser,
    taskInfo: state.management.taskInfo,
    listRender: state.management.listRender,
    dispatchUser: state.management.dispatchUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserDispatch);
