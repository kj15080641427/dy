/**
 * Display 2020-07-06
 */
import React from 'react';
import "./style.scss";
import Map from "./map/Map";
import Satellite from "./left/Satellite";
import OverView from "./left/OverView";
import Tables from "./right/Tables";
import Head from "./head/Head";
class Display extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return ( 
      <div className="display">
        <Map></Map>
        <div className="dis-head">
          <Head></Head>
        </div>
        <div className="dis-left">
          <Satellite></Satellite>
          <OverView></OverView>
        </div>
        <div className="dis-right">
          <Tables></Tables>
        </div>
      </div>
    );
  }
  componentDidMount() {}
}
export default Display;