/**
 * Expert 2020-06-04
 * zdl
 * 专家库
 */
import React from "react";
import { Table, Button, Form } from "antd";
import * as actions from "../../redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SearchOutlined, RedoOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
const initSelect = { current: 1, size: 10 };
class ReadOnlyTable extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }
  componentDidMount() {
    this.props.actions.readOnlyTableGetAll({
      request: this.props.get,
      getAll: this.props.getAll,
      param: initSelect,
    });
  }

  render() {
    const {
      rowSelect = [],
      columns = [],
      rowKey,
      get,
      getAll = false,
      readOnlyData,
      selected,
      readOnlyLoading,
    } = this.props;

    const { readOnlyTableGetAll, selectTable } = this.props.actions;

    const changePage = (current) => {
      readOnlyTableGetAll({
        request: get,
        getAll: getAll,
        param: { current: current, size: 10 },
      });
    };
    const onShowSizeChange = (current, pageSize) => {
      readOnlyTableGetAll({
        request: get,
        getAll: getAll,
        param: { current: current, size: pageSize },
      });
    };

    let pagination = {
      total: readOnlyData?.total,
      size: "default",
      current: readOnlyData?.current,
      showQuickJumper: true,
      showSizeChanger: true,
      onChange: (current) => changePage(current),
      pageSize: readOnlyData?.size,
      onShowSizeChange: (current, pageSize) => {
        // 设置每页显示数据条数，current表示当前页码，pageSize表示每页展示数据条数
        onShowSizeChange(current, pageSize);
      },
      showTotal: () => `共${readOnlyData?.total}条`,
    };

    const onFinish = (values) => {
      readOnlyTableGetAll({
        request: get,
        getAll: getAll,
        param: { ...values, ...initSelect },
      });
    };
    const onReset = () => {
      this.formRef.current.resetFields();
      readOnlyTableGetAll({
        request: get,
        getAll: getAll,
        param: initSelect,
      });
    };
    return (
      <>
        <Form ref={this.formRef} layout="inline" onFinish={onFinish}>
          {rowSelect.map((item, index) => (
            <Form.Item label={item.label} name={item.name} key={index}>
              {item.element}
            </Form.Item>
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button htmlType="button" onClick={onReset} icon={<RedoOutlined />}>
              重置
            </Button>
          </Form.Item>
        </Form>
        <Table
          pagination={pagination}
          rowSelection={{
            fixed: true,
            type: "radio",
            selectedRowKeys: selected,
            onChange: (e) => {console.log(e,'?????????????'),selectTable(e)},
          }}
          columns={columns}
          dataSource={getAll ? readOnlyData : readOnlyData?.records}
          rowKey={(row) => row[rowKey]}
          loading={readOnlyLoading}
        />
      </>
    );
  }
}

ReadOnlyTable.propTypes = {
  rowSelect: PropTypes.array,
  get: PropTypes.func,
  columns: PropTypes.array,
  rowKey: PropTypes.string,
  readOnlyLoading: PropTypes.bool,
  getAll: PropTypes.bool,
  rowSelection: PropTypes.object,
  actions: PropTypes.any,
  readOnlyData: PropTypes.any,
  selected: PropTypes.array,
};
const mapStateToProps = (state) => {
  // console.log(state, "STATE");
  return {
    readOnlyData: state.management.readOnlyGetAll,
    readOnlyLoading: state.management.readOnlyLoading,
    selected: state.management.selected,
  };
};
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ReadOnlyTable);
