import React from "react";
import { Button, Modal, Form } from "antd";
import DYTable from "@app/components/home/table";
import DYForm from "@app/components/home/form";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions";
import "../../style.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
let storeLabel = "base";
class BaseLayout extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.formRef = React.createRef();
    this.rwoFormRef = React.createRef();
  }

  componentDidMount() {
    this.props.actions.getBase({
      request: this.props.get,
      key: this.props.storeKey,
    });
  }

  render() {
    const {
      get,
      add,
      upd,
      del,
      keyId,
      storeKey,
      formItem,
      columns,
      rowSelect = [],
      columnsProps = [],
      rowSelection,
      showEdit = true,
      handleQuery,
      formatList = [],
    } = this.props;
    storeLabel = storeKey;
    const {
      getBase,
      delBase,
      addOrUpdateBase,
      showModal,
      hideModal,
    } = this.props.actions;
    const { loading, visible } = this.props;
    const getBaseHoc = (
      param = {
        current: 1,
        size: 10,
      }
    ) =>
      getBase({
        request: get,
        key: storeKey,
        param: param,
      });

    // 翻页
    const changePage = (current) => {
      getBaseHoc({
        current: current,
        size: 10,
      });
    };
    //
    const onShowSizeChange = (current, pageSize) => {
      getBaseHoc({
        current: current,
        size: pageSize,
      });
    };
    // 删除
    const confirm = (row) => {
      delBase({
        request: del,
        key: storeKey,
        query: get,
        param: {
          id: row[keyId],
          current: this.props[storeKey]?.current,
          size: this.props[storeKey]?.size,
          recordLength: this.props[storeKey].records?.length,
        },
      });
    };
    // 修改
    const update = (row) => {
      this.formRef.current.setFieldsValue(row);
      showModal();
    };
    // 提交
    function onFinish(values) {
      formatList.forEach((item) => {
        values = {
          ...values,
          [item]: moment(values[item]).format("YYYY-MM-DD HH:mm:ss"),
        };
      });
      // values = {}
      values[keyId]
        ? addOrUpdateBase({
            request: upd,
            key: storeKey,
            query: get,
            param: values,
          })
        : addOrUpdateBase({
            request: add,
            key: storeKey,
            query: get,
            param: values,
          });
    }
    // 查询
    const rowFinish = (values) => {
      handleQuery
        ? handleQuery({ ...values, current: 1, size: 10 })
        : getBaseHoc({ current: 1, size: 10, ...values });
    };
    return (
      <>
        <div className="view-query">
          <Form onFinish={rowFinish} layout="inline" ref={this.rwoFormRef}>
            {rowSelect.map((item) => (
              <Form.Item label={item.label} name={item.name} key={item.name}>
                {item.element}
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="ghost"
                onClick={() => {
                  this.rwoFormRef.current.resetFields();
                  getBaseHoc();
                }}
              >
                重置
              </Button>
            </Form.Item>
          </Form>
          {showEdit ? <Button onClick={() => showModal()}>添加</Button> : null}
        </div>
        <DYTable
          showEdit={showEdit}
          rowSelection={rowSelection}
          columnsProps={columnsProps}
          columns={columns}
          loading={loading}
          total={this.props[storeKey]?.total}
          dataSource={this.props[storeKey]?.records}
          current={this.props[storeKey]?.current}
          size={this.props[storeKey]?.size}
          rowkey={(row) => row[keyId]}
          changePage={(cur) => changePage(cur)}
          onShowSizeChange={(cur, size) => {
            onShowSizeChange(cur, size);
          }}
          confirm={confirm}
          update={update}
        ></DYTable>
        <Modal
          title="新增"
          visible={visible}
          forceRender={true}
          onCancel={() => hideModal()}
          footer={null}
          maskClosable={false}
          afterClose={() => this.formRef.current.resetFields()}
        >
          <DYForm
            id={keyId}
            formRef={this.formRef}
            name={storeKey}
            formItem={formItem}
            onFinish={onFinish}
          ></DYForm>
        </Modal>
        {this.props.children}
      </>
    );
  }
}
BaseLayout.propTypes = {
  children: PropTypes.any,
  actions: PropTypes.any,
  get: PropTypes.func,
  storeKey: PropTypes.string,
  add: PropTypes.func,
  upd: PropTypes.func,
  del: PropTypes.func,
  keyId: PropTypes.string,
  formItem: PropTypes.array,
  columns: PropTypes.array,
  rowSelect: PropTypes.array,
  columnsProps: PropTypes.array,
  rowSelection: PropTypes.object,
  showEdit: PropTypes.bool,
  handleQuery: PropTypes.func,
  loading: PropTypes.bool,
  visible: PropTypes.bool,
  formatList: PropTypes.array,
};
const mapStateToProps = (state) => {
  return {
    [storeLabel]: state.currency[storeLabel],
    loading: state.management.loading,
    visible: state.currency.visible,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);
