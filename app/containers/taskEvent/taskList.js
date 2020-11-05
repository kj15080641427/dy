import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/actions/taskEvent";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import {
  Modal,
  Button,
  Input,
  Pagination,
  Card,
  Col,
  Row,
  Popover,
  Select,
} from "antd";
import DYForm from "@app/components/home/form";
import moment from "moment";
import "./task.scss";
import { taskListform } from "./cconfig";
import Head from "../../components/head/head";
import titleImg from "@app/resource/title/rwdd.png";
import RouterList from "../../components/routerlist";

const taskState = ["新事件", "进行中", "事件终止", "事件结束"];
const taskStateColor = ["#DE7D0C", "#000AFF", "black", "#0F8A4F"];
const TaskList = (props) => {
  const { taskList, taskModalVisible, taskInput } = props;
  const {
    getTaskList,
    addTaskEvent,
    setModalVislble,
    changeTaskInput,
    setTaskInfo,
  } = props.actions;
  const [page, setPage] = useState(1);

  useEffect(() => {
    getTaskList({
      current: 1,
      name: taskInput,
      size: 6,
    });
  }, []);

  const onFinish = (form) => {
    form = {
      ...form,
      happenTime: moment(form.happenTime).format("YYYY-MM-DD HH:mm:ss"),
      dataSource: 0,
    };
    addTaskEvent(form);
  };

  return (
    <div style={{ background: "#003366" }} className="task-list-body">
      <div className="top-bacground"></div>
      <div className="right-background"></div>
      <Head titleImg={titleImg} />
      <RouterList />
      <div className="task-list-head">
        <div className="task-list-head-div">
          事件名称：
          <Input
            onPressEnter={() =>
              getTaskList({
                current: 1,
                name: taskInput,
                size: 6,
              })
            }
            value={taskInput}
            onChange={(e) => changeTaskInput(e.target.value)}
          ></Input>
          事件等级：
          <Select
            defaultValue={""}
            onChange={(e) => getTaskList({ current: 1, grade: e, size: 6 })}
          >
            <Select.Option value={""}>全部</Select.Option>
            <Select.Option value={1}>一级</Select.Option>
            <Select.Option value={2}>二级</Select.Option>
            <Select.Option value={3}>三级</Select.Option>
          </Select>
          <Button
            type="primary"
            onClick={() => {
              setModalVislble(true);
            }}
          >
            新建事件
          </Button>
        </div>
      </div>
      <div className="task-list-card">
        {taskList?.records?.map((item) => {
          return (
            <div key={item.taskEventsID} className="task-list-card-item">
              <Card
                className="task-list-card-item-card"
                title={
                  <div className="task-list-card-title">
                    <div>{item.name}</div>
                    <div
                      style={{
                        color: taskStateColor[item.state],
                        fontSize: "14px",
                      }}
                    >
                      {taskState[item.state]}
                    </div>
                  </div>
                }
              >
                <div className="task-list-card-text-margin">
                  时间：{item.happenTime?.substring(0, 16)}
                </div>
                <div className="task-list-card-text-margin">
                  地点：{item.address}
                </div>
                <div className="task-list-card-text-margin">
                  <div> 事件描述：</div>
                  <div className="task-list-card-remark">
                    {" "}
                    &nbsp;&nbsp; &nbsp;&nbsp;{" "}
                    <Popover content={item.remark}>{item.remark}</Popover>
                  </div>
                </div>
                <div className="task-list-card-footer">
                  <Link
                    onClick={() => {
                      setTaskInfo(item);
                    }}
                    to={{ pathname: "/taskInfo", query: { info: item } }}
                  >
                    进入事件
                  </Link>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      {/* </Grid> */}
      <Modal visible={taskModalVisible} footer={null} closable={false}>
        <DYForm
          formItem={taskListform}
          onFinish={onFinish}
          showCancel
          cancelClick={() => setModalVislble(false)}
        ></DYForm>
      </Modal>
      <Pagination
        current={page}
        defaultPageSize={6}
        // pageSize={6}
        // hideOnSinglePage
        total={taskList?.total}
        onChange={(page, size) => {
          setPage(page);
          getTaskList({
            current: page,
            name: taskInput,
            size: 6,
          });
        }}
      ></Pagination>
      <div>
        本页显示{taskList?.records?.length}条事件 共有事件
        {taskList?.total}条
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    taskList: state.taskReducers.taskList,
    taskModalVisible: state.taskReducers.taskModalVisible,
    taskInput: state.taskReducers.taskInput,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
