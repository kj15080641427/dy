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
import { SearchOutlined, RedoOutlined, PlusCircleOutlined, CloseCircleOutlined, FormOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { stationQuery, stationDelete } from '@app/data/request';
import StationExcel from './StarionExcel'
// import DataExcel from './DataExcel';
import AddStation from './AddStation';
class StationBasic extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSource: [],//数据源
            loading: false,//数据源加载
            total: 0,
            current: 1,
            pageSize: 10,
            addvisible: false,
            Excelvisible: false,
            confirmLoading: false,//模态框提交动画
            selectObj: {
                name: "",
                indtype: "",
                dataSource: ""
            },//条件查询对象
            rowObj: null,//修改打开模态框带走行值,
            form: {}
        };
        this.formRef = React.createRef();
        this.saveRef = React.createRef();
    }
    render() {
        this.formRef = React.createRef();
        const { dataSource, loading, total, current, pageSize, addvisible, rowObj, Excelvisible } = this.state;
        const ckcolumns = [
            {
                title: '站名',
                dataIndex: 'name',
                ellipsis: true,
            },
            {
                title: '别名',
                dataIndex: 'aliasNme',
                ellipsis: true,
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
                title: '来源',
                dataIndex: 'dataSourceDesc',
            },
            {
                title: '河流名称',
                dataIndex: 'rivername',
                ellipsis: true,
            },
            {
                title: '流域名称',
                dataIndex: 'flowarea',
                ellipsis: true,
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
            stationQuery({
                "current": 1,
                "size": 10,
            })
                .then((result) => {
                    this.setState({
                        selectObj: {
                            name: "",
                            indtype: "",
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
                    indtype: values.indtype,
                    dataSource: values.dataSource
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
                            label="站点名称"
                            name="name"
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            label="来源"
                            name="dataSource"
                        >
                            <Select size="large" defaultValue={null} style={{ width: 200 }} >
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
                        <Form.Item
                            label="测站监测类型"
                            name="indtype"
                        >
                            <Select size="large" defaultValue={null} style={{ width: 200 }}>
                                <Option value={null}>全部</Option>
                                <Option value={1}>水文</Option>
                                <Option value={2}>区域水文</Option>
                                <Option value={3}>降水</Option>
                                <Option value={4}>中小河流水文</Option>
                                <Option value={5}>中小河流降水</Option>
                                <Option value={6}>自建降水</Option>
                                <Option value={7}>中小河流水位</Option>
                                <Option value={8}>水位</Option>
                                <Option value={9}>积水点水位站(易捞点)</Option>
                                <Option value={10}>积水点雨量站</Option>
                                <Option value={11}>天鹅湖蓄滞洪区</Option>
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
                    rowKey={row => row.stationID}
                    pagination={pagination}
                ></Table>
                <StationExcel Excelvisible={Excelvisible} onCancel={this.onCancel}></StationExcel>
                {/* 增加模态框面板 */}
                <AddStation
                    visible={addvisible}
                    onCancel={this.handleCancel}
                    form={this.saveRef}
                    selectPage={this.selectPage}
                >
                </AddStation>
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
        stationDelete({
            "stationID": row.stationID
        }).then((result) => {
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
    //切换每页数量
    onShowSizeChange(current, pageSize) {
        this.setState({ loading: true });
        stationQuery({
            "current": current,
            "size": pageSize,
            "name": this.state.selectObj.name,
            "dataSource": this.state.selectObj.dataSource,
            "indtype": this.state.selectObj.indtype,
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
        stationQuery({
            "current": current,
            "size": this.state.pageSize,
            "name": this.state.selectObj.name,
            "dataSource": this.state.selectObj.dataSource,
            "indtype": this.state.selectObj.indtype,
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
        stationQuery({
            "current": this.state.current,
            "size": this.state.pageSize,
            "name": this.state.selectObj.name,
            "dataSource": this.state.selectObj.dataSource,
            "indtype": this.state.selectObj.indtype,
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
)(StationBasic);