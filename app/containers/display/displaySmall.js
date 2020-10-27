import React, { useEffect, useState } from "react";
import OverView from "./left/OverView";
import Tables from "./right/Tables";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/map";
import Map from "../display/map/Map";
import Head from "../display/head/Head";
import APPIMG from "../../resource/icon/appCode.png";
import "./style.scss";

const DisplaySmall = (props) => {
  const { getWaterType, getFloodType, getDict } = props.actions;
  const { dict } = props;
  const [showCode, setShowCode] = useState(false);
  useEffect(() => {
    getWaterType();
    getFloodType();
    getDict({
      current: 1,
      size: -1,
      type: 1,
    });
  }, []);
  return (
    <div className="display-body">
      <div className="small-dis-head">
        <Head></Head>
      </div>
      <div
        className="download-app"
        onMouseEnter={() => setShowCode(true)}
        onMouseLeave={() => {
          setShowCode(false);
        }}
      >
        <div> APP下载</div>
      </div>
      {showCode ? (
        <div className="download-app-img">
          <img src={APPIMG} width="200px" height="200px"></img>
        </div>
      ) : null}
      <div className="small-display">
        <Map></Map>
      </div>
      <div className="small-dis-left">
        <OverView></OverView>
      </div>
      <div className="small-dis-table">
        <Tables dict={dict} rowNum={3}></Tables>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    initFlood: state.mapAboutReducers.initFlood,
    floodLoading: state.mapAboutReducers.floodLoading,
    initWater: state.mapAboutReducers.initWater,
    waterLoading: state.mapAboutReducers.waterLoading,
    dict: state.currency.dict,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DisplaySmall);
