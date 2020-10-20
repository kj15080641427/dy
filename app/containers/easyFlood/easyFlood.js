import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/map";
import moment from "moment";
import Map from "./map/map";
import "./style.scss";
import Head from "./head/Head";
import CheckBoxs from "../monitor/bottom/CheckBox";
import setImg from "@app/resource/setsys.png";
import { Drawer, Row, Divider, Checkbox, Col } from "antd";
import SetTitle from "@app/components/setting/SetTitle";
import RouterList from "../../components/routerLiis";
import { RenderBox } from "../../components/chart/decorate";
import {
  funnelChart,
  rotateBarChart,
  lineChart,
} from "../../components/chart/chart";
import VideoPlayer from "../../components/video/videoPlayer";
import warningIcon from "@app/resource/icon/warning.svg";
import { TableShow } from "../../components/chart/table";
import emitter from "@app/utils/emitter.js";
class Monitor extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
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
    const { floodId } = this.props;
    this.props.actions.getFloodType(); //易涝点基本信息
    this.props.actions.getFloodRain(); //获取防汛雨量站 {type: "1",isshow: "1",datasource: "3",}
    this.props.actions.getFloodInfoRealTime(floodId.id); //根据易涝点id获取实时数据
    this.props.actions.getCountStation();
    this.props.actions.getAlarm();
  }
  componentDidUpdate(pre) {
    const {
      initFlood,
      floodId,
      historyFlood,
      floodRain,
      floodWarning,
    } = this.props;
    if (floodId != pre.floodId) {
      this.props.actions.getFloodInfoRealTime(floodId.id);
    }
    if (historyFlood != pre.historyFlood) {
      lineChart("easyfloodLine", historyFlood, 380, floodWarning || -0.1);
    }
    if (floodRain != pre.floodRain) {
      let noRain = 0;
      let small = 0;
      let c = 0;
      let d = 0;
      let e = 0;
      let f = 0;
      let g = 0;
      let h = 0;
      floodRain.map((item) => {
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
      });
      let list = [
        { value: noRain, itemStyle: { color: "rgba(229,229,229)" } },
        { value: small, itemStyle: { color: "rgba(175,233,159)" } },
        { value: c, itemStyle: { color: "rgba(91,175,51)" } },
        { value: d, itemStyle: { color: "rgba(121,190,255)" } },
        { value: e, itemStyle: { color: "rgba(57,53,255)" } },
        { value: f, itemStyle: { color: "rgba(228,41,255)" } },
        { value: g, itemStyle: { color: "rgba(123,42,51)" } },
        { value: h, itemStyle: { color: "rgba(228,41,50)" } },
      ];
      rotateBarChart("easyfloodInfo", list, 350, 200);
    }
    if (initFlood != pre.initFlood) {
      let a = 0;
      let b = 0;
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
          if (itemList.z == 0) {
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
        {
          value: a,
          name: "0cm 无积水",
          itemStyle: { color: "rgba(255,255,255,1)" },
        },
        {
          value: b,
          name: "0-10cm",
          itemStyle: { color: "rgba(0,191,243,1)" },
        },
        {
          value: c,
          name: "10-20cm",
          itemStyle: { color: "rgba(0,255,1,1)" },
        },
        {
          value: d,
          name: "20-30cm",
          itemStyle: { color: "rgba(255,255,1,1)" },
        },
        {
          value: e,
          name: "30-40cm",
          itemStyle: { color: "rgba(143,101,35,1)" },
        },
        {
          value: f,
          name: "40cm以上",
          itemStyle: { color: "rgba(237,28,34,1)" },
        },
      ];
      this.setState({
        onLine: onLine,
        line: line,
      });
      funnelChart("funnel-chart", data);
    }
  }
  render() {
    let { layerVisible, displayRight, displayLeft, onLine, line } = this.state;
    const { initFlood, floodName, alarmData, count, floodId } = this.props;
    return (
      <div className="easy-flood-display">
        <Map layerVisible={layerVisible}></Map>
        <Head></Head>
        <div style={{ display: displayLeft }}>
          <div className="easyFlood-left">
            <RenderBox>
              <div className="table-title-text">
                <img src={warningIcon}></img> 超警戒水位
                <span>{alarmData?.length}</span>次
              </div>
              <TableShow
                columns={[
                  { name: "站点名称", dataIndex: "stnm", width: "35%" },
                  { name: "警戒水位", dataIndex: "baselevel", width: "15%" },
                  {
                    name: "水位",
                    dataIndex: "actuallevel",
                    width: "15%",
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
                dataSource={alarmData}
              />
            </RenderBox>
            <div className="easyflood-left-bottom">
              <RenderBox hasTitle title="易涝点积水情况">
                <div className="funnel-chart" id="funnel-chart"></div>
                <TableShow
                  onRow={(record) => {
                    return {
                      onClick: () => {
                        record = {
                          ...record,
                          id: record.riverwaterdataList
                            ? record.riverwaterdataList[0].stcd
                            : "",
                        };
                        this.props.actions.changeFloodId(record);
                        this.locationClick(record);
                        console.log(floodId, floodName, "=========");
                      },
                    };
                  }}
                  pageSize={5}
                  columns={[
                    { name: "易涝点名称", dataIndex: "name", filter: "name" },
                    {
                      name: "积水水深(cm)",
                      dataIndex: "riverwaterdataList",
                      render: (value) =>
                        value && value[0] ? (value[0].z * 100).toFixed(2) : "-",
                    },
                    {
                      name: "更新时间",
                      dataIndex: "riverwaterdataList",
                      render: (value) =>
                        value && value[0] ? value[0].tm.slice(0, -3) : "-",
                    },
                  ]}
                  dataSource={initFlood || []}
                />
              </RenderBox>
            </div>
          </div>
          {/* <WeatherTable></WeatherTable> */}
        </div>
        <div style={{ display: displayRight }}>
          <div className="easyFlood-right">
            <div className="flood-first-box">
              <RenderBox hasTitle title="易涝点基本信息">
                <div className="pie-title-flex">
                  {count?.floodcount?.list?.map((item) => (
                    <div key={item.dataSourceDesc}>
                      <label className="number-color">{item.number}</label>
                      <label>{item.dataSourceDesc}</label>
                    </div>
                  ))}
                  <div>
                    <label className="number-color">{onLine}</label>
                    <label>最新数据</label>
                  </div>
                  <div>
                    <label className="number-color">{onLine}</label>
                    <label>在线</label>
                  </div>
                  <div>
                    <label className="number-color">{line}</label>
                    <label>离线</label>
                  </div>
                </div>
                <div className="easyfloodInfo" id="easyfloodInfo"></div>
              </RenderBox>
            </div>
            <div className="second-box">
              <RenderBox hasTitle title="易涝点24小时信息">
                <div className="water-select">
                  <div className="water-select-flex">
                    <div className="water-select-flex">{floodName}</div>
                    <div className="water-select-flex">{`${moment(
                      new Date()
                    ).format("MM-DD")} 00:00 至 ${moment(new Date()).format(
                      "MM-DD"
                    )} 24:00`}</div>
                  </div>
                </div>
                <div className="easyfloodLine" id="easyfloodLine"></div>
                {/* 视频 */}
                <VideoPlayer
                  style={{
                    width: "620px",
                    height: "350px",
                    transform: "scale(0.73)",
                    position: "absolute",
                    left: "-85px",
                    top: "225px",
                  }}
                  strtoken={floodId?.strtoken}
                ></VideoPlayer>
                {/* <img src={video} width="430px" height="200px"></img> */}
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

        <div className="m-bottom"></div>
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
// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
  // console.log(state);
  return {
    count: state.mapAboutReducers.count,
    floodRain: state.mapAboutReducers.floodRain,
    historyFlood: state.mapAboutReducers.historyFlood,
    floodId: state.mapAboutReducers.floodId,
    floodName: state.mapAboutReducers.floodName,
    initFlood: state.mapAboutReducers.initFlood,
    alarmData: state.currency.alarmData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
