/**
 * water 2020-06-13
 * zdl
 * 权限管理
 */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DYTable from "@app/components/home/table";
import DYForm from "@app/components/home/form";
import { Modal, Input, Button } from "antd";
import * as actions from "../../../redux/actions";
import {
  queryPermission,
  deletePermission,
  savePermission,
  updatePermission,
} from "@app/data/home";
const columns = [
  {
    title: "权限名",
    dataIndex: "permName",
    className: "column-money",
  },
  {
    title: "请求URL",
    dataIndex: "url",
    className: "column-money",
  },
  {
    title: "权限标识符",
    dataIndex: "permTag",
    className: "column-money",
  },
];
const formItem = [
  {
    name: "permName",
    label: "权限名",
    ele: <Input />,
  },
  {
    name: "url",
    label: "请求URL",
    ele: <Input />,
  },
  {
    name: "permTag",
    label: "权限标识符",
    ele: <Input />,
  },
];
class Jurisdiction extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      inputValue: "",
    };
    this.formRef = React.createRef();
  }
  componentDidMount() {
    // this.props.actions.getPermissionData();
    this.props.actions.getBase({
      request: queryPermission,
      param: {
        current: 1,
        size: 10,
      },
      key: "permission",
    });
  }
  render() {
    const {
      hideModal,
      showModal,
      getBase,
      delBase,
      addOrUpdateBase,
    } = this.props.actions;
    const { permission, loading, visible,rowSelection } = this.props;
    const { inputValue } = this.state;
    const getBaseHoc = (param = { current: 1, size: 10 }) => {
      return getBase({
        request: queryPermission,
        param: param,
        key: "permission",
      });
    };
    //提交
    const onFinish = (values) => {
      values.permissionId
        ? addOrUpdateBase({
            request: updatePermission,
            key: "permission",
            query: queryPermission,
            param: values,
          })
        : addOrUpdateBase({
            request: savePermission,
            key: "permission",
            query: queryPermission,
            param: values,
          });
      console.log(values, "values");
    };
    //根据id删除
    const confirm = (row) => {
      delBase({
        request: deletePermission,
        key: "permission",
        query: queryPermission,
        param: {
          id: row.permissionId,
          current: permission?.current,
          size: permission.size,
          recordLength: permission.records.length,
        },
      });
      // deleteSiteWater({
      //   id: row.permissionId,
      //   current: permission?.current,
      //   size: permission.size,
      //   recordLength: permission.records.length,
      // });
    };
    //切换每页数量
    const onShowSizeChange = (current, pageSize) => {
      getBaseHoc({ current: current, size: pageSize });
    };
    // 回调函数，切换下一页
    const changePage = (current) => {
      getBaseHoc({ current: current, size: 10 });
    };
    const update = (row) => {
      this.formRef.current.setFieldsValue(row);
      showModal();
    };
    return (
      <>
        {/* 条件查询行 */}
        <div className="view-query">
          <div>
            <Input
              value={inputValue}
              onChange={(e) => {
                this.setState({
                  inputValue: e.target.value,
                });
              }}
              placeholder="输入权限名称"
            ></Input>
          </div>
          <Button
            type="primary"
            onClick={() => {
              getBaseHoc({ current: 1, size: 10, permName: inputValue });
            }}
          >
            查询
          </Button>
          <Button
            type="ghost"
            onClick={() => {
              getBaseHoc();
              this.setState({
                inputValue: "",
              });
            }}
          >
            重置
          </Button>
          <Button onClick={() => showModal()}>添加</Button>
        </div>
        <DYTable
          rowSelection={rowSelection}
          columns={columns}
          loading={loading}
          total={permission?.total}
          dataSource={permission?.records}
          current={permission?.current}
          size={permission?.size}
          rowkey={(row) => row.permissionId}
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
            id="permissionId"
            formRef={this.formRef}
            name="siteWater"
            formItem={formItem}
            onFinish={onFinish}
          ></DYForm>
        </Modal>
      </>
    );
  }
}
function mapStateToProps(state) {
  // console.log(state, "STATE");
  return {
    permission: state.currency.permission,
    visible: state.currency.visible,
    loading: state.management.loading,
  };
}

function mapDispatchToProps(dispatch) {
  // bindActionCreators 合并action
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Jurisdiction);
//322行
