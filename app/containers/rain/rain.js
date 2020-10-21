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
import CheckBoxs from "../monitor/bottom/CheckBox";
import { Drawer, Row, Divider, Checkbox, Tabs } from "antd";
import SetTitle from "@app/components/setting/SetTitle";
import setImg from "@app/resource/setsys.png";
import RouterList from "../../components/routerLiis";
import { RenderBox } from "../../components/chart/decorate";
import { TableShow } from "../../components/chart/table";
import emitter from "@app/utils/emitter.js";
import {
  rotateBarChart,
  pieChart,
  barChart,
} from "../../components/chart/chart";
import WeatherTable from "./left/WeatherTable";
import RainSwitcher from "./right/Module/RainSwitcher";
import RainInfo from "./tabs";
const { TabPane } = Tabs;
class Monitor extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      numberList: {},
      tabsList: {
        all: [],
        gr: [],
        kl: [],
        dy: [],
        lj: [],
        hk: [],
      },
      showLeft: true,
      showRight: true,
      visible: false,
      dispalyLeft: "block",
      displayRight: "block",
      layerVisible: {
        tiandi: true, // 天地图底图
        tiandi2: true, // 天地图标注
        wfsRiver: false, // wfs河道图
        river40: true, //40条河图片 用于解决河道标注很多的问题
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
    let {
      layerVisible,
      displayRight,
      displayLeft,
      numberList,
      tabsList,
    } = this.state;
    const { rain } = this.props;

    return (
      <div className="rain-display">
        <Map layerVisible={layerVisible} />
        <Head />
        <div style={{ display: displayLeft }}>
          <div className="m-left">
            <div className="chart-left">
              <WeatherChart />
              <RenderBox hasTitle title="基本统计信息" width="514">
                <div className="pie-title-flex">
                  <div>
                    <label className="number-color">{rain?.length || 0}</label>
                    <label>东营市</label>
                  </div>
                  <div>
                    <label className="number-color">{numberList?.gr}</label>
                    <label>广饶县</label>
                  </div>
                  <div>
                    <label className="number-color">{numberList?.lj}</label>
                    <label>利津县</label>
                  </div>
                  <div>
                    <label className="number-color">{numberList?.kl}</label>
                    <label>垦利县</label>
                  </div>
                  <div>
                    <label className="number-color">{numberList?.hk}</label>
                    <label>河口区</label>
                  </div>
                  <div>
                    <label className="number-color">{numberList?.dy}</label>
                    <label>东营区</label>
                  </div>
                </div>
                <div className="rain-pie-chart" id="rain-pie-chart" />
              </RenderBox>
            </div>

            {/* </RenderBox> */}
          </div>
        </div>
        <div style={{ display: displayRight }}>
          <div className="rain-chart-right">
            <div className="right-first-box">
              <RenderBox hasTitle title="雨量站点在线统计">
                <div className="rain-online" id="rainOnline"></div>
              </RenderBox>
            </div>
            <div className="right-second-box">
              <RenderBox hasTitle title="24小时降雨情况">
                <div className="rotateBarChart" id="rotateBarChart" />
              </RenderBox>
            </div>
            <div className="rain-set-table">
              <div className="rain-video-table">
                <RenderBox>
                  <div className="card-container">
                    <Tabs type="card">
                      <TabPane tab="全部" key="1">
                        <RainInfo dataSource={tabsList.all} />
                      </TabPane>
                      <TabPane tab="东营区" key="2">
                        <RainInfo dataSource={tabsList.dy} />
                      </TabPane>
                      <TabPane tab="广饶县" key="3">
                        <RainInfo dataSource={tabsList.gr} />
                      </TabPane>
                      <TabPane tab="利津县" key="4">
                        <RainInfo dataSource={tabsList.lj} />
                      </TabPane>
                      <TabPane tab="河口区" key="5">
                        <RainInfo dataSource={tabsList.hk} />
                      </TabPane>
                      <TabPane tab="垦利区" key="6">
                        <RainInfo dataSource={tabsList.kl} />
                      </TabPane>
                    </Tabs>
                  </div>
                  {/* <WeatherTable></WeatherTable> */}
                </RenderBox>
                {/* <WeatherTable></WeatherTable> */}
              </div>
              {/* <WeatherTable /> */}
            </div>
          </div>
          <div className="router-list">
            <RouterList />
          </div>
        </div>
        {/* <div className="m-rain-button"> */}
        <div className="ranSwitch">
          <RainSwitcher //切换雨晴数据
            style={{ width: 100 }}
            onClick={this.onRainSwitch.bind(this)}
          />
        </div>
        {/* </div> */}
        <div className="m-bottom">{/* <RainLegend /> 图例*/}</div>
        <img
          onClick={() => {
            this.setState({
              visible: true,
            });
          }}
          className="m-set-img"
          src={setImg}
        ></img>
        <Drawer
          title={<SetTitle></SetTitle>}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          width={320}
        >
          <a style={{ fontSize: 18, color: "#000000fd", fontWeight: "bold " }}>
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
          <CheckBoxs layerVisible={layerVisible} onChecked={this.onChecked} />
        </Drawer>
      </div>
    );
  }
  //在线图
  onlineChart = () => {
    const { rain } = this.props;
    let dyOnline = 0; //东营
    let dyLine = 0;
    let grOnline = 0; //广饶
    let grLine = 0;
    let ljOnlie = 0; //利津
    let ljLine = 0;
    let klOnline = 0; //垦利
    let klLine = 0;
    let hkOnline = 0; //河口
    let hkLine = 0;
    let startdata = new Date().getTime();
    // 1000 * 60 * 60 * 24 * 3
    rain.forEach((item) => {
      if (
        item.raindataList &&
        item.raindataList[0] &&
        startdata - new Date(item.raindataList[0].tm).getTime() < 259200000
      ) {
        switch (item.region) {
          case "370502":
            dyOnline++;
            break;
          case "370523":
            grOnline++;
            break;
          case "370522":
            ljOnlie++;
            break;
          case "370521":
            klOnline++;
            break;
          case "370503":
            hkOnline++;
            break;
          default:
            break;
        }
      } else {
        switch (item.region) {
          case "370502":
            dyLine++;
            break;
          case "370523":
            grLine++;
            break;
          case "370522":
            ljLine++;
            break;
          case "370521":
            klLine++;
            break;
          case "370503":
            hkLine++;
            break;
          default:
            break;
        }
      }
    });
    barChart(
      "rainOnline",
      ["在线", "不在线"],
      [dyOnline, grOnline, ljOnlie, hkOnline, klOnline],
      [dyLine, grLine, ljLine, hkLine, klLine]
    );
  };
  componentDidUpdate(pre) {
    const { count, rain } = this.props;
    if (count != pre.count) {
      let data = [];
      count?.raincount?.list?.map((item) => {
        const desc = item.dataSourceDesc;
        data.push({
          name:
            item.dataSourceDesc == "农村基层防汛监测预警平台"
              ? "基层防汛"
              : item.dataSourceDesc == "河口区水利局"
              ? "河口区"
              : item.dataSourceDesc || "暂无数据",
          value: item.number,
          textStyle: { fontSize: "12px" },
          itemStyle: {
            color:
              desc === "气象局"
                ? "#5E9BDF"
                : desc === "农村基层防汛监测预警平台"
                ? "#444EB3"
                : desc === "河口区水利局"
                ? "#2374E7"
                : desc === "经开区"
                ? "#1823B1"
                : "#9325B8",
          },
        });
      });
      pieChart("rain-pie-chart", data, 300, [
        "河口区",
        "基层防汛",
        "经开区",
        "气象局",
        "水文局"
      ], {
        text: '雨量站点\n\n来源统计图', left: 'center', top: 'center', textStyle: { color: 'white', fontWeight: '200', fontSize: 14 }
      });
    }
    if (rain != pre.rain) {
      this.onlineChart();
      let noRain = 0;
      let small = 0;
      let c = 0;
      let d = 0;
      let e = 0;
      let f = 0;
      let g = 0;
      let h = 0;

      let dy = 0;
      let gr = 0;
      let lj = 0;
      let hk = 0;
      let kl = 0;

      let dylist = [];
      let grlist = [];
      let ljlist = [];
      let hklist = [];
      let kllist = [];
      rain.map((item) => {
        switch (item.region) {
          case "370502":
            dy++;
            dylist.push(item);
            break;
          case "370523":
            gr++;
            grlist.push(item);
            break;
          case "370522":
            lj++;
            ljlist.push(item);
            break;
          case "370521":
            kl++;
            kllist.push(item);
            break;
          case "370503":
            hk++;
            hklist.push(item);
            break;
          default:
            break;
        }
        if (item.raindataList && item.raindataList[0]) {
          item = { ...item, ...item.raindataList[0] };

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
        } else {
          noRain++;
          return;
        }
      });
      const numberList = { gr: gr, kl: kl, lj: lj, hk: hk, dy: dy };
      const tabsList = {
        all: rain,
        gr: grlist,
        kl: kllist,
        lj: ljlist,
        hk: hklist,
        dy: dylist,
      };
      this.setState({
        numberList: numberList,
        tabsList: tabsList,
      });
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
      rotateBarChart("rotateBarChart", list.reverse(), 400);
    }
  }
  componentDidMount() {
    //加载雨量站基础信息
    this.props.mapActions.getDict();
    this.props.actions.getAllRainStation();
    this.props.actions.rainCurrent();
    this.props.mapActions.getCountStation();
  }
  onChecked(layerKey, checked) {
    let { layerVisible } = this.state;
    if (layerVisible[layerKey] === checked) {
      return;
    }
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
  // console.log(state, "STATE");
  return {
    tableList: state.rain.tableList,
    stations: state.rain.stations,
    count: state.mapAboutReducers.count,
    rain: state.rain.rain,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    mapActions: bindActionCreators(mapActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
