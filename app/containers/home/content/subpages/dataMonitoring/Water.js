/**
 * rain 2020-06-7
 * zdl
 * 雨情信息
 */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/home";
import PropTypes from "prop-types";
import {
  Table,
  Input,
  Button,
  Select,
  Tabs,
  Form,
  Row,
  Space,
  Popover,
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import ReadonlyTable from "../readOnlyTable";
// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";
import "echarts";
import moment from "moment";
import { getBasicsAll, getCountStation } from "@app/data/request";
class Water extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: [],
      loading: false,
      searchText: "",
      searchedColumn: "",
      count: 0,
      watercount: [],
    };
  }
  render() {
    console.log("Test this.props.match", this.props.match, this.props.location);
    let { dataSource, loading, watercount, count } = this.state;
    const columns = [
      // {
      //   title: 'id',
      //   dataIndex: 'stcd'
      // },
      {
        title: "站名",
        dataIndex: "name",
        width: 100,
        ellipsis: true,
        className: "column-money",
        key: "riverwaterdataID",
        ...this.getColumnSearchProps("name"),
        // render:
        //   (SpliceSiteName, key) => {
        //     return (
        //       <Popover content={SpliceSiteName} title="站名全称">
        //         {SpliceSiteName.toString().substring(0, 4) + "..."}
        //       </Popover>
        //     )
        //   },
        render: (value) => (value === null ? "-" : value),
      },
      {
        title: "数据来源",
        width: 110,
        dataIndex: "dataSourceDesc",
        ...this.getColumnSearchProps("dataSourceDesc"),
        render: (value) => (value === null ? "-" : value),
      },
      {
        title: "地址",
        ellipsis: true,
        dataIndex: "address",
        // ...this.getColumnSearchProps('address'),
        render: (value) => (value === null ? "-" : value),
      },
      // {
      //   title: '集水面积(k㎡)',
      //   dataIndex: 'areawatercoll',
      //   render: value => value === null ? '-' : value,
      //   sorter: (a, b) => a.areawatercoll - b.areawatercoll,
      // },
      // {
      //   title: '测站监测类型名称',
      //   dataIndex: 'indname',
      //   render: value => value === null ? '-' : value,
      // },
      {
        title: "流域",
        ellipsis: true,
        dataIndex: "flowarea",
        render: (value) => (value === null ? "-" : value),
      },
      // {
      //   title: '至河口距离',
      //   dataIndex: 'distancetoport',
      //   render: value => value === null ? '-' : value,
      //   sorter: (a, b) => a.distancetoport - b.distancetoport,
      // },
      {
        title: "河流名称",
        ellipsis: true,
        width: 110,
        dataIndex: "rivername",
        render: (value) => (value === null ? "-" : value),
      },
      {
        title: "纬度",
        width: 110,
        dataIndex: "lat",
        render: (value) => (value === null ? "-" : value),
      },
      {
        width: 110,
        title: "经度",
        dataIndex: "lon",
        render: (value) => (value === null ? "-" : value),
      },
      {
        title: "水位(m)",
        dataIndex: "z",
        width: 110,
        className: "column-money",
        render: (z) => (z == "-" ? "-" : (z * 1).toFixed(2)),
        sorter: (a, b) => a.z - b.z,
      },
      {
        title: "警戒水位(m)",
        dataIndex: "warning",
        width: 130,
        className: "column-money",
        render: (warning) => (warning == "-" ? "-" : (warning * 1).toFixed(2)),
        sorter: (a, b) => a.warning - b.warning,
      },
      {
        title: "更新时间",
        dataIndex: "ztm",
        width: 160,
        className: "column-money",
        render: (value) =>
          value == null ? "-" : moment(value).format("YYYY-MM-DD HH:mm"),
        sorter: (a, b) => new Date(b.ztm).getTime() - new Date(a.ztm).getTime(),
      },
      {
        title: "更新状态",
        dataIndex: "ztm",
        width: 100,
        className: "column-money",
        render: (value) => {
          let startdata = new Date().getTime();
          let date = new Date(value).getTime();
          if (value == null) {
            return <a style={{ color: "red" }}>离线</a>;
          } else if (startdata - date >= 1000 * 60 * 60 * 24 * 3) {
            return <a style={{ color: "orange" }}>三天前</a>;
          } else {
            return <a>最近更新</a>;
          }
        },
        // value == null ? "-" : moment(value).format("YYYY-MM-DD HH:mm"),
      },
    ];
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
    };
    let element = [];
    for (let i = 0; i < watercount.length; i++) {
      element.push(
        <>
          <a>
            {" "}
            {watercount[i].dataSourceDesc}共计：{watercount[i].number}个
          </a>
          &nbsp;
        </>
      );
    }
    return (
      <div>
        <Row>
          <div className="div-left-echarts">
            <div className="echarts-isOnline" id="waterisOnline"></div>
            <div className="echarts-count" id="watercount"></div>
          </div>
          <div className="div-right-table">
            <Table
              title={() => <>{/* <Demo></Demo> */}</>}
              size="large"
              loading={loading}
              columns={columns}
              dataSource={dataSource}
              rowKey={(row) => row.stcd}
              scroll={{ y: 550 }}
              pagination={pagination}
              // onRow={this.onClickRow}
              // pagination={pagination}
              footer={() => (
                <>
                  <a>水位站共计：{count}个</a>&nbsp;其中：&nbsp;
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
  getColumnSearchProps = (dataIndex) => ({
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
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
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

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  //获取雨量站点来源
  selectRainSource = () => {
    getCountStation({}).then((result) => {
      console.log(result);
      this.setState({
        count: result.data[1].number,
        watercount: result.data[1].list,
      });
      let nameArr = [];
      let data = [];
      for (let i = 0; i < result.data[1].list.length; i++) {
        nameArr.push(
          result.data[1].list[i].dataSourceDesc === null
            ? "暂无数据"
            : result.data[1].list[i].dataSourceDesc
        );
        data.push({
          name:
            result.data[1].list[i].dataSourceDesc === null
              ? "暂无数据"
              : result.data[1].list[i].dataSourceDesc,
          value: result.data[1].list[i].number,
        });
      }
      let myChart = echarts.init(document.getElementById("watercount"));
      myChart.setOption({
        title: {
          text: "水位站点来源统计图",
          // subtext: '纯属虚构',
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          show: true,
          left: "center",
          top: "bottom",
          data: nameArr,
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
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "共计",
            type: "pie",
            radius: "50%",
            center: ["50%", "50%"],
            // roseType: 'area',
            data: data,
            label: {
              formatter: "{b}: {@2012}",
            },
          },
        ],
      });
    });
  };
  //获取雨量站点数据更新状态/查询所有
  selectRainStatus = () => {
    this.setState({ loading: true });
    getBasicsAll({
      type: 2,
    }).then((result) => {
      this.setState({ loading: false, dataSource: result.data });
      let okcount = 0;
      let nocount = 0;
      let thday = 0;
      let startdata = new Date().getTime();
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].ztm === null) {
          nocount++;
        } else if (
          startdata - new Date(result.data[i].ztm).getTime() >=
          1000 * 60 * 60 * 24 * 3
        ) {
          thday++;
        } else {
          okcount++;
        }
      }
      console.log(okcount);
      console.log(nocount);
      console.log(thday);
      let myChartcount = echarts.init(document.getElementById("waterisOnline"));
      myChartcount.setOption({
        title: {
          text: "水位站点在线统计图",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          top: "bottom",
          data: ["最近更新", "三天前", "离线"],
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
            },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            showval: true,
            name: "共计",
            type: "pie",
            radius: "50%",
            center: ["50%", "50%"],
            // roseType: 'area',
            label: {
              formatter: "{b}: {@2012}",
            },
            data: [
              {
                value: okcount,
                name: "最近更新",
              },
              {
                value: thday,
                name: "三天前",
              },
              {
                value: nocount,
                name: "离线",
              },
            ],
          },
        ],
      });
    });
  };
  componentDidMount() {
    this.selectRainStatus();
    this.selectRainSource();
  }
}

