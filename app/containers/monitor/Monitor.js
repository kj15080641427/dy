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

    };
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <div className="monitor">
        <Map></Map>
        <Head></Head>
        {
          this.state.showLeft ? (
            <div className="m-left">
              <WeatherBox></WeatherBox>
              <WeatherChart></WeatherChart>
              <WeatherTable></WeatherTable>
            </div>
          ) : null
        }
        {
          this.state.showRight ? (
            <div className="m-right">
              <PannelBtn></PannelBtn>
              <AlarmTable></AlarmTable>
              <WeatherPic></WeatherPic>
            </div>
          ) : null
        }
        {
          this.state.showBottom ? (
            <div className="m-bottom">
              <CheckBox>
              </CheckBox>
            </div>
          ) : null
        }
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
                });
              }} unCheckedChildren="关" defaultChecked />左侧栏
          </Row>
          <br/>
            <Row>
              <Switch checkedChildren="开" checked={this.state.showRight} onClick={() => {
                this.setState({
                  showRight: !this.state.showRight,
                });
              }} unCheckedChildren="关" defaultChecked />右侧栏
          </Row>
          <br/>
            <Row>
              <Switch checkedChildren="开" unCheckedChildren="关" checked={this.state.showBottom} onClick={() => {
                this.setState({
                  showBottom: !this.state.showBottom,
                });
              }} defaultChecked />下栏目
          </Row>
        </Drawer>
      </div>
    );
  }
  componentDidMount() { }
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