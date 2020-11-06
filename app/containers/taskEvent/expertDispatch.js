import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/actions/taskEvent";
import { bindActionCreators } from "redux";
import { Tabs, Table, Modal, Card } from "antd";
import { createHashHistory } from "history";
import ListRender from "./component/list";
import ModalForm from "./component/modalForm";
import TaskRadio from "./component/radio";
import { expertRadioList, expertColumns } from "./cconfig";
import Head from "../../components/head/head";
import titleImg from "@app/resource/title/rwdd.png";
import RouterList from "../../components/routerlist";
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
  const [showInfo, setShowInfo] = useState(false);
  const [info, setInfo] = useState({});
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
      <div style={{ height: "90px", background: "#003366" }}></div>
      <div className="right-background"></div>
      <PageHeader></PageHeader>
      <Head titleImg={titleImg} />
      <RouterList />
      <div className="task-dispatch-body">
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
              <ListRender listItemText={"major"}></ListRender>
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
              dataSource={dispatchExpert}
              rowKey={(row) => row.floodControlExpertId}
            ></Table>
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
        <Card title="专家调度">
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
                &nbsp;&nbsp; &nbsp;&nbsp; {info.resultCount}
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
