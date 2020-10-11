import React, { useState } from "react";
import { Card, Button, Radio, Table, InputNumber } from "antd";
import { connect } from "react-redux";
import * as action from "../../../../redux/actions";
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
  } = props;
  const { changeTaskRenderList, changeTaskRadioType } = props.actions;
  const [number, setNumber] = useState({});
  const filterSelect = (data) => {
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
            let a = {};
            dataSource[taskRadioType].map((item) => {
              if (item.materialId == row.materialId) {
                const id = item.materialId;
                a[id] = e;
                item = { ...item, number: e };
              }
            });
            setNumber(a);
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
          for (let i in number) {
            if ((row.materialId = number[i])) {
              row.number = number[i];
            }
            // console.log(i, number[i]);
          }
          filterSelect(row)[0]
            ? ""
            : changeTaskRenderList([...listRender, row]);
        }}
      >
        添加
      </a>
    ),
  };
  return (
    <React.Fragment>
      <Card className="expert-dispatch-left">
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
              : [...columns, editColumns]
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
    taskRadioType: state.management.taskRadioType,
    listRender: state.management.listRender,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskRadio);
