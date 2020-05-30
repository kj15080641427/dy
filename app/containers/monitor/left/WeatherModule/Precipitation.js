/**
 * Precipitation 2020-05-18
 * zdl
 * 雨量站
 */
import React from 'react';
import "../style.scss";
import localimgURL from '../../../../resource/local.png';
import { Table, Tag, Popover, Modal, Button, Card, Row, Col, Input, Space, Tooltip } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import emitter from "@app/utils/emitter.js";
import { getRainHistory, getBasicsAll } from "@app/data/request";
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts';

class Precipitation extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            qydataSource: [],//雨量站数据源
            loading: false,//雨量站数据源加载
            qydataSourceById: [],//单个站点雨量数据源
            visible: false,//模态框
            mloading: false,//模态框表格加载动画
            searchText: '',
            searchedColumn: '',
        };
    }
    //模态框
    showModal = (value) => {
        this.setState({
            visible: true,
            mloading: true
        });
        let starttm = moment(new Date().getTime() - 24 * 60 * 60 * 1000 * 7).format("YY-MM-DD HH:mm:ss")
        let endtm = moment(new Date().getTime()).format("YY-MM-DD HH:mm:ss")
        getRainHistory({
            "stcd": value.stcd,
            "starttm": starttm,
            "endtm": endtm,
            "current": 1,
            "size": 10000
        })
            .then((result) => {
                console.log(result)
                let xdata = []
                let ydata = []
                let ydataByDay = []
                var myChart = echarts.init(document.getElementById('mainbyqy'));
                if (result.data.records.length !== 0) {
                    for (var i = result.data.records.length - 1; i >= 0; i--) {
                        xdata.push(result.data.records[i].tm)
                        ydata.push(result.data.records[i].hourAvg)
                        ydataByDay.push(result.data.records[i].dayAvg)
                    }
                    this.setState({
                        qydataSourceById: result.data.records,
                        mloading: false,
                    })
                    myChart.setOption({
                        title: {
                            text: value.name + '-雨量站七天雨量变化',
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
                            data: ['1小时降水', '24小时降水'],
                        },
                        series: [{
                            name: '1小时降水',
                            data: ydata,
                            type: 'line',
                            markPoint: {
                                data: [
                                    { type: 'max', name: '最大值' },
                                    { type: 'min', name: '最小值' }
                                ]
                            },

                        }, {
                            name: '24小时降水',
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
                } else {
                    this.setState({
                        mloading: false
                    });
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
            })
    };
    //关闭模态框
    handleCancel = () => {
        this.setState({
            visible: false,
            qydataSourceById: []
        })
        var myChart = echarts.init(document.getElementById('mainbyqy'));
        myChart.setOption({
            title: {
                text: "暂无数据",
                subtext: '暂无数据',
            },
            xAxis: {
                data: []
            },
            series: [{
                data: [],
            }]
        })
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
                dataIndex: 'name',
                width: '40%',
                className: 'column-money',
                key: 'riverwaterdataID',
                ...this.getColumnSearchProps('name'),
                render:
                    (name, key) => {
                        return (
                            <Popover content={name} title="站名全称">
                                {name.toString().substring(0, 6) + "..."}
                            </Popover>
                        )
                    },
            },
            {
                title: '1小时降水(mm)',
                dataIndex: 'hourAvg',
                width: 113,
                className: 'column-money',
                render: hourAvg => Math.round(hourAvg * 1000) / 1000
            },
            {
                title: '日降水量(mm)',
                dataIndex: 'dayAvg',
                width: 109,
                className: 'column-money',
                render: dayAvg => Math.round(dayAvg * 1000) / 1000
            },
            {
                title: '更新时间',
                dataIndex: 'tm',
                width: 140,
                className: 'column-money',
                render: value => moment(value).format("YYYY-MM-DD HH:mm")
            }
        ];
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
                                    rowKey={row => row.stcd}
                                    columns={[
                                        {
                                            title: '站名',
                                            dataIndex: 'stnm',
                                            width: 75,
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
                                            dataIndex: 'hourAvg',
                                            width: 119,
                                            className: 'column-money',
                                            render: hourAvg => Math.round(hourAvg * 1000) / 1000
                                        },
                                        {
                                            title: '24小时降水量(mm)',
                                            dataIndex: 'dayAvg',
                                            width: 130,
                                            className: 'column-money',
                                            render: dayAvg => Math.round(dayAvg * 1000) / 1000
                                        },
                                        {
                                            title: '更新时间',
                                            dataIndex: 'tm',
                                            width: 140,
                                            className: 'column-money',
                                            render: value => moment(value).format("YYYY-MM-DD HH:mm")
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
                let dataArr = []
                for (let i = 0; i < result.data.length; i++) {
                    dataArr.push({
                        originalName: result.data[i].name,
                        name: result.data[i].name = "" ? result.data[i].stcd : result.data[i].name + "(" + result.data[i].dataSourceName + ")",
                        ztm: result.data[i].ztm,
                        dataSourceName: result.data[i].dataSourceName,
                        hourAvg: result.data[i].hourAvg,
                        dayAvg: result.data[i].dayAvg,
                        stcd: result.data[i].stcd,
                        lon: result.data[i].lon,
                        lat: result.data[i].lat,
                    })
                }
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