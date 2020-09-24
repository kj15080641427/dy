/**
 * Monitor 2020-05-12
 */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/map";
import PropTypes from "prop-types";
import Map from "./map/map";
import "./style.scss";
import Head from "./head/Head";
// import PannelBtn from "./right/PannelBtn";
import CheckBoxs from "../monitor/bottom/CheckBox";
import setImg from "@app/resource/setsys.png";
import { Drawer, Row, Divider, Checkbox, Select } from "antd";
import SetTitle from "@app/components/setting/SetTitle";
import warningIcon from "@app/resource/icon/warning.svg";
import videoimg from "@app/resource/videoimg.png";
import video from "@app/resource/icon/video.png";
import { BoxHead, RenderBox } from "../../components/chart/decorate";
import {
  radarChart,
  barChart,
  pieChart,
  lineChart,
} from "../../components/chart/chart";
import { TableShow } from "../../components/chart/table";
import RouterList from "../../components/routerLiis";
import WeatherTable from "./left/WeatherTable";
const { Option } = Select;

class Monitor extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showLeft: true,
      showRight: true,
      // showBottom: true,
      visible: false,
      dispalyLeft: "block",
      displayRight: "block",
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
    let data = [];
    count?.watercount?.list?.forEach((item) => {
      data.push({
        name:
          item.dataSourceDesc == "农村基层防汛监测预警平台"
            ? "基层防汛"
            : item.dataSourceDesc == "河口区水利局"
            ? "水利局"
            : item.dataSourceDesc == "黄河东营境内水位站点"
            ? "黄河"
            : item.dataSourceDesc || "暂无数据",
        value: item.number,
      });
    });
    pieChart("pie-chart", data, 400);
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
    // 1000 * 60 * 60 * 24 * 3
    initWater.forEach((item) => {
      if (
        item.riverwaterdataList &&
        item.riverwaterdataList[0] &&
        startdata - new Date(item.riverwaterdataList[0].tm).getTime() <
          259200000
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
      "bar-chart",
      ["在线", "不在线"],
      [dyOnline, grOnline, ljOnlie, hkOnline, klOnline],
      [dyLine, grLine, ljLine, hkLine, klLine]
    );
  };
  componentDidMount() {
    const { waterId } = this.props;
    this.props.actions.getWaterType(); //水位站点
    this.props.actions.getCountStation(); //来源统计
    this.props.actions.getWaterHistory(waterId); //水位日志
    this.props.actions.getWaterWarning(waterId); //报警日志
    this.props.actions.getAlarm();
  }
  componentDidUpdate(pre) {
    const { water, count, historyWater, waterId, warningInfo } = this.props;
    if (waterId != pre.waterId) {
      this.props.actions.getWaterHistory(waterId);
      this.props.actions.getWaterWarning(waterId);
    }
    if (count) {
      this.sourceChart();
    }
    if (water) {
      this.onlineChart();
    }
    if (warningInfo) {
      const { today, a, b, c, d, e, f } = warningInfo;
      radarChart("radar-chart", [today, a, b, c, d, e, f]);
    }
    if (historyWater != pre.historyWater) {
      // lineChart("line-chart", historyWater, 500);
    }
  }
  render() {
    const {
      water,
      count,
      waterWarning,
      waterId,
      warningInfo,
      alarmData,
    } = this.props;

    let { layerVisible, displayRight, displayLeft } = this.state;

    return (
      <div className="monitor">
        <Map layerVisible={layerVisible}></Map>
        <Head></Head>
        <div style={{ display: displayLeft }}>
          <div className="chart-left">
            <BoxHead />
            <div className="table-backgrpund">
              <div className="table-title-text">
                <img src={warningIcon}></img> 超警戒水位
                <span>{alarmData?.length}</span>次
              </div>
              <TableShow
                columns={[
                  { name: "站点名称", dataIndex: "stnm" },
                  { name: "警戒水位", dataIndex: "baselevel" },
                  { name: "水位", dataIndex: "actuallevel" },
                  { name: "更新时间", dataIndex: "alarmtime" },
                ]}
                dataSource={alarmData || []}
              />
            </div>
            <RenderBox title={"报警统计"} hasTitle containerStyle={{ height: '31.6%' }} style={{ height: '100%' }}>
              <div className="pie-flex-layout" style={{ height: 'calc(100% - 25px)' }}>
                <div className="radar-chart" id="radar-chart"></div>
                <div className="flex-layout-right">
                  <div>
                    今日累计报警<a>{warningInfo?.today}</a>次
                  </div>
                  <div>
                    过去七天累计报警<a>{warningInfo?.wWarning}</a>次
                  </div>
                  <div>
                    过去30天累计报警<a>{warningInfo?.mWarning}</a>次
                  </div>
                </div>
              </div>
            </RenderBox>
            <RenderBox containerStyle={{ height: '37.3%' }} style={{ marginTop: 0, height: '100%' }}>
              {/* <div className="water-select">
                <label>
                  超警戒信息 <span>单位(mm)</span>
                </label>
                <Select
                  value={waterId}
                  defaultActiveFirstOption
                  onChange={(e) => {
                    this.props.actions.changeWaterId(e);
                  }}
                >
                  {water?.map((item, index) => (
                    <Option key={index} value={item.stcd}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="line-chart" id="line-chart"></div> */}
              <div className="video-table">
                <WeatherTable></WeatherTable>
              </div>
            </RenderBox>
            {/* <div style={{ marginTop: "15px" }} >
            </div> */}
          </div>
        </div>

        <div style={{ display: displayRight }}>
          <div className="chart-right">
            <div style={{ height: '100%' }}>
              {/* 水位站点在线统计图 */}
              <RenderBox title={"水位站点在线统计图"} containerStyle={{ height: '30.05%' }} style={{ width: '430px', height: '100%', marginTop: '10px' }} hasTitle>
                <div className="bar-chart" id="bar-chart"></div>
              </RenderBox>
              {/* 来源图 */}
              <RenderBox title={"水位站点来源统计图"} containerStyle={{ height: '31.08%' }} style={{ width: '430px', height: '100%', marginTop: '10px' }} hasTitle>
                <div className="pie-flex-layout" style={{ height: 'calc(100% - 25px)' }}>
                  <div className="pie-chart" id="pie-chart"></div>
                  <div style={{ padding: '0 10px' }}>
                    {count?.watercount?.list.map((item, index) => {
                      return (
                        <div key={index} className="flex-layout">
                          <div>
                            {item.dataSourceDesc == "农村基层防汛监测预警平台"
                              ? "基层防汛"
                              : item.dataSourceDesc == "河口区水利局"
                              ? "水利局"
                              : item.dataSourceDesc == "黄河东营境内水位站点"
                              ? "黄河"
                              : item.dataSourceDesc || "暂无数据"}
                          </div>
                          <div className="pie-number">{item.number}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </RenderBox>
              {/* 视频 */}
              {/* <div className="radar-box"> */}
              <RenderBox  containerStyle={{ height: '35.75%' }} style={{ width: '430px', height: '100%' }}>
                <img src={video} style={{ width: '100%', height: '100%' }}></img>
              </RenderBox>
              {/* <div className="bar-chart" id="bar-chart"></div> */}
              {/* </div> */}
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
    historyWater: state.mapAboutReducers.historyWater, //历史水位
    water: state.mapAboutReducers.water,
    initWater: state.mapAboutReducers.initWater,
    count: state.mapAboutReducers.count,
    alarmData: state.currency.alarmData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
