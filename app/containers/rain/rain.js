/**
 * Monitor 2020-05-12
 */
import React from "react";
import "./style-device.scss";
import Head from "../../components/head/head";
import titleImg from "../../resource/title/rain.png";
import RouterList from "../../components/routerLiis";
import DeviceManager from "../home/content/subpages/DeviceManage/index.js";
class Monitor extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }
  render() {
    return (
      <div className="rain">
        <Head titleImg={titleImg} />
        <DeviceManager />
        <div className="router-list">
            <RouterList />
          </div>
      </div>
    );
  }
}
export default Monitor;
