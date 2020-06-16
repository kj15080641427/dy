/**
 * FloodPrevention 2020-06-04
 * zdl
 * 防汛人员
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@app/redux/actions/home';
import { queryFloodUser, saveFloodUser, deleteFloodUser, updateFloodUser } from '@app/data/request';
import { Table, Row, Modal, Input, Button, Select, Form, Radio, DatePicker, Switch, Popconfirm, message } from 'antd';
import moment from 'moment';
import { FormInstance } from 'antd/lib/form';

class FloodPrevention extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: [],//物资数据源
      loading: false,//物资数据源加载
      total: 0,
      current: 1,
      pageSize: 10,
      ckdataSource: [],//仓库数据源
      modalvisible: false,//模态框
      confirmLoading: false,//模态框提交动画
      selectObj: {
        grade: null,
        query: ""
      },//条件查询对象
    };
    this.formRef = React.createRef(<FormInstance></FormInstance>);
    this.addform = React.createRef(<FormInstance></FormInstance>);
  }
  render() {
    console.log("FloodPrevention this.props.match", this.props.match, this.props.location);
    const { dataSource, loading, ckdataSource, total, current, pageSize, modalvisible, confirmLoading, selectObj } = this.state;
    const ckcolumns = [
      {
        title: '防汛人员ID',
        dataIndex: 'floodId',
        className: 'column-money',
        fixed: 'left',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        className: 'column-money',
        fixed: 'left',
      },
      {
        title: '性别',
        dataIndex: 'sex	',
        className: 'column-money',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        className: 'column-money',
      },
      {
        title: '单位',
        dataIndex: 'unit',
        className: 'column-money',
      },
      {
        title: '联系电话',
        dataIndex: 'phone',
        className: 'column-money',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        className: 'column-money',
      },
      {
        title: '上一级',
        dataIndex: 'parent',
        className: 'column-money',
      },
      {
        title: '是否显示',
        dataIndex: 'isShow',
        className: 'column-money',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        className: 'column-money',
      },
      {
        title: '等级',
        dataIndex: 'grade',
        className: 'column-money',
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
                <Button>删除</Button>
              </Popconfirm>
              <Button onClick={() => SelectById(row)}>修改</Button>
            </Radio.Group>
          )
        }
      },
    ];
    function cancel(e) {
      console.log(e);
      message.error('取消删除！');
    }
    //根据id查询并打开模态框
    const SelectById = (row) => {
      this.setState({
        modalvisible: true
      })
      console.log(row)
      this.addform.current.setFieldsValue(
        row
        //   {
        //   name: row.name,
        //   company: row.company,
        //   createTime: row.createTime,
        //   expireDate: row.expireDate,
        //   isShow: row.isShow,
        //   manufactureDate: moment(row.manufactureDate).valueOf(),
        //   materialId: row.materialId,
        //   materialWarehouseId: row.materialWarehouseId,
        //   money: row.money,
        //   saveTotal: row.saveTotal,
        //   spec: row.spec,
        //   warningNumber: row.warningNumber
        // }
      )
    }
    //重置
    const onReset = () => {
      console.log(this.formRef.current)
      this.formRef.current.resetFields();
      this.setState({
        loading: true
      })
      queryFloodUser({
        "current": 1,
        "size": 10,
      }).then((result) => {
        console.log(result)
        this.setState({
          loading: false,
          dataSource: result.data.records,
          total: result.data.total,
          current: result.data.current
        })
      })
    };
    //查询表单提交
    const onFinish = values => {
      console.log('Success:', values);
      this.setState({
        current: 1,
        pageSize: 10,
        selectObj: {
          grade: values.grade,
          query: values.value
        }
      })
      this.selectPage()
    };
    //分页设置
    let pagination = {
      total: total,
      size: "default",
      current: current,
      hideOnSinglePage: true,
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
    //表单验证
    const validateMessages = {
      required: '${label} 不能为空！',
    };
    //模态框提交
    const onFinishmodal = values => {
      console.log(values)
      this.formRef.current.validateFields();
      if (values.floodId === undefined) {
        saveFloodUser(values).then((result) => {
          console.log(result)
          if (result.data) {
            this.setState({
              modalvisible: false,
            });
            this.selectPage()
            message.success("新增成功！")
            this.addform.current.resetFields();
          } else {
            console.log(result.msg)
          }
        })
      } else {
        updateFloodUser(values).then((result) => {
          console.log(result)
          if (result.data) {
            this.setState({
              modalvisible: false,
            });
            this.selectPage()
            message.success("更新成功！")
            this.addform.current.resetFields();
          } else {
            console.log(result.msg)
          }
        })
      }
    };

    return (
      <>
        {/* 条件查询行 */}
        <Row style={{ height: 100 }}>
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
              label="人员名称："
              name="value"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="等级"
              name="grade"
            >
              <Select style={{ width: 250 }} defaultValue={null}>
                <Select.Option value={null}>所有</Select.Option>
                <Select.Option value={1}>队长</Select.Option>
                <Select.Option value={2}>副队长</Select.Option>
                <Select.Option value={3}>组长</Select.Option>
                <Select.Option value={4}>组员</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
        </Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="button" onClick={onReset}>重置</Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="button" onClick={this.showModal}>增加</Button>
            </Form.Item>
          </Form>
        </Row>
        {/* 模态框 */}
        <Modal
          title="Title"
          visible={modalvisible}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={null}
        >
          {/* 模态框面板 */}
          <Form name="save" onFinish={onFinishmodal} validateMessages={validateMessages} ref={this.addform}
            initialValues={{
              remember: true,
            }}>
            <Form.Item name={'name'} label="姓名" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={'sex'} label="性别" valuePropName="radio">
              <Radio.Group onChange={this.onChange} defaultValue={0} value={this.state.isShow}>
                <Radio value={0}>未知性别</Radio>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name={'age'} label="年龄" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={'unit'} label="单位" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={'phone'} label="电话" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={'remark'} label="备注" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={'parent'} label="上一级" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={'isShow'} label="是否显示" valuePropName="radio">
              <Radio.Group onChange={this.onChange} defaultValue={0} >
                <Radio value={0}>是</Radio>
                <Radio value={1}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="等级"
              name="grade"
            >
              <Select>
                <Select.Option value={1}>队长</Select.Option>
                <Select.Option value={2}>副队长</Select.Option>
                <Select.Option value={3}>组长</Select.Option>
                <Select.Option value={4}>组员</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name={'floodId'}>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                确定
        </Button>
              <Button onClick={this.handleCancel}>
                取消
        </Button>
            </Form.Item>
          </Form>
        </Modal>
        {/* 主要表格 */}
        <Table
          loading={loading}
          columns={ckcolumns}
          dataSource={dataSource}
          scroll={{ y: 700 }}
          rowKey={row => row.materialId}
          pagination={pagination}
        ></Table>
      </>
    );
  }
  //根据id删除
  confirm(row) {
    console.log(row)
    deleteFloodUser({
      "floodId": row.floodId
    }).then((result) => {
      this.selectPage()
      message.success('删除成功！');
    })
  }
  //表单的单选互斥
  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  //打开添加模态框
  showModal = () => {
    this.setState({
      modalvisible: true,
    });
  };
  //关闭添加模态框
  handleCancel = () => {
    this.setState({
      modalvisible: false,
    });
    this.addform.current.resetFields();
  };
  //切换每页数量
  onShowSizeChange(current, pageSize) {
    this.setState({ loading: true });
    queryFloodUser({
      "current": current,
      "size": pageSize,
      "grade": this.state.selectObj.grade,
      "query": this.state.selectObj.query,
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
    queryFloodUser({
      "current": current,
      "size": this.state.pageSize,
      "grade": this.state.selectObj.grade,
      "query": this.state.selectObj.query,
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
  //初始查询
  selectPage() {
    this.setState({ loading: true });
    queryFloodUser({
      "current": this.state.current,
      "size": this.state.pageSize,
      "grade": this.state.selectObj.grade,
      "query": this.state.selectObj.query,
    })
      .then((result) => {
        console.log(result)
        this.setState({
          loading: false,
          dataSource: result.data.records,
          total: result.data.total,
          current: result.data.current
        })
      })
  }
  //初始化
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
)(FloodPrevention);