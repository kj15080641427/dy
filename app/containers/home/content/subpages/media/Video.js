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
import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { getRadioAll } from "@app/data/request";
import VideoComponent from '@app/components/video/VideoComponent';
class Video extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            qydataSource: [],//视频站数据源
            loading: false,//视频站数据源加载
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
                dataIndex: 'dataSource',
                className: 'column-money',
            },
        ];
        const { loading } = this.state;
        return (
            <div>
                {/* <div className="head-div">
                </div> */}
                <Row>
                    <Col span={9}>
                        <Table
                            size="large"
                            loading={loading}
                            columns={qycolumns}
                            dataSource={this.state.qydataSource}
                            scroll={{ y: 900 }}
                            rowKey={row => row.radioID}
                        />
                    </Col>
                    <Col span={15}>
                        <Row style={{ height: 250 }}>
                            <Col span={8} >
                                <div style={{ width: '300px', height: '200px' }}>
                                    <iframe src="http://172.19.112.74/video/index.html?sessionId=23eb3508-c976-47a4-a4e6-71478a1be04e&token=device1--84" frameborder="no"
                                        scrolling="no" className="ifvideo"></iframe>
                                </div>
                            </Col>
                        <Col span={8}>2</Col>
                        <Col span={8}>3</Col>
                        </Row>
                    <Row style={{ height: 250 }}>
                        <Col span={8} >
                            1
                            </Col>
                        <Col span={8}>2</Col>
                        <Col span={8}>3</Col>
                    </Row>
                    <Row style={{ height: 250 }}>
                        <Col span={8} >
                            1 {/* <VideoComponent videoControl={videoControl} token={token} style={{ width: 590, height: 380, borderWidth: 0 }} /> */}
                        </Col>
                        <Col span={8}>2</Col>
                        <Col span={8}>3</Col>
                    </Row>
                    </Col>
                </Row>
            </div >
        );
    }
    componentDidMount() {
        this.setState({ loading: true });
        getRadioAll({})
            .then((result) => {
                this.setState({ loading: false });
                this.setState({ qydataSource: result.data })
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