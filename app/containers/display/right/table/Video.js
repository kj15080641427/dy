/**
 * Water 2020-07-08
 */
import React from 'react';
import './style.scss';
import emitter from "@app/utils/emitter.js";
import moment from 'moment';
import { Pagination, Button, Drawer, message, Modal } from 'antd';
import VideoComponent from '@app/components/video/VideoComponent';
import VideoControl from '@app/components/video/VideoControl';
import Holder from "@app/components/video/Holder"
import {
    CaretRightOutlined,
} from '@ant-design/icons';
class Water extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            address: "",
            visible: false,//模态框
            token: "",
            videoobj: null,
            address: "",
        };
        this.videoControl = new VideoControl();
    }
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
    handleCancel = () => {
        this.setState({
            visible: false,
            token: "",
            videoobj: null,
            address: ""
        })
    }
    render() {
        let data = this.props.dataSource;

        let elements = []
        for (let i = 0; i < data.length; i++) {
            elements.push(
                <tr key={i}>
                    <td style={{ width: 200 }}>{data[i].sitename}</td>
                    {/* <td>{data[i].address}</td> */}
                    <td>{data[i].isOnline == 0 ? "在线" : <a>离线</a>}</td>
                    <td>
                        <Button type="primary" shape="circle" icon={<CaretRightOutlined style={{ fontSize: 20 }} />} onClick={() => this.playV(data[i])} />
                    </td>
                </tr>
            )
        }
        return (
            <div >
                <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                            <tr>
                                <th style={{ width: 200 }}>站名(来源)</th>
                                {/* <th>位置</th> */}
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody style={{ height: 300 }}>
                            {elements}
                        </tbody>
                        {/* <Pagination></Pagination> */}
                    </table>
                </div>
                <Modal
                    title={this.state.address}
                    placement="top"
                    onCancel={this.handleCancel}
                    visible={this.state.visible}
                    width={"50%"}
                    height="80%"
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
                            }} type={this.state.type} />
                            : null}
                    </div>
                    <Holder token={this.state.token}></Holder>
                </Modal>
            </ div>
        );
    }

    componentDidMount() { }
}
export default Water;