import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/actions/taskEvent";
import { bindActionCreators } from "redux";
import { Tabs, Table } from "antd";
import { createHashHistory } from "history";
import ListRender from "./component/list";
import ModalForm from "./component/modalForm";
import TaskRadio from "./component/radio";
import { expertRadioList, expertColumns } from "./cconfig";
import PageHeader from "./component/pageHeader";
const { TabPane } = Tabs;
const hashHistory = createHashHistory();

const ExpertDispatch = (props) => {
  const { taskInfo, dispatchExpert, listRender, expert } = props;
  const {
    getFloodExpert,
    addExpertDispatch,
    getTaskDispatchExpert,
    changeTaskRenderList,
    changeTaskRadioType,
  } = props.actions;

  const onFinish = (data) => {
    let formData = listRender.map((item) => {
      console.log(item);
      return {
        ...data,
        name: taskInfo?.name,
        floodControlExpertCategoryID: item.floodControlExpertCategoryId,
        floodControlExpertID: item.floodControlExpertId,
        taskEventsID: taskInfo.taskEventsID,
      };
    });
    addExpertDispatch(formData);
  };

  useEffect(() => {
    if (!taskInfo) {
      hashHistory.push("/taskList");
    } else {
      changeTaskRadioType("all");
      getFloodExpert();
      getTaskDispatchExpert(taskInfo?.taskEventsID);
    }
    return () => {
      changeTaskRenderList([]);
    };
  }, [taskInfo]);

  return (
    <React.Fragment>
       <PageHeader></PageHeader>
      <Tabs defaultActiveKey="1">
        <TabPane key="1" tab="专家调度">
          {/* 发送消息 */}
          <ModalForm onFinish={onFinish} />
          <div className="expert-dispatch">
            <TaskRadio
              columns={expertColumns}
              radioText={"专家级别"}
              radioList={expertRadioList}
              dataSource={expert}
              defaultRadio="all"
            ></TaskRadio>
            <ListRender listItemText={'major'}></ListRender>
          </div>
        </TabPane>
        <TabPane key="2" tab="已调派专家">
          <Table
            columns={[
              expertColumns[0],
              expertColumns[1],
              expertColumns[3],
              expertColumns[4],
              expertColumns[5],
            ]}
            dataSource={dispatchExpert}
            rowKey={(row) => row.floodControlExpertId}
          ></Table>
        </TabPane>
      </Tabs>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    expert: state.mapAboutReducers.expert,
    taskInfo: state.taskReducers.taskInfo,
    listRender: state.taskReducers.listRender,
    expertVisible: state.taskReducers.expertVisible,
    dispatchExpert: state.taskReducers.dispatchExpert,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpertDispatch);
