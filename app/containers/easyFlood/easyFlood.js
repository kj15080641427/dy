import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/map";
import moment from "moment";
import Map from "./map/map";
import "./style.scss";
import Head from "../../components/head/head";
import CheckBoxs from "../../components/setting/setting";
import setImg from "@app/resource/setsys.png";
import { Drawer, Row, Divider, Checkbox, Col, Radio, Tabs } from "antd";
import SetTitle from "@app/components/setting/SetTitle";
import RouterList from "../../components/routerlist";
import { RenderBox } from "../../components/chart/decorate";
import {
  funnelChart,
  easyfloodRain,
  showChart,
} from "../../components/chart/chart";
import VideoPlayer from "../../components/video/videoPlayer";
import warningIcon from "@app/resource/icon/warning.svg";
import { TableShow } from "../../components/chart/table";
import titleImg from "../../resource/title/easyFlood.png";

const floodRainId = "46020108";
const floodRainName = "胜利花苑站";
import emitter from "@app/utils/emitter.js";
class Monitor extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      radio: "a",
      onLine: 0,
      line: 0,
      showLeft: true,
      showRight: true,
      // showBottom: true,
      visible: false,
      dispalyLeft: "block",
      displayRight: "block",
      // dispalyBottom: 'block',
      layerVisible: {
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
        fRain: true, // 雨量站
        water: false, // 水位站
        gate: false, // 水闸
        pump: false, // 水泵
        ponding: true, // 积水
        warehouse: false, //物资仓库
      },
    };
    this.onChecked = this.onChecked.bind(this);
  }
  //点击定位
  locationClick(e) {
    let lon = e.lon * 1;
    let lat = e.lat * 1;
    if (!lon || !lat) {
      return;
    }
    emitter.emit("map-move-focus", [e.lon, e.lat]);
  }
  //设置抽屉页
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  componentDidMount() {
    // this.props.actions.getFloodType(); //易涝点基本信息
    this.props.actions.getDict();
    this.props.actions.getFloodRain(); //获取防汛雨量站 {type: "1",isshow: "1",datasource: "3",}
    // this.props.actions.getFloodInfoRealTime(floodId.id); //根据易涝点id获取实时数据
    this.props.actions.getCountStation();
    this.props.actions.getDayRainBySite({
      id: floodRainId,
      name: floodRainName,
    });
    this.props.actions.getFloodAlarm();
  }
  componentDidUpdate(pre) {
    const {
      initFlood,
      floodId,
      historyFlood,
      floodRain,
      floodDayRain,
    } = this.props;
    if (floodId != pre.floodId) {
      this.props.actions.getFloodInfoRealTime(
        floodId.siteWaterPoints ? floodId.siteWaterPoints[0].stcd : ""
      );
    }
    if (historyFlood != pre.historyFlood) {
      showChart(historyFlood, "easyfloodLine", "z", "积水(cm)");

      // lineChart("easyfloodLine", historyFlood, 380, floodWarning || -0.1);
    }
    if (floodRain != pre.floodRain) {
      let small = 0;
      let c = 0;
      let d = 0;
      let e = 0;
      let f = 0;
      let g = 0;
      floodRain.map((item) => {
        if (item.dayDrp <= 0) {
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
      });
      let list = [
        // { value: noRain, itemStyle: { color: "rgba(229,229,229)" } },
        { value: small, itemStyle: { color: "rgba(175,233,159,1)" } },
        { value: c, itemStyle: { color: "rgba(91,175,51,1)" } },
        { value: d, itemStyle: { color: "rgba(121,190,255,1)" } },
        { value: e, itemStyle: { color: "rgba(57,53,255,1)" } },
        { value: f, itemStyle: { color: "rgba(228,41,255,1)" } },
        { value: g, itemStyle: { color: "rgba(123,42,51,1)" } },
        // { value: h, itemStyle: { color: "rgba(228,41,50)" } },
      ];
      easyfloodRain("easyfloodInfo", list);
    }
    if (initFlood !== pre.initFlood) {
      //无积水
      let a = 0;
      //10厘米以下
      let b = 0;
      //10~20厘米
      let c = 0;
      let d = 0;
      let e = 0;
      let f = 0;

      let onLine = 0;
      let line = 0;
      const time = moment().subtract(2, "hour").format("YYYY-MM-DD HH:mm:ss");
      initFlood.map((item) => {
        if (item.riverwaterdataList && item.riverwaterdataList[0]) {
          const itemList = item.riverwaterdataList[0];
          if (moment(itemList.tm).isAfter(moment(time))) {
            onLine++;
          } else {
            line++;
          }
          if (itemList.z < 0.5) {
            a++;
            return;
          }
          if (itemList.z < 10) {
            b++;
            return;
          }
          if (itemList.z < 20) {
            c++;
            return;
          }
          if (itemList.z < 30) {
            d++;
            return;
          }
          if (itemList.z < 40) {
            e++;
            return;
          }
          if (itemList.z > 40) {
            f++;
            return;
          }
        } else {
          line++;
          a++;
        }
      });
      const data = [
        // {
        //   value: a,
        //   name: "0cm 无积水",
        //   itemStyle: {color: "rgba(229,229,229)"},
        // },
        {
          value: b,
          name: "0-10cm",
          itemStyle: { color: "rgba(175,233,159,1)" },
        },
        {
          value: c,
          name: "10-20cm",
          itemStyle: { color: "rgba(91,175,51,1)" },
        },
        {
          value: d,
          name: "20-30cm",
          itemStyle: { color: "rgba(121,190,255,1)" },
        },
        {
          value: e,
          name: "30-40cm",
          itemStyle: { color: "rgba(57,53,255,1)" },
        },
        {
          value: f,
          name: "40cm以上",
          itemStyle: { color: "rgba(228,41,255,1)" },
        },
      ];
      this.setState({
        onLine: onLine,
        line: line,
      });
      funnelChart("funnel-chart", data);
    }
    if (floodDayRain != pre.floodDayRain) {
      showChart(floodDayRain, "floodRainChart", "avgDrp", "降雨(mm)");
    }
  }
  render() {
    let { layerVisible, displayRight, displayLeft } = this.state;
    const {
      initFlood,
      floodName,
      floodAlarmData,
      floodId,
      floodRain,
      floodDayRainName,
    } = this.props;
    const { getDayRainBySite } = this.props.actions;
    return (
      <div className="easy-flood-display">
        <div className="right-background"></div>
        <Map layerVisible={layerVisible} onFeatureClick={() => {}} />
        <Head titleImg={titleImg} groundColor="#003366"></Head>
        <div style={{ display: displayLeft }}>
          <div className="easyFlood-left">
            <RenderBox>
              <div className="table-title-text">
                <img src={warningIcon}></img> 城市积水报警
                <span>{floodAlarmData.length}</span>站
              </div>
              <TableShow
                locale={{
                  emptyText: <div style={{ color: "white" }}>无积水报警</div>,
                }}
                columns={[
                  { name: "易涝点", dataIndex: "stnm", width: "35%" },
                  // { name: "警戒水位", dataIndex: "baselevel", width: "15%" },
                  {
                    name: "积水深(cm)",
                    dataIndex: "actuallevel",
                    width: "30%",
                    render: (e) => <div style={{ color: "red" }}>{e}</div>,
                  },
                  {
                    name: "更新时间",
                    dataIndex: "alarmtime",
                    width: "35%",
                    render: (value) => (value ? value.slice(0, -3) : "-"),
                  },
                ]}
                pageSize={3}
                dataSource={floodAlarmData}
              />
            </RenderBox>
            <div className="easyflood-left-bottom">
              <RenderBox hasTitle title="基本统计信息">
                <Radio.Group
                  defaultValue={this.state.radio}
                  buttonStyle="solid"
                  className="flood-chart-radio"
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
                    积水{" "}
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
                    雨量
                  </Radio.Button>
                </Radio.Group>
                <div
                  style={{
                    display: this.state.radio == "a" ? "block" : "none",
                  }}
                >
                  <div className="funnel-chart" id="funnel-chart"></div>
                </div>

                <div
                  style={{
                    display: this.state.radio == "b" ? "block" : "none",
                  }}
                >
                  <div className="easyfloodInfo" id="easyfloodInfo"></div>
                </div>
              </RenderBox>
            </div>
            {/* <RenderBox style={{ height: "340px" }}> */}
            <div className="card-container">
              <Tabs defaultActiveKey="flood" type="card">
                <Tabs.TabPane key="flood" tab="易涝点">
                  <RenderBox style={{ height: "320px" }}>
                    <TableShow
                      pageSize={6}
                      onRow={(record) => {
                        return {
                          onClick: () => {
                            record = {
                              ...record,
                              id: record.siteWaterPoints[0]
                                ? record.siteWaterPoints[0].stcd
                                : record.siteWaterPoints[0].stcd,
                            };
                            this.props.actions.changeFloodId(record);
                            this.locationClick(record);
                          },
                        };
                      }}
                      columns={[
                        {
                          name: "易涝点名称",
                          dataIndex: "aliasName",
                          filter: "name",
                          width: "45%",
                        },
                        {
                          name: "积水深(cm)",
                          dataIndex: "riverwaterdataList",
                          width: "25%",
                          render: (value) =>
                            value && value[0]
                              ? (value[0].z * 100).toFixed(1)
                              : "-",
                        },
                        {
                          width: "30%",
                          name: "更新时间",
                          dataIndex: "tm",
                          render: (value) => (value ? value.slice(0, -3) : "-"),
                          sorter: (a, b) => {
                            return moment(a.tm).unix() - moment(b.tm).unix();
                          },
                        },
                      ]}
                      dataSource={initFlood || []}
                    />
                  </RenderBox>
                </Tabs.TabPane>
                <Tabs.TabPane key="rain" tab="雨量站">
                  <RenderBox style={{ height: "320px" }}>
                    <TableShow
                      pageSize={6}
                      onRow={(record) => {
                        return {
                          onClick: () => {
                            record = {
                              ...record,
                              id: record.siteRain[0]
                                ? record.siteRain[0].stcd
                                : record.siteRain[0].stcd,
                            };
                            this.locationClick(record);
                            getDayRainBySite({
                              id: record.stcd,
                              name: record.aliasName,
                            });
                          },
                        };
                      }}
                      dataSource={floodRain}
                      columns={[
                        {
                          name: "雨量站名称",
                          dataIndex: "aliasName",
                          filter: "name",
                          width: "45%",
                        },
                        {
                          name: "雨量",
                          dataIndex: "raindataList",
                          width: "15%",
                          render: (v) =>
                            v && v[0] ? Number(v[0].dayDrp).toFixed(1) : "-",
                        },
                        {
                          name: "更新时间",
                          dataIndex: "tm",
                          width: "40%",
                          render: (v) => {
                            return v?.slice(0, -3) || "--";
                          },
                          sorter: (a, b) => {
                            return moment(a.tm).unix() - moment(b.tm).unix();
                          },
                        },
                      ]}
                    />
                  </RenderBox>
                </Tabs.TabPane>
              </Tabs>
            </div>
            {/* </RenderBox> */}
          </div>
          {/* <WeatherTable></WeatherTable> */}
        </div>
        <div style={{ display: displayRight }}>
          <div className="easyFlood-right">
            <div className="flood-first-box">
              <RenderBox hasTitle title="雨量站24小时降水">
                <div className="water-select">
                  <br />
                  <div className="water-select-flex">
                    <div className="water-select-flex">
                      {floodDayRainName} &nbsp;
                    </div>
                    <div className="water-select-flex">{`${moment(
                      new Date().getTime() - 24 * 60 * 60 * 1000
                    ).format("MM-DD HH:mm")} 至 ${moment(new Date()).format(
                      "MM-DD HH:mm"
                    )}`}</div>
                  </div>
                </div>
                <div className="easyflood-flex-center">
                  <div className="flood-rain-chart" id="floodRainChart"></div>
                </div>
              </RenderBox>
            </div>
            <div className="second-box">
              <RenderBox
                hasTitle
                title="易涝点24小时积水深"
                style={{ position: "relative" }}
              >
                <div className="flood-video-flex">
                  <div>
                    {/* <br /> */}
                    <div className="water-select">
                      <div className="water-select-flex">
                        <div className="water-select-flex">{floodName}</div>
                        <div className="water-select-flex">
                          {`${moment(
                            new Date().getTime() - 24 * 60 * 60 * 1000
                          ).format("MM-DD HH:mm")}
                          至 ${moment(new Date()).format("MM-DD HH:mm")}`}
                        </div>
                      </div>
                    </div>
                    <div className="easyfloodLine" id="easyfloodLine"></div>
                  </div>
                  {/* 视频 */}
                  <div className="videoBox">
                    <VideoPlayer
                      strtoken={floodId?.stiteWaterRadios?.[0]?.strtoken}
                    />
                  </div>
                </div>
              </RenderBox>
            </div>
            {/* <RenderBox style={{ height: "280px" }}></RenderBox> */}
            <div className="ranSwitch">
              <div className="switch-border">
                <Col span={24}>
                  <Checkbox
                    className="switch-checkout"
                    value="fRain"
                    checked={this.state.layerVisible.fRain}
                    onChange={(e) => {
                      this.setState({
                        layerVisible: {
                          ...layerVisible,
                          fRain: e.target.checked,
                        },
                      });
                    }}
                  >
                    <div className="switch-ponding-flex">
                      <div className="switch-rain"></div>
                      <div>雨量</div>
                    </div>
                  </Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox
                    className="switch-checkout"
                    value="ponding"
                    checked={this.state.layerVisible.ponding}
                    onChange={(e) => {
                      this.setState({
                        layerVisible: {
                          ...layerVisible,
                          ponding: e.target.checked,
                        },
                      });
                    }}
                  >
                    <div className="switch-ponding-flex">
                      <div className="switch-ponding"></div>
                      <div>积水</div>
                    </div>
                  </Checkbox>
                </Col>
              </div>
            </div>
          </div>
          <RouterList />
        </div>

        <div className="m-bottom" />
        <img
          onClick={() => {
            this.setState({
              visible: true,
            });
          }}
          className="m-set-img"
          src={setImg}
        />
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
// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
  return {
    count: state.mapAboutReducers.count,
    floodRain: state.mapAboutReducers.floodRain,
    historyFlood: state.mapAboutReducers.historyFlood,
    floodId: state.mapAboutReducers.floodId,
    floodName: state.mapAboutReducers.floodName,
    initFlood: state.mapAboutReducers.initFlood,
    floodAlarmData: state.handState.floodAlarmData,
    floodDayRain: state.handState.floodDayRain,
    floodDayRainName: state.handState.floodDayRainName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
