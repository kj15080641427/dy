import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../../../redux/actions";
import { bindActionCreators } from "redux";
import { Tabs, Table } from "antd";
import ListRender from "./component/list";
import ModalForm from "./component/modalForm";
import TaskRadio from "./component/radio";
import { materialColumns, materiaTab2lColumns } from "./cconfig";
import { createHashHistory } from "history";
import PageHeader from "./component/pageHeader";
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
      hashHistory.push("/home/taskList");
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
    // console.log(formUser, "formUser");
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
    <React.Fragment>
      <PageHeader></PageHeader>
      <Tabs defaultActiveKey="1">
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
          <Table
            columns={materiaTab2lColumns}
            dataSource={dispatchMaterial}
          ></Table>
        </TabPane>
      </Tabs>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    formUser: state.management.formUser,
    wareHouse: state.mapAboutReducers.wareHouse,
    wareHouseTask: state.mapAboutReducers.wareHouseTask,
    taskInfo: state.management.taskInfo,
    listRender: state.management.listRender,
    dispatchMaterial: state.management.dispatchMaterial,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MaterialDispatch);
