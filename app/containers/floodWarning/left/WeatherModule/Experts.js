/**
 * Expert 2020-06-04
 * zdl
 * 专家库
 */
import React from 'react';
import { getFloodControlExpertAll, floodControlExpertCategoryAll } from '@app/data/request';
import { Table, Row, Modal, Input, Button, Select, Form, Radio, DatePicker, Switch } from 'antd';

class Expert extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSource: [],//物资数据源
            loading: false,//物资数据源加载
        };
    }
    render() {
        const { dataSource, loading, } = this.state;

        const columns = [
            {
                title: '区县',
                dataIndex: 'name',
                className: 'column-money',
            },
        ]
        const expandedRowRendertype = (record, index, indent, expanded) => {
            console.log(record)
            const ckcolumns = [
                {
                    title: '姓名',
                    dataIndex: 'name',
                    className: 'column-money',
                },
                {
                    title: '工作单位',
                    dataIndex: 'unit',
                    className: 'column-money',
                    ellipsis: true,
                },
                {
                    title: '专家电话',
                    dataIndex: 'phone',
                    className: 'column-money',
                    ellipsis: true,
                },
            ];
            return <Table
                size="small"
                columns={ckcolumns}
                dataSource={record.list}
                scroll={{ y: 830 }}
                rowKey={row => row.floodControlExpertId}
                onRow={this.onClickRow}
                pagination={{
                    defaultPageSize: 50
                }}
                pagination={{
                    showTotal: () => `共${record.list.length}条`,
                }}
            />
        };
        return (
            <>
                <Table
                    className="m-div-table"
                    expandable={{
                        expandedRowRender: expandedRowRendertype,
                        defaultExpandedRowKeys: ["1"]
                    }}
                    loading={loading}
                    columns={columns}
                    showHeader={false}
                    dataSource={dataSource}
                    scroll={{ y: 420 }}
                    rowKey={row => row.floodControlExpertCategoryId}
                    size="small"

                ></Table>
            </>
        );
    }
    componentDidMount() {
        // getFloodControlExpertAll({}).then((result) => {
        //     console.log(result)
        //     this.setState({ loading: false });
        //     this.setState({ dataSource: result.data })
        // })
        floodControlExpertCategoryAll({}).then((result) => {
            console.log(result)
            this.setState({ loading: false });
            this.setState({ dataSource: result.data })
        })
    }
    
}
export default Expert;