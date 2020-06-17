/**
 * rain 2020-06-7
 * zdl
 * 雨情信息
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@app/redux/actions/home';
import { Table, Input, Button, Select, Tabs, Form, Row, Space, Popover } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getAllVideo } from '@app/data/request';
class Water extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: [],
      loading: false,
      searchText: '',
      searchedColumn: '',
    };
  }
  render() {
    const Demo = () => {
      const [form] = Form.useForm();
      const onFinish = values => {
        console.log(values);
      };

      const onReset = () => {
        form.resetFields();
      };
      return (
        <Form layout="inline" form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="note"
            label="站名"
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit"
              icon={<SearchOutlined />}>
              查询
          </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
          </Button>
          </Form.Item>
        </Form>
      )
    }
    console.log("Test this.props.match", this.props.match, this.props.location);
    let { dataSource, loading } = this.state;
    const columns = [
      {
        title: '站点名称',
        dataIndex: 'sitename',
        width: 80,
        className: 'column-money',
        key: 'riverwaterdataID',
        ...this.getColumnSearchProps('sitename'),
        // render:
        //   (SpliceSiteName, key) => {
        //     return (
        //       <Popover content={SpliceSiteName} title="站名全称">
        //         {SpliceSiteName.toString().substring(0, 4) + "..."}
        //       </Popover>
        //     )
        //   },
        render: value => value === null ? '-' : value,
      },
      {
        title: '地址',
        dataIndex: 'address',
        ...this.getColumnSearchProps('address'),
        render: value => value === null ? '-' : value,
      },
      {
        title: '端口IP地址',
        dataIndex: 'strurl',
        // ...this.getColumnSearchProps('address'),
        render: value => value === null ? '-' : value,
      },
      {
        title: 'strtoken值',
        dataIndex: 'strtoken',
        render: value => value === null ? '-' : value,
      },
      {
        title: '纬度',
        dataIndex: 'lat',
        render: value => value === null ? '-' : value,
      },
      {
        title: '经度',
        dataIndex: 'lon',
        render: value => value === null ? '-' : value,
      },
    ]
    //分页设置
    let pagination = {
      // total: total,
      size: "default",
      // current: current,
      hideOnSinglePage: true,
      showQuickJumper: true,
      showSizeChanger: true,
      // onChange: (current) => this.changePage(current),
      // pageSize: pageSize,
      // onShowSizeChange: (current, pageSize) => {//设置每页显示数据条数，current表示当前页码，pageSize表示每页展示数据条数
      //   console.log(pageSize);
      //   this.onShowSizeChange(current, pageSize)
      // },
      // showTotal: () => `雨量站共计：184个雨量站已流入数据站点：158个有站点从未流入数据：26个其中水文局和基础防汛占多数  气象局占少数`,
    }
    return (
      <>

        <Table
          title={() => (
            <>
              {/* <Demo></Demo> */}
            </>
          )}
          size="large"
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey={row => row.stcd}
          scroll={{ y: 550 }}
          pagination={pagination}
          // onRow={this.onClickRow}
          // pagination={pagination} 
          footer={() => (
            <>
              <a>雨量站共计：184个</a>
              <a>雨量站已流入数据站点：158个</a>
              <a>有站点从未流入数据：26个</a>
              <a>其中水文局和基础防汛占多数  气象局占少数</a>
            </>
          )}

        />

      </>
    );
  }
  //检索数据搜索
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`请输入要搜索的站名`}
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
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
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
  componentDidMount() {
    this.setState({ loading: true });
    getAllVideo({
    })
      .then((result) => {
        console.log(result)
        this.setState({ loading: false });
        this.setState({ dataSource: result.data })
        // this.setState({ searchedColumn: resultdata. })
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
)(Water);