import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/actions/taskEvent";
import { bindActionCreators } from "redux";
import { Tabs, Table, Modal, Card } from "antd";
import ListRender from "./component/list";
import ModalForm from "./component/modalForm";
import TaskRadio from "./component/radio";
import {
  materialColumns,
  materiaTab2lColumns,
  materialWarehouse,
} from "./cconfig";
import { createHashHistory } from "history";
import PageHeader from "./component/pageHeader";
import Head from "../../components/head/head";
import titleImg from "@app/resource/title/rwdd.png";
import RouterList from "../../components/routerlist";
const hashHistory = createHashHistory();
const { TabPane } = Tabs;
const MaterialDispatch = (props) => {
  const {
    taskInfo,
    listRender,
    dispatchMaterial,
    wareHouseTask,
    wareHouse,
    formUser,
  } = props;
  const {
    getWarehouse,
    changeTaskRenderList,
    changeTaskRadioType,
    addMaterialDispatch,
    getMaterialDispatch,
  } = props.actions;

  useEffect(() => {
    if (taskInfo) {
      getMaterialDispatch(taskInfo?.taskEventsID);
      getWarehouse();
      changeTaskRadioType("c6153f34ba574fd693977e4aa265ef05");
    } else {
      hashHistory.push("/taskList");
    }
    return () => {
      changeTaskRenderList([]);
    };
  }, []);
  const radioList = wareHouse?.map((item) => {
    return {
      label: item.name.split("防汛")[0],
      value: item.code,
    };
  });
  const onFinish = (data) => {
    let formData = {
      flooduserList: formUser.map((item) => item.split("|")[1]),
      ...data,
      name: taskInfo?.name,
      // floodRanksID: item.floodRanksId,
      // floodUserID: item.floodId,
      taskMaterialListDtoList: listRender.map((item) => {
        return {
          materialID: item.materialId,
          materialNumber: item.number,
          materialWarehouseId: item.materialWarehouseId,
          materialWarehouseName: item.name,
        };
      }),
      taskEventsID: taskInfo?.taskEventsID,
    };
    addMaterialDispatch(formData);
  };
  const [info, setInfo] = useState({});
  const [showInfo, setShowInfo] = useState(false);
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
            <TabPane key="1" tab="物资调派">
              <ModalForm onFinish={onFinish} showTree={true}></ModalForm>
              <div className="expert-dispatch">
                <TaskRadio
                  addAll={false}
                  isMaterial
                  rowKey="materialId"
                  columns={materialColumns}
                  dataSource={wareHouseTask}
                  radioList={radioList}
                  radioText="仓库"
                  defaultRadio="c6153f34ba574fd693977e4aa265ef05"
                ></TaskRadio>
                <ListRender buttonText="物资调派"></ListRender>
              </div>
            </TabPane>
            <TabPane key="2" tab="已调派物资">
              <div className="task-body-min-height">
                <Table
                  columns={[
                    ...materiaTab2lColumns,
                    {
                      title: "操作",
                      dataIndex: "",
                      render: (row) => (
                        <a
                          onClick={() => {
                            setShowInfo(true);
                            setInfo(row);
                          }}
                        >
                          详情
                        </a>
                      ),
                    },
                  ]}
                  dataSource={dispatchMaterial}
                ></Table>
              </div>
              <Modal
                width="800px"
                visible={showInfo}
                footer={null}
                closable={false}
                onCancel={() => {
                  setShowInfo(false);
                }}
              >
                <Card title="物资调度">
                  <div className="task-list-card-text-margin">
                    <div className="task-list-card-text-span"></div>
                    <div>调派时间：{info.createTime?.substring(0, 16)}</div>
                  </div>
                  <div className="task-list-card-text-margin">
                    <div className="task-list-card-text-span"></div>
                    <div>操作人：{info.operatorName}</div>
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
                    <div style={{ width: "100%" }}>
                      <div className="task-list-card-text-margin">
                        <div className="task-list-card-text-span"></div>
                        <div>调度人员：</div>
                      </div>
                      <Table
                        columns={[
                          {
                            title: "仓库名称",
                            dataIndex: "materialWarehouseId",
                            width: "25%",
                            render: (row) => materialWarehouse[row],
                          },
                          {
                            title: "物品名称",
                            dataIndex: "materialWarehouseName",
                          },
                          {
                            title: "调派数量",
                            dataIndex: "materialNumber",
                            // width: "25%"
                          },
                          { title: "单位", dataIndex: "company" },
                          { title: "规格", dataIndex: "spec", width: "25%" },
                          // { title: "人员", dataIndex: "" },
                        ]}
                        dataSource={info.taskMaterialListList}
                      ></Table>
                    </div>
                  </div>
                </Card>
              </Modal>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    formUser: state.taskReducers.formUser,
    wareHouse: state.mapAboutReducers.wareHouse,
    wareHouseTask: state.mapAboutReducers.wareHouseTask,
    taskInfo: state.taskReducers.taskInfo,
    listRender: state.taskReducers.listRender,
    dispatchMaterial: state.taskReducers.dispatchMaterial,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MaterialDispatch);
