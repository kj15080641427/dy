/**
 * Precipitation 2020-05-28
 * zdl
 * 视频站
 */
import React from 'react';
import "../style.scss";
import { Table, Space, Popover, Modal, Button, Row, Input, Drawer, message, Col } from 'antd';
import VideoComponent from '@app/components/video/VideoComponent';
import VideoControl from '@app/components/video/VideoControl';
import Highlighter from 'react-highlight-words';
import {
    CaretRightOutlined, SearchOutlined
} from '@ant-design/icons';
import { getRadioAll, getAllVideo } from "@app/data/request";
import emitter from "@app/utils/emitter.js";
import Holder from "@app/components/video/Holder"

class Precipitation extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            qydataSource: [],//视频站数据源
            loading: false,//视频站数据源加载
            visible: false,//模态框
            token: "",
            videoobj: null,
            address: "",
            type: "",
            qxdataSource: [],
        };
        this.videoControl = new VideoControl();
    }
    //打开视频
    playV = (value) => {
        console.log(value)
        if (value.isOnline == '0') {
            this.videoControl.login().then((rest) => {
                this.setState({ videoobj: this.videoControl });
            })
            this.setState({
                visible: true,
                token: value.strtoken,
                type: value.dataSource,
                address: "摄像头详细地址：" + value.address
            });
        } if (value.isOnline == '1') {
            message.error('视频站点不在线');
        }
    }
    //关闭视频
    handleCancel = () => {
        this.setState({
            visible: false,
            token: "",
            videoobj: null,
            address: ""
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
    //搜索提交
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    //表单清空
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };


    render() {
        const qxcolumns = [
            {
                title: "区县名称",
                dataIndex: "regionName",
                key: 'regionName',
                childrenColumnName: "list"
            },
        ]
        const { loading } = this.state;
        const expandedRowRendertype = (record, index, indent, expanded) => {
            console.log(record)
            const qycolumns = [
                {
                    title: '站名',
                    dataIndex: 'name',
                    key: 'name',
                },
            ];
            return <Table
                showHeader={false}
                size="small"
                loading={loading}
                columns={qycolumns}
                dataSource={record.list}
                rowKey={row => row.name}
                // onRow={this.onClickRow}
                scroll={{ y: 830 }}
                expandable={{
                    expandedRowRender,
                    defaultExpandedRowKeys: ["1"]
                }}
                pagination={false}
            />;
        };
        const expandedRowRender = (record, index, indent, expanded) => {
            const qycolumns = [
                {
                    title: '站名',
                    dataIndex: 'sitename',
                    key: 'riverwaterdataID',
                    ellipsis: true,
                    ...this.getColumnSearchProps('sitename'),
                },
                // {
                //     title: '位置',
                //     dataIndex: 'address',
                //     className: 'column-money',
                //     render:
                //         address => {
                //             return (
                //                 <Popover content={address} title="视频地址全称">
                //                     {address === "-" ? address : address.substring(0, 10) + '...'}
                //                 </Popover>
                //             )
                //         }
                // },
                {
                    title: '状态',
                    dataIndex: 'isOnline',
                    className: 'column-money',
                    // width: 70,
                    render:
                        isOnline => {
                            if (isOnline == 0) {
                                return (
                                    <a>在线</a>
                                )
                            } else {
                                return (
                                    <a style={{ color: 'red' }}>离线</a>
                                )
                            }
                        },
                    sorter: (a, b) => parseInt(+a.isOnline) - parseInt(+b.isOnline),
                    defaultSortOrder: 'ascend'
                },
                {
                    title: '操作',
                    dataIndex: 'isOnline',
                    width: 100,
                    render:
                        (isOnline, key) => {
                            return (
                                <Button type="primary" shape="circle" icon={<CaretRightOutlined style={{ fontSize: 20 }} />} onClick={() => this.playV(key)} />
                            )
                        },
                }
            ];
            return <Table
                size="small"
                loading={loading}
                columns={qycolumns}
                dataSource={record.list}
                rowKey={row => row.radioID}
                onRow={this.onClickRow}
                scroll={{ y: 830 }}
                pagination={{
                    showTotal: () => `共${record.list.length}条`,
                }}
            />;
        };
        return (
            <>
                <Table
                    expandable={{
                        expandedRowRender: expandedRowRendertype,
                        defaultExpandedRowKeys: ["1"]
                    }}
                    size="small"
                    loading={loading}
                    columns={qxcolumns}
                    dataSource={this.state.qxdataSource}
                    rowKey={row => row.regionName}
                    scroll={{ y: 900 }}
                    pagination={{
                        defaultPageSize: 50,
                    }}
                    pagination={false}
                    showHeader={false}
                />
                <Drawer
                    title={this.state.address}
                    placement="top"
                    onClose={this.handleCancel}
                    visible={this.state.visible}
                    width={"100%"}
                    height="100%"
                // style={{
                //     padding: '8px 0',
                //     background: '#747575',
                //     position: 'relative',
                //     overflow: 'hidden',
                //     left: 9
                // }}
                >
                    {/* <FullScreen ></FullScreen> */}
                    <div>
                        <div style={{
                            'overflow-y': "hidden",
                            padding: '8px 0',
                            background: '#000000',
                            position: 'relative',
                            overflow: 'hidden',
                            height: 975,
                            width: 1920,
                            left: -24,
                            top: -25
                        }} scrolling="no"
                            borderWidth='0'
                            position='absolute'>
                            {this.state.videoobj !== null ?
                                <VideoComponent videoControl={this.state.videoobj} token={this.state.token} style={{
                                    transform: 'scale(3.2)',
                                    width: "1920px",
                                    height: "975px",
                                    // frameborder: 0,
                                    // scrolling: "no",
                                    // borderWidth: 0,
                                    position: 'absolute',
                                    overflow: '-Scroll', "overflow- y": 'hidden',
                                    left: 2106,
                                    top: 1028,
                                }} type={this.state.type} />
                                : null}
                        </div>
                        <Holder token={this.state.token}></Holder>
                    </div>
                </Drawer>
            </>
        );
    }
    selectInit() {
        this.setState({ loading: true });
        getAllVideo({
            "isShow": "0"
        }).then((result) => {
            console.log(result)
            let dyfloodarr = [];
            let dycatyarr = [];
            let dyteharr = [];
            let klfloodarr = [];
            let klcatyarr = [];
            let ljfloodarr = [];
            let ljcatyarr = [];
            let grfloodarr = [];
            let grcatyarr = [];
            let hkfloodarr = [];
            let hkcatyarr = [];
            this.setState({ loading: false });
            for (let i = 0; i < result.data.length; i++) {
                if (result.data[i].regionName === "东营区") {
                    if (result.data[i].dataSource * 1 === 10) {
                        dyteharr.push(result.data[i])
                    }
                    else if (result.data[i].dataSource * 1 === 3 || result.data[i].dataSource * 1 === 9) {
                        dyfloodarr.push(result.data[i])
                    }
                    else {
                        dycatyarr.push(result.data[i])
                    }
                } if (result.data[i].regionName === "广饶县") {
                    if (result.data[i].dataSource === "3") {
                        grfloodarr.push(result.data[i])
                    } else {
                        grcatyarr.push(result.data[i])
                    }
                } if (result.data[i].regionName === "利津县") {
                    if (result.data[i].dataSource === "3") {
                        ljfloodarr.push(result.data[i])
                    } else {
                        ljcatyarr.push(result.data[i])
                    }
                } if (result.data[i].regionName === "河口区") {
                    if (result.data[i].dataSource === "3") {
                        hkfloodarr.push(result.data[i])
                    } else {
                        hkcatyarr.push(result.data[i])
                    }
                } if (result.data[i].regionName === "垦利区") {
                    if (result.data[i].dataSource === "3") {
                        klfloodarr.push(result.data[i])
                    } else {
                        klcatyarr.push(result.data[i])
                    }
                }
            }
            let dyarr = [{ name: "河道", list: dycatyarr }, { name: "积水点", list: dyfloodarr }, { name: "天鹅湖蓄滞洪区", list: dyteharr }];
            let klarr = [{ name: "河道", list: klcatyarr }];
            let ljarr = [{ name: "河道", list: ljcatyarr }];
            let grarr = [{ name: "河道", list: grcatyarr }];
            let hkarr = [{ name: "河道", list: hkcatyarr }];
            let data = [
                { regionName: "东营区(开发区)", list: dyarr },
                { regionName: "广饶县(省农高区)", list: grarr },
                { regionName: "利津县", list: ljarr },
                { regionName: "河口区(东营港)", list: hkarr },
                { regionName: "垦利区", list: klarr },
            ]
            console.log(data)
            this.setState({ qxdataSource: data });
            console.log(this.state.qxdataSource)
        })
        this.videoControl.login().then((rest) => {
            this.setState({ videoobj: this.videoControl });
        })
    }
    //初始化数据
    componentDidMount() {
        this.selectInit()
        window.setInterval(() => {
            this.selectInit()
        }, 1000 * 5 * 60);
    }
    // 选中行
    onClickRow = (record) => {
        return {
            //单击定位
            onClick: () => {
                this.locationClick(record)
            },
            // //双击放大
            // onDoubleClick: () => {
            //     this.playV(record)
            // },
        };
    }
    locationClick(e) {
        let lon = e.lon * 1;
        let lat = e.lat * 1;
        if (lon == null && lat == null) return;
        emitter.emit("map-move", [lon, lat], () => { console.log("moveend"); });
    }
}
export default Precipitation;