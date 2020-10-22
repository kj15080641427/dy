import React, {Component} from "react";
import RouterList from "../../components/routerLiis";
import "./style.scss";
import Head from "./head/Head";
import Map from './map/map';
import { RenderBox } from "../../components/chart/decorate";
import {Checkbox, Table, DatePicker, Button} from 'antd';
import moment from 'moment';

const TableColumns = [
    {
        title: '模拟日期',
        dataIndex: 'createTime',
        key: 'createTime'
    },
    {
        title: '开始时间',
        dataIndex: 'beginTime',
        key: 'beginTime'
    },
    {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime'
    }
];
export default class FloodModel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let curDate = new moment();
        return (
            <div className="flood-model-display">
                <Map/>
                <div className="flood-noyices-top"/>
                <Head/>
                <RouterList/>
                <div className="m-left">
                    <RenderBox hasTitle title="洪涝预报" style={{height: 600}}>
                        <div className={'m-left-div'}>
                            <span>时间选择：</span><DatePicker showTime={{format: 'HH'}} format={'YYYY-MM-DD HH时'} disabledDate={(selectDate) => selectDate <= curDate } />
                            <Button type="primary">开始</Button>
                        </div>
                        <div className={'m-left-div'}>
                            <Table columns={TableColumns}/>
                        </div>
                    </RenderBox>
                </div>
            </div>
        );
    }
}
