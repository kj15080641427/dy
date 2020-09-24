import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/map";
import Map from "./map/map";
import "./style.scss";
import Head from "./head/Head";
import WeatherTable from "./left/WeatherTable";
import CheckBoxs from "../monitor/bottom/CheckBox";
import setImg from "@app/resource/setsys.png";
import { Drawer, Row, Divider, Checkbox } from "antd";
import SetTitle from "@app/components/setting/SetTitle";
import videoImg from "@app/resource/icon/video.png";
import RouterList from "../../components/routerLiis";
import { RenderBox } from "../../components/chart/decorate";
import {
  rotateBarChart,
  pieChart,
  lineChart,
  barChart,
} from "../../components/chart/chart";
import { TableShow } from "../../components/chart/table";

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
        tiandi: true, // 天地图底图
        tiandi2: true, // 天地图标注
        wfsRiver: false, // wfs河道图
        river40: true, //40条河图片 用于解决河道标注很多的问题
        flood: false, // 洪水图层
        river: true, // 水系图
        heatmap: true, // 热力图
        traffic: false, // 交通图层
        person: true, // 防汛人员
        video: true, // 视频站点
        rain: false, // 雨量站
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
  componentDidMount() {
    this.props.actions.getCountStation();
    lineChart("line-chart", [2, 3, 4, 2], 500);
  }
  componentDidUpdate() {
    const { video, count } = this.props;
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
    // console.log(video, "IIIIII");
    video.map((item) => {
      // if (item.) {
      if (item.isOnline == "0") {
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
            console.log(item, "oooo");
            break;
        }
      } else if (item.isOnline == "1") {
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
            console.log(item, "lllll");
            break;
        }
      }
      // }
    });
    barChart(
      "videoBarChart",
      ["在线", "不在线"],
      [dyOnline, grOnline, ljOnlie, hkOnline, klOnline],
      [dyLine, grLine, ljLine, hkLine, klLine]
    );
    if (count) {
      let data = [];
      count?.vodeocount?.list?.forEach((item) => {
        data.push({
          name:
            item.dataSourceDesc == "积水点水位站(易捞点)"
              ? "易捞点"
              : item.dataSourceDesc == "河口区水利局"
              ? "水利局"
              : item.dataSourceDesc == "天鹅湖蓄滞洪区"
              ? "天鹅湖"
              : item.dataSourceDesc || "暂无数据",
          value: item.number,
        });
      });
      pieChart("videoFunnelChart", data, 500);
    }
  }
  render() {
    let { layerVisible, displayRight, displayLeft } = this.state;
    return (
      <div className="monitor">
        <Map layerVisible={layerVisible}></Map>
        <Head></Head>
        <div className="video">
          <div style={{ display: displayLeft }}>
            <div className="chart-left-video">
              <RenderBox>
                <div className="videoFunnelChart" id="videoFunnelChart"></div>
              </RenderBox>
              <RenderBox>
                <div className="video-table">
                  <WeatherTable></WeatherTable>
                </div>
              </RenderBox>
            </div>
          </div>
          <div style={{ display: displayRight }}>
            <div className="chart-right-video">
              <RenderBox hasTitle title="视频站点在线图">
                <div className="videoBarChart" id="videoBarChart"></div>
              </RenderBox>
              <RenderBox>
                <div className="line-chart" id="line-chart"></div>
              </RenderBox>
              <RenderBox>
                <img src={videoImg} width="530px" height="295px"></img>
              </RenderBox>
            </div>
            <RouterList />
          </div>
        </div>
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

function mapStateToProps(state) {
  console.log(state, "STATE");
  return {
    count: state.mapAboutReducers.count,
    video: state.monitor.video,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
