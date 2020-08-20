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
import './style.scss';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts';
import { getAllVideo, getCountRadio } from '@app/data/request';
class Water extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: [],
      loading: false,
      searchText: '',
      searchedColumn: '',
      count: 0,
      vodeocount: [],
    };
  }
  render() {
    console.log("Test this.props.match", this.props.match, this.props.location);
    let { dataSource, loading, count, vodeocount } = this.state;
    const columns = [
      // {
      //   title: 'id',
      //   dataIndex: 'radioID'
      // },
      {
        title: '站点名称',
        dataIndex: 'sitename',
        className: 'column-money',
        width: 200,
        ellipsis: true,
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
        width: 650,
        ellipsis: true,
        ...this.getColumnSearchProps('address'),
        render: value => value === null ? '-' : value,
      },
      // {
      //   title: '端口IP地址',
      //   dataIndex: 'strurl',
      //   // ...this.getColumnSearchProps('address'),
      //   render: value => value === null ? '-' : value,
      // },
      // {
      //   title: 'strtoken值',
      //   dataIndex: 'strtoken',
      //   render: value => value === null ? '-' : value,
      // },
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
      {
        title: '状态',
        dataIndex: 'isOnline',
        className: 'column-money',
        render:
          isOnline => {
            if (isOnline === '0') {
              return (
                <a>在线</a>
              )
            } else {
              return (
                <a style={{ color: 'red' }}>离线</a>
              )
            }
          },
        sorter: (a, b) => parseInt(+a.isOnline) - parseInt(+b.isOnline),
        //   console.log(parseInt(+a.isOnline),parseInt(+b.isOnline))
        // },
        defaultSortOrder: 'ascend'
      },
    ]
    let element = []
    for (let i = 0; i < vodeocount.length; i++) {
      element.push(
        <>
          < a key={i}> {vodeocount[i].dataSourceDesc}共计：{vodeocount[i].number}个</a >&nbsp;
        </>
      )

    }
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
      <div>
        <Row>
          <div className="div-left-echarts">
            <div className="echarts-isOnline" id="vodeoisOnline"></div>
            <div className="echarts-count" id="vodeocount"></div>
          </div>
          <div className="div-right-table">
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
              rowKey={row => row.radioID}
              scroll={{ y: 550 }}
              pagination={pagination}
              // onRow={this.onClickRow}
              // pagination={pagination} 
              footer={() => (
                <>
                  <a>视频站点共计：{count}个</a>
                  {element}
                </>
              )}

            />
          </div>
        </Row>
      </div>
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
      "isShow": 1
    })
      .then((result) => {
        console.log('视频站点',result)
        this.setState({ loading: false });
        this.setState({ dataSource: result.data })
        // this.setState({ searchedColumn: resultdata. })
        let okcount = 0;
        let nocount = 0
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].isOnline === "0") {
            okcount++;
          } else {
            nocount++
          }
        }
        console.log(okcount)
        console.log(nocount)
        var myChartcount = echarts.init(document.getElementById("vodeoisOnline"));
        myChartcount.setOption({
          title: {
            text: '视频站点在线统计图',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            top: 'bottom',
            data: ["在线", "离线"]
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: {
                show: true,
                type: ['pie', 'funnel']
              },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          series: [
            {
              showval: true,
              name: '共计',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              // roseType: 'area',
              label: {
                formatter: '{b}: {@2012}'
              },
              data: [
                {
                  value: okcount,
                  name: '在线',
                }, {
                  value: nocount,
                  name: '离线',
                }
              ],
            }
          ]
        })
      })
    getCountRadio({}).then((result) => {
      console.log(result)
      this.setState({
        count: result.data.number,
        vodeocount: result.data.list
      })
      let nameArr = [];
      let data = [];
      for (let i = 0; i < result.data.list.length; i++) {
        nameArr.push(result.data.list[i].dataSourceDesc === null ? "暂无数据" : result.data.list[i].dataSourceDesc)
        data.push({
          'name': result.data.list[i].dataSourceDesc === null ? "暂无数据" : result.data.list[i].dataSourceDesc,
          'value': result.data.list[i].number
        })
      }
      var myChart = echarts.init(document.getElementById("vodeocount"));
      myChart.setOption({
        title: {
          text: '视频站点来源统计图',
          // subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          show: true,
          left: 'center',
          top: 'bottom',
          data: nameArr
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              // type: ['pie', 'funnel']
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '共计',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            // roseType: 'area',
            data: data,
            label: {
              formatter: '{b}: {@2012}'
            }
          }
        ]
      })
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