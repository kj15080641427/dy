/**
 * Precipitation 2020-05-28
 * zdl
 * 视频站
 */
import React from 'react';
import "../style.scss";
import { Table, Tag, Popover, Modal, Button, Card, Row, Col } from 'antd';
import moment from 'moment';
import { getRadioAll } from "@app/data/request";

class Precipitation extends React.PureComponent {
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
            <>
                <Table className="m-div-table"
                    size="small"
                    loading={loading}
                    columns={qycolumns}
                    dataSource={this.state.qydataSource}
                    scroll={{ y: 300 }}
                    rowKey={row => row.radioID}
                />

            </>
        );
    }
    //初始化数据
    componentDidMount() {
        this.setState({ loading: true });
        getRadioAll({})
            .then((result) => {
                this.setState({ loading: false });
                this.setState({ qydataSource: result.data })
            })
    }
}
export default Precipitation;