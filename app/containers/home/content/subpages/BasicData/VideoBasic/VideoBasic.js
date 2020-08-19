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
import { SearchOutlined, RedoOutlined, PlusCircleOutlined, CloseCircleOutlined, FormOutlined, CloudDownloadOutlined, SwapOutlined } from '@ant-design/icons';
import { radioQuery, radioDelete, radioExportExcel } from '@app/data/request';
import DataExcel from './DataExcel';
import AddVideo from './AddVideo';
import Relevance from './Relevance';
class VideoBasic extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSource: [],//数据源
            loading: false,//数据源加载
            total: 0,
            current: 1,
            pageSize: 10,
            addvisible: false,
            relevancevisible: false,
            Excelvisible: false,
            confirmLoading: false,//模态框提交动画
            selectObj: {
                name: "",
                code: "",
                dataSource: ""
            },//条件查询对象
            rowObj: null,//修改打开模态框带走行值,
            form: {}
        };
        this.formRef = React.createRef();
        this.saveRef = React.createRef();
        this.relevanceRef = React.createRef();
    }

    render() {
        const { dataSource, loading, total, current, pageSize, addvisible, rowObj, Excelvisible, relevancevisible } = this.state;
        const ckcolumns = [
            {
                title: '视频名称',
                dataIndex: 'strname',
            },
            {
                title: '详细地址',
                dataIndex: 'address',
                ellipsis: true,
            },
            {
                title: '纬度',
                dataIndex: 'lat',
            },
            {
                title: '经度',
                dataIndex: 'lon',
            },
            {
                title: '状态',
                dataIndex: 'isShow',
                render: (isShow) => {
                    if (isShow === '0') {
                        return (
                            <a>在线</a>
                        )
                    } else {
                        return (
                            <a style={{ color: "red" }}>离线</a>
                        )
                    }
                }
            },
            {
                title: '操作',
                dataIndex: 'isShow',
                className: 'column-money',
                width: 400,
                fixed: 'right',
                render: (isShow, row) => {
                    return (
                        <Radio.Group value="large" onChange={this.handleSizeChange}>
                            <Button onClick={() => showreleModal(row)} icon={<SwapOutlined />}>关联</Button>
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
            radioQuery({
                "current": 1,
                "size": 10,
                "strname": " "
            })
                .then((result) => {
                    this.setState({
                        selectObj: {
                            name: "",
                            code: "",
                            dataSource: ""
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
                    name: values.name,
                    code: values.code,
                    dataSource: values.dataSource
                }
            })
            this.selectPage()
        };
        //打开关联模态框
        const showreleModal = (row) => {
            this.setState({
                relevancevisible: true,
                rowObj: row
            })
            // this.relevanceRef.current.setFieldsValue(row)
        };
        //打开添加模态框
        const showModal = (event) => {
            this.setState({
                addvisible: true,
            });
        };
        //根据id查询并打开模态框
        const SelectById = (row) => {
            this.setState({
                addvisible: true,
                rowObj: row
            })
            this.saveRef.current.setFieldsValue(row)
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
                            label="视频名称"
                            name="strname"
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            label="站点Code"
                            name="strtoken"
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            label="来源"
                            name="dataSource"
                        >
                            <Select size="large" defaultValue={null} style={{ width: 200 }} onChange={this.handleChange}>
                                <Option value={null}>全部</Option>
                                <Option value={1}>水文局</Option>
                                <Option value={2}>气象局</Option>
                                <Option value={3}>水务局积水点</Option>
                                <Option value={4}>农村基层防汛监测预警平台</Option>
                                <Option value={5}>河道</Option>
                                <Option value={6}>河口区水利局</Option>
                                <Option value={7}>水务局河道</Option>
                                <Option value={8}>广饶县</Option>
                                <Option value={9}>开发区城管局</Option>
                                <Option value={10}>天鹅湖蓄滞洪区</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button size="large" type="primary" htmlType="submit" icon={<SearchOutlined />}>
                                查询
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button size="large" type="primary" onClick={this.openData} icon={<CloudDownloadOutlined />}>
                                数据导出
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
                    rowKey={row => row.radioID}
                    pagination={pagination}
                ></Table>
                <DataExcel Excelvisible={Excelvisible} onCancel={this.onCancel}></DataExcel>
                {/* 增加模态框面板 */}
                <AddVideo
                    visible={addvisible}
                    onCancel={this.handleCancel}
                    form={this.saveRef}
                    selectPage={this.selectPage}
                >
                </AddVideo>
                {/* 关联模态框 */}
                <Relevance
                    visible={relevancevisible}
                    onCancel={this.relevancehandleCancel}
                    // form={this.relevanceRef}
                    rowObj={rowObj}
                    selectPage={this.selectPage}
                ></Relevance>
            </>
        );
    }
    //打开数据导出模态框
    openData = () => {
        this.setState({
            Excelvisible: true,
        })
    }
    onCancel = () => {
        this.setState({
            Excelvisible: false
        })
    }
    //根据id删除
    confirm(row) {
        console.log(row);
        radioDelete(
            row.radioID
        ).then((result) => {
            this.selectPage()
            message.success('删除成功！');
        })
    }


    //关闭添加模态框
    handleCancel = () => {
        this.setState({
            addvisible: false,
            rowObj: null
        })
        this.saveRef.current.resetFields()
    };
    relevancehandleCancel = () => {
        this.setState({
            relevancevisible: false,
            rowObj: null
        })
        this.relevanceRef.current.resetFields()
    };
    //切换每页数量
    onShowSizeChange(current, pageSize) {
        this.setState({ loading: true });
        radioQuery({
            "current": current,
            "size": pageSize,
            "strname": this.state.selectObj.name,
            "dataSource": this.state.selectObj.dataSource,
            "code": this.state.selectObj.code,
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
        radioQuery({
            "current": current,
            "size": this.state.pageSize,
            "strname": this.state.selectObj.name,
            "dataSource": this.state.selectObj.dataSource,
            "code": this.state.selectObj.code,
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
        radioQuery({
            "current": this.state.current,
            "size": this.state.pageSize,
            "strname": this.state.selectObj.name,
            "dataSource": this.state.selectObj.dataSource,
            "code": this.state.selectObj.code,
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
        console.log(this.guid())
    }
    guid() {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
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
)(VideoBasic);