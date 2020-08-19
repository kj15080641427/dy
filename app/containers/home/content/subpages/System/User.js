/**
 * Authority 2020-06-12
 * zdl
 * 用户设置
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@app/redux/actions/home';
import { Table, Row, Modal, Input, Button, Select, Form, Radio, DatePicker, Switch, Popconfirm, message } from 'antd';
import { SearchOutlined, RedoOutlined, PlusCircleOutlined, CloseCircleOutlined, FormOutlined } from '@ant-design/icons';
// import Form from 'antd/lib/form/Form';
import UserForm from "./SystemForm/UserForm"
import moment from 'moment'
import { queryUser, deleteUser, updateUser, saveUser } from '@app/data/request';

class User extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: [],//数据源
      loading: false,//数据源加载
      total: 0,
      current: 1,
      pageSize: 10,
      modalvisible: false,
      confirmLoading: false,//模态框提交动画
      selectObj: {
        name: ""
      },//条件查询对象
      rowObj: null,//修改打开模态框带走行值,
      form: {}
    };
    this.formRef = React.createRef();
    this.saveRef = React.createRef();
  }
  render() {
    // const [form] = Form.useForm();
    this.formRef = React.createRef();
    const { dataSource, loading, total, current, pageSize, modalvisible, rowObj } = this.state;
    const ckcolumns = [
      {
        title: '用户名',
        dataIndex: 'username',
        className: 'column-money',
      },
      {
        title: '用户姓名',
        dataIndex: 'realname',
        className: 'column-money',
      },
      {
        title: '状态',
        dataIndex: 'state',
        className: 'column-money',
        render: (state) => {
          if (state === "0") {
            return (
              <a>正常</a>
            )
          } else {
            return (
              <a style={{ color: "red" }}>冻结</a>
            )
          }
        }
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        className: 'column-money',
        sorter: (a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime(),
      },
      {
        title: '操作',
        dataIndex: 'isShow',
        className: 'column-money',
        width: 200,
        fixed: 'right',
        render: (isShow, row) => {
          return (
            <Radio.Group value="large" onChange={this.handleSizeChange}>
              <Popconfirm
                title="确定永久删除该数据吗?"
                onConfirm={() => this.confirm(row)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button icon={<CloseCircleOutlined />}>删除</Button>
              </Popconfirm>
              <Button onClick={() => SelectById(row)} icon={<FormOutlined />}>修改</Button>
            </Radio.Group >
          )
        }
      },
    ];

    function cancel(e) {
      message.error('取消删除！');
    }

    //分页设置
    let pagination = {
      total: total,
      size: "default",
      current: current,
      // hideOnSinglePage: true,
      showQuickJumper: true,
      showSizeChanger: true,
      onChange: (current) => this.changePage(current),
      pageSize: pageSize,
      onShowSizeChange: (current, pageSize) => {//设置每页显示数据条数，current表示当前页码，pageSize表示每页展示数据条数
        this.onShowSizeChange(current, pageSize)
      },
      showTotal: () => `共${total}条`,
    }
    //重置
    const onReset = () => {
      this.setState({ loading: true });
      this.formRef.current.resetFields();
      queryUser({
        "current": 1,
        "size": 10,
      })
        .then((result) => {
          this.setState({
            selectObj: {
              name: ""
            },
            loading: false,
            dataSource: result.data.records,
            current: result.data.current,
            pageSize: 10,
            total: result.data.total,
          })

        })
    }
    //查询表单提交
    const onFinish = values => {
      this.setState({
        current: 1,
        pageSize: 10,
        selectObj: {
          name: values.name
        }
      })
      this.selectPage()
    };
    //打开添加模态框
    const showModal = (event) => {
      this.setState({
        modalvisible: true,
      });
      // this.setState({
      //   form: form
      // })
    };
    //根据id查询并打开模态框
    const SelectById = (row) => {
      row = {...row,createTime:moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')}
      this.setState({
        modalvisible: true,
        rowObj: row
      })
      this.saveRef.current.setFieldsValue(row)
      // this.addform.current.setFieldsValue({
      //   name: row.name,
      //   lon: row.lon,
      //   lat: row.lat,
      //   materialWarehouseId: row.materialWarehouseId
      // })
    }
    return (
      <>
        {/* 条件查询行 */}
        <Row style={{ height: 60 }}>
          <Form
            ref={this.formRef}
            name="basic"
            initialValues={{
              remember: true,
            }}
            layout="inline"
            onFinish={onFinish}
          >
            <Form.Item
              label="用户名"
              name="name"
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item>
              <Button size="large" type="primary" htmlType="submit" icon={<SearchOutlined />}>
                查询
        </Button>
            </Form.Item>
            <Form.Item>
              <Button size="large" htmlType="button" onClick={onReset} icon={<RedoOutlined />}>重置</Button>
            </Form.Item>
            <Form.Item>
              <Button size="large" htmlType="button" onClick={showModal} icon={<PlusCircleOutlined />}>增加</Button>
            </Form.Item>
          </Form>
        </Row>


        <Table
          loading={loading}
          columns={ckcolumns}
          dataSource={dataSource}
          scroll={{ y: 700 }}
          rowKey={row => row.materialWarehouseId}
          pagination={pagination}
        ></Table>
        <UserForm
          visible={modalvisible}
          onCancel={this.handleCancel}
          rowObj={rowObj}
          form={this.saveRef}
          selectPage={this.selectPage}
        ></UserForm>
        {/* 模态框面板 */}
      </>
    );
  }

  //根据id删除
  confirm(row) {
    deleteUser(
      row.userId
    ).then((result) => {
      this.selectPage()
      message.success('删除成功！');
    })
  }


  //关闭添加模态框
  handleCancel = () => {
    this.setState({
      modalvisible: false,
      rowObj: null
    })
    this.saveRef.current.resetFields()
  };
  //切换每页数量
  onShowSizeChange(current, pageSize) {
    this.setState({ loading: true });
    queryUser({
      "current": current,
      "size": pageSize,
      "realname": this.state.selectObj.name || ''
    })
      .then((result) => {
        this.setState({
          loading: false,
          dataSource: result.data.records,
          pageSize: pageSize,
          total: result.data.total,
          current: result.data.current,
        })
      })
  }
  // 回调函数，切换下一页
  changePage(current) {
    this.setState({ loading: true });
    queryUser({
      "current": current,
      "size": this.state.pageSize,
      "realname": this.state.selectObj.name || ''
    })
      .then((result) => {
        this.setState({
          loading: false,
          dataSource: result.data.records,
          pageSize: result.data.pageSize,
          total: result.data.total,
          current: result.data.current,
        })
      })
  }
  selectPage = () => {
    this.setState({
      loading: true
    })
    queryUser({
      "current": this.state.current,
      "size": this.state.pageSize,
      "realname": this.state.selectObj.name || ''
    }).then((result) => {
      this.setState({
        loading: false,
        dataSource: result.data.records,
        total: result.data.total,
        current: result.data.current
      })
    })
  }
  componentDidMount() {
    this.selectPage()

  }
}
function mapStateToProps(state) {
  return {
    test: state.home.test,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);