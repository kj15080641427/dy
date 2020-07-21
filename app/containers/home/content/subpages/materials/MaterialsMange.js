/**
 * MaterialsMange 2020-06-04
 * zdl
 * 物资管理
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@app/redux/actions/home';
import { queryMaterial, getWarehouse, saveMaterial, deleteMaterial } from '@app/data/request';
import { Table, Row, Modal, Input, Button, Select, Form, Radio, DatePicker, Switch, Popconfirm, message } from 'antd';
import { SearchOutlined, RedoOutlined, PlusCircleOutlined, CloseCircleOutlined, FormOutlined } from '@ant-design/icons';
import moment from 'moment';
import { FormInstance } from 'antd/lib/form';
import { add } from 'ol/coordinate';
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
class MaterialsMange extends React.PureComponent {
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
        value: "",
        ckId: ""
      },//条件查询对象
      isShow: 0
    };
    this.formRef = React.createRef(<FormInstance></FormInstance>);//查询form表单
    this.addform = React.createRef(<FormInstance></FormInstance>);//增加修改表单
  }

  render() {
    console.log("MaterialsMange this.props.match", this.props.match, this.props.location);
    const { dataSource, loading, ckdataSource, total, current, pageSize, modalvisible, confirmLoading, addObj } = this.state;
    const ckcolumns = [
      // {
      //   title: '物资id',
      //   dataIndex: 'materialId',
      //   className: 'column-money',
      //   fixed: 'left',
      // },
      {
        title: '名称',
        dataIndex: 'name',
        className: 'column-money',
        fixed: 'left',
      },
      {
        title: '规格型号',
        dataIndex: 'spec',
        className: 'column-money',
      },
      {
        title: '计量单位',
        dataIndex: 'company',
        className: 'column-money',
      },
      {
        title: '存储总量',
        dataIndex: 'saveTotal',
        className: 'column-money',
      },
      {
        title: '价值(元)',
        dataIndex: 'money',
        className: 'column-money',
        sorter: (a, b) => a.money - b.money,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        className: 'column-money',
        width: 170,
        sorter: true
      },
      // {
      //   title: '仓库ID',
      //   dataIndex: 'materialWarehouseId',
      //   className: 'column-money',
      // },
      {
        title: '过期时间',
        dataIndex: 'expireDate',
        className: 'column-money',
        width: 160,
        render: expireDate => { return (expireDate === null ? "暂无数据" : expireDate) }
      },
      {
        title: '出厂日期',
        dataIndex: 'manufactureDate',
        className: 'column-money',
        width: 160,
        render: manufactureDate => { return (manufactureDate === null ? "暂无数据" : manufactureDate) }
      },
      {
        title: '预警数量',
        dataIndex: 'warningNumber',
        className: 'column-money',
        render: warningNumber => { return (warningNumber === null ? "暂无数据" : warningNumber) }
      },
      {
        title: '是否显示',
        dataIndex: 'isShow',
        className: 'column-money',
        render: isShow => { return (isShow === "0" ? "是" : "否") }
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
        modalvisible: true,
        isShow: row.isShow
      })
      console.log(row)
      this.addform.current.setFieldsValue({
        name: row.name,
        company: row.company,
        // expireDate: row.expireDate,
        isShow: row.isShow,
        // manufactureDate: row.manufactureDate,
        materialId: row.materialId,
        materialWarehouseId: row.materialWarehouseId,
        money: row.money,
        saveTotal: row.saveTotal,
        spec: row.spec,
        warningNumber: row.warningNumber
      })
      // this.setState({
      //   addObj: {
      //     name: row.name,
      //     company: row.company,
      //     createTime: row.createTime,
      //     expireDate: row.expireDate,
      //     isShow: row.isShow,
      //     manufactureDate: moment(row.manufactureDate).valueOf(),
      //     materialId: row.materialId,
      //     materialWarehouseId: row.materialWarehouseId,
      //     money: row.money,
      //     saveTotal: row.saveTotal,
      //     spec: row.spec,
      //     warningNumber: row.warningNumber
      //   }
      // })
      // console.log(addObj)

    }
    //重置
    const onReset = () => {
      console.log(this.formRef.current)
      this.setState({ loading: true });
      this.formRef.current.resetFields();
      queryMaterial({
        "current": 1,
        "size": 10,
      })
        .then((result) => {
          this.setState({
            selectObj: {
              ckId: 32,
              value: ""
            },
            loading: false,
            dataSource: result.data.records,
            current: result.data.current,
            pageSize: 10,
            total: result.data.total,
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
          value: values.value,
          ckId: values.ckId
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
    //模态框提交save or updata
    const onFinishmodal = values => {
      console.log(values)
      let obj = {
        "company": values.company,
        "expireDate": moment(values.expireDate).format("YYYY-MM-DD HH:mm:ss"),
        "isShow": values.isShow == false ? values.isShow = '1' : values.isShow = '0',
        "manufactureDate": moment(values.manufactureDate).format("YYYY-MM-DD HH:mm:ss"),
        "materialWarehouseId": values.materialWarehouseId + '',
        "money": values.money,
        "name": values.name,
        "saveTotal": values.saveTotal,
        "spec": values.spec,
        "warningNumber": values.warningNumber
      }
      this.setState({
        confirmLoading: true,
      });
      saveMaterial(obj).then((result) => {
        console.log(result)
        if (result.data) {
          this.setState({
            modalvisible: false,
            confirmLoading: false,
          });
          this.addform.current.resetFields();
          this.selectPage()

        } else {
          console.log(result.msg)
        }
      })
    };
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
    };
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
              label="全文检索："
              name="value"
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="物资仓库："
              name="ckId"
            >
              <Select style={{ width: 250 }} defaultValue={null} size="large">
                <option key={null} value={null}>所有</option>
                {
                  ckdataSource.map((item, i) => {
                    return (
                      <option key={`${i}`} value={item.materialWarehouseId}>{item.name}</option>
                    )
                  })
                }
              </Select>
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
              <Button size="large" htmlType="button" onClick={this.showModal} icon={<PlusCircleOutlined />}>添加</Button>
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
            <Form.Item name={'name'} label="名称" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={'spec'} label="规格型号">
              <Input />
            </Form.Item>
            <Form.Item name={'company'} label="计量单位">
              <Input />
            </Form.Item>
            <Form.Item name={'saveTotal'} label="	存储总量">
              <Input />
            </Form.Item>
            <Form.Item name={'money'} label="价值">
              <Input />
            </Form.Item>
            <Form.Item name={'isShow'} label="是否显示">
              <Radio.Group defaultValue={'0'}>
                <Radio value={'0'}>是</Radio>
                <Radio value={'1'}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="物资仓库"
              name="materialWarehouseId"
              rules={[{ required: true }]}
            >
              <Select style={{ width: 250 }}>
                {
                  ckdataSource.map((item, i) => {
                    return (
                      <Option key={`${i + 1}`} value={item.materialWarehouseId}>{item.name}</Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item name={'expireDate'} label="过期时间">
              <DatePicker format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item name={'manufactureDate'} label="出厂日期" >
              <DatePicker format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item name={'warningNumber'} label="预警数量" >
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
        {/* 主要表格 */}
        <Table
          loading={loading}
          columns={ckcolumns}
          dataSource={dataSource}
          scroll={{ y: 700 }}
          rowKey={row => row.materialId}
          pagination={pagination}
          onChange={this.handleTableChange}
        ></Table>
      </>
    );
  }
  //排序
  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
    console.log(pagination)
    console.log(filters)
    console.log(sorter)
  }

  //根据id删除
  confirm(row) {
    console.log(row)
    deleteMaterial({
      "materialId": row.materialId
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
    queryMaterial({
      "current": current,
      "size": pageSize,
      "materialWarehouseId": this.state.selectObj.ckId,
      "query": this.state.selectObj.value
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
    queryMaterial({
      "current": current,
      "size": this.state.pageSize,
      "materialWarehouseId": this.state.selectObj.ckId,
      "query": this.state.selectObj.value
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
    queryMaterial({
      "current": this.state.current,
      "size": this.state.pageSize,
      "materialWarehouseId": this.state.selectObj.ckId,
      "query": this.state.selectObj.value
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
    //获取仓库数据源
    getWarehouse({}).then((res) => {
      this.setState({
        ckdataSource: res.data,
      })
    })
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
)(MaterialsMange);