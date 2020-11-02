/**
 * Monitor 2020-05-12
 */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/map";
import * as stateActions from "@app/redux/actions/handState";
import PropTypes from "prop-types";
import Map from "./map/map";
import "./style.scss";
import Head from "../../components/head/head";
import VideoPlayer from "../../components/video/videoPlayer";
import CheckBoxs from "../../components/setting/setting";
import setImg from "@app/resource/setsys.png";
import { Drawer, Row, Divider, Checkbox, Tabs, Radio, Select } from "antd";
import SetTitle from "@app/components/setting/SetTitle";
import warningIcon from "@app/resource/icon/warning.svg";
import { BoxHead, RenderBox } from "../../components/chart/decorate";
import moment from "moment";
import {
  showChart,
  barChart,
  pieChart,
  showChartRiver,
} from "../../components/chart/chart";
import { TableShow } from "../../components/chart/table";
import RouterList from "../../components/routerLiis";
import WaterInfo from "./tabs";
import WaterInfoRiver from "./tabsRiver";
import emitter from "@app/utils/emitter.js";
import titleImg from "../../resource/title/water.png";
const { TabPane } = Tabs;
const itemStyle = {
  水文局: "rgba(141,81,152,1)",
  水务局: "rgba(141,37,191,1)",
  河口区水利局: "rgba(29,108,228,1)",
  农村基层防汛监测预警平台: "rgba(73,80,229,1)",
  黄河东营境内水位站点: "rgba(33,36,185,1)",
  人工录入: "rgba(90,150,222,1)",
};
class Monitor extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      typeOnline: { q: "", w: "", e: "", r: "" },
      showLeft: true,
      showRight: true,
      // showBottom: true,
      visible: false,
      dispalyLeft: "block",
      displayRight: "block",
      radio: "a",
      radiotabs: "city",
      riverTabsKey: "a",
      cityTabsKey: "1",
      // dispalyBottom: 'block',
      layerVisible: {
        showRain: true,
        tiandi: true, // 天地图底图
        tiandi2: true, // 天地图标注
        wfsRiver: false, // wfs河道图
        river40: true, //40条河图片 用于解决河道标注很多的问题
        flood: false, // 洪水图层
        river: true, // 水系图
        heatmap: true, // 热力图
        traffic: false, // 交通图层
        person: true, // 防汛人员
        video: false, // 视频站点
        rain: true, // 雨量站
        water: true, // 水位站
        gate: false, // 水闸
        pump: false, // 水泵
        ponding: true, // 积水
        waterWarning: true, //水位报警
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
  //来源图
  sourceChart = () => {
    const { count } = this.props;
    const { typeOnline } = this.state;
    // console.log(typeOnline, "typeOnline");
    let data = [];
    let number = 0;
    count?.watercount?.list?.forEach((item) => {
      if (
        item.dataSourceDesc == "河口区水利局" ||
        item.dataSourceDesc == "人工录入" ||
        item.dataSourceDesc == "黄河东营境内水位站点"
      ) {
        number = number + Number(item.number);
      } else {
        data.push({
          name:
            item.dataSourceDesc == "农村基层防汛监测预警平台"
              ? "基层防汛"
              : item.dataSourceDesc,
          value: item.number,
          itemStyle: {
            color: itemStyle[item.dataSourceDesc],
          },
        });
      }
    });
    data.push({
      name: "其他来源",
      value: number,
      itemStyle: {
        color: "rgba(90,150,222,1)",
      },
    });
    pieChart("pie-chart", data, 450, [], {
      text: `水文局在线:${typeOnline.q}\n\n水务局在线:${typeOnline.w}\n\n基层防汛在线:${typeOnline.e}\n\n其他来源在线:${typeOnline.r}`,
      left: "center",
      top: "center",
      textStyle: { color: "white", fontWeight: "200", fontSize: 14 },
    });
  };
  //在线图
  onlineChart = () => {
    const { initWater } = this.props;
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

    let dy = [];
    let gr = [];
    let kl = [];
    let lj = [];
    let hk = [];
    // 1000 * 60 * 60 * 24 * 3
    let q = 0; //水文局
    let w = 0; //水务局
    let e = 0; //基层防汛
    let r = 0; //其他
    initWater.forEach((item) => {
      // console.log(item.siteWaterLevels[0].siteDictionariesID, "??????");
      if (
        item.riverwaterdataList &&
        item.riverwaterdataList[0] &&
        startdata - new Date(item.riverwaterdataList[0].tm).getTime() <
          259200000
      ) {
        switch (item.siteWaterLevels[0].siteDictionariesID) {
          case 1:
            q = q + 1;
            break;
          case 3:
            w = w + 1;
            break;
          case 4:
            e = e + 1;
            break;
          case 6:
            r = r + 1;
            break;
          case 22:
            r = r + 1;
            break;
          case 23:
            r = r + 1;
            break;
          default:
            // r = r + 1;
            break;
        }
        switch (item.region) {
          case "370502":
            dyOnline++;
            dy.push(item);
            break;
          case "370523":
            grOnline++;
            dy.push(item);
            break;
          case "370522":
            ljOnlie++;
            lj.push(item);
            break;
          case "370521":
            klOnline++;
            kl.push(item);
            break;
          case "370503":
            hkOnline++;
            hk.push(item);
            break;
          default:
            // console.log(item, "III");
            break;
        }
      } else {
        switch (item.region) {
          case "370502":
            dyLine++;
            dy.push(item);
            break;
          case "370523":
            grLine++;
            gr.push(item);
            break;
          case "370522":
            ljLine++;
            lj.push(item);
            break;
          case "370521":
            klLine++;
            kl.push(item);
            break;
          case "370503":
            hkLine++;
            hk.push(item);
            break;
          default:
            // console.log(item, "RRRRRRR");
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
      dy: dy,
      kl: kl,
      lj: lj,
      hk: hk,
      gr: gr,
      typeOnline: typeOnline,
    });
    barChart(
      "bar-chart",
      ["在线", "不在线"],
      [dyOnline, grOnline, ljOnlie, hkOnline, klOnline],
      [dyLine, grLine, ljLine, hkLine, klLine]
    );
  };
  componentDidMount() {
    const { waterId } = this.props;
    // this.props.actions.getWaterType(); //水位站点
    this.props.actions.getCountStation(); //来源统计
    this.props.actions.getAlarm();
    this.props.stateActions.getDsplayWater(waterId);
    this.props.stateActions.getSiteWaterByRiver({ name: "广利河" });
    this.props.stateActions.getSiteWaterByRiver({ name: "广利河", type: 1 });
  }
  componentDidUpdate(pre) {
    const { water, count, displayWater, waterId, riverSiteWater } = this.props;
    const { typeOnline } = this.state;
    if (waterId != pre.waterId) {
      this.props.stateActions.getDsplayWater(waterId);
    }
    if (typeOnline != pre.typeOnline && count) {
      this.sourceChart();
    }
    if (water != pre.water) {
      this.onlineChart();
    }
    if (displayWater != pre.displayWater) {
      showChart(displayWater, "line-chart");
    }
    if (riverSiteWater != pre.riverSiteWater) {
      showChartRiver(riverSiteWater, "waterRiversite");
    }
  }

  render() {
    const {
      waterName,
      alarmData,
      water,
      waterVideoInfo,
      siteRiverTable,
    } = this.props;
    const { changeWaterId } = this.props.actions;
    const {
      changeModalVisible,
      getDayWater,
      changeWaterVideo,
      getSiteWaterByRiver,
    } = this.props.stateActions;
    let {
      layerVisible,
      displayRight,
      displayLeft,
      dy,
      gr,
      kl,
      lj,
      hk,
    } = this.state;
    const renderRiverSite = (e) => {
      const obj = {
        a: "广利河",
        b: "溢洪河",
        c: "永丰河",
        d: "马新河",
        e: "小清河",
        f: "草桥沟",
      };
      getSiteWaterByRiver({ name: obj[e], type: 1 });
    };
    return (
      <div className="water-display">
        <Map layerVisible={layerVisible}></Map>
        <Head titleImg={titleImg}></Head>
        <div style={{ display: displayLeft }}>
          <div className="chart-left">
            <div className="table-head-box">
              <BoxHead />
              <div className="table-backgrpund">
                <div className="table-title-text">
                  <img src={warningIcon}></img> 超警戒水位
                  <span>{alarmData?.length}</span>站
                </div>
                <TableShow
                  locale={{
                    emptyText: (
                      <div style={{ color: "white" }}>无超警戒水位站</div>
                    ),
                  }}
                  columns={[
                    { name: "站点名称", dataIndex: "stnm", width: "38%" },
                    {
                      name: "警戒水位(m)",
                      dataIndex: "baselevel",
                      width: "19%",
                    },
                    {
                      name: "水位(m)",
                      dataIndex: "actuallevel",
                      width: "14%",
                      render: (e) => <div style={{ color: "red" }}>{e}</div>,
                    },
                    {
                      name: "更新时间",
                      dataIndex: "alarmtime",
                      width: "28%",
                      render: (e) => e.slice(0, -3),
                    },
                  ]}
                  pageSize="2"
                  dataSource={alarmData}
                  onRow={(record) => {
                    return {
                      onClick: () => {
                        changeWaterId(
                          {
                            id: record?.stcd,
                            name: record.stnm,
                          },
                          changeWaterVideo(record)
                        );
                        emitter.emit(
                          "map-move-focus",
                          [record.lon, record.lat],
                          3000
                        );
                      },
                      onDoubleClick: () => {
                        changeModalVisible(true);
                        getDayWater(record?.stcd);
                      },
                    };
                  }}
                />
              </div>
            </div>
            <div className="water-right-second-box">
              <RenderBox title={"基本统计信息"} hasTitle>
                <div
                  className="bar-chart"
                  id="bar-chart"
                  style={{
                    display: this.state.radio == "b" ? "block" : "none",
                  }}
                ></div>
                <div
                  style={{
                    display: this.state.radio == "a" ? "block" : "none",
                  }}
                >
                  <div className="pie-flex-layout">
                    <div className="pie-chart" id="pie-chart"></div>
                  </div>
                  {/* <div className="pie-lauout-text">
                    <div>水位站点</div>
                    <div>来源统计图</div>
                  </div> */}
                </div>
                <Radio.Group
                  defaultValue={this.state.radio}
                  buttonStyle="solid"
                  className="water-chart-radio"
                  onChange={(e) => {
                    this.setState({ radio: e.target.value });
                  }}
                >
                  <Radio.Button
                    value="a"
                    style={
                      this.state.radio == "b"
                        ? {
                            background: "#003366",
                            color: "#3397d4",
                            borderTop: "1px solid rgb(0, 51, 102)",
                            borderLeft: "1px solid rgb(0, 51, 102)",
                            borderBottom: "1px solid rgb(0, 51, 102)",
                            borderRight: "0px solid rgb(0, 51, 102)",
                          }
                        : {}
                    }
                  >
                    来源
                  </Radio.Button>
                  <Radio.Button
                    value="b"
                    style={
                      this.state.radio == "a"
                        ? {
                            background: "#003366",
                            color: "#3397d4",
                            borderTop: "1px solid rgb(0, 51, 102)",
                            borderRight: "1px solid rgb(0, 51, 102)",
                            borderBottom: "1px solid rgb(0, 51, 102)",
                            borderLeft: "0px solid rgb(0, 51, 102)",
                          }
                        : {}
                    }
                  >
                    区县
                  </Radio.Button>
                </Radio.Group>
              </RenderBox>
            </div>
            <div className="video-table">
              <RenderBox>
                <div>
                  <Radio.Group
                    optionType="button"
                    buttonStyle="solid"
                    defaultValue={this.state.radiotabs}
                    onChange={(e) =>
                      this.setState({
                        radiotabs: e.target.value,
                      })
                    }
                  >
                    <Radio.Button value="city">区县</Radio.Button>
                    <Radio.Button value="river">河流</Radio.Button>
                  </Radio.Group>
                </div>
                {this.state.radiotabs == "city" ? (
                  <div className="card-container">
                    <Tabs
                      type="card"
                      activeKey={this.state.cityTabsKey}
                      onChange={(e) => this.setState({ cityTabsKey: e })}
                    >
                      <TabPane tab="全部" key="1">
                        <WaterInfo dataSource={water} />
                      </TabPane>
                      <TabPane tab="东营区" key="2">
                        <WaterInfo dataSource={dy} />
                      </TabPane>
                      <TabPane tab="广饶县" key="3">
                        <WaterInfo dataSource={gr} />
                      </TabPane>
                      <TabPane tab="利津县" key="4">
                        <WaterInfo dataSource={lj} />
                      </TabPane>
                      <TabPane tab="河口区" key="5">
                        <WaterInfo dataSource={hk} />
                      </TabPane>
                      <TabPane tab="垦利区" key="6">
                        <WaterInfo dataSource={kl} />
                      </TabPane>
                    </Tabs>
                  </div>
                ) : (
                  <div className="card-container">
                    <Tabs
                      type="card"
                      onChange={(e) => {
                        this.setState({
                          riverTabsKey: e,
                        });
                        renderRiverSite(e);
                      }}
                      activeKey={this.state.riverTabsKey}
                    >
                      <Tabs.TabPane tab="广利河" key="a">
                        <WaterInfoRiver dataSource={siteRiverTable} />
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="溢洪河" key="b">
                        <WaterInfoRiver dataSource={siteRiverTable} />
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="永丰河" key="c">
                        <WaterInfoRiver dataSource={siteRiverTable} />
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="马新河" key="d">
                        <WaterInfoRiver dataSource={siteRiverTable} />
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="小清河" key="e">
                        <WaterInfoRiver dataSource={siteRiverTable} />
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="草桥沟" key="f">
                        <WaterInfoRiver dataSource={siteRiverTable} />
                      </Tabs.TabPane>
                    </Tabs>
                  </div>
                )}
              </RenderBox>
            </div>
          </div>
        </div>

        <div style={{ display: displayRight }}>
          <div className="chart-right">
            <div className="water-right-first-box">
              <RenderBox
                title={"水位站点在线统计图"}
                containerStyle={{ height: "30.05%" }}
                hasTitle
              >
                <Select
                  defaultValue="广利河"
                  onChange={(e) => {
                    getSiteWaterByRiver({ name: e });
                  }}
                  className="water-right-first-box-select"
                >
                  <Select.Option value="广利河">广利河</Select.Option>
                  <Select.Option value="溢洪河">溢洪河</Select.Option>
                  <Select.Option value="永丰河">永丰河</Select.Option>
                  <Select.Option value="马新河">马新河</Select.Option>
                  <Select.Option value="小清河">小清河</Select.Option>
                  <Select.Option value="草桥沟">草桥沟</Select.Option>
                </Select>
                <div className="water-river-site-div">
                  <div className="water-river-site" id="waterRiversite"></div>
                </div>
              </RenderBox>
            </div>
            <div className="water-right-last-box">
              {/* 来源图 */}
              <RenderBox title={"水位站点"} hasTitle>
                <div className="water-select">
                  <div className="">
                    <div className="water-select-flex">
                      {waterName}24小时水位变化曲线
                    </div>
                    <div className="water-select-flex">{`${moment(
                      new Date().getTime() - 24 * 60 * 60 * 1000
                    ).format("YYYY-MM-DD HH:mm")}  —— ${moment(
                      new Date()
                    ).format("MM-DD HH:mm")}`}</div>
                  </div>
                </div>
                <div className="line-chart" id="line-chart"></div>
                {/* 视频 */}
                <div className="water-video-div">
                  <VideoPlayer
                    style={{
                      width: "620px",
                      minHeight: "300px",
                      height: "32vh",
                      transform: "scale(0.85)",
                      position: "absolute",
                      left: "-51px",
                      top: "260px",
                      paddingTop: "2vh",
                    }}
                    strtoken={waterVideoInfo?.strtoken}
                  ></VideoPlayer>
                </div>
              </RenderBox>
            </div>
          </div>
          {/* 路由 */}
          <div className="router-list">
            <RouterList></RouterList>
          </div>
        </div>

        {/* <div className="m-bottom"></div> */}
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
          <CheckBoxs
            layerVisible={layerVisible}
            onChecked={this.onChecked}
          ></CheckBoxs>
        </Drawer>
      </div>
    );
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
}
Monitor.propTypes = {
  actions: PropTypes.object,
  water: PropTypes.array,
  count: PropTypes.object,
};
function mapStateToProps(state) {
  return {
    warningInfo: state.mapAboutReducers.warningInfo,
    waterWarning: state.mapAboutReducers.waterWarning,
    waterId: state.mapAboutReducers.waterId, //水位ID
    waterName: state.mapAboutReducers.waterName,
    displayWater: state.handState.displayWater, //历史水位
    water: state.mapAboutReducers.water,
    initWater: state.mapAboutReducers.initWater,
    count: state.mapAboutReducers.count,
    alarmData: state.currency.alarmData,
    waterVideoInfo: state.handState.waterVideoInfo,
    riverSiteWater: state.handState.riverSiteWater,
    siteRiverTable: state.handState.siteRiverTable,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    stateActions: bindActionCreators(stateActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
