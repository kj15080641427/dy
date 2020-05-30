/**
 * Monitor 2020-05-12
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@app/redux/actions/monitor';
import Map from "./map/map";
import "./style.scss";
import Head from "./head/Head";
import WeatherBox from "./left/WeatherBox";
import WeatherChart from "./left/WeatherChart";
import WeatherTable from "./left/WeatherTable";
import PannelBtn from "./right/PannelBtn";
import AlarmTable from "./right/AlarmTable";
import WeatherPic from "./right/WeatherPic";
import CheckBox from "./bottom/CheckBox";
import setImg from "../../resource/setsys.png"
import { Drawer, Switch, Row } from 'antd';

class Monitor extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showLeft: true,
      showRight: true,
      showBottom: true,
      visible: false,
      dispalyLeft: 'block',
      dispalyRight: 'block',
      dispalyBottom: 'block',
      layerVisible: {
        tiandi: true, // 天地图底图
        tiandi2: true, // 天地图标注
        wfsRiver: false, // wfs河道图
        river40: true, //40条河图片 用于解决河道标注很多的问题
        flood: true, // 洪水图层
        river: true, // 水系图
        heatmap: true, // 热力图
        traffic: true, // 交通图层
        person: true, // 防汛人员
        video: true, // 视频站点
        rain: true, // 雨量站
        water: true, // 水位站
        gate: false, // 水闸
        pump: false, // 水泵
        ponding: true, // 积水
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
    let { layerVisible } = this.state;
    return (
      <div className="monitor">
        <Map layerVisible={layerVisible}></Map>
        <Head></Head>
        <div style={{ display: this.state.displayLeft }}>
          <div className="m-left">
            <WeatherBox></WeatherBox>
            <WeatherChart></WeatherChart>
            <WeatherTable></WeatherTable>
          </div>
        </div>
        <div style={{ display: this.state.displayRight }}>
          <div className="m-right">
            <PannelBtn></PannelBtn>
            <AlarmTable></AlarmTable>
            <WeatherPic></WeatherPic>
          </div>
        </div>
        <div style={{ display: this.state.displayBottom }}>
          <div className="m-bottom" >
            <CheckBox layerVisible={layerVisible} onChecked={this.onChecked}></CheckBox>
          </div>
        </div>
        <img onClick={() => {
          this.setState({
            visible: true,
          });
        }} className="m-set-img" src={setImg}></img>
        <Drawer
          title="设置"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Row>
            <Switch checkedChildren="开" checked={this.state.showLeft} onClick={() => {
              this.setState({
                showLeft: !this.state.showLeft,
                displayLeft: this.state.showLeft ? 'none' : 'block'
              });
            }} unCheckedChildren="关" defaultChecked />左侧栏
          </Row>
          <br />
          <Row>
            <Switch checkedChildren="开" checked={this.state.showRight} onClick={() => {
              this.setState({
                showRight: !this.state.showRight,
                displayRight: this.state.showRight ? 'none' : 'block'
              });
            }} unCheckedChildren="关" defaultChecked />右侧栏
          </Row>
          <br />
          <Row>
            <Switch checkedChildren="开" unCheckedChildren="关" checked={this.state.showBottom} onClick={() => {
              this.setState({
                showBottom: !this.state.showBottom,
                displayBottom: this.state.showBottom ? 'none' : 'block'
              });
            }} defaultChecked />下栏目
          </Row>
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