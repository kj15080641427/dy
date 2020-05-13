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
class Monitor extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return ( 
      <div className="monitor">
        <Map></Map>
        <Head></Head>
        <div className="m-left">
          <WeatherBox></WeatherBox>
          <WeatherChart></WeatherChart>
          <WeatherTable></WeatherTable>
        </div>
        <div className="m-right">
          <PannelBtn></PannelBtn>
          <AlarmTable></AlarmTable>
          <WeatherPic></WeatherPic>
        </div>
        <div className="m-bottom">
          <CheckBox></CheckBox>
        </div>
      </div>
    );
  }
  componentDidMount() {}
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