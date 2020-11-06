import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/actions/taskEvent";
import { bindActionCreators } from "redux";
import { Tabs, Table } from "antd";
import ListRender from "./component/list";
import ModalForm from "./component/modalForm";
import TaskRadio from "./component/radio";
import { materialColumns, materiaTab2lColumns } from "./cconfig";
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
  console.log(wareHouseTask, "wareHouseTask");
  const radioList = wareHouse?.map((item) => {
    return {
      label: item.name.split("防汛")[0],
      value: item.code,
    };
  });
  const onFinish = (data) => {
    console.log(data, "formUser");
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
  return (
    <div className="task-dispatch-root-body">
      <div style={{ height: "90px", background: "#003366" }}></div>
      <div className="right-background"></div>
      <Head titleImg={titleImg} />
      <RouterList />
      <PageHeader></PageHeader>
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
                  columns={materiaTab2lColumns}
                  dataSource={dispatchMaterial}
                ></Table>
              </div>
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
