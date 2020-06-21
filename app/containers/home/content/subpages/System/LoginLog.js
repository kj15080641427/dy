/**
 * water 2020-06-12
 * zdl
 * 登录日志
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@app/redux/actions/home';
import { Table, Row, Modal, Input, Button, Select, Form, Radio, DatePicker, Switch, Popconfirm, message } from 'antd';
import { SearchOutlined, RedoOutlined, PlusCircleOutlined, CloseCircleOutlined, FormOutlined } from '@ant-design/icons';
import { usersLoginLog } from '@app/data/request';
import moment from 'moment';

class LoginLog extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: [],//数据源
      loading: false,//数据源加载
      total: 0,
      current: 1,
      pageSize: 10,
      selectObj: {
        name: "",
        ip: "",
        starttime: "",
        endtime: "",
        isok: "",
        isSort: false
      },//条件查询对象
    };
    this.formRef = React.createRef();
  }
  render() {
    console.log("Test this.props.match", this.props.match, this.props.location);
    const { dataSource, loading, total, current, pageSize, rowObj } = this.state;
    const ckcolumns = [
      {
        title: '用户名',
        dataIndex: 'username',
        className: 'column-money',
      },
      {
        title: 'ip地址',
        dataIndex: 'ip',
        className: 'column-money',
      },
      {
        title: '登录时间',
        dataIndex: 'loginTime',
        className: 'column-money',
        sorter: true
      },
      {
        title: '是否登录成功',
        dataIndex: 'isSuccess',
        className: 'column-money',
        render: (isSuccess) => {
          if (isSuccess === "0") {
            return (
              <a>成功</a>
            )
          } else {
            return (
              <a style={{ color: "red" }}>失败</a>
            )
          }
        }
      },
    ];

    // function cancel(e) {
    //     console.log(e);
    //     message.error('取消删除！');
    // }

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
        console.log(pageSize);
        this.onShowSizeChange(current, pageSize)
      },
      showTotal: () => `共${total}条`,
    }
    //重置
    const onReset = () => {
      console.log(this.formRef.current)
      this.setState({
        loading: true
      });
      this.formRef.current.resetFields();
      usersLoginLog({
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
          name: values.name,
          ip: values.ip,
          starttime: this.state.selectObj.starttime,
          endtime: this.state.selectObj.endtime
        }
      })
      this.selectPage()
    };
    //增加打开对话框
    const showModal = () => {
      this.setState({
        createPlanModalVisible: true
      })
    }
    const { RangePicker } = DatePicker;
    const onChange = (value, dateString) => {
      console.log('Selected Time: ', value);
      console.log('Formatted Selected Time: ', dateString);
      console.log("开始时间", dateString[0])
      this.setState({
        selectObj: {
          starttime: dateString[0],
          endtime: dateString[1]
        }
      })
    }

    const onOk = (value) => {
      console.log('onOk:', value);
      this.setState({
        selectObj: {
          starttime: moment(value[0]).format("YYYY-MM-DD HH:mm:ss"),
          endtime: moment(value[1]).format("YYYY-MM-DD HH:mm:ss"),
        }
      })
    }
    //排序
    const handleTableChange = (pagination, filters, sorter, extra) => {
      console.log(sorter)
      if (sorter.order === "ascend") {
        this.setState({
          selectObj: {
            isSort: true
          }
        })
      } else if (sorter.order === "descend") {
        this.setState({
          selectObj: {
            isSort: false
          }
        })
      } else if (sorter.order === undefined) {
        this.setState({
          selectObj: {
            isSort: false
          }
        })
      }
      this.selectPage()
    }
    return (
      <>
        <Table
          loading={loading}
          columns={ckcolumns}
          dataSource={dataSource}
          scroll={{ y: 700 }}
          pagination={pagination}
          rowKey={row => row.usersLoginLogID}
          onChange={handleTableChange}
          title={() =>
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
              <Form.Item
                label="ip地址"
                name="ip"
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                label="时间区间"
                name=""
              >
                <RangePicker
                  size="large"
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  onChange={onChange}
                  onOk={onOk}
                />
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
                {/* <Button
                  size="large"
                  htmlType="button"
                  onClick={showModal}
                  icon={<PlusCircleOutlined />}>增加</Button> */}
              </Form.Item>
            </Form>
          }
        ></Table>
      </>
    );
  }
  // //根据id删除
  // confirm(row) {
  //   console.log(row);
  //   deletePermission({
  //       "permissionId": row.permissionId
  //   }).then((result) => {
  //       this.selectPage()
  //       message.success('删除成功！');
  //   })
  // }

  //切换每页数量
  onShowSizeChange(current, pageSize) {
    this.setState({ loading: true });
    usersLoginLog({
      "current": current,
      "size": pageSize,
      "username": this.state.selectObj.name,
      "ip": this.state.selectObj.ip,
      "beginLoginTime": this.state.selectObj.starttime,
      "endLoginTime": this.state.selectObj.endtime,
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
    console.log(current)
    this.setState({ loading: true });
    usersLoginLog({
      "current": current,
      "size": this.state.pageSize,
      "username": this.state.selectObj.name,
      "ip": this.state.selectObj.ip,
      "beginLoginTime": this.state.selectObj.starttime,
      "endLoginTime": this.state.selectObj.endtime,
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
    usersLoginLog({
      "current": this.state.current,
      "size": this.state.pageSize,
      "username": this.state.selectObj.name,
      "ip": this.state.selectObj.ip,
      "beginLoginTime": this.state.selectObj.starttime,
      "endLoginTime": this.state.selectObj.endtime,
      "sort": "loginTime",
      "isSort": this.state.selectObj.isSort,
    }).then((result) => {
      console.log(result)
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
)(LoginLog);