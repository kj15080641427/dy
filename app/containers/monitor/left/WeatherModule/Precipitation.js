/**
 * Precipitation 2020-05-18
 * zdl
 * 雨量站
 */
import React from 'react';
import "../style.scss";
import localimgURL from '../../../../resource/local.png';
import { Table, Tag, Popover, Modal, Button, Card, Row, Col } from 'antd';
import moment from 'moment';
import { getRainHistory } from "@app/data/request";
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts';

class Precipitation extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            qydataSource: [],//雨量站数据源
            loading: false,//雨量站数据源加载
            total: 0,//雨量站数据源总数页
            current: 1,//雨量站数据源开始页
            pageSize: 10,//雨量站数据源单页条数
            qydataSourceById: [],//单个站点雨量数据源
            visible: false,//模态框
            mloading: false,//模态框表格加载动画
        };
    }
    //模态框
    showModal = (value) => {
        this.setState({
            visible: true,
        });
        this.setState({ mloading: true });
        let starttm = moment(new Date().getTime() - 24 * 60 * 60 * 1000 * 7).format("YY-MM-DD HH:mm:ss")
        let endtm = moment(new Date().getTime()).format("YY-MM-DD HH:mm:ss")
        getRainHistory({
            "stcd": value.stcd,
            "starttm": starttm,
            "endtm": endtm,
            "current": 1,
            "size": 1000
        })
            .then((result) => {
                let xdata = []
                let ydata = []
                let ydataByDay = []
                for (var i = result.data.records.length - 1; i >= 0; i--) {
                    xdata.push(result.data.records[i].tm)
                    ydata.push(result.data.records[i].hourAvg)
                    ydataByDay.push(result.data.records[i].dayAvg)
                }
                this.setState({
                    qydataSourceById: result.data.records,
                    mloading: false,
                })
                var myChart = echarts.init(document.getElementById('mainbyqy'));
                myChart.setOption({
                    title: {
                        text: result.data.records[0].stnm + '-雨量站七天雨量变化',
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
                        name: '雨量（m）'
                    },
                    series: [{
                        name: '时监测值',
                        data: ydata,
                        type: 'line',

                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' }
                            ]
                        },

                    }, {
                        name: '日监测值',
                        type: 'line',
                        data: ydataByDay,
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' }
                            ]
                        },
                    },],
                });
            })
    };
    //关闭模态框
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }
    render() {

        const qycolumns = [
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
                title: '时监测值(m)',
                dataIndex: 'hourAvg',
                width: 109,
                className: 'column-money',
                render: hourAvg => Math.round(hourAvg * 1000) / 1000
            },
            {
                title: '日监测值(m)',
                dataIndex: 'dayAvg',
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
        const { loading } = this.state;
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
                    loading={loading}
                    columns={qycolumns}
                    dataSource={this.state.qydataSource}
                    scroll={{ y: 300 }}
                    pagination={pagination} />
                    title="Basic Modal"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                    width={1300}
                />
                <Modal
                    title="7天雨量详情"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                    width={1300}>
                    <Row>
                        <Col span={12}>
                            <Card title="雨量走势" bordered={false}>
                                <div id="mainbyqy" style={{ width: 600, height: 500 }}></div>
                            </Card></Col>
                        <Col span={12}>
                            <Card title="数据详情" bordered={false}>
                                <Table
                                    size="small"
                                    loading={this.state.mloading}
                                    columns={[
                                        {
                                            title: '站名',
                                            dataIndex: 'stnm',
                                            width: 75,
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
                                            width: 140,
                                            className: 'column-money',
                                            render: value => moment(value).format("YYYY-MM-DD HH:mm")
                                        },
                                        {
                                            title: '时监测值(m)',
                                            dataIndex: 'hourAvg',
                                            width: 109,
                                            className: 'column-money',
                                            render: hourAvg => Math.round(hourAvg * 1000) / 1000
                                        },
                                        {
                                            title: '日监测值(m)',
                                            dataIndex: 'dayAvg',
                                            width: 109,
                                            className: 'column-money',
                                            render: dayAvg => Math.round(dayAvg * 1000) / 1000
                                        },
                                    ]}
                                    dataSource={this.state.qydataSourceById}
                                    scroll={{ y: 500 }}
                                />
                            </Card></Col>
                    </Row>
                </Modal>
            </>
        );
    }
    //切换每页数量
    onShowSizeChange(current, pageSize) {
        this.setState({ loading: true });
        getRainHistory({
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
        console.log(current)
        this.setState({ loading: true });
        getRainHistory({
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
    //初始化数据
    componentDidMount() {
        this.setState({ loading: true });
        getRainHistory({
            "current": this.state.current,
            "size": this.state.pageSize
        })
            .then((result) => {
                this.setState({ qydataSource: result.data.records })
                this.setState({ loading: false });
                this.setState({ total: result.data.total })
            })
    }
}
export default Precipitation;