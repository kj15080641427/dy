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
import { UserSwitchOutlined } from "@ant-design/icons";
import { getRole, addRole, updateRole, delRole } from "@app/data/home";
import Jurisdiction, { ReadonlyPermission } from "./Jurisdiction";
const formItem = [
  {
    name: "roleName",
    label: "角色名称",
    ele: <Input />,
  },
  {
    name: "roleDesc",
    label: "角色说明",
    ele: <Input />,
  },
];
class Role extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      inputValue: "",
      row: {},
      list: [],
    };
    this.formRef = React.createRef();
  }
  componentDidMount() {
    // this.props.actions.getPermissionData();
    this.props.actions.getBase({
      request: getRole,
      param: {
        current: 1,
        size: 10,
      },
      key: "role",
    });
  }
  render() {
    const {
      hideModal,
      showModal,
      getBase,
      delBase,
      addOrUpdateBase,
      getPermissionDataById,
      hideRPModal,
      setSelectList, // 设置选中项
      setRolePermission,
    } = this.props.actions;
    const {
      role = {},
      loading,
      visible,
      permissionList,
      modalVisible,
    } = this.props;
    const { inputValue, row } = this.state;
    // 授权
    const rolePermission = (row) => {
      this.setState({
        row: row,
      });
      getPermissionDataById(row.roleId);
    };
    const columns = [
      {
        title: "角色名称",
        dataIndex: "roleName",
      },
      {
        title: "角色说明",
        dataIndex: "roleDesc",
      },
      {
        title: "授权",
        dataIndex: "",
        render: (e) => (
          <Button
            onClick={() => rolePermission(e)}
            icon={<UserSwitchOutlined />}
          >
            授权
          </Button>
        ),
      },
    ];

    const getBaseHoc = (param = { current: 1, size: 10 }) =>
      getBase({
        request: getRole,
        param: param,
        key: "role",
      });

    // 提交
    const onFinish = (values) => {
      values.roleId
        ? addOrUpdateBase({
            //
            request: updateRole,
            key: "role",
            query: getRole,
            param: values,
          })
        : addOrUpdateBase({
            request: addRole,
            key: "role",
            query: getRole,
            param: values,
          });
    };
    // 根据id删除
    const confirm = (row) => {
      delBase({
        request: delRole,
        key: "role",
        query: getRole,
        param: {
          id: row.roleId,
          current: role?.current,
          size: role.size,
          recordLength: role.records.length,
        },
      });
    };
    // 切换每页数量
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
              getBaseHoc({ current: 1, size: 10, roleName: inputValue });
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
          columns={columns}
          loading={loading}
          total={role?.total}
          dataSource={role?.records}
          current={role?.current}
          size={role?.size}
          rowkey={(row) => row.roleId}
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
            id="roleId"
            formRef={this.formRef}
            name="role"
            formItem={formItem}
            onFinish={onFinish}
          ></DYForm>
        </Modal>
        <Modal
          width={"80%"}
          title={`${row.roleName}授权`}
          visible={modalVisible}
          maskClosable={false}
          destroyOnClose
          okText="授权"
          onOk={() => {
            setRolePermission({
              roleId: row.roleId,
              permissionIdList: permissionList,
            });
          }}
          onCancel={() => {
            hideRPModal();
          }}
        >
          <ReadonlyPermission
            rowSelection={{
              fixed: true,
              type: "checkbox",
              selectedRowKeys: permissionList,
              onChange: (keys) => {
                setSelectList(keys);
                this.setState({
                  list: keys,
                });
              },
              // onSelectAll: (statu, selectedRows, changeRows) => {
              //   if (statu) {
              //   }
              //   console.log(statu, selectedRows, changeRows);
              // },
            }}
          />
          {/* <Jurisdiction
            rowSelection={{
              fixed: true,
              selectedRowKeys: permissionList,
              onChange: (keys, row) => {
                setSelectList(keys);
                console.log(keys, "KEYS");
              },
            }}
          ></Jurisdiction> */}
        </Modal>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    role: state.currency.role,
    visible: state.currency.visible,
    loading: state.management.loading,
    permissionList: state.management.permissionList,
    modalVisible: state.management.modalVisible,
  };
}

function mapDispatchToProps(dispatch) {
  // bindActionCreators 合并action
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Role);
