/**
 * EasyFlood 2020-05-28
 * zdl
 * 易涝点
 */
import React from 'react';
import "../style.scss";
import localimgURL from '../../../../resource/local.png';
import emitter from "@app/utils/emitter.js";
import { Table, Popover, Tag, Modal, Button, Card, Row, Col, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import { SpliceSite } from "@app/utils/common";
import { getWaterHistory, getBasicsAll } from "@app/data/request";
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts';
class easyFlood extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            qydataSource: [],//易涝点数据源
            loading: false,//易涝点数数据源加载
            swdataSourceById: [],//单个易涝点数水位数据源
            visible: false,//模态框
            mloading: false,//模态框表格加载动画
            searchText: '',
            searchedColumn: '',
            pageNum: 1
        };
    }
    //模态框控制
    showModal = (value) => {
        this.setState({
            visible: true,
            mloading: true
        });
        let starttm = moment(new Date().getTime() - 24 * 60 * 60 * 1000 * 7).format("YY-MM-DD HH:mm:ss")
        let endtm = moment(new Date().getTime()).format("YY-MM-DD HH:mm:ss")
        getWaterHistory({
            "stcd": value.stcd,
            "starttm": starttm,
            "endtm": endtm,
            "current": 1,
            "size": 10000
        })
            .then((result) => {
                this.setState({
                    mloading: false,
                })
                var myChart = echarts.init(document.getElementById('mainbyef'));
                if (result.data.records.length !== 0) {
                    let xdata = []
                    let ydata = []
                    for (var i = result.data.records.length - 1; i >= 0; i--) {
                        xdata.push(result.data.records[i].tm)
                        ydata.push((result.data.records[i].z * 1).toFixed(2))
                    }
                    this.setState({
                        swdataSourceById: result.data.records,
                        mloading: false,
                    })

                    myChart.setOption({
                        title: {
                            text: value.name + "-易涝点24小时水位变化",
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
                            name: '水位（m）'
                        },
                        // visualMap: {
                        //     show: true,
                        //     pieces: [
                        //         {
                        //             gt: 0,
                        //             lte: value.warning,          //这儿设置基线上下颜色区分 基线下面为绿色
                        //             color: '#03d6d6'
                        //         }, {
                        //             gt: value.warning,          //这儿设置基线上下颜色区分 基线上面为红色
                        //             color: '#e91642',
                        //         }]
                        //     ,
                        // },
                        series: [{
                            data: ydata,
                            type: 'line',
                            markPoint: {
                                data: [
                                    { type: 'max', name: '最大值' },
                                    {
                                        type: 'min', name: '最小值', itemStyle: {
                                            color: '#03d6d6'
                                        }
                                    }
                                ],

                            },
                            markLine: {
                                label: {
                                    position: "end",
                                },
                                color: '#ffcc33',
                                data: [
                                    {
                                        silent: false,
                                        label: {
                                            position: 'center',
                                            formatter: "警戒水位" + value.warning + "m",
                                            itemStyle: {
                                                left: '100px'
                                            }
                                        },
                                        yAxis: value.warning,
                                    }
                                ]
                            }
                        }],
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
                            text: value.name + "-易涝点24小时水位变化",
                            subtext: starttm + '至' + endtm,
                        },
                        xAxis: {
                            type: 'category',
                            data: [],
                            name: '时间',
                        },
                        yAxis: {
                            type: 'value',
                            name: '水位(m)'
                        },
                        series: [{
                            data: [],
                            type: 'line',
                        }]
                    })
                }
            })
    };
    //模态框关闭
    handleCancel = () => {
        this.setState({
            visible: false,
            swdataSourceById: [],
            pageNum: 1
        })
        var myChart = echarts.init(document.getElementById('mainbyef'));
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
                markLine: {
                    data: [
                        {
                            label: {
                                formatter: "暂无数据",
                            },
                            yAxis: 2
                        }
                    ]
                }
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
            //双击打开历史水位
            // onDoubleClick: () => {
            //     this.showModal(record)
            // },
        };
    }
    // 回调函数，切换下一页
    changePage(current) {
        console.log(current)
        this.setState({ current: current })
    }
    render() {
        //水位data
        const swcolumns = [
            {
                title: '站名',
                dataIndex: 'SpliceSiteName',
                className: 'column-money',
                ...this.getColumnSearchProps('SpliceSiteName'),
                render:
                    (SpliceSiteName, key) => {
                        return (
                            <Popover content={SpliceSiteName} title="站名全称">
                                {SpliceSiteName.toString().substring(0, 6) + "..."}
                            </Popover>
                        )
                    },
            },
            {
                title: '水位(m)',
                dataIndex: 'z',
                className: 'column-money',
                render: dayAvg => dayAvg != "-" ? (dayAvg * 1).toFixed(2) : "-",
                sorter: (a, b) => a.z - b.z,
            },
            {
                title: '更新时间',
                dataIndex: 'ztm',
                className: 'column-money',
                width: 140,
                render: value => value == null ? "-" : moment(value).format("YYYY-MM-DD HH:mm"),
                sorter: (a, b) => new Date(a.ztm).getTime() - new Date(b.ztm).getTime(),
            },
        ];
        //根据编号获取信息表头daata
        const swcolumnsById = [
            {
                title: '站名',
                dataIndex: 'stnm',
                className: 'column-money',
                render:
                    stnm => {
                        if (stnm !== null && stnm !== "") {
                            return (
                                <a>
                                    {stnm}
                                </a>
                            )
                        } else {
                            return (
                                <a>
                                    {stnm ? stnm : "暂无数据"}
                                </a>
                            )
                        }
                    }
            },
            {
                title: '水位(m)',
                dataIndex: 'z',
                className: 'column-money',
                render: z => (z * 1).toFixed(2)
            },
            {
                title: '更新时间',
                dataIndex: 'tm',
                className: 'column-money',
                render: value => value == null ? "-" : moment(value).format("YYYY-MM-DD HH:mm")
            },

        ];
        return (
            <>
                <Table className="m-div-table"
                    size="small"
                    loading={this.state.loading}
                    columns={swcolumns}
                    dataSource={this.state.qydataSource}
                    scroll={{ y: 830 }}
                    rowKey={row => row.stcd}
                    onRow={this.onClickRow}
                    pagination={{
                        defaultPageSize: 50
                    }}
                />
                <Modal
                    title="24小时易涝点详情"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                    width={1300}
                >
                    <Row>
                        <Col span={12}><Card title="水位走势" bordered={false}>
                            <div id="mainbyef" style={{ width: 600, height: 500 }}></div>
                        </Card></Col>
                        <Col span={12}><Card title="水位数据" bordered={false}>
                            <Table
                                size="small"
                                loading={this.state.mloading}
                                columns={swcolumnsById}
                                dataSource={this.state.swdataSourceById}
                                scroll={{ y: 500 }}
                                rowKey={row => row.stcd}
                            // pagination={{ current: this.state.pageNum , onChange: (current) => this.changePage(current)}}
                            />
                        </Card></Col>
                    </Row>
                </Modal>
            </>

        );
    }
    selectInit() {
        this.setState({ loading: true });
        getBasicsAll({
            "type": 3
        })
            .then((result) => {
                let dataArr = SpliceSite(result)
                this.setState({ loading: false });
                this.setState({ qydataSource: dataArr })
            })
    }
    //初始化数据
    componentDidMount() {
        this.selectInit()
        window.setInterval(() => {
            this.selectInit()
        }, 1000 * 5 * 60);

    }
    locationClick(e) {
        let lon = e.lon * 1;
        let lat = e.lat * 1;
        if (lon == null && lat == null) return;
        emitter.emit("map-move", [lon, lat], () => { console.log("moveend"); });
    }
}
export default easyFlood;