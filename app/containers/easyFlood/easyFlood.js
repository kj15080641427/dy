/**
 * Monitor 2020-05-12
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as actions from '@app/redux/actions/monitor';
//import Map from "./map/map";
import Map from './map/map';
import "./style.scss";
import Head from "./head/Head";
import WeatherBox from "./left/WeatherBox";
import WeatherChart from "./left/WeatherChart";
import WeatherTable from "./left/WeatherTable";
import PannelBtn from "./right/PannelBtn";
import AlarmTable from "./right/AlarmTable";
import WeatherPic from "./right/WeatherPic";
import WeatherDy from "./right/WeatherDy";
import CheckBoxs from "../monitor/bottom/CheckBox";
import setImg from "@app/resource/setsys.png"
import { Drawer, Switch, Row, Divider, Checkbox } from 'antd';
import { none } from 'ol/centerconstraint';
import SetTitle from '@app/components/setting/SetTitle';
class Monitor extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showLeft: true,
      showRight: true,
      // showBottom: true,
      visible: false,
      dispalyLeft: 'block',
      displayRight: 'block',
      // dispalyBottom: 'block',
      layerVisible: {
        tiandi: true, // 天地图底图
        tiandi2: true, // 天地图标注
        wfsRiver: false, // wfs河道图
        river40: false, //40条河图片 用于解决河道标注很多的问题
        flood: false, // 洪水图层
        river: false, // 水系图
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
      }
    };
    this.onChecked = this.onChecked.bind(this)
  };
  //设置抽屉页
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    let { layerVisible, displayRight, displayLeft } = this.state;
    return (
      <div className="monitor">
        <Map layerVisible={layerVisible}></Map>
        <Head></Head>
        <div style={{ display: displayLeft }}>
          <div className="m-left">
            {/* <WeatherBox></WeatherBox>
            <WeatherChart></WeatherChart> */}
            <WeatherTable></WeatherTable>
          </div>
        </div>
        <div style={{ display: displayRight }}>
          <div className="m-right">
            <PannelBtn></PannelBtn>
            {/* <WeatherDy></WeatherDy>
            <AlarmTable></AlarmTable>
            <WeatherPic></WeatherPic> */}
          </div>
        </div>
        <div className="m-bottom" >
          {/* <RainLegend></RainLegend> */}
        </div>
        <img onClick={() => {
          this.setState({
            visible: true,
          });
        }} className="m-set-img" src={setImg}></img>
        <Drawer
          title={<SetTitle></SetTitle>}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          width={320}
        >
          <a style={{ fontSize: 18, color: '#000000fd', fontWeight: 'bold ' }}>主界面</a>
          <Divider />
          <Row>
            <div><Checkbox checked={this.state.showLeft} onClick={() => {
              this.setState({
                showLeft: !this.state.showLeft,
                displayLeft: this.state.showLeft ? 'none' : 'block'
              });
            }} defaultChecked />&nbsp;&nbsp;<a style={{ fontSize: 15, color: '#000000fd' }}>左侧栏</a></div>
          </Row>
          <br />
          <Row>
            <div><Checkbox checked={this.state.showRight} onClick={() => {
              this.setState({
                showRight: !this.state.showRight,
                displayRight: this.state.showRight ? 'none' : 'block'
              });
            }} defaultChecked />&nbsp;&nbsp;<a style={{ fontSize: 15, color: '#000000fd' }}>右侧栏</a></div>
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
          <CheckBoxs layerVisible={layerVisible} onChecked={this.onChecked}></CheckBoxs>
        </Drawer>
      </div>
    );
  }
  componentDidMount() {
  }
  onChecked(layerKey, checked) {
    let { layerVisible } = this.state;
    if (layerVisible[layerKey] === checked) return;
    layerVisible[layerKey] = checked;
    this.setState({
      layerVisible: { ...layerVisible }
    });
  }
}
// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Monitor);
