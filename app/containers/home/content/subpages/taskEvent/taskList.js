import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../../../redux/actions";
import { bindActionCreators } from "redux";
import { createHashHistory } from "history";
import {
  Modal,
  Button,
  Input,
  Pagination,
  Card,
  Col,
  Row,
} from "antd";
import DYForm from "@app/components/home/form";
import moment from "moment";
import "./task.scss";
import { taskListform } from "./cconfig";
const hashHistory = createHashHistory();

const TaskList = (props) => {
  const { taskList, taskModalVisible, taskInput } = props;
  const {
    getTaskList,
    addTaskEvent,
    setModalVislble,
    changeTaskInput,
    setTaskInfo,
  } = props.actions;

  useEffect(() => {
    getTaskList({
      current: 1,
      name: taskInput,
      size: 10,
    });
  }, []);

  const onFinish = (form) => {
    form = {
      ...form,
      happenTime: moment(form.happenTime).format("YYYY-MM-DD HH:mm:ss"),
    };
    addTaskEvent(form);
    console.log(form);
  };

  return (
    <React.Fragment>
      <div className="task-list-head">
        <Input
          value={taskInput}
          onChange={(e) => changeTaskInput(e.target.value)}
        ></Input>
        <Button
          onClick={() =>
            getTaskList({
              current: 1,
              name: taskInput,
              size: 10,
            })
          }
        >
          查询
        </Button>
        <Button
          onClick={() => {
            setModalVislble(true);
          }}
        >
          新建事件
        </Button>
      </div>
      <Card>
        {/* <Grid fluid> */}
        <Row className="task-list-card">
          {taskList?.records?.map((item) => {
            return (
              <Col key={item.taskEventsID}>
                <Card title={item.name}>
                  <div>事件时间:{item.happenTime}</div>
                  <div>事发地点:{item.address}</div>
                  <div>
                    <div> 事件描述:</div>
                    {item.remark}
                  </div>
                  <Button
                    onClick={() => {
                      setTaskInfo(item);
                      hashHistory.push("/home/taskInfo");
                    }}
                  >
                    进入事件
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>
        {/* </Grid> */}
      </Card>
      <Modal visible={taskModalVisible} footer={null} closable={false}>
        <DYForm
          formItem={taskListform}
          onFinish={onFinish}
          showCancel
          cancelClick={() => setModalVislble(false)}
        ></DYForm>
      </Modal>
      <Pagination
        defaultCurrent={1}
        // hideOnSinglePage
        total={taskList?.total}
        onChange={(page, size) => {
          getTaskList({
            current: page,
            name: taskInput,
            size: size,
          });
          console.log(page, size);
        }}
      ></Pagination>
      <div>
        本页显示{taskList?.records?.length}条事件 共有事件
        {taskList?.total}条
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    taskList: state.management.taskList,
    taskModalVisible: state.management.taskModalVisible,
    taskInput: state.management.taskInput,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
