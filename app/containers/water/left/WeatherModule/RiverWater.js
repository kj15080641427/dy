/**
 * RiverWater 2020-07-4
 * zdl
 * 河道信息
 */
import React from 'react';
import "../style.scss";
import localimgURL from '../../../../resource/local.png';
import emitter from "@app/utils/emitter.js";
import { Table, Popover, Tag, Modal, Button, Card, Row, Col, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import { getWfsRiver, getWfsRiverByName , getWaterHistory} from "@app/data/request";
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts';
import { SpliceSite } from "@app/utils/common";
import { compose } from 'ol/transform';

class RiverWater extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            qydataSource: [],//水位数据源
            loading: false,//水位数据源加载
            smalloading: false,
            total: 0,//水位数据源总数页
            current: 1,//水位数据源开始页
            pageSize: 10,//水位数据源单页条数
            zdDataSource: new Map(),
            swdataSourceById: [],//单个站点水位数据源
            visible: false,//模态框
            mloading: false,//模态框表格加载动画
            searchText: '',
            searchedColumn: '',
            openKeys: ['1'],
        };
    }
    //模态框控制
    showModal = (obj) => {
        this.setState({
            visible: true,
            mloading: true
        });
        let starttm = moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YY-MM-DD HH:mm:ss")
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
                var myChart = echarts.init(document.getElementById('mainbyhd'));
                if (result.data.records.length !== 0) {
                    this.setState({ swdataSourceById: result.data.records, })
                    let xdata = []
                    let ydata = []
                    for (var i = 1; i < result.data.records.length; i++) {
                        xdata.push(result.data.records[i].tm)
                        ydata.push((result.data.records[i].z * 1).toFixed(2))
                    }
                    myChart.setOption({
                        title: {
                            text: obj.SpliceSiteName + "-24小时水位曲线",
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
                            text: obj.name + "-24小时水位曲线",
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
        })
        var myChart = echarts.init(document.getElementById('mainbyhd'));
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
    onClickSmalRow = (record) => {
        return {
            //单击定位
            onClick: () => {
                this.locationsmalClick(record)
            },
            //双击打开历史水位
            onDoubleClick: () => {
                this.showModal(record)
            },
        };
    }
    onExpandOpen = (expanded, record) => {
        console.log(expanded, record)
        getWfsRiverByName({
            "name": record.name
        }).then((result) => {
            console.log(result)
            let data = []
            for (let i = 0; i < result.data[0].list.length; i++) {
                data.push({
                    stcd: result.data[0].list[i].stcd,
                    SpliceSiteName: result.data[0].list[i].name + "(" + result.data[0].list[i].dataSourceDesc + ")",
                    z: result.data[0].list[i].z,
                    warning: result.data[0].list[i].warning,
                    ztm: result.data[0].list[i].ztm,
                    lon: result.data[0].list[i].lon,
                    lat: result.data[0].list[i].lat,
                })
            }
            let dataSource = {...this.state.zdDataSource} ;
            dataSource[record.name] = data;
            this.setState({
                zdDataSource: dataSource
            })
        })
    }
    onExpandedRowsChangea = (expandedRows) => {
        console.log(expandedRows)
    }
    render() {
        const { loading } = this.state;
        //根据编号获取信息表头data
        const swcolumnsById = [
            {
                title: '站名',
                dataIndex: 'name',
                className: 'column-money',
                render:
                    name => {
                        if (name !== null && name !== "") {
                            return (
                                <a>
                                    {name}
                                </a>
                            )
                        } else {
                            return (
                                <a>
                                    {name ? name : "暂无数据"}
                                </a>
                            )
                        }
                    }
            },
            {
                title: '警戒水位(m)',
                dataIndex: 'warning',
                className: 'column-money',
                render: warning => (warning * 1).toFixed(2)
            },

        ];
        const swcolumnsByIdModel = [
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
        const qxcolumns = [
            {
                title: '河流名称',
                dataIndex: 'name',
                className: 'column-money',
                render:
                    name => {
                        if (name !== null && name !== "") {
                            return (
                                <a>
                                    {name}
                                </a>
                            )
                        } else {
                            return (
                                <a>
                                    {name ? name : "暂无数据"}
                                </a>
                            )
                        }
                    },
                ...this.getColumnSearchProps("name"),
            },
            {
                title: '河流总长(km)',
                dataIndex: 'riverlen',
                className: 'column-money',
                // render: dayAvg => (dayAvg * 1).toFixed(2)
            },
            // {
            //     title: '警戒水位(m)',
            //     dataIndex: 'warning',
            //     className: 'column-money',
            //     render: warning => (warning * 1).toFixed(2)
            // },
            {
                title: '东营市长度(km)',
                dataIndex: 'riverlendy',
                className: 'column-money',
                // render: value => moment(value).format("YYYY-MM-DD HH:mm")
            },
        ];
        const expandedRowRendertype = (record, index, indent, expanded) => {
            //水位data
            const swcolumns = [
                {
                    title: '站名',
                    dataIndex: 'SpliceSiteName',
                    key: "stcd",
                    className: 'column-money',
                    ...this.getColumnSearchProps('SpliceSiteName'),
                    ellipsis: true,
                    // render:
                    //     (SpliceSiteName, key) => {
                    //         return (
                    //             <Popover content={SpliceSiteName} title="站名全称">
                    //                 {SpliceSiteName.toString().substring(0, 6) + "..."}
                    //             </Popover>
                    //         )
                    //     },
                },
                {
                    title: '水位(m)',
                    dataIndex: 'z',
                    className: 'column-money',
                    render: z => z != "-" ? (z * 1).toFixed(2) : "-",
                    sorter: (a, b) => a.z - b.z,
                },
                {
                    title: '警戒水位(m)',
                    dataIndex: 'warning',
                    className: 'column-money',
                    render: warning => warning != "99" ? (warning * 1).toFixed(2) : "-",
                    sorter: (a, b) => a.warning - b.warning,
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
            let source = this.state.zdDataSource[record.name];
            return React.cloneElement(
            <Table
                size="small"
                loading={this.state.smalloading}
                columns={swcolumns}
                dataSource={source}
                scroll={{ y: 400 }}
                rowKey={row => row.stcd}
                onRow={this.onClickSmalRow}
                pagination={{
                    defaultPageSize: 50
                }}
                pagination={{
                    showTotal: () => `共${this.state.zdDataSource[record.name].length}条`,
                }}
            />) 
        };

        
        return (
            <>
                <Table
                    expandable={{
                        expandedRowRender: expandedRowRendertype,
                        onExpand: this.onExpandOpen,
                        rowExpandable: false,
                    }}
                    // defaultExpandedRowKeys={[1]}
                    size="small"
                    loading={loading}
                    columns={qxcolumns}
                    dataSource={this.state.qxdataSource}
                    rowKey={row => row.name}
                    scroll={{ y: 560 }}
                    pagination={{
                        defaultPageSize: 50,
                    }}
                    pagination={false}
                    onRow={this.onClickRow}
                // showHeader={false}
                />
                <Modal
                    title="24小时水位详情"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                    width={1300}
                >
                    <Row>
                        <Col span={12}>
                            <div id="mainbyhd" style={{ width: 600, height: 500 }}></div>
                        </Col>
                        <Col span={12}>
                            <Table
                                size="small"
                                loading={this.state.mloading}
                                columns={swcolumnsByIdModel}
                                dataSource={this.state.swdataSourceById}
                                scroll={{ y: 500 }}
                                rowKey={row => row.stcd}
                            />
                        </Col>
                    </Row>
                </Modal>
            </>

        );
    }
    selectInit() {
        this.setState({ loading: true });
        getWfsRiver({
        })
            .then((result) => {
                console.log(result)
                this.setState({ loading: false });
                this.setState({ qxdataSource: result.data })
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
        let lon = e.lonsrs * 1;
        let lat = e.latsrs * 1;
        if (lon == null && lat == null) return;
        emitter.emit("map-move", [lon, lat], () => { console.log("moveend"); });
    }
    locationsmalClick(e) {
        let lon = e.lon * 1;
        let lat = e.lat * 1;
        if (lon == null && lat == null) return;
        emitter.emit("map-move", [lon, lat], () => { console.log("moveend"); });
    }
}
export default RiverWater;