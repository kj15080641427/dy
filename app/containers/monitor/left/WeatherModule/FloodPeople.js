/**
 * Precipitation 2020-05-30
 * zdl
 * 防汛人员站
 */
import React from 'react';
import "../style.scss";
import { Table, Tag, Popover, Modal, Button, Card, Row, Col } from 'antd';
import moment from 'moment';
import { getfloodUser } from "@app/data/request";
import emitter from "@app/utils/emitter.js";
import { setTime } from "@app/utils/common"

class FloodPeople extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            qydataSource: [],//防汛人员数据源
            loading: false,//防汛人员数据源加载
        };
    }
    render() {
        const qycolumns = [
            {
                title: '姓名',
                dataIndex: 'name',
                className: 'column-money',
            },
            {
                title: '单位',
                dataIndex: 'unit',
                className: 'column-money',
            },
            {
                title: '联系电话',
                dataIndex: 'phone',
                className: 'column-money',
            },
            {
                title: '备注',
                dataIndex: 'remark',
                className: 'column-money',
            },
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
                    rowKey={row => row.floodId}
                />

            </>
        );
    }
    selectInit() {
        this.setState({ loading: true });
        getfloodUser({})
            .then((result) => {
                this.setState({ loading: false });
                this.setState({ qydataSource: result.data })
            })
    }
    //初始化数据
    componentDidMount() {
        this.selectInit()
        window.setInterval(() => {
            this.selectInit()
        }, 1000 * 5 * 60)
    }
}
export default FloodPeople;