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
  Popover,
} from "antd";
import DYForm from "@app/components/home/form";
import moment from "moment";
import "./task.scss";
import { taskListform } from "./cconfig";
const hashHistory = createHashHistory();
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
                <Card
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
                    <a
                      onClick={() => {
                        setTaskInfo(item);
                        hashHistory.push("/home/taskInfo");
                      }}
                    >
                      进入事件
                    </a>
                  </div>
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
