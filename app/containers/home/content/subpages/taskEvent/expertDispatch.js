import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as action from "../../../redux/actions";
import { bindActionCreators } from "redux";
import { Tabs, Radio, Table, Card, Button, Modal } from "antd";
import DYForm from "@app/components/home/form";
import { List } from "react-virtualized";
import { CloseOutlined } from "@ant-design/icons";
import { expertForm } from "./cconfig";
import { createHashHistory } from "history";
const { TabPane } = Tabs;
const hashHistory = createHashHistory();
const expertType = ["市级专家", "县级专家", "乡镇专家"];

const ExpertDispatch = (props) => {
  const { expert, taskInfo, expertVisible, dispatchExpert } = props;
  const {
    getFloodExpert,
    setExpertModal,
    addExpertDispatch,
    getTaskDispatchExpert,
  } = props.actions;
  const [type, setType] = useState("all");
  const [selected, setSelected] = useState([]);

  const filterSelect = (data) => {
    return selected.filter((item) => item == data);
  };

  const columns = [
    { title: "姓名", dataIndex: "name" },
    { title: "专家级别", dataIndex: "type", render: (e) => expertType[e - 1] },
    { title: "工作单位", dataIndex: "unit" },
    { title: "专业特长", dataIndex: "major" },
    { title: "熟悉流域", dataIndex: "field" },
    { title: "电话", dataIndex: "phone" },
    {
      title: "操作",
      dataIndex: "",
      render: (row) => (
        <a
          onClick={() => {
            filterSelect(row)[0] ? "" : setSelected([...selected, row]);
          }}
        >
          添加
          {/* {selected[0] ? "已添加" : "添加"} */}
        </a>
      ),
    },
  ];
  const onFinish = (data) => {
    let formData = selected.map((item) => {
      console.log(item);
      return {
        ...data,
        name: taskInfo?.name,
        floodControlExpertCategoryID: item.floodControlExpertCategoryId,
        floodControlExpertID: item.floodControlExpertId,
        taskEventsID: taskInfo.taskEventsID,
        // ...item,
      };
    });
    addExpertDispatch(formData);
  };

  useEffect(() => {
    if (!taskInfo) {
      hashHistory.push("/home/taskList");
    } else {
      getFloodExpert();
      getTaskDispatchExpert(taskInfo?.taskEventsID);
    }
  }, [taskInfo]);

  const rowRender = (data) => {
    return (
      <>
        <Card>
          <div
            className="expert-dispatch-close"
            onClick={() => {
              setSelected([]);
            }}
          >
            <CloseOutlined />
          </div>
          已选择({selected.length})
        </Card>
        {data?.map((item) => {
          return (
            <div key={item.floodControlExpertId}>
              <Card>
                <div
                  className="expert-dispatch-close"
                  onClick={() => {
                    setSelected([...selected.filter((i) => i != item)]);
                  }}
                >
                  <CloseOutlined />
                </div>
                <div>{item.name}</div>
                <div>{item.major}</div>
              </Card>
            </div>
          );
        })}
        {selected[0] && (
          <div className="expert-right-button">
            <Button onClick={() => setExpertModal(true)} type="primary">
              调派专家
            </Button>
          </div>
        )}
      </>
    );
  };
  return (
    <React.Fragment>
      <Tabs defaultActiveKey="1">
        <TabPane key="1" tab="专家调度">
          {/* 发送消息 */}
          <Modal visible={expertVisible} footer={null} closable={false}>
            <div>发生时间: {taskInfo?.happenTime}</div>
            <div>事件描述: {taskInfo?.remark}</div>
            <DYForm
              formItem={expertForm}
              onFinish={onFinish}
              showCancel
              cancelClick={() => setExpertModal(false)}
            ></DYForm>
          </Modal>

          <div className="expert-dispatch">
            <Card className="expert-dispatch-left">
              <div className="expert-select">
                <Radio.Group
                  defaultValue="all"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <Radio.Button value="all">全部</Radio.Button>
                  <Radio.Button value="city">市级专家</Radio.Button>
                  <Radio.Button value="county">县级专家</Radio.Button>
                  <Radio.Button value="town">乡镇专家</Radio.Button>
                </Radio.Group>
                <Button onClick={() => setSelected(expert[type])}>
                  全部添加
                </Button>
              </div>
              <Table
                columns={columns}
                dataSource={expert && expert[type]}
                rowKey={(row) => row.floodControlExpertId}
              ></Table>
            </Card>
            <Card className="expert-dispatch-right">
              <div className="expert-dispatch-right-div">
                {rowRender(selected)}
                {/* <List
                  width={200}
                  height={380}
                  rowCount={selected.length}
                  rowHeight={30}
                  rowRenderer={() => rowRender(selected)}
                /> */}
              </div>
            </Card>
          </div>
        </TabPane>
        <TabPane key="2" tab="已调派专家">
          <Table
            columns={[
              columns[0],
              columns[1],
              columns[3],
              columns[4],
              columns[5],
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
  console.log(state);
  return {
    expert: state.mapAboutReducers.expert,
    taskInfo: state.management.taskInfo,
    expertVisible: state.management.expertVisible,
    dispatchExpert: state.management.dispatchExpert,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpertDispatch);
