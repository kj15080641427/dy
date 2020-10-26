import React, {Component} from "react";
import {connect} from 'react-redux';
import RouterList from "../../components/routerLiis";
import * as actions from '../../redux/actions/floodModel';
import "./style.scss";
import Head from "./head/Head";
import Map from './map/map';
import { RenderBox } from "../../components/chart/decorate";
import {Table, DatePicker, Button, Divider, Modal, Spin, message} from 'antd';
import ReactEcharts from 'echarts-for-react';

import moment from 'moment';

class FloodModel extends Component {
    constructor(props) {
        super(props);

        this.TableColumns = [
            {
                title: '',
                render: (text, record) => {
                    const {model} = this.props;
                    if (record.modelPredictionId === model.selectedPredictionId) {
                        return (<span style={{color: 'green'}}>{'✔'}</span>);
                    }

                    return (<></>);
                },
                width: 40
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                width: 140
            },
            {
                title: '开始时间',
                dataIndex: 'beginTime',
                key: 'beginTime',
                render: (text, record) => {
                    return (
                        <span>{moment(record.beginTime).format('YYYY-MM-DD HH点')}</span>
                    );
                }
            },
            // {
            //     title: '结束时间',
            //     dataIndex: 'endTime',
            //     key: 'endTime',
            //     render: (text, record) => {
            //         return (
            //             <span>{moment(record.endTime).format('YYYY-MM-DD HH点')}</span>
            //         );
            //     }
            // },
            {
                title: ' ',
                render: (text, record) => {
                    return (
                        <Button
                            type={'link'}
                            size={'small'}
                            onClick={
                                this.onViewPrediction.bind(this, record.modelPredictionId)
                            }>
                            {'选择'}
                        </Button>
                    );
                }
            }
        ];

        this.state = {
            modalVisible: false,
            selectedSite: {},
            loading: false,
        };
    }

    render() {
        let curDate = new moment();
        let dataSource = [...this.props.model.predictions];

        return (
            <div className="flood-model-display">
                <Map layerVisible={{water: true}} onFeatureClick={this.onFeatureClick.bind(this)}/>
                <div className="flood-noyices-top"/>
                <Head/>
                <RouterList/>
                <div className="m-left">
                    <Spin spinning={this.props.model.loading}>
                        <RenderBox hasTitle title="洪涝预报" style={{height: 420}}>
                            <div className={'m-left-div'}>
                                <Spin spinning={this.props.model.modelIsRunning} tip={'处理中...'} size={'small'}>
                                    <div style={{paddingBottom: 20}}>
                                        <Divider style={{color: 'gray'}}>实时预报</Divider>
                                        <span>时间选择：</span>
                                        <DatePicker
                                            showTime={{format: 'HH'}}
                                            format={'YYYY-MM-DD HH时'}
                                            defaultValue={moment()}
                                            disabledDate={(selectDate) => selectDate <= curDate}/>
                                        <Button type="primary" onClick={this.onRunModel.bind(this)}>开始</Button>
                                    </div>
                                </Spin>

                            </div>
                            <div className={'m-left-div'}>
                                <Divider style={{color: 'gray'}}>预报列表</Divider>
                                <div>

                                    <Table
                                        columns={this.TableColumns}
                                        dataSource={dataSource}
                                        size={'small'}
                                        pagination={{pageSize: 3}}
                                    />
                                </div>
                            </div>
                        </RenderBox>
                    </Spin>
                </div>

                <Modal
                    visible={this.state.modalVisible}
                    title={'详情'}
                    onCancel={() => this.setState({modalVisible: false})}
                    style={{width: 1000}}
                    footer={null}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div>
                            <span style={{fontSize: 16}}>{this.getSiteDescription('name')}</span>
                        </div>
                        <div style={{width: 500, height: 300}} id={'charts'}>
                            <ReactEcharts style={{width: '100%', height: '100%'}} option={this.getOptions()}/>
                        </div>
                    </div>
                </Modal>
            </div>

        );
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(actions.queryModelNodesAction());
        dispatch(actions.queryPredictions());

        this.timer = setInterval(() => {
            dispatch(actions.queryModelState());
        }, 30000);

        dispatch(actions.queryModelState());
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    onViewPrediction(predictionId) {
        const {dispatch} = this.props;
        dispatch(actions.selectPrediction(predictionId));
        this.setState({loading: true});
    }

    onRunModel() {
        const {dispatch} = this.props;
        dispatch(actions.runModel());
    }

    onFeatureClick(param) {
        const {selectedPredictionId} = this.props.model;

        if (selectedPredictionId === -1) {
            message.info('请在列表中选择需要查看的预报');
            return;
        }

        this.setState({modalVisible: true, selectedSite: param});
        console.log(param);
    }

    getSiteDescription(name) {
        if (this.state.selectedSite && this.state.selectedSite.hasOwnProperty(name)) {
            return this.state.selectedSite[name];
        }

        return '';
    }

    getOptions() {

        const {result} = this.props.model;
        let selectedNodeId = this.state.selectedSite.siteNodeId;
        let xData = [];
        let values = [];

        if (selectedNodeId && result[selectedNodeId]) {
            let dataList = result[selectedNodeId];
            dataList.forEach(item => {
                let time = moment(item.endTime);
                xData.push(time.format('MM-DD HH:00'));
                values.push(item.predValue ? item.predValue : 0);
            });
        }

        let option = {
            xAxis: {
                type: 'category',
                //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                data: xData
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: values,
                type: 'line'
            }]
        };

        return option;
    }
}

function mapStateToProps(state) {
    return {
        model: state.floodModel,
    };
}

export default connect(mapStateToProps)(FloodModel);
