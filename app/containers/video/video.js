import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/map";
import Map from "./map/map";
import "./style.scss";
import Head from "./head/Head";
import CheckBoxs from "../monitor/bottom/CheckBox";
import setImg from "@app/resource/setsys.png";
import { Drawer, Row, Divider, Checkbox, Tabs } from "antd";
import SetTitle from "@app/components/setting/SetTitle";
import VideoPlayer from "../../components/video/videoPlayer";
import RouterList from "../../components/routerLiis";
import { RenderBox } from "../../components/chart/decorate";
import { pieChart, barChart } from "../../components/chart/chart";
import VideoInfo from "./tabs";
const { TabPane } = Tabs;

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
  }
  componentDidUpdate(pre) {
    const { video, count } = this.props;
    if (video != pre.video) {
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

      let dy = [];
      let gr = [];
      let lj = [];
      let hk = [];
      let kl = [];
      video.map((item) => {
        if (item.isOnline == "0") {
          switch (item.region) {
            case "370502":
              dyOnline++;
              dy.push(item);
              break;
            case "370523":
              grOnline++;
              gr.push(item);
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
              break;
          }
        } else if (item.isOnline == "1") {
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
              break;
          }
        }
        // }
      });
      this.setState({
        gr: gr,
        dy: dy,
        hk: hk,
        lj: lj,
        kl: kl,
      });
      barChart(
        "videoBarChart",
        ["在线", "不在线"],
        [dyOnline, grOnline, ljOnlie, hkOnline, klOnline],
        [dyLine, grLine, ljLine, hkLine, klLine]
      );
    }

    if (count != pre.count) {
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
    let {
      layerVisible,
      displayRight,
      displayLeft,
      dy,
      lj,
      kl,
      hk,
      gr,
    } = this.state;
    const { video, videoInfo } = this.props;
    return (
      <div className="video">
        <Map layerVisible={layerVisible}></Map>
        <Head></Head>
        <div className="">
          <div style={{ display: displayLeft }}>
            <div className="chart-left-video">
              <RenderBox hasTitle title="视频站点来源图">
                <div className="videoFunnelChart" id="videoFunnelChart"></div>
              </RenderBox>
              <RenderBox style={{ height: "400px" }}>
                {/* <div className="video-table"> */}
                <div className="card-container">
                  <Tabs type="card" style={{ color: "white" }}>
                    <TabPane tab="全部" key="1">
                      <VideoInfo dataSource={video} />
                    </TabPane>
                    <TabPane tab="东营区" key="2">
                      <VideoInfo dataSource={dy} />
                    </TabPane>
                    <TabPane tab="广饶县" key="3">
                      <VideoInfo dataSource={gr} />
                    </TabPane>
                    <TabPane tab="利津县" key="4">
                      <VideoInfo dataSource={lj} />
                    </TabPane>
                    <TabPane tab="河口区" key="5">
                      <VideoInfo dataSource={hk} />
                    </TabPane>
                    <TabPane tab="垦利区" key="6">
                      <VideoInfo dataSource={kl} />
                    </TabPane>
                  </Tabs>
                </div>
                {/* <WeatherTable></WeatherTable> */}
                {/* </div> */}
              </RenderBox>
            </div>
          </div>
          <div style={{ display: displayRight }}>
            <div className="chart-right-video">
              <div>
                <RenderBox hasTitle title="视频站点在线图">
                  <div className="videoBarChart" id="videoBarChart"></div>
                </RenderBox>
              </div>
              <div className="video-img-box ">
                <RenderBox>
                  <div className="video-ing-title">{videoInfo.name}</div>
                  <VideoPlayer strtoken={videoInfo?.strtoken}></VideoPlayer>
                </RenderBox>
              </div>
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
  console.log( state.monitor.video)
  return {
    count: state.mapAboutReducers.count,
    video: state.monitor.video,
    videoInfo: state.handState.videoInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
