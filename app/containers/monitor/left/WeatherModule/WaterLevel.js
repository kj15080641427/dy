/**
 * Precipitation 2020-05-18
 * zdl
 * 水位站
 */
import React from 'react';
import "../style.scss";
import localimgURL from '../../../../resource/local.png';
import { Table, Popover, Tag, Modal, Button, Card, Row, Col } from 'antd';
import moment from 'moment';
import { getWaterHistory } from "@app/data/request";
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts';
class Precipitation extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            qydataSource: [],//水位数据源
            loading: false,//水位数据源加载
            total: 0,//水位数据源总数页
            current: 1,//水位数据源开始页
            pageSize: 10,//水位数据源单页条数
            swdataSourceById: [],//单个站点水位数据源
            visible: false,//模态框
            mloading: false,//模态框表格加载动画
        };
    }
    //模态框控制
    showModal = (value) => {
        this.setState({
            visible: true,
        });
        this.setState({ mloading: true });
        let starttm = moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YY-MM-DD HH:mm:ss")
        let endtm = moment(new Date().getTime()).format("YY-MM-DD HH:mm:ss")
        getWaterHistory({
            "stcd": value.stcd,
            "starttm": starttm,
            "endtm": endtm,
            "current": 1,
            "size": 1000
        })
            .then((result) => {
                let xdata = []
                let ydata = []
                for (var i = result.data.records.length - 1; i >= 0; i--) {
                    xdata.push(result.data.records[i].tm)
                    ydata.push(result.data.records[i].z)
                }
                this.setState({
                    swdataSourceById: result.data.records,
                    mloading: false,
                })
                var myChart = echarts.init(document.getElementById('mainbysw'));
                myChart.setOption({
                    title: {
                        text: result.data.records[0].stnm + '-水位站24小时水位变化',
                        subtext: starttm + '至' + endtm,
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {// 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: { show: true, readOnly: true },
                            magicType: { show: true, type: ['line', 'bar'] },
                            restore: { show: true },
                            saveAsImage: { show: true },
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: xdata,
                        name: '时间',
                    },
                    yAxis: {
                        type: 'value',
                        name: '水位（m）'
                    },
                    series: [{
                        data: ydata,
                        type: 'line',
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' }
                            ]
                        },
                    }],
                });
            })
    };
    //模态框关闭
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }
    render() {
        //水位data
        const swcolumns = [
            {
                title: '站点编号',
                dataIndex: 'stcd',
                width: 109,
                className: 'column-money',
                key: 'riverwaterdataID'
            },
            {
                title: '站名',
                dataIndex: 'stnm',
                width: 75,
                className: 'column-money',
                render:
                    (stnm, key) => {
                        if (stnm !== null && stnm !== "") {
                            return (
                                <Popover content={stnm} title="站名全称">
                                    <Button size="small" onClick={() => this.showModal(key)}>
                                        {stnm.substring(0, 2) + '...'}
                                    </Button>
                                </Popover>
                            )
                        } else {
                            return (
                                <Popover content={stnm} title="站名全称">
                                    <Button size="small" onClick={() => this.showModal(key)}>
                                        {stnm ? stnm : "暂无数据"}
                                    </Button>
                                </Popover>
                            )
                        }
                    }
            },
            {
                title: '监测时间',
                dataIndex: 'tm',
                width: 140,
                className: 'column-money',
                render: value => moment(value).format("YYYY-MM-DD HH:mm")
            },
            {
                title: '监测值(m)',
                dataIndex: 'z',
                width: 109,
                className: 'column-money',
                render: dayAvg => Math.round(dayAvg * 1000) / 1000
            },
            {
                title: '定位',
                dataIndex: 'loca',
                render: value => <img src={localimgURL} alt="" />,
                className: 'column-money'
            },
        ];
        //根据编号获取信息表头daata
        const swcolumnsById = [
            {
                title: '站点编号',
                dataIndex: 'stcd',
                className: 'column-money'
            },
            {
                title: '站名',
                dataIndex: 'stnm',
                className: 'column-money',
                render:
                    stnm => {
                        if (stnm !== null && stnm !== "") {
                            return (
                                <Tag>
                                    {stnm}
                                </Tag>
                            )
                        } else {
                            return (
                                <Tag>
                                    {stnm ? stnm : "暂无数据"}
                                </Tag>
                            )
                        }
                    }
            },
            {
                title: '监测时间',
                dataIndex: 'tm',
                className: 'column-money',
                render: value => moment(value).format("YYYY-MM-DD HH:mm")
            },
            {
                title: '监测值(m)',
                dataIndex: 'z',
                className: 'column-money',
                render: dayAvg => Math.round(dayAvg * 1000) / 1000
            },
        ];
        //分页
        let pagination = {
            total: this.state.total,
            size: "small",
            current: this.state.current,
            onChange: (current) => this.changePage(current),
            pageSize: this.state.pageSize,
            onShowSizeChange: (current, pageSize) => {//设置每页显示数据条数，current表示当前页码，pageSize表示每页展示数据条数
                console.log(pageSize);
                this.onShowSizeChange(current, pageSize)
            }
        }
        return (
            <>
                <Table className="m-div-table"
                    size="small"
                    loading={this.state.loading}
                    columns={swcolumns}
                    dataSource={this.state.qydataSource}
                    scroll={{ y: 300 }}
                    pagination={pagination} />
                <Modal
                    title="24小时水位详情"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                    width={1300}
                >
                    <Row>
                        <Col span={12}><Card title="水位走势" bordered={false}>
                            <div id="mainbysw" style={{ width: 600, height: 500 }}></div>
                        </Card></Col>
                        <Col span={12}><Card title="水位数据" bordered={false}>
                            <Table
                                size="small"
                                loading={this.state.loading}
                                columns={swcolumnsById}
                                dataSource={this.state.swdataSourceById}
                                scroll={{ y: 500 }}
                            />
                        </Card></Col>
                    </Row>
                </Modal>
            </>

        );
    }
    //水位分页
    onShowSizeChange(current, pageSize) {
        this.setState({ loading: true });
        getWaterHistory({
            "current": current,
            "size": pageSize
        })
            .then((result) => {
                this.setState({ qydataSource: result.data.records })
                this.setState({ loading: false });
                this.setState({ current: result.data.current })
                this.setState({
                    pageSize: pageSize
                })
            })
    }

    // 回调函数，切换下一页
    changePage(current) {
        this.setState({ loading: true });
        getWaterHistory({
            "current": current,
            "size": this.state.pageSize
        })
            .then((result) => {
                this.setState({ qydataSource: result.data.records })
                this.setState({ loading: false });
                this.setState({ total: result.data.total })
                this.setState({ current: result.data.current })
            })
    }
    //初始化加载数据
    componentDidMount() {
        this.setState({ loading: true });
        getWaterHistory({
            "current": this.state.current,
            "size": this.state.pageSize
        })
            .then((result) => {
                this.setState({ qydataSource: result.data.records })
                this.setState({ loading: false });
                this.setState({ total: result.data.total })
                console.log(result.data.records)
            })


    }
}
export default Precipitation;