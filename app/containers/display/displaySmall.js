import React, { useEffect } from "react";
import OverView from "./left/OverView";
import Tables from "./right/Tables";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/map";
import Map from "../display/map/Map";
import Head from "../display/head/Head";
import "./style.scss";

const DisplaySmall = (props) => {
  const { getWaterType, getFloodType, getDict } = props.actions;
  const { dict } = props;
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
    <div>
      <div className="small-dis-head">
        <Head></Head>
      </div>
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
    dict: state.currency.dict,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DisplaySmall);
