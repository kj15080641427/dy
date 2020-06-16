/**
 * Expert 2020-06-04
 * zdl
 * 专家库
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@app/redux/actions/home';
import { getFloodControlExpertAll } from '@app/data/request';
import { Table, Row, Modal, Input, Button, Select, Form, Radio, DatePicker, Switch } from 'antd';
import { FormInstance } from 'antd/lib/form';

class Expert extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: [],//物资数据源
      loading: false,//物资数据源加载
    };
    this.formRef = React.createRef(<FormInstance></FormInstance>);
  }
  render() {
    console.log("Expert this.props.match", this.props.match, this.props.location);
    const { dataSource, loading, } = this.state;

    const ckcolumns = [
      {
        title: '姓名',
        dataIndex: 'name',
        className: 'column-money',
        fixed: 'left',
      },
      {
        title: '熟悉流域（河道）',
        dataIndex: 'field',
        className: 'column-money',
        fixed: 'left',
      },
      {
        title: '状态',
        dataIndex: 'state',
        className: 'column-money',
      },
      {
        title: '类型',
        dataIndex: 'type',
        className: 'column-money',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        className: 'column-money',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        className: 'column-money',
      },
      {
        title: '工作单位',
        dataIndex: 'unit',
        className: 'column-money',
      },
      {
        title: '专业特长',
        dataIndex: 'major',
        className: 'column-money',
      },
      {
        title: '防汛专家表ID',
        dataIndex: 'floodControlExpertId',
        className: 'column-money',
      },
      {
        title: '专家电话',
        dataIndex: 'phone',
        className: 'column-money',
      },
      // {
      //   title: '操作',
      //   dataIndex: 'isShow',
      //   className: 'column-money',
      //   width: 200,
      //   fixed: 'right',
      //   render: (isShow, row) => {
      //     return (
      //       <Radio.Group value="large" onChange={this.handleSizeChange}>
      //         <Button onClick={() => this.deleteById(row)}>删除</Button>
      //         <Button onClick={() => SelectById(row)}>修改</Button>
      //       </Radio.Group>
      //     )
      //   }
      // },
    ];
    //重置
    const onReset = () => {
      console.log(this.formRef.current)
      this.formRef.current.resetFields();
      this.setState({
        loading: true
      })
      getFloodControlExpertAll({
      }).then((result) => {
        console.log(result)
        this.setState({
          loading: false,
          dataSource: result.data,
        })
      })
    };
    //查询表单提交
    const onFinish = values => {
      console.log('Success:', values);
      this.setState({
        loading: true
      })
      getFloodControlExpertAll({
        "name": values.name,
        "phone": values.phone,
        "type": values.type,
      }).then((result) => {
        console.log(result)
        this.setState({
          loading: false,
          dataSource: result.data,
        })
      })
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
              label="专家名称："
              name="name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="电话："
              name="phone"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="类型"
              name="type"
              defaultValue={1}
            >
              <Select style={{ width: 250 }} defaultValue={1}>
                <Select.Option value={1}>市级专家</Select.Option>
                <Select.Option value={2}>区县专家</Select.Option>
                <Select.Option value={3}>乡镇专家</Select.Option>
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
            {/* <Form.Item>
              <Button htmlType="button" onClick={this.showModal}>增加</Button>
            </Form.Item> */}
          </Form>
        </Row>
        {/* 主要表格 */}
        <Table
          loading={loading}
          columns={ckcolumns}
          dataSource={dataSource}
          scroll={{ y: 700 }}
          rowKey={row => row.floodControlExpertId}
        // pagination={pagination}
        ></Table>
      </>
    );
  }
  componentDidMount() {
    getFloodControlExpertAll({}).then((result) => {
      console.log(result)
      this.setState({ loading: false });
      this.setState({ dataSource: result.data })
    })
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
)(Expert);