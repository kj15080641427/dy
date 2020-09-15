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
import { Drawer, Row, Divider, Checkbox } from "antd";
import SetTitle from "@app/components/setting/SetTitle";
import moment from "moment";
import { BoxTitle, BoxHead, RenderBox } from "../../components/chart/decorate";
import {
  radarChart,
  barChart,
  pieChart,
  lineChart,
} from "../../components/chart/chart";
import { TableShow } from "../../components/chart/table";
import RouterList from "../../components/routerLiis";
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
        waterWarning: false, //水位报警
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
    count?.watercount?.list?.map((item) => {
      data.push({
        name: item.dataSourceDesc || "暂无数据",
        value: item.number,
      });
    });
    pieChart("pie-chart", data, 400);
  };
  //在线图
  onlineChart = () => {
    const { water } = this.props;
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
    water.map((item) => {
      if (item.z) {
        if (
          startdata - new Date(item?.tm).getTime() <
          259200000
          // item.region == "370502"
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
            case "370505":
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
            case "370505":
              klLine++;
              break;
            case "370503":
              hkLine++;
              break;
            default:
              break;
          }
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
  componentDidUpdate() {
    const { water, count, historyWater } = this.props;
    if (count) {
      this.sourceChart();
    }
    if (water) {
      console.log(moment().format("Do"), "WAYER");
      this.onlineChart();
      radarChart("radar-chart");
    }
    if (historyWater) {
      lineChart("line-chart", historyWater);
    }
  }
  render() {
    const { water, count } = this.props;

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
                超警戒水位<span>{5}</span>次
              </div>
              <TableShow
                columns={[
                  { name: "站点名称", dataIndex: "name" },
                  { name: "警戒水位", dataIndex: "warning" },
                  { name: "水位", dataIndex: "z" },
                  {
                    name: "更新时间",
                    dataIndex: "tm",
                    render: (value) => {
                      let a = value.split(" ");
                      let b = a[1].split(":");
                      return `${a[0]} ${b[0]}:${b[1]}`;
                    },
                  },
                ]}
                dataSource={water || []}
              />
            </div>
            <RenderBox title={"报警统计"} hasTitle>
              <div className="pie-flex-layout">
                <div className="radar-chart" id="radar-chart"></div>
                <div className="flex-layout-right">
                  <div>
                    今日累计报警<a>1</a>次
                  </div>
                  <div>
                    过去七天累计报警<a>2</a>次
                  </div>
                  <div>
                    上月累计报警<a>3</a>次
                  </div>
                </div>
              </div>
            </RenderBox>
            <RenderBox title={"超警戒信息"} hasTitle>
              <div className="line-chart" id="line-chart"></div>
            </RenderBox>
          </div>
          {/* <WeatherTable></WeatherTable> */}
        </div>

        <div style={{ display: displayRight }}>
          <div className="chart-right">
            <div>
              {/* 水位站点在线统计图 */}
              <RenderBox title={"水位站点在线统计图"} hasTitle>
                <div className="bar-chart" id="bar-chart"></div>
              </RenderBox>
              {/* 来源图 */}
              <RenderBox title={"水位站点在线统计图"} hasTitle>
                <div className="pie-flex-layout">
                  <div className="pie-chart" id="pie-chart"></div>
                  <div>
                    {count?.watercount?.list.map((item) => {
                      return (
                        <div key={item.dataSourceDesc} className="flex-layout">
                          <div>{item.dataSourceDesc || "暂无数据"}</div>
                          <div className="pie-number">{item.number}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </RenderBox>
              {/* 视频 */}
              <div className="radar-box">
                <BoxTitle title="水位站点来源统计图" />
                {/* <div className="bar-chart" id="bar-chart"></div> */}
              </div>
            </div>
          </div>
          {/* 路由 */}
          <div className="router-list">
            <RouterList></RouterList>
          </div>
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
  componentDidMount() {
    this.props.actions.getWaterType(); //水位站点
    this.props.actions.getCountStation(); //来源统计
    this.props.actions.getWaterHistory(); //水位日志
    this.props.actions.getWaterWarning(); //报警日志
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
  water: PropTypes.object,
  count: PropTypes.object,
};
function mapStateToProps(state) {
  // console.log(state, "STATE");
  return {
    historyWater: state.mapAboutReducers.historyWater,
    water: state.mapAboutReducers.water,
    count: state.mapAboutReducers.count,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
