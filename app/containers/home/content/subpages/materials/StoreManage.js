/**
 * StoreManage 2020-06-04
 * zdl
 * 仓库管理
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@app/redux/actions/home';
import { QueryMaterialWarehouse, saveMaterialWarehouse, deleteMaterialWarehouse, updateMaterialWarehouse } from '@app/data/request';
import { Table, Row, Modal, Input, Button, Select, Form, Radio, DatePicker, Switch, Popconfirm, message } from 'antd';
import { SearchOutlined, RedoOutlined, PlusCircleOutlined, CloseCircleOutlined, FormOutlined } from '@ant-design/icons';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailFormItemLayout = {
  wrapperCol: {
      xs: {
          span: 24,
          offset: 0,
      },
      sm: {
          span: 16,
          offset: 8,
      },
  },
};
class StoreManage extends React.PureComponent {

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: [],//仓库数据源
      loading: false,//仓库数据源加载
      total: 0,
      current: 1,
      pageSize: 10,
      modalvisible: false,
      confirmLoading: false,//模态框提交动画
      selectObj: {
        name: ""
      },//条件查询对象
      addObj: {

      }//单个对象
    };
    this.formRef = React.createRef();
    this.addform = React.createRef();
  }

  render() {
    console.log("StoreManage this.props.match", this.props.match, this.props.location);
    const { dataSource, loading, total, current, pageSize, modalvisible, confirmLoading, selectObj } = this.state;


    const ckcolumns = [
      // {
      //   title: '防汛物质仓库ID',
      //   dataIndex: 'materialWarehouseId',
      //   className: 'column-money',
      // },
      // {
      //   title: '仓库编码',
      //   dataIndex: 'code',
      //   className: 'column-money',
      // },
      {
        title: '仓库名称',
        dataIndex: 'name',
        className: 'column-money',
      },
      {
        title: '仓库经度',
        dataIndex: 'lon',
        className: 'column-money',
      },
      {
        title: '仓库纬度',
        dataIndex: 'lat',
        className: 'column-money',
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
      console.log(e);
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
        console.log(pageSize);
        this.onShowSizeChange(current, pageSize)
      },
      showTotal: () => `共${total}条`,
    }
    //重置
    const onReset = () => {
      console.log(this.formRef.current)
      this.setState({ loading: true });
      this.formRef.current.resetFields();
      QueryMaterialWarehouse({
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
      console.log('Success:', values);
      this.setState({
        current: 1,
        pageSize: 10,
        selectObj: {
          name: values.name
        }
      })
      this.selectPage()
    };
    //表单验证
    const validateMessages = {
      required: '${label} 不能为空！',
    };
    //模态框提交
    const onFinishmodal = values => {
      console.log("提交", values)
      this.setState({
        confirmLoading: true,
      });
      if (values.materialWarehouseId === undefined) {
        saveMaterialWarehouse(values).then((result) => {
          console.log(result)
          if (result.data) {
            this.setState({
              modalvisible: false,
              confirmLoading: false,
            });
            this.selectPage()
            this.addform.current.resetFields();
            message.success('新增成功！');
          } else {
            console.log(result.msg)
          }
        })
      } else {
        updateMaterialWarehouse(values).then((result) => {
          console.log(result)
          if (result.data) {
            this.setState({
              modalvisible: false,
              confirmLoading: false,
            });
            this.selectPage()
            this.addform.current.resetFields();
            message.success('更新成功！');
          } else {
            console.log(result.msg)

          }
        })
      }
    };
    //打开添加模态框
    const showModal = () => {
      this.setState({
        modalvisible: true,
      });
    };
    //根据id查询并打开模态框
    const SelectById = (row) => {
      this.setState({
        modalvisible: true
      })
      console.log(row)
      this.addform.current.setFieldsValue({
        name: row.name,
        lon: row.lon,
        lat: row.lat,
        materialWarehouseId: row.materialWarehouseId
      })
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
              label="仓库名称："
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
        {/* 模态框 */}
        <Modal
          title="Title"
          visible={modalvisible}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={null}
          forceRender={true}
        >
          {/* 模态框面板 */}
          <Form {...layout} name="save" onFinish={onFinishmodal} validateMessages={validateMessages} ref={this.addform}
            initialValues={{
              remember: true,
            }}>
            <Form.Item name={'materialWarehouseId'}>
            </Form.Item>
            <Form.Item name={'name'} label="仓库名称" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={'lon'} label="经度" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={'lat'} label="纬度" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                确定
        </Button>
              <Button onClick={this.handleCancel}>
                取消
        </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Table
          loading={loading}
          columns={ckcolumns}
          dataSource={dataSource}
          scroll={{ y: 700 }}
          rowKey={row => row.materialWarehouseId}
          pagination={pagination}
        ></Table>
      </>
    );
  }

  //根据id删除
  confirm(row) {
    console.log(row);
    deleteMaterialWarehouse({
      "materialWarehouseId": row.materialWarehouseId
    }).then((result) => {
      this.selectPage()
      message.success('删除成功！');
    })
  }


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
    QueryMaterialWarehouse({
      "current": current,
      "size": pageSize,
      "name": this.state.selectObj.name
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
    QueryMaterialWarehouse({
      "current": current,
      "size": this.state.pageSize,
      "name": this.state.selectObj.name
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
  selectPage() {
    this.setState({
      loading: true
    })
    QueryMaterialWarehouse({
      "current": this.state.current,
      "size": this.state.pageSize,
      "name": this.state.selectObj.name
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
)(StoreManage);