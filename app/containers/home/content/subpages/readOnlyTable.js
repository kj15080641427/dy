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
      param: this.props.getAll ? { ...this.props.type } : { ...initSelect },
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
      rowSelection,
      type, //getall 参数
      footer,
    } = this.props;

    const { readOnlyTableGetAll, selectTable } = this.props.actions;

    const changePage = (current) => {
      readOnlyTableGetAll({
        request: get,
        param: { current: current, size: 10, ...type },
      });
    };
    const onShowSizeChange = (current, pageSize) => {
      readOnlyTableGetAll({
        request: get,
        param: { current: current, size: pageSize, ...type },
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
      showTotal: () =>
        `共${getAll ? readOnlyData?.length : readOnlyData?.total}条`,
    };

    const onFinish = (values) => {
      readOnlyTableGetAll({
        request: get,
        param: getAll ? { ...type, ...values } : { ...values, ...initSelect },
      });
    };
    const onReset = () => {
      this.formRef.current.resetFields();
      readOnlyTableGetAll({
        request: get,
        param: getAll ? { ...type } : { ...initSelect },
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
          pagination={getAll ? {} : pagination}
          onRow={(record) => {
            return {
              onClick: () => {
                selectTable({ key: rowKey, value: [record[rowKey]] });
              },
            };
          }}
          rowSelection={
            rowSelection
              ? {
                  fixed: true,
                  type: "radio",
                  selectedRowKeys: selected?.[rowKey],
                  onChange: (e) => {
                    selectTable({ key: rowKey, value: e });
                  },
                }
              : null
          }
          columns={columns}
          dataSource={getAll ? readOnlyData : readOnlyData?.records}
          rowKey={(row) => row[rowKey]}
          loading={readOnlyLoading}
          footer={footer}
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
  selected: PropTypes.object,
  type: PropTypes.object,
  footer: PropTypes.any,
};
const mapStateToProps = (state) => {
  return {
    readOnlyData: state.management.readOnlyData,
    readOnlyLoading: state.management.readOnlyLoading,
    selected: state.management.selected,
  };
};
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ReadOnlyTable);
