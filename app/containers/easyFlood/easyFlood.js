/**
 * Monitor 2020-05-12
 */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as actions from "@app/redux/actions/map";
//import Map from "./map/map";
import Map from "./map/map";
import "./style.scss";
import Head from "./head/Head";
import CheckBoxs from "../monitor/bottom/CheckBox";
import setImg from "@app/resource/setsys.png";
import { Drawer, Row, Divider, Checkbox } from "antd";
import SetTitle from "@app/components/setting/SetTitle";

import RouterList from "../../components/routerLiis";
import { RenderBox } from "../../components/chart/decorate";
import {
  funnelChart,
  rotateBarChart,
  lineChart,
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
        video: false, // 视频站点
        rain: false, // 雨量站
        water: false, // 水位站
        gate: false, // 水闸
        pump: false, // 水泵
        ponding: true, // 积水
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
    const { floodId } = this.props;
    this.props.actions.getFloodType(); //易涝点基本信息
    this.props.actions.getFloodRain(); //获取防汛雨量站 {type: "1",isshow: "1",datasource: "3",}
    this.props.actions.getFloodInfoRealTime(floodId); //根据易涝点id获取实时数据

    lineChart("easyfloodLine", [1, 2, 3, 4, 5]);
  }
  componentDidUpdate(pre) {
    const { flood, floodId, historyFlood, floodRain } = this.props;
    if (floodId != pre.floodId) {
      this.props.actions.getFloodInfoRealTime(floodId);
    }
    if (historyFlood != pre.historyFlood) {
      lineChart("easyfloodLine", historyFlood);
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
      rotateBarChart("easyfloodInfo", list);
    }
    if (flood) {
      let a = 0;
      let b = 0;
      let c = 0;
      let d = 0;
      let e = 0;
      let f = 0;
      flood.map((item) => {
        if (item.z == 0) {
          a++;
          return;
        }
        if (item.z < 10) {
          b++;
          return;
        }
        if (item.z < 20) {
          c++;
          return;
        }
        if (item.z < 30) {
          d++;
          return;
        }
        if (item.z < 40) {
          e++;
          return;
        }
        if (item.z > 40) {
          f++;
          return;
        }
      });
      const data = [
        {
          value: a,
          name: "0cm 无积水",
          itemStyle: { color: "rgb(255,255,255)" },
        },
        {
          value: b,
          name: "0-10cm",
          itemStyle: { color: "rgb(0,191,243)" },
        },
        {
          value: c,
          name: "10-20cm",
          itemStyle: { color: "rgb(0,255,1)" },
        },
        {
          value: d,
          name: "20-30cm",
          itemStyle: { color: "rgb(255,255,1)" },
        },
        {
          value: e,
          name: "30-40cm",
          itemStyle: { color: "rgb(143,101,35)" },
        },
        {
          value: f,
          name: "40cm以上",
          itemStyle: { color: "rgb(237,28,34)" },
        },
      ];
      funnelChart("funnel-chart", data);
    }
  }
  render() {
    let { layerVisible, displayRight, displayLeft } = this.state;
    const { flood, floodRain } = this.props;
    return (
      <div className="monitor">
        <Map layerVisible={layerVisible}></Map>
        <Head></Head>
        <div style={{ display: displayLeft }}>
          <div className="easy-flood">
            <div className="easyFlood-left">
              <RenderBox>
                <div className='table-title'>特大暴雨(250mm以上)</div>
                <TableShow
                  columns={[
                    { name: "站点名称", dataIndex: "name" },
                    { name: "所属区县", dataIndex: "stlc" },
                    { name: "降雨量", dataIndex: "dayDrp" },
                  ]}
                  dataSource={
                    floodRain.filter((item) => item.dayDrp > 250) || []
                  }
                />
              </RenderBox>
              <div className="easyflood-left-bottom">
                <RenderBox hasTitle title="易涝点积水情况">
                  <div className="funnel-chart" id="funnel-chart"></div>
                  <TableShow
                    columns={[
                      { name: "易涝点名称", dataIndex: "name" },
                      { name: "积水水深(cm)", dataIndex: "z" },
                      { name: "更新时间", dataIndex: "tm" },
                    ]}
                    dataSource={flood || []}
                  />
                </RenderBox>
              </div>
            </div>
            {/* <WeatherTable></WeatherTable> */}
          </div>
        </div>
        <div style={{ display: displayRight }}>
          <div className="m-right">
            <div className="easyFlood-right">
              <RenderBox hasTitle title="易涝点基本信息">
                <div className="easyfloodInfo" id="easyfloodInfo"></div>
              </RenderBox>
              <RenderBox hasTitle title="易涝点24小时信息">
                <div className="easyfloodLine" id="easyfloodLine"></div>
              </RenderBox>
              <RenderBox style={{ height: "280px" }}></RenderBox>
            </div>
            <RouterList />
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
    floodRain: state.mapAboutReducers.floodRain,
    historyFlood: state.mapAboutReducers.historyFlood,
    floodId: state.mapAboutReducers.floodId,
    flood: state.mapAboutReducers.flood,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
