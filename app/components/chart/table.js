import React from "react";
import { Input, Space, Button, Popover, Table } from "antd";
import "../style.scss";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
const { Column } = Table;
export class TableShow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      qydataSource: [], //水位数据源
      loading: false, //水位数据源加载
      total: 0, //水位数据源总数页
      current: 1, //水位数据源开始页
      pageSize: 10, //水位数据源单页条数
      swdataSourceById: [], //单个站点水位数据源
      visible: false, //模态框
      mloading: false, //模态框表格加载动画
      searchText: "",
      searchedColumn: "",
    };
  }
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  //检索数据搜索
  getColumnSearchProps = (dataIndex, number) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`请输入要搜索的站名`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
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
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            关闭
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Popover content={text.toString()} title="站名全称">
        <Highlighter
          highlightStyle={{ backgroundColor: "red", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={
            text.toString().length > number
              ? text.toString().substring(0, number) + "..."
              : text.toString()
          }
        />
      </Popover>
    ),
  });
  render() {
    const {
      columns,
      dataSource,
      onRow,
      pageSize,
      rowKey,
      number,
      locale,
      scroll,
      showHeader = true,
    } = this.props;

    return (
      <Table
        showHeader={showHeader}
        scroll={scroll}
        locale={locale}
        size="small"
        dataSource={dataSource}
        className="set-table-style"
        rowKey={rowKey}
        pagination={{
          pageSize: pageSize || 4,
          showSizeChanger: false,
          hideOnSinglePage: true,
        }}
        onRow={onRow}
        // height={'100px'}
      >
        {columns.map((item) => {
          return item.filter ? (
            <Column
              title={item.name}
              dataIndex={item.dataIndex}
              key={item.dataIndex}
              className="table-background"
              width={item.width}
              sorter={item.sorter}
              align={item.align}
              {...this.getColumnSearchProps(item.filter, number)}
              render={item.render}
            />
          ) : (
            <Column
              title={item.name}
              dataIndex={item.dataIndex}
              key={item.dataIndex}
              className="table-background"
              render={item.render}
              width={item.width}
              align={item.align}
              sorter={item.sorter}
            />
          );
        })}
      </Table>
    );
  }
}
