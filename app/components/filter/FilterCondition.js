import React, { useState, useEffect, useRef } from "react";
import {
  Input,
  TreeSelect,
  DatePicker,
  InputNumber,
  Checkbox,
  Button,
  Select,
  Form,
  Row,
} from "antd";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import "./style.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../containers/home/redux/actions";
const { RangePicker } = DatePicker;

const FilterCondition = (props) => {
  const [rangeFlag, setRangeFlag] = useState(false);
  const [min, setMin] = useState();
  const formRef = useRef();
  const { getDict, getArea } = props.actions;
  const { dataFromDict, onFinish, reset, exportData, area, minData } = props;

  useEffect(() => {
    getDict();
    getArea();
  }, []);

  const onReset = () => {
    formRef.current.resetFields();
    reset && reset();
  };

  return (
    <div className={"fc_container"}>
      <Form onFinish={onFinish} ref={formRef}>
        <Row>
          <Form.Item name="addvcd">
            <TreeSelect
              treeDefaultExpandAll
              treeData={area}
              style={{ width: "200px" }}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              placeholder={"行政区域"}
            />
          </Form.Item>
          <Form.Item name="stnm">
            <Input placeholder={"站点名称"} />
          </Form.Item>
          <Form.Item name="time">
            <RangePicker showTime />
          </Form.Item>
          <Form.Item name="">
            <Checkbox onChange={(e) => setRangeFlag(e.target.checked)}>
              {"选择范围"}
            </Checkbox>
          </Form.Item>
          <Form.Item name="min">
            <InputNumber
              placeholder={"最小值"}
              disabled={!rangeFlag}
              value={min}
              min={minData}
              onChange={(e) => {
                setMin(e);
              }}
            />
          </Form.Item>
          <Form.Item name="max">
            <InputNumber
              placeholder={"最大值"}
              disabled={!rangeFlag}
              min={min}
            />
          </Form.Item>
          <Form.Item name="siteDictionariesId">
            <Select
              placeholder={"数据来源"}
              onChange={(e) => console.log(e, "来源")}
            >
              {dataFromDict?.map((item) => (
                <Select.Option
                  key={item.stateRelationID}
                  value={item.stateRelationID}
                >
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>{props.children}</Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              onClick={props.onSearch}
            >
              查询
            </Button>
          </Form.Item>
          <Form.Item name="addvcd">
            <Button onClick={onReset}>重置</Button>
          </Form.Item>
          <Form.Item name="addvcd">
            <Button icon={<DownloadOutlined />} onClick={exportData}>
              导出
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataFromDict: state.currency.dataFromDict,
    area: state.management.area,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterCondition);
