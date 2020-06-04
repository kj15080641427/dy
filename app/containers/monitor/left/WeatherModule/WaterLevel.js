/**
 * Precipitation 2020-05-18
 * zdl
 * 水位站
 */
import React from 'react';
import "../style.scss";
import localimgURL from '../../../../resource/local.png';
import emitter from "@app/utils/emitter.js";
import { Table, Popover, Tag, Modal, Button, Card, Row, Col, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import { getWaterHistory, getBasicsAll } from "@app/data/request";
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts';
import { SpliceSite } from "@app/utils/common";

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
            searchText: '',
            searchedColumn: '',
        };
    }
    //模态框控制
    showModal = (obj) => {
        this.setState({
            visible: true,
            mloading: true
        });
        let starttm = moment(new Date().getTime() - 24 * 60 * 60 * 1000 * 7).format("YY-MM-DD HH:mm:ss")
        let endtm = moment(new Date().getTime()).format("YY-MM-DD HH:mm:ss")
        console.log(obj)
        getWaterHistory({
            "stcd": obj.stcd,
            "starttm": starttm,
            "endtm": endtm,
            "current": 1,
            "size": 10000
        })
            .then((result) => {
                this.setState({
                    mloading: false,
                })
                var myChart = echarts.init(document.getElementById('mainbysw'));
                if (result.data.records.length !== 0) {
                    this.setState({ swdataSourceById: result.data.records, })
                    let xdata = []
                    let ydata = []
                    for (var i = result.data.records.length - 1; i >= 0; i--) {
                        xdata.push(result.data.records[i].tm)
                        ydata.push((result.data.records[i].z * 1).toFixed(2))
                    }
                    myChart.setOption({
                        title: {
                            text: obj.name + "-水位站24小时水位变化",
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
                            name: '水位（m）',
                            max: function (value) {
                                return value.max > 0 ? value.max + obj.warning * 1 : obj.warning * 1 + 3
                            }
                        },
                        visualMap: {
                            show: true,
                            pieces: [
                                {
                                    gt: obj.warning > 0 ? -obj.warning : obj.warning,
                                    lte: obj.warning,          //这儿设置基线上下颜色区分 基线下面为绿色
                                    color: '#03d6d6'
                                }, {
                                    gt: obj.warning,          //这儿设置基线上下颜色区分 基线上面为红色
                                    color: '#e91642',
                                    // lte: obj.warning,
                                },

                            ]
                            ,
                        },
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
                                // color: '#ffcc33',
                                data: [
                                    {
                                        silent: false,
                                        label: {
                                            position: 'center',
                                            formatter: "预警" + obj.warning + "m",
                                            itemStyle: {
                                                left: '100px'
                                            }
                                        },
                                        yAxis: obj.warning,
                                    }
                                ]
                            }
                        }],
                    });
                } else {
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
        })
        var myChart = echarts.init(document.getElementById('mainbysw'));
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
            onDoubleClick: () => {
                this.showModal(record)
            },
        };
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
                render: dayAvg => dayAvg != "-" ? (dayAvg * 1).toFixed(2) : "-"
            },
            {
                title: '警戒水位(m)',
                dataIndex: 'warning',
                className: 'column-money',
                render: warning => warning != "-" ? (warning * 1).toFixed(2) : "-"
            },
            {
                title: '更新时间',
                dataIndex: 'ztm',
                className: 'column-money',
                width: 140,
                render: value => value == null ? "-" : moment(value).format("YYYY-MM-DD HH:mm")
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
                render: dayAvg => (dayAvg * 1).toFixed(2)
            },
            // {
            //     title: '警戒水位(m)',
            //     dataIndex: 'warning',
            //     className: 'column-money',
            //     render: warning => (warning * 1).toFixed(2)
            // },
            {
                title: '更新时间',
                dataIndex: 'tm',
                className: 'column-money',
                render: value => moment(value).format("YYYY-MM-DD HH:mm")
            },

        ];
        return (
            <>
                <Table className="m-div-table"
                    size="small"
                    loading={this.state.loading}
                    columns={swcolumns}
                    dataSource={this.state.qydataSource}
                    scroll={{ y: 300 }}
                    rowKey={row => row.stcd}
                    onRow={this.onClickRow}
                />
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
                                loading={this.state.mloading}
                                columns={swcolumnsById}
                                dataSource={this.state.swdataSourceById}
                                scroll={{ y: 500 }}
                                rowKey={row => row.stcd}
                            />
                        </Card></Col>
                    </Row>
                </Modal>
            </>

        );
    }
    //初始化加载数据
    componentDidMount() {
        this.setState({ loading: true });
        getBasicsAll({
            "type": 2
        })
            .then((result) => {
                var dataArr = SpliceSite(result)
                this.setState({ loading: false });
                this.setState({ qydataSource: dataArr })
            })
    }
    locationClick(e) {
        let lon = e.lon * 1;
        let lat = e.lat * 1;
        if (lon == null && lat == null) return;
        emitter.emit("map-move", [lon, lat], () => { console.log("moveend"); });
    }
}
export default Precipitation;