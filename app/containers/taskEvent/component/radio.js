import React, { useState } from "react";
import { Card, Button, Radio, Table, InputNumber, message, Input } from "antd";
import { connect } from "react-redux";
import * as action from "../../../redux/actions/taskEvent";
import { bindActionCreators } from "redux";

const TaskRadio = (props) => {
  const {
    columns,
    taskRadioType,
    radioList,
    radioText,
    dataSource,
    defaultRadio,
    listRender,
    rowKey,
    isMaterial = false,
    addAll = true,
    tableNumber,
    showSearch = false,
    onSearch,
  } = props;
  const {
    changeTaskRenderList,
    changeTaskRadioType,
    setMaterialTableInput, //table选择数量
  } = props.actions;
  const [inputValue, setInputValue] = useState("");

  const filterSelect = (data) => {
    return listRender.filter((item) => item.materialId == data.materialId);
  };
  const baseFilter = (data) => {
    return listRender.filter((item) => item == data);
  };
  const addColumns = {
    title: "调派数量",
    dataIndex: "",
    render: (row) => {
      return (
        <InputNumber
          min={0}
          max={row.saveTotal}
          onChange={(e) => {
            setMaterialTableInput({ row: row, number: e });
          }}
        />
      );
    },
  };
  const editColumns = {
    title: "操作",
    dataIndex: "",
    render: (row) => (
      <a
        onClick={() => {
          tableNumber.map((item) => {
            if (item.materialId == row.materialId) {
              row = { ...item };
            }
          });
          if (row.number) {
            filterSelect(row)[0]
              ? ""
              : changeTaskRenderList([...listRender, row]);
          } else {
            message.error(`请选择${row.name}数量`);
          }
        }}
      >
        添加
      </a>
    ),
  };
  const baseEditColumns = {
    title: "操作",
    dataIndex: "",
    render: (row) => (
      <a
        onClick={() => {
          baseFilter(row)[0] ? "" : changeTaskRenderList([...listRender, row]);
        }}
      >
        添加
      </a>
    ),
  };
  return (
    <React.Fragment>
      <Card className="expert-dispatch-left">
        {showSearch ? (
          <div className="task-dispatch-search">
            姓名:
            <Input
              className="search-input"
              onChange={(e) => setInputValue(e.target.value)}
            ></Input>
            <Button type="primary" onClick={() => onSearch(inputValue)}>
              搜索
            </Button>
          </div>
        ) : null}
        <div className="expert-select">
          <div>
            {radioText}:&ensp; &ensp;&ensp;&ensp;
            <Radio.Group
              defaultValue={defaultRadio}
              onChange={(e) => {
                changeTaskRadioType(e.target.value);
              }}
            >
              {radioList?.map((item) => (
                <Radio.Button value={item.value} key={item.value}>
                  {item.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
          {addAll ? (
            <Button
              onClick={() => changeTaskRenderList(dataSource[taskRadioType])}
            >
              全部添加
            </Button>
          ) : (
            ""
          )}
        </div>
        <Table
          columns={
            isMaterial
              ? [...columns, addColumns, editColumns]
              : [...columns, baseEditColumns]
          }
          dataSource={dataSource && dataSource[taskRadioType]}
          rowKey={(row) => row[rowKey]}
        ></Table>
      </Card>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    taskRadioType: state.taskReducers.taskRadioType,
    listRender: state.taskReducers.listRender,
    tasMaterialkUser: state.taskReducers.tasMaterialkUser,
    tableNumber: state.taskReducers.tableNumber, //物资数量
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskRadio);
