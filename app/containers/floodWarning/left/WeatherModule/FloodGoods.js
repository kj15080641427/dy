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
import { getWarehouseMt } from "@app/data/request";
import emitter from "@app/utils/emitter.js";
import { setTime } from "@app/utils/common";
import Highlighter from 'react-highlight-words';

class FloodPeople extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            qydataSource: [],//防汛物资数据源
            loading: false,//防汛物资数据源加载
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
    render() {
        const qycolumns = [
            {
                title: '名称',
                dataIndex: 'name',
                className: 'column-money',
                ...this.getColumnSearchProps('name'),
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
        const { loading } = this.state;
        return (
            <>
                <Table className="m-div-table"
                    size="small"
                    loading={loading}
                    columns={qycolumns}
                    dataSource={this.state.qydataSource}
                    scroll={{ y: 170 }}
                    rowKey={row => row.floodId}
                />

            </>
        );
    }
    selectInit() {
        this.setState({ loading: true });
        getWarehouseMt({
            "materialWarehouseId": "32"
        })
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