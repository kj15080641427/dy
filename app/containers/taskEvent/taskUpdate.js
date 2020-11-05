import React from "react";
import DYForm from "@app/components/home/form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as action from "../../redux/actions/taskEvent";
import { Input, Modal, DatePicker, Select } from "antd";
import moment from "moment";
const formItem = [
  {
    label: "事件名称",
    name: "name",
    ele: <Input></Input>,
  },
  {
    label: "发生时间",
    name: "happenTime",
    ele: <DatePicker showTime />,
  },
  {
    label: "事件等级",
    name: "grade",
    ele: (
      <Select>
        <Select.Option value={1}>一级</Select.Option>
        <Select.Option value={2}>二级</Select.Option>
        <Select.Option value={3}>三级</Select.Option>
      </Select>
    ),
  },
  {
    label: "区域位置",
    name: "address",
    ele: <Input></Input>,
  },
  {
    label: "上报人",
    name: "reportPersonName",
    ele: <Input></Input>,
  },
  {
    label: "电话",
    name: "reportPersonPhone",
    ele: <Input type="tel"></Input>,
  },
  {
    label: "事件描述",
    name: "remark",
    ele: <Input></Input>,
  },
];
const TaskUpDate = (props) => {
  const { setTaskUpdateModal, updateTaskInfo, deleteTaskInfo } = props.actions;
  const { taskUpdateMidal, taskInfo, formRef } = props;
  const onFinish = (data) => {
    console.log(data);
    data = {
      ...data,
      happenTime: moment(data.happenTime).format("YYYY-MM-DD HH:mm:ss"),
      taskEventsID: taskInfo?.taskEventsID,
    };
    updateTaskInfo(data);
  };

  return (
    <>
      <Modal
        visible={taskUpdateMidal}
        footer={null}
        forceRender={true}
        onCancel={() => {
          setTaskUpdateModal(false);
        }}
      >
        <br />
        <DYForm
          showDelete
          deleteClick={() => {
            deleteTaskInfo(taskInfo?.taskEventsID);
          }}
          formRef={formRef}
          formItem={formItem}
          onFinish={onFinish}
          showCancel
          cancelClick={() => {
            setTaskUpdateModal(false);
          }}
        ></DYForm>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    taskUpdateMidal: state.taskReducers.taskUpdateMidal,
    taskInfo: state.taskReducers.taskInfo,
  };
};
const mapDisPatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDisPatchToProps)(TaskUpDate);
