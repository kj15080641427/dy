/**
 * Test2 2020-05-29
 * zdl
 * 视频站点
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './media.scss'
import * as actions from '@app/redux/actions/home';
import { Row, Col, DatePicker, Select, Button, Space, Table, Popover } from 'antd';
import { VideoCameraAddOutlined, UploadOutlined } from '@ant-design/icons';
import { getRadioAll } from "@app/data/request";
import VideoControl from '@app/components/video/VideoControl';
import VideoComponent from '@app/components/video/VideoComponent';
class Video extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            qydataSource: [],//视频站数据源
            loading: false,//视频站数据源加载
            token: "",
            videoobj: null,
        };
        this.videoControl = new VideoControl();
    }
    // 选中行
    // elements = []
    addVideo = (record) => {
        console.log(record)
        this.videoControl.login().then((rest) => {
            // this.setState({ videoobj: this.videoControl });
            console.log(this.state.videoobj)

        })
        return {
        };
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
                title: '操作',
                dataIndex: 'strtoken',
                key: 'riverwaterdataID',
                width: 60,
                render: (strtoken) => {
                    return (
                        <Button icon={<VideoCameraAddOutlined />} onClick={() => this.addVideo(strtoken)}></Button>
                    )
                },
            }
        ];
        const pagination = {
            simple: true
        }

        const { loading } = this.state;
        const elements = [];
        this.videoControl.login().then((rest) => {
            this.setState({ videoobj: this.videoControl });
            console.log(this.state.videoobj)
            console.log(this.state.qydataSource)
            for (var i = 0; i < this.state.qydataSource.length; i++) {
                console.log(this.state.qydataSource[i].strtoken)
                elements.push(
                    <Col span={6}><div className="gutter-box">
                        <VideoComponent videoControl={this.state.videoobj} token={this.state.qydataSource[i].strtoken} style={{
                            position: 'absolute',
                            transform: 'scale(0.8)',
                            left: -272,
                            top: -96,
                            width: 1920,
                            height: 920,
                            frameborder: 0,
                            scrolling: "no"
                        }} />
                        {/* <iframe src="http://172.19.112.74/video/index.html?sessionId=23eb3508-c976-47a4-a4e6-71478a1be04e&token=device1--84" id="iframe-shrink"
                            width="1920px" height="920px" frameborder="0"
                            scrolling="no"
                            style={{
                                position: 'absolute',
                                transform: 'scale(0.8)',
                                left: -272,
                                top: -96,
                            }}></iframe> */}
                    </div>
                    </Col >
                )

            }
        })
        return (
            <div>
                <Row>
                    <Col span={4}>
                        <Table
                            size="large"
                            loading={loading}
                            columns={qycolumns}
                            dataSource={this.state.qydataSource}
                            scroll={{ y: 900 }}
                            pagination={pagination}
                            rowKey={row => row.radioID}
                            onRow={this.onClickRow}
                        />
                    </Col>
                    <Col span={20}>
                        <Row style={{ height: 250 }}>
                            
                            <Col span={6}><div className="gutter-box">
                                <iframe src="http://172.19.112.74/video/index.html?sessionId=23eb3508-c976-47a4-a4e6-71478a1be04e&token=device1--84" id="iframe-shrink"
                                    width="1920px" height="920px" frameborder="0"
                                    scrolling="no"
                                    style={{
                                        position: 'absolute',
                                        transform: 'scale(0.8)',
                                        left: -272,
                                        top: -96,
                                    }}></iframe>
                            </div></Col>
                            {elements}
                            <Col span={6}><div className="gutter-box"></div></Col>
                            <Col span={6}><div className="gutter-box"></div></Col>
                            < Col span={6}><div className="gutter-box">4</div></Col>
                        </Row>
                        <br></br>
                        <Row style={{ height: 250 }}>
                            <Col span={6}><div className="gutter-box">1</div></Col>
                            <Col span={6}><div className="gutter-box">2</div></Col>
                            <Col span={6}><div className="gutter-box">3</div></Col>
                            <Col span={6}><div className="gutter-box">4</div></Col>
                        </Row>
                        <br></br>
                        <Row style={{ height: 250 }}>
                            <Col span={6}><div className="gutter-box">1</div></Col>
                            <Col span={6}><div className="gutter-box">2</div></Col>
                            <Col span={6}><div className="gutter-box">3</div></Col>
                            <Col span={6}><div className="gutter-box">4</div></Col>
                        </Row>
                    </Col>
                </Row>
            </div >
        );
    }
    componentDidMount() {
        this.setState({ loading: true });


        this.videoControl.login().then((rest) => {
            this.setState({ videoobj: this.videoControl });
            console.log(this.state.videoobj)
        })
        getRadioAll({})
            .then((result) => {
                this.setState({ loading: false });
                this.setState({ qydataSource: result.data })
                console.log(result)
            })
    }
}
function mapStateToProps(state) {
    return {
        test: state.home.test,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Video);