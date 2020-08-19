/**
 * Authority 2020-07-18
 * zdl
 * 基础站点和视频站点关联信息
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@app/redux/actions/home';
import { Table, Row, Modal, Input, Button, Select, Form, Radio, DatePicker, Switch, Popconfirm, message } from 'antd';
import { SearchOutlined, RedoOutlined, PlusCircleOutlined, CloseCircleOutlined, FormOutlined, CloudDownloadOutlined, SwapOutlined } from '@ant-design/icons';
import { stationRadioQuery, stationRadioDelete, stationRadioExportExcel } from '@app/data/request';
// import DataExcel from './DataExcel';
// import AddVideo from './AddVideo';
// import Relevance from './Relevance';
class VideoStation extends React.PureComponent {
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
                stationCode: "",
                radioCode: "",
            },//条件查询对象
            rowObj: null,//修改打开模态框带走行值,
            form: {}
        };
        this.formRef = React.createRef();
        this.saveRef = React.createRef();
        this.relevanceRef = React.createRef();
    }

    render() {
        this.formRef = React.createRef();
        const { dataSource, loading, total, current, pageSize, addvisible, rowObj, Excelvisible, relevancevisible } = this.state;
        const ckcolumns = [
            {
                title: '站点ID',
                dataIndex: 'stateRelationID',
            },
            {
                title: '状态',
                dataIndex: 'state',
                render: (e) => {
                    return e.state ? '启用' : '停用'
                }
            },
            {
                title: '关联',
                dataIndex: 'relationID',
                ellipsis: true,
            },
            {
                title: '站点关系类型',
                dataIndex: 'siteDictionariesID',
            },

            {
                title: '操作',
                dataIndex: 'stationRadioId',
                className: 'column-money',
                width: 400,
                fixed: 'right',
                render: (stationRadioId, row) => {
                    return (
                        <Radio.Group value="large" onChange={this.handleSizeChange}>
                            <Button onClick={() => SelectById(row)} icon={<SwapOutlined />}>关联</Button>
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
            stationRadioQuery({
                "current": 1,
                "size": 10,
                "siteDictionariesID": 0,
            })
                .then((result) => {
                    this.setState({
                        selectObj: {
                            stationCode: "",
                            radioCode: "",
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
                    radioCode: values.radioCode,
                    stationCode: values.stationCode,
                }
            })
            this.selectPage()
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
            // console.log(row)
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
                            label="视频站点编码"
                            name="radioCode"
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            label="基础站点编码"
                            name="stationCode"
                        >
                            <Input size="large" />
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
                    rowKey={row => row.stationRadioId}
                    pagination={pagination}
                ></Table>
                {/* <DataExcel Excelvisible={Excelvisible} onCancel={this.onCancel}></DataExcel>
                <AddVideo
                    visible={addvisible}
                    onCancel={this.handleCancel}
                    form={this.saveRef}
                    selectPage={this.selectPage}
                >
                </AddVideo>
                <Relevance
                    visible={relevancevisible}
                    onCancel={this.relevancehandleCancel}
                    form={this.relevanceRef}
                    selectPage={this.selectPage}
                ></Relevance> */}
            </>
        );
    }
    //导出
    openData = () => {
        // this.setState({
        //     Excelvisible: true,
        // })
        var url = "/api/stationRadio/exportExcel";
        window.location.href = url;
    }
    onCancel = () => {
        this.setState({
            Excelvisible: false
        })
    }
    //根据id删除
    confirm(row) {
        console.log(row);
        stationRadioDelete(
            row.stationRadioId
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
        stationRadioQuery({
            "current": current,
            "size": pageSize,
            "radioCode": this.state.selectObj.radioCode,
            "stationCode": this.state.selectObj.stationCode,
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
        stationRadioQuery({
            "current": current,
            "size": this.state.pageSize,
            "stationCode": this.state.selectObj.stationCode,
            "radioCode": this.state.selectObj.radioCode,
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
        stationRadioQuery({
            "current": this.state.current,
            "size": this.state.pageSize,
            "stationCode": this.state.selectObj.stationCode,
            "radioCode": this.state.selectObj.radioCode,
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
)(VideoStation);