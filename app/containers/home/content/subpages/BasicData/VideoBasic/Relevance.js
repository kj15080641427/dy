/**
 * water 2020-07-18
 * zdl
 * 视频站点关联基础站点
 */
import React from 'react';
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Radio,
    message,
    Modal,
    Table
} from 'antd';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import { radioSave, radioUpdate, stationQuery } from '@app/data/request';


const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
class Relevance extends React.Component {
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
                indtype: "",
                dataSource: ""
            },//条件查询对象
            rowObj: {}
        };
        this.formRef = React.createRef();
    }
    onFinish = values => {
        console.log(values);
        if (values.radioID === undefined) {
            radioSave(values).then((result) => {
                console.log(result)
                if (result.code === 200) {
                    message.success('新增成功！');
                    this.props.selectPage();
                    this.onCancel();
                } else {
                    console.log(result.msg)
                    message.error(result.msg);
                }
            })
        } else {
            radioUpdate(values).then((result) => {
                console.log(result)
                if (result.code === 200) {
                    message.success('修改成功！');
                    this.props.selectPage()
                    this.onCancel();
                } else {
                    console.log(result.msg)
                    message.error(result.msg);
                }
            })
        }
    };
    onCancel = () => {
        this.props.onCancel()//调用父组件给的方法
    };
    render() {
        const { dataSource, loading, total, current, pageSize, rowObj } = this.state;
        // const { rowObj } = this.props;

        const ckcolumns = [
            {
                title: '站名',
                dataIndex: 'name',
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
        ];
        //分页设置
        let pagination = {
            total: total,
            size: "small",
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
        const rowSelection = {
            type: 'radio',
            columnTitle: "选择",
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        // console.log(this.props.rowObj)
        return (
            <>
                <Modal
                    // forceRender={true}
                    onCancel={this.onCancel}
                    visible={this.props.visible}
                    // title={'当前选择的视频站点：'  + ',code:' + rowObj.code}
                    footer={null}
                    width={"50%"}
                >
                    <Row style={{ height: 40 }}>
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
                                <Input size="small" />
                            </Form.Item>
                            <Form.Item
                                label="来源"
                                name="dataSource"
                            >
                                <Select size="small" defaultValue={null} style={{ width: 100 }} >
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
                                <Select size="small" defaultValue={null} style={{ width: 100 }}>
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
                                <Button size="small" type="primary" htmlType="submit" icon={<SearchOutlined />}>
                                    查询
                            </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button size="small" htmlType="button" onClick={onReset} icon={<RedoOutlined />}>重置</Button>
                            </Form.Item>
                        </Form>
                    </Row>
                    <Table
                        rowSelection={{
                            ...rowSelection,
                        }}
                        loading={loading}
                        size="small"
                        columns={ckcolumns}
                        dataSource={dataSource}
                        scroll={{ y: 500 }}
                        rowKey={row => row.stationID}
                        pagination={pagination}
                    ></Table>
                </Modal>
            </>
        );
    }
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
        this.setState({
            rowObj: this.props.rowObj
        })
        console.log(this.state.rowObj)
        this.selectPage()
    }
}
export default Relevance;