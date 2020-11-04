import React, { useEffect, useState } from "react";
import { Modal, Tree, Input } from "antd";
import DYForm from "@app/components/home/form";
import { connect } from "react-redux";
import * as action from "../../../redux/actions/taskEvent";
import { bindActionCreators } from "redux";
import { expertForm } from "../cconfig";
import TreeSelected from "./tree";
import "../task.scss";

const ModalForm = (props) => {
  const { taskInfo, expertVisible, onFinish, showTree, floodRanks } = props;
  const { setExpertModal, getFloodRankUser, setFormUser } = props.actions;
  const [selectNode, setSeleteNode] = useState([4632]);
  const [inputvalue, setInputValue] = useState([]);
  const treeData = floodRanks?.map((item) => {
    return {
      title: item.name,
      key: item.name,
      children: item?.userList?.map((temp) => {
        return {
          title: temp.name,
          key: `${temp.name}|${temp.floodId}`,
        };
      }),
    };
  });
  const treeItem = {
    label: "选择人员",
    name: "user",
    ele: (
      <TreeSelected
        placeholderInfo="点击选择防汛人员"
        treeData={treeData}
        onChange={(value) => setFormUser(value)}
      />
    ),
  };

  useEffect(() => {
    getFloodRankUser();
  }, []);
  return (
    <React.Fragment>
      <Modal visible={expertVisible} footer={null} closable={false}>
        <div>发生时间: {taskInfo?.happenTime}</div>
        <div>事件描述: {taskInfo?.remark}</div>
        <div className="model-form-scroll">
          <DYForm
            formItem={showTree ? [...expertForm, treeItem] : expertForm}
            onFinish={onFinish}
            showCancel
            cancelClick={() => setExpertModal(false)}
          ></DYForm>
        </div>
      </Modal>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  // console.log(state, "SSSTATA");
  return {
    floodRanks: state.mapAboutReducers.floodRanks,
    listRender: state.taskReducers.listRender,
    taskInfo: state.taskReducers.taskInfo,
    expertVisible: state.taskReducers.expertVisible,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);
