/**
 * Precipitation 2020-06-20
 * zdl
 * 防汛物资
 */
import React from 'react';
import "../style.scss";
import { Table, Tag, Popover, Modal, Button, Input, Space, Col } from 'antd';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';
import { queryMaterial, QueryMaterialWarehouse } from "@app/data/request";
import emitter from "@app/utils/emitter.js";
import { setTime } from "@app/utils/common";
import Highlighter from 'react-highlight-words';

class FloodPeople extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            qydataSource: [],//防汛物资数据源
            loading: false,//防汛物资数据源加载
            dataSource: [],//仓库数据源
            total: 0,
            current: 1,
            pageSize: 10,
            zdDataSource: []
        };
    }
    //检索数据搜索
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`请输入要搜索的内容`}
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
                <Highlighter
                    highlightStyle={{ backgroundColor: 'red', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString().length > 8 ? text.toString().substring(0, 8) + "..." : text.toString()}
                />
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    onExpandOpen = (expanded, record) => {
        console.log(expanded, record)
        queryMaterial({
            "current": 1,
            "size": 10000,
            "materialWarehouseId": record.materialWarehouseId,
        })
            .then((result) => {
                console.log(result)
                let dataSource = { ...this.state.zdDataSource };
                dataSource[record.name] = result.data.records;
                this.setState({
                    zdDataSource: dataSource
                })
            })
    }
    render() {
        const { dataSource, loading, total, current, pageSize } = this.state;
        //分页设置
        let pagination = {
            total: total,
            size: "small",
            current: current,
            // hideOnSinglePage: true,
            showQuickJumper: true,
            showSizeChanger: true,
            onChange: (current) => this.changePage(current),
            pageSize: pageSize,
            onShowSizeChange: (current, pageSize) => {//设置每页显示数据条数，current表示当前页码，pageSize表示每页展示数据条数
                console.log(pageSize);
                this.onShowSizeChange(current, pageSize)
            },
            showTotal: () => `共${total}条`,
        }
        const ckcolumns = [
            {
                title: '仓库名称',
                dataIndex: 'name',
                className: 'column-money',
            },
        ];

        const expandedRowRendertype = (record, index, indent, expanded) => {
            //水位data
            const qycolumns = [
                {
                    title: '名称',
                    dataIndex: 'name',
                    className: 'column-money',
                },
                {
                    title: '数量',
                    dataIndex: 'saveTotal',
                    className: 'column-money',
                },
                {
                    title: '单位',
                    dataIndex: 'company',
                    className: 'column-money',
                },
                {
                    title: '规格',
                    dataIndex: 'spec',
                    className: 'column-money',
                },
            ];
            let source = this.state.zdDataSource[record.name];
            return React.cloneElement(
                <Table
                    // className="m-div-table"
                    size="small"
                    loading={loading}
                    columns={qycolumns}
                    dataSource={source}
                    scroll={{ y: 170 }}
                    rowKey={row => row.floodRanksId}
                    pagination={{
                        showTotal: () => `共${source.length}条`,
                    }}
                />)
        };

        return (
            <>
                {/*  */}
                <Table
                    className="m-div-table"
                    expandable={{
                        expandedRowRender: expandedRowRendertype,
                        onExpand: this.onExpandOpen,
                        rowExpandable: false,
                    }}
                    loading={loading}
                    size="small"
                    columns={ckcolumns}
                    dataSource={dataSource}
                    scroll={{ y: 450 }}
                    rowKey={row => row.materialWarehouseId}
                    pagination={pagination}
                    showHeader={false}
                ></Table>

            </>
        );
    }
    //切换每页数量
    onShowSizeChange(current, pageSize) {
        this.setState({ loading: true });
        QueryMaterialWarehouse({
            "current": current,
            "size": pageSize,
        })
            .then((result) => {
                this.setState({
                    loading: false,
                    dataSource: result.data.records,
                    pageSize: pageSize,
                    total: result.data.total,
                    current: result.data.current,
                })
            })
    }
    // 回调函数，切换下一页
    changePage(current) {
        console.log(current)
        this.setState({ loading: true });
        QueryMaterialWarehouse({
            "current": current,
            "size": this.state.pageSize,
        })
            .then((result) => {
                this.setState({
                    loading: false,
                    dataSource: result.data.records,
                    pageSize: result.data.pageSize,
                    total: result.data.total,
                    current: result.data.current,
                })
            })
    }
    selectPage() {
        this.setState({
            loading: true
        })
        QueryMaterialWarehouse({
            "current": this.state.current,
            "size": this.state.pageSize,
        }).then((result) => {
            console.log(result)
            this.setState({
                loading: false,
                dataSource: result.data.records,
                total: result.data.total,
                current: result.data.current
            })
        })
    }
    // selectInit() {
    //     this.setState({ loading: true });
    //     getWarehouseMt({
    //         "materialWarehouseId": "32"
    //     })
    //         .then((result) => {
    //             this.setState({ loading: false });
    //             this.setState({ qydataSource: result.data })
    //         })
    // }
    //初始化数据
    componentDidMount() {
        this.selectPage()
        window.setInterval(() => {
            this.selectPage()
        }, 1000 * 5 * 60)
    }
}
export default FloodPeople;