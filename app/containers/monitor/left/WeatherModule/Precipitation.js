/**
 * Precipitation 2020-05-18
 * zdl
 * 雨量站
 */
import React from 'react';
import "../style.scss";
import localimgURL from '../../../../resource/local.png';
import { Table, Tag, Popover, Modal, Button, Card, Row, Col, Input, Space, Tabs } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import emitter from "@app/utils/emitter.js";
import { getRainHistory, getBasicsAll, getByTimeHour, getByTimeDay } from "@app/data/request";
import { SpliceSite } from "@app/utils/common";
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts';

class Precipitation extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            qydataSource: [],//雨量站数据源
            loading: false,//雨量站数据源加载
            qydataSourceByHour: [],//单个站点雨量数据源
            qydataSourceByDay: [],//单个站点雨量数据源
            qydataSourceBySeven: [],//单个站点雨量数据源
            visible: false,//模态框
            mloading: false,//模态框表格加载动画
            searchText: '',
            searchedColumn: '',
            stid: ""
        };
    }
    //画图
    showTu = (data, value, starttm, endtm, id) => {
        let xdata = []
        let ydata = []
        var myChart = echarts.init(document.getElementById(id));
        if (data.length !== 0) {
            for (var i = data.length - 1; i >= 0; i--) {
                xdata.push(data[i].tm)
                ydata.push((data[i].hourAvg * 1).toFixed(1))
            }

            myChart.setOption({
                title: {
                    text: value.name + '-雨量站雨量变化',
                    subtext: starttm + '至' + endtm,
                    // left: 'center',
                },
                grid: {
                    top: 90,
                },
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                    },
                ],
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
                    name: '雨量（mm）'
                },
                legend: {
                    right: 'center',
                    x: '190px',
                    y: '50px',
                    // data: ['1小时降水', '24小时降水'],
                },
                series: [{
                    // name: '1小时降水',
                    data: ydata,
                    type: 'line',
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },

                },],
            });
        } else {
            // this.setState({
            //     mloading: false
            // });
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {// 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    top: 90,
                },
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                    },
                ],
                title: {
                    text: "暂无数据",
                    subtext: '暂无数据',
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    name: '时间',
                },
                yAxis: {
                    type: 'value',
                    name: '雨量（mm）'
                },
                series: [{
                    data: [],
                    type: 'line',
                }]
            })
        }
    }
    //画图
    showTu2 = (data, value, starttm, endtm, id) => {
        let xdata = []
        let ydata = []
        var myChart = echarts.init(document.getElementById(id));
        if (data.length !== 0) {
            for (var i = data.length - 1; i >= 0; i--) {
                xdata.push(data[i].endTime)
                ydata.push((data[i].avgDrp * 1).toFixed(1))
            }

            myChart.setOption({
                title: {
                    text: value.name + '-雨量站雨量变化',
                    subtext: starttm + '至' + endtm,
                    // left: 'center',
                },
                grid: {
                    top: 90,
                },
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                    },
                ],
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
                    name: '雨量（mm）'
                },
                legend: {
                    right: 'center',
                    x: '190px',
                    y: '50px',
                    // data: ['1小时降水', '24小时降水'],
                },
                series: [{
                    // name: '1小时降水',
                    data: ydata,
                    type: 'line',
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },

                },],
            });
        } else {
            // this.setState({
            //     mloading: false
            // });
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {// 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    top: 90,
                },
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                    },
                ],
                title: {
                    text: "暂无数据",
                    subtext: '暂无数据',
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    name: '时间',
                },
                yAxis: {
                    type: 'value',
                    name: '雨量（mm）'
                },
                series: [{
                    data: [],
                    type: 'line',
                }]
            })
        }
    }
    //模态框
    showModal = (value) => {
        this.callback(value)
        let starttm = moment(new Date().getTime() - 60 * 60 * 1000).format("YYYY-MM-DD HH:mm")
        let endtm = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm")
        getRainHistory({
            "stcd": value.stcd,
            "starttm": starttm,
            "endtm": endtm,
            "current": 1,
            "size": 10000
        })
            .then((result) => {
                console.log(result)
                this.setState({
                    qydataSourceByHour: result.data.records,
                    mloading: false,
                })
                this.showTu(result.data.records, value, starttm, endtm, 'mainbyqyByHour')

            })
        getByTimeHour({
            "stcd": value.stcd,
            "starttm": moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYY-MM-DD HH:mm:ss"),
            "endtm": moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"),
        })
            .then((result) => {
                console.log(result)
                this.setState({
                    qydataSourceByDay: result.data,
                    mloading: false,
                })
                this.showTu2(result.data, value, moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYY-MM-DD HH:mm:ss"), endtm, 'mainbyqyByDay')
            })
        getByTimeDay({
            "stcd": value.stcd,
            "starttm": moment(new Date().getTime() - 24 * 60 * 60 * 1000 * 7).format("YYYY-MM-DD HH:mm:ss"),
            "endtm": moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"),
        })
            .then((result) => {
                this.setState({
                    qydataSourceBySeven: result.data,
                    mloading: false,
                })
                this.showTu2(result.data, value, moment(new Date().getTime() - 24 * 60 * 60 * 1000 * 7).format("YYYY-MM-DD HH:mm:ss"), endtm, 'mainbyqyBySeven')
            })
        this.setState({
            visible: true,
            mloading: true
        });
    };
    //关闭模态框
    handleCancel = () => {
        this.setState({
            visible: false,
            qydataSourceByHour: []
        })
        // var myChart = echarts.init(document.getElementById('mainbyqy'));
        // myChart.setOption({
        //     title: {
        //         text: "暂无数据",
        //         subtext: '暂无数据',
        //     },
        //     xAxis: {
        //         data: []
        //     },
        //     series: [{
        //         data: [],
        //     }]
        // })
    }
    //检索数据搜索
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`请输入要搜索的站名`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        搜索
              </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        关闭
              </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Popover content={text.toString()} title="站名全称">
                    <Highlighter
                        highlightStyle={{ backgroundColor: 'red', padding: 0 }}
                        searchWords={[this.state.searchText]}
                        autoEscape
                        textToHighlight={text.toString().length > 8 ? text.toString().substring(0, 8) + "..." : text.toString()}
                    />
                </Popover>
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    // 选中行
    onClickRow = (record) => {
        return {
            //单击定位
            onClick: () => {
                this.locationClick(record)
            },
            //双击打开历史雨量
            onDoubleClick: () => {
                this.showModal(record)
            },
        };
    }
    render() {
        const qycolumns = [
            {
                title: '站名',
                dataIndex: 'SpliceSiteName',
                width: 80,
                className: 'column-money',
                key: 'riverwaterdataID',
                ...this.getColumnSearchProps('SpliceSiteName'),
                render:
                    (SpliceSiteName, key) => {
                        return (
                            <Popover content={SpliceSiteName} title="站名全称">
                                {SpliceSiteName.toString().substring(0, 4) + "..."}
                            </Popover>
                        )
                    },
            },
            {
                title: '5分钟(mm)',
                dataIndex: 'minuteAvg',
                width: 90,
                className: 'column-money',
                render: minuteAvg => minuteAvg == '-' ? '-' : (minuteAvg * 1).toFixed(1)
            },
            {
                title: '1小时(mm)',
                dataIndex: 'hourAvg',
                width: 90,
                className: 'column-money',
                render: hourAvg => hourAvg == '-' ? '-' : (hourAvg * 1).toFixed(1)
            },
            {
                title: '24小时(mm)',
                dataIndex: 'dayAvg',
                width: 90,
                className: 'column-money',
                render: dayAvg => dayAvg == '-' ? '-' : (dayAvg * 1).toFixed(1)
            },
            {
                title: '更新时间',
                dataIndex: 'tm',
                width: 140,
                className: 'column-money',
                render: value => value == null ? "-" : moment(value).format("YYYY-MM-DD HH:mm")
            }
        ];
        const columnsByHour = [
            {
                title: '站名',
                dataIndex: 'stnm',
                className: 'column-money',
                render:
                    stnm => {
                        if (stnm !== null || stnm !== "") {
                            return (
                                <span>
                                    {stnm}
                                </span>
                            )
                        } else {
                            return (
                                <span>
                                    {"暂无数据"}
                                </span>
                            )
                        }
                    }
            },
            {
                title: '5分钟(mm)',
                dataIndex: 'drp',
                width: 90,
                className: 'column-money',
                render: drp => drp == '-' ? '-' : (drp * 1).toFixed(1)
            },
            {
                title: '更新时间',
                dataIndex: 'tm',
                className: 'column-money',
                render: value => value == null ? "-" : moment(value).format("YYYY-MM-DD HH:mm")
            },
        ]
        const columnsByDay = [
            {
                title: '站名',
                dataIndex: 'stnm',
                className: 'column-money',
                render:
                    stnm => {
                        if (stnm !== null || stnm !== "") {
                            return (
                                <span>
                                    {stnm}
                                </span>
                            )
                        } else {
                            return (
                                <span>
                                    {"暂无数据"}
                                </span>
                            )
                        }
                    }
            },
            {
                title: '1小时降水(mm)',
                dataIndex: 'avgDrp',
                className: 'column-money',
                render: avgDrp => (avgDrp * 1).toFixed(1)
            },
            {
                title: '更新时间',
                dataIndex: 'endTime',
                className: 'column-money',
                render: value => value == null ? "-" : moment(value).format("YYYY-MM-DD HH:mm")
            },
        ]
        const columnsBySeven = [
            {
                title: '站名',
                dataIndex: 'stnm',
                className: 'column-money',
                render:
                    stnm => {
                        if (stnm !== null || stnm !== "") {
                            return (
                                <span>
                                    {stnm}
                                </span>
                            )
                        } else {
                            return (
                                <span>
                                    {"暂无数据"}
                                </span>
                            )
                        }
                    }
            },
            {
                title: '24小时降水量(mm)',
                dataIndex: 'avgDrp',
                className: 'column-money',
                render: avgDrp => (avgDrp * 1).toFixed(1)
            },
            {
                title: '更新时间',
                dataIndex: 'endTime',
                className: 'column-money',
                render: value => value == null ? "-" : moment(value).format("YYYY-MM-DD HH:mm")
            },
        ]
        const { loading } = this.state;
        return (
            <>
                <Table className="m-div-table"
                    size="small"
                    loading={loading}
                    columns={qycolumns}
                    dataSource={this.state.qydataSource}
                    scroll={{ y: 300 }}
                    rowKey={row => row.stcd}
                    onRow={this.onClickRow}
                // pagination={pagination} 
                />
                <Modal
                    title="7天雨量详情"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                    width={1300}>
                    <Tabs onChange={this.callback}>
                        <Tabs.TabPane tab="一小时" key="1" forceRender={true}>
                            <Row>
                                <Col span={12}>
                                    <div id="mainbyqyByHour" style={{ width: 600, height: 500 }}></div>
                                </Col>
                                <Col span={12}>
                                    <Table
                                        size="small"
                                        loading={this.state.mloading}
                                        rowKey={row => row.stcd}
                                        columns={columnsByHour}
                                        dataSource={this.state.qydataSourceByHour}
                                        scroll={{ y: 500 }}
                                    />
                                </Col>
                            </Row>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="24小时" key="2" forceRender={true}>
                            <Row>
                                <Col span={12}>
                                    <div id="mainbyqyByDay" style={{ width: 600, height: 500 }}></div>
                                </Col>
                                <Col span={12}>
                                    <Table
                                        size="small"
                                        loading={this.state.mloading}
                                        rowKey={row => row.stcd}
                                        columns={columnsByDay}
                                        dataSource={this.state.qydataSourceByDay}
                                        scroll={{ y: 500 }}
                                    /></Col>
                            </Row></Tabs.TabPane>
                        <Tabs.TabPane tab="7天" key="3" forceRender={true}>
                            <Row>
                                <Col span={12}>
                                    <div id="mainbyqyBySeven" style={{ width: 600, height: 500 }}></div>
                                </Col>
                                <Col span={12}>
                                    <Table
                                        size="small"
                                        loading={this.state.mloading}
                                        rowKey={row => row.stcd}
                                        columns={columnsBySeven}
                                        dataSource={this.state.qydataSourceBySeven}
                                        scroll={{ y: 500 }}
                                    />  </Col>
                            </Row></Tabs.TabPane>
                    </Tabs>

                </Modal>
            </>
        );
    }
    callback(key) {
        console.log(key);
    }
    // //切换每页数量
    // onShowSizeChange(current, pageSize) {
    //     this.setState({ loading: true });
    //     getRainHistory({
    //         "current": current,
    //         "size": pageSize
    //     })
    //         .then((result) => {
    //             this.setState({ qydataSource: result.data.records })
    //             this.setState({ loading: false });
    //             this.setState({ current: result.data.current })
    //             this.setState({
    //                 pageSize: pageSize
    //             })
    //         })
    // }

    // // 回调函数，切换下一页
    // changePage(current) {
    //     console.log(current)
    //     this.setState({ loading: true });
    //     getRainHistory({
    //         "current": current,
    //         "size": this.state.pageSize
    //     })
    //         .then((result) => {
    //             this.setState({ qydataSource: result.data.records })
    //             this.setState({ loading: false });
    //             this.setState({ total: result.data.total })
    //             this.setState({ current: result.data.current })
    //         })
    // }
    //初始化数据
    componentDidMount() {
        this.setState({ loading: true });
        getBasicsAll({
            "type": 1
        })
            .then((result) => {
                let dataArr = SpliceSite(result)
                this.setState({ loading: false });
                this.setState({ qydataSource: dataArr })

            })
    }
    locationClick(e) {
        console.log(e)
        let lon = e.lon * 1;
        let lat = e.lat * 1;
        if (lon == null && lat == null) return;
        emitter.emit("map-move", [lon, lat], () => { console.log("moveend"); });
    }
}
export default Precipitation;