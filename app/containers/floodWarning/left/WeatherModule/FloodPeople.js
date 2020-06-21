/**
 * Precipitation 2020-05-30
 * zdl
 * 防汛人员站
 */
import React from 'react';
import "../style.scss";
import { Table, Tag, Popover, Modal, Button, Input, Space, Col } from 'antd';
import moment from 'moment';
import { getfloodUser } from "@app/data/request";
import emitter from "@app/utils/emitter.js";
import { SearchOutlined } from '@ant-design/icons';
import { setTime } from "@app/utils/common";
import Highlighter from 'react-highlight-words';

class FloodPeople extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            qydataSource: [],//防汛人员数据源
            loading: false,//防汛人员数据源加载
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
                title: '姓名',
                dataIndex: 'name',
                className: 'column-money',
                ...this.getColumnSearchProps('name'),
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
                    scroll={{ y: 170 }}
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