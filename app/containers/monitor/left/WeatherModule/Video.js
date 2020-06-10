/**
 * Precipitation 2020-05-28
 * zdl
 * 视频站
 */
import React from 'react';
import "../style.scss";
import { Table, Tag, Popover, Modal, Button, Card, Row, Drawer, message } from 'antd';
import VideoComponent from '@app/components/video/VideoComponent';
import VideoControl from '@app/components/video/VideoControl';
import {
    CaretRightOutlined
} from '@ant-design/icons';
import { getRadioAll } from "@app/data/request";
import emitter from "@app/utils/emitter.js";
class Precipitation extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            qydataSource: [],//视频站数据源
            loading: false,//视频站数据源加载
            visible: false,//模态框
            token: "",
            videoobj: null,
            address: ""
        };
        this.videoControl = new VideoControl();
    }

    playV = (value) => {
        if (value.isOnline == '0') {
            this.videoControl.login().then((rest) => {
                this.setState({ videoobj: this.videoControl });
            })
            this.setState({
                visible: true,
                token: value.strtoken,
                address: "摄像头详细地址：" + value.address
            });
        } if (value.isOnline == '1') {
            message.error('视频站点不在线');
        }
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            token: "",
            videoobj: null,
            address: ""
        })
    }
    render() {
        const qycolumns = [
            {
                title: '站名',
                dataIndex: 'sitename',
                className: 'column-money',
                key: 'riverwaterdataID',
            },
            {
                title: '位置',
                dataIndex: 'address',
                className: 'column-money',
                render:
                    address => {
                        return (
                            <Popover content={address} title="视频地址全称">
                                {address.substring(0, 10) + '...'}
                            </Popover>
                        )
                    }
            },
            {
                title: '状态',
                dataIndex: 'isOnline',
                className: 'column-money',
                width: 70,
                render:
                    isOnline => {
                        if (isOnline == 0) {
                            return (
                                <a>在线</a>
                            )
                        } else {
                            return (
                                <a style={{ color: 'red' }}>不在线</a>
                            )
                        }
                    },
            },
            {
                title: '操作',
                dataIndex: 'isOnline',
                width: 50,
                className: 'column-money',
                render:
                    (isOnline, key) => {
                        return (
                            <Button type="primary" shape="circle" icon={<CaretRightOutlined style={{ fontSize: 20 }} />} onClick={() => this.playV(key)} />
                        )
                    },
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
                    rowKey={row => row.radioID}
                    onRow={this.onClickRow}
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
                                left: 2106,
                                top: 1028,
                            }} />
                            : null}
                    </div>
                </Drawer>
            </>
        );
    }
    //初始化数据
    componentDidMount() {
        this.setState({ loading: true });
        getRadioAll({})
            .then((result) => {
                this.setState({ loading: false });
                this.setState({ qydataSource: result.data });
            })
        this.videoControl.login().then((rest) => {
            this.setState({ videoobj: this.videoControl });
        })

    }
    // 选中行
    onClickRow = (record) => {
        return {
            //单击定位
            onClick: () => {
                this.locationClick(record)
            },
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