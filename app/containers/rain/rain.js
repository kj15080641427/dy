/**
 * Monitor 2020-05-12
 */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/rain";
import * as mapActions from "@app/redux/actions/map";
import Map from "./map/map";
import "./style.scss";
import Head from "./head/Head";
import WeatherChart from "./left/WeatherChart";
// import WeatherTable from "./left/WeatherTable";
// import WeatherDy from "./right/WeatherDy";
import CheckBoxs from "../monitor/bottom/CheckBox";
import { Drawer, Row, Divider, Checkbox } from "antd";
import SetTitle from "@app/components/setting/SetTitle";

import RouterList from "../../components/routerLiis";
import { RenderBox } from "../../components/chart/decorate";
import { rotateBarChart, pieChart } from "../../components/chart/chart";
import { TableShow } from "../../components/chart/table";
class Monitor extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showLeft: true,
      showRight: true,
      visible: false,
      dispalyLeft: "block",
      displayRight: "block",
      layerVisible: {
        tiandi: true, // 天地图底图
        tiandi2: true, // 天地图标注
        wfsRiver: false, // wfs河道图
        river40: false, //40条河图片 用于解决河道标注很多的问题
        flood: false, // 洪水图层
        river: true, // 水系图
        heatmap: true, // 热力图
        traffic: false, // 交通图层
        person: false, // 防汛人员
        video: false, // 视频站点
        rain: true, // 雨量站
        water: false, // 水位站
        gate: false, // 水闸
        pump: false, // 水泵
        ponding: false, // 积水
        warehouse: false, //物资仓库
      },
    };
    this.onChecked = this.onChecked.bind(this);
  }
  //设置抽屉页
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    let { layerVisible, displayRight, displayLeft } = this.state;
    const { tableList } = this.props;
    return (
      <div className="monitor">
        <Map layerVisible={layerVisible} />
        <Head />
        <div className="rain">
          <div style={{ display: displayLeft }}>
            <div className="m-left">
              {/* <RenderBox hasTitle title="24小时降雨量"> */}
              {/* <WeatherDy /> */}
              <div className="chart-left">
                <WeatherChart />
                <RenderBox hasTitle title="基本统计信息" width="514">
                  <div className="rain-pie-chart" id="rain-pie-chart"/>
                  {/* <TableShow
                  columns={[
                    { name: "站点名称", dataIndex: "name" },
                    { name: "所属区县", dataIndex: "stlc" },
                    { name: "降雨量", dataIndex: "drp" },
                  ]}
                  dataSource={stations || []}
                /> */}
                </RenderBox>
              </div>
              {/* <WeatherTable /> */}
              {/* </RenderBox> */}
            </div>
          </div>
          <div style={{ display: displayRight }}>
            <div className="chart-right">
              <RenderBox hasTitle title="24小时降雨量">
                <div className="rotateBarChart" id="rotateBarChart"/>
                <div className="rain-set-table">
                  <TableShow
                    columns={[
                      { name: "站点名称", dataIndex: "name" },
                      { name: "所属区县", dataIndex: "stlc" },
                      { name: "降雨量", dataIndex: "dayDrp" },
                    ]}
                    dataSource={tableList || []}
                  />
                </div>
              </RenderBox>
            </div>
            <div className="router-list">
              <RouterList />
            </div>
          </div>
          <div className="m-rain-button">
            {/* <RainSwitcher //切换雨晴数据
            style={{ width: 150 }}
            onClick={this.onRainSwitch.bind(this)}
          /> */}
          </div>
          <div className="m-bottom">{/* <RainLegend /> 图例*/}</div>
          <Drawer
            title={<SetTitle></SetTitle>}
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
            width={320}
          >
            <a
              style={{ fontSize: 18, color: "#000000fd", fontWeight: "bold " }}
            >
              主界面
            </a>
            <Divider />
            <Row>
              <div>
                <Checkbox
                  checked={this.state.showLeft}
                  onClick={() => {
                    this.setState({
                      showLeft: !this.state.showLeft,
                      displayLeft: this.state.showLeft ? "none" : "block",
                    });
                  }}
                  defaultChecked
                />
                &nbsp;&nbsp;
                <a style={{ fontSize: 15, color: "#000000fd" }}>左侧栏</a>
              </div>
            </Row>
            <br />
            <Row>
              <div>
                <Checkbox
                  checked={this.state.showRight}
                  onClick={() => {
                    this.setState({
                      showRight: !this.state.showRight,
                      displayRight: this.state.showRight ? "none" : "block",
                    });
                  }}
                  defaultChecked
                />
                &nbsp;&nbsp;
                <a style={{ fontSize: 15, color: "#000000fd" }}>右侧栏</a>
              </div>
            </Row>

            {/* <br /> */}
            {/* <Row>
            <Switch checkedChildren="开" unCheckedChildren="关" checked={this.state.showBottom} onClick={() => {
              this.setState({
                showBottom: !this.state.showBottom,
                displayBottom: this.state.showBottom ? 'none' : 'block'
              });
            }} defaultChecked />下栏目
          </Row> */}
            <CheckBoxs
              layerVisible={layerVisible}
              onChecked={this.onChecked}
            />
          </Drawer>
        </div>
      </div>
    );
  }
  componentDidUpdate() {
    const { count, stations } = this.props;
    if (count) {
      let data = [];
      count?.raincount?.list?.map((item) => {
        const desc = item.dataSourceDesc;
        data.push({
          name: desc || "暂无数据",
          value: item.number,
          textStyle: { fontSize: "24px" },
          itemStyle: {
            color:
              desc === "气象局"
                ? "rgb(145,151,222)"
                : desc === "基层防汛"
                ? "rgb(78,82,232)"
                : desc === "河口区水利局"
                ? "red"
                : desc === "经开区"
                ? "rgb(29,37,182)"
                : "rgb(78,32,232)",
          },
        });
      });
      pieChart("rain-pie-chart", data, 500);
    }
    if (stations) {
      let noRain = 0;
      let small = 0;
      let c = 0;
      let d = 0;
      let e = 0;
      let f = 0;
      let g = 0;
      let h = 0;
      stations.map((item) => {
        // console.log(item.dayDrp);
        if (item.dayDrp == 0) {
          noRain++;
          return;
        }
        if (item.dayDrp < 10) {
          small++;
          return;
        }
        if (item.dayDrp < 25) {
          c++;
          return;
        }
        if (item.dayDrp < 50) {
          d++;
          return;
        }
        if (item.dayDrp < 100) {
          e++;
          return;
        }
        if (item.dayDrp < 250) {
          f++;
          return;
        }
        if (item.dayDrp > 250) {
          g++;
          return;
        }
        // noRain.push({
        //   value: item.drp,
        // });
      });
      console.log(noRain, small, "???");
      let list = [
        { value: noRain, itemStyle: { color: "rgb(229,229,229)" } },
        { value: small, itemStyle: { color: "rgb(175,233,159)" } },
        { value: c, itemStyle: { color: "rgb(91,175,51)" } },
        { value: d, itemStyle: { color: "rgb(121,190,255)" } },
        { value: e, itemStyle: { color: "rgb(57,53,255)" } },
        { value: f, itemStyle: { color: "rgb(228,41,255)" } },
        { value: g, itemStyle: { color: "rgb(123,42,51)" } },
        { value: h, itemStyle: { color: "rgb(228,41,50)" } },
      ];
      rotateBarChart("rotateBarChart", list);
    }
  }
  componentDidMount() {
    //this.props.actions.rainCurrent();
    //加载雨量站基础信息

    this.props.actions.getAllRainStation();
    this.props.actions.rainCurrent();
    this.props.mapActions.getCountStation();

    // this.props.mapActions.getWaterType();
  }
  onChecked(layerKey, checked) {
    let { layerVisible } = this.state;
    if (layerVisible[layerKey] === checked) return;
    layerVisible[layerKey] = checked;
    this.setState({
      layerVisible: { ...layerVisible },
    });
  }

  /**
   * 切换雨量事件
   * @param item
   */
  onRainSwitch(item) {
    switch (item.index) {
      case 0:
        this.props.actions.rainCurrent();
        break;
      case 1:
        this.props.actions.rain1Hour();
        break;
      case 2:
        this.props.actions.rain3Hours();
        break;
      case 3:
        this.props.actions.rain12Hours();
        break;
      case 4:
        this.props.actions.rain24Hours();
        break;
      default:
        return 1;
    }
    // renturn null
  }
}
// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
  console.log(state, "STATE");
  return {
    tableList: state.rain.tableList,
    stations: state.rain.stations,
    count: state.mapAboutReducers.count,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    mapActions: bindActionCreators(mapActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
