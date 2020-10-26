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
import { Drawer, Row, Divider, Checkbox, Tabs, Radio } from "antd";
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
      typeOnline: { q: 0, w: 0, e: 0, r: 0 },
      radio: "a",
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
      typeOnline,
    } = this.state;
    let d = tabsList?.dy[[tabsList?.dy.length - 1]];
    let k = tabsList?.kl[[tabsList?.kl.length - 1]];
    let h = tabsList?.hk[[tabsList?.hk.length - 1]];
    let g = tabsList?.gr[[tabsList?.gr.length - 1]];
    let l = tabsList?.lj[[tabsList?.lj.length - 1]];
    let a = tabsList?.all[[tabsList?.all.length - 1]];
    return (
      <div className="rain-display">
        <Map layerVisible={layerVisible} />
        <Head />
        <div style={{ display: displayLeft }}>
          <div className="m-left">
            <div className="chart-left">
              <WeatherChart />
              <RenderBox hasTitle title="基本统计信息" width="514">
                <Radio.Group
                  defaultValue={this.state.radio}
                  buttonStyle="solid"
                  className="rain-chart-radio"
                  onChange={(e) => {
                    this.setState({ radio: e.target.value });
                  }}
                >
                  <Radio.Button value="a">来源</Radio.Button>
                  <Radio.Button value="b">区县</Radio.Button>
                </Radio.Group>
                <div
                  style={{
                    display: this.state.radio == "a" ? "block" : "none",
                  }}
                >
                  <div className="pie-title-flex-online">
                    <div>
                      <label className="number-color">{typeOnline?.q}</label>
                      <label>基层防汛在线</label>
                    </div>
                    <div>
                      <label className="number-color">{typeOnline?.w}</label>
                      <label>其他来源在线</label>
                    </div>
                    <div>
                      <label className="number-color">{typeOnline?.e}</label>
                      <label>气象局在线</label>
                    </div>
                    <div>
                      <label className="number-color">{typeOnline?.r}</label>
                      <label>水文局在线</label>
                    </div>
                  </div>
                  <div className="rain-pie-chart" id="rain-pie-chart" />
                </div>

                <div
                  style={{
                    display: this.state.radio == "b" ? "block" : "none",
                  }}
                >
                  <div className="pie-title-flex">
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
                  <div className="rain-online" id="rainOnline"></div>
                </div>
              </RenderBox>
            </div>

            {/* </RenderBox> */}
          </div>
        </div>
        <div style={{ display: displayRight }}>
          <div className="rain-chart-right">
            <div className="right-first-box">
              <RenderBox>
                <TableShow
                  pageSize={6}
                  columns={[
                    { name: "区县", dataIndex: "address", width: "14%" },
                    { name: "最大降雨(mm)", dataIndex: "max", width: "43%" },
                    { name: "最小降雨(mm)", dataIndex: "min", width: "43%" },
                  ]}
                  dataSource={[
                    {
                      address: "东营区",
                      max: `${tabsList?.dy[0]?.aliasName}(${tabsList?.dy[0]?.raindataList[0]?.dayDrp})`,
                      min: d?.raindataList[0]
                        ? `${d?.aliasName}(${d?.raindataList[0]?.dayDrp})`
                        : `${d?.aliasName}(0)`,
                    },
                    {
                      address: "垦利区",
                      max: `${tabsList?.kl[0]?.aliasName}(${tabsList?.kl[0]?.raindataList[0]?.dayDrp})`,
                      min: k?.raindataList[0]
                        ? `${k?.aliasName}(${k?.raindataList[0]?.dayDrp})`
                        : `${k?.aliasName}(0)`,
                    },
                    {
                      address: "河口区",
                      max: `${tabsList?.hk[0]?.aliasName}(${tabsList?.hk[0]?.raindataList[0]?.dayDrp})`,
                      min: h?.raindataList[0]
                        ? `${h?.aliasName}(${h?.raindataList[0]?.dayDrp})`
                        : `${h?.aliasName}(0)`,
                    },
                    {
                      address: "利津区",
                      max: `${tabsList?.lj[0]?.aliasName}(${tabsList?.lj[0]?.raindataList[0]?.dayDrp})`,
                      min: l?.raindataList[0]
                        ? `${l?.aliasName}(${l?.raindataList[0]?.dayDrp})`
                        : `${l?.aliasName}(0)`,
                    },
                    {
                      address: "广饶区",
                      max: `${tabsList?.gr[0]?.aliasName}(${tabsList?.gr[0]?.raindataList[0]?.dayDrp})`,
                      min: g?.raindataList[0]
                        ? `${g?.aliasName}(${g?.raindataList[0]?.dayDrp})`
                        : `${g?.aliasName}(0)`,
                    },
                    {
                      address: "东营市",
                      max: `${tabsList?.all[0]?.aliasName}(${tabsList?.all[0]?.raindataList[0]?.dayDrp})`,
                      min: a?.raindataList[0]
                        ? `${a?.aliasName}(${a?.raindataList[0]?.dayDrp})`
                        : `${a?.aliasName}(0)`,
                    },
                  ]}
                ></TableShow>
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

    let q = 0; //基层防汛
    let w = 0; //其他
    let e = 0; //气象局
    let r = 0; //水文局
    // 1000 * 60 * 60 * 24 * 3
    rain.forEach((item) => {
      if (
        item.raindataList &&
        item.raindataList[0] &&
        startdata - new Date(item.raindataList[0].tm).getTime() < 259200000
      ) {
        switch (item.siteRain[0].siteDictionariesID) {
          case 4:
            q = q + 1;
            break;
          case 2:
            e = e + 1;
            break;
          case 1:
            r = r + 1;
            break;
          case 6:
            w = w + 1;
            break;
          case 25:
            w = w + 1;
            break;
          default:
            break;
        }
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
    let typeOnline = {
      q: q, //水文局
      w: w, //水务局
      e: e, //基层防汛
      r: r, //其他
    };
    this.setState({
      typeOnline: typeOnline,
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
    const { typeOnline } = this.state;
    if (typeOnline != pre.typeOnline && count) {
      let data = [];
      let number = 0;
      count?.raincount?.list?.map((item) => {
        const desc = item.dataSourceDesc;
        if (desc == "河口区水利局" || desc == "经开区") {
          number = number + Number(item.number);
        } else {
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
        }
      });
      data.push({
        name: "其他",
        value: number,
        textStyle: { fontSize: "12px" },
        itemStyle: {
          color: "#1823B1",
        },
      });
      pieChart(
        "rain-pie-chart",
        data,
        300,
        ["基层防汛", "其他", "气象局", "水文局"],
        {
          text: `雨量站点\n来源统计图`,
          left: "center",
          top: "center",
          textStyle: { color: "white", fontWeight: "200", fontSize: 14 },
        }
      );
    }
    if (rain != pre.rain) {
      this.onlineChart();
      let noRain = 0;
      let small = 0;
      let c = 0;
      let d = 0;
      let e = 0;
      let f = 0;
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
          // if (item.dayDrp > 250) {
          //   g++;
          //   return;
          // }
        } else {
          noRain++;
          return;
        }
      });
      const numberList = { gr: gr, kl: kl, lj: lj, hk: hk, dy: dy };
      grlist.sort(
        (a, b) => b.raindataList[0]?.dayDrp - a.raindataList[0]?.dayDrp
      );
      kllist.sort(
        (a, b) => b.raindataList[0]?.dayDrp - a.raindataList[0]?.dayDrp
      );
      ljlist.sort(
        (a, b) => b.raindataList[0]?.dayDrp - a.raindataList[0]?.dayDrp
      );
      hklist.sort(
        (a, b) => b.raindataList[0]?.dayDrp - a.raindataList[0]?.dayDrp
      );
      dylist.sort(
        (a, b) => b.raindataList[0]?.dayDrp - a.raindataList[0]?.dayDrp
      );
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
        // { value: g, itemStyle: { color: "rgb(123,42,51)" } },
        { value: h, itemStyle: { color: "rgb(228,41,50)" } },
      ];
      rotateBarChart("rotateBarChart", list, 400);
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