// const columns = [
//   {
//     title: "站名",
//     dataIndex: "name",
//     width: 100,
//     ellipsis: true,
//     className: "column-money",
//     key: "riverwaterdataID",
//     render: (value) => (value === null ? "-" : value),
//   },
//   {
//     title: "数据来源",
//     width: 110,
//     dataIndex: "dataSourceDesc",
//     render: (value) => (value === null ? "-" : value),
//   },
//   {
//     title: "地址",
//     ellipsis: true,
//     dataIndex: "address",
//     render: (value) => (value === null ? "-" : value),
//   },
//   {
//     title: "流域",
//     ellipsis: true,
//     dataIndex: "flowarea",
//     render: (value) => (value === null ? "-" : value),
//   },
//   {
//     title: "河流名称",
//     ellipsis: true,
//     width: 110,
//     dataIndex: "rivername",
//     render: (value) => (value === null ? "-" : value),
//   },
//   {
//     title: "纬度",
//     width: 110,
//     dataIndex: "lat",
//     render: (value) => (value === null ? "-" : value),
//   },
//   {
//     width: 110,
//     title: "经度",
//     dataIndex: "lon",
//     render: (value) => (value === null ? "-" : value),
//   },
//   {
//     title: "水位(m)",
//     dataIndex: "z",
//     width: 110,
//     className: "column-money",
//     render: (z) => (z == "-" ? "-" : (z * 1).toFixed(2)),
//     sorter: (a, b) => a.z - b.z,
//   },
//   {
//     title: "警戒水位(m)",
//     dataIndex: "warning",
//     width: 130,
//     className: "column-money",
//     render: (warning) => (warning == "-" ? "-" : (warning * 1).toFixed(2)),
//     sorter: (a, b) => a.warning - b.warning,
//   },
//   {
//     title: "更新时间",
//     dataIndex: "ztm",
//     width: 160,
//     className: "column-money",
//     render: (value) => (value ? moment(value).format("YYYY-MM-DD HH:mm") : "-"),
//     sorter: (a, b) => new Date(b.ztm).getTime() - new Date(a.ztm).getTime(),
//   },
//   {
//     title: "更新状态",
//     dataIndex: "ztm",
//     width: 100,
//     className: "column-money",
//     render: (value) => {
//       let startdata = new Date().getTime();
//       let date = new Date(value).getTime();
//       if (!value) {
//         return <a style={{ color: "red" }}>离线</a>;
//       } else if (startdata - date >= 1000 * 60 * 60 * 24 * 3) {
//         return <a style={{ color: "orange" }}>三天前</a>;
//       } else {
//         return <a>最近更新</a>;
//       }
//     },
//   },
// ];
// const rowSelect = [
//   { label: "站点名称", name: "name", element: <Input></Input> },
// ];
// const Water = (props) => {
//   const { watercount } = props;

//   let element = [];
//   watercount?.list?.map((item) => {
//     element.push(
//       <>
//         <a>
//           {item.dataSourceDesc}共计：{item.number}个
//         </a>
//         &nbsp;
//       </>
//     );
//   });
//   useEffect(() => {
//     console.log(watercount, "WATEr");
//   }, [watercount]);
//   return (
//     <ReadonlyTable
//       getAll
//       get={getBasicsAll}
//       type={{ type: 2 }}
//       columns={columns}
//       rowSelect={rowSelect}
//       rowKey={"siteBaseID"}
//       footer={() => (
//         <>
//           <a>雨量站共计：{watercount?.number}个</a>&nbsp;其中：&nbsp;
//           {/* {element} */}
//         </>
//       )}
//     />
//   );
// };
Water.proptypes = {
  watercount: PropTypes.object,
};
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
export default connect(mapStateToProps, mapDispatchToProps)(Water);
